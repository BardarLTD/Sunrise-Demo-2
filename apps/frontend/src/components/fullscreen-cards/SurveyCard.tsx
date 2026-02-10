'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { usePersona } from '@/contexts/PersonaContext';
import { mixpanelService } from '@/lib/mixpanel';

interface SurveyCardProps {
  onComplete: () => void;
}

const SURVEY_QUESTIONS = [
  {
    key: 'companyName' as const,
    question: 'What is the name of your company?',
    placeholder: 'Enter your company name...',
  },
  {
    key: 'industry' as const,
    question: 'Is your company b2b or b2c, and what industry are you in?',
    placeholder: 'e.g., B2B SaaS in marketing automation...',
  },
  {
    key: 'product' as const,
    question: 'What is your product?',
    placeholder: 'Describe your product or service...',
  },
  {
    key: 'why' as const,
    question:
      'Why do people buy your product? Does it solve a particular pain point or meet a key need?',
    placeholder: 'Describe the problem you solve...',
  },
  {
    key: 'other' as const,
    question:
      'Are there any other key details we should know about your company?',
    placeholder: 'Any additional context...',
  },
] as const;

export function SurveyCard({ onComplete }: SurveyCardProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const { surveyAnswers, setSurveyAnswer } = usePersona();

  const currentQuestion = SURVEY_QUESTIONS[currentQuestionIndex];

  // Load existing answer when question changes
  useEffect(() => {
    if (currentQuestion) {
      setCurrentAnswer(surveyAnswers[currentQuestion.key] || '');
    }
  }, [currentQuestionIndex, currentQuestion, surveyAnswers]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!currentAnswer.trim() || !currentQuestion) return;

    // Save to context
    setSurveyAnswer(currentQuestion.key, currentAnswer);

    // Track in Mixpanel
    mixpanelService.track('Survey Question Answered', {
      question_key: currentQuestion.key,
      question_text: currentQuestion.question,
      answer: currentAnswer,
      answer_length: currentAnswer.length,
      question_number: currentQuestionIndex + 1,
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
    });

    // Move to next question or complete
    if (currentQuestionIndex < SURVEY_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const nextQuestion = SURVEY_QUESTIONS[currentQuestionIndex + 1];
      if (nextQuestion) {
        setCurrentAnswer(surveyAnswers[nextQuestion.key] || '');
      }
    } else {
      // Survey completed
      mixpanelService.track('Survey Completed', {
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        total_questions: SURVEY_QUESTIONS.length,
      });
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevQuestion = SURVEY_QUESTIONS[currentQuestionIndex - 1];
      if (prevQuestion) {
        setCurrentAnswer(surveyAnswers[prevQuestion.key] || '');
      }
    }
  };

  return (
    <motion.div
      className="flex w-full max-w-2xl flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
    >
      {/* Progress indicator */}
      <p className="mb-6 text-sm font-medium text-slate-400">
        Question {currentQuestionIndex + 1} of {SURVEY_QUESTIONS.length}
      </p>

      {/* Question text with animation */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentQuestionIndex}
          className="mb-8 text-center text-3xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {currentQuestion?.question}
        </motion.h1>
      </AnimatePresence>

      {/* Input box */}
      <div
        className="relative w-full overflow-hidden rounded-xl border border-[#595854] transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient background on hover */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-out"
          style={{
            backgroundImage: 'url(/gradient-bg.png)',
            opacity: isHovered ? 0.4 : 0,
          }}
        />
        {/* Solid background */}
        <div
          className="absolute inset-0 bg-[#2A2A29] transition-opacity duration-500 ease-out"
          style={{ opacity: isHovered ? 0.7 : 1 }}
        />

        <form onSubmit={handleSubmit} className="relative z-10">
          <textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder={currentQuestion?.placeholder}
            rows={4}
            className={`w-full resize-none border-none bg-transparent px-5 py-4 text-base text-white focus:outline-none transition-all duration-500 ease-out placeholder:italic focus:placeholder:opacity-0 ${
              isHovered
                ? 'placeholder:text-white'
                : 'placeholder:text-slate-500'
            }`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="flex items-center justify-between border-t border-white/5 px-4 py-3">
            {/* Back button */}
            {currentQuestionIndex > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            ) : (
              <div /> // Empty div to maintain layout
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={!currentAnswer.trim()}
              className="flex items-center gap-2 rounded-lg bg-[#1e52f1] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1e52f1]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestionIndex < SURVEY_QUESTIONS.length - 1
                ? 'Next'
                : 'Continue'}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
