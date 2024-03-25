import React from 'react';
import './SideBar.scss';
import Tags from '../Tags/Tags';
import SelectedTags from '../SelectedTags/SelectedTags';
import { useDispatch } from 'react-redux';
import { toggleSwitch } from '../../Redux/Slices/updateSlice';
import { setSearchText } from '../../Redux/Slices/searchTextSlice';

export default function SideBar() {
	const dispatch = useDispatch();

	function updateSearchText(e: React.ChangeEvent<HTMLInputElement>) {
		dispatch(setSearchText(e.currentTarget.value));
	}

	function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			e.preventDefault();
			search();
		}
	}

	function search() {
		dispatch(toggleSwitch());
	}

	return (
		<div id='SideBar'>
			<input id='search' type='search' placeholder='Search...' onChange={updateSearchText} onKeyDown={handleKeyPress} />
			<SelectedTags />
			<Tags />
			<button id='searchButton' onClick={search}>
				Search
			</button>
		</div>
	);
}
