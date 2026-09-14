import React, { useState } from 'react';

const HelpCenter = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      category: 'Booking',
      questions: [
        {
          q: 'How do I book a stay on TourHome?',
          a: 'Search for your destination, select dates and number of guests, browse listings, and click "Book Now". Fill in your details and confirm. You will receive a confirmation email once the host approves your booking.'
        },
        {
          q: 'Can I cancel my booking?',
          a: 'Yes. You can cancel from "My Bookings" page. Cancellations made 7+ days before check-in get a full refund. Cancellations within 7 days may incur a partial charge depending on the host\'s policy.'
        },
        {
          q: 'How do I know if a booking is confirmed?',
          a: 'You will see the status change to "Confirmed" in My Bookings, and you will receive an email notification from TourHome.'
        },
        {
          q: 'What if the host cancels my booking?',
          a: 'You will be fully refunded automatically. We also help you find an alternative stay and may offer a discount coupon as compensation.'
        }
      ]
    },
    {
      category: 'Payments',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept UPI, credit/debit cards, net banking, and popular wallets. All payments are processed through secure gateways.'
        },
        {
          q: 'When am I charged?',
          a: 'Your card is charged at the time of booking confirmation. For some listings, a partial advance may be charged with the balance due at check-in.'
        },
        {
          q: 'How do refunds work?',
          a: 'Refunds are processed within 5–7 business days to your original payment method. You will receive an email once the refund is initiated.'
        }
      ]
    },
    {
      category: 'Account',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click "Sign Up" on the top-right corner, enter your name, email, and password, then verify your email via the link we send you.'
        },
        {
          q: 'I forgot my password. What do I do?',
          a: 'Click "Forgot Password" on the login page, enter your registered email, and follow the reset link we send you.'
        },
        {
          q: 'How do I become a host?',
          a: 'Log in, go to your Profile, and click "Become a Host". Fill in your property details, upload photos, set your price, and publish your listing.'
        }
      ]
    },
    {
      category: 'Reviews',
      questions: [
        {
          q: 'Who can write a review?',
          a: 'Only guests who have completed a stay through TourHome can write a review. This keeps reviews authentic and trustworthy.'
        },
        {
          q: 'Can I edit or delete my review?',
          a: 'Yes. You can edit or delete your review from your Profile page within 30 days of posting.'
        }
      ]
    },
    {
      category: 'Safety',
      questions: [
        {
          q: 'How does TourHome verify hosts?',
          a: 'We verify email, phone number, and government-issued ID for all hosts. Listings are reviewed before going live.'
        },
        {
          q: 'What should I do if I feel unsafe?',
          a: 'Contact local authorities immediately if in danger. Then report the issue to us at safety@tourhome.com. We take all reports seriously and act within 24 hours.'
        }
      ]
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about booking, payments, and hosting on TourHome.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search for help..."
            className="w-full bg-white px-6 py-4 text-gray-900 placeholder-gray-500 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* FAQ Categories */}
        {faqs.map((category, catIndex) => (
          <div key={catIndex} className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {category.category}
            </h2>
            <div className="space-y-3">
              {category.questions.map((faq, qIndex) => {
                const uniqueIndex = `${catIndex}-${qIndex}`;
                return (
                  <div
                    key={uniqueIndex}
                    className="bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    <button
                      onClick={() => toggleFaq(uniqueIndex)}
                      className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-800">{faq.q}</span>
                      <span className="text-2xl text-gray-500">
                        {openFaq === uniqueIndex ? '−' : '+'}
                      </span>
                    </button>
                    {openFaq === uniqueIndex && (
                      <div className="px-6 pb-4 text-gray-600 border-t border-gray-100 pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Still Need Help */}
        <div className="bg-blue-50 rounded-lg p-8 text-center mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Still need help?
          </h3>
          <p className="text-gray-600 mb-6">
            Our support team is available 24/7 to assist you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@tourhome.com"
              className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;