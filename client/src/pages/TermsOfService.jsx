import React from 'react';

const TermsOfService = () => {
  const lastUpdated = 'September 13, 2026';

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 md:p-12">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Terms of Service
          </h1>
          <p className="text-gray-500">Last updated: {lastUpdated}</p>
        </div>

        {/* Intro */}
        <p className="text-gray-700 mb-8 leading-relaxed">
          Welcome to TourHome. These Terms of Service ("Terms") govern your access to and use of the
          TourHome website, mobile application, and services (collectively, the "Platform"). By
          accessing or using TourHome, you agree to be bound by these Terms. If you do not agree,
          please do not use the Platform.
        </p>

        {/* Section 1 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            By creating an account, browsing listings, making a booking, or listing a property, you
            confirm that:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>You are at least 18 years of age.</li>
            <li>You have the legal capacity to enter into a binding contract.</li>
            <li>All information you provide is accurate and up to date.</li>
            <li>You will comply with all applicable local, state, and national laws.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            2. User Accounts
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            To access certain features, you must register for an account. You agree to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Provide accurate, current, and complete information during registration.</li>
            <li>Maintain the security of your password and account.</li>
            <li>Notify us immediately of any unauthorized use of your account.</li>
            <li>Be responsible for all activities that occur under your account.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-3">
            We reserve the right to suspend or terminate accounts that violate these Terms.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            3. Bookings and Payments
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong>3.1 Booking Contract:</strong> When you book a stay through TourHome, you enter
            into a direct contract with the host. TourHome acts as a platform connecting guests and
            hosts, not as a party to the rental agreement.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong>3.2 Payments:</strong> All payments must be made through the Platform. Prices
            displayed include applicable taxes unless stated otherwise. Payment is processed at the
            time of booking confirmation.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            <strong>3.3 Cancellations and Refunds:</strong> Cancellation policies are set by each
            host and displayed on the listing page. Refunds are processed within 5–7 business days
            to the original payment method.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>3.4 Service Fees:</strong> TourHome charges a service fee on each booking.
            This fee is displayed at checkout and is non-refundable except in cases of host
            cancellation.
          </p>
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            4. Host Responsibilities
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            If you list a property on TourHome, you agree to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Provide accurate descriptions, photos, and pricing for your listing.</li>
            <li>Ensure the property is safe, clean, and as described.</li>
            <li>Honor all confirmed bookings.</li>
            <li>Comply with all local laws, including tax and licensing requirements.</li>
            <li>Respond to guest inquiries in a timely manner.</li>
            <li>Not discriminate against guests based on race, religion, gender, or nationality.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            5. Guest Responsibilities
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            As a guest, you agree to:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Provide accurate personal information during booking.</li>
            <li>Respect the property, neighbors, and house rules.</li>
            <li>Not use the property for illegal activities.</li>
            <li>Report any damage or issues to the host promptly.</li>
            <li>Leave the property in the condition you found it.</li>
            <li>Pay for any damage caused during your stay.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            6. Prohibited Activities
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            You may not:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Use the Platform for any illegal purpose.</li>
            <li>Post false, misleading, or fraudulent information.</li>
            <li>Harass, threaten, or discriminate against other users.</li>
            <li>Attempt to circumvent our fees or payment system.</li>
            <li>Scrape, copy, or reverse-engineer the Platform.</li>
            <li>Use automated bots or scripts to access the Platform.</li>
            <li>Impersonate another person or entity.</li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            7. Reviews and Content
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            By posting reviews, photos, or other content, you grant TourHome a worldwide,
            non-exclusive, royalty-free license to use, reproduce, and display that content. You
            confirm that:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>You own or have rights to the content you post.</li>
            <li>Your content does not violate any third-party rights.</li>
            <li>Your reviews are honest and based on actual experiences.</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            8. Limitation of Liability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            TourHome is a platform that connects guests and hosts. We are not responsible for the
            conduct of users, the condition of properties, or any disputes between guests and
            hosts. To the maximum extent permitted by law, TourHome shall not be liable for any
            indirect, incidental, special, or consequential damages arising from your use of the
            Platform.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            9. Termination
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may suspend or terminate your account at any time if you violate these Terms or
            engage in fraudulent or harmful behavior. You may delete your account at any time from
            your Profile settings. Upon termination, your right to use the Platform ceases
            immediately.
          </p>
        </section>

        {/* Section 10 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            10. Changes to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update these Terms from time to time. We will notify you of material changes
            via email or through the Platform. Your continued use after changes means you accept
            the updated Terms.
          </p>
        </section>

        {/* Section 11 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            11. Governing Law
          </h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms are governed by the laws of India. Any disputes shall be subject to the
            exclusive jurisdiction of the courts of Pune, Maharashtra.
          </p>
        </section>

        {/* Section 12 */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            12. Contact
          </h2>
          <p className="text-gray-700 leading-relaxed">
            For questions about these Terms, contact us at:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mt-3">
            <p className="text-gray-700">
              <strong>TourHome Technologies Pvt. Ltd.</strong><br />
              Email: legal@tourhome.com<br />
              Address: 3rd Floor, Tech Park, Pune, Maharashtra 411001, India
            </p>
          </div>
        </section>

        {/* Footer note */}
        <div className="border-t border-gray-200 pt-6 mt-8">
          <p className="text-sm text-gray-500 text-center">
            By using TourHome, you acknowledge that you have read, understood, and agreed to these
            Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;