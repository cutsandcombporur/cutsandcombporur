interface BusinessHoursProps {
  hours?: {
    day: string;
    open: string;
    close: string;
    isClosed?: boolean;
  }[];
}

function BusinessHours({ hours }: BusinessHoursProps) {
  // Default business hours if not provided
  const defaultHours = [
    { day: 'Monday', open: '8:00 AM', close: '9:00 PM', isClosed: false },
    { day: 'Tuesday', open: '8:00 AM', close: '9:00 PM', isClosed: false },
    { day: 'Wednesday', open: '8:00 AM', close: '9:00 PM', isClosed: false },
    { day: 'Thursday', open: '8:00 AM', close: '9:00 PM', isClosed: false },
    { day: 'Friday', open: '8:00 AM', close: '9:00 PM', isClosed: false },
    { day: 'Saturday', open: '8:00 AM', close: '9:00 PM', isClosed: false },
    { day: 'Sunday', open: '8:00 AM', close: '9:00 PM', isClosed: false },
  ];

  const businessHours = hours || defaultHours;

  // Get current day of the week (0 = Sunday, 1 = Monday, etc.)
  const currentDayIndex = new Date().getDay();
  
  // Convert to match our array (0 = Monday, 6 = Sunday)
  const getCurrentDayName = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[currentDayIndex];
  };

  const currentDay = getCurrentDayName();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Business Hours
      </h2>

      <div className="space-y-3">
        {businessHours.map((schedule) => {
          const isToday = schedule.day === currentDay;
          
          return (
            <div
              key={schedule.day}
              className={`flex justify-between items-center py-3 px-4 rounded-lg transition-colors ${
                isToday
                  ? 'bg-primary-50 border-2 border-primary-200'
                  : 'bg-secondary-50 border-2 border-transparent'
              }`}
            >
              <span
                className={`font-semibold ${
                  isToday ? 'text-primary-700' : 'text-secondary-700'
                }`}
              >
                {schedule.day}
                {isToday && (
                  <span className="ml-2 text-xs bg-primary-600 text-white px-2 py-1 rounded-full">
                    Today
                  </span>
                )}
              </span>
              <span
                className={`${
                  isToday ? 'text-primary-600 font-medium' : 'text-secondary-600'
                } ${schedule.isClosed ? 'text-red-600' : ''}`}
              >
                {schedule.isClosed ? 'Closed' : `${schedule.open} - ${schedule.close}`}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-secondary-200">
        <p className="text-sm text-secondary-600 text-center">
          Walk-ins welcome • Appointments recommended
        </p>
      </div>
    </div>
  );
}

export default BusinessHours;
