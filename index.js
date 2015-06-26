// dependencies
// external
var colors = require('colors');
var prompt = require('prompt');
var fs = require('fs');


// internal
//schema
var schema = require('./prompt_schema.js');

var templatePath = {
    app : './templates/app.template',
    cmp : './templates/cmp.template',
    controller : './templates/controller.template',
    css : './templates/css.template',
    helper : './templates/helper.template',
    renderer : './templates/renderer.template'
}

//read the template files
var appTemplate = fs.readFileSync(templatePath.app, 'utf8');
var cmpTemplate = fs.readFileSync(templatePath.cmp, 'utf8');
var controllerTemplate = fs.readFileSync(templatePath.controller, 'utf8');
var cssTemplate = fs.readFileSync(templatePath.css, 'utf8');
var helperTemplate = fs.readFileSync(templatePath.helper, 'utf8');
var rendererTemplate = fs.readFileSync(templatePath.renderer, 'utf8');

//start prompt here
prompt.start();

prompt.get(schema, function(err, result) {
    var type = result.type;
    var appHost = result.appHost;
    var filename = result.filename;
    var hasTest = (result.hasTest || '').toUpperCase().indexOf('Y') >= 0;
    var hasController = (result.hasController || '').toUpperCase().indexOf('Y') >= 0;
    var hasRenderer = (result.hasRenderer || '').toUpperCase().indexOf('Y') >= 0;
    var hasHelper = (result.hasHelper || '').toUpperCase().indexOf('Y') >= 0;
    var hasCss = (result.hasCss || '').toUpperCase().indexOf('Y') >= 0;

    var componentUrl = 'http://localhost:9090/uitest/tabset_overflowTest.cmp';
    console.log(
        type,
        filename,
        hasTest,
        hasController,
        hasRenderer,
        hasHelper,
        hasCss
    );
});