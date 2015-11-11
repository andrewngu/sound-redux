import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {changeCurrentTime} from '../actions/player';
import {fetchWaveformData} from '../utils/SongUtils';

class WaveformBars extends Component {
    constructor() {
        super();
        this.fetchWaveformData = this.fetchWaveformData.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = {
            height: 0,
            seekPercent: 0,
            waveformData: null,
            width: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.waveformUrl === this.props.waveformUrl) {
            this.setState({
                waveformData: null
            }, this.fetchWaveformData.bind(this, nextProps.waveformUrl));
        } else {
            this.drawBars();
        }
    }

    componentDidMount() {
        const {waveformUrl} = this.props;
        const container = ReactDOM.findDOMNode(this.refs.container);
        this.fetchWaveformData(waveformUrl);
        this.setState({
            height: container.offsetHeight,
            width: container.offsetWidth
        });

    }

    drawBars() {
        const {duration, player, song} = this.props;
        const {currentTime} = player;
        const {height, seekPercent, waveformData, width} = this.state;
        if (waveformData === null) {
            return;
        }

        const c = ReactDOM.findDOMNode(this.refs.canvas);
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);

        const BAR_WIDTH = 2;
        const BAR_GAP = 1;
        const STEP = (BAR_GAP + BAR_WIDTH);
        const NUM_OF_BARS = Math.floor((width + BAR_GAP) / STEP);
        const WAVEFORM_STEP = waveformData.length / NUM_OF_BARS;
        const MAX = Math.max.apply(null, waveformData);

        const activeBar = Math.floor((currentTime / (duration / 1000)) * NUM_OF_BARS);
        for (let i = 0; i < NUM_OF_BARS; i++) {
            let barColor = i <= activeBar ? '#83a182' : '#535354';
            if ((i / NUM_OF_BARS) <= seekPercent) {
                barColor = '#a6d2a5';
            }

            const waveformIndex = Math.floor(i * WAVEFORM_STEP);
            const barHeight = (waveformData[waveformIndex] / MAX) * height;
            ctx.fillStyle = barColor;
            ctx.fillRect(i * STEP, height - barHeight, BAR_WIDTH, barHeight);
        }
    }

    fetchWaveformData(waveformUrl) {
        fetchWaveformData(waveformUrl)
            .then(data => {
                this.setState({
                    waveformData: data
                }, this.drawBars);
            });
    }

    handleMouseDown(e) {
        e.preventDefault();
        const {dispatch, duration} = this.props;

        const {seekPercent} = this.state;
        const audioElement = document.getElementById('audio');
        if (!audioElement) {
            return;
        }

        const currentTime = Math.floor(seekPercent * (duration / 1000));
        audioElement.currentTime = currentTime;
        dispatch(changeCurrentTime(currentTime));
    }

    handleMouseMove(e) {
        const seekPercent = (e.clientX - e.currentTarget.offsetParent.offsetLeft) / e.currentTarget.offsetWidth;
        this.setState({seekPercent: seekPercent}, this.drawBars);
    }

    handleMouseLeave(e) {
        this.setState({seekPercent: 0}, this.drawBars);
    }

    render() {
        const {height, width} = this.state;

        return (
            <div
                className='waveform-bars'
                onMouseDown={this.handleMouseDown}
                onMouseLeave={this.handleMouseLeave}
                onMouseMove={this.handleMouseMove}
                ref='container'>
                <canvas ref='canvas' width={width} height={height}></canvas>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {player} = state;

    return {
        player
    };
}

export default connect(mapStateToProps)(WaveformBars);
