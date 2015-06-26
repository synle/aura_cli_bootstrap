//dependenceis
var fs = require('fs');
var path = require('path');

//exports
var self = {};
module.exports = self;


//definitions
self.getErrors = function(cwd, filename) {
    //validation
    //pre-error
    var isValidDir = true;
    var curDirFiles = fs.readdirSync(cwd);
    var invalidFilesFound = [];
    curDirFiles.forEach(function(val) {
        if (val.indexOf('Controller.js') >= 0 || val.indexOf('Helper.js') >= 0 || val.indexOf('Renderer.js') >= 0 || val.indexOf('Test.js') >= 0 || val.indexOf('.cmp') >= 0 || val.indexOf('.cmp') >= 0) {
            // console.log('Error: Found invalid file: '.bold.red + path.join(cwd + '/' + val).green);
            invalidFilesFound.push(val);
            isValidDir = false;
        }
    });
    if (isValidDir === false) {
        console.log('Error'.red.bold + ': current directory ' + cwd.bold + ' already contained some definitions of Aura. Please change to a new directory without any Aura files and try this command again.');
        console.log('Invalid files:'.bold.blue);
        console.log(invalidFilesFound.join('\n'));
        return;
    }
    //validation of file already existed
    var newObjectDir = path.join(cwd + '/' + filename);
    try {
        fs.mkdirSync(newObjectDir);
    } catch (e) {
        console.log('Error: '.bold.red + ' component or application of the same name ' + filename.green + ' already existed in the directory ');
        console.log(cwd.green);
        return;
    }
    return '';
};
self.bootstrapFiles = function(cwd, filetype, filename, hasTest, hasController, hasRenderer, hasHelper, hasCss) {
    var newObjectDir = path.join(cwd + '/' + filename);
    //get templates
    //schema
    var templatePath = {
        app: 'templates/app.template',
        cmp: 'templates/cmp.template',
        controller: 'templates/controller.template',
        css: 'templates/css.template',
        helper: 'templates/helper.template',
        renderer: 'templates/renderer.template'
    };
    //read the template files
    var auracliModulePath = path.join(path.dirname(fs.realpathSync(__filename)), '/');
    var appTemplate = fs.readFileSync(auracliModulePath + templatePath.app, 'utf8');
    var cmpTemplate = fs.readFileSync(auracliModulePath + templatePath.cmp, 'utf8');
    var controllerTemplate = fs.readFileSync(auracliModulePath + templatePath.controller, 'utf8');
    var cssTemplate = fs.readFileSync(auracliModulePath + templatePath.css, 'utf8');
    var helperTemplate = fs.readFileSync(auracliModulePath + templatePath.helper, 'utf8');
    var testTemplate = fs.readFileSync(auracliModulePath + templatePath.helper, 'utf8');
    var rendererTemplate = fs.readFileSync(auracliModulePath + templatePath.renderer, 'utf8');
    //must have files
    if (filetype === 'app') {
        fs.writeFileSync(path.join(newObjectDir, filename + '.app'), appTemplate);
    } else {
        fs.writeFileSync(path.join(newObjectDir, filename + '.cmp'), cmpTemplate);
    }
    //optional extras
    if (hasTest === true) {
        fs.writeFileSync(path.join(newObjectDir, filename + 'Test.js'), testTemplate);
    }
    if (hasController === true) {
        fs.writeFileSync(path.join(newObjectDir, filename + 'Controller.js'), controllerTemplate);
    }
    if (hasRenderer === true) {
        fs.writeFileSync(path.join(newObjectDir, filename + 'Renderer.js'), rendererTemplate);
    }
    if (hasHelper === true) {
        fs.writeFileSync(path.join(newObjectDir, filename + 'Helper.js'), helperTemplate);
    }
    if (hasCss === true) {
        fs.writeFileSync(path.join(newObjectDir, filename + '.css'), cssTemplate);
    }
    console.log('Aura ' + filetype + ' can be accessed via', newObjectDir.bold.green);
};
self.showAuraUrl = function(appHost, filetype, filename) {
	var resultUrl
	var partUrl = 'uitest';
	if (filetype === 'cmp'){
		resultUrl = appHost + partUrl + '/' + filename + '.cmp';
	}
	else{
		resultUrl = appHost + partUrl + '/' + filename + '.app';
	}

    console.log('Aura ' + filetype + ' can be accessed via', resultUrl.green.bold);
};