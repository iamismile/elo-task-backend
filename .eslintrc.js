module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-underscore-dangle': 0,
    'comma-dangle': ['error', 'only-multiline'],
    'no-param-reassign': 0,
    'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|val' }],
    'consistent-return': 0,
  },
};
