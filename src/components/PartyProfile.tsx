import React, { useEffect, useState, useRef } from 'react';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const PartyProfile = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const countdownDate = new Date('2025-06-15T11:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = Math.max(0, countdownDate - now);

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance === 0 && !hasCelebrated) {
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
        setHasCelebrated(true);
        audioRef.current?.play();
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [hasCelebrated]);

  return (
    <div className="bg-beige-100 text-gray-800 p-10 rounded-xl shadow-lg max-w-3xl mx-auto mt-10 border border-gray-300 font-serif">
      <audio ref={audioRef} src="/birthday-song.mp3" preload="auto" />
      <div className="text-center mb-10">
        <div className="w-28 h-28 mx-auto mb-5 rounded-full bg-white shadow border-2 border-gray-300 flex items-center justify-center text-5xl">
          🎂
        </div>
        <h1 className="text-4xl font-bold text-gray-700 mb-2">You're Invited to Daksh's Birthday</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">1st Year Celebration</h2>
        <p className="text-md mb-4">We would be delighted to have you join us for this special occasion of joy, laughter, and memories.</p>
        <div className="mt-4 text-xl font-semibold text-white bg-gray-700 rounded px-6 py-3 inline-block shadow-md">
          ⏳ {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s to party!
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-left">
        <div className="bg-white rounded p-5 shadow border border-gray-200">
          <div className="flex items-center mb-2">
            <Calendar className="w-5 h-5 mr-2 text-gray-500" />
            <h3 className="text-lg font-semibold">Date</h3>
          </div>
          <p>Saturday, June 15th, 2025</p>
        </div>

        <div className="bg-white rounded p-5 shadow border border-gray-200">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 mr-2 text-gray-500" />
            <h3 className="text-lg font-semibold">Time</h3>
          </div>
          <p>11:00 AM onwards</p>
        </div>

        <div className="bg-white rounded p-5 shadow border border-gray-200 md:col-span-2">
          <div className="flex items-center mb-2">
            <MapPin className="w-5 h-5 mr-2 text-gray-500" />
            <h3 className="text-lg font-semibold">Venue</h3>
          </div>
          <p>Gilbert Community Center - 130 N Oak St, Gilbert, AZ 85233</p>
          <p>Room: OAK</p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <div className="flex items-center justify-center mb-3">
          <Heart className="w-5 h-5 mr-2 text-red-400" />
          <span className="text-lg font-medium">Cherish the memories with us!</span>
        </div>
        <p className="text-sm text-gray-600 italic mb-6">
          Dress comfortably, bring your smiles, and celebrate Daksh's milestone with cake, fun, and photos! 🎈📷🍰
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <img className="rounded shadow object-cover h-36 w-full" src="/photos/baby1.jpg" alt="Baby Milestone 1" />
          <img className="rounded shadow object-cover h-36 w-full" src="/photos/baby2.jpg" alt="Baby Milestone 2" />
          <img className="rounded shadow object-cover h-36 w-full" src="/photos/baby3.jpg" alt="Baby Milestone 3" />
        </div>
      </div>
    </div>
  );
};

export default PartyProfile;
