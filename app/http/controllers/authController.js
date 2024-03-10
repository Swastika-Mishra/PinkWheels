const passport = require('passport')
const Passenger = require('../../models/passengers')
const bcrypt = require('bcrypt')

function authController() {
    return {
        login(req, res) {
            res.render('home')
        },
        async postLogin(req,res,next){
            passport.authenticate('local',(err, passenger, info)=>{
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }
                if(!passenger){
                    req.flash('error', info.message)
                    return res.redirect('/home')
                }
                req.logIn(passenger,()=>{
                    if(err){
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect('/dashboard')
                })
            })(req,res,next)
        },
        register(req, res) {
            res.render('register')
        },
        async postRegister(req, res) {
            const { name, phone, email, password } = req.body
            if (!name || !email || !password || !phone) {
                req.flash('error', 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
                req.flash('phone', phone)
                return res.redirect('/register')
            }
            
            const is_exists = await Passenger.exists({ phone: phone });
                if (is_exists) {
                    req.flash('error', 'Phone number already registered')
                    req.flash('name', name)
                    req.flash('email', email)
                    req.flash('phone', phone)
                    return res.redirect('/register')
                }

            //hash password
            const hashedpassword = await bcrypt.hash(password, 10)

            //create user
            const passenger = new Passenger({
                name,
                email,
                phone,
                password: hashedpassword
            })

            passenger.save().then(() => {
                return res.redirect('/home')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/register')
            })
        }
    }
}
module.exports = authController