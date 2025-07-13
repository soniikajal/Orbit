'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EditText from '@/components/ui/EditText';

const TimetablePage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [notifyEmail, setNotifyEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Pre-fill email if user is logged in
  useEffect(() => {
    if (session?.user?.email) {
      setNotifyEmail(session.user.email);
      console.log('Email prefilled:', session.user.email);
    }
  }, [session]);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail) {
      // Here you would typically send the email to your backend
      console.log('Notify email:', notifyEmail);
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        // Reset to user's email if logged in, otherwise empty
        setNotifyEmail(session?.user?.email || '');
      }, 3000);
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="w-full flex flex-col justify-start items-end">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center">
        <div className="w-full flex flex-col justify-start items-start mt-2 sm:mt-3 md:mt-4">
          <main className="w-full py-2">
            {/* Page Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-2 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Timetable
            </h1>

            {/* Coming Soon Section */}
            <div className="w-full flex flex-col items-center justify-center min-h-[60vh] text-center">
              {/* Coming Soon Text */}
              <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-normal mb-8 text-global-2" style={{ fontFamily: 'Lost in south, serif' }}>
                Coming Soon
              </h2>

              {/* Notify Me Section */}
              <div className="w-full max-w-md mx-auto mb-8">
                {!subscribed ? (
                  <form onSubmit={handleNotifySubmit} className="space-y-4">
                    <div>
                      <EditText
                        value={notifyEmail}
                        onChange={(value) => setNotifyEmail(typeof value === 'string' ? value : value.target.value)}
                        placeholder="Enter your email to get notified"
                        type="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-global-2 bg-global-5 font-space-grotesk focus:outline-none focus:ring-2 focus:ring-global-3 focus:border-transparent"
                        required
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full bg-global-3 hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-semibold font-space-grotesk transition-all duration-300 hover:transform hover:scale-105"
                    >
                      Notify Me
                    </button>
                  </form>
                ) : (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-global-6 rounded-full mb-4">
                      <svg className="w-8 h-8 text-global-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-global-2 mb-2 font-space-grotesk">Thank you!</h3>
                    <p className="text-global-5 font-space-grotesk">We'll notify you when the Timetable is ready!</p>
                  </div>
                )}
              </div>

              {/* Go Back Button */}
              <button
                onClick={handleGoBack}
                className="bg-global-1 hover:bg-global-2 text-white px-8 py-3 rounded-lg font-semibold font-space-grotesk transition-all duration-300 hover:transform hover:scale-105"
              >
                ← Go Back
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TimetablePage;
