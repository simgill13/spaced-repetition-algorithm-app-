const path = require('path');
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL || 'mongodb://sim:space@ds161960.mlab.com:61960/spacerep';
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const {User} = require('./models');

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
                .updateOne({accessToken:accessToken})
                .exec()
                .then(data => {
                    return cb(null, data);
                })
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





app.get('/api/user', (req, res) => {
  User
  .find()
  .exec()
  .then(data => res.json(data)
  .catch(console.error)
)}
);



// Job 3: Update this callback to try to find a user with a
            // matching access token in Mongo.  If they exist, let em in, if not,
            // don't.



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
        googleId:req.authInfo
    })
});

app.get('/api/questions',
    passport.authenticate('bearer', {session: false}),
    (req, res) => res.json(['Question 1', 'Question 2'])
);






































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
