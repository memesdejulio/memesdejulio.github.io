import { Pause, Play } from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { Meme } from "./DayMemes";

interface IMemeProps {
  children?: React.ReactNode;
  handleMemeClick: (meme: Meme) => void;
  meme: Meme;
}

interface IMemeMusic extends Meme {
  music?: {
    audio: string;
  };
}

interface MemeCardContextType {
  meme: IMemeMusic;
  handleMemeClick: (meme: Meme) => void;
}

const MemeCardContext = createContext<MemeCardContextType | null>(null);

export const MemeCardCompounded = ({
  children,
  meme,
  handleMemeClick,
}: IMemeProps) => {
  return (
    <MemeCardContext.Provider
      value={{
        meme,
        handleMemeClick,
      }}
    >
      {children}
    </MemeCardContext.Provider>
  );
};

const Container = ({ children }: { children: React.ReactNode }) => {
  const { meme, handleMemeClick } = useMemeCard();
  return (
    <div
      key={meme.id}
      className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      {children}
    </div>
  );
};

const ImageMeme = () => {
  const { meme, handleMemeClick } = useMemeCard();
  return (
    <div
      className="relative justify-center flex aspect-square overflow-hidden"
      onClick={() => handleMemeClick(meme)}
    >
      <img
        src={meme.imageUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover filter blur-lg scale-110"
        style={{ zIndex: 0 }}
        draggable={false}
      />
      <img
        src={meme.imageUrl}
        alt={meme.title}
        className="relative z-10 max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
        loading="lazy"
        onError={(e) => {
          // Handle broken images
          const target = e.target as HTMLImageElement;
          target.style.display = "none";
        }}
      />
    </div>
  );
};

const MemeFooter = () => {
  const { meme } = useMemeCard();
  return (
    <div className="p-4">
      <h3 className="font-bold text-lg text-gray-800 mb-2">{meme.title}</h3>
      <p className="text-sm text-gray-600">
        Por: <span className="font-semibold">{meme.submittedBy}</span>
      </p>
    </div>
  );
};

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const MemeFooterMusic = ({ song }: { song: string }) => {
  const { meme } = useMemeCard();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const setAudioDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", setAudioDuration);
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
      audio.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  if (!song) return null;

  return (
    <div className="p-4 border-t bg-white/90 backdrop-blur-sm rounded-b-xl shadow-inner border-white/20">
      <audio ref={audioRef} src={song} />

      <div className="mb-2">
        <h3 className="text-base font-semibold text-gray-800">{meme.title}</h3>
        <p className="text-sm text-gray-600">
          Por: <span className="font-medium">{meme.submittedBy}</span>
        </p>
      </div>

      <div className="flex items-center space-x-4 mt-2">
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={progress}
          onChange={handleSeek}
          className="w-full accent-orange-500"
        />
        <span className="text-xs text-gray-600 font-mono">
          {formatTime(progress)}
        </span>
      </div>
    </div>
  );
};

const useMemeCard = () => {
  const context = useContext(MemeCardContext);
  if (!context) {
    throw new Error("useMemeCard must be used within a <MemeCard.Provider>");
  }
  return context;
};

MemeCardCompounded.Container = Container;
MemeCardCompounded.ImageMeme = ImageMeme;
MemeCardCompounded.MemeFooter = MemeFooter;
MemeCardCompounded.MemeFooterMusic = MemeFooterMusic;
