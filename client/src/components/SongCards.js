import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { playSong } from '../actions/PlayerActions';
import infiniteScroll from '../components/infiniteScroll';
import SongCard from '../components/SongCard';
import Spinner from '../components/Spinner';

const propTypes = {
  authed: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  height: PropTypes.number,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playlists: PropTypes.object.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  users: PropTypes.object.isRequired,
};

class SongCards extends Component {
  constructor(props) {
    super(props);
    this.getScrollState = this.getScrollState.bind(this);
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
    const { end, paddingBottom, paddingTop, start } = this.getScrollState(nextProps);
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
    const { end, paddingBottom, paddingTop, start } = this.getScrollState(this.props);
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

  getScrollState(props) {
    const { height, songs } = props;
    const count = songs.length;

    const MARGIN_TOP = 20;
    const ROW_HEIGHT = 132;
    const ITEMS_PER_ROW = 5;
    const scrollY = window.scrollY;

    let paddingTop = 0;
    let paddingBottom = 0;
    let start = 0;
    let end = count;

    if ((scrollY - ((ROW_HEIGHT * 3) + (MARGIN_TOP * 2))) > 0) {
      const rowsToPad = Math.floor(
        (scrollY - ((ROW_HEIGHT * 2) + (MARGIN_TOP))) / (ROW_HEIGHT + MARGIN_TOP)
      );
      paddingTop = rowsToPad * (ROW_HEIGHT + MARGIN_TOP);
      start = rowsToPad * ITEMS_PER_ROW;
    }

    const rowsOnScreen = Math.ceil(height / (ROW_HEIGHT + MARGIN_TOP));
    const itemsToShow = (rowsOnScreen + 5) * ITEMS_PER_ROW;
    if (count > (start + itemsToShow)) {
      end = start + itemsToShow;
      const rowsToPad = Math.ceil((count - end) / ITEMS_PER_ROW);
      paddingBottom = rowsToPad * (ROW_HEIGHT + MARGIN_TOP);
    }

    return {
      end,
      paddingBottom,
      paddingTop,
      start,
    };
  }


  playSong(i, e) {
    e.preventDefault();
    const { playlist, dispatch } = this.props;
    dispatch(playSong(playlist, i));
  }

  renderSongs(start, end) {
    const chunk = 5;
    const { authed, dispatch, playingSongId, songs, users } = this.props;
    const result = [];

    for (let i = start; i < end; i += chunk) {
      const songCards = songs.slice(i, i + chunk).map((song, j) => {
        const user = users[song.user_id];
        const index = i + j;
        const playSongFunc = this.playSong.bind(this, index);

        return (
          <div className="col-1-5 clearfix" key={`${index}-${song.id}`}>
            <SongCard
              authed={authed}
              dispatch={dispatch}
              isActive={song.id === playingSongId}
              playSong={playSongFunc}
              song={song}
              user={user}
            />
          </div>
        );
      });

      if (songCards.length < chunk) {
        for (let j = 0; j < chunk - songCards.length + 1; j++) {
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
    const { playlist, playlists } = this.props;
    const { end, paddingBottom, paddingTop, start } = this.state;
    const isFetching = playlist in playlists ? playlists[playlist].isFetching : false;

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

SongCards.propTypes = propTypes;

export default infiniteScroll(SongCards);
