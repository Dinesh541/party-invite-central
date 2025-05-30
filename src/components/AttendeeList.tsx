
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Users, Calendar, MessageCircle, UserCheck, UserX } from 'lucide-react';

interface RSVP {
  id: string;
  name: string;
  email: string;
  phone?: string;
  attendance: string;
  guests?: string;
  dietary_restrictions?: string;
  message?: string;
  created_at: string;
}

const AttendeeList = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const [rsvps, setRSVPs] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRSVPs = async () => {
    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRSVPs(data || []);
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRSVPs();
  }, [refreshTrigger]);

  const attendingCount = rsvps.filter(rsvp => rsvp.attendance === 'yes').length;
  const notAttendingCount = rsvps.filter(rsvp => rsvp.attendance === 'no').length;
  const totalGuests = rsvps
    .filter(rsvp => rsvp.attendance === 'yes')
    .reduce((total, rsvp) => {
      const guestCount = rsvp.guests ? parseInt(rsvp.guests.replace(/[^0-9]/g, '')) || 0 : 0;
      return total + 1 + guestCount; // +1 for the person themselves
    }, 0);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading RSVPs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">Who's Coming</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center justify-center mb-2">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{attendingCount}</div>
            <div className="text-sm text-green-700">Attending</div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{totalGuests}</div>
            <div className="text-sm text-blue-700">Total Guests</div>
          </div>
          
          <div className="bg-red-50 rounded-xl p-4">
            <div className="flex items-center justify-center mb-2">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
            <div className="text-2xl font-bold text-red-600">{notAttendingCount}</div>
            <div className="text-sm text-red-700">Can't Make It</div>
          </div>
        </div>
      </div>

      {rsvps.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No RSVPs yet. Be the first to respond!</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {rsvps.map((rsvp) => (
            <div
              key={rsvp.id}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                rsvp.attendance === 'yes'
                  ? 'border-green-200 bg-green-50 hover:border-green-300'
                  : 'border-red-200 bg-red-50 hover:border-red-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    {rsvp.attendance === 'yes' ? (
                      <UserCheck className="w-5 h-5 text-green-600 mr-2" />
                    ) : (
                      <UserX className="w-5 h-5 text-red-600 mr-2" />
                    )}
                    <h3 className="font-semibold text-gray-800">{rsvp.name}</h3>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{rsvp.email}</p>
                    {rsvp.phone && <p>📞 {rsvp.phone}</p>}
                    {rsvp.guests && rsvp.attendance === 'yes' && (
                      <p className="text-blue-600">👥 Bringing: {rsvp.guests}</p>
                    )}
                    {rsvp.dietary_restrictions && (
                      <p className="text-orange-600">🍽️ Dietary: {rsvp.dietary_restrictions}</p>
                    )}
                    {rsvp.message && (
                      <div className="flex items-start mt-2">
                        <MessageCircle className="w-4 h-4 text-purple-600 mr-1 mt-0.5 flex-shrink-0" />
                        <p className="text-purple-600 italic">"{rsvp.message}"</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="text-xs text-gray-400 ml-4">
                  {new Date(rsvp.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendeeList;
