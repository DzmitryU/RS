'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const {getByKey, verify, get} = require('../resources/users/user.service');
const {JWT_SECRET_KEY} = require('./config');

const allowUrl = ['/', '/doc','/login'];

const configureAuth = (app) => {
    app.use(passport.initialize());
    configureLogin(app);
    configureJwt(app);
};

const configureLogin = (app) => {
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
                res.json({token: jwt.sign({id: user.id, login: user.login}, JWT_SECRET_KEY)});
            } else {
                res.status(HttpStatus.FORBIDDEN).send();
            }
        })(req, res, next);
    });
};

const configureJwt = (app) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET_KEY
    }

    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        try {
            const user = await get(jwt_payload.id);

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(err, false);
        }
    }));

    app.use((req, res, next) => {
        passport.authenticate('jwt', { session: false }, function (err, user) {
            if (allowUrl.includes(req.url) || user) {
                return next();
            }
            res.status(HttpStatus.UNAUTHORIZED).send();
        })(req, res, next);
    });
}

module.exports = {
    configureAuth,
}