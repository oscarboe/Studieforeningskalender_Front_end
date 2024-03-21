import { Tag } from '../../Types/TagTypes';
import './SelectedTags.scss';

type selectedTagsProps = {
	searchTags: Tag[];
	tagClicked: (tag: Tag) => void;
};

const SelectedTags = ({ searchTags, tagClicked }: selectedTagsProps) => {
	return (
		<div id='selectedTags'>
			{searchTags.map((tag) => (
				<p id='selectedTagName' onClick={() => tagClicked(tag)} key={tag.name}>
					{tag.name}
				</p>
			))}
		</div>
	);
};

export default SelectedTags;
