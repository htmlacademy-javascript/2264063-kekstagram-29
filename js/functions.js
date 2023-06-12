/* eslint-disable */ //TODO: Убрать
/**
 * Проверка строки на соответствие длине
 * @param checkingString {string} - Проверяемая строка
 * @param countOfChars {number} - Максимальная длина строки
 * @return {boolean}
 */
const isValidString = (checkingString, countOfChars) => checkingString.length <= countOfChars;

/**
 * Проверка строки на палиндром
 * @param string {string} - Проверяемая строка
 * @return {boolean}
 */
const isPalindrome = (string) => {
  let result = true;
  string = string.replaceAll(' ', '');
  for (let i = 0; i < string.length / 2; i++) {
    if (!(string[i] === string[string.length - 1 - i])) {
      result = false;
      break;
    }
  }
  return result;
};

/**
 * Извлечение числа из строки
 * @param string {string | number}
 * @return {number}
 */
const extractNumbers = (string) => {
  const result = [];
  for (const char of string.toString().replaceAll(' ', '')) {
    if (!isNaN(+char)) {
      result.push(char);
    }
  }
  return result.length ? +result.join('') : NaN;
};
/* eslint-enable */ //TODO: Убрать
