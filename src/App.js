import { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import PlayListsBox from './components/playlistBox/PlayListsBox';
import { getFeaturedLists } from './spotifyWebServices';

const spotify = new SpotifyWebApi();

function App() {

  const [token,setToken] = useState(null);
  const [playlists,setPlaylists] = useState([]);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if(_token) {
      setToken(_token);
      spotify.setAccessToken(_token);

      getFeaturedLists(spotify)
      .then(playlists => setPlaylists(playlists.playlists.items))
      .catch(err => console.log(err));
    }
  }, []);

  return (
    <div className="App">
        {token ? <PlayListsBox playlists={playlists} /> : <Login />}
    </div>
  );
}

export default App;
