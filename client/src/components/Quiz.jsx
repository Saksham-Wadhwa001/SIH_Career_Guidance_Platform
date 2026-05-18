import React, { useState, useEffect } from 'react';
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
  const { quizResults, setQuizResults, setLoading } = useUser();
  
  const [phase, setPhase] = useState('gateway'); // 'gateway', 'stream_selection', 'assessment', 'results'
  const [gatewaySelection, setGatewaySelection] = useState(null); // 'A' or 'B'
  const [selectedStream, setSelectedStream] = useState(null); // 'engineering', 'medical', 'commerce', 'arts'
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [hasCheckedExisting, setHasCheckedExisting] = useState(false);

  useEffect(() => {
    if (quizResults && !hasCheckedExisting) {
      setResults(quizResults);
      setPhase('results');
      setHasCheckedExisting(true);
    } else if (!hasCheckedExisting) {
      setHasCheckedExisting(true);
    }
  }, [quizResults, hasCheckedExisting]);

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
        @keyframes floatIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .gateway-section {
          max-width: 900px;
          margin: 60px auto;
          text-align: center;
          padding: 3.5rem 2rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
          animation: floatIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        
        [data-theme="dark"] .gateway-section {
           background: rgba(30, 27, 56, 0.4);
           border: 1px solid rgba(129, 140, 248, 0.15);
           box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 32px rgba(129, 140, 248, 0.05);
        }

        .gateway-title {
          font-size: 3rem;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
        }

        .gateway-subtitle {
          font-size: 1.15rem;
          color: var(--text-secondary);
          margin-bottom: 4rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .gateway-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          perspective: 1000px;
        }

        .gateway-card {
          padding: 3rem 2rem;
          border-radius: 1.5rem;
          background: var(--card-bg-solid);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .gateway-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: var(--gradient-primary);
          opacity: 0;
          z-index: -1;
          transition: opacity 0.4s ease;
        }

        .gateway-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: transparent;
          box-shadow: 0 20px 40px var(--primary-glow);
        }

        .gateway-card:hover::before {
          opacity: 0.03;
        }
        
        [data-theme="dark"] .gateway-card:hover::before {
          opacity: 0.08;
        }

        .gateway-card .card-icon {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          color: var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s ease, background 0.4s ease, color 0.4s ease, box-shadow 0.4s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .gateway-card:hover .card-icon {
          transform: scale(1.1);
          background: var(--gradient-primary);
          color: white;
          box-shadow: 0 8px 24px var(--primary-glow);
        }

        .gateway-card .card-icon svg {
          width: 44px;
          height: 44px;
        }

        .gateway-card h3 {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          transition: color 0.3s ease;
        }

        .gateway-card p {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.5;
        }

        .stream-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .stream-card {
          padding: 2.5rem 2rem;
          border-radius: 1.25rem;
          background: var(--card-bg-solid);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-weight: 700;
          font-size: 1.4rem;
          color: var(--text-primary);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
        }
        
        .stream-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 4px;
          background: var(--gradient-primary);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .stream-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.08);
          color: var(--primary-color);
          border-color: var(--primary-color);
        }
        
        [data-theme="dark"] .stream-card:hover {
          box-shadow: 0 12px 24px var(--primary-glow);
        }

        .stream-card:hover::after {
          transform: scaleX(1);
        }

        .quiz-results .container {
          max-width: 900px;
          margin: 40px auto;
          animation: floatIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .results-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .results-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
        }

        .results-subtitle {
          font-size: 1.1rem;
          color: var(--text-secondary);
        }

        .results-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .result-card {
          background: var(--card-bg-solid);
          border-radius: 1.5rem;
          padding: 2rem;
          border: 1px solid var(--border-color);
          box-shadow: 0 8px 24px rgba(0,0,0,0.04);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .result-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.08);
        }
        
        [data-theme="dark"] .result-card:hover {
          box-shadow: 0 12px 32px var(--primary-glow);
        }

        .result-card.primary {
          background: var(--gradient-primary);
          color: white;
          display: flex;
          align-items: center;
          gap: 2rem;
          border: none;
        }

        .result-card.primary .result-icon {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .result-icon-svg {
          width: 48px;
          height: 48px;
          color: white;
        }

        .result-title {
          font-size: 1.25rem;
          font-weight: 600;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }

        .recommended-stream {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .result-description {
          font-size: 1.05rem;
          opacity: 0.9;
        }

        .results-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .interests-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .interest-tag {
          background: var(--bg-tertiary);
          color: var(--primary-color);
          padding: 0.5rem 1rem;
          border-radius: 2rem;
          font-size: 0.9rem;
          font-weight: 600;
          border: 1px solid var(--primary-glow);
        }

        .personality-type {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }

        .personality-description {
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .score-item {
          margin-bottom: 1.25rem;
        }

        .score-label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .score-bar {
          height: 8px;
          background: var(--bg-tertiary);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.25rem;
        }

        .score-fill {
          height: 100%;
          background: var(--gradient-primary);
          border-radius: 4px;
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .score-value {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .results-actions {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 2rem;
        }

        @media (max-width: 768px) {
          .gateway-options {
            grid-template-columns: 1fr;
          }
          .gateway-title { font-size: 2.2rem; }
          .gateway-section { padding: 2rem 1.5rem; }
          .results-grid { grid-template-columns: 1fr; }
          .result-card.primary { flex-direction: column; text-align: center; }
          .results-actions { flex-direction: column; }
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