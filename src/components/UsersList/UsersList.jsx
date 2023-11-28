import cn from 'classnames';

export const UsersList = ({
  users,
  setFilterByUser,
  filterByUser,
}) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      href="#/"
      onClick={() => {
        setFilterByUser('');
      }}
      className={cn({ 'is-active': !filterByUser })}
    >
      All
    </a>

    {users.map(user => (
      <a
        key={user.id}
        href="#/"
        onClick={() => {
          setFilterByUser(user.name);
        }}
        className={cn({ 'is-active': filterByUser === user.name })}
      >
        {user.name}
      </a>
    ))}
  </p>
);
