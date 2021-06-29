module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'max-len': 0,
    'react/react-in-jsx-scope': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'no-unused-vars': 0,
    'import/no-named-as-default-member': 0,
  },
};
