// import { useState } from 'react';
import cn from 'classnames';

export const PhotoTable = ({ filteredGoodsList }) => {
  // const [goods, setGoods] = useState(filteredGoodsList);

  // const moveUp = (good) => {
  //   const index = filteredGoodsList.indexOf(good);

  //   if (index > 1) {
  //     return;
  //   }

  //   setGoods([
  //     ...goods.slice(0, index - 1),
  //     goods[index],
  //     goods[index - 1],
  //     goods.slice(index + 1),
  //   ]);
  // };

  return (
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
              <td>{photo.album.title.slice(0, 25)}</td>

              <td className={cn({
                'has-text-link': photo.owner.sex === 'm',
                'has-text-danger': photo.owner.sex === 'f',
              })}
              >
                {photo.owner.name}
              </td>
              {// eslint-disable-next-line react/button-has-type
                <button>
                  ↑
                </button>
              }
              {// eslint-disable-next-line react/button-has-type
                <button>
                  ↓
                </button>
              }

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
  );
};
