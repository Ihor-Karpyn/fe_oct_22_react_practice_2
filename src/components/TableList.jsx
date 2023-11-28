import { TableRow } from './TableRow';

export const TableList = ({ photos }) => (
  <tbody>
    {photos.map(photo => {
      const { album } = photo;
      const { user } = album;

      return (
        <TableRow
          photo={photo}
          album={album}
          user={user}
          key={photo.id}
        />
      );
    })}
  </tbody>
);
