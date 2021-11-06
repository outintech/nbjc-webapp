module.exports = {
  extends: ['airbnb'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
    'import/no-extraneous-dependencies': 0,
    'no-plusplus': 0,
    'prefer-destructuring': 0,
    "linebreak-style": ["error", (process.platform === "win32" ? "windows" : "unix")] // https://stackoverflow.com/q/39114446/2771889
  },
  globals: {
    window: true,
    navigator: true,
    document: true,
  },
  overrides: [
    {
      files: ['*.test.js', '*.test.jsx'],

      rules: {
        /**
         * props spreading is a very common usecase in tests
         * when you have a set of props initially (in a before) and
         * then might want to test different variations of those
         * props in the test suite.
         */
        'react/jsx-props-no-spreading': 0,
        /**
         * in test files, without this rule, eslint considers
         * the `test` and `expect` keywords to be undefined
         */
        'no-undef': 0,
      },
    },
  ],
};
