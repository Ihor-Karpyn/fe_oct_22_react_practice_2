import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';
import usersFromServer from './api/users';
import photosFromServer from './api/photos';
import albumsFromServer from './api/albums';

const uniteGoods = photosFromServer.map(photo => {
  const albums = albumsFromServer.find(album => album.id === photo.albumId);
  const owner = usersFromServer.find(user => user.id === albums.userId);

  return {
    album: albums,
    owner,
    title: photo.title,
    url: photo.url,
    id: photo.id,
  };
});

const filteredGoods = (goodsList,
  { inputQuery, selectedAlbum, selectedUser }) => {
  let copyFiltered = [...uniteGoods];

  if (inputQuery) {
    copyFiltered = copyFiltered.filter(good => good.title.toLowerCase()
      .includes(inputQuery.toLowerCase()));
  }

  if (selectedAlbum.length > 0) {
    copyFiltered = copyFiltered.filter(good => selectedAlbum
      .includes(good.album.id));
  }

  if (selectedUser) {
    copyFiltered = copyFiltered.filter(good => good.owner.id === selectedUser);
  }

  return copyFiltered;
};

export const App = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleQueryChange = (event) => {
    setInputQuery(event.target.value);
  };

  const handleSelectAlbum = (selected, albumId) => {
    if (selected.includes(albumId)) {
      setSelectedAlbum(selected.filter(id => id !== albumId));
    }

    if (!selected.includes(albumId)) {
      setSelectedAlbum([...selected, albumId]);
    }
  };

  const handleReset = () => {
    setInputQuery('');
    setSelectedAlbum([]);
    setSelectedUser(null);
  };

  const filteredGoodsList = filteredGoods(uniteGoods,
    { inputQuery, selectedAlbum, selectedUser });

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Photos from albums</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                className={cn({ 'is-active': !selectedUser })}
                href="#/"
                onClick={() => setSelectedUser(null)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  href="#/"
                  className={cn({ 'is-active': selectedUser === user.id })}
                  onClick={() => setSelectedUser(user.id)}
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
                  value={inputQuery}
                  onChange={handleQueryChange}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>
                {inputQuery && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      type="button"
                      className="delete"
                      onClick={() => setInputQuery('')}
                    />
                  </span>
                )}

              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                className="button is-success mr-6 is-outlined"
                onClick={() => setSelectedAlbum([])}
              >
                All
              </a>
              {albumsFromServer.map(album => (
                <a
                  className={cn('button mr-2 my-1', {
                    'is-info': selectedAlbum.includes(album.id),
                  })}
                  href="#/"
                  key={album.id}
                  onClick={() => handleSelectAlbum(selectedAlbum, album.id)}
                >
                  {`Album ${album.id}`}
                </a>
              ))}

            </div>

            <div className="panel-block">
              <a
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={handleReset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
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
              {filteredGoodsList.map(photo => (
                <tr key={photo.id}>
                  <td className="has-text-weight-bold">
                    {photo.id}
                  </td>

                  <td>{photo.title}</td>
                  <td>{photo.album.title}</td>

                  <td className={cn({
                    'has-text-link': photo.owner.sex === 'm',
                    'has-text-danger': photo.owner.sex === 'f',
                  })}
                  >
                    {photo.owner.name}
                  </td>
                </tr>
              ))}
              {filteredGoodsList.length === 0 && (
                <p data-cy="NoMatchingMessage">
                  No photos matching selected criteria
                </p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
