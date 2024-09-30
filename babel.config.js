module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'], // Thay đổi root thành './' để bắt đầu từ thư mục gốc dự án
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: './tests/',
          '@component': './src/component',
          '@src': './src',
          '@apis': './src/apis/',
          '@screens': './src/screens/',
          '@helper': './src/helper/',
          '@i18n': './src/libs/localization/',
          '@config': './src/libs/config/',
          '@context': './src/libs/context/',
          '@constants': './src/libs/constants/',
          '@hooks': './src/hooks/',
          '@store': './src/store/',
          '@': './',
          '@types': './src/types',
        },
      },
    ],
  ],
};
