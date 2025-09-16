import React, { useState, useEffect } from 'react';
import { Search, Heart, Camera, Music, Utensils, MapPin, Sparkles, Star, ArrowRight } from 'lucide-react';

export default function WeddingMarketplace() {
    const [searchQuery, setSearchQuery] = useState('');
    const [, setActiveCategory] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const categories = [
        { icon: MapPin, name: 'Venue', color: 'from-purple-500 to-pink-500', count: '1,200+' },
        { icon: Camera, name: 'Photography', color: 'from-blue-500 to-cyan-500', count: '890+' },
        { icon: Utensils, name: 'Catering', color: 'from-orange-500 to-red-500', count: '650+' },
        { icon: Music, name: 'Entertainment', color: 'from-green-500 to-teal-500', count: '420+' },
        { icon: Sparkles, name: 'Beauty & MUA', color: 'from-pink-500 to-rose-500', count: '780+' },
        { icon: Heart, name: 'Wedding Planner', color: 'from-indigo-500 to-purple-500', count: '340+' }
    ];

    const featuredVendors = [
        {
            name: 'Ethereal Gardens',
            category: 'Premium Venue',
            rating: 4.9,
            reviews: 234,
            price: 'Rp 25M',
            image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=300&fit=crop',
            badge: 'Editor\'s Choice'
        },
        {
            name: 'Lumina Studio',
            category: 'Wedding Photography',
            rating: 4.8,
            reviews: 156,
            price: 'Rp 12M',
            image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop',
            badge: 'Most Booked'
        },
        {
            name: 'Celestial Catering',
            category: 'Fine Dining',
            rating: 4.9,
            reviews: 189,
            price: 'Rp 200k/pax',
            image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop',
            badge: 'Premium'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            {/* Floating Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled ? 'bg-black/90 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center space-x-3">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                ANANKA
              </span>
                        </div>

                        <nav className="hidden md:flex space-x-8">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Vendors</a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Packages</a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Gallery</a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Reviews</a>
                        </nav>

                        <div className="flex items-center space-x-4">
                            <button className="text-gray-300 hover:text-white transition-colors font-medium">Sign In</button>
                            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section with Animated Background */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-black to-pink-900/50"></div>
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                    </div>
                </div>

                <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Main Headline */}
                    <div className="mb-8">
                        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
                Plan Your
              </span>
                            <br />
                            <span className="text-white">Better Wedding</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Discover extraordinary wedding vendors, create magical moments, and bring your perfect day to life with Indonesia&#39;s most luxurious wedding marketplace.
                        </p>
                    </div>

                    {/* Search Section */}
                    <div className="mb-12">
                        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 max-w-4xl mx-auto">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search venues, photographers, caterers..."
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50 focus:bg-white/15 transition-all"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                                    <Search className="w-5 h-5 mr-2" />
                                    Explore Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">5000+</div>
                            <div className="text-gray-400 text-sm">Premium Vendors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">15k+</div>
                            <div className="text-gray-400 text-sm">Happy Couples</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">4.9★</div>
                            <div className="text-gray-400 text-sm">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Explore Premium
              </span>
                            <br />
                            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Wedding Services
              </span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            From intimate ceremonies to grand celebrations, find the perfect vendors for every aspect of your special day.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((category, index) => {
                            const Icon = category.icon;
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 cursor-pointer"
                                    onMouseEnter={() => setActiveCategory(index)}
                                >
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{category.name}</h3>
                                    <p className="text-gray-400 mb-4">{category.count} verified vendors</p>
                                    <div className="flex items-center text-pink-400 group-hover:text-pink-300 transition-colors">
                                        <span className="font-medium">Explore vendors</span>
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Vendors */}
            <section className="py-20 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Featured Vendors
                        </h2>
                        <p className="text-xl text-gray-400">Hand-picked exceptional vendors for your dream wedding</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredVendors.map((vendor, index) => (
                            <div key={index} className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 transform hover:scale-105">
                                <div className="relative h-48 overflow-hidden">
                                    <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        {vendor.badge}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2">{vendor.name}</h3>
                                    <p className="text-gray-400 mb-4">{vendor.category}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-white font-medium">{vendor.rating}</span>
                                            <span className="text-gray-400 text-sm">({vendor.reviews})</span>
                                        </div>
                                        <div className="text-pink-400 font-bold">{vendor.price}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-900/20 to-purple-900/20"></div>
                <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Ready to Plan Your Dream Wedding?
                    </h2>
                    <p className="text-xl text-gray-400 mb-8">
                        Join thousands of couples who found their perfect vendors with Ananka
                    </p>
                    <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105">
                        Start Planning Now
                    </button>
                </div>
            </section>
        </div>
    );
}