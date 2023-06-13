/**
 * Проверяет, входит ли время (meetingDurations) в переданный диапазон [workStart...workEnd], начиная с (now)
 * @param workStart {string}
 * @param workEnd {string}
 * @param now {string}
 * @param meetingDurations {number | string}
 * @return {boolean}
 */
// const isHaveTime = (workStart, workEnd, now, meetingDurations) => {
//   const [nowHours, nowMinutes] = now.split(':');
//   const nowTimeInMinutes = (+nowHours * 60) + +nowMinutes;
//   const [startHours, startMinutes] = workStart.split(':');
//   const startTimeInMinutes = (+startHours * 60) + +startMinutes;
//   const [endHours, endMinutes] = workEnd.split(':');
//   const endTimeInMinutes = (+endHours * 60) + +endMinutes;
//   return startTimeInMinutes <= nowTimeInMinutes ? endTimeInMinutes - nowTimeInMinutes >= +meetingDurations : false;
// };


// const isHaveTime = (workStart, workEnd, now, meetingDurations) => {
//   const nowTimeInMinutes = (+now.split(':')[0] * 60) + +now.split(':')[1];
//   const startTimeInMinutes = (+workStart.split(':')[0] * 60) + +workStart.split(':')[1];
//   const endTimeInMinutes = (+workEnd.split(':')[0] * 60) + +workEnd.split(':')[1];
//   return startTimeInMinutes <= nowTimeInMinutes && endTimeInMinutes - nowTimeInMinutes >= +meetingDurations;
// };

const isHaveTime = (workStart, workEnd, now, meetingDurations) => {
  const timeToNumber = (time) => +time.split(':')[0] + time.split(':')[1] / 60;
  return timeToNumber(workStart) <= timeToNumber(now) && timeToNumber(workEnd) - timeToNumber(now) >= meetingDurations / 60;
};

/*eslint-disable*/ // TODO: Удалить
console.log(isHaveTime('08:00', '17:30', '14:00', 90)); // true
console.log(isHaveTime('8:0', '10:0', '8:0', 120)); // true
console.log(isHaveTime('08:00', '14:30', '14:00', 90)); // false
console.log(isHaveTime('14:00', '17:30', '08:0', 90)); // false
console.log(isHaveTime('8:00', '17:30', '08:00', 900)); // false
/*eslint-enable*/ // TODO: Удалить

