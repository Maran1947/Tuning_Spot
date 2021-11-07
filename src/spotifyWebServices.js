export function getAllTracks(spotify,id) {
    return spotify.getPlaylistTracks(id).then((playlist) => {
        return playlist;
    });
};

export function getFeaturedLists(spotify) {
    return spotify.getFeaturedPlaylists().then((playlists) => {
        return playlists;
    })
};