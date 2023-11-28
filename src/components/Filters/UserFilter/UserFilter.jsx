import cn from 'classnames';

import usersFromServer from '../../../api/users';

export const UserFilter = ({ selectedUser, handleChangingUserFilter }) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      href="#/"
      className={cn({
        'is-active': selectedUser === 0,
      })}
      onClick={() => handleChangingUserFilter(0)}
    >
      All
    </a>

    {usersFromServer.map(user => (
      <a
        key={user.id}
        href="#/"
        className={cn({
          'is-active': selectedUser === user.id,
        })}
        onClick={() => handleChangingUserFilter(user.id)}
      >
        {user.name}
      </a>
    ))}
  </p>
);
