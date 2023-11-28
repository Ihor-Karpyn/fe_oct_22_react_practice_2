import { AlbumsFilter } from '../AlbumsFilter/AlbumsFilter';
import { ResetButton } from '../ResetButton/ResetButton';
import { SearchInput } from '../SearchInput/SearchInput';
import { UsersTabs } from '../UsersTabs/UsersTabs';

export const FiltersPanel = (props) => {
  const {
    users,
    setFilterByUser,
    filterByUser,
    searchQuery,
    setSearchQuery,
    resetAllFilters,
    albums,
    filterByAlbums,
    setFilterByAlbums,
  } = props;

  return (
    <div className="block">
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <UsersTabs
          users={users}
          setFilterByUser={setFilterByUser}
          filterByUser={filterByUser}
        />

        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <AlbumsFilter
          albums={albums}
          filterByAlbums={filterByAlbums}
          setFilterByAlbums={setFilterByAlbums}
        />

        <ResetButton resetAllFilters={resetAllFilters} />
      </nav>
    </div>
  );
};
