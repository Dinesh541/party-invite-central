import React, { useState } from 'react';
import PartyProfile from '@/components/PartyProfile';
import RSVPForm from '@/components/RSVPForm';
import AttendeeList from '@/components/AttendeeList';

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRSVPSubmitted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-cyan-100 to-blue-300 text-blue-900">
      {/* Header */}
      <div className="text-center py-10">
        <h1 className="text-5xl font-bold text-blue-800 drop-shadow-md mb-2">
          🐬 Daksh's 1st Birthday – Under the Sea! 🐠
        </h1>
        <p className="text-xl text-blue-700">Join us for a magical aquatic celebration filled with joy and ocean vibes!</p>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Party Profile Section */}
        <div className="mb-12">
          <PartyProfile />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* RSVP Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6">
            <RSVPForm onRSVPSubmitted={handleRSVPSubmitted} />
          </div>

          {/* Attendee List */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6">
            <AttendeeList refreshTrigger={refreshTrigger} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 py-8">
          <div className="bg-blue-100 border border-blue-200 rounded-2xl p-6 inline-block shadow">
            <p className="text-blue-800 mb-2 font-medium">We can't wait to make waves with you!</p>
            <p className="text-sm text-blue-700 italic">
              Feel free to reach out if you have any questions. Let’s dive into a memorable birthday bash! 🌊🎂🎈
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
