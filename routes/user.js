const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

const userController = require('../controllers/users.js');


// passportjs.org documentation

router
    .route('/signup')
    .get(userController.renderSignUpForm)
    .post(wrapAsync(userController.signUp));




router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
        userController.logIn);


router.get("/logout", userController.logOut);


module.exports = router;


// router.get("/signup", userController.renderSignUpForm);
// //********* signup route*******/
// router.post("/signup", wrapAsync(userController.signUp));


//*********render login*******/
// router.get("/login", userController.renderLoginForm);
// //*********login*******/
// router.post("/login", saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login",failureFlash: true,}),userController.logIn);




//************log out************** */
