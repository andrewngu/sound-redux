/* global window */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import infiniteScroll from '../components/infiniteScroll';
import SongCard from '../components/SongCard';
import Spinner from '../components/Spinner';
import scrollState from '../utils/ScrollUtils';

const defaultProps = {
  playingSongId: null,
};

const propTypes = {
  authed: PropTypes.shape({}).isRequired,
  height: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

class SongCards extends Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);

    this.state = {
      end: props.songs.length,
      paddingBottom: 0,
      paddingTop: 0,
      start: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillReceiveProps(nextProps) {
    const { height, songs } = nextProps;
    const { end, paddingBottom, paddingTop, start } = scrollState(height, songs.length);

    if (paddingTop !== this.state.paddingTop
    || paddingBottom !== this.state.paddingBottom
    || start !== this.state.start
    || end !== this.state.end) {
      this.setState({
        end,
        paddingBottom,
        paddingTop,
        start,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    const { height, songs } = this.props;
    const { end, paddingBottom, paddingTop, start } = scrollState(height, songs.length);
    if (paddingTop !== this.state.paddingTop
    || paddingBottom !== this.state.paddingBottom
    || end !== this.state.end
    || start !== this.state.start) {
      this.setState({
        end,
        paddingBottom,
        paddingTop,
        start,
      });
    }
  }

  renderSongs(start, end) {
    const chunk = 5;
    const { authed, playingSongId, playlist, playSong, songs } = this.props;
    const result = [];

    for (let i = start; i < end; i += chunk) {
      const songCards = songs.slice(i, i + chunk).map((song, j) => {
        const index = i + j;

        return (
          <div className="col-1-5 clearfix" key={`${index}-${song.id}`}>
            <SongCard
              authed={authed}
              index={index}
              isActive={song.id === playingSongId}
              playlist={playlist}
              playSong={playSong}
              song={song}
            />
          </div>
        );
      });

      if (songCards.length < chunk) {
        for (let j = 0; j < chunk - (songCards.length + 1); j += 1) {
          songCards.push(<div className="col-1-5" key={`song-placeholder-${(i + j)}`} />);
        }
      }

      result.push(
        <div className="songs-row grid" key={`songs-row-${i}`}>
          {songCards}
        </div>,
      );
    }

    return result;
  }

  render() {
    const { isFetching } = this.props;
    const { end, paddingBottom, paddingTop, start } = this.state;

    return (
      <div className="content">
        <div className="padder" style={{ height: paddingTop }} />
        {this.renderSongs(start, end)}
        <div className="padder" style={{ height: paddingBottom }} />
        {isFetching ? <Spinner /> : null}
      </div>
    );
  }
}

SongCards.defaultProps = defaultProps;
SongCards.propTypes = propTypes;

export default infiniteScroll(SongCards);
