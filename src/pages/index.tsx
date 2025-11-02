// pages/index.js
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const heroRef = useRef(null);

    useEffect(() => {
        setMounted(true);

        // Set the target date to July 1, 2027 (middle of the year)
        const targetDate = new Date('2027-07-01T00:00:00');

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const d = Math.floor(difference / (1000 * 60 * 60 * 24));
                const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const s = Math.floor((difference % (1000 * 60)) / 1000);

                setDays(d);
                setHours(h);
                setMinutes(m);
                setSeconds(s);
            }
        }, 1000);

        const handleScroll = () => {
            setScrollY(window.scrollY);

            // Determine active section based on scroll position
            const sections = ['home', 'about', 'features', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Here you would typically send the email to your backend
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 3000);
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-x-hidden">
            <Head>
                <title>Ananka - Plan Your Better Wedding</title>
                <meta name="description" content="Ananka is coming soon! The ultimate platform for hiring wedding vendors. Launching in 2027." />
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>

            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white bg-opacity-90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
                    <div
                        className="text-3xl md:text-4xl font-bold text-gray-800 cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                        onClick={() => scrollToSection('home')}
                    >
                        ananka
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {['home', 'about', 'features', 'contact'].map((section) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className={`capitalize transition-all duration-300 ${activeSection === section ? 'text-purple-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                {section}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className={`block w-8 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`block w-8 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-8 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden bg-white bg-opacity-95 backdrop-blur-md transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-64' : 'max-h-0'}`}>
                    <div className="px-6 py-4 space-y-4">
                        {['home', 'about', 'features', 'contact'].map((section) => (
                            <button
                                key={section}
                                onClick={() => scrollToSection(section)}
                                className={`block w-full text-left capitalize transition-all duration-300 ${activeSection === section ? 'text-purple-600 font-semibold' : 'text-gray-600 hover:text-gray-900'}`}
                            >
                                {section}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 md:px-12 pt-20">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                    {/* Floating Elements */}
                    <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-pink-300 rounded-full opacity-20 animate-float"></div>
                    <div className="absolute top-3/4 right-1/4 w-16 h-16 bg-purple-300 rounded-full opacity-20 animate-float animation-delay-2000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-yellow-300 rounded-full opacity-20 animate-float animation-delay-4000"></div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent opacity-70"></div>

                <div className="relative z-10 text-center max-w-5xl mx-auto">
                    <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-gray-800 ${mounted ? 'animate-fade-in' : 'opacity-0'}`} style={{ fontFamily: 'Playfair Display, serif' }}>
                        Plan Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Better Wedding</span>
                    </h1>
                    <p className={`text-xl md:text-2xl lg:text-3xl text-gray-600 mb-8 max-w-3xl mx-auto ${mounted ? 'animate-fade-in animation-delay-200' : 'opacity-0'}`} style={{ fontFamily: 'Poppins, sans-serif' }}>
                        The ultimate platform for discovering and booking the perfect wedding vendors
                    </p>
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 ${mounted ? 'animate-fade-in animation-delay-400' : 'opacity-0'}`}>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            Get Notified
                        </button>
                        <button
                            onClick={() => scrollToSection('about')}
                            className="px-8 py-4 bg-white text-gray-800 rounded-full font-medium hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200"
                        >
                            Learn More
                        </button>
                    </div>

                    {/* Countdown Timer */}
                    <div className={`bg-white bg-opacity-80 backdrop-blur-lg rounded-2xl p-8 shadow-xl ${mounted ? 'animate-fade-in animation-delay-600' : 'opacity-0'}`}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Launching in</h3>
                        <div className="flex justify-center space-x-4 md:space-x-8">
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl font-bold text-gray-800">{days}</div>
                                <div className="text-sm md:text-base text-gray-600">Days</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl font-bold text-gray-800">{hours}</div>
                                <div className="text-sm md:text-base text-gray-600">Hours</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl font-bold text-gray-800">{minutes}</div>
                                <div className="text-sm md:text-base text-gray-600">Minutes</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-5xl font-bold text-gray-800">{seconds}</div>
                                <div className="text-sm md:text-base text-gray-600">Seconds</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                            About Ananka
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            We&#39;re building a revolutionary platform to transform how couples plan their weddings and connect with vendors.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold text-gray-800">Simplifying Wedding Planning</h3>
                            <p className="text-gray-600">
                                Ananka will be your all-in-one solution for finding, vetting, and booking the perfect wedding vendors. From photographers to florists, caterers to venues, we&#39;ll connect you with the best professionals in the industry.
                            </p>
                            <p className="text-gray-600">
                                Our platform is designed with both couples and vendors in mind, creating a seamless experience that saves time, reduces stress, and ensures your special day is everything you&#39;ve dreamed of.
                            </p>
                            <button
                                onClick={() => scrollToSection('features')}
                                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                            >
                                Explore Features
                            </button>
                        </div>
                        <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 opacity-80"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-white text-center p-8">
                                    <h3 className="text-2xl font-bold mb-2">Coming 2027</h3>
                                    <p className="text-lg">The future of wedding planning</p>
                                    <p className="pt-4 pb-1">by</p>
                                    <p className="text-lg">I Putu Andika Putra</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6 md:px-12 bg-white bg-opacity-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                            What to Expect
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Ananka will revolutionize the wedding planning experience with these innovative features.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Vendor Discovery</h3>
                            <p className="text-gray-600">
                                Browse through a curated selection of top-rated wedding vendors in your area, with detailed profiles, portfolios, and reviews.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Planning Tools</h3>
                            <p className="text-gray-600">
                                Stay organized with our comprehensive planning tools, including budget trackers, timeline builders, and vendor management.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Secure Booking</h3>
                            <p className="text-gray-600">
                                Book vendors with confidence through our secure payment system and transparent contracts, all managed within the platform.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Be the First to Know
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Sign up for our newsletter to get updates on our progress and early access when we launch.
                    </p>

                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="flex-grow px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                        >
                            Notify Me
                        </button>
                    </form>

                    {subscribed && (
                        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg animate-fade-in">
                            Thank you for subscribing! We&#39;ll keep you updated.
                        </div>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 px-6 md:px-12 bg-white bg-opacity-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Get in Touch
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Have questions or feedback? We&#39;d love to hear from you.
                    </p>

                    <div className="flex justify-center space-x-6 mb-8">
                        <a href="#" className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all duration-300 transform hover:scale-110">
                            <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="#" className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all duration-300 transform hover:scale-110">
                            <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        </a>
                        <a href="#" className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-all duration-300 transform hover:scale-110">
                            <svg className="w-6 h-6 text-gray-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                            </svg>
                        </a>
                    </div>

                    <p className="text-gray-600">
                        Email us at: <a href="mailto:info@ananka.id" className="text-purple-600 hover:underline">info@ananka.id</a>
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 md:px-12 bg-gray-100">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center">
                    <div className="text-gray-600 mb-4 md:mb-0">
                        © {new Date().getFullYear()} Ananka. All rights reserved.
                    </div>
                </div>
            </footer>

            <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-fade-in {
          animation: fade-in 1s forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}