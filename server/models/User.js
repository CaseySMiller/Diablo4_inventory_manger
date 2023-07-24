const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userAspectSchema = require('./UserAspect');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      match: [/^(?=.*[A-Za-z0-9]).{5,}$/, 'Must use a valid username'],
    },
    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    characters: {
      type: [String],
    },
    // set of eternal realm user owned aspects
    eAspects: [userAspectSchema],
    // set of seasonal realm user owned aspects
    sAspects: [userAspectSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('sAspectCount').get(function () {
  return this.sAspects.length;
});

const User = model('User', userSchema);

module.exports = User;
