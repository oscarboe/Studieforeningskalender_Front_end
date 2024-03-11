import React, { useState } from 'react';
import './SideBar.scss';
import Tags from './Tags/Tags';
import SelectedTags from './SelectedTags/SelectedTags';

export default function SideBar() {
  const [searchText, setSearchText] = useState('');
  const [searchTags, setSearchTags] = useState<string[]>([]);

  function updateSearchText(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      // search functionality or function here
    }
  }

  function tagClicked(tagName: string) {
    if (searchTags.includes(tagName)) {
      setSearchTags(searchTags.filter((t) => t != tagName));
    } else {
      setSearchTags([...searchTags, tagName]);
    }

    // Search logic
  }

  return (
    <div id="SideBar">
      <input id="search" type="search" placeholder="Search..." onChange={updateSearchText} onKeyDown={handleKeyPress} />
      <SelectedTags tagClicked={tagClicked} searchTags={searchTags} />
      <Tags tagClicked={tagClicked} />
    </div>
  );
}
