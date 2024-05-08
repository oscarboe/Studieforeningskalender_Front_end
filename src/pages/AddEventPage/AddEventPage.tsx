import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import './AddEventPage.scss';
import { useMutation, useQuery } from '@apollo/client';
import {
	CreateEventInput,
	CreateEventMutation,
	CreateEventMutationVariables,
	TagsQuery,
} from '../../../generated/graphql/graphql';
import { GET_ALL_TAGS } from '../../Queries/TagQueries';
import { CREATE_EVENT_QUERY } from '../../Queries/EventQueries';
import FBInit, { FBEvent } from '../../components/ImportFacebook/FacebookInit';
import ChatGPTButton from '../../components/ChatGPTButton/ChatGPTButton';
import { IS_ADMIN_OR_UNION } from '../../Queries/UserQueries';
import { useNavigate } from 'react-router-dom';
import { setAlerts } from '../../Redux/Slices/alertsSlice';
import { useDispatch } from 'react-redux';

export default function AddEventPage() {
	const [eventName, setEventName] = useState('');
	const [description, setDescription] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [address, setAddress] = useState('');
	const [postalCode, setPostalCode] = useState('8000');
	const [city, setCity] = useState('Aarhus');
	const [imageURLs, setImageURLs] = useState<string[]>([]);
	const [file, setFile] = useState<File | null>(null);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { data } = useQuery<TagsQuery>(GET_ALL_TAGS);
	const [createEvent] = useMutation<CreateEventMutation, CreateEventMutationVariables>(CREATE_EVENT_QUERY);
	const {} = useQuery(IS_ADMIN_OR_UNION, {
		onError: (_) => {
			dispatch(setAlerts([{ message: 'Du har ikke adgang til denne side', severity: 'error' }]));
			navigate('/');
		},
	});
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const input: CreateEventInput = {
			title: eventName,
			description: description,
			image: file,
			addressLine: address,
			postalCode: postalCode,
			city: city,
			startTime: startTime,
			endTime: endTime,
			tags: selectedTags,
		};
		createEvent({
			variables: {
				createEventInput: input,
			},
		});
	};

	const handleImageClick = (index: number) => {
		setImageURLs((prevImageURLs) => {
			const newImageURLs = [...prevImageURLs];
			const clickedImageURL = newImageURLs.splice(index, 1)[0];
			newImageURLs.unshift(clickedImageURL);
			return newImageURLs;
		});
	};

	const handleFileChange = (e: any) => {
		if (e.target.files.length > 0) {
			const url = URL.createObjectURL(e.target.files[0]);
			setFile(e.target.files[0]);
			if (imageURLs.length < 3) setImageURLs([...imageURLs, url]);
			else setImageURLs([...imageURLs.slice(1, 3), url]);
		}
	};

	function handleEventsFetched(event: FBEvent): void {
		setDescription(event.description);
		setEventName(event.name);
		setAddress(event.place.name);
		// Convert the startTime state to the "YYYY-MM-DDTHH:mm" format for two-way binding with the input field
		const date = new Date(event.start_time);
		const dateTimeLocal = date.toISOString().slice(0, 16);
		setStartTime(dateTimeLocal);
	}

	return (
		<div className='addEventPage'>
			<FBInit onEventsFetched={handleEventsFetched} />
			<form onSubmit={handleSubmit}>
				<div className='event-field'>
					<h3>Event Name</h3>
					<input type='text' value={eventName} onChange={(e) => setEventName(e.target.value)} />
				</div>
				<div className='dates'>
					<div className='event-field'>
						<h3>Start time</h3>
						<input type='datetime-local' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
					</div>
					<div className='event-field'>
						<h3>End time</h3>
						<input type='datetime-local' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
					</div>
				</div>
				<div className='event-field'>
					<h3>Beskrivelse</h3>
					<div className='text-area'>
						<textarea value={description} onChange={(e) => setDescription(e.target.value)} />
						<ChatGPTButton setDescription={setDescription} />
					</div>
				</div>
				<div className='event-field'>
					<h3>Address</h3>
					<input type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
				</div>
				<div className='event-field'>
					<h3>Postal Code</h3>
					<input type='text' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
				</div>
				<div className='event-field'>
					<h3>City</h3>
					<input type='text' value={city} onChange={(e) => setCity(e.target.value)} />
				</div>
				<div className='event-field'>
					<h3>Tags</h3>
					<Autocomplete
						multiple
						id='tags-select'
						options={data?.tags.map((tag) => ({ label: tag.name, id: tag.id })) || []}
						getOptionLabel={(option) => option.label}
						isOptionEqualToValue={(option, value) => option.id === value.id}
						onChange={(_, values) => {
							setSelectedTags(values.map((x) => x.label));
						}}
						renderInput={(params) => <TextField {...params} variant='standard' label='Vælg tags' />}
						disableCloseOnSelect={true}
						filterSelectedOptions={true}
					/>
				</div>
				<div className='event-field'>
					<div className='pictures'>
						<h3>Pictures</h3>
						<Tooltip title='Her kan du uploade op til 3 billeder der repræsenterer dit event. Billedet med den gyldne kant er hovedbilledet. Hvis du ønsker at et af de andre 2 billeder skal være hovedbillede så klik på det. '>
							<IconButton>
								<InfoIcon />
							</IconButton>
						</Tooltip>
					</div>
					<input type='file' accept='image/*' multiple onChange={handleFileChange} />
				</div>
				{imageURLs.map((url, index) => (
					<img
						className={`image ${index === 0 ? 'first-image' : ''}`}
						key={index}
						src={url}
						alt={`Selected ${index}`}
						onClick={() => handleImageClick(index)}
					/>
				))}
				<button
					onClick={(e) => {
						e.preventDefault;
						handleSubmit;
					}}
					className='submit-button'
				>
					Submit
				</button>
			</form>
		</div>
	);
}
