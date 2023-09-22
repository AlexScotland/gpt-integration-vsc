
const vscode = require('vscode');
const { diagnostic_html_serialize } = require('../serializers/diagnostic_serializer');

// Export a class
exports.DiagnosticFactory = class {
    constructor() {
        this.problems = diagnostic_html_serialize(this.get_all_problems());
    }
    get_all_problems(){
        return vscode.languages.getDiagnostics();
    }
};