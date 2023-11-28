import { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import photosFromServer from './api/photos';
import albumsFromServer from './api/albums';

const USER_1 = usersFromServer.find((user) => user.id === 1);
const USER_2 = usersFromServer.find((user) => user.id === 2);
const USER_3 = usersFromServer.find((user) => user.id === 3);
const FEMALE = 'f';

const prepearedFotos = photosFromServer.map((photo) => {
  const { albumId } = photo;

  const album = albumsFromServer.find((alb) => alb.id === albumId);
  const user = usersFromServer.find((us) => us.id === album.userId);

  return {
    ...photo,
    album,
    user,
  };
});

const BY_NAME = [USER_1.name, USER_2.name, USER_3.name];
// const BY_ALBUM = ''; // массив альбомов
// const BY_QUERY = 'string'; // по типу стринг из поля ввода

function filterPhotos(sortBy, fotosToFilter) {
  const fotosToMap = [...fotosToFilter];

  if (BY_NAME.includes(sortBy)) {
    fotosToMap.filter((foto) => {
      const { user } = foto;
      const { name } = user;

      if (name === sortBy) {
        return true;
      }

      return false;
    });
  }

  // if (BY_QUERY) {
  // }

  // if (BY_ALBUM) {
  // }
  return fotosToMap;
}

// console.log(prepearedFotos);

export const App = () => {
  const [sortType, setSortType] = useState('');
  const prepearedToMap = filterPhotos(sortType, prepearedFotos);

  const sortByName1 = () => {
    setSortType(USER_1.name);
  };

  const sortByName2 = () => {
    setSortType(USER_2.name);
  };

  const sortByName3 = () => {
    setSortType(USER_3.name);
  };

  const sortByName0 = () => {
    setSortType('');
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
                href="#/"
                onClick={() => {
                  sortByName0(BY_NAME);
                }}
              >
                All
              </a>

              <a
                href="#/"
                onClick={() => {
                  sortByName1(BY_NAME);
                }}
                key={USER_1.id}
              >
                {USER_1.name}
              </a>

              <a
                href="#/"
                onClick={() => {
                  sortByName2(BY_NAME);
                }}
                className="is-active"
                key={USER_2.id}
              >
                {USER_2.name}
              </a>

              <a
                href="#/"
                key={USER_3.id}
                onClick={() => {
                  sortByName3(BY_NAME);
                }}
              >
                {USER_3.name}
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button type="button" className="delete" />
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a href="#/" className="button is-success mr-6 is-outlined">
                All
              </a>

              <a className="button mr-2 my-1 is-info" href="#/">
                Album 1
              </a>

              <a className="button mr-2 my-1" href="#/">
                Album 2
              </a>

              <a className="button mr-2 my-1 is-info" href="#/">
                Album 3
              </a>
              <a className="button mr-2 my-1" href="#/">
                Album 4
              </a>
              <a className="button mr-2 my-1" href="#/">
                Album 5
              </a>
            </div>

            <div className="panel-block">
              <a href="#/" className="button is-link is-outlined is-fullwidth">
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No photos matching selected criteria
          </p>

          <table className="table is-striped is-narrow is-fullwidth">
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
              {prepearedToMap.map((foto) => {
                const {
                  album, id, title, user,
                } = foto;

                const classes = cn({
                  'has-text-danger': user.sex === FEMALE,
                  'has-text-link': user.sex !== FEMALE,
                });

                return (
                  <tr>
                    <td className="has-text-weight-bold" key={id}>
                      {id}
                    </td>

                    <td>{title}</td>
                    <td>{album.title}</td>

                    <td className={classes}>{user.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
