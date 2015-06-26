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
var arguments = process.argv;
if(arguments.length >= 3){
    //parse of component type
    var val = arguments[2];
    switch (val.toUpperCase().replace('--', '')) {
        case 'CMP':
            filetype = 'cmp';
            delete schema.properties.filetype;
            break;
        case 'APP':
            filetype = 'app';
            delete schema.properties.filetype;
            break;
    };

    //parse of naming
    if(arguments.length === 4){
        filename = arguments[3].trim(); 
        delete schema.properties.filename;
    }
}




//start prompt here
prompt.start();
prompt.get(schema, function(err, result) {
    if(filetype === undefined){
        filetype = (result.filetype || '').toUpperCase().indexOf('CMP') >= 0 ? 'cmp' : 'app';    
    }
    else{
        console.log('FileType: ' + filetype.bold.blue);
    }
    
    if(filename === undefined){
        filename = result.filename.trim();    
    }
    else{
        console.log('FileName: ' + filename.bold.blue);
    }
    
    appHost = result.appHost;
    hasTest = (result.hasTest || '').toUpperCase().indexOf('Y') >= 0;
    hasController = (result.hasController || '').toUpperCase().indexOf('Y') >= 0;
    hasRenderer = (result.hasRenderer || '').toUpperCase().indexOf('Y') >= 0;
    hasHelper = (result.hasHelper || '').toUpperCase().indexOf('Y') >= 0;
    hasCss = (result.hasCss || '').toUpperCase().indexOf('Y') >= 0;


    //validation
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