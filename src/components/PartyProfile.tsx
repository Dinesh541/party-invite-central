import React, { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';

const PartyProfile = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const countdownDate = new Date('2025-06-15T11:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-rose-300 via-pink-200 to-amber-200 text-gray-900 p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto mt-10 border-4 border-white/50">
      <div className="text-center mb-10">
        <div className="w-36 h-36 mx-auto mb-6 rounded-full bg-white shadow-inner border-4 border-rose-400 flex items-center justify-center text-7xl">
          🧁
        </div>
        <h1 className="text-5xl font-extrabold text-pink-700 mb-2 drop-shadow-sm">You're Invited by Daksh Kalli!</h1>
        <h2 className="text-3xl font-semibold text-rose-600 mb-4">Celebrating Daksh's 1st Birthday 🎂</h2>
        <p className="text-lg font-medium text-gray-700">Come join us for a magical and joyful day full of love, laughter, and cake!</p>
        <div className="mt-6 text-2xl font-semibold text-rose-700 bg-white/70 rounded-xl px-6 py-3 inline-block shadow-lg">
          Countdown: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-rose-100">
          <div className="flex items-center mb-3">
            <Calendar className="w-6 h-6 mr-3 text-rose-500" />
            <h3 className="text-xl font-bold text-rose-700">Date</h3>
          </div>
          <p className="text-lg font-medium">Saturday, June 15th, 2025</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-rose-100">
          <div className="flex items-center mb-3">
            <Clock className="w-6 h-6 mr-3 text-rose-500" />
            <h3 className="text-xl font-bold text-rose-700">Time</h3>
          </div>
          <p className="text-lg font-medium">11:00 AM onwards</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-md border border-rose-100 md:col-span-2">
          <div className="flex items-center mb-3">
            <MapPin className="w-6 h-6 mr-3 text-rose-500" />
            <h3 className="text-xl font-bold text-rose-700">Venue</h3>
          </div>
          <p className="text-lg font-medium">Gilbert Community Center - 130 N Oak St, Gilbert, AZ 85233</p>
          <p className="text-lg font-medium">Room: OAK</p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-6 h-6 mr-2 text-pink-400 animate-pulse" />
          <span className="text-xl font-semibold text-pink-600">Let's make beautiful memories together!</span>
        </div>
        <p className="text-base text-gray-700 italic mb-8">
          Come dressed in your festive best, ready to dance, laugh, and enjoy delicious treats! Good vibes, music, and baby smiles await! 🎈🎶🍰
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <img className="rounded-xl shadow-md object-cover h-40 w-full" src="/photos/baby1.jpg" alt="Baby Milestone 1" />
          <img className="rounded-xl shadow-md object-cover h-40 w-full" src="/photos/baby2.jpg" alt="Baby Milestone 2" />
          <img className="rounded-xl shadow-md object-cover h-40 w-full" src="/photos/baby3.jpg" alt="Baby Milestone 3" />
        </div>
      </div>
    </div>
  );
};

export default PartyProfile;
