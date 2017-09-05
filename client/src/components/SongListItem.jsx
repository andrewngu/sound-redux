import PropTypes from 'prop-types';
import React from 'react';
import ArtworkPlay from '../components/ArtworkPlay';
import Link from '../components/Link';
import Waveform from '../components/Waveform';
import { SONG_PATH, USER_PATH } from '../constants/RouterConstants';
import { IMAGE_SIZES } from '../constants/SongConstants';
import { addCommas } from '../utils/FormatUtils';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  navigateTo: PropTypes.func.isRequired,
  player: PropTypes.shape({}).isRequired,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  song: PropTypes.shape({}).isRequired,
};

const SongListItem = ({ index, isActive, navigateTo, player, playlist, playSong, song }) => {
  const { isPlaying } = player;
  const { artworkUrl, commentCount, id, playbackCount, title, user } = song;
  const { avatarUrl, username } = user;

  return (
    <div className={`song-list__item ${isActive ? 'song-list__item--active' : ''}`}>
      <div className="song-list__item__artwork">
        <div
          className="song-list__item__artwork__image"
          style={{
            backgroundImage: `url(${getImageUrl(artworkUrl, IMAGE_SIZES.LARGE)})`,
          }}
        >
          <ArtworkPlay
            index={index}
            isActive={isActive}
            isPlaying={isPlaying}
            playlist={playlist}
            playSong={playSong}
          />
        </div>
      </div>
      <div className="song-list__item__main">
        <Link
          className="song-list__item__title"
          navigateTo={navigateTo}
          keys={{ id }}
          path={SONG_PATH}
        >
          {title}
        </Link>
        <div className="song-list__item__meta">
          <div className="song-list__item__user">
            <div
              className="song-list__item__user__avatar"
              style={{ backgroundImage: `url(${getImageUrl(avatarUrl)})` }}
            />
            <Link
              className="song-list__item__user__username"
              navigateTo={navigateTo}
              keys={{ id: user.id }}
              path={USER_PATH}
            >
              {username}
            </Link>
          </div>
          <div className="song-list__item__stats">
            <div className="song-list__item__stat">
              <i className="song-list__item__stat__icon ion-play" />
              <span className="song-list__item__stat__text">
                {addCommas(playbackCount)}
              </span>
            </div>
            <div className="song-list__item__stat">
              <i className="song-list__item__stat__icon ion-chatbubble" />
              <span className="song-list__item__stat__text">
                {addCommas(commentCount)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Waveform
        className="song-list__item__waveform"
        index={index}
        isActive={isActive}
        player={player}
        playlist={playlist}
        playSong={playSong}
        song={song}
      />
    </div>
  );
};

SongListItem.propTypes = propTypes;

export default SongListItem;
