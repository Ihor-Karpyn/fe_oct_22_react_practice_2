export const TableBody = ({ preparedPhotos }) => (
  <tbody>
    {preparedPhotos.map(preparedPhoto => (
      <tr key={preparedPhoto.id}>
        <td className="has-text-weight-bold">
          {preparedPhoto.id}
        </td>

        <td>{preparedPhoto.title}</td>
        <td>{preparedPhoto.album.title}</td>

        <td
          className={
            preparedPhoto.user.sex === 'm'
              ? 'has-text-link'
              : 'has-text-danger'
          }
        >
          {preparedPhoto.user.name}
        </td>
      </tr>
    ))}
  </tbody>
);
