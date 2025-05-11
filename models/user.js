const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const Joi = require("joi")

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  f_token: { type: String, default: "" },
});

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "12h",
  });
  return token;
};

const User = mongoose.model("users", UserSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    number: Joi.string().length(10).required().label("Number"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
