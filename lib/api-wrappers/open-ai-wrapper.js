const axios = require('axios');

class OpenAIApiWrapper {
    constructor(api_token, organization_token) {
      this.api_token = api_token;
      this.organization_token = organization_token;
      this._headers = this._generate_headers
    }

    get _generate_headers() {
        return {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${this.api_token}`,
            "OpenAI-Organization": this.organization_token
        }
    }

    async post_data_question(question, context= null) {
        if (!context) {
            context = "This conversation involves a developer asking for help."
        }
        axios.post(
			'https://api.openai.com/v1/chat/completions',
			{
				"model": "gpt-3.5-turbo",
				"messages": [
					{
					"role": "system",
					"content": context
					},
					{
					"role": "user",
					"content": question
					}
				]
			},
			{
				headers: this._headers
			}
		)
		.then(function (response) {
			return response['data']['choices'][0]['message']['content'];
		  })
		  .catch(function (error) {
			console.log(error);
            return false
		  });
    }
}

module.exports = OpenAIApiWrapper