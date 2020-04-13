class Rock {
    constructor() {
        this.x = null;
        this.y = null;
    }

    /**
     * Метод получает другие игровые объекты, которые нужны ему
     * для работы.
     * @param {Settings} settings объект настроек
     * @param {Snake} snake объект змейки
     * @param {Board} board объект игрового поля
     */
    init(settings, snake, board) {
        this.settings = settings;
        this.snake = snake;
        this.board = board;
    }


    /*setNewRock() {
        let rock = this.generateRandomCoordinates();
        this.board.renderRock(rock);
    }*/

    /**
     * Метод устанавливает новое случайное положение камня на игровом
     * поле.
     */
    setNewRock() {
        let rock = this.generateRandomCoordinates();
        this.board.renderRock(rock);
    }

    /**
     * Метод устанавливает на игровом поле камень по текущим
     * координатам.
     */
    setRock() {
        this.board.renderRock(this);
    }

    /**
     * Метод генерирует новый объект еды со случайным
     * положением на игровом поле
     * @returns {Food}
     */
    generateRandomCoordinates() {
        while (true) {
            this.x = Math.floor(Math.random() * this.settings.colsCount) + 1;
            this.y = Math.floor(Math.random() * this.settings.rowsCount) + 1;
            let cell = this.board.getCellEl(this.x, this.y);

            if (cell.classList.contains('snakeBody')||cell.classList.contains('food')) {
                continue;
            }
            return this;
        }
    }
}