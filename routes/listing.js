const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


//index route && create routes//
router
    .route('/')
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,
        upload.single('listing[image]'),
        validateListing,

        wrapAsync(listingController.createListing));


// app.get("/testListing", async (req, res) => {
//     let samleListing = new Listing({
//         tite: "my new villa",
//         description: "by the beach",
//         price: 1200,
//         location: "New York, NY",
//         country: "United",
//     });
//     await samleListing.save();
//     console.log("sample was saved successfully")
//     res.send("sample was saved successfully");
// });

//new routes.

router.get("/new", isLoggedIn, (listingController.renderNewform));

//show routes
//Delete ROUNTE
//update routes
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,
        isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


//edit routes
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editlisting));


//creaet rounte//update routes//Delete ROUNTE
// router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
