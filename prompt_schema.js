module.exports = {
    'properties': {
        'type': {
            'message': 'File type: ' + 'cmp'.bold.blue + ' or ' + 'app'.bold.blue + '?',
            'required': true,
            'default': 'cmp'
        },
        'filename': {
            'message': 'File Name'.blue.bold + '?',
            'required': true,
            'default': 'TestComponent'
        },
        'hasTest': {
            'message': 'Does this have a ' + 'Test'.bold.blue + '? (' + 'Y'.bold.green + ' or ' + 'N'.bold.red + ')',
            'required': true,
            'default': 'Y'
        },
        'hasController': {
            'message': 'Does this have a ' + 'Controller'.bold.blue + '? (' + 'Y'.bold.green + ' or ' + 'N'.bold.red + ')',
            'required': true,
            'default': 'Y'
        },
        'hasRenderer': {
            'message': 'Does this have a ' + 'Renderer'.bold.blue + '? (' + 'Y'.bold.green + ' or ' + 'N'.bold.red + ')',
            'required': true,
            'default': 'Y'
        },
        'hasHelper': {
            'message': 'Does this have a ' + 'Helper'.bold.blue + '? (' + 'Y'.bold.green + ' or ' + 'N'.bold.red + ')',
            'required': true,
            'default': 'Y'
        },
        'hasCss': {
            'message': 'Does this have a ' + 'Css'.bold.blue + '? (' + 'Y'.bold.green + ' or ' + 'N'.bold.red + ')',
            'required': true,
            'default': 'Y'
        },
        'appHost': {
            'message': 'Your Host'.bold.blue + '? Used to open the component on browser',
            'required': true,
            'default': 'http://localhost:9090/uitest/'
        }
    }
}