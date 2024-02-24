
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Component/Header';
import Playlist from './Component/PlayList';

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audioPlayer, setAudioPlayer] = useState(new Audio());

  useEffect(() => {
    const savedPlaylist = JSON.parse(localStorage.getItem('playlist'));
    if (savedPlaylist && savedPlaylist.length > 0) {
      setPlaylist(savedPlaylist);
    }

   
    const lastPlayedTrackIndex = parseInt(localStorage.getItem('lastPlayedTrackIndex'));
    if (!isNaN(lastPlayedTrackIndex) && lastPlayedTrackIndex < playlist.length) {
      setCurrentTrackIndex(lastPlayedTrackIndex);
    }
  }, []);

  useEffect(() => {

    localStorage.setItem('playlist', JSON.stringify(playlist));


    localStorage.setItem('lastPlayedTrackIndex', currentTrackIndex.toString());
  }, [playlist, currentTrackIndex]);

  useEffect(() => {
    
    audioPlayer.addEventListener('ended', handleTrackEnded);

    return () => {
     
      audioPlayer.removeEventListener('ended', handleTrackEnded);
    };
  }, [audioPlayer]);

  const handleTrackEnded = () => {
   
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const newPlaylist = [...playlist];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      newPlaylist.push({ url, name: file.name });
    }

    setPlaylist(newPlaylist);
  };

  const handlePlayTrack = (index) => {
    setCurrentTrackIndex(index);
  };

  return (
    <div className="App">
      <Header />
      <input type="file" accept="audio/*" multiple onChange={handleFileUpload} />
      <div style={{ display: 'flex' }}>
        <Playlist playlist={playlist} handlePlayTrack={handlePlayTrack} />
        <div className="now-playing">
          <h2>Now Playing</h2>
          {playlist.length > 0 && (
            <>
              <audio controls autoPlay src={playlist[currentTrackIndex]?.url}></audio>
              <p>{playlist[currentTrackIndex]?.name}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
