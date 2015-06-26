#! /usr/bin/env node
 // dependencies
// external
var colors = require('colors');
var prompt = require('prompt');
var fs = require('fs');
var path = require('path');

// internal
var schema = require('./prompt_schema.js');
var util = require('./util');

//aura cli absolute path
var cwd = process.cwd();

//variable
var filetype;
var filename;
var hasTest;
var hasController;
var hasRenderer;
var hasHelper;
var hasCss;
var appHost;
var componentUrl;
//check command line arguments
process.argv.forEach(function(val, index, array) {
    switch (val.toUpperCase().replace('--', '')) {
        case 'CMP':
            filetype = 'cmp';
            console.log('FileType: ' + 'cmp'.bold.blue);
            delete schema.properties.filetype;
            break;
        case 'APP':
            filetype = 'app';
            console.log('FileType: ' + 'app'.bold.blue);
            delete schema.properties.filetype;
            break;
    }
});



//start prompt here
prompt.start();
prompt.get(schema, function(err, result) {
    if(filetype === undefined){
        filetype = (result.filetype || '').toUpperCase().indexOf('CMP') >= 0 ? 'cmp' : 'app';    
    }
    
    filename = result.filename;
    appHost = result.appHost;
    hasTest = (result.hasTest || '').toUpperCase().indexOf('Y') >= 0;
    hasController = (result.hasController || '').toUpperCase().indexOf('Y') >= 0;
    hasRenderer = (result.hasRenderer || '').toUpperCase().indexOf('Y') >= 0;
    hasHelper = (result.hasHelper || '').toUpperCase().indexOf('Y') >= 0;
    hasCss = (result.hasCss || '').toUpperCase().indexOf('Y') >= 0;


    if ('' !==  util.getErrors(
        cwd,
        filename
    )){
        //there is error , exit
        return;
    }
    
    //write to files
    util.bootstrapFiles(
        cwd,
        filetype,
        filename,
        hasTest,
        hasController,
        hasRenderer,
        hasHelper,
        hasCss
    )


    //show url
    util.showAuraUrl(appHost, filetype, filename);
});