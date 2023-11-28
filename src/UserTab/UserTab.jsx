import cn from 'classnames';

export const UserTab = ({ users, selectedUserId, onFilter }) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      href="#/"
      className={cn({ 'is-active': !selectedUserId })}
      onClick={() => onFilter(null)}
    >
      All
    </a>

    {users.map((user) => (
      <a
        href="#/"
        className={cn({ 'is-active': selectedUserId === user.id })}
        onClick={() => onFilter(user.id)}
        key={user.id}
      >
        {user.name}
      </a>
    ))}
  </p>
);
