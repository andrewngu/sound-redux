export const CHANGE_TYPES = {
    NEXT: 'next',
    PLAY: 'play',
    SHUFFLE: 'shuffle'
};

export const GENRES = [
    'chill',
    'deep',
    'dubstep',
    'house',
    'progressive',
    'tech',
    'trance',
    'tropical'
];

export const GENRES_MAP = (function(){
    let result = {};
    GENRES.forEach(function(genre){
        result[genre] = 1;
    });

    return result;
})();
