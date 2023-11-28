import cn from 'classnames';

export const FilterTabs = (
  {
    onFilterSelect,
    filterField,
    usersFromServer,
  },
) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      onClick={() => onFilterSelect('all')}
      href="#/"
      className={
        cn({
          'is-active': filterField === 'all',
        })
      }
    >
      All
    </a>

    {usersFromServer.map(user => (
      <a
        onClick={() => onFilterSelect(`${user.name}`)}
        href="#/"
        key={user.id}
        className={
          cn({
            'is-active': filterField === user.name,
          })
        }
      >
        {user.name}
      </a>
    ))}

  </p>
);
