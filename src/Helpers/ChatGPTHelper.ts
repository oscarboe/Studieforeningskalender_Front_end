import axios from 'axios';

const API_KEY = '';

export const handleSendMessage = async (input: string) => {
	// Make a request to the ChatGPT API with the user input
	const response = await axios.post(
		'https://api.openai.com/v1/chat/completions',
		{
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: 'You are a helpful assistant.' },
				{ role: 'user', content: input },
			],
		},
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${API_KEY}`,
			},
		}
	);

	return response;
};
