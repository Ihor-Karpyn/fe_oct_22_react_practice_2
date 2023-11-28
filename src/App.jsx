import React, { useState } from 'react';

import usersFromServer from './api/users';
import photosFromServer from './api/photos';
import albumsFromServer from './api/albums';

import './App.scss';
import { Table } from './components/Table';
import { Filters } from './components/Filters';

const collectedPhotos = photosFromServer.map((photoRecived) => {
  const album = albumsFromServer.find(albumFromServer => (
    albumFromServer.id === photoRecived.albumId
  ));
  const user = usersFromServer.find(userFromServer => (
    userFromServer.id === album.userId
  ));

  return { album, user, ...photoRecived };
});

function getSortedPhotos(photosReceived, selectedUserId, searchQuery) {
  if (!selectedUserId && !searchQuery) {
    return photosReceived;
  }

  return photosReceived.filter((photo) => {
    const preparedPhotoOwnerId = photo.user.id;
    const preparedSearchQuery = searchQuery.toLowerCase();
    const preparedTitle = photo.title.toLowerCase();

    const isMatchSearchQuery = preparedSearchQuery
      ? preparedTitle.includes(preparedSearchQuery)
      : true;

    const isMatchSelectedUser = selectedUserId
      ? preparedPhotoOwnerId === selectedUserId
      : true;

    return isMatchSearchQuery && isMatchSelectedUser;
  });
}

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const preparedPhotos = getSortedPhotos(
    collectedPhotos,
    selectedUserId,
    searchQuery,
  );

  const reset = () => {
    setSearchQuery('');
    setSelectedUserId('');
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Photos from albums</h1>

        <Filters
          resetFilters={reset}
          searchQuery={searchQuery}
          selectedUserId={selectedUserId}
          usersFromServer={usersFromServer}
          albumsFromServer={albumsFromServer}
          setQueryForSeach={query => setSearchQuery(query)}
          setSelectedUserId={value => setSelectedUserId(value)}
        />

        <Table preparedPhotos={preparedPhotos} />
      </div>
    </div>
  );
};
