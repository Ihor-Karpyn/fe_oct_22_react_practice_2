import cn from 'classnames';

export const UserTabs = ({ users, onFilter, filterValue }) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      href="#/"
      className={cn({ 'is-active': filterValue === '' })}
      onClick={() => onFilter('')}
    >
      All
    </a>

    {users.map(({ name, id }) => (
      <a
        href="#/"
        key={id}
        onClick={() => onFilter(id)}
        className={cn({ 'is-active': id === filterValue })}
      >
        {name}
      </a>
    ))}
  </p>
);
