var schema = {
    properties: {
        type: {
            message: 'File type: a component or an app?',
            required: true,
            default: 'cmp'
        },
        filename: {
        	message: 'filename?',
        	required: true,
        	default: 'TestComponent'
        },
        hasTest: {
        	message: 'Does this have a Test? (Y or N)',
        	required: true,
        	default: 'Y'
        },
        hasController: {
        	message: 'Does this have a Controller? (Y or N)',
        	required: true,
        	default: 'Y'
        },
        hasRenderer: {
        	message: 'Does this have a Renderer? (Y or N)',
        	required: true,
        	default: 'Y'
        },
        hasHelper: {
        	message: 'Does this have a Helper? (Y or N)',
        	required: true,
        	default: 'Y'
        },
        hasCss: {
        	message: 'Does this have a Css? (Y or N)',
        	required: true,
        	default: 'Y'
        }
    }
};


var prompt = require('prompt');
prompt.start();
prompt.get(schema, function(err, result) {
	var type = result.type;
	var filename = result.filename;
	var hasTest = (result.hasTest || '').toUpperCase().indexOf('Y') >= 0;
	var hasController = (result.hasController || '').toUpperCase().indexOf('Y') >= 0;
	var hasRenderer = (result.hasRenderer || '').toUpperCase().indexOf('Y') >= 0;
	var hasHelper = (result.hasHelper || '').toUpperCase().indexOf('Y') >= 0;
	var hasCss = (result.hasCss || '').toUpperCase().indexOf('Y') >= 0;

	console.log(
		type,
		filename,
		hasTest,
		hasController,
		hasRenderer,
		hasHelper,
		hasCss
	);

    // console.log('  username: ' + result.username);
    // console.log('  email: ' + result.email);
});