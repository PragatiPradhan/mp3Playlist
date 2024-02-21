import React, { useState, useEffect } from 'react';
import './App.css'; 

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    // Load playlist from localStorage at first
    const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) || [];
    setPlaylist(storedPlaylist);

    // Load the last playing track
    const storedCurrentTrackIndex = parseInt(localStorage.getItem('currentTrackIndex')) || 0;
    setCurrentTrackIndex(storedCurrentTrackIndex);
  }, []);

  useEffect(() => {
    // Save playlist to localStorage whenever it changes
    localStorage.setItem('playlist', JSON.stringify(playlist));
    localStorage.setItem('currentTrackIndex', currentTrackIndex);
  }, [playlist, currentTrackIndex]);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const updatedPlaylist = [...playlist];

    for (let i = 0; i < files.length; i++) {
      updatedPlaylist.push(files[i]);
    }

    setPlaylist(updatedPlaylist);
  };

  const handlePlay = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleEnded = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  return (
    <div className="app-container">
      <input type="file" accept="audio/mp3" multiple onChange={handleFileUpload} className="file-input" />
      <div className="playlist">
        {playlist.map((track, index) => (
          <div key={index} className="playlist-item">
            <span>{track.name}</span>
            <button onClick={() => handlePlay(index)} className="play-button">Play</button>
          </div>
        ))}
      </div>
      {playlist.length > 0 && (
        <audio
          controls
          src={URL.createObjectURL(playlist[currentTrackIndex])}
          autoPlay
          onEnded={handleEnded}
          className="audio-player"
        />
      )}
    </div>
  );
};

export default App;
