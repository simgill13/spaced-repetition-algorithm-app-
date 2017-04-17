const mongoose = require('mongoose');


//ADDED THE USER SCHEMA
const userSchema = mongoose.Schema({

  displayName: {type: String},
  googleId: {type: String},
  googlePic: String,
  accessToken: String,
  questions: {type: Array, default: [{
      	question: 1,
      	spanish: "Hola",
      	english:"Hello",
      	memoryVal: 1,
      	correct: false	
      },
      {
      	question: 2,
      	spanish: "Agua",
      	english:"Water",
      	memoryVal: 1,
      	correct: false	
      }]
  	}

})





const User = mongoose.model('User',userSchema);


module.exports = {User};