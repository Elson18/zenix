import React, { useState } from 'react';
import AssessmentIntro from './AssessmentIntro';
import AssessmentBusinessType from './AssessmentBusinessType';
import AssessmentBusinessStage from './AssessmentBusinessStage';
import AssessmentProgress from './AssessmentProgress';
import AssessmentQuestionComponent from './AssessmentQuestion';
import AssessmentResults from './AssessmentResults';
import { getQuestionsForBusinessType, AssessmentQuestion } from '../data/assessmentQuestions';
import { AnswerValue, UserAnswers } from '../data/scoringRules';
import { assessmentCategories } from '../data/assessmentCategories';
import { ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type AssessmentStep = 'intro' | 'business-type' | 'business-stage' | 'questions' | 'results';

export default function ReadinessAssessment() {
  const [step, setStep] = useState<AssessmentStep>('intro');
  const [businessType, setBusinessType] = useState<string>('');
  const [businessStage, setBusinessStage] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<UserAnswers>({});

  const activeQuestions = getQuestionsForBusinessType(businessType);
  const currentQuestion = activeQuestions[currentQuestionIndex];

  // Handlers for steps
  const handleStart = () => {
    setStep('business-type');
  };

  const handleBusinessTypeChange = (id: string) => {
    setBusinessType(id);
  };

  const handleBusinessTypeNext = () => {
    setStep('business-stage');
  };

  const handleBusinessTypeBack = () => {
    setStep('intro');
  };

  const handleBusinessStageChange = (id: string) => {
    setBusinessStage(id);
  };

  const handleBusinessStageNext = () => {
    // Reset questions indices
    setCurrentQuestionIndex(0);
    setStep('questions');
  };

  const handleBusinessStageBack = () => {
    setStep('business-type');
  };

  const handleAnswer = (value: AnswerValue) => {
    if (!currentQuestion) return;
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleQuestionContinue = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep('results');
    }
  };

  const handleQuestionBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setStep('business-stage');
    }
  };

  const handleRetake = () => {
    setBusinessType('');
    setBusinessStage('');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setStep('intro');
  };

  // Get active category display details for progress bar
  const getCategoryName = (catId: string) => {
    const cat = assessmentCategories.find(c => c.id === catId);
    return cat ? `${cat.number} — ${cat.name}` : catId.toUpperCase();
  };

  // Progress metrics calculation
  const totalQuestions = activeQuestions.length;
  const progressPercent = totalQuestions > 0 ? Math.round((currentQuestionIndex / totalQuestions) * 100) : 0;
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  return (
    <div className="w-full relative min-h-[500px]">
      <AnimatePresence mode="wait">
        
        {/* Step: Intro */}
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <AssessmentIntro onStart={handleStart} />
          </motion.div>
        )}

        {/* Step: Business Type */}
        {step === 'business-type' && (
          <motion.div
            key="business-type"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <AssessmentBusinessType
              selectedId={businessType}
              onChange={handleBusinessTypeChange}
              onNext={handleBusinessTypeNext}
              onBack={handleBusinessTypeBack}
            />
          </motion.div>
        )}

        {/* Step: Business Stage */}
        {step === 'business-stage' && (
          <motion.div
            key="business-stage"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <AssessmentBusinessStage
              selectedId={businessStage}
              onChange={handleBusinessStageChange}
              onNext={handleBusinessStageNext}
              onBack={handleBusinessStageBack}
            />
          </motion.div>
        )}

        {/* Step: Compliance Questions */}
        {step === 'questions' && currentQuestion && (
          <motion.div
            key={`question-${currentQuestion.id}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <AssessmentProgress
              currentStep={currentQuestionIndex + 1}
              totalSteps={totalQuestions}
              percentage={progressPercent}
              categoryName={getCategoryName(currentQuestion.category)}
            />
            
            <AssessmentQuestionComponent
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              selectedAnswer={selectedAnswer}
              onAnswer={handleAnswer}
              onContinue={handleQuestionContinue}
              onBack={handleQuestionBack}
              canContinue={!!selectedAnswer}
            />
          </motion.div>
        )}

        {/* Step: Results Dashboard */}
        {step === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <AssessmentResults
              businessType={businessType}
              businessStage={businessStage}
              answers={answers}
              onRetake={handleRetake}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
