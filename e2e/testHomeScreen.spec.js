describe('Home Screen', () => {
  beforeAll(async () => {
    await device.launchApp(); // Khởi động ứng dụng
  });

  it('should display "Current Balance:" text', async () => {
    // Kiểm tra xem có text 'Current Balance' trong màn hình không
    await expect(element(by.text('Số Dư Hiện Tại: '))).toBeVisible();
  });
});
