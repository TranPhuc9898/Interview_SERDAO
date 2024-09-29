// src/i18n/index.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import resources from '../libs/localization'; // Import từ libs/localization

// Lấy ngôn ngữ thiết bị
const deviceLocales = getLocales();
const deviceLanguageCode = deviceLocales[0]?.languageCode || 'en';

// Hàm lấy ngôn ngữ đã lưu hoặc ngôn ngữ thiết bị
const getLanguage = async (): Promise<string> => {
  try {
    const savedLanguage = await AsyncStorage.getItem('user-language');
    if (savedLanguage && resources[savedLanguage]) {
      return savedLanguage;
    } else if (resources[deviceLanguageCode]) {
      return deviceLanguageCode;
    } else {
      return 'en'; // Ngôn ngữ mặc định
    }
  } catch (error) {
    console.error('Failed to load language from storage', error);
    return 'en'; // Ngôn ngữ mặc định
  }
};

// Hàm khởi tạo i18n
const initializeI18n = async () => {
  const language = await getLanguage();

  i18n.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // Không cần vì React đã tự động escape
    },
    react: {
      useSuspense: false, // Tắt suspense để tránh lỗi khi sử dụng trong React Native
    },
  });
};

initializeI18n();

export default i18n;
