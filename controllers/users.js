const User = require('../models/user.js');
const passport = require('passport');


//************rendersignup************** */
module.exports.renderSignUpForm = (req, res) => {
    res.render("users/signup.ejs");
};


//*************signup************* */
module.exports.signUp = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerdUser = await User.register(newUser, password);
        console.log(registerdUser);
        req.login(registerdUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', "Registration successful, Welcome to Wunderlust");
            res.redirect('/listings');
        });

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }

};
//**********render login**************** */
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

//************login************** */
module.exports.logIn = async (req, res) => {

    req.flash("success", "welcome back to wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

//************log out************** */

module.exports.logOut = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged you out!");
        res.redirect("/listings");
    });
};


