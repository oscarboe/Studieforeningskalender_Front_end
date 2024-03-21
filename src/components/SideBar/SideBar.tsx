import React, { useState } from 'react';
import './SideBar.scss';
import Tags from '../Tags/Tags';
import SelectedTags from '../SelectedTags/SelectedTags';
import { Tag } from '../../Types/TagTypes';

interface props {
	setTags: React.Dispatch<React.SetStateAction<string[]>>;
	setText: React.Dispatch<React.SetStateAction<string>>;
}

export default function SideBar({ setTags, setText }: props) {
	const [searchText, setSearchText] = useState('');
	const [searchTags, setSearchTags] = useState<Tag[]>([]);

	function updateSearchText(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchText(e.target.value);
	}

	function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			console.log(searchText);
			e.preventDefault();
			// search functionality or function here
		}
	}

	function tagClicked(tag: Tag) {
		if (searchTags.includes(tag)) setSearchTags(searchTags.filter((t) => t.name != tag.name));
		else setSearchTags([...searchTags, tag]);
	}

	function search() {
		setTags(searchTags.map((tag) => tag.name));
		setText(searchText);
	}

	return (
		<div id='SideBar'>
			<input id='search' type='search' placeholder='Search...' onChange={updateSearchText} onKeyDown={handleKeyPress} />
			<SelectedTags tagClicked={tagClicked} searchTags={searchTags} />
			<Tags tagClicked={tagClicked} searchTags={searchTags} />
			<button id='searchButton' onClick={search}>
				Search
			</button>
		</div>
	);
}
