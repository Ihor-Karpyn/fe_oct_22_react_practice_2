import cn from 'classnames';

export const AlbumsList = ({
  albums, albumFilter, onFilter, onAlbumsReset,
}) => (
  <div className="panel-block is-flex-wrap-wrap">
    <a
      href="#/"
      className={cn('button mr-6',
        { 'is-success': albumFilter.length === 0 })}
      onClick={() => onAlbumsReset()}
    >
      All
    </a>
    {
      albums.map(({ title, id }) => (
        <a
          className={cn('button mr-2 my-1',
            { 'is-info': albumFilter.includes(id) })}
          href="#/"
          key={id}
          onClick={() => onFilter(id)}
        >
          {title}
        </a>
      ))
    }
  </div>
);
