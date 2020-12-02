// styleguide.config.js
const path = require('path');

module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/Provider.js'),
  },
  components: path.join(__dirname, 'src/components/**/[A-Z]*.jsx'),
};
