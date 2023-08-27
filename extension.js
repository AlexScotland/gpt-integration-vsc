const vscode = require('vscode');

// Internal Imports
const OpenAIApiWrapper = require('./lib/api-wrappers/open-ai-wrapper');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

async function activate(context) {
	// Let's let the user enter their API Key
	let open_api_key = await vscode.window.showInputBox({
		placeHolder: 'XXXXXXXXXXXXXXXX',
		prompt: 'OpenAI API Key',
		title: 'OpenAI API Key',
		ignoreFocusOut: true,
		password: true
	});

	let open_api_organization = await vscode.window.showInputBox({
		placeHolder: 'XXXXXXXXXXXXXXXX',
		prompt: 'OpenAI Organization Key',
		title: 'OpenAI Organization Key',
		ignoreFocusOut: true,
		password: true
	});

	const open_api = new OpenAIApiWrapper(open_api_key, open_api_organization)
	
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let ask_gpt = vscode.commands.registerCommand('gpt-integration.ask', async function () {
		
		let question_to_ask = await vscode.window.showInputBox({
			placeHolder: 'Insert your Question Here',
			title: 'Ask a Question',
			ignoreFocusOut: true,
		});
		// The code you place here will be executed every time your command is executed
		answer = await open_api.post_data_question(question_to_ask);
		// Display a message box to the user
		vscode.window.showInformationMessage(answer);
		
	});
	context.subscriptions.push(ask_gpt);

	let auto_problem_solve = vscode.commands.registerCommand('gpt-integration.auto_solve_problems', async function () {
		let list_of_all_problematic_files = vscode.languages.getDiagnostics();
		for (var index = 0; index < list_of_all_problematic_files.length; index ++) {
			let file = list_of_all_problematic_files[index];
			let problem_object = file[1];
			for (var problem_index = 0; problem_index < problem_object.length; problem_index++) {
				let context = `programming issue with ${problem_object.source}`
				// TODO: How to get the problematic lines of code
				let message = ``
				
			}
			
		}

	})
	context.subscriptions.push(auto_problem_solve);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
