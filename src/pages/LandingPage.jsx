import React, { useEffect } from 'react';
import { SiShopware } from 'react-icons/si';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,     // animation duration
      offset: 100,       // how far the element is from the top before animation triggers
      easing: 'ease-in-out',
      once: true         // only animate once on scroll
    });
  }, []);
  
  return (
    <div className="font-['Roboto'] min-h-screen bg-white text-gray-800 relative overflow-hidden">
      {/* Header */}
      <header className="flex justify-between items-center p-6 shadow-md bg-gray-50">
        <div className="flex items-center gap-2">
          <SiShopware className="text-3xl animate-pulse" />
          <h1 className="text-xl font-bold">StatusBit</h1>
        </div>
        <nav className="hidden md:flex gap-6 text-gray-600 text-sm font-medium">
          <a href="/" className="hover:text-orange-400 transition">Home</a>
          <a href="#" className="hover:text-orange-400 transition">About</a>
          <a href="#" className="hover:text-orange-400 transition">Services</a>
          <a href="#" className="hover:text-orange-400 transition">Portfolio</a>
          <a href="#" className="hover:text-orange-400 transition">Pricing</a>
          <a href="#" className="hover:text-orange-400 transition">Contact</a>
        </nav>
        <a href="/auth">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition duration-300">
            Sign In
          </button>
        </a>
      </header>

      {/* Main */}
      <main className="text-center px-6 py-20 max-w-4xl mx-auto">
        <h2 className="text-4xl text-gray-500 opacity-100 transition-opacity duration-700" data-aos="fade-up">
          Welcome to
        </h2>
        <h1 className="text-6xl font-bold mt-2 text-gray-800 transition-transform duration-700 ease-out transform hover:scale-105" data-aos="fade-up">
          Explore Real-time Monitoring
        </h1>
        <p className="mt-4 text-gray-600 transition-opacity duration-700" data-aos="fade-up">
          Track the status of your services, manage incidents, and keep your users informed — all in one place.
        </p>

        {/* CTA */}
        <div className="mt-8 flex justify-center items-center gap-4" data-aos="fade-up">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-full px-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          />
          <a href="/auth">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition duration-300">
              Get Started
            </button>
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-col md:flex-row justify-center gap-12 mt-24" data-aos="fade-up">
          {[
            {
              title: 'Multiple Services',
              desc: 'Monitor your website, API, database, and more.',
            },
            {
              title: 'Live Updates',
              desc: 'Real-time incident updates via WebSocket.',
            },
            {
              title: 'Team Collaboration',
              desc: 'Manage services and incidents across teams.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center hover:scale-105 transform transition duration-300"
            >
              <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
              <p className="text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <section id="about" className="py-20 px-4 bg-white" data-aos="fade-up">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left: Illustration */}
          <div className="w-full lg:w-1/2">
            <img
              src="https://png.pngtree.com/png-clipart/20230914/original/pngtree-website-clipart-website-concept-with-computer-cartoon-vector-png-image_11092719.png" // make sure to replace this path with the actual image path
              alt="About Illustration"
              className="w-full max-w-md mx-auto"
            />
          </div>

          {/* Right: Text Content */}
          <div className="w-full lg:w-1/2">
            <p className="text-orange-600 font-semibold mb-2">About Us</p>
            <h2 className="text-4xl font-semibold text-gray-800">Smart Service Monitoring</h2>
            <h1 className="text-5xl font-bold text-black mt-2">Built for Transparency & Uptime</h1>
            <p className="text-gray-600 mt-6">
              This platform helps teams monitor service health, manage real-time incidents, and keep users informed through a unified status page.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-6">
              {/* Feature 1 */}
              <div className="flex items-start gap-4">
                <div className="bg-orange-600 p-3 rounded-full">
                  <img src="https://static.thenounproject.com/png/2015998-200.png" alt="Service" className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Multi-Service Monitoring</h4>
                  <p className="text-gray-600">Track APIs, websites, and databases — all in one place.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4">
                <div className="bg-orange-600 p-3 rounded-full">
                  <img src="https://static.thenounproject.com/png/4303242-200.png" alt="Real-time" className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Real-Time Incident Updates</h4>
                  <p className="text-gray-600">Use WebSocket for instant visibility on status changes.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4">
                <div className="bg-orange-600 p-3 rounded-full">
                  <img src="https://www.pngplay.com/wp-content/uploads/8/Team-Icon-Background-PNG-Image.png" alt="Team" className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Team & Organization Access</h4>
                  <p className="text-gray-600">Support multiple tenants with secure access controls.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-100 border-t border-gray-200 text-gray-700 py-14 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo & About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-orange-500 text-3xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 8 4-16 3 8h4" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-gray-800">StatusBit</span>
            </div>
            <p className="text-sm text-gray-600">
              Real-time monitoring and incident communication for your critical services. Keep users informed, build trust, and resolve faster.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-orange-500 transition">Home</a></li>
              <li><a href="#about" className="hover:text-orange-500 transition">About</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Services</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Contact</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Status Page</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition">Documentation</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">API Reference</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Changelog</a></li>
              <li><a href="#" className="hover:text-orange-500 transition">Help Center</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Get in Touch</h4>
            <p className="text-sm text-gray-600">Have a question or feedback? We'd love to hear from you.</p>
            <p className="mt-3 text-sm"><strong>Email:</strong> support@statusbit.app</p>
            <p className="text-sm"><strong>Twitter:</strong> @statusbit</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} StatusBit. All rights reserved.
        </div>
      </footer>




      {/* Scroll Top / Chat Button */}
      <div className="absolute bottom-10 right-10 animate-bounce">
        <button className="bg-white border border-gray-300 rounded-full p-3 shadow-md hover:shadow-lg transition">
          Chat
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
