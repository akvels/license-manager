'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    License = mongoose.model('License'),
    async = require('async'),
    config = require('meanio').loadConfig(),
    CryptoJS = require("crypto-js");


/**
 * Create License
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);

    user.provider = 'local';

    // because we set our user.provider to local our models/user.js validation will always be true
    req.assert('name', 'You must enter a name').notEmpty();
    req.assert('email', 'You must enter a valid email address').isEmail();
    req.assert('username', 'Username cannot be more than 20 characters').len(1, 20);
    //var license = new Licse
    var errors = req.validationErrors();
    if (errors) {
        return res.status(400).send(errors);
    }
    var options = { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };
    var lData = {
        type:"Free",
        email:"akvels@gmail.com",
        username:"velanvel",
        startDate:"1/1/2015",
        endDate:"1/1/2016"
    };
    console.log("VEL Encryption");
    var json_string = JSON.stringify(lData);
    console.log("JSON String",json_string);
    /*** encrypt */
    var json = CryptoJS.AES.encrypt(json_string, "MILI", options);
    var ciphertext = json.ciphertext.toString(CryptoJS.enc.Base64);
    console.log(ciphertext.toString());
    console.log("VEL Decryption");
    /*** decrypt */


    var license = new License(lData);
    license.save(function(err){
        if(err){
            console.log("Error while updating the license");
        }
    });
};

/**
 * validate license by licenseKey
 */
exports.validateLicense = function(req, res, next,licenseKey) {
    var options = { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };
    var decrypted = CryptoJS.AES.decrypt(json, "MILI", options);
    var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    console.log("DECRYPTED",plaintext);
    var org_json = JSON.parse(plaintext);
    console.log(org_json);
    License
        .findOne({
            licenseKey: licenseKey
        })
        .exec(function(err, license) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to validate License ' + id));
            req.profile = user;
            next();
        });
};