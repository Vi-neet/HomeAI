const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// Static signup method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }
  const salt = await bycrypt.genSalt(10);
  const hashedPW = await bycrypt.hash(password, salt);

  const user = await this.create({ email, password: hashedPW });
  return user;
};

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("incorrect email");
  }
  const matchPW = await bycrypt.compare(password, user.password);
  if (!matchPW) {
    throw Error("incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
