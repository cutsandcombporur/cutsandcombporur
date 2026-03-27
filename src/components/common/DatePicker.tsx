import { useState, useRef, useEffect } from 'react';

interface DatePickerProps {
  value: string; // DD/MM/YYYY
  onChange: (value: string) => void;
  required?: boolean;
}

function DatePicker({ value, onChange, required }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const ref = useRef<HTMLDivElement>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Parse DD/MM/YYYY to Date
  const parseValue = (v: string): Date | null => {
    const m = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) return null;
    return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
  };

  const selected = parseValue(value);

  const pad = (n: number) => String(n).padStart(2, '0');

  const selectDate = (day: number) => {
    const formatted = `${pad(day)}/${pad(viewMonth + 1)}/${viewYear}`;
    onChange(formatted);
    setOpen(false);
  };

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    return d < today;
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    return selected.getDate() === day && selected.getMonth() === viewMonth && selected.getFullYear() === viewYear;
  };

  const isToday = (day: number) => {
    const now = new Date();
    return day === now.getDate() && viewMonth === now.getMonth() && viewYear === now.getFullYear();
  };

  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const weekDays = ['Su','Mo','Tu','We','Th','Fr','Sa'];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Prevent past month navigation
  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border border-secondary-300 rounded-lg px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent flex items-center justify-between"
      >
        <span className={value ? 'text-secondary-900' : 'text-secondary-400'}>
          {value || 'DD/MM/YYYY'}
        </span>
        <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
      {/* Hidden input for form validation */}
      <input type="hidden" value={value} required={required} />

      {open && (
        <div className="absolute z-50 mt-1 bg-white border border-secondary-200 rounded-lg shadow-lg p-4 w-72">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button type="button" onClick={prevMonth} disabled={!canGoPrev}
              className={`p-1 rounded hover:bg-secondary-100 ${!canGoPrev ? 'opacity-30 cursor-not-allowed' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="font-semibold text-secondary-800">{months[viewMonth]} {viewYear}</span>
            <button type="button" onClick={nextMonth} className="p-1 rounded hover:bg-secondary-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {weekDays.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-secondary-500 py-1">{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const past = isPast(day);
              const sel = isSelected(day);
              const todayMark = isToday(day);
              return (
                <button
                  key={day}
                  type="button"
                  disabled={past}
                  onClick={() => selectDate(day)}
                  className={`w-9 h-9 rounded-full text-sm flex items-center justify-center transition-colors
                    ${past ? 'text-secondary-300 cursor-not-allowed' : 'hover:bg-primary-100 cursor-pointer'}
                    ${sel ? 'bg-primary-600 text-white hover:bg-primary-700' : ''}
                    ${todayMark && !sel ? 'border-2 border-primary-400' : ''}
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;
