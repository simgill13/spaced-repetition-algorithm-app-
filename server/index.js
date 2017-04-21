const path = require('path');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL || 'mongodb://sim:space@ds161960.mlab.com:61960/spacerep';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const {User, Questions} = require('./models');

let secret = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
}

if(process.env.NODE_ENV != 'production') {
  secret = require('./secret');
}

const app = express();

app.use(passport.initialize());
app.use(bodyParser.json())

const database = {
};

passport.use(
    new GoogleStrategy({
        clientID:  secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        callbackURL: `/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
        User
        .findOne({googleId: profile.id})
        .exec()
        .then(data => {
            if (data == null){
                User
                .create({
                    displayName: profile.displayName,
                    googlePic: profile.photos[0].value,
                    googleId: profile.id,
                    accessToken: accessToken
                })
                .then(newPost =>{
                   
                    return cb(null, newPost);
                })
            }
            else {
                    User
                    .findOneAndUpdate(
                    {googleId: profile.id},
                    {$set: {accessToken: accessToken}},
                    {safe: true, new:true},
                    function(err, user) {
                        if(err){
                    }
                    return cb(null, user);
                }
            )          
            }  
        }) 
    }
));

app.get('/api/auth/google',
    passport.authenticate('google', {
        scope: ['profile']
    })
    
);

app.get('/api/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        session: false
    }),
    (req, res) => {
        res.cookie('accessToken', req.user.accessToken, {expires: 0});
        res.cookie('displayName', req.user.displayName, {expires: 0});
        res.redirect('/');
    }
);


app.post('/api/user', (req, res) => {
  console.log(req.body);
  User
  .create({
    displayName: req.body.displayName,
    googlePic: req.body.googlePic,
    googleId: req.body.googleId,
    accessToken: req.body.accessToken
  })
  .then(newPost =>{
    res.status(201).json(newPost)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message:'internal server error'});
  })

});







app.put('/api/users/:googleId/questions', (req, res) => {
    console.log(req.body)
 
  User
  .findOneAndUpdate({googleId: req.params.googleId},{$set:{usersQuestions:req.body}})
  .exec()
  .then(user =>{
    // console.log(user)
    res.status(201).json(user)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({message:'internal server error'});
  })

});



















app.put('/api/users/:googleId/questions/memoryValue', (req, res) => {
    console.log('BEFORE DB',req.body.i)
  User
  .findOne({googleId: req.params.googleId})
  .exec()
  .then(user =>{
    user.usersQuestions[req.body.i].memoryValue = (user.usersQuestions[req.body.i].memoryValue * 2) + 1
    user.usersQuestions.sort((a,b)=>a.memoryValue-b.memoryValue)
    // user.usersQuestions = [...user.usersQuestions.slice(1,5),user.usersQuestions[0],...user.usersQuestions.slice(5)]
    return user.save()
  })
  .then(sorted => {
    console.log('sorted',sorted)
    res.send(sorted);
  })
});

app.put('/api/users/:googleId/questions/memoryValue/decreasing', (req, res) => {
    console.log('BEFORE DB',req.body.i)
  User
  .findOne({googleId: req.params.googleId})
  .exec()
  .then(user =>{
    user.usersQuestions[req.body.i].memoryValue = user.usersQuestions[req.body.i].memoryValue =1
    // user.usersQuestions.sort((a,b)=>a.memoryValue-b.memoryValue)
    user.usersQuestions = [...user.usersQuestions.slice(1,5),user.usersQuestions[0],...user.usersQuestions.slice(5)]

     return user.save()
  })
  .then(sorted => {
    console.log('sorted',sorted)
    res.send(sorted);
  })
  
});

app.get('/api/user/:accessToken', (req, res) => {
  User
  .findOne()
  .exec()
  .then(data => res.json(data)
  .catch(console.error)
 )}
);

app.get('/api/user', (req, res) => {
  User
  .find()
  .exec()
  .then(data => res.json(data)
  .catch(console.error)
)}
);

passport.use(
    new BearerStrategy(
        (token, done) => {
            User
            .findOne({accessToken: token})
            .exec()
            .then(data => {
                if(data.accessToken !== token){
                    return done(null, false);
                }
                else{
                    return done(null, data.displayName,data.googleId); // MADE CHANGES HERE
                }
            })
        }
    )
);

app.get('/api/auth/logout', (req, res) => {
    req.logout();
    res.clearCookie('accessToken');
    res.redirect('/');
});

//MADE SOME CHANGES HERE
app.get('/api/me',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
        res.json({
        displayName: req.user,
        googleId:req.authInfo,
    })
});
//Question seed data
const questionSeed = [
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

];



app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => {
        Questions
        .find()
        .exec()
        .then(data => {
            // console.log('data before if:', data)
            if(data.length == 0) {
                // console.log('data is:', data)
                Questions
                    .insertMany(questionSeed)
                    .then(newPost =>{
                        return cb(null, newPost);
                    })
            } else {
                return res.json(data);
            }
        })
    });










//   app.put('/api/user/inc/:googleid/:indexval', (req, res) => {
  

//     let memoryValue = req.body.memoryValue;
//     let indexVal = req.params.indexval;
  
//     User
//         .findOne({googleId: req.params.googleid})
//         .exec()
//         .then(user => {
//             user.usersQuestions[indexval].memoryValue *=2
//             return user.save()
//         })
//         .then(user => {
//             console.log(user)
//         })
// })

//  app.put('/api/user/dec/:googleid/:indexval', (req, res) => {
  

//     let memoryValue = req.body.memoryValue;
//     let indexVal = req.params.indexval;
  
//     User
//         .findOne({googleId: req.params.googleid})
//         .exec()
//         .then(user => {
//             user.usersQuestions[indexval].memoryValue =1
//             return user.save()
//         })
//         .then(user => {
//             console.log(user)
//         })
// })































// Serve the built client
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Unhandled requests which aren't for the API should serve index.html so
// client-side routing using browserHistory can function
app.get(/^(?!\/api(\/|$))/, (req, res) => {
    const index = path.resolve(__dirname, '../client/build', 'index.html');
    res.sendFile(index);
});

let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {
         mongoose.connect(DATABASE_URL, err => {
            if(err) {
              return reject(err);
        }
            console.log('Db connected');
            server = app.listen(port, () => {
                resolve();
            }).on('error', reject);
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};
