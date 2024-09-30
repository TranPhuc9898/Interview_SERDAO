import IBAN from 'iban';

{
  /**
   * Hàm tự động render ra IBAN
   */
}
export const generateIBAN = () => {
  const countryCode = 'GB';
  const bankIdentifiers = ['NWBK', 'BARC', 'LOYD', 'HSBC']; // Danh sách mã ngân hàng hợp lệ

  const bankIdentifier =
    bankIdentifiers[Math.floor(Math.random() * bankIdentifiers.length)];
  const branchCode = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0'); // 6 chữ số
  const accountNumber = Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, '0'); // 8 chữ số

  const bban = bankIdentifier + branchCode + accountNumber;

  try {
    const iban = IBAN.fromBBAN(countryCode, bban);
    return iban;
  } catch (error) {
    console.error('Error generating IBAN:', error);
    return generateIBAN(); // Thử lại nếu gặp lỗi
  }
};
