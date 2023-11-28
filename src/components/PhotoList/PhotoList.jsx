import cn from 'classnames';

const SEX_FEMALE = 'f';
const SEX_MALE = 'm';

export const PhotoList = ({ photos }) => (
  <tbody>
    {photos.map(photo => (
      <tr key={photo.id}>
        <td className="has-text-weight-bold">
          {photo.id}
        </td>

        <td>{photo.title}</td>
        <td>{photo.album.title}</td>

        <td className={cn({
          'has-text-link': photo.user.sex === SEX_MALE,
          'has-text-danger': photo.user.sex === SEX_FEMALE,
        })}
        >
          {photo.user.name}
        </td>
      </tr>
    ))}
  </tbody>
);
