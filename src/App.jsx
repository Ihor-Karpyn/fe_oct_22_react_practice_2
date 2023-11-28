import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import photosFromServer from './api/photos';
import albumsFromServer from './api/albums';
import { PhotoList } from './components/PhotoList/PhotoList';
import { UserTabs } from './components/PhotoList/UserTabs/UserTabs';
import { SearchInput } from './components/PhotoList/SearchInput/SearchInput';
import { AlbumsList } from './components/AlbumsList/AlbumsList';

const FILTER_TYPE_USER = 'user';

const readyPhotos = photosFromServer.map(photo => {
  const album = albumsFromServer.find(alb => photo.albumId === alb.id);
  const user = usersFromServer.find(usr => album.userId === usr.id);

  return {
    ...photo,
    user,
    album,
  };
});

const prepearePhotos = (photos, filtType, filtValue, query = '', albumFilt) => {
  const trimmedQuery = query.trim().toLowerCase();

  let toReadyPhotos = [...photos];

  if (filtType === FILTER_TYPE_USER) {
    toReadyPhotos = toReadyPhotos
      .filter(photo => photo.user.id === filtValue);
  }

  if (albumFilt.length > 0) {
    toReadyPhotos = toReadyPhotos
      .filter(photo => albumFilt.includes(photo.album.id));
  }

  if (trimmedQuery) {
    return toReadyPhotos
      .filter((photo) => {
        const trimmedPhotoName = photo.title.trim().toLowerCase();

        return trimmedPhotoName.includes(trimmedQuery);
      });
  }

  return toReadyPhotos;
};

export const App = () => {
  const [users] = useState(usersFromServer);
  const [albums] = useState(albumsFromServer);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [albumFilter, setAlbumFilter] = useState([]);

  const onUserFilter = (userId) => {
    setFilterType(FILTER_TYPE_USER);
    setFilterValue(userId);

    if (userId === '') {
      setFilterType('');
      setFilterValue('');
    }
  };

  const onAlbumFilter = (albumId) => {
    if (albumFilter.includes(albumId)) {
      setAlbumFilter((prevAlbumFilter) => {
        return prevAlbumFilter.filter((id) => id !== albumId);
      });
    }

    setAlbumFilter((prevAlbumFilter) => [...prevAlbumFilter, albumId]);
  };

  const onQueryChange = (query) => {
    setSearchQuery(query);
  };

  const resetAllFilters = () => {
    setFilterType('');
    setFilterValue('');
    setSearchQuery('');
    setAlbumFilter([]);
  };

  const photosToRender = prepearePhotos(
    readyPhotos,
    filterType,
    filterValue,
    searchQuery,
    albumFilter,
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Photos from albums</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UserTabs
              users={users}
              onFilter={selectedUserId => onUserFilter(selectedUserId)}
              filterValue={filterValue}
            />

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <SearchInput
                  value={searchQuery}
                  onQueryChange={quer => onQueryChange(quer)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* <button
                    type="button"
                    className="delete"
                  /> */}
                </span>
              </p>
            </div>

            <AlbumsList
              albums={albums}
              albumFilter={albumFilter}
              onFilter={(albumId) => onAlbumFilter(albumId)}
              onAlbumsReset={() => setAlbumFilter('')}
            />

            <div className="panel-block">
              <a
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => resetAllFilters()}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">

          {
            photosToRender.length
              ? (
                <table
                  className="table is-striped is-narrow is-fullwidth"
                >
                  <thead>
                    <tr>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          ID

                          <a href="#/">
                            <span className="icon">
                              <i data-cy="SortIcon" className="fas fa-sort" />
                            </span>
                          </a>
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Photo name

                          <a href="#/">
                            <span className="icon">
                              <i className="fas fa-sort-down" />
                            </span>
                          </a>
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Album name

                          <a href="#/">
                            <span className="icon">
                              <i className="fas fa-sort-up" />
                            </span>
                          </a>
                        </span>
                      </th>

                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          User name

                          <a href="#/">
                            <span className="icon">
                              <i className="fas fa-sort" />
                            </span>
                          </a>
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <PhotoList photos={photosToRender} />
                </table>
              )
              : (
                <p data-cy="NoMatchingMessage">
                  No photos matching selected criteria
                </p>
              )
          }

        </div>

      </div>
    </div>
  );
};
