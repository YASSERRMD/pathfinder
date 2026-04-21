/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Roadmap, RoadmapPhase } from '../types';
import { 
  BookOpen, 
  Lightbulb, 
  CheckCircle2, 
  Calendar, 
  ExternalLink, 
  ArrowRight,
  ShieldAlert,
  Target,
  Download,
  Loader2
} from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { RoadmapPDF } from './RoadmapPDF';

interface RoadmapViewProps {
  roadmap: Roadmap;
  onReset: () => void;
}

export function RoadmapView({ roadmap, onReset }: RoadmapViewProps) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPdf = async () => {
    setIsExporting(true);
    try {
      // Generate the PDF blob using @react-pdf/renderer
      // This is a "REAL" PDF (vectorized, searchable) and doesn't rely on screenshots
      const blob = await pdf(<RoadmapPDF roadmap={roadmap} />).toBlob();
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Roadmap-${roadmap.summary.substring(0, 20).replace(/\s+/g, '-')}-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      console.log('Vector PDF Export successful');
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('PDF generation failed. This might be due to a browser restriction. Try opening the app in a new tab using the arrow icon at the top right.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-6xl mx-auto p-4 md:p-8 space-y-12 pb-24 bg-[#F9FAFB]"
      >
        {/* Header Section */}
        <section className="bg-white border-2 border-slate-100 rounded-4xl p-12 text-center space-y-6 shadow-sm overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5F5FF] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
          <motion.div
             initial={{ scale: 0.9 }}
             animate={{ scale: 1 }}
             className="inline-flex p-4 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 mb-2"
          >
            <Target size={32} />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 font-display">
            Your Personalized <span className="text-indigo-600">Roadmap</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
            {roadmap.summary}
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Learning Path - Left Column */}
          <div className="md:col-span-8 space-y-8">
            <div className="flex items-center justify-between px-4">
               <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3 font-display">
                <Calendar className="text-indigo-600" />
                Learning Path
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100">
                {roadmap.phases.length} Phases
              </span>
            </div>
            <div className="space-y-8">
              {roadmap.phases.map((phase, idx) => (
                <div key={`${idx}-${phase.name}`}>
                  <PhaseCard phase={phase} index={idx} />
                </div>
              ))}
            </div>
          </div>

          {/* Action Widgets - Right Column */}
          <div className="md:col-span-4 space-y-8">
            {/* Disclaimers */}
            {roadmap.disclaimers && roadmap.disclaimers.length > 0 && (
              <section className="bg-amber-50 border-2 border-amber-100 rounded-4xl p-8 space-y-4">
                <div className="flex items-center gap-3 text-amber-700">
                  <ShieldAlert size={24} />
                  <h3 className="font-bold uppercase tracking-wider text-xs">Security & Ethics</h3>
                </div>
                <ul className="text-sm text-[#78350f] space-y-2 font-medium leading-relaxed">
                  {roadmap.disclaimers.map((d, i) => <li key={i}>• {d}</li>)}
                </ul>
              </section>
            )}

            {/* First Week Action Plan */}
            <section className="bg-indigo-600 text-white rounded-4xl p-8 space-y-6 shadow-xl shadow-indigo-200 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-20">
                  <Lightbulb size={64} />
               </div>
               <h3 className="text-xl font-bold flex items-center gap-3 relative z-10 px-2 py-0.5">
                First Week Plan
              </h3>
              <ul className="space-y-4 relative z-10">
                {roadmap.firstWeekActionPlan.map((step, i) => (
                  <li key={i} className="flex gap-4 p-4 bg-[rgba(255,255,255,0.1)] rounded-2xl border border-[rgba(255,255,255,0.1)] backdrop-blur-sm">
                    <span className="bg-white text-indigo-600 rounded-lg w-6 h-6 shrink-0 flex items-center justify-center text-xs font-black">
                      {i + 1}
                    </span>
                    <span className="text-sm font-bold leading-snug">{step}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Progress Checkpoints */}
            <section className="bg-white border-2 border-slate-100 rounded-4xl p-8 space-y-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3 px-2 py-0.5">
                Checkpoints
              </h3>
              <ul className="space-y-4">
                {roadmap.progressCheckpoints.map((cp, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <div className="mt-1 w-6 h-6 rounded-full border-2 border-emerald-100 flex items-center justify-center group-hover:border-emerald-500 transition-colors">
                      <CheckCircle2 size={12} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm font-bold text-slate-600 leading-tight">{cp}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 no-print">
               <button 
                onClick={exportToPdf}
                disabled={isExporting}
                title="Save as Image-based PDF"
                className="py-6 bg-white border-2 border-indigo-600 text-indigo-600 rounded-4xl font-extrabold text-sm hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isExporting ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                {isExporting ? "Generating..." : "Download PDF"}
              </button>

              <button 
                onClick={() => window.print()}
                className="py-6 bg-indigo-50 border-2 border-indigo-200 text-indigo-600 rounded-4xl font-extrabold text-sm hover:bg-indigo-100 transition-all flex items-center justify-center gap-2"
              >
                <Target size={18} />
                Print PDF
              </button>
            </div>

            <button 
              onClick={onReset}
              className="w-full py-6 bg-slate-900 text-white rounded-4xl font-extrabold text-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 no-print"
            >
              New Journey
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function PhaseCard({ phase, index }: { phase: RoadmapPhase; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-4xl p-8 border-2 border-slate-100 shadow-sm hover:border-indigo-500 transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
               Phase {index + 1}
             </span>
             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
               {phase.duration}
             </span>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">{phase.name}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {phase.topics.map((t, i) => (
            <span key={i} className="text-[10px] font-bold bg-slate-50 text-slate-500 px-3 py-1.5 rounded-xl border border-slate-200 uppercase tracking-wider">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <BookOpen size={14} className="text-indigo-600" />
            Curated Resources
          </h4>
          <div className="grid gap-4">
            {phase.resources.map((res, i) => (
              <div key={i} className="group p-5 rounded-3xl bg-slate-50 border-2 border-transparent hover:border-indigo-100 hover:bg-white transition-all shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-extrabold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">{res.name}</span>
                  <span className="text-[9px] bg-slate-200 px-2 py-0.5 rounded-lg uppercase text-slate-500 font-black tracking-tighter">
                    {res.type}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-3">{res.description}</p>
                {res.link && (
                   <a href={res.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700">
                     Explore <ExternalLink size={10} />
                   </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <ArrowRight size={14} className="text-indigo-600" />
            Mastery Project
          </h4>
          <div className="p-8 rounded-[32px] bg-indigo-50 border-2 border-indigo-100 h-[calc(100%-2.5rem)] flex flex-col justify-center">
            <p className="text-indigo-900 text-lg font-bold leading-tight mb-4 italic">
              "{phase.project}"
            </p>
            <div className="flex items-center gap-2 text-indigo-400">
                <CheckCircle2 size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Apply Knowledge</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
