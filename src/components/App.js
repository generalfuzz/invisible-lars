import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as constants from "../LarsConstants"

import '../css/App.css';
import '../css/animation.css';
import '../css/index.css';

import LarsReward from './LarsReward';
import Instructions from './Instructions';

var foundLars = false;
var isMouseDown = false;

// import sounds
var sounds = constants.sounds;
var currentlyPlaying = null;

const checkPlaySound = (sound_index) => {
    if (!foundLars) {
        if (sound_index >= 0 && isMouseDown) {

            if (sounds[sound_index] === currentlyPlaying && !sounds[sound_index].ref.paused) {
                return;
            }

            // check what is playing
            if (currentlyPlaying) {
                // reduce jitter (unless its max lars!)
                if (currentlyPlaying.ref.currentTime > 0.3 || sound_index == 0) {
                    currentlyPlaying.ref.pause();
                    currentlyPlaying.ref.currentTime = 0;
                } else {
                    // don't play a different sound yet
                    return;
                }
            }
            currentlyPlaying = sounds[sound_index];
            console.log("i: " + sound_index + " currentlyp: " + currentlyPlaying);
            // currentlyPlaying.ref.load();
            currentlyPlaying.ref.play();

        }
        if (sound_index === 0) {
            // found lars!
            foundLars = true;
        }
    }
};


class App extends Component {
    constructor(props) {
        super(props);
    };

    onMouseDown = (e) => {
        isMouseDown = true;
        if (!foundLars) {
            this.props.onMouseMove(e);
        }
    };

    onMouseUp = () => {
        isMouseDown = false;
        if (!foundLars) {
            this.forceUpdate();
        }
    };

    render() {
        return <div className="page" onTouchStart={this.onMouseDown} onTouchEnd={this.onMouseUp} onTouchMove={this.props.onTouchMove} onMouseDown={ this.onMouseDown } onMouseUp={ this.onMouseUp } onMouseMove={this.props.onMouseMove}  >
            <Instructions/>
            {sounds.map((sound, i) =>
                <audio ref={(ref) => sound.ref = ref} id={sound.id} key={sound.id}>
                    <source src={sound.src}/>
                </audio>
            )}

            <div className="demo">
                <LarsReward/>
            </div>
            <div className="footer" id="lars-footer">
                    Lar's Found: {this.props.score}
            </div>
        </div>
    }

    
    componentWillMount = () => {
        this.updateDimensions();
    };

    componentDidMount = () => {
        window.addEventListener("resize", this.updateDimensions);
        sounds.map((sound, i) => {
            sound.ref.addEventListener("ended",function() {
                checkPlaySound(i);
            });
        });
    };

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    };

    updateDimensions = () => {
        this.props.onWindowSize (
            {width: window.innerWidth, height: window.innerHeight}
        );
    };
}


const mapStateToProps = (store) => {
    // check if lars was just hidden
    if (store.level === constants.LARS_JUST_HIDDEN) {
        foundLars = false;
    }
    checkPlaySound(store.level);
    return {
        score: store.score,
        level: store.level
    };
};

const newMouseSearchingPosition = (event) => {
    return {
        type : constants.CHECK_NEW_SPOT,
        position: {
            x: event.screenX,
            y: event.screenY
        }
    }
};

const newTouchSearchingPosition = (event) => {
    return {
        type : constants.CHECK_NEW_SPOT,
        position: {
            x: Math.round(event.touches[0].clientX),
            y: Math.round(event.touches[0].clientY)
        }
    }
};

const mapDispatcherToProps = (dispatch) => {
    return {
        onMouseMove: (e) => {
            if (isMouseDown && !foundLars) {
                dispatch(newMouseSearchingPosition(e))
            }
        },
        onTouchMove: (e) => {
            if (isMouseDown && !foundLars) {
                dispatch(newTouchSearchingPosition(e))

            }
        },
        onWindowSize: (dimensions) => {
            dispatch(
                {
                    type: constants.SET_WINDOW_SIZE,
                    dimensions: dimensions
                }
            )
        }
    }
};

export default connect(mapStateToProps, mapDispatcherToProps)(App)


