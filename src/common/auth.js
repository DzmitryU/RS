'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');

const {getByKey, verify} = require('../resources/users/user.service');
const {JWT_SECRET_KEY} = require('./config');

const configureAuth = (app) => {
    app.use(passport.initialize());
    passport.use(new LocalStrategy({usernameField: 'login'},
        async function (username, password, done) {
            try {
                const users = await getByKey('login', username);
                if (!users || !users[0]) {
                    return done(null, false);
                }
                const match = await verify(users[0], password);
                if (!match) {
                    return done(null, false);
                }
                return done(null, users[0]);
            } catch (err) {
                done(err);
            }
        })
    );

    app.post('/login', (req, res, next) => {
            passport.authenticate('local', {}, function (err, user) {
                if (user) {
                    res.json({token: jwt.sign({userId: user.id, login: user.login}, JWT_SECRET_KEY)});
                } else {
                    res.status(HttpStatus.UNAUTHORIZED).send();
                }
            })(req, res, next);
        });
};

module.exports = {
    configureAuth,
}