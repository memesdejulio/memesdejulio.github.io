import { Meme } from './DayMemes';

interface IMemeProps {
	meme: Meme;
	handleMemeClick: (meme: Meme) => void;
}

export const MemeCard = ({ meme, handleMemeClick }: IMemeProps) => {
	return (
		<div
			key={meme.id}
			className="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:scale-105 transition-transform duration-300 cursor-pointer"
			onClick={() => handleMemeClick(meme)}
		>
			<div className="relative justify-center flex aspect-square overflow-hidden">
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
						target.style.display = 'none';
					}}
				/>
			</div>
			<div className="p-4">
				<h3 className="font-bold text-lg text-gray-800 mb-2">{meme.title}</h3>
				<p className="text-sm text-gray-600">
					Por: <span className="font-semibold">{meme.submittedBy}</span>
				</p>
			</div>
		</div>
	);
};
