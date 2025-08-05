import React, { useState, useEffect, useCallback } from 'react';
import { Heart, Sparkles, Calendar, Users, Camera, Music, Utensils, MapPin, Play, X, RotateCcw, Trophy } from 'lucide-react';

interface Card {
  id: number;
  Icon: any;
  color: string;
  name: string;
  flipped: boolean;
  matched: boolean;
}

const AnankaSite = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(0);
  const [gameMode, setGameMode] = useState(false);

  const floatingIcons = [
    { Icon: Heart, color: 'text-rose-400', delay: '0s' },
    { Icon: Sparkles, color: 'text-amber-400', delay: '0.5s' },
    { Icon: Calendar, color: 'text-blue-400', delay: '1s' },
    { Icon: Users, color: 'text-emerald-400', delay: '1.5s' },
    { Icon: Camera, color: 'text-purple-400', delay: '2s' },
    { Icon: Music, color: 'text-pink-400', delay: '2.5s' },
    { Icon: Utensils, color: 'text-orange-400', delay: '3s' },
    { Icon: MapPin, color: 'text-cyan-400', delay: '3.5s' }
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % floatingIcons.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [floatingIcons.length]);

  if (gameMode) {
    return <MemoryGame onExit={() => setGameMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        {/* Minimal floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            <div className="w-1 h-1 bg-gray-600 rounded-full opacity-40"></div>
          </div>
        ))}
        
        {/* Subtle gradient overlay */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Logo Section */}
        <div className={`text-center mb-12 transition-all duration-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-light bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2 tracking-widest">
              ANANKA
            </h1>
            {/* Single elegant accent */}
            <div className="absolute -top-2 -right-6 opacity-60">
              <Sparkles className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className={`text-center mb-16 transition-all duration-1500 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-4 tracking-wide">
            Your Complete Wedding Marketplace
          </p>
          <p className="text-md md:text-md text-gray-300 font-light mb-4 tracking-wide">
            By I Putu Andika Putra
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto"></div>
        </div>

        {/* Single Rotating Icon */}
        <div className={`mb-16 transition-all duration-1500 delay-600 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="relative w-16 h-16 mx-auto">
            {floatingIcons.map((item, index) => {
              const IconComponent = item.Icon;
              return (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                    index === currentIcon ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
                  }`}
                >
                  <IconComponent className={`w-8 h-8 ${item.color}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Play Game Button */}
        <div className={`mb-8 transition-all duration-1500 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <button
            onClick={() => setGameMode(true)}
            className="group bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-light tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span>Play Wedding Memory Game</span>
          </button>
        </div>

        {/* Development Status */}
        <div className={`transition-all duration-1500 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg px-6 py-3 border border-gray-700/50 shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-gray-200 font-light text-base tracking-wide">
                IN DEVELOPMENT
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className={`text-center mt-12 transition-all duration-1500 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gray-400 text-base font-light mb-2 max-w-md">
            Bringing families together to plan the perfect wedding
          </p>
          <p className="text-gray-500 text-sm">
            Something beautiful is coming soon
          </p>
        </div>
      </div>

      {/* Minimal Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-gray-600 text-xs font-light">
          © 2025 ANANKA
        </p>
      </div>
    </div>
  );
};

// Wedding themed icons for the memory game
const gameIcons = [
  { Icon: Heart, color: 'text-rose-400', name: 'heart' },
  { Icon: Sparkles, color: 'text-amber-400', name: 'sparkles' },
  { Icon: Camera, color: 'text-purple-400', name: 'camera' },
  { Icon: Music, color: 'text-pink-400', name: 'music' },
  { Icon: Utensils, color: 'text-orange-400', name: 'utensils' },
  { Icon: Users, color: 'text-emerald-400', name: 'users' },
  { Icon: Calendar, color: 'text-blue-400', name: 'calendar' },
  { Icon: MapPin, color: 'text-cyan-400', name: 'mappin' }
];

const MemoryGame = ({ onExit }: { onExit: () => void }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const initializeGame = useCallback(() => {
    const gameCards = [...gameIcons, ...gameIcons].map((icon, index) => ({
      id: index,
      ...icon,
      flipped: false,
      matched: false
    }));
    
    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
  }, []);

  const handleCardClick = (clickedCard: Card) => {
    if (flippedCards.length === 2 || flippedCards.includes(clickedCard.id) || matchedCards.includes(clickedCard.id)) {
      return;
    }

    const newFlippedCards = [...flippedCards, clickedCard.id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard.name === secondCard.name) {
        // Match found
        setTimeout(() => {
          setMatchedCards([...matchedCards, firstId, secondId]);
          setFlippedCards([]);
          
          if (matchedCards.length + 2 === cards.length) {
            setGameWon(true);
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    initializeGame();
  };

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background similar to main page */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* Game Header */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <h2 className="text-2xl md:text-3xl font-light text-white tracking-wide">
              Wedding Memory Game
            </h2>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700/50">
                <span className="text-gray-300 text-sm">Moves: {moves}</span>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700/50">
                <span className="text-gray-300 text-sm">Matched: {matchedCards.length / 2}/8</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={resetGame}
              className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full transition-colors duration-300"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              onClick={onExit}
              className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-6">
        <div className="grid grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto">
          {cards.map((card) => {
            const IconComponent = card.Icon;
            const isFlipped = flippedCards.includes(card.id) || matchedCards.includes(card.id);
            const isMatched = matchedCards.includes(card.id);
            
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`relative w-16 h-16 md:w-20 md:h-20 cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                  isMatched ? 'scale-110' : ''
                }`}
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Card Back */}
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 flex items-center justify-center backface-hidden shadow-lg">
                    <div className="w-8 h-8 bg-gray-600 rounded-full opacity-50"></div>
                  </div>
                  
                  {/* Card Front */}
                  <div className={`absolute inset-0 w-full h-full rounded-xl border-2 flex items-center justify-center rotate-y-180 backface-hidden shadow-lg ${
                    isMatched 
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-400' 
                      : 'bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600'
                  }`}>
                    <IconComponent className={`w-8 h-8 md:w-10 md:h-10 ${isMatched ? 'text-white' : card.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Game Won Modal */}
      {gameWon && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md mx-4 text-center border border-gray-700 shadow-2xl">
            <div className="mb-6">
              <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h3 className="text-3xl font-light text-white mb-2">Congratulations!</h3>
              <p className="text-gray-300">You completed the game in {moves} moves!</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={resetGame}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-3 px-6 rounded-xl font-light transition-colors duration-300"
              >
                Play Again
              </button>
              <button
                onClick={onExit}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-xl font-light transition-colors duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default AnankaSite;