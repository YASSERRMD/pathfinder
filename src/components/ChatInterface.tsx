/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Message } from '../types';
import { Send, User, Sparkles } from 'lucide-react';
import Markdown from 'react-markdown';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export function ChatInterface({ messages, onSendMessage, isLoading }: ChatInterfaceProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = React.useState('');
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleOptionClick = (option: string, type?: 'single' | 'multiple') => {
    if (type === 'multiple') {
      setSelectedOptions(prev => 
        prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
      );
    } else {
      onSendMessage(option);
    }
  };

  const handleConfirmMultiple = () => {
    if (selectedOptions.length > 0) {
      onSendMessage(selectedOptions.join(', '));
      setSelectedOptions([]);
    }
  };

  return (
    <div className="flex flex-col h-[85vh] max-w-5xl mx-auto w-full bg-white rounded-4xl overflow-hidden shadow-sm border-2 border-slate-100">
      {/* Header */}
      <div className="p-8 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Sparkles size={24} className="text-white" />
          </div>
          <div>
            <h2 className="font-extrabold text-xl font-display text-slate-900 tracking-tight">Pathfinder <span className="text-indigo-600">Advisor</span></h2>
            <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">AI Roadmap Generator</p>
          </div>
        </div>
        <div className="hidden sm:block text-[10px] uppercase tracking-widest font-bold text-slate-400 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          Dynamic Profiling
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-10 scroll-smooth bg-[#F9FAFB]/50"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id + idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-5 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`mt-1 shrink-0 h-11 w-11 rounded-2xl flex items-center justify-center border-2 border-white shadow-sm ${
                  msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'
                }`}>
                  {msg.role === 'user' ? <User size={22} /> : <Sparkles size={22} />}
                </div>
                <div className="space-y-4">
                  <div className={`p-8 rounded-4xl text-lg leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-100' 
                      : 'bg-white text-slate-800 rounded-tl-none border-2 border-slate-100 shadow-sm prose prose-slate max-w-none prose-p:leading-relaxed prose-p:my-0 prose-headings:text-slate-900 prose-strong:text-indigo-600'
                  }`}>
                    {msg.role === 'assistant' ? (
                      <Markdown>{msg.content}</Markdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                  
                  {msg.options && msg.role === 'assistant' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {msg.options.map((opt) => (
                          <motion.button
                            key={opt}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleOptionClick(opt, msg.inputType === 'multiple' ? 'multiple' : 'single')}
                            disabled={isLoading}
                            className={`w-full text-left px-6 py-5 border-2 rounded-2xl text-sm font-bold transition-all flex justify-between items-center group shadow-sm ${
                              selectedOptions.includes(opt) 
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-indigo-100' 
                                : 'bg-white border-indigo-50 text-slate-700 hover:border-indigo-500'
                            }`}
                          >
                            {opt}
                            <span className={`${selectedOptions.includes(opt) ? 'text-white' : 'text-indigo-300 group-hover:text-indigo-600'} transition-colors font-bold`}>
                              {selectedOptions.includes(opt) ? '✓' : '+'}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                      {msg.inputType === 'multiple' && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          onClick={handleConfirmMultiple}
                          disabled={isLoading || selectedOptions.length === 0}
                          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-colors disabled:opacity-50"
                        >
                          Confirm Selections ({selectedOptions.length})
                        </motion.button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
               <div className="bg-white border-2 border-slate-100 p-5 rounded-3xl rounded-tl-none shadow-sm flex gap-3 items-center">
                 <div className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                 <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                 <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-8 bg-white border-t border-slate-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your response here..."
            disabled={isLoading}
            className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-6 px-8 text-lg focus:outline-none focus:border-indigo-500 transition-all shadow-inner placeholder:text-slate-400 font-medium"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`absolute right-3 top-3 bottom-3 px-10 rounded-xl font-extrabold transition-all border-none outline-none ${
              input.trim() && !isLoading 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100' 
                : 'bg-slate-200 text-slate-400'
            }`}
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
