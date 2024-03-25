import './Tags.scss';
import { useQuery } from '@apollo/client';
import { TagsQuery } from '../../../generated/graphql/graphql';
import { GET_ALL_TAGS } from '../../Queries/TagQueries';
import { RootState } from '../../Redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { removeTag, addTag, tag } from '../../Redux/Slices/tagsSlice';

const Tags = () => {
	const { data } = useQuery<TagsQuery>(GET_ALL_TAGS);

	const tags = useSelector((state: RootState) => state.tags);
	const dispatch = useDispatch();

	function tagClicked(tag: tag) {
		if (tags.includes(tag)) dispatch(removeTag(tag));
		else dispatch(addTag(tag));
	}

	return (
		<div id='tags'>
			{data?.tags.map((tag) => (
				<button id='tag' onClick={() => tagClicked(tag)} key={tag.id}>
					<p id='tagName' className={tags.includes(tag) ? 'isClicked' : ''}>
						{tag.name}
					</p>
				</button>
			))}
		</div>
	);
};

export default Tags;
