/**
 * Проверяет, входит ли время (meetingDurations) в переданный диапазон [workStart...workEnd], начиная с (now)
 * @param workStart {string}
 * @param workEnd {string}
 * @param meetingStart {string}
 * @param meetingDurations {number | string}
 * @return {boolean}
 */
const isHaveTime = (workStart, workEnd, meetingStart, meetingDurations) => {
  const timeToNumber = (time) => +time.split(':')[0] + time.split(':')[1] / 60;
  return timeToNumber(workStart) <= timeToNumber(meetingStart) && timeToNumber(workEnd) - timeToNumber(meetingStart) >= meetingDurations / 60;
};
isHaveTime('8:00', '17:30', '08:00', 900);

