import { useState, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import servicesData from '../data/services.json';
import DatePicker from '../components/common/DatePicker';

interface ServiceOption {
  id: string;
  name: string;
  category: string;
}

function Booking() {
  const [searchParams] = useSearchParams();
  const preSelectedService = searchParams.get('service') || '';

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState(preSelectedService);
  const [contactNo, setContactNo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Flatten all services from male and female into a single list
  const allServices: ServiceOption[] = Object.values(servicesData)
    .flatMap((gender) => Object.values(gender).flat())
    .map((s: any) => ({ id: s.id, name: s.name, category: s.category }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Find the selected service name
    const selectedService = allServices.find((s) => s.id === service);
    const serviceName = selectedService ? selectedService.name : service;

    // Save to Google Sheet
    fetch('https://script.google.com/macros/s/AKfycbxZ2H1ig8T_vTnGFZIS6qQ08Ar2YCvpTeXH586pFgtMlXMe1Zk3vGhNBhEFsCSivXo35A/exec', {
      method: 'POST',
      body: JSON.stringify({ name, date, time, service: serviceName, contact: contactNo }),
    }).catch(() => {});

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="section-padding bg-secondary-50 min-h-[60vh] flex items-center">
        <div className="container-custom max-w-lg text-center">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold mb-2">Booking Submitted!</h2>
            <p className="text-secondary-600 mb-4">Thank you, {name}. We'll confirm your appointment shortly.</p>
            <p className="text-secondary-500 text-sm mb-6">Date: {date}{time && ` | Time: ${time}`}</p>
            <a href={import.meta.env.BASE_URL} className="btn-primary inline-block px-6 py-3">Back to Home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-secondary-50">
      <div className="container-custom max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Book an Appointment</h1>
          <p className="text-secondary-600">Fill in the details below and we'll get back to you.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-md space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">Name</label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-secondary-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">Booking Date</label>
            <DatePicker value={date} onChange={setDate} required />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-secondary-700 mb-1">Preferred Time <span className="text-secondary-400">(optional)</span></label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-secondary-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-secondary-700 mb-1">Service Required</label>
            <select
              id="service"
              required
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full border border-secondary-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select a service</option>
              {allServices.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-secondary-700 mb-1">Contact Number</label>
            <input
              id="contact"
              type="tel"
              required
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              className="w-full border border-secondary-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Your phone number"
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-primary py-3 text-lg font-semibold min-h-[44px]"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;
