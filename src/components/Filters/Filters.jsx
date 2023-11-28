import { Albums } from '../Albums';
import { FilterTabs } from '../FilterTabs';
import { Search } from '../Search';

export const Filters = ({
  onFilterSelect,
  onFilterInput,
  onFilterSelectAlbum,
  filterField,
  query,
  filteredAlbum,
  usersFromServer,
  albumsFromServer,
}) => {
  const handleResetFilter = () => {
    onFilterSelect(() => onFilterSelect('all'));
    onFilterInput(() => onFilterInput(''));
    onFilterSelectAlbum(() => onFilterSelectAlbum('allAlbum'));
  };

  return (

    <div className="block">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <FilterTabs
          onFilterSelect={onFilterSelect}
          filterField={filterField}
          usersFromServer={usersFromServer}
        />

        <Search
          onFilterInput={onFilterInput}
          query={query}
        />

        <Albums
          albumsFromServer={albumsFromServer}
          onFilterSelectAlbum={onFilterSelectAlbum}
          filteredAlbum={filteredAlbum}
        />

        <div className="panel-block">
          <a
            onClick={handleResetFilter}
            href="#/"
            className="button is-link is-outlined is-fullwidth"
          >
            Reset all filters
          </a>
        </div>
      </nav>
    </div>
  );
};
