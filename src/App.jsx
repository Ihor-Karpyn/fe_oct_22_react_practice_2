/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
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

function getPhotosFiltered(inputPhotos, selectedUser, query) {
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

  return filteredPhotos;
}

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [query, setQuery] = useState('');

  const prepareQuery = (inputQuery) => {
    const pureQuery = inputQuery.trim().toLowerCase();

    setQuery(pureQuery);
  };

  const handleUserSelect = user => setSelectedUser(user);
  const resetUserSelect = () => setSelectedUser(null);

  const resetQuery = () => setQuery("");

  const preparedPhotos = getPhotosFiltered(
    completedPhotos,
    selectedUser,
    query,
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
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              {albumsFromServer.map(
                album => (
                  <a
                    className="button mr-2 my-1 is-info"
                    href="#/"
                  >
                    {album.id}
                  </a>
                ),
              )}
            </div>

            <div className="panel-block">
              <a
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={() => {
                  resetQuery();
                  resetUserSelect();
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
