const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js")
const ListingController = require("../controllers/listings.js");

router.route("/")
    .get(wrapAsync(ListingController.index))
    .post(isLoggedIn, validateListing, wrapAsync(ListingController.createListing));
    
 
//New Route
router.get("/new", isLoggedIn, ListingController.renderNewForm);

router.route("/:id")
    .get(wrapAsync(ListingController.showListing))
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(ListingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(ListingController.destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.renderEditForm));


module.exports = router;