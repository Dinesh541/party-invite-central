import React, { useEffect, useState, useRef } from 'react';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const PartyProfile = () => {
  const [opened, setOpened] = useState(false);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50">
      <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" preload="auto" />

      {!opened ? (
        <div className="relative cursor-pointer transition-all duration-1000 ease-in-out" onClick={() => setOpened(true)}>
          <img
            src="https://cdn.pixabay.com/photo/2015/07/27/20/16/envelope-862831_1280.png"
            alt="Envelope"
            className="w-60 sm:w-72 md:w-80 animate-bounce"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <p className="text-sm text-gray-700 font-medium bg-white/80 px-2 py-1 rounded">Click to open your invitation</p>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-pink-100 via-rose-200 to-yellow-100 text-gray-900 p-8 sm:p-10 rounded-3xl shadow-2xl max-w-4xl mx-auto border-4 border-rose-200 font-sans animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-white shadow-lg border-4 border-pink-400 flex items-center justify-center text-5xl animate-bounce">
              🎉
            </div>
            <h1 className="text-4xl font-extrabold text-rose-600 mb-2 drop-shadow-lg">Daksh Turns One!</h1>
            <h2 className="text-xl font-medium text-gray-700 mb-3">Come celebrate a year of joy and milestones</h2>
            <p className="text-md text-gray-600">We, Dinesh Kalli and Sai Sruthi Gadde, are delighted to invite you to join us in celebrating the first birthday of our beloved son, Daksh. Your presence will mean a lot to us on this joyful occasion filled with love, laughter, and unforgettable memories.</p>
            <div className="mt-4 text-xl font-bold text-white bg-pink-500 rounded-full px-6 py-2 inline-block shadow-md animate-pulse">
              ⏳ {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s to go!
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white rounded-xl p-6 shadow-md border border-rose-100">
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 mr-2 text-rose-400" />
                <h3 className="text-lg font-semibold text-rose-600">Date</h3>
              </div>
              <p className="text-md text-gray-700">Saturday, June 14th, 2025</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-rose-100">
              <div className="flex items-center mb-2">
                <Clock className="w-5 h-5 mr-2 text-rose-400" />
                <h3 className="text-lg font-semibold text-rose-600">Time</h3>
              </div>
              <p className="text-md text-gray-700">11:00 AM onwards</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-rose-100 md:col-span-2">
              <div className="flex items-center mb-2">
                <MapPin className="w-5 h-5 mr-2 text-rose-400" />
                <h3 className="text-lg font-semibold text-rose-600">Venue</h3>
              </div>
              <p className="text-md text-gray-700">Gilbert Community Center - 130 N Oak St, Gilbert, AZ 85233</p>
              <p className="text-md text-gray-700">Room: OAK</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-5 h-5 mr-2 text-pink-500 animate-ping" />
              <span className="text-lg font-medium text-pink-700">Celebrate love, laughter, and baby giggles!</span>
            </div>
            <p className="text-sm text-gray-600 italic mb-6">
              Dress playfully, bring your smiles, and get ready to dance, eat cake, and make memories! 🎈🎶🍰
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <img className="rounded-xl shadow-lg object-cover h-40 w-full transform hover:scale-105 transition duration-300" src="https://source.unsplash.com/400x300/?baby,smile" alt="Baby Milestone 1" />
              <img className="rounded-xl shadow-lg object-cover h-40 w-full transform hover:scale-105 transition duration-300" src="https://source.unsplash.com/400x300/?baby,laugh" alt="Baby Milestone 2" />
              <img className="rounded-xl shadow-lg object-cover h-40 w-full transform hover:scale-105 transition duration-300" src="https://source.unsplash.com/400x300/?baby,cake" alt="Baby Milestone 3" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartyProfile;
