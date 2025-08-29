import React, { useState, useEffect } from 'react';
import {
    Heart,
    Sparkles,
    Calendar,
    Users,
    Camera,
    Music,
    Star,
    Crown,
    ChevronLeft,
    ChevronRight,
    Quote,
    LucideIcon
} from 'lucide-react';

interface FloatingIcon {
    Icon: LucideIcon;
    color: string;
    delay: string;
}

interface JourneyQuote {
    id: number;
    quote: string;
    author: string;
    role: string;
    date: string;
    avatar: string;
}

const AnankaMerdekaLanding = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentIcon, setCurrentIcon] = useState(0);
    const [currentQuote, setCurrentQuote] = useState(0);

    const floatingIcons: FloatingIcon[] = [
        { Icon: Heart, color: 'text-rose-400', delay: '0s' },
        { Icon: Sparkles, color: 'text-amber-400', delay: '0.5s' },
        { Icon: Calendar, color: 'text-blue-400', delay: '1s' },
        { Icon: Users, color: 'text-emerald-400', delay: '1.5s' },
        { Icon: Camera, color: 'text-purple-400', delay: '2s' },
        { Icon: Music, color: 'text-pink-400', delay: '2.5s' },
        { Icon: Crown, color: 'text-amber-300', delay: '3s' },
    ];

    const journeyQuotes: JourneyQuote[] = [
        {
            id: 1,
            quote: "Ide Ananka lahir dari pengalaman pribadi yang ingin merencanakan sebuah pernikahan. Kami ingin membuat proses yang rumit menjadi sederhana dan menyenangkan.",
            author: "I Putu Andika Putra",
            role: "Founder & Developer",
            date: "Januari 2018",
            avatar: "🚀"
        },
        {
            id: 2,
            quote: "Kak, ini kopinya gratis dari aku. Nanti kalau sudah sukses projectnya, aku mau nikah di kakak, tapi digratisin ya.",
            author: "Mbak Fore Coffee",
            role: "Penyemangat",
            date: "Agustus 2025",
            avatar: "✨"
        }
    ];

    // Fireworks particles
    const fireworks = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        top: `${10 + Math.random() * 80}%`,
        delay: `${Math.random() * 4}s`,
        duration: `${2 + Math.random() * 3}s`
    }));

    useEffect(() => {
        setIsLoaded(true);

        const iconInterval = setInterval(() => {
            setCurrentIcon((prev) => (prev + 1) % floatingIcons.length);
        }, 2000);

        const quoteInterval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % journeyQuotes.length);
        }, 5000);

        return () => {
            clearInterval(iconInterval);
            clearInterval(quoteInterval);
        };
    }, [floatingIcons.length, journeyQuotes.length]);

    const nextQuote = () => {
        setCurrentQuote((prev) => (prev + 1) % journeyQuotes.length);
    };

    const prevQuote = () => {
        setCurrentQuote((prev) => (prev - 1 + journeyQuotes.length) % journeyQuotes.length);
    };

    return (
        <div className="min-h-screen bg-gray-950 relative overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-purple-900/10 via-blue-800/5 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-gray-100/5 via-gray-200/3 to-transparent"></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 z-10 pointer-events-none">
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
                        <div className="w-1 h-1 bg-purple-400 rounded-full opacity-30"></div>
                    </div>
                ))}

                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
            </div>

            {/* Decorative Pattern Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none z-10">
                <div className="absolute top-16 left-16 w-24 h-24 border border-purple-400 rounded-full"></div>
                <div className="absolute top-32 right-24 w-20 h-20 border border-white rounded-full"></div>
                <div className="absolute bottom-48 left-24 w-28 h-28 border border-purple-400 rounded-full"></div>
                <div className="absolute bottom-52 right-20 w-16 h-16 border border-white rounded-full"></div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-20 min-h-screen flex flex-col">
                {/* Hero Section */}
                <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                    {/* Logo Section */}
                    <div className={`text-center mb-8 transition-all duration-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="relative inline-block">
                            <h1 className="text-5xl md:text-7xl font-light bg-gradient-to-r from-purple-400 via-white to-purple-300 bg-clip-text text-transparent mb-2 tracking-widest">
                                ANANKA
                            </h1>
                            <div className="absolute -top-2 -right-6 opacity-60">
                                <Sparkles className="w-6 h-6 text-amber-400" />
                            </div>
                            <div className="absolute -top-1 -left-4 opacity-40">
                                <Star className="w-4 h-4 text-purple-400" />
                            </div>
                        </div>
                    </div>

                    {/* Subtitle */}
                    <div className={`text-center mb-12 transition-all duration-1500 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <p className="text-xl md:text-2xl text-gray-300 font-light mb-2 tracking-wide">
                            Your Complete Wedding Marketplace
                        </p>
                        <p className="text-md md:text-md text-gray-300 font-light mb-4 tracking-wide">
                            By I Putu Andika Putra
                        </p>
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto"></div>
                    </div>

                    {/* Rotating Icon */}
                    <div className={`mb-12 transition-all duration-1500 delay-600 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                        <div className="relative w-20 h-20 mx-auto">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-spin" style={{ animationDuration: '8s' }}></div>

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

                    {/* Development Status */}
                    <div className={`mb-8 transition-all duration-1500 delay-900 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="bg-gradient-to-r from-gray-900/50 via-purple-900/20 to-gray-900/50 backdrop-blur-sm rounded-lg px-6 py-3 border border-purple-700/30 shadow-xl">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                                <span className="text-purple-200 font-light text-base tracking-wide">
                                    DALAM PENGEMBANGAN
                                </span>
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className={`text-center mb-16 transition-all duration-1500 delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <p className="text-gray-400 text-base font-light mb-2 max-w-md">
                            Menyatukan keluarga untuk merencanakan pernikahan impian
                        </p>
                        <p className="text-purple-400 text-sm font-light">
                            Sesuatu yang indah akan segera hadir ✨
                        </p>
                    </div>
                </div>

                {/* Journey Section */}
                <div className={`relative z-20 px-6 py-16 transition-all duration-1500 delay-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="max-w-4xl mx-auto">
                        {/* Section Header */}
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-light bg-gradient-to-r from-purple-400 via-white to-purple-300 bg-clip-text text-transparent mb-4 tracking-wide">
                                Jejak Perjalanan
                            </h2>
                            <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
                                Dari ide hingga menjadi kenyataan, berikut adalah perjalanan pengembangan Ananka
                            </p>
                            <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mt-4"></div>
                        </div>

                        {/* Quote Carousel */}
                        <div className="relative">
                            {/* Background decoration */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-gray-900/20 to-purple-900/10 backdrop-blur-sm rounded-2xl border border-purple-700/20"></div>

                            {/* Quote Content */}
                            <div className="relative p-8 md:p-12">
                                <div className="text-center min-h-[300px] flex flex-col justify-center">
                                    {/* Quote Icon */}
                                    <div className="mb-6">
                                        <Quote className="w-12 h-12 text-purple-400/50 mx-auto" />
                                    </div>

                                    {/* Current Quote */}
                                    <div className="mb-8">
                                        <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed italic mb-6 max-w-3xl mx-auto">
                                            &#34;{journeyQuotes[currentQuote].quote}&#34;
                                        </p>

                                        {/* Author Info */}
                                        <div className="flex items-center justify-center space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center text-xl">
                                                {journeyQuotes[currentQuote].avatar}
                                            </div>
                                            <div className="text-left">
                                                <p className="text-purple-300 font-medium">
                                                    {journeyQuotes[currentQuote].author}
                                                </p>
                                                <p className="text-gray-400 text-sm">
                                                    {journeyQuotes[currentQuote].role}
                                                </p>
                                                <p className="text-gray-500 text-xs">
                                                    {journeyQuotes[currentQuote].date}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Navigation Controls */}
                                    <div className="flex items-center justify-center space-x-4">
                                        <button
                                            onClick={prevQuote}
                                            className="w-10 h-10 bg-gradient-to-r from-purple-600/20 to-purple-500/20 hover:from-purple-500/30 hover:to-purple-400/30 rounded-full flex items-center justify-center border border-purple-500/30 transition-all duration-300 group"
                                        >
                                            <ChevronLeft className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
                                        </button>

                                        {/* Dots Indicator */}
                                        <div className="flex space-x-2">
                                            {journeyQuotes.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentQuote(index)}
                                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                        index === currentQuote
                                                            ? 'bg-purple-400 w-8'
                                                            : 'bg-gray-600 hover:bg-gray-500'
                                                    }`}
                                                />
                                            ))}
                                        </div>

                                        <button
                                            onClick={nextQuote}
                                            className="w-10 h-10 bg-gradient-to-r from-purple-600/20 to-purple-500/20 hover:from-purple-500/30 hover:to-purple-400/30 rounded-full flex items-center justify-center border border-purple-500/30 transition-all duration-300 group"
                                        >
                                            <ChevronRight className="w-5 h-5 text-purple-300 group-hover:text-white transition-colors" />
                                        </button>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-6 max-w-md mx-auto">
                                        <div className="bg-gray-700/30 rounded-full h-1 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-purple-500 to-purple-400 h-full transition-all duration-500"
                                                style={{ width: `${((currentQuote + 1) / journeyQuotes.length) * 100}%` }}
                                            />
                                        </div>
                                        <p className="text-gray-500 text-xs text-center mt-2">
                                            {currentQuote + 1} dari {journeyQuotes.length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="relative z-20 py-6">
                    <div className="text-center">
                        <p className="text-gray-600 text-xs font-light">
                            © 2025 ANANKA • Made with ❤️ for Perfect Weddings
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default AnankaMerdekaLanding;