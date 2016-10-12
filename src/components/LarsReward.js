import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as constants from "../LarsConstants"
import TweenMax from 'gsap';

var tweenSpeed = 2;

class LarsReward extends Component {

    constructor(props) {
        super(props);
        this.isAnimating = false;
    }

    animateImg = () => {
        var node = this.refs.img;
        if (typeof node !== 'undefined') {
            this.isAnimating = true;
            TweenMax.fromTo(node, tweenSpeed, {xPercent:-50, yPercent:-50, scale: .1},
                {
                    x: 0,
                    y: 0,
                    scale: 1,
                    onComplete: () => {
                        this.isAnimating = false;
                        this.props.finishedAnimation(this.props);
                    }
                }
            );
        }
    }

    isDisplay = () => {
        if (this.props.level !== 0) {
            return "no-display";
        } else {
            if (!this.isAnimating) {
                this.animateImg();
                return "LarsReward display";
            }
        }
    }

    render() {
        return <div>
            <img ref="img" className={this.isDisplay()} src={constants.larsImg[this.props.imgIndex].ref} alt="lars"/>
        </div>;
    }
}


const resetLars = (score) => {
    return {
        type : constants.RESET_LARS,
        score: score + 1,
        dimensions: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
}


const mapStateToProps = (store) => {
    return {
        level: store.level,
        score: store.score,
        imgIndex: store.img
    };
}

const mapDispatcherToProps = (dispatch) => {
    return {
        finishedAnimation: (props) => {
            dispatch(resetLars(props.score))
        }
    }
    
}

export default connect(mapStateToProps, mapDispatcherToProps)(LarsReward)