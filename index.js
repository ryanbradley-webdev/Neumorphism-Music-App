import { playlist1, playlist2, playlist3 } from "./songInfo.js";

const playlistData = [ playlist1, playlist2, playlist3 ];

const mainPage = document.getElementById('main-page');
const playlists = document.querySelectorAll('.playlists');
const playlistNames = document.querySelectorAll('.playlist-name');

const settingsPage = document.getElementById('settings-page');
const radioButtons = document.querySelectorAll('input[type="radio"]');

const playlistPage = document.getElementById('playlist-page');
const playlistTitle = document.getElementById('playlist-title');
const songs = document.querySelectorAll('.song');
const albumCovers = document.querySelectorAll('.thumbnail');
const songNames = document.querySelectorAll('.song-name');
const artistNames = document.querySelectorAll('.artist-name');
const albumNames = document.querySelectorAll('.album-name');
const songTimes = document.querySelectorAll('.song-time');

const songPage = document.getElementById('song-page');
const artistTitle = document.getElementById('artist-title');
const songTitle = document.getElementById('song-title');
const albumTitle = document.getElementById('album-title');
const albumCover = document.getElementById('album-cover');
const runTime = document.getElementById('run-time');
const currentTime = document.getElementById('current-time');
const progressBar = document.getElementById('progress');
const tracker = document.getElementById('tracker');
const shuffleButton = document.getElementById('shuffle');
const backButton = document.getElementById('back');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
const repeatButton = document.getElementById('repeat');

const buttons = document.querySelectorAll('button');
const backButtons = document.querySelectorAll('.return');
const optionsButtons = document.querySelectorAll('.options');

// Color theme variables

const themeColors = ['--hightlight', '--light', '--main', '--dark', '--darker', '--text-color'];
const whiteTheme = ['#ffffff', '#f0f0f0', '#e0e0e0', '#cacaca', '#bebebe', '#434343'];
const darkTheme = ['#aeaeae', '#8d8d8d', '#848484', '#777777', '#707070', '#ededed'];
const pinkTheme = ['#ff8383', '#f09393', '#e08383', '#ca6d6d', '#be6161', '#434343'];
const blueTheme = ['#83c5ff', '#75b9f0', '#6dade0', '#629cca', '#5c93be', '#434343'];
const greenTheme = ['#83ffbb', '#7bf0b0', '#73caa4', '#68ca94', '#62be8b', '#434343'];
const purpleTheme = ['#ff83ff', '#f07df0', '#e075e0', '#ca6aca', '#be64be', '#434343'];

let songIndex = 0;
let elapsedTime = 0;
let trackerInterval;
let randomNumber = 0;
let shuffle = false;
let repeat = false;

const generateRandomNumber = () => {
    randomNumber = Math.floor(Math.random() * songs.length);
    if (songIndex === randomNumber) {
        generateRandomNumber();
    } else {
        return randomNumber;
    }
}

const setSongIndex = () => {
    if (shuffle) {
        return generateRandomNumber();
    } else if (repeat && songIndex === songs.length - 1) {
        return 0;
    } else {
        return songIndex + 1;
    }
}

const calculateSongLength = () => {
    const songTimeArray = runTime.innerHTML.split(':');
    const minutes = Number(songTimeArray[0]);
    const seconds = Number(songTimeArray[1]);
    return minutes * 60 + seconds;
}

const resetTracker = () => {
    progressBar.style.width = '0px';
    tracker.style.left = '-13px';
    currentTime.innerHTML = '0:00';
}

const playlistPopulate = index => {
    playlistTitle.innerHTML = playlistNames[index].innerHTML;
    const playlist = playlistData[index];
    songs.forEach((song, index) => {
        song.querySelector('img').src = playlist[index].src;
        song.querySelector('.song-name').innerHTML = playlist[index].songName;
        song.querySelector('.artist-name').innerHTML = playlist[index].artistName;
        song.querySelector('.album-name').innerHTML = playlist[index].albumName;
        song.querySelector('.song-time').innerHTML = playlist[index].time;
    });
}

playlists.forEach((playlist, index) => {
    playlist.addEventListener('mousedown', function() {
        playlist.classList.toggle('active');
    });
    playlist.addEventListener('mouseup', function() {
        playlist.classList.toggle('active');
        playlistPopulate(index);
        setTimeout(function() {
            mainPage.classList.replace('visible', 'hidden-left');
            playlistPage.classList.replace('hidden-right', 'visible');
        }, 100);
    });
});

const songInfoPopulate = index => {
    songTitle.innerHTML = songNames[index].innerHTML;
    albumTitle.innerHTML = albumNames[index].innerHTML;
    artistTitle.innerHTML = artistNames[index].innerHTML;
    runTime.innerHTML = songTimes[index].innerHTML;
    albumCover.src = albumCovers[index].src;
    resetTracker();
}

songs.forEach((song, index) => {
    song.addEventListener('mousedown', function() {
        song.classList.toggle('active');
    });
    song.addEventListener('mouseup', function() {
        song.classList.toggle('active');
        songInfoPopulate(index);
        songIndex = index;
        setTimeout(function() {
            playlistPage.classList.replace('visible', 'hidden-left');
            songPage.classList.replace('hidden-right', 'visible');
        }, 100);
    });
});

const trackerMovement = () => {
    let totalTime = calculateSongLength();
    trackerInterval = setInterval(function() {
        elapsedTime++;
        if (elapsedTime > totalTime) {
            elapsedTime = 0;
            if (songIndex === songs.length - 1 && !shuffle && !repeat) {
                playButton.firstElementChild.classList.replace('fa-pause', 'fa-play');
                trackerInterval = clearInterval(trackerInterval);
            } else {
                songIndex = setSongIndex();
                if (typeof songIndex !== 'number') {
                    songIndex = setSongIndex();
                }
                songInfoPopulate(songIndex);
                totalTime = calculateSongLength();
            }
        }
        let trackerFraction = elapsedTime / totalTime;
        let trackerPixels = Math.floor(trackerFraction * 300);
        progressBar.style.width = `${trackerPixels}px`;
        tracker.style.left = `${trackerPixels - 13}px`;
        if (elapsedTime % 60 < 10) {
            currentTime.innerHTML = `${Math.floor(elapsedTime / 60)}:0${elapsedTime % 60}`;
        } else {
            currentTime.innerHTML = `${Math.floor(elapsedTime / 60)}:${elapsedTime % 60}`;
        }
    }, 1000);
}

buttons.forEach(button => {
    button.addEventListener('mousedown', function() {
        button.classList.toggle('active');
    });
    button.addEventListener('mouseup', function() {
        button.classList.toggle('active');
    });
});

playButton.addEventListener('click', function() {
    const playIconClass = playButton.firstElementChild.classList;
    if (playIconClass.contains('fa-play')) {
        playIconClass.replace('fa-play', 'fa-pause');
        trackerMovement();
    } else {
        playIconClass.replace('fa-pause', 'fa-play');
        trackerInterval = clearInterval(trackerInterval);
    }
});

shuffleButton.addEventListener('click', function() {
    shuffle = shuffle ? false : true;
    shuffleButton.firstElementChild.classList.toggle('lit');
});

repeatButton.addEventListener('click', function() {
    repeat = repeat ? false : true;
    repeatButton.firstElementChild.classList.toggle('lit');
});

backButton.addEventListener('click', function() {
    let prevPlaying = false;
    if (trackerInterval) {
        prevPlaying = true;
        trackerInterval = clearInterval(trackerInterval);
    }
    if (elapsedTime < 5 && songIndex !== 0) {
        songIndex--;
        songInfoPopulate(songIndex);
    } else {
        resetTracker();
    }
    elapsedTime = 0;
    if (prevPlaying) {
        trackerMovement();
    }
});

nextButton.addEventListener('click', function() {
    if (songIndex === songs.length - 1 && !repeat) {
        return;
    } else if (songIndex === songs.length - 1 && repeat) {
        songIndex = 0;
    } else {  
        songIndex++;
    }
    let prevPlaying = false;
    if (trackerInterval) {
        trackerInterval = clearInterval(trackerInterval);
        prevPlaying = true;
    }
    songInfoPopulate(songIndex);
    elapsedTime = 0;
    if (prevPlaying) {
        trackerMovement();
    }
});

backButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (trackerInterval) {
            trackerInterval = clearInterval(trackerInterval);
            elapsedTime = 0;
        }
        if (playButton.firstElementChild.classList.contains('fa-pause')) {
            playButton.firstElementChild.classList.replace('fa-pause', 'fa-play');
        }
        setTimeout(function() {
            if (button.id === 'song-page-back') {
                songPage.classList.replace('visible', 'hidden-right');
                playlistPage.classList.replace('hidden-left', 'visible');
            }
            if (button.id === 'playlist-page-back') {
                playlistPage.classList.replace('visible', 'hidden-right');
                mainPage.classList.replace('hidden-left', 'visible');
            }
            if (button.id === 'close') {
                settingsPage.classList.add('hidden-bottom');
            }
        }, 100);
    });
});

optionsButtons.forEach(button => {
    button.addEventListener('click', function() {
        setTimeout(function() {
            settingsPage.classList.remove('hidden-bottom');
        }, 100);
    });
});

const themeChange = theme => {
    for (let i = 0; i < 6; i++) {
        document.documentElement.style.setProperty(themeColors[i], theme[i]);
    }
}

radioButtons.forEach(button => {
    button.addEventListener('change', function() {
        radioButtons.forEach(button => {
            button.classList.remove('clicked');
        });
        const clickedButton = document.querySelector('input[type="radio"]:checked');
        const newTheme = clickedButton.value;
        const closeButton = document.getElementById('close');
        button.classList.remove('clicked');
        clickedButton.classList.add('clicked');
        closeButton.style.transition = 'none';
        switch (newTheme) {
            case 'white':
                themeChange(whiteTheme);
                break;
            case 'dark':
                themeChange(darkTheme);
                break;
            case 'pink':
                themeChange(pinkTheme);
                break;
            case 'blue':
                themeChange(blueTheme);
                break;
            case 'green':
                themeChange(greenTheme);
                break;
            case 'purple':
                themeChange(purpleTheme);
                break;
            default:
                break;
        }
        setTimeout(function() {
            closeButton.style.transition = 'all 0.1s ease-in-out';
        }, 150);
    });
});

const slider = document.getElementById('slider');

slider.addEventListener('click', function() {
    slider.classList.toggle('checked');
    radioButtons.forEach(button => {
        if (button.disabled) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    });
});