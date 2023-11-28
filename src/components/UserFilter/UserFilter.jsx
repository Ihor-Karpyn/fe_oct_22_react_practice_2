import cn from 'classnames';

export const UserFilter = ({
  selectedOwner,
  handleChangingOwnerFilter,
  usersFromServer,
}) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      href="#/"
      className={cn({
        'is-active': selectedOwner === 0,
      })}
      onClick={() => handleChangingOwnerFilter(0)}
    >
      All
    </a>
    {
      usersFromServer.map(user => (
        <a
          href="#/"
          key={user.id}
          className={cn({
            'is-active': user.id === selectedOwner,
          })}
          onClick={() => handleChangingOwnerFilter(user.id)}
        >
          {user.name}
        </a>
      ))
    }
  </p>
);
