const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Passenger = require('../models/passengers');
const passport = require('passport');

function init() {
    passport.use(new LocalStrategy({ usernameField: 'phone' }, async (phone,password, done) => {
        const passenger = await Passenger.findOne({ phone: phone })
        if (!passenger) {
            return done(null, false, { message: "No user with this phone number" })
        }

        bcrypt.compare(password, passenger.password).then(match => {
            if (match) {
                return done(null, passenger, { message: "Log in success" })
            }
            return done(null, false, { message: "Wrong Username or Password" })
        }).catch(err => {
            return done(null, false, { message: "Something went wrong" })
        })

    }))

    passport.serializeUser((passenger, done) => {
        done(null, passenger._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            await Passenger.findById(id)
                .then(passenger => {
                    if (!passenger) {
                        return done(null, false, { message: 'Passenger not found' });
                    }
                    done(null, passenger);
                })
        }
        catch (err) {
            console.log(err);
            done(err);
        }
    })

}

module.exports = init
