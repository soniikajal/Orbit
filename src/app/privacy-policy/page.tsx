import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-2 text-gray-700 italic">Last updated: August 1, 2025</p>
      <p className="mb-6 text-gray-700">
        Orbit ("we", "us", or "our") is a student-built platform for the NSUT community, providing campus navigation, event boards, study resources, and peer connections. We value your privacy and are committed to protecting your data. This policy explains what we collect, how we use it, and your rights.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">1. What We Collect</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li><b>Account & Contact Info:</b> Name and email address when you sign up, log in, or submit forms (e.g., event submissions, queries, bug reports).</li>
        <li><b>Event & Resource Data:</b> Details you submit for events, study resources, or Launchpad projects (e.g., event title, description, venue, date, organizer info).</li>
        <li><b>Uploaded Files:</b> Images or documents you upload (e.g., bug screenshots, study materials).</li>
        <li><b>Usage Data:</b> Non-personal data such as page views, navigation actions, and device/browser type, collected to improve the platform.</li>
        <li><b>Authentication Data:</b> If you use Google or other OAuth providers, we receive your basic profile info for login purposes only.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">2. How We Use Your Data</h2>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>To display and manage campus events, resources, and navigation features</li>
        <li>To allow you to submit, edit, or delete your own events and resources</li>
        <li>To respond to your queries, feedback, or bug reports</li>
        <li>To send you important notifications (e.g., event approvals, admin messages)</li>
        <li>To improve Orbit’s features and user experience</li>
        <li>To protect the security and integrity of the platform</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">3. When We Share Data</h2>
      <p className="mb-2 text-gray-700">We do <b>not</b> sell your data. We only share it:</p>
      <ul className="list-disc ml-6 text-gray-700 mb-4">
        <li>With trusted service providers (e.g., database, hosting, analytics) who help us run Orbit</li>
        <li>With NSUT admins or moderators for event/resource approval and moderation</li>
        <li>If required by law, or to protect Orbit, its users, or others</li>
        <li>With your explicit consent (e.g., if you choose to share a project or event publicly)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Cookies & Analytics</h2>
      <p className="mb-4 text-gray-700">We may use cookies or analytics tools (like Google Analytics) to understand how Orbit is used and to improve the platform. You can control cookies in your browser settings.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Data Security</h2>
      <p className="mb-4 text-gray-700">We use industry-standard security practices to protect your data. However, no online service is 100% secure. Please use strong passwords and do not share sensitive information unnecessarily.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">6. Your Choices & Rights</h2>
      <p className="mb-4 text-gray-700">You can access, update, or request deletion of your personal data by contacting us. You may also delete your events or resources if you are the creator. For any privacy concerns, email us at the address below.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">7. Changes to This Policy</h2>
      <p className="mb-4 text-gray-700">We may update this Privacy Policy as Orbit evolves. Changes will be posted here with a new date. Please check back periodically.</p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">8. Contact Us</h2>
      <p className="mb-4 text-gray-700">Questions or concerns? Email us at <a href="mailto:nsutorbit@gmail.com" className="underline text-blue-600">nsutorbit@gmail.com</a>. We’re happy to help!</p>

      <div className="mt-8">
        <Link href="/" className="text-blue-600 underline">Back to Home</Link>
      </div>
    </div>
  );
}
