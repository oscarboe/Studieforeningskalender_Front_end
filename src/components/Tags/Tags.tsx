import './Tags.scss';
import { Tag } from '../../Types/TagTypes';
import { useQuery } from '@apollo/client';
import { TagsQuery } from '../../../generated/graphql/graphql';
import { GET_ALL_TAGS } from '../../Queries/TagQueries';

type tagsProp = {
	tagClicked: (tag: Tag) => void;
	searchTags: Tag[];
};

const Tags = ({ tagClicked, searchTags }: tagsProp) => {
	const { data } = useQuery<TagsQuery>(GET_ALL_TAGS);

	return (
		<div id='tags'>
			{data?.tags.map((tag) => (
				<button id='tag' onClick={() => tagClicked(tag)} key={tag.id}>
					<p id='tagName' className={searchTags.includes(tag) ? 'isClicked' : ''}>
						{tag.name}
					</p>
				</button>
			))}
		</div>
	);
};

export default Tags;
