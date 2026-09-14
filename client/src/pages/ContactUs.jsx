import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend API endpoint
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
            Have a question, feedback, or need help? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send us a message
            </h2>

            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                ✅ Thank you! Your message has been sent. We'll reply within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a topic</option>
                  <option value="booking">Booking Issue</option>
                  <option value="payment">Payment & Refunds</option>
                  <option value="hosting">Hosting Support</option>
                  <option value="account">Account Help</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Support */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-3">📞</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Customer Support
              </h3>
              <p className="text-gray-600 mb-3">
                Available 24/7 for booking and payment issues.
              </p>
              <p className="text-gray-800 font-medium">support@tourhome.com</p>
              <p className="text-gray-800 font-medium">+91 96654 XXXXX</p>
            </div>

            {/* Host Support */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Host Support
              </h3>
              <p className="text-gray-600 mb-3">
                Help with listings, pricing, and guest management.
              </p>
              <p className="text-gray-800 font-medium">hosts@tourhome.com</p>
              <p className="text-gray-800 font-medium">+91 96654 XXXXX</p>
            </div>

            {/* Safety */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Safety & Emergencies
              </h3>
              <p className="text-gray-600 mb-3">
                Report safety concerns. We respond within 24 hours.
              </p>
              <p className="text-gray-800 font-medium">safety@tourhome.com</p>
            </div>

            {/* Office */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Head Office
              </h3>
              <p className="text-gray-600">
                TourHome Technologies Pvt. Ltd.<br />
                3rd Floor, Tech Park<br />
                Pune, Maharashtra 411001<br />
                India
              </p>
            </div>

            {/* Social */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <a href="#" className="text-blue-600 hover:underline">Facebook</a>
                <a href="#" className="text-blue-600 hover:underline">Instagram</a>
                <a href="#" className="text-blue-600 hover:underline">Twitter</a>
                <a href="#" className="text-blue-600 hover:underline">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;