const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const { category, location } = req.query;
    let filter = {};

    if (category) {
        filter.category = category;
    }

    if (location) {
        filter.location = new RegExp(location, "i");
    }

    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", { allListings, location });
};


module.exports.renderNewForm = async(req, res, next) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path : "reviews",
        populate : {
            path : "author",
        },
    }).populate("owner");
    console.log(listing)
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing); 
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "new Listing Created!")
    res.redirect("/listings"); 
}; 

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
};

module.exports.updateListing = async(req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.location = req.body.listing.location;
    listing.country = req.body.listing.country;
    listing.price = req.body.listing.price;
    listing.category = req.body.listing.category;
    if (req.file){
        listing.image = {
            url : req.file.path,
            filename : req.file.filename
        };
    }

    await listing.save();
    req.session.success = "Listing updated successfully!";
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyListing = async(req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id)
    console.log(deletedListing);
    res.redirect("/listings");
}