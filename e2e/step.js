const tapText = async text => {
  await element(by.text(text)).tap();
};

const typeToTextField = async (id, value) => {
  await element(by.id(id)).tap();
  await element(by.id(id)).typeText(value);
};

const expectElementVisible = async (value, type) => {
  if (type === 'text') {
    await expect(element(by.text(value))).toBeVisible();
  } else {
    await expect(element(by.id(value))).toBeVisible();
  }
};

const tapId = async id => {
  await element(by.id(id)).tap();
};

const waitForElement = async (value, seconds, type) => {
  if (type === 'text') {
    await waitFor(element(by.text(value)))
      .toBeVisible()
      .withTimeout(seconds);
    await expectElementVisible(value, 'text');
  } else {
    await waitFor(element(by.id(value)))
      .toBeVisible()
      .withTimeout(seconds);
    await expectElementVisible(value, 'id');
  }
};

module.exports = {
  tapText,
  typeToTextField,
  expectElementVisible,
  tapId,
  waitForElement,
};
