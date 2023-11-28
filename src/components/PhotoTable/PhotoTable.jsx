import cn from 'classnames';

export const PhotoTable = (props) => {
  const {
    photos,
    moveUp,
    moveDown,
  } = props;

  return (
    <div className="box table-container">
      {photos.length
        ? (
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
              {photos.map(photo => (
                <tr key={photo.id}>
                  <td className="has-text-weight-bold">
                    {photo.id}
                  </td>

                  <td>{photo.title}</td>
                  <td>{photo.album.title}</td>

                  <td className={cn(
                    {
                      'has-text-danger': photo.user.sex === 'f',
                      'has-text-link': photo.user.sex === 'm',
                    },
                  )}
                  >
                    {photo.user.name}
                  </td>

                  <td>
                    <a
                      href="#/"
                      onClick={() => moveUp(photo)}
                      className="button"
                    >
                      &uarr;
                    </a>

                    <a
                      href="#/"
                      onClick={() => moveDown(photo)}
                      className="button"
                    >
                      &darr;
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
        : (
          <p data-cy="NoMatchingMessage">
            No photos matching selected criteria
          </p>
        )}
    </div>
  );
};
