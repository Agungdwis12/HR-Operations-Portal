import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PERFORMANCE_REVIEWS } from '../data/dummyData';
import { PerformanceReview } from '../types';
import { Award, TrendingUp, Target, CheckCircle2, Star, UserCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import toast from 'react-hot-toast';

export const Performance: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || 'Admin';
  const canConductReview = ['Admin', 'HR Manager', 'Department Head'].includes(role);

  const [reviews, setReviews] = useState<PerformanceReview[]>(PERFORMANCE_REVIEWS);
  const [isAppraisalModalOpen, setIsAppraisalModalOpen] = useState(false);

  // New Appraisal State
  const [evalEmployee, setEvalEmployee] = useState('Alexander Vance');
  const [evalRating, setEvalRating] = useState('4.8');
  const [evalFeedback, setEvalFeedback] = useState('');

  const handleCreateAppraisal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evalFeedback) {
      toast.error('Please enter review feedback summary');
      return;
    }

    const created: PerformanceReview = {
      id: `prf-${Date.now()}`,
      employeeId: 'EMP-1001',
      employeeName: evalEmployee,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      department: 'Engineering',
      designation: 'Senior Lead Architect',
      rating: Number(evalRating),
      kpisAchieved: 9,
      totalKpis: 10,
      goalsCompleted: 5,
      totalGoals: 5,
      reviewer: 'HR Director',
      feedback: evalFeedback,
      reviewDate: new Date().toISOString().split('T')[0],
    };

    setReviews([created, ...reviews]);
    toast.success(`Performance evaluation saved for ${evalEmployee}`);
    setIsAppraisalModalOpen(false);
    setEvalFeedback('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Performance Reviews & Key Results
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track annual appraisal scorecards, KPI achievements, and top employee rankings.
          </p>
        </div>
        {canConductReview && (
          <Button
            variant="gradient"
            size="sm"
            onClick={() => setIsAppraisalModalOpen(true)}
            icon={<Award className="w-4 h-4" />}
          >
            Conduct Appraisal
          </Button>
        )}
      </div>

      {/* Top Performers Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/20 shadow-xl text-white">
        <div className="flex items-center space-x-2 text-amber-400 mb-3">
          <Star className="w-5 h-5 fill-amber-400" />
          <h3 className="text-sm font-bold uppercase tracking-wider">Q2 Top Performers Circle</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {reviews.slice(0, 3).map((item, idx) => (
            <div key={item.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-3">
              <span className="font-extrabold text-amber-400 text-lg">#{idx + 1}</span>
              <img src={item.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-xs font-bold text-white">{item.employeeName}</p>
                <p className="text-[10px] text-slate-400">{item.department}</p>
                <p className="text-xs font-extrabold text-amber-400 mt-0.5">{item.rating} / 5.0 Rating</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ratings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map(rev => (
          <div
            key={rev.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4"
          >
            <div className="flex items-center space-x-3">
              <img src={rev.avatar} alt="" className="w-11 h-11 rounded-2xl object-cover" />
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{rev.employeeName}</h4>
                <p className="text-xs text-slate-500">{rev.designation}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Evaluation Score:</span>
              <span className="font-extrabold text-amber-500 text-sm flex items-center">
                <Star className="w-4 h-4 fill-amber-400 mr-1" /> {rev.rating} / 5.0
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>KPIs Achieved:</span>
                <span className="font-bold">{rev.kpisAchieved} / {rev.totalKpis}</span>
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{ width: `${(rev.kpisAchieved / rev.totalKpis) * 100}%` }}
                />
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1">
                <span>Goals Completed:</span>
                <span className="font-bold">{rev.goalsCompleted} / {rev.totalGoals}</span>
              </div>
              <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${(rev.goalsCompleted / rev.totalGoals) * 100}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 italic bg-slate-50 dark:bg-slate-800/30 p-2.5 rounded-xl">
              &quot;{rev.feedback}&quot;
            </p>
          </div>
        ))}
      </div>

      {/* Appraisal Modal */}
      <Modal
        isOpen={isAppraisalModalOpen}
        onClose={() => setIsAppraisalModalOpen(false)}
        title="Conduct Performance Review"
        description="Record evaluation score, feedback, and key result achievements."
      >
        <form onSubmit={handleCreateAppraisal} className="space-y-4">
          <Input
            label="Employee Name"
            value={evalEmployee}
            onChange={e => setEvalEmployee(e.target.value)}
          />
          <Input
            label="Rating Score (Out of 5.0)"
            type="number"
            step="0.1"
            value={evalRating}
            onChange={e => setEvalRating(e.target.value)}
          />
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Reviewer Summary & Feedback
            </label>
            <textarea
              rows={4}
              value={evalFeedback}
              onChange={e => setEvalFeedback(e.target.value)}
              placeholder="State key strengths and developmental growth areas..."
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsAppraisalModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient">
              Save Evaluation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
