/**
 * * Formats the current hours of operation
 * and compares them to the current date to
 * determine if the space is open
 *  * @param {Object} hoursOfOperation - From /spaces
 * @returns {Boolean} determines if the space is open or closed
*/

const formatHoursOfOperation = (hoursOfOperation) => {
  if (!hoursOfOperation) {
    return false;
  }
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentTime = currentDate.getHours() * 100;
  const currentDayHours = hoursOfOperation.open.find((hop) => hop.day === currentDay);
  if (!currentDayHours) {
    return false;
  }
  if (parseInt(currentDayHours.start, 10)
  <= currentTime
  <= parseInt(currentDayHours.end, 10)) {
    return true;
  }
  return false;
};

export default formatHoursOfOperation;
