import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import photosFromServer from './api/photos';
import albumsFromServer from './api/albums';

import { Table } from './components/Table';
import { Filters } from './components/Filters';

const photos = photosFromServer.map((photo) => {
  const album = albumsFromServer
    .find(el => el.id === photo.albumId) || null;

  const user = usersFromServer
    .find(elem => elem.id === album.userId) || null;

  return {
    ...photo,
    album,
    user,
  };
});

function getPreperedPhotos(
  localPhotos,
  {
    filterField,
    query,
    filteredAlbum,
  },
) {
  let filteredPhotos = localPhotos;

  if (filterField === 'all') {
    filteredPhotos = localPhotos;
  }

  if (filterField && filterField !== 'all') {
    filteredPhotos = localPhotos
      .filter(product => product.user.name === filterField);
  }

  if (query) {
    const queryUpperCase = query.toUpperCase().trim();

    filteredPhotos = filteredPhotos.filter(photo => photo.title
      .toUpperCase()
      .includes(queryUpperCase));
  }

  if (filteredAlbum && filteredAlbum !== 'allAlbum') {
    filteredPhotos = filteredPhotos
      .filter(photo => photo.album.title === filteredAlbum);
  }

  return filteredPhotos;
}

export const App = () => {
  const [filterField, setFilterField] = useState('all');
  const [query, setQuery] = useState('');
  const [filteredAlbum, setFilteredAlbum] = useState('allAlbum');

  const visiblePhotos = getPreperedPhotos(
    photos,
    {
      filterField,
      query,
      filteredAlbum,
    },
  );

  const isTableVisible = visiblePhotos.length > 0;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Photos from albums</h1>

        <Filters
          onFilterSelect={user => setFilterField(user)}
          onFilterInput={words => setQuery(words)}
          onFilterSelectAlbum={album => setFilteredAlbum(album)}
          filterField={filterField}
          query={query}
          filteredAlbum={filteredAlbum}
          usersFromServer={usersFromServer}
          albumsFromServer={albumsFromServer}
        />

        <Table
          isTableVisible={isTableVisible}
          visiblePhotos={visiblePhotos}
        />
      </div>
    </div>
  );
};
