import cn from 'classnames';

export const AlbumsFilter = (props) => {
  const { albums, filterByAlbums, setFilterByAlbums } = props;

  const selectAlbum = (album) => {
    if (filterByAlbums.includes(album)) {
      setFilterByAlbums(
        currentFilter => [
          ...currentFilter.slice(0, currentFilter.indexOf(album)),
          ...currentFilter.slice(
            currentFilter.indexOf(album) + 1, currentFilter.length,
          ),
        ],
      );

      return;
    }

    setFilterByAlbums(
      currentFilter => [...currentFilter, album],
    );
  };

  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        className={cn(
          'button is-success mr-6',
          { 'is-outlined': filterByAlbums.length },
        )}
        onClick={() => setFilterByAlbums([])}
      >
        All
      </a>

      {albums.map(album => (
        <a
          className={cn(
            'button mr-2 my-1',
            { 'is-info': filterByAlbums.includes(album.title) },
          )}
          href="#/"
          key={album.id}
          onClick={() => selectAlbum(album.title)}
        >
          {album.title.slice(0, 17)}
        </a>
      ))}
    </div>
  );
};
