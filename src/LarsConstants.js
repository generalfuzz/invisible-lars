export const SWITCH_IMG_STATES = 'SWITCH_IMG_STATES';
export const CHECK_NEW_SPOT = 'CHECK_NEW_SPOT';
export const SET_WINDOW_SIZE = 'SET_WINDOW_SIZE';
export const RESET_LARS = "RESET_LARS";

export const LARS_JUST_HIDDEN = -1;

export var sounds = [
    {filename:"Maxlars.mp3"},
    {filename:"Lars3.mp3"},
    {filename:"Lars2.mp3"},
    {filename:"Lars1.mp3"}
];

export var larsImg = [
    {filename: "20160724_144858.jpg"},
    {filename: "IMG_1926.jpg"},
    {filename: "IMG_1970.jpg"},
    {filename: "IMG_2894.jpg"},
    {filename: "IMG_3087.jpg"},
    {filename: "IMG_3117.jpg"},
    {filename: "IMG_3560.jpg"},
    {filename: "lars2.jpg"},
    {filename: "lars3.jpg"}
];

// initialize with actual sound file references
sounds.map((sound, i) => {
    sound.src = require('../mp3/' + sound.filename);
    sound.id = "id" + i;
    sound.isPlaying = false;
});


// initialize with actual img file references
larsImg.map((x, i) => {
    x.ref = require('../img/' + x.filename);
    x.id = "id" + i;
});

