#! /usr/bin/env node
// dependencies
// external
var colors = require('colors');
var prompt = require('prompt');
var fs = require('fs');
var path = require('path');

// internal
//schema
var schema = require('./prompt_schema.js');
var templatePath = {
    app: 'templates/app.template',
    cmp: 'templates/cmp.template',
    controller: 'templates/controller.template',
    css: 'templates/css.template',
    helper: 'templates/helper.template',
    renderer: 'templates/renderer.template'
};


var auracliModulePath = path.join( path.dirname(fs.realpathSync(__filename)), '/');

console.log(auracliModulePath + templatePath.app);
//read the template files
var appTemplate = fs.readFileSync(auracliModulePath + templatePath.app, 'utf8');
var cmpTemplate = fs.readFileSync(auracliModulePath + templatePath.cmp, 'utf8');
var controllerTemplate = fs.readFileSync(auracliModulePath + templatePath.controller, 'utf8');
var cssTemplate = fs.readFileSync(auracliModulePath + templatePath.css, 'utf8');
var helperTemplate = fs.readFileSync(auracliModulePath + templatePath.helper, 'utf8');
var rendererTemplate = fs.readFileSync(auracliModulePath + templatePath.renderer, 'utf8');


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
    switch(val.toUpperCase().replace('--', '')){
        case 'CMP':
            filetype = 'cmp';
            delete schema.properties.filetype;
            break;

        case 'APP':
            filetype = 'app';
            delete schema.properties.filetype;
            break;
    }
});


//start prompt here
prompt.start();
prompt.get(schema, function(err, result) {
    filetype = (result.filetype || '').toUpperCase().indexOf('CMP') >= 0 ? 'cmp' : 'app';
    appHost = result.appHost;
    filename = result.filename;
    hasTest = (result.hasTest || '').toUpperCase().indexOf('Y') >= 0;
    hasController = (result.hasController || '').toUpperCase().indexOf('Y') >= 0;
    hasRenderer = (result.hasRenderer || '').toUpperCase().indexOf('Y') >= 0;
    hasHelper = (result.hasHelper || '').toUpperCase().indexOf('Y') >= 0;
    hasCss = (result.hasCss || '').toUpperCase().indexOf('Y') >= 0;
    
    var componentUrl = 'http://localhost:9090/uitest/tabset_overflowTest.cmp';  


    var isValidDir = true;
    var curDirFiles = fs.readdirSync(__dirname);
    curDirFiles.forEach(function(val){
        if (val.indexOf('Controller.js') >= 0 ||
        val.indexOf('Helper.js') >= 0 ||
        val.indexOf('Renderer.js') >= 0 ||
        val.indexOf('Test.js') >= 0 ||
        val.indexOf('.cmp')  >= 0|| val.indexOf('.cmp')  >= 0){
            console.log('Found invalid files: '.red) + ' : ' + __dirname + val;
        }
    });

    console.log(__dirname);
    console.log(filename, filetype, hasTest, hasController, hasRenderer, hasHelper, hasCss);
});