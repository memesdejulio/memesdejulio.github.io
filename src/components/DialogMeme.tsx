import { Download, X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogHeader, DialogTitle } from './ui/dialog';
import { Meme } from './DayMemes';
import { Dispatch, SetStateAction } from 'react';

interface IDialogProps {
	selectedMeme: Meme;
	setSelectedMeme: Dispatch<SetStateAction<Meme | null>>;
	imageScale: number;
	handleDownload: (imageUrl: string, title: string) => void;
	setImageScale: (scale: number) => void;
}

export const DialogMeme = ({
	selectedMeme,
	setSelectedMeme,
	imageScale,
	handleDownload,
	setImageScale,
}: IDialogProps) => {
	return (
		<Dialog open={true} onOpenChange={() => setSelectedMeme(null)}>
			<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
				<div
					className="bg-black rounded-lg shadow-2xl transition-transform duration-200 origin-center overflow-hidden"
					style={{
						transform: `scale(${imageScale})`,
						maxWidth: `${100 / imageScale}%`,
						maxHeight: `${100 / imageScale}%`,
						width: 'max-content',
						height: 'max-content',
					}}
				>
					<div className="flex flex-col">
						<DialogHeader className="bg-black/90 backdrop-blur-sm text-white p-4 border-b border-white/20">
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
										onClick={() =>
											handleDownload(selectedMeme.imageUrl, selectedMeme.title)
										}
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

						{/* Scale Controls */}
						<div className="bg-black/80 backdrop-blur-sm text-white p-3 border-b border-white/20">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium">
									Zoom: {Math.round(imageScale * 100)}%
								</span>
								<div className="flex items-center space-x-3 flex-1 mx-4">
									<input
										type="range"
										min="0.1"
										max="3"
										step="0.1"
										value={imageScale}
										onChange={(e) => setImageScale(parseFloat(e.target.value))}
										className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
									/>
								</div>
								<Button
									onClick={() => setImageScale(1)}
									variant="ghost"
									size="sm"
									className="text-white hover:bg-white/20"
								>
									Reset
								</Button>
							</div>
						</div>

						<div className="flex items-center justify-center bg-black p-4">
							<img
								src={selectedMeme.imageUrl}
								alt={selectedMeme.title}
								className="max-w-full max-h-[60vh] object-contain"
							/>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};
