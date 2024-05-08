import { Modal, Fade } from '@mui/material';
import './ChatGPTButton.scss';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { AskChatGptQuery, AskChatGptQueryVariables } from '../../../generated/graphql/graphql';
import { GET_DESCRIPTION_FROM_CHATGPT } from '../../Queries/EventQueries';

interface props {
	setDescription: React.Dispatch<React.SetStateAction<string>>;
}

const ChatGPTButton = ({ setDescription }: props) => {
	const [open, setOpen] = useState(false);
	const [prompt, setPrompt] = useState('');

	const [askChatGPT, { data }] = useLazyQuery<AskChatGptQuery, AskChatGptQueryVariables>(GET_DESCRIPTION_FROM_CHATGPT);

	const getDescription = () => {
		askChatGPT({ variables: { prompt: prompt } });
	};

	const useDescription = () => {
		setDescription(data?.chatGPTDescription.response ?? '');
		setOpen(false);
	};

	return (
		<>
			<button className='chatGPT' onClick={(_) => setOpen(true)} type='button'>
				Spørg AI
			</button>
			<Modal open={open} onClose={() => setOpen(false)} closeAfterTransition id='chatGPT-modal'>
				<Fade in={open}>
					<div id='chatGPT-form'>
						<textarea
							id='prompt'
							placeholder='Her kan du give en kort beskrivelse af hvad din begivenhed handler om, jo mere specifikt jo bedre en beskrivelse kan vores AI give'
							onChange={(e) => setPrompt(e.target.value)}
						/>
						<button onClick={getDescription}>Få en beskrivelse</button>
						<textarea className='generated-text' value={data?.chatGPTDescription.response} />
						<button onClick={useDescription}>Benyt beskrivelse</button>
					</div>
				</Fade>
			</Modal>
		</>
	);
};

export default ChatGPTButton;
