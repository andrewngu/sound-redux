export function getPlayingSongId(player, playlists) {
  if (player.playingIndex !== null) {
    const playingPlaylistKey = player.playlistHistory[player.playlistHistory.length - 1];
    const playlist = playlists[playingPlaylistKey];
    return playlist.items[player.playingIndex];
  }

  return null;
}

export function getPlayingPlaylist(player) {
  if (player.playlistHistory.length === 0) {
    return null;
  }

  return player.playlistHistory[player.playlistHistory.length - 1];
}
