/**
  Таймер обратного отсчета
 */
// Время в формате ISO, часовой пояс UTC
// Внимание! если вместо чисел отображается NaN, значит время указано не в верном формате
const TARGET_TIME = new Date('2021-09-13T01:25:00.322Z');
// Задержка анимации перелистывания  в миллисекундах
// Установлено в 500 так как в css анимация 250 на уход и 250 на выход
const ANIMATE_DURATION = 500;
// Получает ссылки на элементы
const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
/**
 * Анимирование смены чисел
 * @param {*} selector 
 */
function classAnimate(selector) {
  let element;
  // Переключателем, в зависимости от контекста присваиваем element ссылку на целевой блок
  switch(selector) {
    case 'days':
      element = days;
      break;
    case 'hours':
      element = hours;
      break;
    case 'minutes':
      element = minutes;
      break;
    case 'seconds':
      element = seconds;
      break;
    default:
      console.warn(`Selector ${selector} is not allowed`);
  }
  // Сразу добавляет класс ухода
  element.classList.add('animate-out');
  setTimeout(() => {
    // Через половину всей анимации удаляет анимацию ухода, заменяет на анимацию выхода
    element.classList.remove('animate-out');
    element.classList.add('animate-in');
    setTimeout(() => {
      // Еще через половину всей анимации убирает класс выхода
      element.classList.remove('animate-in');
    }, ANIMATE_DURATION / 2);
  }, ANIMATE_DURATION / 2);
}

// Для округления до целого используется рег выр, так как JS бесконечно малые числа округляет неправильно
const numReg = new RegExp(/\.\d+$/);
setInterval(() => {
  // Каждую секунду берет текущее время
  const currentDate = new Date();
  // Вычисляет разницу в милисекундах
  // (otherTime / 1000 (получает секунды) / 3600 (получает часы) / 24 (получает дни)).toString() - приводит к строке для округления до целого
  let otherTime = TARGET_TIME.getTime() - currentDate.getTime();
  // Вычисляет целое количество дней
  const ceilDays = parseInt((otherTime / 1000 / 3600 / 24).toString().replace(numReg, ''), 10);
  // Вычисляет абсолютное значение, на тот случай если дата истекла
  const absDays = Math.abs(ceilDays);
  // Добавляет к дням 0 если меньше 10, и преобразует в строку
  const _days = absDays < 10 ? `0${absDays}` : `${absDays}`;
  // Проверяет изменилось ли значение
  if (days.innerHTML !== _days) {
    // Если изменилось, то устанавливает новое
    // Сразу запускает анимации
    classAnimate('days');
    // Через половину времени всей анимации меняет число.
    setTimeout(() => {
      days.innerHTML = _days;
    }, ANIMATE_DURATION / 2);
  }
  // Высчитывает оставшееся время  eilDays * 1000 * 3600 * 24 - из дней получает в миллисекундах
  otherTime = otherTime - (ceilDays * 1000 * 3600 * 24);
  // То же самое с часами минутами и секундами
  const ceilHours = parseInt((otherTime / 1000 / 3600).toString().replace(numReg, ''), 10);
  const absHours = Math.abs(ceilHours);
  const _hours = absHours < 10 ? `0${absHours}` : `${absHours}`;
  if (hours.innerHTML !== _hours) {
    classAnimate('hours');
    setTimeout(() => {
      hours.innerHTML = _hours;
    }, ANIMATE_DURATION / 2);
  }
  otherTime = otherTime - (ceilHours * 1000 * 3600);
  // Минуты
  const ceilMinutes = parseInt((otherTime / 1000 / 60).toString().replace(numReg, ''), 10);
  const absMin = Math.abs(ceilMinutes);
  const _minutes = absMin < 10 ? `0${absMin}` : `${absMin}`;
  if (minutes.innerHTML !== _minutes) {
    classAnimate('minutes');
    setTimeout(() => {
      minutes.innerHTML = _minutes;
    }, ANIMATE_DURATION / 2);
  }
  otherTime = otherTime - (ceilMinutes * 1000 * 60);
  // Секунды
  const ceilSeconds = parseInt((otherTime / 1000).toString().replace(numReg, ''), 10);
  // Это пример, если время прошло
  if (ceilSeconds < 0) {
    // И в элементе секунд нет класса минус
    if (!seconds.classList.contains('minus')) {
      // То добавляет это класс
      seconds.classList.add('minus');
    }
  }
  console.log(seconds.classList)
  const absSec = Math.abs(ceilSeconds);
  const _seconds = absSec < 10 ? `0${absSec}` : `${absSec}`; 
  if (seconds.innerHTML !== _seconds) {
    classAnimate('seconds');
    setTimeout(() => {
      seconds.innerHTML = _seconds;
    }, ANIMATE_DURATION / 2);
  }
}, 1000);