import cn from 'classnames';

export const AlbumsList = ({
  albums,
  filterByAlbum,
  setFilterByAlbum,
  selectAlbum,
}) => (
  <div className="panel-block is-flex-wrap-wrap">
    <a
      href="#/"
      onClick={() => {
        setFilterByAlbum([]);
      }}
      className={cn(
        'button is-success mr-6',
        { 'is-outlined': filterByAlbum.length },
      )}
    >
      All
    </a>

    {albums.map(album => (
      <a
        key={album.id}
        className={cn(
          'button mr-2 my-1',
          { 'is-info': filterByAlbum.includes(album.title) },
        )}
        href="#/"
        onClick={() => {
          selectAlbum(album);
        }}
      >
        {album.title}
      </a>
    ))}
  </div>
);
