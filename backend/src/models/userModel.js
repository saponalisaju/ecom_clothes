const mongoose = require("mongoose");

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
      required: true,
    },
    // cartData: {
    //   type: Object,
    //   default: {},
    // },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;
