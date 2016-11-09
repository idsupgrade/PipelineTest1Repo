/**
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 */
/*eslint-env node */
"use strict";

var nconf = require("nconf");

/*
 * Initializes and validates the app configuration.
 */
exports.init = function() {
    nconf.env("__");
};
