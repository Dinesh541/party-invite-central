
import React, { useState } from 'react';
import PartyProfile from '@/components/PartyProfile';
import RSVPForm from '@/components/RSVPForm';
import AttendeeList from '@/components/AttendeeList';

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRSVPSubmitted = () => {
    // Trigger refresh of attendee list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-100">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          🎉 Birthday Celebration 🎉
        </h1>
        <p className="text-xl text-gray-600">Join us for an unforgettable celebration!</p>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {/* Party Profile Section */}
        <div className="mb-12">
          <PartyProfile />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* RSVP Form */}
          <div>
            <RSVPForm onRSVPSubmitted={handleRSVPSubmitted} />
          </div>

          {/* Attendee List */}
          <div>
            <AttendeeList refreshTrigger={refreshTrigger} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-8">
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 inline-block">
            <p className="text-gray-600 mb-2">Can't wait to celebrate with you!</p>
            <p className="text-sm text-gray-500">
              For any questions, feel free to reach out directly. 
              Looking forward to an amazing party! 🎈✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
