import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Target, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  UserLearningProfile,
  Lesson,
  SkillCategory,
} from '../types';
import { getLearningInsights } from '../utils/adaptiveLearningService';
import {
  generateLearningRecommendations,
  generatePersonalizedFeedback,
  analyzeWeakAreas,
  predictEngagementRisk,
} from '../utils/aiService';

interface AdaptiveLearningProps {
  learningProfile: UserLearningProfile | undefined;
  availableLessons: Lesson[];
  userName: string;
  userLanguage: string;
  onLessonSelected?: (lessonId: string) => void;
}

export const AdaptiveLearningPanel: React.FC<AdaptiveLearningProps> = ({
  learningProfile,
  availableLessons,
  userName,
  userLanguage,
  onLessonSelected,
}) => {
  const [recommendations, setRecommendations] = useState<Lesson[]>([]);
  const [personalizedFeedback, setPersonalizedFeedback] = useState<string>('');
  const [weakAreas, setWeakAreas] = useState<{
    weakTopics: string[];
    recommendations: string[];
  }>({ weakTopics: [], recommendations: [] });
  const [engagementRisk, setEngagementRisk] = useState<{
    riskLevel: 'low' | 'medium' | 'high';
    reason: string;
    suggestion: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations' | 'weakareas' | 'insights'>('overview');

  // Load AI recommendations on component mount or profile change
  useEffect(() => {
    if (learningProfile) {
      loadRecommendations();
    }
  }, [learningProfile]);

  const loadRecommendations = async () => {
    if (!learningProfile) return;

    setLoading(true);
    try {
      const [recsData, feedback, weakAreasData, riskData] = await Promise.all([
        generateLearningRecommendations(learningProfile, availableLessons, userLanguage),
        generatePersonalizedFeedback(learningProfile, userName),
        analyzeWeakAreas(learningProfile, userLanguage),
        predictEngagementRisk(learningProfile),
      ]);

      setRecommendations(recsData.lessons);
      setPersonalizedFeedback(feedback);
      setWeakAreas(weakAreasData);
      setEngagementRisk(riskData);
    } catch (error) {
      console.error('Error loading recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!learningProfile) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <p className="text-gray-600">Start your first lesson to unlock personalized recommendations!</p>
      </div>
    );
  }

  const insights = getLearningInsights(learningProfile);

  return (
    <div className="space-y-6">
      {/* Engagement Risk Alert */}
      {engagementRisk?.riskLevel === 'high' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Stay Engaged!</h3>
              <p className="text-red-700 text-sm mt-1">{engagementRisk.reason}</p>
              <p className="text-red-600 text-sm font-medium mt-2">💡 {engagementRisk.suggestion}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
        {(['overview', 'recommendations', 'weakareas', 'insights'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Personalized Feedback */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Coach's Message</h3>
                <p className="text-blue-800 text-sm leading-relaxed">
                  {loading ? 'Loading personalized feedback...' : personalizedFeedback || 'Complete exercises to get personalized feedback!'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatsCard
              icon={CheckCircle2}
              label="Accuracy"
              value={`${insights.overallAccuracy}%`}
              color="green"
            />
            <StatsCard
              icon={TrendingUp}
              label="Consistency"
              value={`${insights.consistencyScore}/100`}
              color="blue"
            />
            <StatsCard
              icon={Target}
              label="Exercises"
              value={insights.totalExercises}
              color="purple"
            />
            <StatsCard
              icon={Zap}
              label="Pace"
              value={insights.learningPace}
              color="orange"
            />
          </div>

          {/* Skills Overview */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Skill Proficiency
            </h3>
            <div className="space-y-2">
              {Object.values(learningProfile.skillProficiencies).map((skill) => (
                <div key={skill.skill}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 capitalize">{skill.skill}</span>
                    <span className="text-sm text-gray-600">{Math.round(skill.proficiency)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getSkillColor(skill.proficiency)}`}
                      style={{ width: `${Math.min(100, skill.proficiency)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Recommendations Tab */}
      {activeTab === 'recommendations' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">Recommended Next Steps</h3>
            {loading ? (
              <p className="text-blue-700 text-sm">Loading recommendations...</p>
            ) : recommendations.length > 0 ? (
              <div className="space-y-3">
                {recommendations.map((lesson, idx) => (
                  <motion.button
                    key={lesson.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => onLessonSelected?.(lesson.id)}
                    className="w-full text-left p-3 bg-white border border-blue-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all"
                  >
                    <div className="font-medium text-gray-800">{lesson.title}</div>
                    <p className="text-xs text-gray-600 mt-1">
                      {lesson.exercises.length} exercises • {lesson.xpReward} XP
                    </p>
                  </motion.button>
                ))}
              </div>
            ) : (
              <p className="text-blue-700 text-sm">No specific recommendations yet. Keep practicing!</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Weak Areas Tab */}
      {activeTab === 'weakareas' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Areas to Focus On
            </h3>
            {loading ? (
              <p className="text-orange-700 text-sm">Analyzing your performance...</p>
            ) : weakAreas.weakTopics.length > 0 ? (
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-orange-900 mb-2">Weak Topics:</h4>
                  <div className="flex flex-wrap gap-2">
                    {weakAreas.weakTopics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-block bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-orange-900 mb-2">Recommendations:</h4>
                  <ul className="space-y-2">
                    {weakAreas.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm text-orange-800 flex gap-2">
                        <span className="font-bold">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p className="text-orange-700 text-sm">No specific weak areas identified. You're doing great!</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
            <h3 className="font-semibold text-purple-900 mb-3">Learning Insights</h3>

            {insights.strongSkills.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-purple-900 mb-2">💪 Strong Areas:</h4>
                <div className="flex flex-wrap gap-2">
                  {insights.strongSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full capitalize"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {insights.weakSkills.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-purple-900 mb-2">📌 Areas for Growth:</h4>
                <div className="flex flex-wrap gap-2">
                  {insights.weakSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full capitalize"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white bg-opacity-50 p-3 rounded">
                <p className="text-gray-600 text-xs">Learning Pace</p>
                <p className="font-semibold text-purple-900 capitalize">{insights.learningPace}</p>
              </div>
              <div className="bg-white bg-opacity-50 p-3 rounded">
                <p className="text-gray-600 text-xs">Recommended Difficulty</p>
                <p className="font-semibold text-purple-900 capitalize">{insights.recommendedDifficulty}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Refresh Button */}
      <button
        onClick={loadRecommendations}
        disabled={loading}
        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors font-medium text-sm"
      >
        {loading ? 'Loading...' : 'Refresh Recommendations'}
      </button>
    </div>
  );
};

interface StatsCardProps {
  icon: React.ComponentType<{ className: string }>;
  label: string;
  value: string | number;
  color: 'green' | 'blue' | 'purple' | 'orange';
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    green: 'bg-green-50 text-green-600 border-green-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${colorClasses[color]} border rounded-lg p-3 text-center`}
    >
      <Icon className="w-5 h-5 mx-auto mb-1" />
      <p className="text-xs text-gray-600 font-medium">{label}</p>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </motion.div>
  );
};

function getSkillColor(proficiency: number): string {
  if (proficiency >= 80) return 'bg-green-500';
  if (proficiency >= 60) return 'bg-blue-500';
  if (proficiency >= 40) return 'bg-yellow-500';
  return 'bg-red-500';
}
