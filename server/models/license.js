/**
 * Created by velmkris on 2/11/2015.
 */
'use strict';

/**
 * Module dependencies.*/


var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema,
    _   = require('lodash');

var LicenseSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNo: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    startDate:{
        type: String,
        unique: true,
        required: true
    },
    endDate:{
        type: String,
        unique: true,
        required: true
    },
    licenseKey: {
        type: String,
        unique: true,
        required: true
    }
});
mongoose.model('License', LicenseSchema);
