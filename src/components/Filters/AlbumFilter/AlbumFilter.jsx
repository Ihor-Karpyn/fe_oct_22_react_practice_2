import cn from 'classnames';

import albumsFromServer from '../../../api/albums';

export const AlbumFilter = ({
  selectedAlbums,
  setSelectedAlbums,
  handleSelectingAlbumFilter,
}) => (
  <div className="panel-block is-flex-wrap-wrap">
    <a
      href="#/"
      className={cn(
        'button is-success mr-6',
        { 'is-outlined': selectedAlbums.length !== 0 },
      )}
      onClick={() => setSelectedAlbums([])}
    >
      All
    </a>

    {albumsFromServer.map(album => (
      <a
        key={album.id}
        className={cn('button mr-2 my-1', {
          'is-info': selectedAlbums.includes(album.title),
        })}
        href="#/"
        onClick={() => handleSelectingAlbumFilter(album.title)}
      >
        {album.title.length > 16
          ? `${album.title.slice(0, 16)}...`
          : album.title}
      </a>
    ))}
  </div>
);
