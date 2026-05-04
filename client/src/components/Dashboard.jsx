import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { 
  BookOpen, 
  MapPin, 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Award,
  ArrowRight,
  CheckCircle,
  Star,
  Brain,
  Target,
  Lightbulb,
  Rocket,
  GraduationCap,
  Briefcase,
  Heart
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { user, isAuthenticated, quizResults, preferences } = useUser();
  const { isDarkMode } = useTheme();
  const [stats, setStats] = useState({
    totalColleges: 0,
    totalCourses: 0,
    upcomingDeadlines: 0,
    completedQuizzes: 0
  });

  useEffect(() => {
    // Simulate loading stats
    setStats({
      totalColleges: 156,
      totalCourses: 24,
      upcomingDeadlines: 8,
      completedQuizzes: quizResults ? 1 : 0
    });
  }, [quizResults]);

  const quickActions = [
    {
      title: 'Take Aptitude Quiz',
      description: 'Discover your interests and get personalized course recommendations',
      icon: BarChart3,
      href: '/quiz',
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Explore Courses',
      description: 'Browse degree programs and career paths tailored for you',
      icon: BookOpen,
      href: '/courses',
      color: 'bg-green-500',
      textColor: 'text-green-600',
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Find Colleges',
      description: 'Discover J&K universities and colleges near you',
      icon: MapPin,
      href: '/colleges',
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Check Timeline',
      description: 'View important dates and deadlines for your academic journey',
      icon: Calendar,
      href: '/timeline',
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      gradient: 'from-orange-500 to-orange-600'
    }
  ];

  const upcomingDeadlines = [
    {
      title: 'University of Kashmir Admissions',
      date: '2024-06-15',
      type: 'Admission',
      priority: 'high',
      description: 'Online application process begins for undergraduate courses'
    },
    {
      title: 'J&K CET Entrance Exam',
      date: '2024-06-20',
      type: 'Exam',
      priority: 'high',
      description: 'Common entrance test for various undergraduate programs'
    },
    {
      title: 'Central Sector Scholarship',
      date: '2024-06-25',
      type: 'Scholarship',
      priority: 'medium',
      description: 'Merit-based scholarship for economically weaker students'
    },
    {
      title: 'JAM Registration Opens',
      date: '2024-07-01',
      type: 'Registration',
      priority: 'medium',
      description: 'Joint Admission Test for M.Sc. programs'
    }
  ];

  const getPersonalizedRecommendations = () => {
    if (!user && !quizResults) return [];
    
    const userStream = user?.stream || quizResults?.recommendedStream || 'Science';
    const userLocation = user?.location || 'Jammu & Kashmir';
    
    return [
      {
        title: `Top ${userStream} Courses in J&K`,
        description: `Based on your interest in ${userStream}, here are the best courses available in ${userLocation}`,
        icon: GraduationCap,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      {
        title: 'Career Opportunities',
        description: `Explore career paths that align with your ${userStream} background and local opportunities`,
        icon: Briefcase,
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      },
      {
        title: 'Scholarship Opportunities',
        description: 'Find scholarships specifically available for students in Jammu & Kashmir',
        icon: Award,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50'
      }
    ];
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const personalizedRecommendations = getPersonalizedRecommendations();

  return (
    <div className="dashboard">
      <div className="container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-content">
            <div className="welcome-header">
              <h1 className="welcome-title">
                Welcome{isAuthenticated && (user?.fullname || user?.name) ? `, ${user.fullname || user.name}` : ''}! 👋
              </h1>
              <p className="welcome-subtitle">
                Your personalized AI-powered career and education advisor for Jammu & Kashmir students. 
                Discover opportunities tailored just for you!
              </p>
            </div>
            {!isAuthenticated && (
              <div className="welcome-actions">
                <Link to="/signup" className="get-started-btn primary">
                  <Rocket className="btn-icon" />
                  Get Started
                </Link>
                <Link to="/login" className="get-started-btn secondary">
                  <Users className="btn-icon" />
                  Login
                </Link>
              </div>
            )}
          </div>
          
          {/* Stats Cards */}
          <div className="welcome-stats">
            <div className="stat-card">
              <div className="stat-icon">
                <MapPin className="stat-icon-svg" />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.totalColleges}</div>
                <div className="stat-label">J&K Universities</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <BookOpen className="stat-icon-svg" />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.totalCourses}</div>
                <div className="stat-label">Degree Programs</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Calendar className="stat-icon-svg" />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.upcomingDeadlines}</div>
                <div className="stat-label">Upcoming Deadlines</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Award className="stat-icon-svg" />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.completedQuizzes}</div>
                <div className="stat-label">Completed Quizzes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Recommendations */}
        {personalizedRecommendations.length > 0 && (
          <div className="recommendations-section">
            <h2 className="section-title">
              <Brain className="title-icon" />
              Personalized for You
            </h2>
            <div className="recommendations-grid">
              {personalizedRecommendations.map((rec, index) => {
                const Icon = rec.icon;
                return (
                  <div key={index} className="recommendation-card">
                    <div className={`recommendation-icon ${rec.bgColor}`}>
                      <Icon className={`recommendation-icon-svg ${rec.color}`} />
                    </div>
                    <div className="recommendation-content">
                      <h3 className="recommendation-title">{rec.title}</h3>
                      <p className="recommendation-description">{rec.description}</p>
                    </div>
                    <ArrowRight className="recommendation-arrow" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions-section">
          <h2 className="section-title">
            <Target className="title-icon" />
            Quick Actions
          </h2>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.href} className="quick-action-card">
                  <div className={`action-icon bg-gradient-to-r ${action.gradient}`}>
                    <Icon className="action-icon-svg" />
                  </div>
                  <div className="action-content">
                    <h3 className="action-title">{action.title}</h3>
                    <p className="action-description">{action.description}</p>
                  </div>
                  <ArrowRight className="action-arrow" />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quiz Results Summary */}
        {quizResults && (
          <div className="quiz-results-section">
            <h2 className="section-title">
              <CheckCircle className="title-icon" />
              Your Assessment Results
            </h2>
            <div className="quiz-summary-card">
              <div className="quiz-summary-header">
                <div className="quiz-summary-icon">
                  <CheckCircle className="summary-icon" />
                </div>
                <div className="quiz-summary-content">
                  <h3 className="summary-title">Aptitude Assessment Complete</h3>
                  <p className="summary-subtitle">
                    Based on your responses, we've identified your interests and strengths
                  </p>
                </div>
              </div>
              <div className="quiz-summary-details">
                <div className="summary-item">
                  <span className="summary-label">Recommended Stream:</span>
                  <span className="summary-value">{quizResults.recommendedStream}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Top Interests:</span>
                  <span className="summary-value">
                    {quizResults.interests?.slice(0, 3).join(', ')}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Personality Type:</span>
                  <span className="summary-value">{quizResults.personalityType}</span>
                </div>
              </div>
              <Link to="/courses" className="view-recommendations-btn">
                View Course Recommendations
                <ArrowRight className="btn-icon" />
              </Link>
            </div>
          </div>
        )}

        {/* Upcoming Deadlines */}
        <div className="deadlines-section">
          <h2 className="section-title">
            <Calendar className="title-icon" />
            Upcoming Deadlines
          </h2>
          <div className="deadlines-list">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="deadline-item">
                <div className="deadline-content">
                  <h4 className="deadline-title">{deadline.title}</h4>
                  <p className="deadline-description">{deadline.description}</p>
                  <p className="deadline-type">{deadline.type}</p>
                </div>
                <div className="deadline-meta">
                  <span className="deadline-date">{formatDate(deadline.date)}</span>
                  <span className={`deadline-priority ${getPriorityColor(deadline.priority)}`}>
                    {deadline.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/timeline" className="view-all-deadlines-btn">
            View All Deadlines
            <ArrowRight className="btn-icon" />
          </Link>
        </div>

        {/* Features Overview */}
        <div className="features-section">
          <h2 className="section-title">
            <Lightbulb className="title-icon" />
            How We Help You Succeed
          </h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <BarChart3 className="feature-icon-svg" />
              </div>
              <h3 className="feature-title">AI-Powered Assessment</h3>
              <p className="feature-description">
                Take our comprehensive quiz to discover your interests, strengths, and personality traits with AI-driven insights.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <BookOpen className="feature-icon-svg" />
              </div>
              <h3 className="feature-title">Smart Course Mapping</h3>
              <p className="feature-description">
                Explore detailed career paths for different degree programs and understand job opportunities in J&K and beyond.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <MapPin className="feature-icon-svg" />
              </div>
              <h3 className="feature-title">Local College Directory</h3>
              <p className="feature-description">
                Find J&K universities and colleges with detailed information about programs, facilities, and admission processes.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Calendar className="feature-icon-svg" />
              </div>
              <h3 className="feature-title">Smart Timeline Tracker</h3>
              <p className="feature-description">
                Stay updated with important dates, deadlines, and admission schedules with personalized notifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;