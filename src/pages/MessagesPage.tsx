import React, { useState } from 'react';
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { EMPLOYEES } from '../data/dummyData';

export const MessagesPage: React.FC = () => {
  const [selectedEmp, setSelectedEmp] = useState(EMPLOYEES[0]);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'them', text: 'Hi Sarah, did you have a chance to review the Q3 engineering budget proposal?', time: '10:14 AM' },
    { id: 2, sender: 'me', text: 'Yes! I reviewed the figures with Alex Morgan this morning. Everything looks solid.', time: '10:16 AM' },
    { id: 3, sender: 'them', text: 'Awesome. Could you approve the pending hardware request on the EMS portal?', time: '10:18 AM' },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: 'me',
        text: inputMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setInputMsg('');
  };

  return (
    <div className="h-[calc(100vh-140px)] min-h-[500px] flex rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs overflow-hidden">
      {/* Contacts List Sidebar */}
      <div className="w-80 border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800/80">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">Team Direct Messages</h2>
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 pl-8 pr-3 py-1.5 text-xs"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
          {EMPLOYEES.map(emp => (
            <button
              key={emp.id}
              onClick={() => setSelectedEmp(emp)}
              className={`w-full p-3.5 flex items-center space-x-3 text-left transition-colors ${
                selectedEmp.id === emp.id
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-l-4 border-blue-600'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
              }`}
            >
              <div className="relative">
                <img src={emp.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                <span className="w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900 absolute bottom-0 right-0" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {emp.firstName} {emp.lastName}
                  </p>
                  <span className="text-[10px] text-slate-400">10:18 AM</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">{emp.designation}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50 dark:bg-slate-950/20">
        {/* Chat Header */}
        <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={selectedEmp.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {selectedEmp.firstName} {selectedEmp.lastName}
              </h3>
              <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                Online • {selectedEmp.department}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-slate-400">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
              <Phone className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
              <Video className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1 shadow-xs ${
                  m.sender === 'me'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
                <p
                  className={`text-[9px] text-right ${
                    m.sender === 'me' ? 'text-blue-200' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Send Input Box */}
        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center space-x-2">
          <button type="button" className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={inputMsg}
            onChange={e => setInputMsg(e.target.value)}
            placeholder="Type a secure message..."
            className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-4 py-2 text-xs text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-blue-500"
          />
          <button
            type="submit"
            className="p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
