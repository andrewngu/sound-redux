import React, {Component, PropTypes} from 'react';

class Waveform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCanvas: false
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

    renderWaveform() {
        const {currentTime, duration, isActive} = this.props;
        const width = isActive ? currentTime / (duration / 1000) * 100 : 0;
        return (
            <div className='waveform-image-container'>
                <img className='waveform-image' src={this.props.waveformUrl} />
                <div className='waveform-image-bg' style={{width : `${width}%`}} />
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
