import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, RotateCcw, Brain, Target, BookOpen, Compass } from 'lucide-react';
import { useUser } from '../context/UserContext';
import toast from 'react-hot-toast';
import { 
  exploringQuestions, 
  engineeringQuestions, 
  medicalQuestions, 
  commerceQuestions, 
  artsQuestions 
} from '../data/quizQuestions';

const Quiz = () => {
  const navigate = useNavigate();
  const { setQuizResults, setLoading } = useUser();
  
  const [phase, setPhase] = useState('gateway'); // 'gateway', 'stream_selection', 'assessment', 'results'
  const [gatewaySelection, setGatewaySelection] = useState(null); // 'A' or 'B'
  const [selectedStream, setSelectedStream] = useState(null); // 'engineering', 'medical', 'commerce', 'arts'
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  let currentQuestions = [];
  if (phase === 'assessment') {
    if (gatewaySelection === 'A') {
      currentQuestions = exploringQuestions;
    } else if (gatewaySelection === 'B') {
      switch (selectedStream) {
        case 'engineering': currentQuestions = engineeringQuestions; break;
        case 'medical': currentQuestions = medicalQuestions; break;
        case 'commerce': currentQuestions = commerceQuestions; break;
        case 'arts': currentQuestions = artsQuestions; break;
        default: currentQuestions = exploringQuestions;
      }
    }
  }

  const handleGatewaySelect = (option) => {
    setGatewaySelection(option);
    if (option === 'A') {
      setPhase('assessment');
      setCurrentQuestion(0);
      setAnswers({});
    } else {
      setPhase('stream_selection');
    }
  };

  const handleStreamSelect = (stream) => {
    setSelectedStream(stream);
    setPhase('assessment');
    setCurrentQuestion(0);
    setAnswers({});
  };

  const handleAnswer = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleNext = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      if (gatewaySelection === 'A') {
        setPhase('gateway');
        setGatewaySelection(null);
      } else {
        setPhase('stream_selection');
      }
    }
  };

  const calculateResults = () => {
    setLoading(true);
    
    setTimeout(() => {
      const bucketScores = {};
      
      Object.entries(answers).forEach(([questionId, option]) => {
        const bucket = option.bucket;
        const points = option.points;
        if (bucketScores[bucket] !== undefined) {
            bucketScores[bucket] += points;
        } else {
            bucketScores[bucket] = points;
        }
      });

      let winningBucket = '';
      let maxScore = -1;
      Object.entries(bucketScores).forEach(([bucket, score]) => {
        if (score > maxScore) {
          maxScore = score;
          winningBucket = bucket;
        }
      });

      // Special case: if tied, it picks the first one encountered. This is fine for now.

      const formatBucketName = (name) => {
        if (!name) return '';
        if (name === 'mbbs') return 'MBBS / Medicine';
        if (name === 'bds') return 'BDS / Dentistry';
        if (name === 'ca') return 'Chartered Accountancy';
        if (name === 'bba_mba') return 'Business Management (BBA/MBA)';
        return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      };

      let recommendedStream = '';
      let personalityType = 'Balanced';
      let interests = [];

      if (gatewaySelection === 'A') {
        recommendedStream = formatBucketName(winningBucket);
        personalityType = 'Explorer';
        interests = [formatBucketName(winningBucket), 'General Studies'];
      } else {
        recommendedStream = formatBucketName(winningBucket); 
        personalityType = 'Focused';
        interests = [formatBucketName(winningBucket), formatBucketName(selectedStream)];
      }

      const quizResults = {
        recommendedStream: recommendedStream,
        interests: interests,
        personalityType: personalityType,
        categoryScores: bucketScores,
        completedAt: new Date().toISOString()
      };

      setResults(quizResults);
      setQuizResults(quizResults);
      setPhase('results');
      setLoading(false);
      
      toast.success('Interest Mapper completed successfully!');
    }, 1500);
  };

  const resetQuiz = () => {
    setPhase('gateway');
    setGatewaySelection(null);
    setSelectedStream(null);
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
  };

  return (
    <>
      <style>{`
        .gateway-section {
          max-width: 800px;
          margin: 40px auto;
          text-align: center;
          padding: 2rem;
          background: var(--card-bg);
          border-radius: 1.5rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
        .gateway-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }
        .gateway-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 3rem;
        }
        .gateway-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .gateway-card {
          padding: 2.5rem;
          border-radius: 1.5rem;
          background: var(--bg-primary);
          border: 2px solid var(--border-color);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .gateway-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary-color);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.1);
        }
        .gateway-card .card-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1));
          color: var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gateway-card .card-icon svg {
          width: 40px;
          height: 40px;
        }
        .gateway-card h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .gateway-card p {
          color: var(--text-secondary);
          font-size: 1rem;
        }

        .stream-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .stream-card {
          padding: 2rem;
          border-radius: 1rem;
          background: linear-gradient(135deg, var(--card-bg), var(--bg-primary));
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
          font-size: 1.25rem;
          color: var(--text-primary);
        }
        .stream-card:hover {
          border-color: var(--primary-color);
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          color: var(--primary-color);
        }

        @media (max-width: 768px) {
          .gateway-options, .stream-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {phase === 'gateway' && (
        <div className="quiz-container">
          <div className="gateway-section">
            <h1 className="gateway-title">Welcome to the Interest Mapper</h1>
            <p className="gateway-subtitle">To give you the best recommendations, tell us where you are in your journey.</p>
            
            <div className="gateway-options">
              <div className="gateway-card" onClick={() => handleGatewaySelect('A')}>
                <div className="card-icon"><Compass /></div>
                <h3>I am exploring</h3>
                <p>Help me choose the right stream. Ideal for 10th-grade students.</p>
              </div>
              
              <div className="gateway-card" onClick={() => handleGatewaySelect('B')}>
                <div className="card-icon"><Target /></div>
                <h3>I already know my stream</h3>
                <p>Help me discover specific career paths and exams. Ideal for 11th/12th grade.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === 'stream_selection' && (
        <div className="quiz-container">
          <div className="gateway-section">
            <button className="btn btn-outline" style={{marginBottom: '2rem'}} onClick={() => setPhase('gateway')}>
               <ArrowLeft className="btn-icon" /> Back
            </button>
            <h2 className="gateway-title">Which stream have you chosen?</h2>
            <p className="gateway-subtitle">Select your stream so we can tailor the assessment to your specific field.</p>
            
            <div className="stream-grid">
               {['engineering', 'medical', 'commerce', 'arts'].map(stream => (
                 <div 
                   key={stream}
                   className="stream-card"
                   onClick={() => handleStreamSelect(stream)}
                 >
                   {stream.charAt(0).toUpperCase() + stream.slice(1)}
                 </div>
               ))}
            </div>
          </div>
        </div>
      )}

      {phase === 'assessment' && (
        <div className="quiz-container">
          <div className="quiz-header">
            <div className="quiz-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentQuestion + 1) / currentQuestions.length) * 100}%` }}
                />
              </div>
              <span className="progress-text">
                Question {currentQuestion + 1} of {currentQuestions.length}
              </span>
            </div>
          </div>

          <div className="quiz-question">
            <h2 className="question-title">{currentQuestions[currentQuestion].question}</h2>
            
            <div className="quiz-options">
              {currentQuestions[currentQuestion].options.map((option, index) => {
                const isSelected = answers[currentQuestions[currentQuestion].id]?.text === option.text;
                  
                return (
                  <label
                    key={index}
                    className={`quiz-option ${isSelected ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestions[currentQuestion].id}`}
                      value={option.text}
                      checked={isSelected}
                      onChange={() => handleAnswer(currentQuestions[currentQuestion].id, option)}
                      className="option-input"
                    />
                    <span className="option-text">{option.text}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="quiz-navigation">
            <button
              onClick={handlePrevious}
              className="btn btn-outline"
            >
              <ArrowLeft className="btn-icon" />
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={!answers[currentQuestions[currentQuestion].id]}
              className="btn btn-primary"
            >
              {currentQuestion === currentQuestions.length - 1 ? 'Complete Assessment' : 'Next'}
              <ArrowRight className="btn-icon" />
            </button>
          </div>
        </div>
      )}

      {phase === 'results' && results && (
        <div className="quiz-results">
          <div className="container">
            <div className="results-header">
              <h1 className="results-title">Your CareerSync Interest Mapper Results</h1>
              <p className="results-subtitle">
                Based on your scenario responses, here is your personalized recommendation!
              </p>
            </div>

            <div className="results-content">
              <div className="result-card primary">
                <div className="result-icon">
                  <CheckCircle className="result-icon-svg" />
                </div>
                <div className="result-content">
                  <h2 className="result-title">Recommended Path</h2>
                  <div className="recommended-stream">
                    {results.recommendedStream}
                  </div>
                  <p className="result-description">
                    This path aligns best with your natural problem-solving and behavioral tendencies.
                  </p>
                </div>
              </div>

              <div className="results-grid">
                <div className="result-card">
                  <h3 className="card-title">Key Areas</h3>
                  <div className="interests-list">
                    {results.interests.map((interest, index) => (
                      <span key={index} className="interest-tag">
                        {interest.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="result-card">
                  <h3 className="card-title">Profile Type</h3>
                  <div className="personality-type">
                    {results.personalityType}
                  </div>
                  <p className="personality-description">
                    {results.personalityType === 'Explorer' 
                      ? 'You are at the start of your journey, discovering where your broad interests lie.'
                      : 'You have a specialized focus and are ready to dive deep into specific career paths.'}
                  </p>
                </div>

                <div className="result-card">
                  <h3 className="card-title">Bucket Scores</h3>
                  <div className="scores-chart">
                    {Object.entries(results.categoryScores).map(([stream, score]) => {
                      const maxScore = Math.max(...Object.values(results.categoryScores));
                      const displayStream = stream.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                      return (
                        <div key={stream} className="score-item">
                          <span className="score-label" style={{fontSize: '0.85rem'}}>
                            {displayStream}
                          </span>
                          <div className="score-bar">
                            <div 
                              className="score-fill"
                              style={{ width: `${(score / (maxScore || 1)) * 100}%` }}
                            />
                          </div>
                          <span className="score-value">{score}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="results-actions">
                <button onClick={resetQuiz} className="btn btn-secondary">
                  <RotateCcw className="btn-icon" />
                  Retake Assessment
                </button>
                <button 
                  onClick={() => navigate('/courses')} 
                  className="btn btn-primary"
                >
                  Explore Course Recommendations
                  <ArrowRight className="btn-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;