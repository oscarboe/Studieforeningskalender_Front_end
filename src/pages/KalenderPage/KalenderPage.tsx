import { useState } from 'react';
import { handleSendMessage } from '../../Helpers/ChatGPTHelper';
import './KalenderPage.css';

export default function KalenderPage() {
	const [chatText, setChatText] = useState('');

	const askChatGPT = async () => {
		console.log(chatText);
		const res = await handleSendMessage(chatText);

		console.log(res);
	};

	return (
		<div className='kalender-page'>
			<h1>Hello from Kalender</h1>
			<input onChange={(e) => setChatText(e.currentTarget.value)}></input>
			<button onClick={askChatGPT}>Ask ChatGPT!</button>
			{/* <PopularEventsWrapper /> */}
		</div>
	);
}
