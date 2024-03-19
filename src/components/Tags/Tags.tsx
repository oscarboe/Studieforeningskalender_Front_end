import './Tags.scss';
import { exampleTags } from '../../../public/ExampleData';

type tagsProp = {
	tagClicked: (tagName: string) => void;
	searchTags: string[];
};

const Tags = ({ tagClicked, searchTags }: tagsProp) => {
	return (
		<div id='tags'>
			{exampleTags.map((tag, key) => (
				<button id='tag' onClick={() => tagClicked(tag)} key={key}>
					<p id='tagName' className={searchTags.includes(tag) ? 'isClicked' : ''}>
						{tag}
					</p>
				</button>
			))}
		</div>
	);
};

export default Tags;
