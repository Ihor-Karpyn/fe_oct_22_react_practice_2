import './App.scss';
import { useState } from 'react';
import { PhotoTable } from './PhotoTable';

import usersFromServer from './api/users';
import photosFromServer from './api/photos';
import albumsFromServer from './api/albums';
import { UserTab } from './UserTab';
// import { AlbumFilter } from './AlbumFilter';

// const FILTER_TYPE_USER = 'user';

const filterPhotos = (photos, searchQuery, selectedUserId, albums) => {
  return photos.filter((photo) => {
    const preparedSearchQuery = searchQuery.toLowerCase().trim();
    const preparedTitle = photo.title.toLowerCase();

    const matchSearch = !searchQuery
      || preparedTitle.includes(preparedSearchQuery);

    if (selectedUserId) {
      return matchSearch && albums
        .filter(album => album.userId === selectedUserId
          && album.id === photo.albumId);
    }

    return matchSearch;
  });
};

export const App = () => {
  const [photos] = useState(photosFromServer);
  const [users] = useState(usersFromServer);
  const [albums] = useState(albumsFromServer);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [filterValue, setFilterValue] = useState('');
  const photosForRender
    = filterPhotos(
      photos,
      searchQuery,
      selectedUserId,
      filterValue,
    );

  const onUserFilter = (userId) => {
    setSelectedUserId(userId);
    const userAlbums = albums.filter(album => album.userId === userId);

    setFilterValue(userAlbums.map(album => album.id));
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedUserId(null);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Photos from albums</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UserTab
              users={users}
              onFilter={selectedUsrId => onUserFilter(selectedUsrId)}
              filterValue={filterValue}
            />

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={event => setSearchQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {searchQuery && (
                    <button
                      type="button"
                      className="delete"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear Search"
                    />
                  )}
                </span>
              </p>
            </div>

            {/* <AlbumFilter albums={albums} /> */}

            <div className="panel-block">
              <a
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {photosForRender.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No photos matching selected criteria
            </p>
          ) : (
            <PhotoTable
              photos={photosForRender}
              albums={albums}
              users={users}
            />
          )}
        </div>
      </div>
    </div>
  );
};
