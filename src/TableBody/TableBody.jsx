import cn from 'classnames';

export const TableBody = ({ photos, albums, users }) => (
  <tbody>
    {photos.map((picture) => {
      const album = albums.find((alb) => alb.id === picture.albumId);
      const user = users.find(usr => usr.id === album.userId);

      return (
        <tr key={picture.id}>
          <td className="has-text-weight-bold">{picture.id}</td>

          <td>{picture.title}</td>

          <td>{album.title}</td>

          <td
            className={cn({
              'has-text-link': user.sex === 'm',
              'has-text-danger': user.sex === 'f',
            })}
          >
            {user.name}
          </td>
        </tr>
      );
    })}
  </tbody>
);
