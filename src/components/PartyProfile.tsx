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
    <div className="bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover bg-center text-white p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto mt-10 border-4 border-blue-200 font-sans backdrop-blur-md bg-opacity-80">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" preload="auto" />
      <div className="text-center mb-10">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-blue-100 shadow-lg border-4 border-blue-400 flex items-center justify-center text-6xl animate-bounce">
          🐠
        </div>
        <h1 className="text-5xl font-extrabold text-cyan-100 mb-2 drop-shadow-lg">Daksh Turns One!</h1>
        <h2 className="text-2xl font-medium text-blue-100 mb-4">Come celebrate a year of joy and milestones</h2>
        <p className="text-md text-blue-50"We, Dinesh Kalli and Sai Sruthi Gadde, are delighted to invite you to join us in celebrating the first birthday of our beloved son, Daksh. Your presence will mean a lot to us on this joyful occasion filled with love, laughter, and unforgettable memories.</p>
        <div className="mt-4 text-2xl font-bold text-blue-900 bg-white rounded-full px-8 py-3 inline-block shadow-md animate-pulse">
          ⏳ {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s to go!
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 text-left">
        <div className="bg-white/80 text-blue-900 rounded-xl p-6 shadow-md border border-blue-100">
          <div className="flex items-center mb-2">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            <h3 className="text-lg font-semibold">Date</h3>
          </div>
          <p className="text-md">Saturday, June 14th, 2025</p>
        </div>

        <div className="bg-white/80 text-blue-900 rounded-xl p-6 shadow-md border border-blue-100">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 mr-2 text-blue-600" />
            <h3 className="text-lg font-semibold">Time</h3>
          </div>
          <p className="text-md">11:00 AM onwards</p>
        </div>

        <div className="bg-white/80 text-blue-900 rounded-xl p-6 shadow-md border border-blue-100 md:col-span-2">
          <div className="flex items-center mb-2">
            <MapPin className="w-5 h-5 mr-2 text-blue-600" />
            <h3 className="text-lg font-semibold">Venue</h3>
          </div>
          <p className="text-md">Gilbert Community Center - 130 N Oak St, Gilbert, AZ 85233</p>
          <p className="text-md">Room: OAK</p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-5 h-5 mr-2 text-cyan-200 animate-ping" />
          <span className="text-lg font-medium text-cyan-100">Celebrate love, laughter, and baby giggles!</span>
        </div>
        <p className="text-sm text-blue-100 italic mb-6">
          Dress playfully, bring your smiles, and get ready to dance, eat cake, and make memories! 🎈🎶🍰
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <img className="rounded-xl shadow-lg object-cover h-40 w-full transform hover:scale-105 transition duration-300" src="https://images.unsplash.com/photo-1562577309-2592ab84b1bc" alt="Ocean Baby 1" />
          <img className="rounded-xl shadow-lg object-cover h-40 w-full transform hover:scale-105 transition duration-300" src="https://images.unsplash.com/photo-1555685812-4b943f1cb0eb" alt="Ocean Baby 2" />
          <img className="rounded-xl shadow-lg object-cover h-40 w-full transform hover:scale-105 transition duration-300" src="https://images.unsplash.com/photo-1609838463761-f02f4a06b391" alt="Ocean Baby 3" />
        </div>
      </div>
    </div>
  );
};

export default PartyProfile;
