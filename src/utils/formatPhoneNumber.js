/**
 * * Formats the phone number from '+12345678900' to "+1 (234) 567-8900"
 *  * @param {string} phoneNumberString - From /spaces
 * @returns {string} formatted phone Number
*/

const formatPhoneNumber = (phoneNumberString) => {
  const cleaned = (`${phoneNumberString}`.replace(/\D/g, ''));
  console.log(cleaned);
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  console.log(match);
  if (match) {
    const intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
};

export default formatPhoneNumber;
