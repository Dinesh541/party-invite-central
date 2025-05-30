
import React from 'react';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';

const PartyProfile = () => {
  return (
    <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-purple-700 text-white p-8 rounded-3xl shadow-2xl">
      <div className="text-center mb-8">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-6xl">
          🎉
        </div>
        <h1 className="text-4xl font-bold mb-2">You're Invited By Daksh Kalli !!</h1>
        <h2 className="text-2xl font-semibold mb-4">Daksh Kalli's Birthday Celebration</h2>
        <p className="text-lg opacity-90">Join us for an unforgettable birthday bash!</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 mr-3" />
            <h3 className="text-xl font-semibold">Date</h3>
          </div>
          <p className="text-lg">Saturday, June 15th, 2025</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 mr-3" />
            <h3 className="text-xl font-semibold">Time</h3>
          </div>
          <p className="text-lg">12:00 PM onwards</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:col-span-2">
          <div className="flex items-center mb-4">
            <MapPin className="w-6 h-6 mr-3" />
            <h3 className="text-xl font-semibold">Venue</h3>
          </div>
          <p className="text-lg">Gilbert Community Center- 130 N Oak St, Gilbert, AZ 85233</p>
           <p className="text-lg">OAK Room</p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-6 h-6 mr-2 text-pink-200" />
          <span className="text-lg font-medium">Let's make memories together!</span>
        </div>
        <p className="text-sm opacity-80">
          Come ready to dance, laugh, and celebrate another year of life! 
          Food, drinks, and good vibes guaranteed! 🎈
        </p>
      </div>
    </div>
  );
};

export default PartyProfile;
