
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, Users } from 'lucide-react';

const RSVPForm = ({ onRSVPSubmitted }: { onRSVPSubmitted: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: '',
    guests: '',
    dietaryRestrictions: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.attendance) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert RSVP into database
      const { error: dbError } = await supabase
        .from('rsvps')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            attendance: formData.attendance,
            guests: formData.guests || null,
            dietary_restrictions: formData.dietaryRestrictions || null,
            message: formData.message || null
          }
        ]);

      if (dbError) throw dbError;

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke('send-rsvp-confirmation', {
        body: {
          name: formData.name,
          email: formData.email,
          attendance: formData.attendance,
          guests: formData.guests
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        // Don't fail the whole process if email fails
        toast({
          title: "RSVP submitted successfully!",
          description: "Note: There was an issue sending the confirmation email, but your RSVP is recorded.",
        });
      } else {
        toast({
          title: "RSVP submitted successfully!",
          description: "A confirmation email has been sent to you.",
        });
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        attendance: '',
        guests: '',
        dietaryRestrictions: '',
        message: ''
      });

      onRSVPSubmitted();

    } catch (error) {
      console.error('Error submitting RSVP:', error);
      toast({
        title: "Error submitting RSVP",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-purple-600 mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">RSVP</h2>
        </div>
        <p className="text-gray-600">Let us know if you can make it!</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="mt-1"
            placeholder="Your phone number"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Will you be attending? *
          </Label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="attendance"
                value="yes"
                checked={formData.attendance === 'yes'}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                className="mr-2 text-purple-600"
              />
              <span className="text-gray-700">Yes, I'll be there! 🎉</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="attendance"
                value="no"
                checked={formData.attendance === 'no'}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                className="mr-2 text-purple-600"
              />
              <span className="text-gray-700">Sorry, can't make it 😢</span>
            </label>
          </div>
        </div>

        <div>
          <Label htmlFor="guests" className="text-sm font-medium text-gray-700">
            Number of Guests other than you
          </Label>
          <Input
            id="guests"
            type="text"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            className="mt-1"
            placeholder="e.g., +1, +2, or guest names"
          />
        </div>

        <div>
          <Label htmlFor="dietary" className="text-sm font-medium text-gray-700">
            Dietary Restrictions
          </Label>
          <Input
            id="dietary"
            type="text"
            value={formData.dietaryRestrictions}
            onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
            className="mt-1"
            placeholder="Any food allergies or dietary preferences"
          />
        </div>

        <div>
          <Label htmlFor="message" className="text-sm font-medium text-gray-700">
            Special Message
          </Label>
          <Input
            id="message"
            type="text"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="mt-1"
            placeholder="Any special wishes or notes"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Submit RSVP
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default RSVPForm;
