import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Calendar, Users, Camera, Music, Star, Crown, Flag, LucideIcon } from 'lucide-react';

interface FloatingIcon {
    Icon: LucideIcon;
    color: string;
    delay: string;
}

const AnankaMerdekaLanding = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentIcon, setCurrentIcon] = useState(0);
    const [showMerdeka, setShowMerdeka] = useState(false);

    const floatingIcons: FloatingIcon[] = [
        { Icon: Heart, color: 'text-rose-400', delay: '0s' },
        { Icon: Sparkles, color: 'text-amber-400', delay: '0.5s' },
        { Icon: Calendar, color: 'text-blue-400', delay: '1s' },
        { Icon: Users, color: 'text-emerald-400', delay: '1.5s' },
        { Icon: Camera, color: 'text-purple-400', delay: '2s' },
        { Icon: Music, color: 'text-pink-400', delay: '2.5s' },
        { Icon: Crown, color: 'text-amber-300', delay: '3s' }, // Indonesian royal element
        { Icon: Flag, color: 'text-red-400', delay: '3.5s' }, // Flag icon
    ];

    // Fireworks particles
    const fireworks = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`,
        delay: `${Math.random() * 4}s`,
        duration: `${2 + Math.random() * 3}s`
    }));

    useEffect(() => {
        setIsLoaded(true);

        // Show Merdeka text after initial load
        setTimeout(() => {
            setShowMerdeka(true);
        }, 1000);

        const interval = setInterval(() => {
            setCurrentIcon((prev) => (prev + 1) % floatingIcons.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [floatingIcons.length]);

    return (
        <div className="min-h-screen bg-gray-950 relative overflow-hidden">
            {/* Indonesian Flag Gradient Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-red-900/10 via-red-800/5 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-100/5 via-gray-200/3 to-transparent"></div>
            </div>

            {/* Fireworks Particles */}
            <div className="absolute inset-0">
                {fireworks.map((firework) => (
                    <div
                        key={firework.id}
                        className="absolute animate-ping"
                        style={{
                            left: firework.left,
                            top: firework.top,
                            animationDelay: firework.delay,
                            animationDuration: firework.duration
                        }}
                    >
                        <Star className="w-2 h-2 text-amber-400 opacity-60" />
                    </div>
                ))}

                {/* Traditional background elements */}
                {[...Array(6)].map((_, i) => (
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
                        <div className="w-1 h-1 bg-red-400 rounded-full opacity-30"></div>
                    </div>
                ))}

                {/* Indonesian-inspired gradients */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
            </div>

            {/* Floating 17-8 Numbers */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-1/4 left-1/6 text-8xl font-thin text-red-500/10 animate-pulse select-none"
                    style={{ animationDelay: '2s' }}
                >
                    17
                </div>
                <div
                    className="absolute bottom-1/3 right-1/6 text-8xl font-thin text-red-500/10 animate-pulse select-none"
                    style={{ animationDelay: '3s' }}
                >
                    8
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
                {/* Merdeka Banner */}
                <div className={`text-center mb-6 transition-all duration-1500 ${showMerdeka ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white px-8 py-2 rounded-full text-sm font-light tracking-widest shadow-lg border border-red-400/20">
                        🇮🇩 DIRGAHAYU INDONESIA KE-80 🇮🇩
                    </div>
                </div>

                {/* Logo Section */}
                <div className={`text-center mb-12 transition-all duration-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="relative inline-block">
                        <h1 className="text-6xl md:text-7xl font-light bg-gradient-to-r from-red-400 via-white to-red-300 bg-clip-text text-transparent mb-2 tracking-widest">
                            ANANKA
                        </h1>
                        {/* Indonesian-inspired accents */}
                        <div className="absolute -top-2 -right-6 opacity-60">
                            <Sparkles className="w-6 h-6 text-amber-400" />
                        </div>
                        <div className="absolute -top-1 -left-4 opacity-40">
                            <Star className="w-4 h-4 text-red-400" />
                        </div>
                    </div>
                </div>

                {/* Subtitle with Merdeka theme */}
                <div className={`text-center mb-16 transition-all duration-1500 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-xl md:text-2xl text-gray-300 font-light mb-2 tracking-wide">
                        Your Complete Wedding Marketplace
                    </p>
                    <p className="text-md text-red-300 font-light mb-2 tracking-wide italic">
                        &#34;Merayakan Cinta, Merayakan Kemerdekaan&#34;
                    </p>
                    <p className="text-md md:text-md text-gray-300 font-light mb-4 tracking-wide">
                        By I Putu Andika Putra
                    </p>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"></div>
                </div>

                {/* Single Rotating Icon with Indonesian touch */}
                <div className={`mb-16 transition-all duration-1500 delay-600 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                    <div className="relative w-20 h-20 mx-auto">
                        {/* Red-white circular background inspired by flag */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-red-500/20 to-white/20 animate-spin" style={{ animationDuration: '8s' }}></div>

                        {floatingIcons.map((item, index) => {
                            const IconComponent = item.Icon;
                            return (
                                <div
                                    key={index}
                                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                                        index === currentIcon ? 'opacity-100 scale-110' : 'opacity-0 scale-90'
                                    }`}
                                >
                                    <IconComponent className={`w-10 h-10 ${item.color} drop-shadow-lg`} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Merdeka Special Message */}
                <div className={`mb-12 transition-all duration-1500 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="text-center bg-gradient-to-r from-red-900/20 via-gray-900/30 to-red-900/20 backdrop-blur-sm rounded-xl px-8 py-6 border border-red-500/20 shadow-xl max-w-md mx-auto">
                        <h3 className="text-xl font-light text-red-300 mb-2 tracking-wide">MERDEKA!</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Dalam semangat kemerdekaan ke-80, mari bersama merayakan momen bahagia pernikahan
                            sebagai simbol persatuan dan cinta yang abadi.
                        </p>
                    </div>
                </div>

                {/* Development Status with Indonesian twist */}
                <div className={`transition-all duration-1500 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="bg-gradient-to-r from-gray-900/50 via-red-900/20 to-gray-900/50 backdrop-blur-sm rounded-lg px-6 py-3 border border-red-700/30 shadow-xl">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                            <span className="text-red-200 font-light text-base tracking-wide">
                DALAM PENGEMBANGAN
              </span>
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* Description with patriotic touch */}
                <div className={`text-center mt-12 transition-all duration-1500 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-gray-400 text-base font-light mb-2 max-w-md">
                        Menyatukan keluarga untuk merencanakan pernikahan impian
                    </p>
                    <p className="text-red-400 text-sm font-light">
                        Sesuatu yang indah akan segera hadir 🇮🇩
                    </p>
                </div>
            </div>

            {/* Minimal Footer with Indonesian touch */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="text-gray-600 text-xs font-light">
                    © 2025 ANANKA • Made with ❤️ for Indonesia
                </p>
            </div>

            {/* Subtle Indonesian batik-inspired pattern overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 border border-red-400 rounded-full"></div>
                <div className="absolute top-20 right-20 w-24 h-24 border border-white rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-28 h-28 border border-red-400 rounded-full"></div>
                <div className="absolute bottom-32 right-16 w-20 h-20 border border-white rounded-full"></div>
            </div>
        </div>
    );
};

export default AnankaMerdekaLanding;