import cn from 'classnames';

export const UsersTabs = (props) => {
  const { users, setFilterByUser, filterByUser } = props;

  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        href="#/"
        onClick={() => setFilterByUser('')}
        className={cn({ 'is-active': !filterByUser })}
      >
        All
      </a>

      {users.map(user => (
        <a
          href="#/"
          key={user.id}
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
};
