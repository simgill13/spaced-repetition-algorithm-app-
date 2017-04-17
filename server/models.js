const mongoose = require('mongoose');


//ADDED THE USER SCHEMA
const userSchema = mongoose.Schema({

  displayName: {type: String},
  googleId: {type: String},
  googlePic: String,
  accessToken: String  
})





const User = mongoose.model('User',userSchema);


module.exports = {User};