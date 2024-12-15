const express = require('express');
const router = express.Router({ mergeParams: true }); //app.js se id nhi aa rahi hai to mergeParams ka use kiya hai 
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const ReviewController = require("../controllers/reviews.js");



// review all
//post routes
router.post("/", isLoggedIn, validateReview, wrapAsync(ReviewController.createReview));

//delete review routes
router.delete("/:reviewId", isReviewAuthor, wrapAsync(ReviewController.destroyReview));



module.exports = router;