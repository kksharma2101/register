import { Schema, model } from "mongoose";
// import isEmail from "validator";
import bcrypt from "bcrypt";
// import JWT from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email"],
      // unique: true,
      lowercase: true,
      // validate: [isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
      minlength: [6, "Minimum password length is 6"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// bcrypt method
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next;
  }
  this.password = await bcrypt.hash(this.password, 8);
});
// jwttoken method
// userSchema.method = {
//   // generatAuthToken: async function () {
//   //   JWT.sign(
//   //     {
//   //       id: this._id,
//   //       email: this.email,
//   //     },
//   //     process.env.JWT_SECRET,
//   //     {
//   //       expiresIn: 2 * 24 * 60 * 60 * 1000,
//   //     }
//   //   );
//   // },
//   comparePassword: async function (plaintextPassword) {
//     return await bcrypt.compare(plaintextPassword, this.password);
//   },
// };

//
const user = model("User", userSchema);
export default user;
