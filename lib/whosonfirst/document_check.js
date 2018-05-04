/* jshint esversion: 6 */

const fs = require('fs');
const path = require('path');
const util = require('util');
const Ajv = require('ajv');

const DirectoryWalker = require('./directory_walker');

function Checker(options) {
    this._options = options;
    this._walker = new DirectoryWalker();

    var config = {
        allErrors: false
    };
    if (options.hasOwnProperty('verbose') && options.verbose) {
        config.allErrors = true;
    }
    this._ajv = new Ajv(config);

    this._files = 0;
    this._checked = 0;
    this._valid = 0;
    this._invalid = 0;

    var meta = JSON.parse(fs.readFileSync(__dirname + path.sep + '../..' + path.sep + 'node_modules/ajv/lib/refs/json-schema-draft-06.json', 'utf-8'));
    this._ajv.addMetaSchema(meta);

    var references = [];
    this._options.references.forEach(function(value) {
        var ref = JSON.parse(fs.readFileSync(value, 'utf-8'));
        references.push(ref);
    });
    this._ajv.addSchema(references);
    var schema = JSON.parse(fs.readFileSync(this._options.schema, 'utf-8'));
    this._validator = this._ajv.compile(schema);
}

Checker.prototype.run = function() {
    this._walker.walk(this._options.dir, this._callback.bind(this));
    console.log(util.format('%d files scanned, %d selected, %d valid, %d invalid', this._files, this._checked, this._valid, this._invalid));
};

Checker.prototype._callback = function(filepath, rootdir, subdir, filename) {
    this._files++;
    var re = new RegExp(this._options.pattern);
    if (filename.match(re)) {
        var doc = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
        this._checked++;
        var valid = this._validator(doc);
        if (!valid) {
            this._invalid++;
            console.log(filepath);
            this._validator.errors.forEach(function(item) {
                switch (item.keyword) {
                    case 'type':
                        console.log(item.dataPath +  ': ' + item.message);
                        break;
                    case 'pattern':
                        console.log(item.dataPath +  ': ' + item.message);
                        break;
                    case 'additionalProperties':
                        console.log(item.params.additionalProperty + ': ' + item.message);
                        break;
                    default:
                        console.log(item);
                }
            });
        }
        else {
            this._valid++;
        }
    }
};

module.exports = Checker;
