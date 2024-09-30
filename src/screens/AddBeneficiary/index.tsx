import React from 'react';
import { View, StyleSheet } from 'react-native';
// Lib
import { TextInput, Button, Text } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
// Helper
import { generateIBAN } from 'helper';
// Zustand
import { useStore } from '@store';
import { useTranslation } from 'react-i18next';

const AddBeneficiaryScreen: React.FC<any> = ({ navigation }) => {
  const { t } = useTranslation();
  const addBeneficiary = useStore(state => state.addBeneficiary);

  const BeneficiarySchema = Yup.object().shape({
    firstName: Yup.string().required(t('pleaseEnterFirstName')),
    lastName: Yup.string().required(t('pleaseEnterLastName')),
    iban: Yup.string().required(t('pleaseEnterIBAN')),
  });

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ firstName: '', lastName: '', iban: '' }}
        validationSchema={BeneficiarySchema}
        onSubmit={values => {
          const newBeneficiary = {
            id: Date.now(),
            firstName: values.firstName,
            lastName: values.lastName,
            iban: values.iban,
          };
          addBeneficiary(newBeneficiary);
          navigation.goBack();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <TextInput
              label={t('firstName')}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
              mode="outlined"
              error={touched.firstName && !!errors.firstName}
              style={styles.input}
            />
            {touched.firstName && errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}

            <TextInput
              label={t('lastName')}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
              mode="outlined"
              error={touched.lastName && !!errors.lastName}
              style={styles.input}
            />
            {touched.lastName && errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}

            <TextInput
              label="IBAN"
              onChangeText={handleChange('iban')}
              onBlur={handleBlur('iban')}
              value={values.iban}
              mode="outlined"
              error={touched.iban && !!errors.iban}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon="close"
                  onPress={() => {
                    setFieldValue('iban', '');
                  }}
                />
              }
            />
            {touched.iban && errors.iban && (
              <Text style={styles.errorText}>{errors.iban}</Text>
            )}

            {/* Nút để sinh IBAN */}
            <Button
              mode="outlined"
              onPress={() => {
                const newIBAN = generateIBAN();
                setFieldValue('iban', newIBAN);
              }}
              style={styles.generateButton}
            >
              {t('generateIBAN')}
            </Button>

            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}
            >
              {t('adđBeneficiary')}
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  generateButton: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default AddBeneficiaryScreen;
