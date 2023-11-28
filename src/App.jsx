import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import photosFromServer from './api/photos';
import albumsFromServer from './api/albums';

import { TableHeader } from './components/TableHeader';
import { TableList } from './components/TableList';

const tableHeaders = ['ID', 'Photo name', 'Album name', 'User name'];

const photos = photosFromServer.map(photo => {
  const album = albumsFromServer.map(item => {
    const user = usersFromServer.find(person => {
      return person.id === item.userId;
    });

    return {
      ...item,
      user,
    };
  }).find(item => photo.albumId === item.id);

  return {
    ...photo,
    album,
  };
});

const operateData = (data,
  {
    searchQuery,
    filterByUser,
    filterByAlbums,
  }) => {
  let currentData = [...data];

  if (searchQuery) {
    currentData = currentData.filter((item) => {
      const photoTitle = item.title.toLowerCase();
      const albumTitle = item.album.title.toLowerCase();

      const query = searchQuery.toLowerCase().trim();

      return photoTitle.includes(query) || albumTitle.includes(query);
    });
  }

  if (filterByUser) {
    currentData = currentData.filter(item => (
      item.album.user.id === filterByUser
    ));
  }

  if (filterByAlbums.length > 0) {
    currentData = currentData.filter(item => (
      filterByAlbums.includes(item.album.id)
    ));
  }

  return currentData;
};

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterByUser, setFilterByUser] = useState(null);
  const [filterByAlbums, setFilterByAlbums] = useState([]);

  const currentPhotos = operateData(photos,
    {
      searchQuery,
      filterByUser,
      filterByAlbums,
    });

  const handlerReset = () => {
    setSearchQuery('');
    setFilterByUser(null);
    setFilterByAlbums([]);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Photos from albums</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
                className={cn({ 'is-active': !filterByUser })}
                onClick={() => setFilterByUser(null)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({ 'is-active': filterByUser === user.id })}
                  onClick={() => setFilterByUser(user.id)}
                  key={user.id}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {searchQuery && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
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
                className={cn('button', 'mr-6', 'is-success',
                  { 'is-outlined': filterByAlbums.length !== 0 })}
                onClick={() => setFilterByAlbums([])}
              >
                All
              </a>

              {albumsFromServer.map(album => (
                <a
                  className={cn('button', 'mr-2', 'my-1',
                    { 'is-info': filterByAlbums.includes(album.id) })}
                  href="#/"
                  onClick={
                    () => setFilterByAlbums([...filterByAlbums, album.id])
                  }
                  key={album.id}
                >
                  {album.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={handlerReset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {!currentPhotos && (
            <p data-cy="NoMatchingMessage">
              No photos matching selected criteria
            </p>
          )}

          {currentPhotos && (
            <table
              className="table is-striped is-narrow is-fullwidth"
            >
              <TableHeader headers={tableHeaders} />

              <TableList photos={currentPhotos} />
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
