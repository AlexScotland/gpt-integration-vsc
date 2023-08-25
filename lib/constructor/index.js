
var AIWrapper = {
    build: async function (api_key, org_key){
        import { Configuration, OpenAIApi } from "openai";
        const configuration = await new Configuration({
            organization: open_api_organization,
            apiKey: open_api_key,
        });
        return new OpenAIApi(configuration);
    }
}

module.exports = AIWrapper;