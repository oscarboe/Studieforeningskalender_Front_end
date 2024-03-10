import './Tags.scss';

const exampleTags = [
  'JavaScript',
  'React',
  'NodeJS',
  'HTML5',
  'CSS3',
  'Web Development',
  'Frontend',
  'Backend',
  'Fullstack',
  'GraphQL',
  'REST API',
  'Web Design',
  'UX/UI Design',
  'Mobile Development',
  'React Native',
  'VueJS',
  'Angular',
  'Software Engineering',
  'DevOps',
  'Cloud Computing',
];

type tagsProp = {
  tagClicked: (tagName: string) => void;
};

const Tags = ({ tagClicked }: tagsProp) => {
  return (
    <div id="tags">
      {exampleTags.map((tag, key) => (
        <button id="tag" onClick={() => tagClicked(tag)} key={key}>
          <p id="tagName">{tag}</p>
        </button>
      ))}
    </div>
  );
};

export default Tags;
