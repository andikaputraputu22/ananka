import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Calendar, Users, Camera, Music, Utensils, MapPin } from 'lucide-react';

const AnankaSite = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(0);

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
  }, []);

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

export default AnankaSite;