import React, {Component} from 'react';
import { connect } from 'react-redux';
import TweenMax from 'gsap';

var tweenSpeed = 2;

class Instructions extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.fadeIn_Instructions();
    };

    fadeIn_Instructions = () => {
        var node = this.refs.instructions;
        if (typeof node !== 'undefined') {
            TweenMax.fromTo(node, tweenSpeed, {opacity: 0},
                { opacity: 1,
                    onComplete: () => {
                        this.sleep(7500).then(() => {
                            this.fadeOut_Instructions();
                        });

                    }
                }
            );
        }
    };

    fadeOut_Instructions = () => {
        var node = this.refs.instructions;
        if (typeof node !== 'undefined') {
            TweenMax.fromTo(node, tweenSpeed, {opacity: 1}, {opacity: 0});
        }
    };

    // sleep time expects milliseconds
    sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
    };


    isDisplay = () => {
        if (this.props.displayInstructions) {
            return "instructions";
        } else {
            return "no-display";
        }
    };

    render() {
        return <div ref="instructions" className={this.isDisplay(this.props.displayInstructions)} >Find the invisible Lars!<br/><span className="details">Use your finger or mouse to search around slowly . . .<br/>
            He's here somewhere . . .</span><br/>
            <br/><span className="important">Make sure your audio is on.</span></div>

    }
}

const mapStateToProps = (store) => {
    return {
        displayInstructions: store.displayInstructions
    };
};

export default connect(mapStateToProps)(Instructions)
