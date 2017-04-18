const mongoose = require('mongoose');


//ADDED THE USER SCHEMA
const userSchema = mongoose.Schema({

  displayName: {type: String},
  googleId: {type: String},
  googlePic: String,
  accessToken: String,
  userAnswers: Array,
  questionOrder: {type: Array}
});

const questionSchema = mongoose.Schema({
  english: String,
  spanish: String,
  defaultOrder: Number
});





const User = mongoose.model('User',userSchema);
const Questions = mongoose.model('Questions', questionSchema);


module.exports = {User, Questions};