import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Target, Zap, AlertCircle, Calendar } from 'lucide-react';
import { Language, UserLearningProfile } from '../types';
import {
  getNextLesson,
  getNextLessonsSequence,
  getCurriculumProgress,
  calculateCurriculumPosition,
  LearningPathStep,
} from '../utils/curriculumSequencingService';
import {
  generatePersonalizedCurriculum,
  getProgressAnalysis,
  getNextMilestoneRecommendation,
} from '../utils/curriculumAIService';

interface ContinuousLearningPathProps {
  languages: Language[];
  currentLanguage: string;
  completedNodes: Record<string, number>;
  learningProfile: UserLearningProfile | undefined;
  userName: string;
  onLessonSelected?: (lessonId: string) => void;
}

export const ContinuousLearningPath: React.FC<ContinuousLearningPathProps> = ({
  languages,
  currentLanguage,
  completedNodes,
  learningProfile,
  userName,
  onLessonSelected,
}) => {
  const [nextLesson, setNextLesson] = useState<LearningPathStep | null>(null);
  const [upcomingLessons, setUpcomingLessons] = useState<LearningPathStep[]>([]);
  const [curriculumStrategy, setCurriculumStrategy] = useState<string>('');
  const [completionDate, setCompletionDate] = useState<string>('');
  const [progressAnalysis, setProgressAnalysis] = useState<string>('');
  const [milestone, setMilestone] = useState<{
    milestone: string;
    daysToAchieve: number;
    actionItems: string[];
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const progress = getCurriculumProgress(completedNodes, languages, currentLanguage);
  const position = calculateCurriculumPosition(completedNodes, languages.find((l) => l.id === currentLanguage)!);

  // Load curriculum data on mount or when dependencies change
  useEffect(() => {
    loadCurriculumData();
  }, [currentLanguage, completedNodes, learningProfile]);

  const loadCurriculumData = async () => {
    setLoading(true);

    // Get basic sequencing
    const next = getNextLesson(languages, currentLanguage, completedNodes, learningProfile);
    const upcoming = getNextLessonsSequence(languages, currentLanguage, completedNodes, learningProfile, 5);

    setNextLesson(next);
    setUpcomingLessons(upcoming);

    // Get AI recommendations
    try {
      const summary = `${progress.progressPercentage}% complete, ${progress.completedLessonsCount || 0} lessons done`;
      const currData = await generatePersonalizedCurriculum(
        languages,
        currentLanguage,
        completedNodes,
        learningProfile,
        summary,
      );

      setCurriculumStrategy(currData.curriculumStrategy);
      setCompletionDate(currData.estimatedCompletionDate);

      if (learningProfile) {
        const analysis = await getProgressAnalysis(learningProfile, progress.completedLessonsCount || 0, 
          progress.completedLessonsCount || 0 + upcomingLessons.length);
        setProgressAnalysis(analysis);

        const nextMilestone = await getNextMilestoneRecommendation(
          progress.completedUnitsCount,
          progress.totalUnitsCount,
          learningProfile,
        );
        setMilestone(nextMilestone);
      }
    } catch (error) {
      console.error('Error loading curriculum data:', error);
    }

    setLoading(false);
  };

  if (!nextLesson && progress.progressPercentage === 100) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-8 text-center border-2 border-green-200"
      >
        <div className="text-5xl mb-4">🎓</div>
        <h2 className="text-2xl font-bold text-green-900 mb-2">Curriculum Complete!</h2>
        <p className="text-green-700 mb-4">Congratulations! You've completed all lessons.</p>
        <p className="text-green-600">Consider reviewing challenging topics or exploring new languages.</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-blue-900">Your Personalized Learning Path</h3>
            <p className="text-blue-700 text-sm mt-1">{userName}, here's what's next in your curriculum</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{progress.progressPercentage}%</div>
            <p className="text-xs text-blue-600 font-medium">Progress</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-blue-200 rounded-full h-3 mb-4">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress.progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="bg-white bg-opacity-50 p-2 rounded">
            <p className="text-blue-600 font-medium">{progress.completedUnitsCount}/{progress.totalUnitsCount}</p>
            <p className="text-blue-700 text-xs">Units Complete</p>
          </div>
          <div className="bg-white bg-opacity-50 p-2 rounded">
            <p className="text-blue-600 font-medium">{position.lessonsCompletedInUnit}/{position.totalLessonsInUnit}</p>
            <p className="text-blue-700 text-xs">In Current Unit</p>
          </div>
          <div className="bg-white bg-opacity-50 p-2 rounded">
            <p className="text-blue-600 font-medium">{progress.progressPercentage}%</p>
            <p className="text-blue-700 text-xs">Overall</p>
          </div>
        </div>
      </motion.div>

      {/* Curriculum Strategy */}
      {curriculumStrategy && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-purple-50 rounded-lg p-4 border border-purple-200"
        >
          <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
            <Target className="w-5 h-5" />
            AI-Personalized Strategy
          </h4>
          <p className="text-purple-800 text-sm leading-relaxed">{curriculumStrategy}</p>
        </motion.div>
      )}

      {/* Next Lesson Recommendation */}
      {nextLesson ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 border-2 border-emerald-300"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Next Lesson</p>
              <h3 className="text-xl font-bold text-emerald-900 mt-1">{nextLesson.title}</h3>
              <p className="text-emerald-700 text-sm mt-2">{nextLesson.rationale}</p>
            </div>
            <div className="text-right text-emerald-600">
              <Zap className="w-6 h-6 mb-1" />
              <p className="text-sm font-medium">{nextLesson.estimatedDuration} min</p>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            {nextLesson.skillGapsFilled.map((skill) => (
              <span
                key={skill}
                className="inline-block bg-emerald-200 text-emerald-800 text-xs font-medium px-2.5 py-1 rounded-full capitalize"
              >
                {skill}
              </span>
            ))}
          </div>

          <button
            onClick={() => onLessonSelected?.(nextLesson.lessonId)}
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold flex items-center justify-center gap-2"
          >
            Start Lesson
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      ) : null}

      {/* Milestone Target */}
      {milestone && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-orange-50 rounded-lg p-4 border border-orange-200"
        >
          <h4 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Next Milestone
          </h4>
          <div className="bg-white rounded p-3 mb-3">
            <p className="font-semibold text-orange-900">{milestone.milestone}</p>
            <p className="text-orange-700 text-sm">Achievable in ~{milestone.daysToAchieve} days</p>
          </div>
          <div className="space-y-1">
            {milestone.actionItems.map((item, idx) => (
              <div key={idx} className="flex gap-2 text-sm text-orange-800">
                <span className="font-bold text-orange-600">{idx + 1}.</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Upcoming Lessons */}
      {upcomingLessons.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h4 className="font-semibold text-gray-800 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-blue-600" />
            Upcoming Lessons
          </h4>

          {upcomingLessons.map((lesson, idx) => (
            <motion.button
              key={lesson.lessonId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onLessonSelected?.(lesson.lessonId)}
              className="w-full text-left p-4 bg-white rounded-lg border-l-4 border-blue-400 hover:shadow-md hover:border-blue-600 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Lesson {idx + 2}</p>
                  <p className="font-medium text-gray-800">{lesson.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{lesson.rationale}</p>
                </div>
                <div className="text-right text-gray-500 text-sm">
                  <p className="font-medium">{lesson.estimatedDuration}m</p>
                  <p className="text-xs">{lesson.difficulty}</p>
                </div>
              </div>

              {lesson.skillGapsFilled.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {lesson.skillGapsFilled.slice(0, 2).map((skill) => (
                    <span key={skill} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded capitalize">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Progress Analysis */}
      {progressAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 rounded-lg p-4 border border-blue-200"
        >
          <p className="text-blue-800 text-sm leading-relaxed">{progressAnalysis}</p>
        </motion.div>
      )}

      {/* Completion Date */}
      {completionDate && completionDate !== 'Curriculum complete!' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg"
        >
          <p>
            📅 <strong>Estimated completion:</strong> {completionDate} (at current pace)
          </p>
        </motion.div>
      )}

      {/* Refresh Button */}
      <button
        onClick={loadCurriculumData}
        disabled={loading}
        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors font-medium text-sm"
      >
        {loading ? 'Generating Path...' : 'Refresh Learning Path'}
      </button>
    </div>
  );
};
