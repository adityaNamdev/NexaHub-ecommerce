const bcrypt = require("bcrypt");

const generateHash = async (password) => {
  try {
    const saltRounds = 7;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const compareHash = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = { generateHash, compareHash };
