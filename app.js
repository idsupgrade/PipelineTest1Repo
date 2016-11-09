/*eslint-env node, express*/

var port = process.env.VCAP_APP_PORT || 3000;
var express = require("express");

var app = express();

var appConfig = require("./config"),
    nconf = require("nconf");

// configure logging, configuration, i18n early
appConfig.init();

var migratingProject;

function resetMonitoring() {
    migratingProject = "";
}

function beginMonitoring(project) {
     // cleanup if we're re-setting the monitoring
    if (migratingProject) {
        resetMonitoring();
    }
    migratingProject = project;
}


app.get("/",
    function (req, res) {
        var welcomeResponse = "<HEAD>" +
            "<title>Migration App</title>\n" +
            "</HEAD>\n" +
            "<BODY>\n" +
            "<P>\n" +
            "Hello! Welcome to the Migration app.<br>\n" + 
            "Which Project would you like to migrate?\n" +
            "</P>\n" +
            "<FORM action=\"/monitor\" method=\"get\">\n" +
            "<P>\n" +
            "<INPUT type=\"text\" name=\"project\"><br><br>\n" +
            "<INPUT type=\"submit\" value=\"Go\">\n" +
            "</P>\n" + "</FORM>\n" + "</BODY>";
        if (!migratingProject) {
            res.send(welcomeResponse);
        } else {
            var monitoringResponse = "<HEAD>" +
                "<META http-equiv=\"refresh\" content=\"5; URL=http://" +
                req.headers.host +
                "/\">\n" +
                "<title>Migration App</title>\n" +
                "</HEAD>\n" +
                "<BODY>\n" +
                "<P>\n" +
                "Migrating project ...<br>\n" +
                migratingProject + "<br>" +
                "</P>\n" +
                "<A href=\"/reset\">Monitor another phrase</A>\n" +
                "</BODY>";
            res.send(monitoringResponse);
        }
    });


app.get("/monitor", function (req, res) {
    beginMonitoring(req.query.project);
    res.redirect(302, "/");
});

app.get("/reset", /* @callback */ function (req, res) {
    resetMonitoring();
    res.redirect(302, "/");
});

app.get("/test", /* @callback */ function (req, res) {
    res.send(req.query);
});

app.get("/env", /* @callback */ function (req, res) {
	res.send(nconf.get("FOO_BAR"));
});

app.listen(port);
console.log("Server listening on port " + port);