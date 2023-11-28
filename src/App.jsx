import { useState } from 'react';
import './App.scss';

import albumsFromServer from './api/albums';
import photosFromServer from './api/photos';
import usersFromServer from './api/users';
import { AlbumFilter } from './components/Filters/AlbumFilter';
import { QueryFilter } from './components/Filters/QueryFilter';
import { ResetFilters } from './components/Filters/ResetFilters';
import { UserFilter } from './components/Filters/UserFilter';
import { ProductTable } from './components/ProductTable';

const photos = photosFromServer.map(photo => {
  const album = albumsFromServer.find(al => al.id === photo.albumId);
  const user = usersFromServer.find(u => u.id === album.userId);

  return {
    ...photo,
    album,
    user,
  };
});

const DEFAULT_ORDER = [...photos].map(photo => photo.id);

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [photoTitleQuery, setPhotoTitleQuery] = useState('');
  const [selectedAlbums, setSelectedAlbums] = useState([]);
  const [selectedSortingMethod, setSelectedSortingMethod] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isSorted, setIsSorted] = useState(false);
  const [order, setOrder] = useState([...DEFAULT_ORDER]);

  const columns = {
    id: 'ID',
    photo: 'Photo name',
    album: 'Album name',
    user: 'User name',
  };

  const getFilteredPhotos = unfilteredPhotos => {
    let viewPhotos = [...unfilteredPhotos];

    if (selectedUser !== 0) {
      viewPhotos = viewPhotos.filter(photo => photo.user.id === selectedUser);
    }

    if (selectedAlbums.length !== 0) {
      viewPhotos = viewPhotos.filter(
        photo => selectedAlbums.includes(photo.album.title),
      );
    }

    if (photoTitleQuery) {
      viewPhotos = viewPhotos.filter(photo => photo.title.toLowerCase()
        .includes(photoTitleQuery.toLowerCase()));
    }

    if (order.length !== viewPhotos.length) {
      setOrder([...viewPhotos].map(photo => photo.id));
    }

    if (sortBy && selectedSortingMethod && isSorted) {
      setIsSorted(false);

      viewPhotos.sort((a, b) => {
        let res = 0;

        switch (sortBy) {
          case columns.id:
            res = a.id - b.id;
            break;

          case columns.photo:
            res = a.title.localeCompare(b.title);
            break;

          case columns.album:
            res = a.album.title.localeCompare(b.album.title);
            break;

          case columns.user:
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

      setOrder([...viewPhotos].map(photo => photo.id));
    }

    const temp = [];

    order.forEach(id => {
      const photo = viewPhotos.find(p => p.id === id);

      if (photo) {
        temp.push(photo);
      }
    });

    viewPhotos = [...temp];

    return viewPhotos;
  };

  const handleChangingUserFilter = id => {
    setOrder([...DEFAULT_ORDER]);
    setSelectedUser(id);
  };

  const handleSelectingAlbumFilter = albumName => {
    setOrder([...DEFAULT_ORDER]);

    if (selectedAlbums.includes(albumName)) {
      setSelectedAlbums(selectedAlbums.filter(album => album !== albumName));
    } else {
      setSelectedAlbums([...selectedAlbums, albumName]);
    }
  };

  const handleChangeSortingMethod = field => {
    setOrder([...DEFAULT_ORDER]);

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

  const checkSortingMethod = field => {
    if (field !== sortBy) {
      return 'fa-sort';
    }

    if (selectedSortingMethod === 'asc') {
      return 'fa-sort-up';
    }

    return 'fa-sort-down';
  };

  const handleChangeOrder = (photoId, offset) => {
    const orderClone = [...order];
    const index = order.indexOf(photoId);

    if ((index === 0 && offset === -1)
    || (index === order.length - 1 && offset === 1)) {
      return;
    }

    const replaceWith = order[index + offset];

    orderClone.splice(index, 1, replaceWith);
    orderClone.splice(index + offset, 1, photoId);

    setOrder(orderClone);
  };

  const resetAllFilters = () => {
    setSelectedUser(0);
    setPhotoTitleQuery('');
    setSelectedAlbums([]);
    setSelectedSortingMethod('');
    setSortBy('');
    setOrder([...DEFAULT_ORDER]);
  };

  const photosToView = getFilteredPhotos(photos);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Photos from albums</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UserFilter
              selectedUser={selectedUser}
              handleChangingUserFilter={handleChangingUserFilter}
            />

            <QueryFilter
              photoTitleQuery={photoTitleQuery}
              setPhotoTitleQuery={setPhotoTitleQuery}
            />

            <AlbumFilter
              selectedAlbums={selectedAlbums}
              setSelectedAlbums={setSelectedAlbums}
              handleSelectingAlbumFilter={handleSelectingAlbumFilter}
            />

            <ResetFilters resetAllFilters={resetAllFilters} />
          </nav>
        </div>

        <ProductTable
          photosToView={photosToView}
          columns={columns}
          handleChangeSortingMethod={handleChangeSortingMethod}
          checkSortingMethod={checkSortingMethod}
          handleChangeOrder={handleChangeOrder}
          setIsSorted={setIsSorted}
        />
      </div>
    </div>
  );
};
