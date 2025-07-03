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
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0); // in seconds
  const [duration, setDuration] = useState(0); // in seconds

  const playerRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        playerRef.current &&
        !playerRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        isOpen ? "translate-y-0" : "translate-y-[-85%]"
      }`}
    >
      <div className="max-w-xl mx-auto px-4 pointer-events-auto">
        {/* Botón para mostrar/ocultar el reproductor */}

        {/* Contenedor principal del reproductor */}
        <div
          ref={playerRef}
          className="w-full max-w-xl mx-auto h-auto border bg-white/80 backdrop-blur-sm rounded-b-3xl p-6 shadow-2xl border-white/20"
        >
          <audio ref={audioRef} src={audio} />

          {/* Información principal y controles */}
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
                  {title ? title : "Unknown"}
                </h3>
                <p className="text-sm text-gray-600">
                  {artist ? artist : "Unknown"}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="p-2 rounded-full bg-white/70 hover:bg-white shadow transition"
                type="button"
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
                type="button"
              >
                <Square className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Barra de progreso */}
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
      </div>
      <div className="flex justify-center mt-4 mb-4">
        <button
          ref={toggleButtonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-1.5 rounded-full bg-gray-400 hover:bg-gray-600 transition-all"
          aria-label={isOpen ? "Hide Player" : "Show Player"}
          type="button"
        />
      </div>
    </div>
  );
};
