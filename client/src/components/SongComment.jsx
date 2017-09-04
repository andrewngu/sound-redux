import PropTypes from 'prop-types';
import React from 'react';
import { IMAGE_SIZES } from '../constants/SongConstants';
import { formatSeconds } from '../utils/FormatUtils';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  comment: PropTypes.shape({}).isRequired,
  i: PropTypes.number.isRequired,
};

const SongComment = ({ comment, i }) => {
  const { body, unixTimestamp, user } = comment;
  const { avatarUrl, username } = user;

  return (
    <div className="song-comment" style={{ animationDelay: `${(i * 50)}ms` }}>
      <div
        className="song-comment__image"
        style={{ backgroundImage: `url(${getImageUrl(avatarUrl, IMAGE_SIZES.LARGE)})` }}
      />
      <div className="song-comment__main">
        <div className="song-comment__body">
          {body}
        </div>
        <div className="song-comment__username">
          {username}
        </div>
      </div>
      <div className="song-comment__time">
        {formatSeconds(unixTimestamp)}
      </div>
    </div>
  );
};

SongComment.propTypes = propTypes;

export default SongComment;
