import React from 'react';
const games = [
    {
        title: 'Game 1',
        image: '/path/to/game1.jpg',
        label: 'New',
        buttonText: 'Play Now'
    },
    {
        title: 'Game 2',
        image: '/path/to/game2.jpg',
        label: 'Popular',
        buttonText: 'Play Now'
    },
    {
        title: 'Game 3',
        image: '/path/to/game3.jpg',
        label: 'Trending',
        buttonText: 'Play Now'
    }
];

const Banner = () => {
    return (
        <div className="relative">
            {/* Background image with blur and dark overlay */}
            <div 
                className="absolute inset-0 bg-[] bg-cover bg-center"
                style={{
                    filter: 'brightness(0.6) blur(4px)',
                    zIndex: -1
                }}
            />
            
            {/* Content */}
            <div className="relative flex flex-wrap gap-4 p-4">
                {games.map((game, index) => (
                    <div key={index} className="flex-1 min-w-[250px] bg-white rounded-lg shadow-lg overflow-hidden">
                        <img 
                            src={game.image} 
                            alt={game.title} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4 space-y-2">
                            <h3 className="text-xl font-bold text-gray-800">{game.title}</h3>
                            <span className="inline-block px-2 py-1 text-sm bg-blue-500 text-white rounded">
                                {game.label}
                            </span>
                            <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                                {game.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Banner;
