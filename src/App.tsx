/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { 
  Message, 
  UserProfile, 
  Roadmap,
} from './types';
import { ChatInterface } from './components/ChatInterface';
import { RoadmapView } from './components/RoadmapView';
import { generateRoadmap, getNextStep } from './services/gemini';
import { BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Pathfinder, your Personalized Learning Roadmap Advisor. I help you master any subject with a plan that fits your life. What would you like to learn today?",
    }
  ]);
  const [profile, setProfile] = useState<UserProfile>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  const handleSendMessage = async (content: string) => {
    // 1. Add user message
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content };
    setMessages(prev => [...prev, userMsg]);
    setIsGenerating(true);

    try {
      // 2. Get next step from LLM
      const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
      const nextStep = await getNextStep(history, profile);

      // 3. Update profile if LLM detected key info
      if (nextStep.profileUpdate) {
        setProfile(prev => ({ ...prev, ...nextStep.profileUpdate }));
      }

      // 4. If profiling is complete, generate the roadmap
      if (nextStep.isComplete) {
        setMessages(prev => [...prev, { 
          id: Date.now().toString() + 'comp', 
          role: 'assistant', 
          content: "Perfect! I have everything I need. Synthesizing your custom learning roadmap now..." 
        }]);
        
        const finalRoadmap = await generateRoadmap({ ...profile, ...nextStep.profileUpdate });
        setRoadmap(finalRoadmap);
      } else {
        // 5. Add next question
        setMessages(prev => [...prev, {
          id: Date.now().toString() + 'ai',
          role: 'assistant',
          content: nextStep.message,
          options: nextStep.options,
          inputType: nextStep.inputType
        }]);
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, {
        id: Date.now().toString() + 'err',
        role: 'assistant',
        content: "I hit a small snag. Could you try answering that again?"
      }]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setProfile({});
    setRoadmap(null);
    setMessages([{
      id: Date.now().toString(),
      role: 'assistant',
      content: "Hello! I'm Pathfinder, your Personalized Learning Roadmap Advisor. What would you like to learn today?",
    }]);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans selection:bg-indigo-100 selection:text-indigo-900 md:px-32">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#F9FAFB]/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
              <BrainCircuit size={24} />
            </div>
            <h1 className="text-2xl font-black font-display tracking-tight text-slate-900">Pathfinder <span className="text-indigo-600">Advisor</span></h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 gap-6">
                <span>Personalized</span>
                <span>Privacy First</span>
            </div>
            {roadmap && (
              <button 
                onClick={handleReset}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
              >
                Reset Journey
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24 min-h-screen">
        <AnimatePresence mode="wait">
          {!roadmap ? (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="container mx-auto px-4"
            >
              <ChatInterface 
                messages={messages} 
                onSendMessage={handleSendMessage} 
                isLoading={isGenerating} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="roadmap"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <RoadmapView roadmap={roadmap} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {!roadmap && (
        <section className="py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 space-y-16">
            <div className="text-center space-y-4">
               <h2 className="text-4xl font-black text-slate-900 font-display tracking-tight">Our Promise</h2>
               <p className="text-slate-500 font-medium max-w-xl mx-auto">No generic curricula. We build paths based on your real constraints, timeline, and life situation.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Define your Topic", color: "bg-indigo-50", text: "text-indigo-600", desc: "Tell us exactly what you want to learn, from Astronomy to Pottery." },
                { title: "Share your Context", color: "bg-emerald-50", text: "text-emerald-600", desc: "We factor in your age, current job, and realistic free time." },
                { title: "Get your Roadmap", color: "bg-amber-50", text: "text-amber-600", desc: "A phase-by-phase plan with real resources and mastery projects." }
              ].map((item, i) => (
                <div key={i} className={`${item.color} rounded-4xl p-10 border-2 border-transparent hover:border-slate-200 transition-all group`}>
                  <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center ${item.text} font-black text-xl shadow-sm mb-6 group-hover:scale-110 transition-transform`}>
                    0{i + 1}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600/80 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 border-t border-slate-100">
        <div>Learning Roadmap Advisor © 2026</div>
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Privacy First</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Human-Centric Approach</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Non-Judgmental Guidance</span>
        </div>
      </footer>
    </div>
  );
}
