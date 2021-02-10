/**
 * * Formats the current hours of operation
 * and compares them to the current date to
 * determine if the space is open
 *  * @param {Object} hoursOfOperation - From /spaces
 * @returns {Boolean} ?
*/

const formatHoursOfOperation = (hoursOfOperation) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const currentTime = currentDate.getHours() * 100;
  if (parseInt(hoursOfOperation.open[currentDay].start, 10)
  <= currentTime
  <= parseInt(hoursOfOperation.open[currentDay].end, 10)) {
    return true;
  }
  return false;
};

export default formatHoursOfOperation;
