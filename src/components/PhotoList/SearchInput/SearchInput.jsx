export const SearchInput = ({ onQueryChange, searchQuery }) => (
  <input
    type="text"
    className="input"
    placeholder="Search"
    value={searchQuery}
    onChange={e => onQueryChange(e.currentTarget.value)}
  />
);
