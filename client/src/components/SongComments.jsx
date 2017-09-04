import PropTypes from 'prop-types';
import React from 'react';
import Switch from '../components/Switch';
import { SONG_PATH } from '../constants/RouterConstants';

const propTypes = {
  id: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired,
  sidebarHeight: PropTypes.number.isRequired,
  sticky: PropTypes.bool.isRequired,
  timed: PropTypes.bool.isRequired,
};

const SongComments = ({ id, navigateTo, sidebarHeight, sticky, timed }) => (
  <div
    className={`sidebar ${sticky ? 'sidebar--sticky' : ''}`}
    style={{ height: `${sidebarHeight}px` }}
  >
    <div className="sidebar__header">
      <div className="sidebar__header__left">
        Comments
      </div>
      <div className="sidebar__header__right">
        <Switch
          on={timed}
          onClick={() => {
            navigateTo({
              path: SONG_PATH,
              keys: { id },
              options: {
                ...timed ? {} : { timed: '1' },
              },
            });
          }}
        />
      </div>
    </div>
  </div>
);

SongComments.propTypes = propTypes;

export default SongComments;
