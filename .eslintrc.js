module.exports = {
  'extends': 'google',
  'es6': true,
  'env': {
    browser: true,
    node: true
  },
  'globals': {
    createjs: true
  },
  'rules': {
    'max-len': [1, 120, 4],
    'quote-props': [0, 'as-needed'],
    'no-else-return': 0,
    'require-jsdoc': 0
  }
};
