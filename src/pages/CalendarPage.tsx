import React, { useState } from 'react';
import { CALENDAR_EVENTS } from '../data/dummyData';
import { CalendarEvent } from '../types';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import toast from 'react-hot-toast';

export const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(CALENDAR_EVENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('2026-07-25');
  const [time, setTime] = useState('10:00 AM - 11:30 AM');
  const [type, setType] = useState<'meeting' | 'holiday' | 'birthday' | 'deadline'>('meeting');

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error('Event title is required');
      return;
    }

    const created: CalendarEvent = {
      id: `ev-${Date.now()}`,
      title,
      date,
      time,
      type,
      location: 'Zoom Conference Room 1',
    };

    setEvents([...events, created]);
    toast.success(`Scheduled event "${title}" on ${date}`);
    setIsModalOpen(false);
    setTitle('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Corporate Events & Holidays Calendar
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage meetings, town halls, deadlines, payroll cutoff dates, and employee birthdays.
          </p>
        </div>
        <Button
          variant="gradient"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Events Feed List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2 text-indigo-600 dark:text-indigo-400" /> July 2026 Schedule
            </h3>
            <div className="flex items-center space-x-1">
              <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold px-2 text-slate-800 dark:text-slate-200">July 2026</span>
              <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {events.map(ev => (
              <div
                key={ev.id}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between"
              >
                <div className="space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                    {ev.type}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{ev.title}</h4>
                  <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {ev.time}</span>
                    {ev.location && <span className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1" /> {ev.location}</span>}
                  </div>
                </div>
                <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-200">
                  {ev.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar Side Summary */}
        <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Key Milestones</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            All company-wide events, national holidays, and critical payroll cutoff windows are synchronized across HR portals.
          </p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Corporate Event"
        description="Add a new event or deadline to the global company calendar."
      >
        <form onSubmit={handleAddEvent} className="space-y-4">
          <Input
            label="Event Title"
            placeholder="Q3 Executive Review Meeting"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
            <Input
              label="Time Slot"
              placeholder="02:00 PM - 03:30 PM"
              value={time}
              onChange={e => setTime(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Event Category
            </label>
            <select
              value={type}
              onChange={e => setType(e.target.value as typeof type)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100"
            >
              <option value="meeting">Meeting / Briefing</option>
              <option value="holiday">Holiday / Event</option>
              <option value="birthday">Birthday Celebration</option>
              <option value="deadline">Deadline Cutoff</option>
            </select>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient">
              Save Event
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
