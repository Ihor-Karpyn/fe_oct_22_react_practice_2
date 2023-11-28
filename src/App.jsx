import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';
import { ResetFilters } from './components/ResetFilters/ResetFilters';
import { UserFilter } from './components/UserFilter/UserFilter';

import usersFromServer from './api/users';
import photosFromServer from './api/photos';
import albumsFromServer from './api/albums';

const MALE = 'm';
const FEMALE = 'f';

const mappedPhotos = photosFromServer.map((photo) => {
  const foundAlbum = albumsFromServer
    .find(album => album.id === photo.albumId) || null;

  const foundUser = usersFromServer
    .find(user => user.id === foundAlbum?.userId) || null;

  return {
    ...photo,
    album: foundAlbum,
    user: foundUser,
  };
});

export const App = () => {
  const [selectedOwner, setSelectedOwner] = useState(0);
  const [searchField, setSearchField] = useState('');
  const [selectedAlbums, setSelectedAlbums] = useState([]);
  const [selectedSortingMethod, setSelectedSortingMethod] = useState('');
  const [sortBy, setSortBy] = useState('');

  const filteredPhotos = mappedPhotos.filter((photo) => {
    const isOwnerMatched = selectedOwner === 0
    || (photo.user.id === selectedOwner);

    const isPhotoMatched = searchField === ''
    || photo.title.toLowerCase().includes(searchField.toLowerCase());

    const isAlbumMatched = !selectedAlbums.length
    || selectedAlbums.includes(photo.album.title);

    return isOwnerMatched && isPhotoMatched && isAlbumMatched;
  });

  if (sortBy && selectedSortingMethod) {
    filteredPhotos.sort((a, b) => {
      let res = 0;

      switch (sortBy) {
        case 'id':
          res = a.id - b.id;
          break;

        case 'photo name':
          res = a.title.localeCompare(b.title);
          break;

        case 'album name':
          res = a.album.title.localeCompare(b.album.title);
          break;

        case 'user name':
          res = a.user.name.localeCompare(b.user.name);
          break;

        default:
          break;
      }

      if (selectedSortingMethod === 'desc') {
        res *= -1;
      }

      return res;
    });
  }

  const handleChangingOwnerFilter = id => setSelectedOwner(id);

  const inputSearchHandler = (event) => {
    setSearchField(event.target.value);
  };

  const handleSelectingAlbum = (albumName) => {
    if (selectedAlbums.includes(albumName)) {
      setSelectedAlbums(
        selectedAlbums.filter(album => album !== albumName),
      );
    } else {
      setSelectedAlbums([
        ...selectedAlbums,
        albumName,
      ]);
    }
  };

  const handleChangeSortingMethod = (field) => {
    if (sortBy !== field) {
      setSortBy(field);
      setSelectedSortingMethod('asc');

      return;
    }

    switch (selectedSortingMethod) {
      case '':
        setSelectedSortingMethod('asc');
        break;

      case 'asc':
        setSelectedSortingMethod('desc');
        break;

      case 'desc':
        setSelectedSortingMethod('');
        setSortBy('');
        break;

      default:
        break;
    }
  };

  const checkSortingMethod = (field) => {
    if (field !== sortBy) {
      return 'fa-sort';
    }

    if (selectedSortingMethod === 'asc') {
      return 'fa-sort-up';
    }

    return 'fa-sort-down';
  };

  const resetSearch = () => {
    setSearchField('');
  };

  const resetAllFilters = () => {
    setSearchField('');
    setSelectedOwner(0);
    setSelectedAlbums([]);
    setSelectedSortingMethod('');
    setSortBy('');
  };

  const columns = ['ID', 'Photo name', 'Album name', 'User name'];

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Photos from albums</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UserFilter
              selectedOwner={selectedOwner}
              handleChangingOwnerFilter={handleChangingOwnerFilter}
              usersFromServer={usersFromServer}
            />

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchField}
                  onChange={inputSearchHandler}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {searchField ? (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={resetSearch}
                    />
                  ) : null}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                className={cn(
                  'button is-success mr-6',
                  { 'is-outlined': setSelectedAlbums.length !== 0 },
                )}
                onClick={() => setSelectedAlbums([])}

              >
                All
              </a>

              {
                albumsFromServer.map(album => (
                  <a
                    href="#/"
                    key={album.id}
                    className={cn('button mr-2 my-1', {
                      'is-info': selectedAlbums.includes(album.title),
                    })}
                    onClick={() => handleSelectingAlbum(album.title)}
                  >
                    {album.title}
                  </a>
                ))
              }
            </div>

            <ResetFilters resetAllFilters = {resetAllFilters} />
          </nav>
        </div>

        <div className="box table-container">
          {filteredPhotos.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No photos matching selected criteria
            </p>
          ) : (
            <table
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {columns.map(column => (
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        {column}
                        <a
                          href="#/"
                          onClick={() => handleChangeSortingMethod(
                            column.toLowerCase(),
                          )}
                        >
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              className={`fas ${checkSortingMethod(column.toLowerCase())}`}
                            />
                          </span>
                        </a>
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredPhotos.map((photo) => {
                  const { album, user } = photo;

                  return (
                    <tr key={photo.id}>
                      <td className="has-text-weight-bold">
                        {photo.id}
                      </td>

                      <td>{photo.title}</td>
                      {album && (
                        <td>{album.title}</td>
                      )}

                      {user && (
                        <td
                          className={cn({
                            'has-text-link': user.sex === MALE,
                            'has-text-danger': user.sex === FEMALE,
                          })}
                        >
                          {user.name}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
