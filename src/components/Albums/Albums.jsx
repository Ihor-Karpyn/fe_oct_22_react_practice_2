import cn from 'classnames';

export const Albums = (
  {
    albumsFromServer,
    onFilterSelectAlbum,
    filteredAlbum,
  },
) => {
  const handleSelectAlbum = (title) => {
    onFilterSelectAlbum(title);
  };

  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        onClick={() => handleSelectAlbum('allAlbum')}
        href="#/"
        className={
          cn('button', 'is-success', 'mr-6', {
            'is-active': filteredAlbum === 'allAlbum',
            'is-outlined': filteredAlbum !== 'allAlbum',
          })
        }
      >
        All
      </a>

      {albumsFromServer.map(album => (
        <a
          onClick={() => handleSelectAlbum(`${album.title}`)}
          key={album.id}
          className={
            cn('button', 'mr-2', 'my-1', {
              'is-info': filteredAlbum === `${album.title}`,
            })
          }
          href="#/"
        >
          {album.title}
        </a>
      ))}

    </div>
  );
};
