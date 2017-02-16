"use strict"

var xml2js = require('xml2js');
var fs = require('fs');

module.exports = class XMLConfig {
    constructor(config_path) {
        this.config_path = config_path;
        fs.stat(this.config_path, function(err, stat) {
            if (err != null) {
                if(err.code == 'ENOENT') {
                    throw new Error('File does not exists.');
                }
            }
        });
    }

    updateConfig(node, value) {
        var parser = new xml2js.Parser(),
            xmlBuilder = new xml2js.Builder();
        fs.readFile(this.config_path, function(err, data) {
            parser.parseString(data, function (err, result) { 
                if (err)    return 0; 
                result['config'][node] = value;
                var xml = xmlBuilder.buildObject(result);
                fs.writeFile("config.xml", xml);
            });
        });
        return 1;
    }

    readConfig(node, callback) {
        var parser = new xml2js.Parser(),
		xmlBuilder = new xml2js.Builder();
        fs.readFile(this.config_path, function(err, data) {
            parser.parseString(data, function (err, result) {
                var node_value = String(result['config'][node]);
                if (node_value == "undefined") throw new Error("node'" + node + "' does not exists in the configuration file.");
                else callback(node_value);
            });
        });
    }
}