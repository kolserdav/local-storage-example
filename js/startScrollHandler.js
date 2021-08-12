/**
 * Стартует метод добавления классов в зависимости от прокрутки
 */
function startScrollHandler() {
  // Создает пулл прослушиваемых блоков
  const blocks = [];
  blocks.push(document.querySelector('.bloks-1'));
  blocks.push(document.querySelector('.bloks-2'));
  blocks.push(document.querySelector('.bloks-3'));
  blocks.push(document.querySelector('.bloks-4'));
  // Последнее положение окна как переменная lastY, для варианта 2
  let { pageYOffset: lastY, innerHeight } = window;
  // Добавляем замыкание перед прослушиванием
  let startElement;
  // Навешивает прослушиватель на прокрутку окна	
  window.addEventListener('scroll', () => {
    // Текущее положение окна
    const { pageYOffset, innerHeight: height } = window;
    lastY = pageYOffset;
    // Проходит по пулу
    blocks.map((item) => {
      const { y } = item.getBoundingClientRect();
      // Значение если верх элемента стоит по нижней линии окна.
      startElement = y -  innerHeight;
      const option = startElement <= -200 ;
      if (option) {
        item.classList.add('activbl');
      } else {
        item.classList.remove('activbl');
      }
    });
  });
}