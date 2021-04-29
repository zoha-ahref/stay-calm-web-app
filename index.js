

const home = () => {
  const track = document.querySelector('.track');
  const play = document.querySelector('.play');
  const moving = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".video-container video");
  const selectTime = document.querySelectorAll(".select-time button");
  const replay = document.querySelector(".replay");
  //music
  const musics = document.querySelectorAll('.music-container button');
  const displayTime = document.querySelector('.display-time');
  // #Get moving outline length
  const moLength = moving.getTotalLength();
  let duration = 600;

  moving.style.strokeDasharray = moLength;
  moving.style.strokeDashoffset = moLength;

  musics.forEach(music => {
    music.addEventListener("click", function() {
      track.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });


  //play track

  play.addEventListener("click", () => {
    checkPlaying(track);
  });

  replay.addEventListener("click", () => {
    restartTrack(track);
  });


  const restartTrack = track => {
    let currentTime = track.currentTime;
    track.currentTime = 0;
    console.log("bye")
  }
  //select time for playing track
  selectTime.forEach(option => {
    option.addEventListener("click", function() {
      duration = this.getAttribute('data-time');
      displayTime.textContent = `${Math.floor(duration/60)}:
      ${Math.floor(duration % 60)}`;
    });
  });
    //stop and play sounds
  const checkPlaying = track => {
      if(track.paused) {
        track.play();
        video.play();
        play.src = "./svg/pause.svg";
      } else {
        track.pause();
        video.pause();
        play.src = "./svg/play.svg";
      }
    };
//runs everytime the song is played
  track.ontimeupdate = () => {
      let currentTime = track.currentTime;
      let elapsed = duration - currentTime;
      let seconds = Math.floor(elapsed % 60);
      let minutes = Math.floor(elapsed/60);
      //Animate time
      displayTime.textContent = `${minutes}:${seconds}`;
      //Animate progress bar
      let progress = moLength - (currentTime/duration) * moLength;
      moving.style.strokeDashoffset = progress;

      if (currentTime >= duration) {
        track.pause();
        track.currentTime = 0;
        play.src = "./svg/play.svg";
        video.pause();
      }


    };

    };




home();
