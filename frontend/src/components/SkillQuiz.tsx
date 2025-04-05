
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, TimerIcon } from 'lucide-react';

// Mock quiz data - in a real app, this would come from an API
const generateQuizQuestions = (skillId: string) => {
  // This is a simplified version with mock questions
  const questions = [];
  for (let i = 1; i <= 10; i++) {
    questions.push({
      id: `q${i}`,
      question: `Sample Question ${i} for this skill certification`,
      options: [
        { id: 'a', text: 'Answer option A' },
        { id: 'b', text: 'Answer option B' },
        { id: 'c', text: 'Answer option C' },
        { id: 'd', text: 'Answer option D' },
      ],
      correctAnswer: 'a' // Simplified: first option is correct
    });
  }
  return questions;
};

interface SkillQuizProps {
  onComplete: (score: number) => void;
}

const SkillQuiz: React.FC<SkillQuizProps> = ({ onComplete }) => {
  const [questions] = useState(generateQuizQuestions('mock-skill'));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = () => {
    // Calculate score
    const correctAnswers = questions.filter(
      (q) => selectedAnswers[q.id] === q.correctAnswer
    ).length;
    
    const scorePercentage = (correctAnswers / questions.length) * 100;
    
    // Show results before completing
    setShowResults(true);
    
    // After 3 seconds, complete the quiz
    setTimeout(() => {
      onComplete(scorePercentage);
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const question = questions[currentQuestion];
  const isAnswered = question && selectedAnswers[question.id];
  const answeredCount = Object.keys(selectedAnswers).length;

  if (showResults) {
    const correctAnswers = questions.filter(
      (q) => selectedAnswers[q.id] === q.correctAnswer
    ).length;
    const scorePercentage = (correctAnswers / questions.length) * 100;
    
    return (
      <div className="space-y-6 p-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Quiz Results</h3>
          <div className="text-4xl font-bold text-[#3D88CF]">{scorePercentage.toFixed(0)}%</div>
          <p className="mt-2">
            You answered {correctAnswers} out of {questions.length} questions correctly.
          </p>
        </div>
        
        <div className="flex justify-center">
          {scorePercentage >= 85 ? (
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="h-6 w-6 mr-2" />
              <span className="font-medium">You passed! Preparing practical exam...</span>
            </div>
          ) : (
            <div className="flex items-center text-red-600">
              <XCircle className="h-6 w-6 mr-2" />
              <span className="font-medium">You need 85% to pass. Try again later.</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center py-2 border-b">
        <div className="text-sm font-medium">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="flex items-center text-sm font-medium text-red-600">
          <TimerIcon className="h-4 w-4 mr-1" />
          {formatTime(timeLeft)}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-medium">{question.question}</h3>
        
        <div className="space-y-3">
          {question.options.map((option) => (
            <div
              key={option.id}
              className={`border rounded-lg p-3 flex items-center cursor-pointer transition-colors ${
                selectedAnswers[question.id] === option.id
                  ? 'bg-blue-50 border-[#3D88CF]'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleAnswerSelect(question.id, option.id)}
            >
              <div
                className={`w-5 h-5 mr-3 rounded-full border flex items-center justify-center ${
                  selectedAnswers[question.id] === option.id
                    ? 'border-[#3D88CF] bg-[#3D88CF]'
                    : 'border-gray-300'
                }`}
              >
                {selectedAnswers[question.id] === option.id && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span>{option.text}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={goToPrevQuestion}
          disabled={currentQuestion === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        
        <div className="text-sm text-center">
          <span className="font-medium">{answeredCount}</span> of {questions.length} answered
        </div>
        
        {currentQuestion < questions.length - 1 ? (
          <Button
            onClick={goToNextQuestion}
            disabled={!isAnswered}
          >
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button
            onClick={submitQuiz}
            disabled={answeredCount < questions.length}
          >
            Submit Quiz
          </Button>
        )}
      </div>
    </div>
  );
};

export default SkillQuiz;
