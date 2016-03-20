export function getPlayingSongId(player, playlists) {
  if (player.currentSongIndex !== null) {
    const playingPlaylistKey = player.selectedPlaylists[player.selectedPlaylists.length - 1];
    const playlist = playlists[playingPlaylistKey];
    return playlist.items[player.currentSongIndex];
  }

  return null;
}

export function getPlayingPlaylist(player) {
  if (player.selectedPlaylists.length === 0) {
    return null;
  }

  return player.selectedPlaylists[player.selectedPlaylists.length - 1];
}
