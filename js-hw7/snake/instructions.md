# Предварительная подготовка

1. Установите node с официального [сайта](https://nodejs.org).
2. Откройте терминал и напишите `node -v`, если вы увидите, что-то вроде 
"v10.15.1", значит Nodejs установилась корректно.
3. Также напишите в терминале `npm -v`, если вы видите что-то вроде "6.4.1", то
пакетный менеджер Npm установился корректно.

# Установка gulp

Официальный сайт - [gulp](https://gulpjs.com/).

1. Пишем в терминале `npm install gulp-cli -g`, это установит gulp глобально.
2. Пишем в терминале `gulp -v`, если вывод что-то вроде "CLI version: 2.2.0
Local version: Unknown", значит gulp удачно установился локально.
3. Пишем в терминале `npm init -y`, следите за тем чтобы путь до папки вашего проекта
не содержал кириллических символов (и плюс еще возможно пробелов).
4. После этого у вас создастся файл package.json примерно с таким содержимым:
```json
{
  "name": "snake2",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
5. Давайте установим gulp как зависимость нашего проекта, пишем в терминале
`npm install gulp -D`, после чего появится папка "node_modules", со всеми пакетами,
которые нужны gulp для работы. Также в файле package.json в разделе devDependencies
появится запись вроде "gulp": "^4.0.2".

# Установка gulp-concat

Про gulp-concat можно почитать [здесь](https://www.npmjs.com/package/gulp-concat).
Этот плагин будет содержимое наших файлов складывать в один, и именно его мы
будем подключать к веб-странице.

1. Пишем в терминале `npm install --save-dev gulp-concat`, после чего в файле
package.json появится запись вроде "gulp-concat": "^2.6.1".

# Установка gulp-sourcemaps

Этот плагин помогает при отладке, если будут какие то ошибки, то мы будем видеть
где произошла ошибка именно в файле, который мы писали руками, а не в том,
который в итоге собрался автоматически из всех наших файлов.

1. Пишем в терминале `c`.

# Создание файла gulpfile.js

1. В той же папке где находится файл package.json создайте файл gulpfile.js, в нем
у нас будут хранится инструкции для gulp, там мы укажем что будем использовать пакет
gulp-concat и укажем как он должен работать.
2. Содержимое файла gulpfile.js сделайте следующим:
```javascript
const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

function buildJs() {
  return gulp.src('./src/*.js') //это папка где у вас лежат js файлы
    .pipe(sourcemaps.init())
    .pipe(concat('app.js')) //это как будет называться собранный файл
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/')); //папка куда будем складывать наш файл
}
 
gulp.watch('./src/*.js', buildJs);

exports.default = buildJs;
```
3. Структура файлов и папок должна быть примерно такой:
```
\---snake
    |   gulpfile.js
    |   index.html
    |   package-lock.json
    |   package.json
    |   
    +---dist
    |       app.js
    |       
    +---node_modules
    \---src
            Snake.js
            Game.js
```
4. Вводим в консоли `gulp` и все файлы из папки src собираются в один файл app.js,
который помещается в папку dist и именно этот файл мы подключаем в наш файл index.html.
После запуска этой команды gulp будет автоматически отслеживать изменения в наших файлах
и на лету их объединять в файл app.js.