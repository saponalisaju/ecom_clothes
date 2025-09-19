const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      // minLength: [6, "The length of user password can be 6 character"],
      // set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
