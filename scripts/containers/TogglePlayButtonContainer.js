import { connect } from 'react-redux';
import TogglePlayButton from '../components/TogglePlayButton';
import { toggleIsPlaying } from '../actions/PlayerActions';

function mapStateToProps(state) {
  const { player } = state;
  const { isPlaying } = player;

  return {
    isPlaying,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePlay: (isPlaying) => dispatch(toggleIsPlaying(isPlaying)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TogglePlayButton);
