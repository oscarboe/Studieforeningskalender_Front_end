import React, { useState } from 'react';
import SelectedTags from '../../components/SelectedTags/SelectedTags'; // replace './SelectedTags' with the actual path to your SelectedTags.tsx file
import Tags from '../../components/Tags/Tags';

export default function AddEventPage() {
	const [eventName, setEventName] = useState('');
	const [eventDate, setEventDate] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		console.log(`Submitting Event Name ${eventName}, Event Date ${eventDate}, Description ${description}`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Event Navn:
				<input type='text' value={eventName} onChange={(e) => setEventName(e.target.value)} />
			</label>
			<label>
				Dato:
				<input type='date' value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
			</label>
			<label>
				Beskrivelse:
				<textarea value={description} onChange={(e) => setDescription(e.target.value)} />
			</label>
			<SelectedTags />
			<Tags />
			<input type='submit' value='Submit' />
		</form>
	);
}
