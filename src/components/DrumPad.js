import React from 'react';

function DrumPad({ pad, handleDisplay, power, volume }) {
  const playSound = () => {
    if (!power) return;
    const audio = document.getElementById(pad.key);
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
    handleDisplay(pad.id);
  };

  return (
    <div className="drum-pad" id={pad.id} onClick={playSound}>
      {pad.key}
      <audio className="clip" id={pad.key} src={pad.url}></audio>
    </div>
  );
}

export default DrumPad;
