// Playlist.js
import React from 'react';
import classes from './PlayList.module.css'
const Playlist = ({ playlist, handlePlayTrack }) => {
  return (
    <div className={classes.playlist}>
      <h2>Playlist</h2>
      <ul>
        {playlist.map((track, index) => (
          <li key={index} onClick={() => handlePlayTrack(index)}>
            {track.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
