/**
 * Проверка строки на соответствие длине
 * @param checkingString {String} - Проверяемая строка
 * @param countOfChars {Number} - Максимальная длина строки
 * @return {Boolean}
 */
const isValidString = (checkingString, countOfChars) => checkingString.length <= countOfChars;

/**
 * Проверка строки на палиндром
 * @param string {String} - Проверяемая строка
 * @return {Boolean}
 */
const isPalindrome = (string) => {
  const noSpaceString = string.toLowerCase().replaceAll(' ', '');
  const reverseString = noSpaceString.split('').reverse().join('');
  return reverseString === noSpaceString;
};

/**
 * Извлечение числа из строки
 * @param string {String | Number}
 * @return {Number}
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


