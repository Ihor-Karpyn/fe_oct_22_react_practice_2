import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';
import usersFromServer from './api/users';
import photosFromServer from './api/photos';
import albumsFromServer from './api/albums';
import { Photo } from './components/Photo';

function getPhotosForRender(photos, props) {
  const { filterByOwner, searchQuery, selectedAlbums } = props;

  let preparedPhotos = photos.map(photo => {
    const album = albumsFromServer.find(
      currentAlbum => currentAlbum.id === photo.albumId,
    );
    const user = usersFromServer.find(owner => owner.id === album.userId);

    return {
      ...photo,
      album,
      user,
    };
  });

  if (filterByOwner) {
    preparedPhotos = preparedPhotos.filter(
      photo => photo.user.name === filterByOwner,
    );
  }

  if (searchQuery) {
    const preparedQuery = searchQuery.toLowerCase();

    preparedPhotos = preparedPhotos.filter(
      photo => photo.title.toLowerCase().includes(preparedQuery),
    );
  }

  if (selectedAlbums.length > 0) {
    preparedPhotos = preparedPhotos.filter(
      photo => selectedAlbums.some(album => album.id === photo.albumId),
    );
  }

  return preparedPhotos;
}

function isActive(user, filterByOwner) {
  return user.name === filterByOwner;
}

export const App = () => {
  const [filterByOwner, setFilterByOwner] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlbums, setSelectedAlbums] = useState([]);

  const toggleSelect = (album) => {
    if (selectedAlbums.includes(album)) {
      const newSelectedAlbums = selectedAlbums.filter(
        a => a !== album,
      );

      setSelectedAlbums(newSelectedAlbums);
    } else {
      setSelectedAlbums([...selectedAlbums, album]);
    }
  };

  const resetAllFilters = () => {
    setFilterByOwner('');
    setSearchQuery('');
    setSelectedAlbums([]);
  };

  const photosForRender = getPhotosForRender(photosFromServer,
    {
      filterByOwner,
      searchQuery,
      selectedAlbums,
    });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Photos from albums</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                href="#/"
                onClick={() => setFilterByOwner('')}
                className={cn({ 'is-active': filterByOwner === '' })}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  href="#/"
                  onClick={() => setFilterByOwner(user.name)}
                  className={cn({ 'is-active': isActive(user, filterByOwner) })}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {searchQuery
                && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      type="button"
                      className="delete"
                      onClick={() => setSearchQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                className={cn('button is-success mr-6',
                  { 'is-outlined': selectedAlbums.length >= 1 })}
                onClick={() => setSelectedAlbums([])}
              >
                All
              </a>

              {albumsFromServer.map(album => (
                <a
                  className={cn('button mr-2 my-1',
                    { 'is-info': selectedAlbums.includes(album) })}
                  href="#/"
                  onClick={() => toggleSelect(album)}
                >
                  {`Album ${album.id}`}
                </a>
              ))}
            </div>

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
          {photosForRender.length === 0
            && (
              <p data-cy="NoMatchingMessage">
                No photos matching selected criteria
              </p>
            )}

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

            <tbody>
              {photosForRender.map(photo => (
                <Photo
                  photo={photo}
                  key={photo.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
