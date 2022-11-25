const { isAuth, isLogined }   = require("../middleware/user");
const jwt          = require('jsonwebtoken');
const path          = require("path");

module.exports = function(app, passport){

    app.get("/", isAuth, (req, res)=>{
        return res.sendFile(path.join(__dirname, "../views/index.html"));
    });
    
    app.get("/login", isLogined, (req, res)=>{
        return res.sendFile(path.join(__dirname, "../views/login.html"));
    });
    
    app.post(
        "/login",
        passport.authenticate("local", { failureRedirect: '/login'}), 
        (req, res)=>{
            res.redirect('/');
        }
    )
    
    app.get('/logout', function(req, res, next) {
        req.logout(function(err) {
            if (err) { return next(err); }
            console.log(req.session);
            res.redirect('/');
        });
    });
    
    app.get("/token", async (req, res)=>{
        const token = jwt.sign(
            {
                id: USER.id
            },
            "secretKey",
            // SSO_PRIVATE_CERT,
            {
                algorithm: 'HS256',
                expiresIn: 60 * 5, //senconds
            }
        );
        return res.send({ token });
    })
}