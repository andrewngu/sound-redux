export const CHANGE_TYPES = {
    NEXT: 'next',
    PLAY: 'play',
    SHUFFLE: 'shuffle'
};

export const GENRES = [
    'alternative rock',
    'ambient',
    'classical',
    'chill',
    'country',
    'dance edm',
    'dancehall',
    'deep',
    'deep house',
    'disco',
    'drum bass',
    'dubstep',
    'electronic',
    'folk singer songwriter',
    'hip hop rap',
    'house',
    'indie',
    'jazz blues',
    'latin',
    'metal',
    'piano',
    'pop',
    'reggae',
    'reggaeton',
    'rock',
    'soundtrack',
    'progressive',
    'tech',
    'triphop',
    'trance',
    'trap',
    'tropical',
    'world'
];


export const GENRES_MAP = (function(){
    let result = {};
    GENRES.forEach(function(genre){
        result[genre] = 1;
    });

    return result;
})();


export const IMAGE_SIZES = {
    LARGE: 't300x300',
    XLARGE: 't500x500'
};
