import React, { useState } from 'react';
import { 
  BookOpen, 
  Headphones, 
  MessageCircle, 
  PenTool,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Award
} from 'lucide-react';

const PROFICIENCY_LEVELS = [
  { id: 'a1', label: 'A1 - Beginner', description: 'Basic understanding of everyday expressions' },
  { id: 'a2', label: 'A2 - Elementary', description: 'Can communicate in simple and routine tasks' },
  { id: 'b1', label: 'B1 - Intermediate', description: 'Can deal with most situations while traveling' },
  { id: 'b2', label: 'B2 - Upper Intermediate', description: 'Can interact with a degree of fluency' },
  { id: 'c1', label: 'C1 - Advanced', description: 'Can use language flexibly and effectively' },
  { id: 'c2', label: 'C2 - Fluent', description: 'Can understand virtually everything heard or read' },
];

const TEST_SECTIONS = [
  {
    id: 'grammar',
    title: 'Grammar Test',
    icon: PenTool,
    duration: '45 minutes',
    questions: '50 questions',
    description: 'Assess your understanding of English grammar rules and structures',
  },
  {
    id: 'listening',
    title: 'Listening Test',
    icon: Headphones,
    duration: '30 minutes',
    questions: '30 questions',
    description: 'Evaluate your ability to understand spoken English in various contexts',
  },
  {
    id: 'reading',
    title: 'Reading Test',
    icon: BookOpen,
    duration: '60 minutes',
    questions: '40 questions',
    description: 'Measure your comprehension of written English texts',
  },
  {
    id: 'speaking',
    title: 'Speaking Test',
    icon: MessageCircle,
    duration: '15 minutes',
    questions: '6 tasks',
    description: 'Assess your spoken English skills through recorded responses',
  },
];

export default function EnglishAssessment() {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSectionToggle = (sectionId: string) => {
    setSelectedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {!submitted ? (
        <>
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className="flex items-center"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNumber
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-24 h-1 mx-2 ${
                      step > stepNumber ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Select Your Target Proficiency Level
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROFICIENCY_LEVELS.map((level) => (
                  <div
                    key={level.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedLevel === level.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                    onClick={() => setSelectedLevel(level.id)}
                  >
                    <h3 className="text-lg font-medium text-gray-900">
                      {level.label}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {level.description}
                    </p>
                  </div>
                ))}
              </div>
              <button
                className="w-full mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                disabled={!selectedLevel}
                onClick={() => setStep(2)}
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Choose Test Sections
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TEST_SECTIONS.map((section) => {
                  const Icon = section.icon;
                  return (
                    <div
                      key={section.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedSections.includes(section.id)
                          ? 'border-indigo-600 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}
                      onClick={() => handleSectionToggle(section.id)}
                    >
                      <div className="flex items-center mb-2">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          <Icon className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h3 className="ml-3 text-lg font-medium text-gray-900">
                          {section.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {section.description}
                      </p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        {section.duration} • {section.questions}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button
                className="w-full mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                disabled={selectedSections.length === 0}
                onClick={() => setStep(3)}
              >
                Continue
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Confirm Your Assessment
              </h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Selected Level
                    </h3>
                    <p className="mt-1 text-lg text-gray-900">
                      {PROFICIENCY_LEVELS.find(l => l.id === selectedLevel)?.label}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Selected Sections
                    </h3>
                    <div className="mt-2 space-y-2">
                      {selectedSections.map(sectionId => {
                        const section = TEST_SECTIONS.find(s => s.id === sectionId);
                        return (
                          <div
                            key={sectionId}
                            className="flex items-center text-gray-900"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {section?.title}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-amber-500 mr-2" />
                      <p className="text-sm text-gray-600">
                        The assessment will take approximately{' '}
                        {selectedSections.reduce((acc, sectionId) => {
                          const section = TEST_SECTIONS.find(s => s.id === sectionId);
                          return acc + parseInt(section?.duration || '0');
                        }, 0)}{' '}
                        minutes to complete.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center"
                onClick={handleSubmit}
              >
                Start Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
            <Award className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Assessment Submitted Successfully!
          </h2>
          <div className="max-w-md mx-auto">
            <p className="text-gray-600 mb-8">
              Thank you for completing the English proficiency assessment. Our expert evaluators will review your responses, and you'll receive detailed results within 2-3 business days via email.
            </p>
            <div className="bg-indigo-50 rounded-lg p-4">
              <h3 className="font-medium text-indigo-900 mb-2">What's Next?</h3>
              <ul className="text-sm text-indigo-700 space-y-2">
                <li>• Expert evaluation of your responses</li>
                <li>• Detailed proficiency report</li>
                <li>• Personalized learning recommendations</li>
                <li>• Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}