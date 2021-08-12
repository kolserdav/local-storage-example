/***************************************
 * ZAKLADKI
 **************************************/
  //// Глобальные переменные
      // Название поля в localStorage хранящего список закладок 
      const BOOKMARKS_NAME = '_any_unique_for_this_domain';
      
      /*
      * Функция получения закладок из локального хранилища
      * вынесено для переиспользования
      */
      function getBookmarks() {
        // Получает уже сохраненные закладки из lS
        let bookmarks = localStorage.getItem(BOOKMARKS_NAME);
        // Если это первое сохранение то есть в lS оказалось пустое значение по BOOKMARKS_NAME ключу, 
        // то задает закладкам серриализованное значение в виде пустого массива
        bookmarks = !bookmarks ? "[]" : bookmarks;
        // Парсит серриализованную строку в JSON объект
        return JSON.parse(bookmarks);
      }

      /*
      * Функция для сохранения закладок в хранилище
      * @bookmarks - объект закладок
      */
     function setBookmarks(bookmarks) {
       // Записывает в хранилище закладки, предварительно их серриализовав в строку 
       localStorage.setItem(BOOKMARKS_NAME, JSON.stringify(bookmarks));
     } 

      /*
      * Функция отрисовывающая закладки из локального хранилища
      */
      function createBookmarks() {
        let bookmarks = getBookmarks();
        // Ищет по класу родительский элемент списка закладок
        const bookmarksDiv = document.querySelector('.zakladki');
        // Получает тег ul внутри блока с классом zakladki
        const ul = bookmarksDiv.querySelector('ul');
        // Чистит список закладок, перед отрисовкой
        ul.innerHTML = '';
        // Проходит по всему массиву с сохраненными закладками и добавляет в список
        bookmarks.map((bookmark) => {
          // Здесь показан пример создания элементов DOM при момощи метода createElement объекта document
          // Создает элемент li
          const li = document.createElement('li');
          // Создает элемент a для закладки
          const aBkm = document.createElement('a');
          // Ставит для закладки отрибут href
          aBkm.href = bookmark.link;
          // Ставит заголовок
          aBkm.innerText = bookmark.header;
          // Добавляет в li закладку дочерним компонентом
          li.appendChild(aBkm);

          // Элемент с пробелом, можно удалить и обыграть стилями
          const space = document.createElement('span');
          space.innerHTML = '&nbsp;';
          li.appendChild(space);

          // Создает элемент a для кнопки удалить и ставит ей аттрибуты
          const aDel = document.createElement('a');
          console.log(bookmark.id)
          aDel.href = `javascript:delItem("${bookmark.id}")`;
          aDel.innerText = 'удалить';
          li.appendChild(aDel);
          // Добавляет li в список ul
          ul.appendChild(li);
        });
        // 
      }

      // Прослушиватель события загрузки страницы
      window.onload = () => {
        createBookmarks();
      };
      
      /**
       * Функция добавления в закладки
       * @e - событие event передаваемое в onclick="javascript:add(event)"   
       * */
      function add(e) {
        //--1--// Получение данных из блоков при нажатии на кнопку
        // Определяет нажатую кнопку по событию
        const targetButton = e.target;
        // Получает родительский элемент блока с нажатой кнопкой 
        const parentElement = targetButton.parentElement;
        // Берет ид родительского элемента
        const id = parentElement.getAttribute('id');
        // Находит по селектору span блок содержащий ссылку
        const span = parentElement.querySelector('span');
        // Достаёт ссылку из span
        const link = span.innerText;
        // Находит в блоке заголовок h1
        const h1 = parentElement.querySelector('h1');
        // Получает заголовок
        const header = h1.innerText;
        
        //--2--// Сохранение закладок в локальное хранилище браузера
        let bookmarks = getBookmarks();
        // Проходит по каждому элементу массива и если ид одного из юнитов равен
        // добавляемому, то возвращает true
        const checkBookmarks = bookmarks.some((bookmark) => bookmark.id === id);
        // Если проверочный массив оказался не пустой, то выводит предупреждение и выходит из функции
        if (checkBookmarks) {
          alert('Закладка добавлена ранее');
          return;
        }
        // Добавляет в массив закладок новый объект с ключами id, link, header 
        // и значениями id, link, header полученных в первом этапе.
        bookmarks.push({
          id,
          link,
          header,
        })
        // Записывает в хранилище закладки, предварительно их серриализовав в строку 
        setBookmarks(bookmarks);

        //--3--// Добавление элементов с закладками
        createBookmarks();
      }
      /**
       * Функция удаления из закладок
       * @id - id закладки для удаления
       * */
      function delItem(id) {
        const bookmarks = getBookmarks();
        // Проходит по закладкам из хранилища и если юнит с не удаляемым id
        // то вставляет его в новый массив newBookmarks
        let newBookmarks = bookmarks.map((bookmark) => {
          if (bookmark.id !== id) return bookmark;
          // Если это удаляемый юнит, то на его место в новый массив вставляет undefined
          return undefined;
        });
        // Фильтрует новый массив закладок, удаляя undefined элумент
        newBookmarks = newBookmarks.filter((bookmark) => bookmark !== undefined);
        // сохраняет в хранилизе
        setBookmarks(newBookmarks);
        // Запускает скрипт отрисовки закладок
        createBookmarks();
      }