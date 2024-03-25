import { useSelector, useDispatch } from 'react-redux';
import { addTag, removeTag, tag } from '../../Redux/Slices/tagsSlice';
import { RootState } from '../../Redux/store';
import './SelectedTags.scss';

const SelectedTags = () => {
	const tags = useSelector((state: RootState) => state.tags);
	const dispatch = useDispatch();

	function tagClicked(tag: tag) {
		if (tags.includes(tag)) dispatch(removeTag(tag));
		else dispatch(addTag(tag));
	}

	return (
		<div id='selectedTags'>
			{tags.map((tag) => (
				<p id='selectedTagName' onClick={() => tagClicked(tag)} key={tag.name}>
					{tag.name}
				</p>
			))}
		</div>
	);
};

export default SelectedTags;
