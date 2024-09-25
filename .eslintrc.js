module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:prettier/recommended', // Kết hợp với Prettier
    'plugin:react/recommended', // Kết hợp với React
  ],
  plugins: ['prettier'],
  rules: {
    'react/jsx-uses-react': 'off', // Không cần import React trong JSX
    'react/react-in-jsx-scope': 'off', // Không cần import React trong scope
    'prettier/prettier': ['error'], // Báo lỗi nếu có xung đột với Prettier
    'no-unused-vars': 'warn', // Cảnh báo về biến không sử dụng
    'no-console': 'warn', // Cảnh báo về console.log
    'react/prop-types': 'off', // Tắt kiểm tra PropTypes nếu dùng TypeScript
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect', // Tự động phát hiện phiên bản React
    },
  },
};
