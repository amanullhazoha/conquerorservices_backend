const generatePassword = () => {
  const specialChars = "!@#$%^&*()_+{}[]|:;<>?,.";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const allChars = specialChars + lowercaseChars + uppercaseChars + numbers;

  const getRandomChar = (chars) =>
    chars[Math.floor(Math.random() * chars.length)];

  const passwordArray = [
    getRandomChar(specialChars),
    getRandomChar(lowercaseChars),
    getRandomChar(uppercaseChars),
    getRandomChar(numbers),
  ];

  for (let i = 4; i < 8; i++) {
    passwordArray.push(getRandomChar(allChars));
  }

  const shuffledPassword = passwordArray.sort(() => Math.random() - 0.5);

  return shuffledPassword.join("");
};

module.exports = {
  generatePassword,
};
