
const LocalStrategy = require("passport-local").Strategy;

const USER = {
    email : 'dangtung006@gmail.com',
    password : '123456'
}

module.exports = function(app, passport){

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        "local",
        new LocalStrategy( {
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true 
        }, async( req, username, password, done )=>{
        try{
            if(USER.email != username) return done(null, false,  { message: 'Incorrect username.' });
            if(USER.password != password) return done(null, false,  { message: 'Incorrect password.' });
            return done(null, USER);
        }catch(err){
            console.log("Authen Login Fail" , err);
            return done(null, false);
        }
    }));

    passport.serializeUser((user, done)=>{
        return done(null, user.email);
    });
    
    passport.deserializeUser(async (email, done)=>{
        try{
            if(USER.email == email) return done(null, email);
            return done(null, USER);
        }catch(err){
            console.log("Authen Login Fail" , err);
            return done(null, false);
        }
    });
}