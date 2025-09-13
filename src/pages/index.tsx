import React, { useState, useEffect } from 'react';
import {
    Calendar,
    Users,
    Camera,
    Crown,
    ChevronLeft,
    ChevronRight,
    Quote,
    Image,
    Play
} from 'lucide-react';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    description: string;
    avatar: string;
    skills: string[];
    joinDate: string;
}

interface JourneyQuote {
    id: number;
    quote: string;
    author: string;
    role: string;
    date: string;
    avatar: string;
}

interface GalleryItem {
    id: number;
    type: 'image' | 'video';
    title: string;
    description: string;
    date: string;
    thumbnail: string;
}

const AnankaMerdekaLanding = () => {
    const [activeSection, setActiveSection] = useState('team');
    const [currentTeamMember, setCurrentTeamMember] = useState(0);
    const [currentQuote, setCurrentQuote] = useState(0);
    const teamMembers: TeamMember[] = [
        {
            id: 1,
            name: "I Putu Andika Putra",
            role: "Founder & Developer",
            description: "Visioner di balik Ananka, menggabungkan passion teknologi dengan pengalaman perencanaan pernikahan untuk menciptakan solusi yang meaningful. Dengan pengalaman lebih dari 7 tahun di industri teknologi, Putu memiliki visi untuk mengubah cara pasangan merencanakan pernikahan mereka melalui teknologi yang mudah digunakan dan comprehensive.",
            avatar: "/images/ceo_ananka.jpg",
            skills: ["Android", "React", "Next JS", "Product Strategy", "System Architecture", "Team Leadership"],
            joinDate: "Januari 2018"
        }
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
            avatar: "☕"
        }
    ];

    const galleryItems: GalleryItem[] = [
        {
            id: 1,
            type: 'image',
            title: 'Brainstorming Session #1',
            description: 'Tim berkumpul merencanakan fitur-fitur utama Ananka',
            date: 'Januari 2026',
            thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
        },
        {
            id: 2,
            type: 'video',
            title: 'Prototype Testing',
            description: 'User testing pertama dengan calon pengantin',
            date: 'Januari 2026',
            thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop'
        },
        {
            id: 3,
            type: 'image',
            title: 'Team Outing',
            description: 'Refreshing setelah milestone pertama tercapai',
            date: 'Januari 2026',
            thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop'
        },
        {
            id: 4,
            type: 'image',
            title: 'First Demo Day',
            description: 'Presentasi konsep Ananka kepada mentors',
            date: 'Januari 2026',
            thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop'
        },
        {
            id: 5,
            type: 'image',
            title: 'Wedding Expo Research',
            description: 'Riset pasar di pameran pernikahan Jakarta',
            date: 'Januari 2026',
            thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop'
        },
        {
            id: 6,
            type: 'video',
            title: 'Development Sprint',
            description: 'Sesi coding marathon untuk fitur core platform',
            date: 'Januari 2026',
            thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop'
        }
    ];

    const menuItems = [
        { id: 'team', label: 'Tim Ananka', icon: Users, count: teamMembers.length },
        { id: 'gallery', label: 'Galeri Momen', icon: Camera, count: galleryItems.length },
        { id: 'journey', label: 'Jejak Perjalanan', icon: Quote, count: journeyQuotes.length },
    ];

    useEffect(() => {
        const quoteInterval = setInterval(() => {
            if (activeSection === 'journey') {
                setCurrentQuote((prev) => (prev + 1) % journeyQuotes.length);
            }
        }, 8000);

        return () => clearInterval(quoteInterval);
    }, [activeSection, journeyQuotes.length]);

    const nextTeamMember = () => {
        setCurrentTeamMember((prev) => (prev + 1) % teamMembers.length);
    };

    const prevTeamMember = () => {
        setCurrentTeamMember((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    };

    const renderMainContent = () => {
        switch (activeSection) {
            case 'team':
                return (
                    <div className="flex items-center justify-center min-h-[80vh]">
                        <div className="max-w-6xl mx-auto">
                            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-3xl p-12 border border-purple-500/20 backdrop-blur-sm">
                                <div className="flex flex-col lg:flex-row items-center lg:items-center space-y-8 lg:space-y-0 lg:space-x-12">
                                    {/* Avatar */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-purple-400/30 shadow-2xl">
                                            <img
                                                src={teamMembers[currentTeamMember].avatar}
                                                alt={teamMembers[currentTeamMember].name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 text-center lg:text-left max-w-2xl">
                                        <h2 className="text-5xl md:text-6xl font-light text-white mb-4 leading-tight">
                                            {teamMembers[currentTeamMember].name}
                                        </h2>
                                        <p className="text-purple-300 text-2xl md:text-3xl mb-6 font-light">
                                            {teamMembers[currentTeamMember].role}
                                        </p>
                                        <p className="text-gray-200 text-xl leading-relaxed mb-8">
                                            {teamMembers[currentTeamMember].description}
                                        </p>

                                        {/* Skills */}
                                        <div className="mb-8">
                                            <p className="text-gray-300 text-lg mb-4 font-light">Keahlian & Teknologi:</p>
                                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                                {teamMembers[currentTeamMember].skills.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-4 py-2 bg-purple-600/30 border border-purple-400/40 rounded-full text-purple-100 text-sm font-medium hover:bg-purple-600/40 transition-colors"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Join Date */}
                                        <div className="flex items-center justify-center lg:justify-start space-x-3">
                                            <Calendar className="w-5 h-5 text-purple-400" />
                                            <p className="text-gray-300 text-lg">
                                                Memulai perjalanan sejak <span className="text-purple-300 font-medium">{teamMembers[currentTeamMember].joinDate}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Controls */}
                            {teamMembers.length > 1 && (
                                <div className="flex items-center justify-center mt-8 space-x-6">
                                    <button
                                        onClick={prevTeamMember}
                                        className="flex items-center justify-center w-12 h-12 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 hover:border-purple-400/50 rounded-full transition-all duration-200 group"
                                    >
                                        <ChevronLeft className="w-6 h-6 text-purple-300 group-hover:text-white" />
                                    </button>

                                    {/* Dots indicator */}
                                    <div className="flex space-x-2">
                                        {teamMembers.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentTeamMember(index)}
                                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                    index === currentTeamMember
                                                        ? 'bg-purple-400 w-8'
                                                        : 'bg-gray-600 hover:bg-gray-500'
                                                }`}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        onClick={nextTeamMember}
                                        className="flex items-center justify-center w-12 h-12 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 hover:border-purple-400/50 rounded-full transition-all duration-200 group"
                                    >
                                        <ChevronRight className="w-6 h-6 text-purple-300 group-hover:text-white" />
                                    </button>
                                </div>
                            )}

                            {/* Team member counter */}
                            <div className="text-center mt-4">
                                <p className="text-gray-400 text-sm">
                                    {currentTeamMember + 1} dari {teamMembers.length} anggota tim
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case 'gallery':
                return (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-light bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent mb-2">
                                Galeri Momen
                            </h2>
                            <p className="text-gray-400">Dokumentasi perjalanan pengembangan Ananka</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {galleryItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
                                >
                                    <div className="relative">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            {item.type === 'video' ? (
                                                <Play className="w-12 h-12 text-white" />
                                            ) : (
                                                <Image className="w-12 h-12 text-white" />
                                            )}
                                        </div>
                                        <div className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded text-white text-xs">
                                            JUST SAMPLE
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-white font-medium mb-2">{item.title}</h3>
                                        <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                                        <p className="text-gray-500 text-xs">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default: // journey
                return (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl font-light bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent mb-2">
                                Jejak Perjalanan
                            </h2>
                            <p className="text-gray-400">Dari ide hingga menjadi kenyataan</p>
                        </div>

                        {/* Current Quote Display */}
                        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/20">
                            <div className="text-center">
                                <Quote className="w-12 h-12 text-purple-400/50 mx-auto mb-6" />
                                <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed italic mb-6 max-w-4xl mx-auto">
                                    &#34;{journeyQuotes[currentQuote].quote}&#34;
                                </p>
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center text-xl">
                                        {journeyQuotes[currentQuote].avatar}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-purple-300 font-medium">{journeyQuotes[currentQuote].author}</p>
                                        <p className="text-gray-400 text-sm">{journeyQuotes[currentQuote].role}</p>
                                        <p className="text-gray-500 text-xs">{journeyQuotes[currentQuote].date}</p>
                                    </div>
                                </div>

                                {/* Progress indicator */}
                                <div className="mt-6 flex justify-center space-x-2">
                                    {journeyQuotes.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentQuote(index)}
                                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                index === currentQuote ? 'bg-purple-400 w-8' : 'bg-gray-600 hover:bg-gray-500'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* All Quotes List */}
                        <div className="space-y-4">
                            <h3 className="text-xl text-white font-light">Semua Momen</h3>
                            {journeyQuotes.map((quote, index) => (
                                <div
                                    key={quote.id}
                                    onClick={() => setCurrentQuote(index)}
                                    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                                        index === currentQuote
                                            ? 'bg-purple-600/20 border border-purple-400/50'
                                            : 'bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/30'
                                    }`}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                                            {quote.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-300 text-sm mb-2 line-clamp-2">&#34;{quote.quote}&#34;</p>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-purple-300 text-sm font-medium">{quote.author}</p>
                                                    <p className="text-gray-500 text-xs">{quote.role}</p>
                                                </div>
                                                <p className="text-gray-500 text-xs">{quote.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex">
            {/* Sidebar */}
            <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                            <Crown className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-light text-white">ANANKA</h1>
                            <p className="text-gray-400 text-sm">Wedding Marketplace</p>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg px-4 py-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                            <span className="text-purple-200 text-sm">DALAM PENGEMBANGAN</span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 p-6">
                    <div className="space-y-2">
                        {menuItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                                        activeSection === item.id
                                            ? 'bg-purple-600/20 border border-purple-500/30 text-white'
                                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                    }`}
                                >
                                    <IconComponent className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                    <span className="ml-auto text-xs bg-gray-700 px-2 py-1 rounded">
                                        {item.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-800">
                    <div className="text-center">
                        <p className="text-gray-500 text-xs">
                            © 2025 ANANKA
                        </p>
                        <p className="text-gray-600 text-xs">
                            Made with ❤️ for Perfect Weddings
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {renderMainContent()}
                </div>
            </div>

            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
            </div>
        </div>
    );
};

export default AnankaMerdekaLanding;