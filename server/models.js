const mongoose = require('mongoose');


//ADDED THE USER SCHEMA
const userSchema = mongoose.Schema({
  displayName: {type: String},
  googleId: {type: String},
  googlePic: String,
  accessToken: String,
  usersQuestions: {type:Array, default: [
    {
        english: 'Hello',
        spanish: 'Hola',
        defaultOrder: 1,
        memoryValue: 1
    },
    {
        english: 'Water',
        spanish: 'Agua',
        defaultOrder: 2,
        memoryValue: 1
    },
    {
        english: 'Where',
        spanish: 'Donde',
        defaultOrder: 3,
        memoryValue: 1
    },
    {
        english: 'And',
        spanish: 'Y',
        defaultOrder: 4,
        memoryValue: 1
    },
    {
        english: 'I',
        spanish: 'Yo',
        defaultOrder: 5,
        memoryValue: 1
    },
    {
        english: 'Good',
        spanish: 'Bueno',
        defaultOrder: 6,
        memoryValue: 1
    },
    {
        english: 'Bad',
        spanish: 'Mal',
        defaultOrder: 7,
        memoryValue: 1
    },
    {
        english: 'Yes',
        spanish: 'Si',
        defaultOrder: 8,
        memoryValue: 1
    },
    {
        english: 'No',
        spanish: 'No',
        defaultOrder: 9,
        memoryValue: 1
    },
    {
        english: 'Please',
        spanish: 'Por Favor',
        defaultOrder: 10,
        memoryValue: 1
    }

]}
});

const questionSchema = mongoose.Schema({
  english: String,
  spanish: String,
  defaultOrder: Number,
  memoryValue: Number
});





const User = mongoose.model('User',userSchema);
const Questions = mongoose.model('Questions', questionSchema);


module.exports = {User, Questions};