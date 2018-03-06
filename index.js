#!/usr/bin/env node
/* jshint esversion: 6 */
'use strict';

const util = require('util');

const CommandLineArgs = require('command-line-args');
const CommandLineUsage = require('command-line-usage');

const DocumentCheck = require('./lib/whosonfirst/document_check');

const APPNAME = 'wofdoc';

const mainDefs = [
    {
        name: 'command',
        defaultOption: true
    }
];
const mainOpts = CommandLineArgs(mainDefs, {
    stopAtFirstUnknown: true
});
const argv = mainOpts._unknown || [];
const commonDefs = [
    {
        name: 'dir',
        alias: 'd',
        type: String,
        defaultOption: true,
        description: 'The directory to check for WOF GeoJSON files',
        typeLabel: '<dir>'
    },
    {
        name: 'pattern',
        alias: 'p',
        type: String,
        defaultValue: '[0-9]{1,}\.geojson$',
        description: 'Regex to match candidate files',
        typeLabel: '[regex]'
    },
    {
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: 'Display this usage guide'
    }
];
if (mainOpts.command === 'check') {
    var checkDefs = commonDefs.concat([
        {
            name: 'schema',
            alias: 's',
            type: String,
            description: 'Path to the top level schema file',
            typeLabel: '<file>'
        },
        {
            name: 'references',
            alias: 'r',
            type: String,
            multiple: true,
            description: 'Paths to one or more referenced schemas',
            typeLabel: '[files]'
        }
    ]);
    var checkOpts = CommandLineArgs(checkDefs, { argv });
    var valid = (checkOpts.dir && checkOpts.pattern && checkOpts.schema && checkOpts.references);
    if (checkOpts.help || !valid) {
        var usage = CommandLineUsage([
            {
                header: util.format("%s-check", APPNAME),
                content: 'Check a hierarchy of WOF documents against a JSON schema',
            },
            {
                header: 'Options',
                optionList: checkDefs
            },
            {
                content: 'See also [underline]{https://github.com/whosonfirst/whosonfirst-json-schema}'
            }

        ]);
        console.log(usage);
        process.exit(1);
    }
    else {
        var check = new DocumentCheck(checkOpts);
        check.run();
    }
}

else if (mainOpts.command === 'fix') {
    var fixOpts = CommandLineArgs(commonDefs, { argv });
    var valid = (fixOpts.dir && fixOpts.pattern);
    if (fixOpts.help || !valid) {
        var usage = CommandLineUsage([
            {
                header: util.format("%s-fix", APPNAME),
                content: 'Check a hierarchy of WOF documents for known type errors and fix these'
            },
            {
                header: 'Options',
                optionList: commonDefs
            },
            {
                content: 'See also [underline]{https://github.com/whosonfirst/whosonfirst-json-schema}'
            }

        ]);
        console.log(usage);
        process.exit(1);
    }

    else {
        // var fixer = new Fixer(fixOpts);
        // fixer.run();
    }
}

else if (mainOpts.command !== undefined) {
    console.log(util.format("%s: '%s' is not a %s command. See '%s --help'.", APPNAME, mainOpts.command, APPNAME, APPNAME));
}

else {
    console.log(util.format("usage: %s [-h | --help] [ -d | --dir=<path>] [-p | --pattern=<regex>]", APPNAME));
    console.log(util.format("\t<command> [<args]"));
    console.log("");
    console.log(util.format("These commands are provided by %s", APPNAME));
    console.log("");
    console.log("check\tCheck a hierarchy of WOF documents against a JSON schema");
    console.log("fix\tCheck a hierarchy of WOF documents for known type errors and fix these");
}
