export const PhotosList = ({ photos }) => (
  photos.map(photo => (
    <tr>
      <td className="has-text-weight-bold">
        {photo.id}
      </td>

      <td>{photo.title}</td>
      <td>{photo.album.title}</td>

      <td className={
        photo.user.sex === 'm'
          ? 'has-text-link'
          : 'has-text-danger'
      }
      >
        {photo.user.name}
      </td>
    </tr>
  ))
);
