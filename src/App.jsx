/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import photosFromServer from './api/photos';
import albumsFromServer from './api/albums';

function getAlbumById(albumId) {
  return albumsFromServer.find(album => album.id === albumId);
}

function getUserById(userId) {
  return usersFromServer.find(user => user.id === userId);
}

const completedPhotos = photosFromServer.map(photo => ({
  album: getAlbumById(photo.albumId),
  title: photo.title,
  id: photo.id,
  user: getUserById(getAlbumById(photo.albumId).userId),
}));

function getPhotosFiltered(inputPhotos, selectedUser, query, albums) {
  let filteredPhotos = [...inputPhotos];

  if (selectedUser) {
    filteredPhotos = filteredPhotos.filter(
      photo => photo.user.name === selectedUser.name,
    );
  }

  if (query) {
    filteredPhotos = filteredPhotos.filter(
      photo => photo.title.toLowerCase().includes(query),
    );
  }

  if (albums.length > 0) {
    filteredPhotos = filteredPhotos.filter(
      photo => albums.includes(photo.album.id),
    );
  }

  return filteredPhotos;
}

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedAlbums, setSelectedAlbums] = useState([]);

  const prepareQuery = (inputQuery) => {
    const pureQuery = inputQuery.trim().toLowerCase();

    setQuery(pureQuery);
  };

  const resetQuery = () => setQuery("");

  const handleUserSelect = user => setSelectedUser(user);
  const resetUserSelect = () => setSelectedUser(null);

  const handleSelectedAlbum = (albumId) => {
    setSelectedAlbums(prevAlbums => {
      if (prevAlbums.includes(albumId)) {
        return prevAlbums.filter(id => id !== albumId);
      }

      return [...prevAlbums, albumId];
    });
  };

  const resetAlbumsSelect = () => setSelectedAlbums([]);

  const preparedPhotos = getPhotosFiltered(
    completedPhotos,
    selectedUser,
    query,
    selectedAlbums,
  );

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
                onClick={() => resetUserSelect()}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  href="#/"
                  className={classNames({ 'is-active': selectedUser === user })}
                  onClick={() => handleUserSelect(user)}
                  key={user.id}
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
                  value={query}
                  onChange={event => prepareQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {query && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      type="button"
                      className="delete"
                      onClick={() => resetQuery()}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                onClick={() => resetAlbumsSelect()}
                className={classNames('button is-success mr-6', {
                  'is-outlined': selectedAlbums.length !== 0,
                })}
              >
                All
              </a>

              {albumsFromServer.map(album => (
                <a
                  className={classNames('button mr-2 my-1 album-button', {
                    'is-info': selectedAlbums.includes(album.id),
                  })}
                  href="#/"
                  key={album.id}
                  onClick={() => handleSelectedAlbum(album.id)}
                  style={{
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {
                    album.title.length > 25
                      ? `${album.title.substring(0, 25)} ...`
                      : album.title
                  }
                </a>
              ))}

            </div>

            <div className="panel-block">
              <a
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  resetQuery();
                  resetUserSelect();
                  resetAlbumsSelect();
                }}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {preparedPhotos.length === 0 && (
            <p data-cy="NoMatchingMessage">
              No photos matching selected criteria
            </p>
          )}

          {preparedPhotos.length > 0 && (
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
                {preparedPhotos.map(
                  photo => (
                    <tr>
                      <td className="has-text-weight-bold">
                        {photo.id}
                      </td>

                      <td>{photo.title}</td>
                      <td>{photo.album.title}</td>

                      <td className={(
                        photo.user.sex === 'm'
                          ? 'has-text-link'
                          : 'has-text-danger'
                      )}
                      >
                        {photo.user.name}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
