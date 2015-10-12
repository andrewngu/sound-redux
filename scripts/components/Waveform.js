import React, {Component, PropTypes} from 'react';
import {changeCurrentTime} from '../actions/player';

class Waveform extends Component {
    constructor(props) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = {
            isCanvas: false,
            seekPercent: 0
        };
    }

    componentDidMount() {
        const canvas = React.findDOMNode(this.refs.canvas);
        const context = canvas.getContext('2d');
        let img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height / 2;
            context.drawImage(img, 0, 0);
            const data = context.getImageData(0, 0, canvas.width, canvas.height).data;

            let result = [];
            let done = {};
            for (let i = 0; i < data.length; i += 4) {
                const x = (i / 4) % canvas.width;
                if (x in done) {
                    continue;
                }

                if (data[i + 3] === 255) {
                    if (!(x < result.length)) {
                        result.push(1);
                    } else {
                        result[x]++;
                    }
                } else {
                    done[x] = 1;
                }
            }
        };
        img.crossOrigin = '';
        img.src = this.props.waveformUrl;
    }

    handleMouseDown(e) {
        const {isActive, dispatch, duration} = this.props;
        if (!isActive) {
            return;
        }

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
        const {isActive, duration} = this.props;
        if (!isActive) {
            return;
        }
        const seekPercent = (e.clientX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth;
        this.setState({seekPercent: seekPercent});
    }

    handleMouseLeave(e) {
        this.setState({seekPercent: 0});
    }

    renderWaveform() {
        const {currentTime, duration, isActive} = this.props;
        const seekPercent = this.state.seekPercent * 100;
        const width = isActive ? currentTime / (duration / 1000) * 100 : 0;
        return (
            <div
                className='waveform-image-container'
                onMouseDown={this.handleMouseDown}
                onMouseLeave={this.handleMouseLeave}
                onMouseMove={this.handleMouseMove}>
                <img className='waveform-image' src={this.props.waveformUrl} />
                <div className='waveform-image-bg' style={{width : `${width}%`}} />
                {seekPercent ? <div className='waveform-seek-line' style={{width: `${seekPercent}%`}} /> : null }
                {seekPercent ? <div className='waveform-seek-bar' style={{width: `${seekPercent}%`}} /> : null }
            </div>
        );
    }

    render() {
        return (
            <div className='waveform'>
                <canvas className='waveform-canvas' ref='canvas'></canvas>
                {this.renderWaveform()}
            </div>
        );
    }
}

export default Waveform;
