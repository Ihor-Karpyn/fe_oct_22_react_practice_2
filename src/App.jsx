import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import photosFromServer from './api/photos';
import albumsFromServer from './api/albums';
import { PhotoTable } from './components/PhotoTable/PhotoTable';
import { FiltersPanel } from './components/FiltersPanel/FiltersPanel';

function getFilteredPhotos(photos, filters) {
  const { filterByUser, searchQuery, filterByAlbums } = filters;

  let filteredPhotos = photos;

  if (filterByUser) {
    filteredPhotos = filteredPhotos.filter(
      product => product.user.name === filterByUser,
    );
  }

  if (searchQuery) {
    const preparedQuery = searchQuery.toLowerCase();

    filteredPhotos = filteredPhotos.filter(
      photo => photo.title.toLowerCase().includes(preparedQuery),
    );
  }

  if (filterByAlbums.length) {
    filteredPhotos = filteredPhotos.filter(
      photo => filterByAlbums.includes(photo.album.title),
    );
  }

  return filteredPhotos;
}

const preparedPhotos = photosFromServer.map((photo) => {
  const album = albumsFromServer.find(
    currentAlbum => photo.albumId === currentAlbum.id,
  ) || null;

  const user = usersFromServer.find(
    currentUser => album.userId === currentUser.id,
  ) || null;

  return {
    ...photo,
    album,
    user,
  };
});

export const App = () => {
  const [filterByUser, setFilterByUser] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterByAlbums, setFilterByAlbums] = useState([]);
  const [photos, setPhotos] = useState(preparedPhotos);

  const filteredPhotos = getFilteredPhotos(
    photos,
    { filterByUser, searchQuery, filterByAlbums },
  );

  const resetAllFilters = () => {
    setFilterByUser('');
    setSearchQuery('');
    setFilterByAlbums([]);
  };

  const moveUp = (photo) => {
    const index = photos.indexOf(photo);

    if (index < 1) {
      return;
    }

    setPhotos([
      ...photos.slice(0, index - 1),
      photos[index],
      photos[index - 1],
      ...photos.slice(index + 1),
    ]);
  };

  const moveDown = (photo) => {
    const index = photos.indexOf(photo);

    if (index > photos.length - 2) {
      return;
    }

    setPhotos([
      ...photos.slice(0, index),
      photos[index + 1],
      photos[index],
      ...photos.slice(index + 2),
    ]);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Photos from albums</h1>

        <FiltersPanel
          users={usersFromServer}
          setFilterByUser={setFilterByUser}
          filterByUser={filterByUser}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          resetAllFilters={resetAllFilters}
          albums={albumsFromServer}
          filterByAlbums={filterByAlbums}
          setFilterByAlbums={setFilterByAlbums}
        />

        <PhotoTable
          photos={filteredPhotos}
          moveUp={moveUp}
          moveDown={moveDown}
        />
      </div>
    </div>
  );
};
