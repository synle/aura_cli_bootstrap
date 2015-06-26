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


//aura cli absolute path
var auracliModulePath = path.join( path.dirname(fs.realpathSync(__filename)), '/');
var cwd = process.cwd();

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


//pre-error
var isValidDir = true;
var curDirFiles = fs.readdirSync(cwd);
var invalidFilesFound = [];
curDirFiles.forEach(function(val){
    if (val.indexOf('Controller.js') >= 0 ||
    val.indexOf('Helper.js') >= 0 ||
    val.indexOf('Renderer.js') >= 0 ||
    val.indexOf('Test.js') >= 0 ||
    val.indexOf('.cmp')  >= 0|| val.indexOf('.cmp')  >= 0){
        // console.log('Error: Found invalid file: '.bold.red + path.join(cwd + '/' + val).green);
        invalidFilesFound.push(val);
        isValidDir = false;
    }
});

if (isValidDir === false){
    console.log('Error'.red.bold + ': current directory '+cwd.bold+' already contained some definitions of Aura. Please change to a new directory without any Aura files and try this command again.');
    console.log('Invalid files:'.bold.blue);
    console.log(invalidFilesFound.join('\n'));
    return;
}


//start prompt here
prompt.start();
prompt.get(schema, function(err, result) {
    filetype = (result.filetype || '').toUpperCase().indexOf('CMP') >= 0 ? 'cmp' : 'app';
    filename = result.filename;
    appHost = result.appHost;
    hasTest = (result.hasTest || '').toUpperCase().indexOf('Y') >= 0;
    hasController = (result.hasController || '').toUpperCase().indexOf('Y') >= 0;
    hasRenderer = (result.hasRenderer || '').toUpperCase().indexOf('Y') >= 0;
    hasHelper = (result.hasHelper || '').toUpperCase().indexOf('Y') >= 0;
    hasCss = (result.hasCss || '').toUpperCase().indexOf('Y') >= 0;
    
    var componentUrl = 'http://localhost:9090/uitest/tabset_overflowTest.cmp';


    if (fs.existsSync(cwd + '/' + filename)) {
        //already existed
        console.log('Error: '.bold.red + ' component or application of the same name already ' + filename.green + ' exist in the directory ' + cwd.green);
        return;
    }
    
    console.log('Creating the component');

});