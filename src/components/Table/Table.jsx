import { TableBody } from './Body/TableBody';
import { TableHead } from './Head/TableHead';

export const Table = ({ preparedPhotos }) => (
  <div className="box table-container">
    {
      preparedPhotos.length > 0
        ? (
          <table
            className="table is-striped is-narrow is-fullwidth"
          >

            <TableHead />

            <TableBody preparedPhotos={preparedPhotos} />
          </table>
        )
        : (
          <p data-cy="NoMatchingMessage">
            No photos matching selected criteria
          </p>
        )
    }
  </div>
);
