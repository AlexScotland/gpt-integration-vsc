// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');

const { UIBuilder } = require('./lib/user-interface/ui_builder');
const { DiagnosticFactory } = require('./lib/diagnostic/diagnostic_factory');


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

	let problem_window_actions = vscode.commands.registerCommand('gpt-integration.problem_panel', () => {
		const panel = vscode.window.createWebviewPanel(
			'problem_fix_view', // Unique ID
			'Problem Fixer', // Title
			vscode.ViewColumn.One, // Editor column to show the panel
			{
				enableScripts: true,
			}
		);
		
		// Load your HTML content into the WebView panel
		panel.webview.html = '<h1>Lets Fix those Problems</h1>';
		let ui_builder = new UIBuilder();
		let diagnostic_builder = new DiagnosticFactory();
		panel.webview.html = panel.webview.html + ui_builder.build_given_item_list(diagnostic_builder.problems);
		panel.webview.html = panel.webview.html + ui_builder.js
	});

	context.subscriptions.push(problem_window_actions);

	context.subscriptions.push(
		vscode.window.registerWebviewPanelSerializer('problem_fix_view', {
		  async deserializeWebviewPanel(webviewPanel) {
			webviewPanel.webview.onDidReceiveMessage(message => {
			  // Handle the message from the WebView
			  switch (message.command) {
				case 'gpt-integration.ask':
				  // Access message.data for the data sent from the WebView
				  const receivedData = message.data;
				  console.log(receivedData)
				// Add more cases for different message commands if necessary
			  }
			});
		  },
		})
	  );

}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
