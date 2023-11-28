import React from 'react';
import cn from 'classnames';

function isMale(user) {
  return user.sex === 'm';
}

export const Photo = ({ photo }) => (
  <tr>
    <td className="has-text-weight-bold">
      {photo.id}
    </td>

    <td>{photo.title}</td>
    <td>{photo.album.title}</td>

    <td
      className={cn({
        'has-text-link': isMale(photo.user),
        'has-text-danger': !isMale(photo.user),
      })}
    >
      {photo.user.name}
    </td>
  </tr>
);
