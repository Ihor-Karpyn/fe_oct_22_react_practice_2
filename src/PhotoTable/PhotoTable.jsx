import { TableBody } from '../TableBody';
import { TableHead } from '../TableHead';

export const PhotoTable = ({ photos, albums, users }) => {
  return (
    <table
      className="table is-striped is-narrow is-fullwidth"
    >
      <TableHead />

      <TableBody photos={photos} albums={albums} users={users} />
    </table>
  );
};
