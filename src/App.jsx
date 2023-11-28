import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import photosFromServer from './api/photos';
import albumsFromServer from './api/albums';

import { UsersList } from './components/UsersList/UsersList';
import { SearchField } from './components/SearchField/SearchField';
import { AlbumsList } from './components/AlbumsList/AlbumsList';
import { ResetBtn } from './components/ResetBtn/ResetBtn';
import { PhotosList } from './components/PhotosList/PhotosList';

function preparePhotos(photos, {
  filterByUser,
  filterByAlbum,
  query,
}) {
  let preparedPhotos = photos.map((photo) => {
    const album = albumsFromServer.find(
      exactAlbum => photo.albumId === exactAlbum.id,
    ) || null;

    const user = usersFromServer.find(
      photoOwner => album.userId === photoOwner.id,
    ) || null;

    return {
      ...photo,
      album,
      user,
    };
  });

  if (filterByUser) {
    preparedPhotos = preparedPhotos.filter(
      photo => photo.user.name === filterByUser,
    );
  }

  if (filterByAlbum.length) {
    preparedPhotos = preparedPhotos.filter(
      photo => filterByAlbum.includes(photo.album.title),
    );
  }

  if (query) {
    const lowerQuery = query.toLowerCase().trim();
    const upperQuery = query.toUpperCase().trim();

    preparedPhotos = preparedPhotos.filter(
      photo => photo.title.toLowerCase().includes(lowerQuery)
        || photo.title.toUpperCase().includes(upperQuery),
    );
  }

  return preparedPhotos;
}

export const App = () => {
  const [filterByUser, setFilterByUser] = useState('');
  const [filterByAlbum, setFilterByAlbum] = useState([]);
  const [query, setQuery] = useState('');

  const preparedPhotos = preparePhotos(photosFromServer, {
    filterByUser,
    filterByAlbum,
    query,
  });

  const selectAlbum = (album) => {
    if (!filterByAlbum.includes(album.title)) {
      setFilterByAlbum(
        currentFilter => [...currentFilter, album.title],
      );
    }
  };

  const reset = () => {
    setFilterByUser('');
    setFilterByAlbum([]);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Photos from albums</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UsersList
              users={usersFromServer}
              setFilterByUser={setFilterByUser}
              filterByUser={filterByUser}
            />

            <SearchField
              query={query}
              setQuery={setQuery}
            />

            <AlbumsList
              albums={albumsFromServer}
              filterByAlbum={filterByAlbum}
              setFilterByAlbum={setFilterByAlbum}
              selectAlbum={selectAlbum}
            />

            <ResetBtn
              reset={reset}
            />
          </nav>
        </div>

        <PhotosList
          photos={preparedPhotos}
        />
      </div>
    </div>
  );
};
