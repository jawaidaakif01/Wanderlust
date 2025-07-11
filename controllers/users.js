const User = require("../models/user");
const passport = require("passport")

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async(req, res) => {
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.logIn(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.session.success = "Welcome to Wanderlust!";
            res.redirect("/listings");
        })
        
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    
}

module.exports.renderLoginForm = (req, res) => {
    const errMsg = req.session.errMsg;
    delete req.session.errMsg;
    res.render("users/login.ejs", {errMsg});
}

module.exports.login = async(req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err){
            return next(err);
        }
        if(!user){
            let errMsg = info?.message || "Invalid username or password";
            req.session.errMsg = errMsg;
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if(err){
                return next(err);
            }
            req.session.success = "Welcome to Wanderlust!";
            return res.redirect(res.locals.redirectUrl || "/listings");
        });
    })(req, res, next);
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.session.success = "You have logged out!";
        res.redirect("/listings");
    })
}