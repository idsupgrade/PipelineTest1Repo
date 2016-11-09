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

/*    // feed VCAP_SERVICES info nconf
    if (process.env.NODE_ENV === 'production') {
        nconf.overrides(loadVcapServices());
    }
};

function loadVcapServices() {
    var props = {};
    if (process.env.VCAP_SERVICES) {
        var vcapServices = JSON.parse(process.env.VCAP_SERVICES);
        // TIAM
        var userProvided = vcapServices['user-provided'];
        if (userProvided) {
            userProvided.forEach(function(i) {
                if (i.name === 'otc-tiam-clients' && i.credentials) {
                    var clientId = nconf.get('TIAM_CLIENT_ID');
                    if (clientId) {
                        var creds = i.credentials[clientId];
                        if (creds && creds.secret) {
                            props['TIAM_CLIENT_SECRET'] = creds.secret;
                        }
                    }
                }
            });
        }
        // MQLight
        var mqlight = vcapServices['mqlight'];
        if (mqlight && mqlight[0]) {
            var c = mqlight[0].credentials;
            if (c) {
                props['MQLIGHT_CONNECTION_LOOKUP_URI'] = c.connectionLookupURI;
                props['MQLIGHT_USER'] = c.username;
                props['MQLIGHT_PASSWORD'] = c.password;
            }
        }
    }
    return props;
};
*/
