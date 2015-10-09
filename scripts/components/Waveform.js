import React, {Component, PropTypes} from 'react';

class Waveform extends Component {
    componentDidMount() {
        const canvas = React.findDOMNode(this.refs.canvas);
        const context = canvas.getContext('2d');
        let img = new Image();
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height / 2;
            context.drawImage(img, 0, 0);
            const data = context.getImageData(0, 0, canvas.width, canvas.height).data;
            console.log(data);
        };
        img.crossOrigin = '';
        img.src = this.props.waveformUrl;
    }

    render() {
        return (
            <div className='waveform'>
                <canvas className='waveform-canvas' ref='canvas'></canvas>
            </div>
        );
    }
}

export default Waveform;
