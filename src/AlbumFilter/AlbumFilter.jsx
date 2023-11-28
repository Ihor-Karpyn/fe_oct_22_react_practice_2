// export const AlbumFilter = ({ albums}) => {
//   return (
//     <div className="panel-block is-flex-wrap-wrap">
//       <a
//         href="#/"
//         className={`button is-success mr-6 ${
//           selectedAlbums.length === 0 ? "" : "is-outlined"
//         }`}
//         onClick={() => toggleAlbum("")}
//       >
//         All
//       </a>
//
//       {albums.map((album) => (
//         <a
//           key={album.id}
//           className={`button mr-2 my-1 is-info ${
//             selectedAlbums.includes(album.id) ? "is-info" : ""
//           }`}
//           href="#/"
//           onClick={() => toggleAlbum(album.id)}
//         >
//           {album.title.length > 15
//             ? album.title.substring(0, 15) + "..."
//             : album.title}
//         </a>
//       ))}
//     </div>
//   );
// };
