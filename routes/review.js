const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")

const reviewController = require("../controllers/reviews.js");
const { destroyListing } = require("../controllers/listings.js");


//Reviews
//POST review Route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

//Delete review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, 
    wrapAsync(reviewController.destroyReview)
)

module.exports = router;