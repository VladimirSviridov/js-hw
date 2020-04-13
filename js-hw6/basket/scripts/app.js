let basketBtns = document.querySelectorAll('.toBasketBtn');
//берем все кнопки "В корзину" и слушаем клики по ним
basketBtns.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
        let id = event.target.dataset.id;
        let price = event.target.dataset.price;
        let name = event.target.dataset.name;
        //Получаем число желаемых покупок. Как сделать корое не записывая в button - не знаю.
        //И как записать в btn неизвестное заранее число - тоже не знаю
        //Можно получить value через data-id, но я не знаю как
        //Примерно так, но не работает
        //let count = $('#dataset').children('[data-id="'+id+'"]').value;
        let count = event.target.parentNode.children[2].children[1].firstElementChild.value;

        basket.addProduct({id: id, price: price, name: name, count: count})
    })
});
let numberToDelete = 0;
let basket = {
    products: {},

    /**
     * Метод добавляет продукт в корзину.
     * @param {{ id: string, price: string, name: string }} product
     */
    addProduct(product) {
        this.addProductToObject(product);
        this.renderProductInBasket(product);
        this.renderTotalSum();
        this.addRemoveBtnsListeners();
    },

    /**
     * Обработчик события клика по кнопке удаления товара.
     * @param {MouseEvent} event
     */
    removeProductListener(event) {
        //console.log(this); this будет указывать на кнопку, а не на объект basket
        //здесь мы используем basket вместо this, потому что контекст вызова не имеет
        //этих методов и нам надо явно обратиться к нашему объекту корзины
        basket.removeProduct(event);
        basket.renderTotalSum();
    },

    /**
     * Добавляем слушателей события клика по кнопкам удалить.
     */
    addRemoveBtnsListeners() {
        let btns = document.querySelectorAll('.productRemoveBtn');
        for (let i = 0; i < btns.length; i++) {
            //важно указать именно this.removeProductListener, чтобы это была одна и та же
            //функция, а не несколько одинаковых.
            btns[i].addEventListener('click', this.removeProductListener);
        }
    },

    /**
     * Метод отображает общую сумму заказа в корзине.
     */
    renderTotalSum() {
        document.querySelector('.total').textContent = this.getTotalSum();
    },

    /**
     * Метод добавляет продукт в объект с продуктами.
     * @param {{ id: string, price: string, name: string }} product
     */
    addProductToObject(product) {
        if (this.products[product.id] == undefined) {
            this.products[product.id] = {
                price: product.price,
                name: product.name,
                //Записываем полученное число покупок
                count: product.count,
            }
        } else {
            //Добавляем число, если такая позиция уже была
            this.products[product.id].count = (Number(this.products[product.id].count) + +product.count);
        }
    },

    /**
     * Метод отрисовывает продукт в корзине, если там такой уже есть просто
     * увеличивает счетчик на 1.
     * @param {{ id: string, price: string, name: string }} product
     * @returns
     */
    renderProductInBasket(product) {
        let productExist = document.querySelector(`.productCount[data-id="${product.id}"]`);
        if (productExist) {
            productExist.textContent = Number(productExist.textContent) + +product.count;
            return;
        }
        //Помещаем первоначальное число
        let productRow = `
            <tr>
                <th scope="row">${product.id}</th>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td class="productCount" data-id="${product.id}">${product.count}</td>
                <td><i class="fas fa-trash-alt productRemoveBtn" data-id="${product.id}"></i></td>
            </tr>
        `;
        let tbody = document.querySelector('tbody');
        tbody.insertAdjacentHTML("beforeend", productRow);
    },

    /**
     * Метод считает стоимость всех продуктов в корзине.
     * @returns {number}
     */
    getTotalSum() {
        let sum = 0;
        for (let key in this.products) {
            sum += this.products[key].price * this.products[key].count;
        }
        return sum;
    },

    /**
     * Метод удаляет продукт из объекта продуктов, а также из корзины на странице.
     * @param {MouseEvent} event
     */
    removeProduct(event) {
        let id = event.target.dataset.id;
        //Предложим пользователю самому выбрать сколько позиций он хочет удалить
        this.numberToDelete = +prompt("Сколько штук вы хотите убрать из корзины?");
        //Проверяем число ли ввел пользователь
        if (isNaN(this.numberToDelete)) {
            alert("Введите число!");
            return;
        }
        this.removeProductFromObject(id);
        this.removeProductFromBasket(id);
    },

    /**
     * Метод удаляет товар из корзины в количестве, указанном пользователем.
     * @param {string} id
     */
    removeProductFromBasket(id, numberToDelete) {
        let countTd = document.querySelector(`.productCount[data-id="${id}"]`);
        //Проверяем число
        if (this.numberToDelete <= 0 || this.numberToDelete > countTd.textContent) {
            return;
        }
        countTd.textContent = +countTd.textContent - this.numberToDelete;
        if (countTd.textContent == 0) {
            countTd.parentNode.remove();
        }
    },

    /**
     * Метод удаляет продукт из объекта с продуктами.
     * Удаляет любое число
     * @param {string} id
     */
    removeProductFromObject(id, numberToDelete) {
        //Проверяем число, если оно некорректное - предупреждаем его и прерываем цикл
        if (this.numberToDelete <= 0 || this.numberToDelete > this.products[id].count) {
            alert("Введите корректное число");
            return;
        }
        this.products[id].count = +this.products[id].count - this.numberToDelete;
        //Если полученное число получилось равное 0, то удаляем позицию
        if (this.products[id].count == 0) {
            delete this.products[id];
        }
    }
};
