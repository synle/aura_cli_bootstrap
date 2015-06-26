module.exports =  {
    'properties': {
        'type': {
            'message': 'File type: a component or an app?',
            'required': true,
            'default': 'cmp'
        },
        'filename': {
        	'message': 'filename?',
        	'required': true,
        	'default': 'TestComponent'
        },
        'hasTest': {
        	'message': 'Does this have a Test? (Y or N)',
        	'required': true,
        	'default': 'Y'
        },
        'hasController': {
        	'message': 'Does this have a Controller? (Y or N)',
        	'required': true,
        	'default': 'Y'
        },
        'hasRenderer': {
        	'message': 'Does this have a Renderer? (Y or N)',
        	'required': true,
        	'default': 'Y'
        },
        'hasHelper': {
        	'message': 'Does this have a Helper? (Y or N)',
        	'required': true,
        	'default': 'Y'
        },
        'hasCss': {
        	'message': 'Does this have a Css? (Y or N)',
        	'required': true,
        	'default': 'Y'
        },
        'appHost': {
            'message': 'Your Host? Used to open the component on browser',
            'required': true,
            'default': 'http://localhost:9090/uitest/'
        }
    }
}