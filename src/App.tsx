import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TransactionScreen from '@screens/TransactionScreen';
import AddBeneficiaryScreen from '@screens/AddBeneficiary';
import HomeScreen from '@screens/HomeScreen';

import './i18n'; // Import i18n để khởi tạo khi ứng dụng chạy

import { LogBox } from 'react-native';
const Stack = createNativeStackNavigator();

// Bỏ qua cảnh báo cụ thể
LogBox.ignoreLogs([
  /i18next::pluralResolver: Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling./, // Sử dụng regex để bỏ qua mọi cảnh báo chứa 'i18next::pluralResolver'
]);
const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen
            name="TransactionScreen"
            component={TransactionScreen}
          />
          <Stack.Screen
            name="AddBeneficiary"
            component={AddBeneficiaryScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
