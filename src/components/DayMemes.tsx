import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Download, X, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import MemeSubmissionForm from "./MemeSubmissionForm";

interface DayMemesProps {
  date: Date;
  onBack: () => void;
  onDateChange?: (newDate: Date) => void;
}

interface Meme {
  id: number;
  title: string;
  imageUrl: string;
  submittedBy: string;
  approved: boolean;
}

const DayMemes: React.FC<DayMemesProps> = ({ date, onBack, onDateChange }) => {
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null);
  const [currentDate, setCurrentDate] = useState(date);
  const [memes, setMemes] = useState<Meme[]>([]);

  const currentYear = new Date().getFullYear();

  // Load memes from local files using manifest
  const loadLocalMemes = async (day: number) => {
    try {
      // Try to load a manifest file for the day that lists available memes
      const manifestResponse = await fetch(`/memes/${day}/manifest.json`);
      
      if (manifestResponse.ok) {
        const manifest = await manifestResponse.json();
        const localMemes: Meme[] = manifest.memes.map((memeInfo: any, index: number) => ({
          id: index + 1,
          title: memeInfo.title || (day === 0 ? 'Meme de Julio se acerca' : `Meme del ${day} de julio`),
          imageUrl: `/memes/${day}/${memeInfo.filename}`,
          submittedBy: memeInfo.submittedBy || 'Usuario',
          approved: true,
        }));
        setMemes(localMemes);
      } else {
        // Fallback: try to load a simple list of common filenames
        const commonFilenames = [
          '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg',
          '1.png', '2.png', '3.png', '4.png', '5.png',
          'meme.jpg', 'meme.png', 'image.jpg', 'image.png'
        ];
        
        const localMemes: Meme[] = [];
        
        // Check each common filename
        for (const filename of commonFilenames) {
          try {
            const imageResponse = await fetch(`/memes/${day}/${filename}`, { method: 'HEAD' });
            if (imageResponse.ok) {
              localMemes.push({
                id: localMemes.length + 1,
                title: day === 0 ? 'Meme de Julio se acerca' : `Meme del ${day} de julio`,
                imageUrl: `/memes/${day}/${filename}`,
                submittedBy: 'Usuario',
                approved: true,
              });
            }
          } catch {
            // File doesn't exist, continue
            continue;
          }
        }
        
        setMemes(localMemes);
      }
    } catch (error) {
      console.error('Error loading memes for day', day, ':', error);
      setMemes([]);
    }
  };

  // Load memes when component mounts or date changes
  useEffect(() => {
    // For Day 0, use day "0", for July dates use the day number
    const dayNumber = currentDate.getMonth() === 5 && currentDate.getDate() === 30 && currentDate.getFullYear() === currentYear 
      ? 0 
      : currentDate.getDate();
    loadLocalMemes(dayNumber);
  }, [currentDate]);

  const handleMemeSubmitted = () => {
    setShowSubmissionForm(false);
    // Refresh memes after submission
    loadLocalMemes(currentDate.getDate());
  };

  const handleMemeClick = (meme: Meme) => {
    setSelectedMeme(meme);
  };

  const handleDownload = async (imageUrl: string, title: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback: open image in new tab
      window.open(imageUrl, '_blank');
    }
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' ? subDays(currentDate, 1) : addDays(currentDate, 1);
    
    // Allow navigation within July of current year, or to/from Day 0 (June 30th)
    const isDayZero = currentDate.getMonth() === 5 && currentDate.getDate() === 30 && currentDate.getFullYear() === currentYear;
    const isJulyDate = newDate.getMonth() === 6 && newDate.getFullYear() === currentYear;
    const isFromDayZeroToJuly = isDayZero && newDate.getMonth() === 6 && newDate.getDate() === 1 && newDate.getFullYear() === currentYear;
    const isFromJulyToDayZero = currentDate.getMonth() === 6 && currentDate.getDate() === 1 && currentDate.getFullYear() === currentYear && newDate.getMonth() === 5 && newDate.getDate() === 30 && newDate.getFullYear() === currentYear;
    
    if (isJulyDate || isFromDayZeroToJuly || isFromJulyToDayZero) {
      setCurrentDate(newDate);
      if (onDateChange) {
        onDateChange(newDate);
      }
    }
  };

  const canNavigatePrev = () => {
    const prevDay = subDays(currentDate, 1);
    const isDayZero = currentDate.getMonth() === 5 && currentDate.getDate() === 30 && currentDate.getFullYear() === currentYear;
    const isJulyDate = prevDay.getMonth() === 6 && prevDay.getFullYear() === currentYear;
    const isFromDayZeroToJuly = isDayZero && prevDay.getMonth() === 6 && prevDay.getDate() === 1 && prevDay.getFullYear() === currentYear;
    return isJulyDate || isFromDayZeroToJuly;
  };

  const canNavigateNext = () => {
    const nextDay = addDays(currentDate, 1);
    const isDayZero = currentDate.getMonth() === 5 && currentDate.getDate() === 30 && currentDate.getFullYear() === currentYear;
    const isJulyDate = nextDay.getMonth() === 6 && nextDay.getFullYear() === currentYear;
    const isFromJulyToDayZero = currentDate.getMonth() === 6 && currentDate.getDate() === 1 && currentDate.getFullYear() === currentYear && nextDay.getMonth() === 5 && nextDay.getDate() === 30 && nextDay.getFullYear() === currentYear;
    return isJulyDate || isFromJulyToDayZero;
  };

  if (showSubmissionForm) {
    return (
      <MemeSubmissionForm 
        date={currentDate}
        onBack={() => setShowSubmissionForm(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm border-white/30 hover:bg-white text-purple-600 font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al Calendario
          </Button>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigateDay('prev')}
              variant="outline"
              size="sm"
              disabled={!canNavigatePrev()}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center drop-shadow-lg whitespace-nowrap">
              {currentDate.getMonth() === 5 && currentDate.getDate() === 30 && currentDate.getFullYear() === currentYear 
                ? "Julio se acerca" 
                : `Memes del ${format(currentDate, "d 'de julio'")}`
              }
            </h1>
            
            <Button
              onClick={() => navigateDay('next')}
              variant="outline"
              size="sm"
              disabled={!canNavigateNext()}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            onClick={() => setShowSubmissionForm(true)}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold shadow-lg"
          >
            <Plus className="w-4 h-4 mr-2" />
            Contribuir Meme
          </Button>
        </div>

        {memes.length === 0 ? (
          <div className="text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-12 border border-white/30">
              <h2 className="text-2xl font-bold text-white mb-4">
                ¡No hay memes para este día aún!
              </h2>
              <p className="text-white/80 mb-6">
                Sé el primero en subir un meme para el {format(currentDate, "d 'de julio'")}
              </p>
              <Button
                onClick={() => setShowSubmissionForm(true)}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold text-lg px-8 py-3"
              >
                <Plus className="w-5 h-5 mr-2" />
                Subir el Primer Meme
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memes.map((meme) => (
              <div
                key={meme.id}
                className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => handleMemeClick(meme)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={meme.imageUrl}
                    alt={meme.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      // Handle broken images
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">
                    {meme.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Por: <span className="font-semibold">{meme.submittedBy}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image Modal */}
        <Dialog open={!!selectedMeme} onOpenChange={() => setSelectedMeme(null)}>
          <DialogContent className="max-w-4xl w-full max-h-[90vh] p-0 overflow-hidden">
            {selectedMeme && (
              <div className="relative">
                <DialogHeader className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm text-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <DialogTitle className="text-xl font-bold">
                        {selectedMeme.title}
                      </DialogTitle>
                      <p className="text-sm opacity-90">
                        Por: {selectedMeme.submittedBy}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleDownload(selectedMeme.imageUrl, selectedMeme.title)}
                        variant="secondary"
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-0"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                      <Button
                        onClick={() => setSelectedMeme(null)}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="flex items-center justify-center bg-black">
                  <img
                    src={selectedMeme.imageUrl}
                    alt={selectedMeme.title}
                    className="max-w-full max-h-[90vh] object-contain"
                  />
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DayMemes;
