import React, { useState, useEffect } from 'react';
import { Heart, Camera, Music, Utensils, MapPin, Sparkles, Star, Sun, Moon, Check, ChevronRight, X, Menu, Grid, List, Play } from 'lucide-react';
import { useRouter } from "next/router";

export default function WeddingMarketplace() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const [theme, setTheme] = useState('light');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [selectedFilter, setSelectedFilter] = useState('all');
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const router = useRouter();
    const handleClick = (category: string) => {
        router.push(`/${category.toLowerCase()}`);
    }

    const categories = [
        { id: 'venue', icon: MapPin, name: 'Venues', color: 'from-rose-400 to-pink-600', count: '1,200+', featured: true },
        { id: 'photography', icon: Camera, name: 'Photography', color: 'from-blue-400 to-indigo-600', count: '890+' },
        { id: 'catering', icon: Utensils, name: 'Catering', color: 'from-amber-400 to-orange-600', count: '650+' },
        { id: 'entertainment', icon: Music, name: 'Entertainment', color: 'from-emerald-400 to-teal-600', count: '420+' },
        { id: 'beauty', icon: Sparkles, name: 'Beauty', color: 'from-purple-400 to-pink-600', count: '780+' },
        { id: 'planning', icon: Heart, name: 'Planners', color: 'from-violet-400 to-purple-600', count: '340+' }
    ];

    const vendors = [
        {
            id: 1,
            name: 'The Glasshouse',
            category: 'venue',
            location: 'Jakarta',
            rating: 4.9,
            reviews: 234,
            price: 'Rp 25M',
            image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop',
            tags: ['Modern', 'Outdoor', 'Luxury'],
            verified: true
        },
        {
            id: 2,
            name: 'Moment Studio',
            category: 'photography',
            location: 'Bali',
            rating: 4.8,
            reviews: 156,
            price: 'Rp 12M',
            image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop',
            tags: ['Cinematic', 'Artistic'],
            verified: true
        },
        {
            id: 3,
            name: 'Saffron Table',
            category: 'catering',
            location: 'Bandung',
            rating: 4.9,
            reviews: 189,
            price: 'Rp 200k/pax',
            image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&h=400&fit=crop',
            tags: ['Fusion', 'Vegetarian Options'],
            verified: false
        },
        {
            id: 4,
            name: 'Bloom Florals',
            category: 'decoration',
            location: 'Yogyakarta',
            rating: 4.7,
            reviews: 98,
            price: 'Rp 8M',
            image: 'https://images.unsplash.com/photo-1747115275646-49725fb5a003?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1631',
            tags: ['Romantic', 'Garden'],
            verified: true
        }
    ];

    const stories = [
        {
            title: "Sarah & Michael's Garden Wedding",
            vendor: "The Glasshouse",
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
            excerpt: "A magical outdoor ceremony surrounded by lush greenery and fairy lights"
        },
        {
            title: "Maya & Rizki's Traditional Celebration",
            vendor: "Kraton Palace",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
            excerpt: "An elegant blend of tradition and modernity in a historic setting"
        }
    ];

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
            {/* Minimalist Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? `${theme === 'dark' ? 'bg-gray-950/90 backdrop-blur-md border-b border-gray-800' : 'bg-white/90 backdrop-blur-md border-b border-gray-100'}`
                    : `${theme === 'dark' ? 'bg-black/20 backdrop-blur-md border-b border-white/10' : 'bg-white/20 backdrop-blur-md border-b border-white/30'}`
            }`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-8">
                            <span style={{ fontFamily: 'Playfair Display, serif' }} className={`text-3xl font-bold ${!isScrolled ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : (theme === 'dark' ? 'text-white' : 'text-gray-900')}`}>ananka</span>
                            <nav className="hidden lg:flex space-x-6">
                                <a href="#" className={`${!isScrolled ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : (theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')} text-sm font-medium transition-colors`}>Explore</a>
                                <a href="#" className={`${!isScrolled ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : (theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')} text-sm font-medium transition-colors`}>Stories</a>
                                <a href="#" className={`${!isScrolled ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : (theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')} text-sm font-medium transition-colors`}>Gallery</a>
                                <a href="#" className={`${!isScrolled ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : (theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900')} text-sm font-medium transition-colors`}>Vendors</a>
                            </nav>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className={`p-2 rounded-lg ${!isScrolled ? (theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-black/10') : (theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100')} transition-colors`}
                            >
                                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                            <button className={`hidden md:block px-4 py-2 text-sm font-medium ${!isScrolled ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : (theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900')} transition-colors`}>Sign In</button>
                            <button className={`hidden md:block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                !isScrolled
                                    ? `${theme === 'dark' ? 'bg-white text-gray-900 hover:bg-gray-200' : 'bg-gray-900 text-white hover:bg-gray-800'}`
                                    : 'bg-black text-white hover:bg-gray-800'
                            }`}>
                                Become a Vendor
                            </button>
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={`lg:hidden p-2 ${!isScrolled ? (theme === 'dark' ? 'text-white' : 'text-gray-900') : (theme === 'dark' ? 'text-gray-300' : 'text-gray-700')}`}
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className={`lg:hidden absolute top-16 left-0 right-0 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b`}>
                        <nav className="px-6 py-4 space-y-3">
                            <a href="#" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium`}>Explore</a>
                            <a href="#" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium`}>Stories</a>
                            <a href="#" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium`}>Gallery</a>
                            <a href="#" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium`}>Vendors</a>
                            <a href="#" className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium`}>Sign In</a>
                        </nav>
                    </div>
                )}
            </header>

            {/* Hero Section with Split Layout */}
            <section className="relative min-h-screen flex items-center">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
                    <img
                        src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop"
                        alt="Wedding"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white">
                            <p className="text-sm font-medium uppercase tracking-wider mb-4 opacity-90">Plan Your Better Wedding</p>
                            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                                Your Dream Wedding
                                <span className="block text-3xl lg:text-5xl mt-2 font-light">Starts Here</span>
                            </h1>
                            <p className="text-lg mb-8 opacity-90 max-w-lg">
                                Connect with Indonesia&#39;s finest wedding vendors. From intimate gatherings to grand celebrations, we make your special day unforgettable.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                                    Start Planning
                                </button>
                                <button className="border border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center justify-center">
                                    <Play className="w-5 h-5 mr-2" />
                                    Watch Video
                                </button>
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <div className={`${theme === 'dark' ? 'bg-gray-900/90' : 'bg-white/90'} backdrop-blur-lg rounded-2xl p-8 shadow-2xl`}>
                                <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Quick Search</h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="What are you looking for?"
                                        className={`w-full ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'} border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500`}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="date"
                                            className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500`}
                                        />
                                        <select className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500`}>
                                            <option>Budget Range</option>
                                            <option>Under 50M</option>
                                            <option>50M - 100M</option>
                                            <option>100M - 200M</option>
                                            <option>Above 200M</option>
                                        </select>
                                    </div>
                                    <button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                                        Search Vendors
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <div className="text-4xl font-bold text-rose-500 mb-2">5,000+</div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Verified Vendors</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-rose-500 mb-2">15,000+</div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Happy Couples</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-rose-500 mb-2">50+</div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Cities Covered</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-rose-500 mb-2">4.9★</div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories with Horizontal Scroll */}
            <section className="py-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Browse Categories</h2>
                            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Find everything you need for your perfect day</p>
                        </div>
                        <button className="hidden md:flex items-center text-rose-500 font-medium hover:text-rose-600 transition-colors">
                            View All
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => handleClick(category.id)}
                                    className={`flex-shrink-0 group relative ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-2xl p-6 w-64 text-left hover:shadow-xl transition-all duration-300 border ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-4`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-1`}>{category.name}</h3>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-3`}>{category.count} vendors</p>
                                    {category.featured && (
                                        <span className="inline-block px-2 py-1 bg-rose-100 text-rose-600 text-xs font-medium rounded-full">
                                            Featured
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Vendor Gallery with Filters */}
            <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
                        <div>
                            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Featured Vendors</h2>
                            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Handpicked professionals for your special day</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="hidden md:flex items-center gap-2">
                                <button
                                    onClick={() => setSelectedFilter('all')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        selectedFilter === 'all'
                                            ? 'bg-rose-500 text-white'
                                            : theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                                    }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setSelectedFilter('verified')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        selectedFilter === 'verified'
                                            ? 'bg-rose-500 text-white'
                                            : theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                                    }`}
                                >
                                    Verified
                                </button>
                                <button
                                    onClick={() => setSelectedFilter('premium')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        selectedFilter === 'premium'
                                            ? 'bg-rose-500 text-white'
                                            : theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                                    }`}
                                >
                                    Premium
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-rose-500 text-white' : theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'}`}
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-rose-500 text-white' : theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'}`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-4 gap-6' : 'space-y-4'}>
                        {vendors.map((vendor) => (
                            <div
                                key={vendor.id}
                                className={`group ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300`}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={vendor.image}
                                        alt={vendor.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {vendor.verified && (
                                        <div className="absolute top-3 left-3 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                                            <Check className="w-3 h-3 text-green-600" />
                                            <span className="text-xs text-white font-medium">Verified</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-1`}>{vendor.name}</h3>
                                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{vendor.location}</p>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{vendor.rating}</span>
                                            <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>({vendor.reviews})</span>
                                        </div>
                                        <span className="text-sm font-bold text-rose-500">{vendor.price}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {vendor.tags.map((tag, index) => (
                                            <span key={index} className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Wedding Stories Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>Real Wedding Stories</h2>
                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Get inspired by real couples who celebrated their love</p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {stories.map((story, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
                                    <img
                                        src={story.image}
                                        alt={story.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <p className="text-sm font-medium mb-2 opacity-90">Featured at {story.vendor}</p>
                                        <h3 className="text-2xl font-bold mb-2">{story.title}</h3>
                                        <p className="opacity-90">{story.excerpt}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <button className="px-8 py-3 border-2 border-rose-500 text-rose-500 rounded-lg font-medium hover:bg-rose-500 hover:text-white transition-colors">
                            View All Stories
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={`py-20 ${theme === 'dark' ? 'bg-gradient-to-r from-rose-900/20 to-pink-900/20' : 'bg-gradient-to-r from-rose-50 to-pink-50'}`}>
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Ready to Create Your Dream Wedding?
                    </h2>
                    <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-8`}>
                        Join thousands of couples who found their perfect vendors through Ananka
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-4 rounded-lg font-medium hover:shadow-xl transition-all">
                            Get Started Free
                        </button>
                        <button className={`px-8 py-4 rounded-lg font-medium border ${theme === 'dark' ? 'border-gray-700 text-white hover:bg-gray-800' : 'border-gray-300 text-gray-900 hover:bg-gray-100'} transition-colors`}>
                            Talk to an Expert
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className={`py-12 ${theme === 'dark' ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} border-t`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <span style={{ fontFamily: 'Playfair Display, serif' }} className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} block mb-4`}>ananka</span>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                                Making wedding dreams come true across Indonesia
                            </p>
                        </div>
                        <div>
                            <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Company</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className={`text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>About</a></li>
                                <li><a href="#" className={`text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Careers</a></li>
                                <li><a href="#" className={`text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Press</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Resources</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className={`text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Blog</a></li>
                                <li><a href="#" className={`text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Guides</a></li>
                                <li><a href="#" className={`text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Help Center</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>Legal</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className={`text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Privacy</a></li>
                                <li><a href="#" className={`text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Terms</a></li>
                                <li><a href="#" className={`text-sm ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Cookies</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={`pt-8 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} flex flex-col md:flex-row justify-between items-center`}>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            © 2025 Ananka. All rights reserved.
                        </p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                            <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                            </a>
                            <a href="#" className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}