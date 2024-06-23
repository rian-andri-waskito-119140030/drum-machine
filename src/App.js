import React, { useState, useEffect } from 'react';
import DrumPad from './components/DrumPad';
import Display from './components/Display';
import './App.css';

const drumPads = [
  { key: 'Q', id: 'Heater-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { key: 'W', id: 'Heater-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { key: 'E', id: 'Heater-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { key: 'A', id: 'Heater-4', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },
  { key: 'S', id: 'Clap', url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { key: 'D', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { key: 'Z', id: 'Kick-n-Hat', url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { key: 'X', id: 'Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { key: 'C', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }
];

const pianoPads = [
  { key: 'Q', id: 'Chord-1', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3' },
  { key: 'W', id: 'Chord-2', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
  { key: 'E', id: 'Chord-3', url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
  { key: 'A', id: 'Shaker', url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3' },
  { key: 'S', id: 'Open-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3' },
  { key: 'D', id: 'Closed-HH', url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3' },
  { key: 'Z', id: 'Punchy-Kick', url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3' },
  { key: 'X', id: 'Side-Stick', url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3' },
  { key: 'C', id: 'Snare', url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3' }
];

function App() {
  const [displayText, setDisplayText] = useState('');
  const [volume, setVolume] = useState(0.5);
  const [power, setPower] = useState(true);
  const [activeKit, setActiveKit] = useState(drumPads);

  const handleDisplay = (text) => {
    setDisplayText(text);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    handleDisplay(`Volume: ${Math.round(event.target.value * 100)}`);
  };

  const handlePowerToggle = () => {
    setPower(!power);
    handleDisplay(power ? 'Power Off' : 'Power On');
  };

  const handleKitToggle = () => {
    setActiveKit(activeKit === drumPads ? pianoPads : drumPads);
    handleDisplay(activeKit === drumPads ? 'Piano Kit' : 'Drum Kit');
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!power) return;
      const drumPad = activeKit.find(pad => pad.key === event.key.toUpperCase());
      if (drumPad) {
        const audio = document.getElementById(drumPad.key);
        audio.currentTime = 0;
        audio.volume = volume;
        audio.play();
        handleDisplay(drumPad.id);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [volume, power, activeKit]);

  return (
    <div id="drum-machine">
      <Display text={displayText} />
      <div className="controls">
        <button onClick={handlePowerToggle}>{power ? 'Power Off' : 'Power On'}</button>
        <button onClick={handleKitToggle}>Toggle Kit</button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <div id="drum-pads">
        {activeKit.map((pad) => (
          <DrumPad key={pad.id} pad={pad} handleDisplay={handleDisplay} power={power} volume={volume} />
        ))}
      </div>
    </div>
  );
}

export default App;
