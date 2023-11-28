import cn from 'classnames';

export const TableRow = ({ photo, album, user }) => (
  <tr>
    <td className="has-text-weight-bold">
      {photo.id}
    </td>
    <td>{photo.title}</td>
    <td>{album.title}</td>

    <td
      className={cn(
        { 'has-text-link': user.sex === 'm' },
        { 'has-text-danger': user.sex === 'f' },
      )}
    >
      {user.name}
    </td>
  </tr>
);
