import './SelectedTags.scss';

type selectedTagsProps = {
  searchTags: string[];
  tagClicked: (tagName: string) => void;
};

const SelectedTags = ({ searchTags, tagClicked }: selectedTagsProps) => {
  return (
    <div id="selectedTags">
      {searchTags.map((tag, key) => (
        <p id="selectedTagName" onClick={() => tagClicked(tag)} key={key}>
          {tag}
        </p>
      ))}
    </div>
  );
};

export default SelectedTags;
