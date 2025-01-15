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

const generateRefCode = (dob, firstName, lastName, mobileNumber) => {
  const yearOfBirth = new Date(dob).getFullYear().toString();

  const firstLetter = firstName.charAt(0).toUpperCase();
  const lastLetter = lastName.charAt(lastName.length - 1).toUpperCase();

  const lastTwoDigits = mobileNumber.slice(-2);

  const randomLetter = () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26));

  const randomLetters = randomLetter() + randomLetter();

  const refCode =
    randomLetters + yearOfBirth + firstLetter + lastLetter + lastTwoDigits;

  return refCode.slice(0, 10);
};


module.exports = {
  generateRefCode,
  generatePassword,
};
