const bcrypt = require("bcrypt");

const emailValidate = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const hashPassword = async (password) => {
  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword;
  } catch (err) {
    console.log(`Error in Hashing the Password: ${err}`);
  }
};

const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = {
  emailValidate,
  hashPassword,
  comparePassword,
};
