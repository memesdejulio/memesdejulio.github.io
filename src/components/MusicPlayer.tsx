import { Pause, Play, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

interface ISong {
  title: string;
  artist: string;
  image: string;
  audio: string;
}

export const MusicPlayer = ({ song }: { song: ISong }) => {
  const { title, artist, image, audio } = song;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0); // in seconds
  const [duration, setDuration] = useState(0); // in seconds

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setProgress(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newTime = parseFloat(e.target.value);
    if (audio) {
      audio.currentTime = newTime;
      setProgress(newTime);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto h-auto border bg-white/60 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border-white/20">
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      {/* Main Info Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={
              image
                ? image
                : "https://imgs.search.brave.com/M5uV55Hwiten4Cx7zEIZAom6CieSnDRFniTFFdMbZjk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmt5/bS1jZG4uY29tL2Vu/dHJpZXMvaWNvbnMv/ZmFjZWJvb2svMDAw/LzA1NC82MTgvYWI2/NzYxNjEwMDAwNTE3/NGViMjZiMzk3Y2Zj/MWQ1Yjc4NTI5NmNk/ZC5qcGc"
            }
            alt="Album Art"
            className="w-16 h-16 rounded-lg shadow-md"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {title! ? title : "Unknown"}
            </h3>
            <p className="text-sm text-gray-600">
              {artist! ? artist : "Unknown"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-white/70 hover:bg-white shadow transition"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 text-gray-800" />
            ) : (
              <Play className="w-6 h-6 text-gray-800" />
            )}
          </button>
          <button
            onClick={handleStop}
            className="p-2 rounded-full bg-white/70 hover:bg-white shadow transition"
          >
            <Square className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={progress}
          onChange={handleSeek}
          className="w-full h-2 appearance-none bg-gray-300 rounded-full accent-black"
          style={{
            background: `linear-gradient(to right, #f97316 0%, #f97316 ${Math.min(
              (progress / duration) * 100,
              100
            )}%, #e5e7eb ${Math.min(
              (progress / duration) * 100,
              100
            )}%, #e5e7eb 100%)`,
          }}
        />

        <div className="flex justify-between text-xs text-gray-700 mt-1 font-mono">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};
