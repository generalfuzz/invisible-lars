import * as constants from "../LarsConstants"

var LarsLocation = {x : 0, y: 0};

var margin = 30;
var larsImgIndex = 0;

const DISTANCE_MAP = [
    {distance: 250, level: 3},
    {distance: 130, level: 2},
    {distance: 70, level: 1},
    {distance: 10, level: 0}
];

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const hideLars = (dimensions) => {
    LarsLocation = {
        x : getRandomInt(margin, dimensions.width - margin),
        y : getRandomInt(margin, dimensions.height - margin)
    };
    console.log(JSON.stringify(LarsLocation, null, 2));
};

const pickLarsImgIndex = () => {
    // bump the lars img index
    var index = larsImgIndex;
    index++;
    if (index >= constants.larsImg.length) {
        index = 0;
    }
    larsImgIndex = index;
    return index;
};

const getLarsHotnessLevel = (position) => {
    var x_diff = Math.abs(position.x - LarsLocation.x);
    var y_diff = Math.abs(position.y - LarsLocation.y);
    var distance = Math.max(x_diff, y_diff);
    var curr = DISTANCE_MAP[0];
    var diff = Math.abs(distance - curr.distance);
    for (var val = 0; val < DISTANCE_MAP.length; val++) {
        var newdiff = Math.abs(distance - DISTANCE_MAP[val].distance);
        if (newdiff < diff) {
            diff = newdiff;
            curr = DISTANCE_MAP[val];
        }
    }
    return curr.level
};

const larsImgMovingApp = (state, action) => {
    switch (action.type) {
        case constants.CHECK_NEW_SPOT:
            // check how close to lars that position is
            var level = getLarsHotnessLevel(action.position);
            return Object.assign({}, state,
                {
                    level: level
                }
            );
        case constants.SET_WINDOW_SIZE:
            // hide lars
            hideLars(action.dimensions);
            // reset closeness level
            return Object.assign({}, state,
                {
                    level: constants.LARS_JUST_HIDDEN,
                    score: state.score
                }
            );
        case constants.RESET_LARS:
            // re-hide lars
            hideLars(action.dimensions);
            // reset closeness level, update score
            return Object.assign({}, state,
                {
                    level: constants.LARS_JUST_HIDDEN,
                    score: action.score,
                    img: pickLarsImgIndex(),
                    diplayInstructions: false
                }
            );
        default:
            return state;
    }
};

export default larsImgMovingApp;
