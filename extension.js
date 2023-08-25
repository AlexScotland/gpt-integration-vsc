// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	// Let's let the user enter their API Key
	const open_api_key = await vscode.window.showInputBox({
		placeHolder: 'XXXXXXXXXXXXXXXX',
		prompt: 'OpenAI API Key',
		title: 'OpenAI API Key',
		ignoreFocusOut: true,
		password: true
	});

	const open_api_organization = await vscode.window.showInputBox({
		placeHolder: 'XXXXXXXXXXXXXXXX',
		prompt: 'OpenAI Organization Key',
		title: 'OpenAI Organization Key',
		ignoreFocusOut: true,
		password: true
	});
	
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('gpt-integration.ask', async function () {
		
		let question_to_ask = await vscode.window.showInputBox({
			placeHolder: 'Insert your Question Here',
			title: 'Ask a Question',
			ignoreFocusOut: true,
		});
		console.log(question_to_ask)
		// The code you place here will be executed every time your command is executed
		axios.post(
			'https://api.openai.com/v1/chat/completions',
			{
				"model": "gpt-3.5-turbo",
				"messages": [
					{
					"role": "system",
					"content": "This conversation involves a developer asking for help."
					},
					{
					"role": "user",
					"content": question_to_ask
					}
				]
			},
			{
				headers: {
					'Content-Type': 'application/json',
					"Authorization": `Bearer ${open_api_key}`,
					"OpenAI-Organization": open_api_organization
				}
			}
		)
		.then(function (response) {
			let message = response['data']['choices'][0]['message']['content'];
			vscode.window.showInformationMessage(message)
		  })
		  .catch(function (error) {
			console.log(error);
		  });
		// Display a message box to the user
		
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
