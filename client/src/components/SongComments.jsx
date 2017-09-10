import PropTypes from 'prop-types';
import React from 'react';
import SidebarBody from '../components/SidebarBody';
import SongComment from '../components/SongComment';
import Switch from '../components/Switch';
import { SONG_PATH } from '../constants/RouterConstants';

const propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  id: PropTypes.number.isRequired,
  navigateTo: PropTypes.func.isRequired,
  sidebarHeight: PropTypes.number.isRequired,
  sticky: PropTypes.bool.isRequired,
  timed: PropTypes.bool.isRequired,
};

const SongComments = ({ comments, id, navigateTo, sidebarHeight, sticky, timed }) => (
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
          args={[{
            path: SONG_PATH,
            keys: { id },
            options: timed ? {} : { timed: '1' },
          }]}
          on={timed}
          onClick={navigateTo}
        />
      </div>
    </div>
    <SidebarBody>
      {comments.map((comment, i) => (
        <SongComment
          comment={comment}
          key={comment.id}
          index={i}
        />
      ))}
    </SidebarBody>
  </div>
);

SongComments.propTypes = propTypes;

export default SongComments;
