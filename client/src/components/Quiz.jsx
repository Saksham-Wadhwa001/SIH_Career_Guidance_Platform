// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, ArrowRight, CheckCircle, RotateCcw } from 'lucide-react';
// import { useUser } from '../context/UserContext';
// import toast from 'react-hot-toast';

// const Quiz = () => {
//   const navigate = useNavigate();
//   const { setQuizResults, setLoading } = useUser();
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [showResults, setShowResults] = useState(false);
//   const [results, setResults] = useState(null);

//   const questions = [
//     {
//       id: 1,
//       question: "What is your current academic stage?",
//       type: "single",
//       options: [
//         { value: "choosing_stream", label: "Looking to choose a stream (e.g., after 10th)", category: "vocational" },
//         { value: "chosen_stream", label: "Already chosen a stream and looking for career options", category: "science" }
//       ]
//     },
//     {
//       id: 2,
//       question: "If you have chosen a stream or are leaning towards one, which one is it?",
//       type: "single",
//       options: [
//         { value: "science_medical", label: "Science (Medical)", category: "science" },
//         { value: "science_non_medical", label: "Science (Non-Medical)", category: "science" },
//         { value: "commerce", label: "Commerce", category: "commerce" },
//         { value: "arts", label: "Arts/Humanities", category: "arts" },
//         { value: "not_sure", label: "Not sure yet", category: "vocational" }
//       ]
//     },
//     {
//       id: 3,
//       question: "What kind of career paths interest you the most in Science?",
//       type: "single",
//       options: [
//         { value: "btech", label: "B.Tech (Engineering)", category: "science" },
//         { value: "bsc", label: "B.Sc (Research / Pure Sciences)", category: "science" },
//         { value: "mbbs", label: "MBBS / Medical fields", category: "science" },
//         { value: "not_applicable", label: "Not applicable to me", category: "arts" }
//       ]
//     },
//     {
//       id: 4,
//       question: "What type of activities do you enjoy most?",
//       type: "single",
//       options: [
//         { value: "creative", label: "Creative activities (art, writing, music)", category: "arts" },
//         { value: "analytical", label: "Problem-solving and analysis", category: "science" },
//         { value: "social", label: "Working with people and communication", category: "commerce" },
//         { value: "technical", label: "Building and fixing things", category: "vocational" }
//       ]
//     },
//     {
//       id: 5,
//       question: "Which subjects do you perform best in?",
//       type: "multiple",
//       options: [
//         { value: "mathematics", label: "Mathematics", category: "science" },
//         { value: "science", label: "Science (Physics, Chemistry, Biology)", category: "science" },
//         { value: "languages", label: "Languages and Literature", category: "arts" },
//         { value: "social_studies", label: "Social Studies and History", category: "arts" },
//         { value: "commerce", label: "Commerce and Economics", category: "commerce" },
//         { value: "computer", label: "Computer Science", category: "science" }
//       ]
//     },
//     {
//       id: 6,
//       question: "What kind of work environment appeals to you?",
//       type: "single",
//       options: [
//         { value: "office", label: "Office environment with regular hours", category: "commerce" },
//         { value: "lab", label: "Laboratory or research setting", category: "science" },
//         { value: "field", label: "Field work and outdoor activities", category: "science" },
//         { value: "creative_space", label: "Creative studio or workshop", category: "arts" },
//         { value: "classroom", label: "Teaching and educational setting", category: "arts" }
//       ]
//     },
//     {
//       id: 7,
//       question: "What motivates you most in your studies?",
//       type: "single",
//       options: [
//         { value: "knowledge", label: "Gaining knowledge and understanding", category: "science" },
//         { value: "creativity", label: "Expressing creativity and innovation", category: "arts" },
//         { value: "success", label: "Achieving success and recognition", category: "commerce" },
//         { value: "helping", label: "Helping others and making a difference", category: "arts" },
//         { value: "challenge", label: "Solving complex problems", category: "science" }
//       ]
//     },
//     {
//       id: 8,
//       question: "What type of challenges do you enjoy?",
//       type: "single",
//       options: [
//         { value: "logical", label: "Logical and mathematical problems", category: "science" },
//         { value: "creative", label: "Creative and design challenges", category: "arts" },
//         { value: "social", label: "Social and interpersonal challenges", category: "commerce" },
//         { value: "technical", label: "Technical and mechanical challenges", category: "vocational" },
//         { value: "analytical", label: "Data analysis and research", category: "science" }
//       ]
//     }
//   ];

//   const handleAnswer = (questionId, answer) => {
//     setAnswers(prev => ({
//       ...prev,
//       [questionId]: answer
//     }));
//   };

//   const handleNext = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(prev => prev + 1);
//     } else {
//       calculateResults();
//     }
//   };

//   const handlePrevious = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(prev => prev - 1);
//     }
//   };

//   // const calculateResults = () => {
//   //   setLoading(true);
    
//   //   // Simulate API call
//   //   setTimeout(() => {
//   //     const categoryScores = {
//   //       science: 0,
//   //       arts: 0,
//   //       commerce: 0,
//   //       vocational: 0
//   //     };

//   //     // Calculate scores based on answers
//   //     Object.entries(answers).forEach(([questionId, answer]) => {
//   //       const question = questions.find(q => q.id === parseInt(questionId));
//   //       if (question) {
//   //         if (question.type === 'single') {
//   //           const option = question.options.find(opt => opt.value === answer);
//   //           if (option) {
//   //             categoryScores[option.category]++;
//   //           }
//   //         } else if (question.type === 'multiple') {
//   //           answer.forEach(ans => {
//   //             const option = question.options.find(opt => opt.value === ans);
//   //             if (option) {
//   //               categoryScores[option.category]++;
//   //             }
//   //           });
//   //         }
//   //       }
//   //     });

//   //     // Determine recommended stream
//   //     const recommendedStream = Object.keys(categoryScores).reduce((a, b) => 
//   //       categoryScores[a] > categoryScores[b] ? a : b
//   //     );

//   //     // Get top interests
//   //     const interests = Object.entries(answers)
//   //       .filter(([questionId, answer]) => {
//   //         const question = questions.find(q => q.id === parseInt(questionId));
//   //         return question && question.type === 'multiple';
//   //       })
//   //       .flatMap(([questionId, answer]) => answer)
//   //       .slice(0, 5);

//   //     // Determine personality type
//   //     let personalityType = 'Balanced';
//   //     const maxScore = Math.max(...Object.values(categoryScores));
//   //     if (maxScore > 0) {
//   //       if (categoryScores.science >= maxScore) personalityType = 'Analytical';
//   //       else if (categoryScores.arts >= maxScore) personalityType = 'Creative';
//   //       else if (categoryScores.commerce >= maxScore) personalityType = 'Practical';
//   //       else if (categoryScores.vocational >= maxScore) personalityType = 'Hands-on';
//   //     }

//   //     const quizResults = {
//   //       recommendedStream: recommendedStream.charAt(0).toUpperCase() + recommendedStream.slice(1),
//   //       interests,
//   //       personalityType,
//   //       categoryScores,
//   //       completedAt: new Date().toISOString()
//   //     };

//   //     setResults(quizResults);
//   //     setQuizResults(quizResults);
//   //     setIsCompleted(true);
//   //     setShowResults(true);
//   //     setLoading(false);
      
//   //     toast.success('Quiz completed successfully!');
//   //   }, 1500);
//   // };

//   const calculateResults = () => {
//   setLoading(true);
  
//   // Simulate API call
//   setTimeout(() => {
//     const categoryScores = {
//       science: 0,
//       arts: 0,
//       commerce: 0,
//       vocational: 0
//     };

//     // Calculate scores based on answers
//     Object.entries(answers).forEach(([questionId, answer]) => {
//       // Convert questionId to number since object keys are always strings
//       const id = parseInt(questionId);
//       const question = questions.find(q => q.id === id);
      
//       if (question) {
//         if (question.type === 'single') {
//           const option = question.options.find(opt => opt.value === answer);
//           if (option) {
//             categoryScores[option.category]++;
//           }
//         } else if (question.type === 'multiple') {
//           // Ensure answer is an array (it should be, but just in case)
//           const answerArray = Array.isArray(answer) ? answer : [answer];
//           answerArray.forEach(ans => {
//             const option = question.options.find(opt => opt.value === ans);
//             if (option) {
//               categoryScores[option.category]++;
//             }
//           });
//         }
//       }
//     });

//     // Rest of your code remains the same...
//     // Determine recommended stream
//     const recommendedStream = Object.keys(categoryScores).reduce((a, b) => 
//       categoryScores[a] > categoryScores[b] ? a : b
//     );

//     // Get top interests
//     const interests = Object.entries(answers)
//       .filter(([questionId, answer]) => {
//         const id = parseInt(questionId);
//         const question = questions.find(q => q.id === id);
//         return question && question.type === 'multiple';
//       })
//       .flatMap(([questionId, answer]) => Array.isArray(answer) ? answer : [answer])
//       .slice(0, 5);

//     // Determine personality type
//     let personalityType = 'Balanced';
//     const maxScore = Math.max(...Object.values(categoryScores));
//     if (maxScore > 0) {
//       if (categoryScores.science >= maxScore) personalityType = 'Analytical';
//       else if (categoryScores.arts >= maxScore) personalityType = 'Creative';
//       else if (categoryScores.commerce >= maxScore) personalityType = 'Practical';
//       else if (categoryScores.vocational >= maxScore) personalityType = 'Hands-on';
//     }

//     const quizResults = {
//       recommendedStream: recommendedStream.charAt(0).toUpperCase() + recommendedStream.slice(1),
//       interests,
//       personalityType,
//       categoryScores,
//       completedAt: new Date().toISOString()
//     };

//     setResults(quizResults);
//     setQuizResults(quizResults);
//     setIsCompleted(true);
//     setShowResults(true);
//     setLoading(false);
    
//     toast.success('Quiz completed successfully!');
//   }, 1500);
// };

//   const resetQuiz = () => {
//     setCurrentQuestion(0);
//     setAnswers({});
//     setIsCompleted(false);
//     setShowResults(false);
//     setResults(null);
//   };

//   const currentQ = questions[currentQuestion];
//   const progress = ((currentQuestion + 1) / questions.length) * 100;
//   const canProceed = answers[currentQ?.id] && 
//     (currentQ?.type === 'single' || 
//      (currentQ?.type === 'multiple' && answers[currentQ.id].length > 0));

//   if (showResults && results) {
//     return (
//       <div className="quiz-results">
//         <div className="container">
//           <div className="results-header">
//             <h1 className="results-title">Your CareerSync Interest Mapper Results</h1>
//             <p className="results-subtitle">
//               Based on your responses, here are your personalized recommendations
//             </p>
//           </div>

//           <div className="results-content">
//             <div className="result-card primary">
//               <div className="result-icon">
//                 <CheckCircle className="result-icon-svg" />
//               </div>
//               <div className="result-content">
//                 <h2 className="result-title">Recommended Stream</h2>
//                 <div className="recommended-stream">
//                   {results.recommendedStream}
//                 </div>
//                 <p className="result-description">
//                   This stream aligns best with your interests and strengths
//                 </p>
//               </div>
//             </div>

//             <div className="results-grid">
//               <div className="result-card">
//                 <h3 className="card-title">Your Interests</h3>
//                 <div className="interests-list">
//                   {results.interests.map((interest, index) => (
//                     <span key={index} className="interest-tag">
//                       {interest.replace('_', ' ').toUpperCase()}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div className="result-card">
//                 <h3 className="card-title">Personality Type</h3>
//                 <div className="personality-type">
//                   {results.personalityType}
//                 </div>
//                 <p className="personality-description">
//                   {getPersonalityDescription(results.personalityType)}
//                 </p>
//               </div>

//               <div className="result-card">
//                 <h3 className="card-title">Stream Scores</h3>
//                 <div className="scores-chart">
//                   {Object.entries(results.categoryScores).map(([stream, score]) => (
//                     <div key={stream} className="score-item">
//                       <span className="score-label">
//                         {stream.charAt(0).toUpperCase() + stream.slice(1)}
//                       </span>
//                       <div className="score-bar">
//                         <div 
//                           className="score-fill"
//                           style={{ width: `${(score / Math.max(...Object.values(results.categoryScores))) * 100}%` }}
//                         />
//                       </div>
//                       <span className="score-value">{score}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="results-actions">
//               <button onClick={resetQuiz} className="btn btn-secondary">
//                 <RotateCcw className="btn-icon" />
//                 Retake Quiz
//               </button>
//               <button 
//                 onClick={() => navigate('/courses')} 
//                 className="btn btn-primary"
//               >
//                 View Course Recommendations
//                 <ArrowRight className="btn-icon" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="quiz-container">
//       <div className="quiz-header">
//         <div className="quiz-progress">
//           <div className="progress-bar">
//             <div 
//               className="progress-fill" 
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           <span className="progress-text">
//             Question {currentQuestion + 1} of {questions.length}
//           </span>
//         </div>
//       </div>

//       <div className="quiz-question">
//         <h2 className="question-title">{currentQ.question}</h2>
        
//         <div className="quiz-options">
//           {currentQ.options.map((option, index) => {
//             const isSelected = currentQ.type === 'single' 
//               ? answers[currentQ.id] === option.value
//               : answers[currentQ.id]?.includes(option.value);
              
//             return (
//               <label
//                 key={index}
//                 className={`quiz-option ${isSelected ? 'selected' : ''}`}
//               >
//                 <input
//                   type={currentQ.type === 'single' ? 'radio' : 'checkbox'}
//                   name={`question-${currentQ.id}`}
//                   value={option.value}
//                   checked={isSelected}
//                   onChange={(e) => {
//                     if (currentQ.type === 'single') {
//                       handleAnswer(currentQ.id, option.value);
//                     } else {
//                       const currentAnswers = answers[currentQ.id] || [];
//                       if (e.target.checked) {
//                         handleAnswer(currentQ.id, [...currentAnswers, option.value]);
//                       } else {
//                         handleAnswer(currentQ.id, currentAnswers.filter(a => a !== option.value));
//                       }
//                     }
//                   }}
//                   className="option-input"
//                 />
//                 <span className="option-text">{option.label}</span>
//               </label>
//             );
//           })}
//         </div>
//       </div>

//       <div className="quiz-navigation">
//         <button
//           onClick={handlePrevious}
//           disabled={currentQuestion === 0}
//           className="btn btn-outline"
//         >
//           <ArrowLeft className="btn-icon" />
//           Previous
//         </button>
        
//        <button
//     onClick={() => {
//       if (currentQuestion === questions.length - 1) {
//         calculateResults();  // ✅ Call results calculation on last question
//       } else {
//         handleNext();
//       }
//     }}
//     disabled={!canProceed}
//     className="btn btn-primary"
//   >
//     {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next'}
//     <ArrowRight className="btn-icon" />
//   </button>
// </div>
//     </div>
//   );
// };

// const getPersonalityDescription = (type) => {
//   const descriptions = {
//     'Analytical': 'You enjoy logical thinking, problem-solving, and working with data and systems.',
//     'Creative': 'You thrive in artistic and innovative environments, expressing ideas through various mediums.',
//     'Practical': 'You prefer hands-on approaches and real-world applications of knowledge.',
//     'Hands-on': 'You learn best through doing and enjoy working with tools and materials.',
//     'Balanced': 'You have a well-rounded approach to learning and can adapt to various environments.'
//   };
//   return descriptions[type] || descriptions['Balanced'];
// };

// export default Quiz;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, RotateCcw } from 'lucide-react';
import { useUser } from '../context/UserContext';
import toast from 'react-hot-toast';

const Quiz = () => {
  const navigate = useNavigate();
  const { setQuizResults, setLoading } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const questions = [
    {
      id: 1,
      question: "What is your current academic stage?",
      type: "single",
      options: [
        { value: "choosing_stream", label: "Looking to choose a stream (e.g., after 10th)", category: "vocational" },
        { value: "chosen_stream", label: "Already chosen a stream and looking for career options", category: "science" }
      ]
    },
    {
      id: 2,
      question: "If you have chosen a stream or are leaning towards one, which one is it?",
      type: "single",
      options: [
        { value: "science_medical", label: "Science (Medical)", category: "science" },
        { value: "science_non_medical", label: "Science (Non-Medical)", category: "science" },
        { value: "commerce", label: "Commerce", category: "commerce" },
        { value: "arts", label: "Arts/Humanities", category: "arts" },
        { value: "not_sure", label: "Not sure yet", category: "vocational" }
      ]
    },
    {
      id: 3,
      question: "What kind of career paths interest you the most in Science?",
      type: "single",
      options: [
        { value: "btech", label: "B.Tech (Engineering)", category: "science" },
        { value: "bsc", label: "B.Sc (Research / Pure Sciences)", category: "science" },
        { value: "mbbs", label: "MBBS / Medical fields", category: "science" },
        { value: "not_applicable", label: "Not applicable to me", category: "arts" }
      ]
    },
    {
      id: 4,
      question: "What type of activities do you enjoy most?",
      type: "single",
      options: [
        { value: "creative", label: "Creative activities (art, writing, music)", category: "arts" },
        { value: "analytical", label: "Problem-solving and analysis", category: "science" },
        { value: "social", label: "Working with people and communication", category: "commerce" },
        { value: "technical", label: "Building and fixing things", category: "vocational" }
      ]
    },
    {
      id: 5,
      question: "Which subjects do you perform best in?",
      type: "multiple",
      options: [
        { value: "mathematics", label: "Mathematics", category: "science" },
        { value: "science", label: "Science (Physics, Chemistry, Biology)", category: "science" },
        { value: "languages", label: "Languages and Literature", category: "arts" },
        { value: "social_studies", label: "Social Studies and History", category: "arts" },
        { value: "commerce", label: "Commerce and Economics", category: "commerce" },
        { value: "computer", label: "Computer Science", category: "science" }
      ]
    },
    {
      id: 6,
      question: "What kind of work environment appeals to you?",
      type: "single",
      options: [
        { value: "office", label: "Office environment with regular hours", category: "commerce" },
        { value: "lab", label: "Laboratory or research setting", category: "science" },
        { value: "field", label: "Field work and outdoor activities", category: "science" },
        { value: "creative_space", label: "Creative studio or workshop", category: "arts" },
        { value: "classroom", label: "Teaching and educational setting", category: "arts" }
      ]
    },
    {
      id: 7,
      question: "What motivates you most in your studies?",
      type: "single",
      options: [
        { value: "knowledge", label: "Gaining knowledge and understanding", category: "science" },
        { value: "creativity", label: "Expressing creativity and innovation", category: "arts" },
        { value: "success", label: "Achieving success and recognition", category: "commerce" },
        { value: "helping", label: "Helping others and making a difference", category: "arts" },
        { value: "challenge", label: "Solving complex problems", category: "science" }
      ]
    },
    {
      id: 8,
      question: "What type of challenges do you enjoy?",
      type: "single",
      options: [
        { value: "logical", label: "Logical and mathematical problems", category: "science" },
        { value: "creative", label: "Creative and design challenges", category: "arts" },
        { value: "social", label: "Social and interpersonal challenges", category: "commerce" },
        { value: "technical", label: "Technical and mechanical challenges", category: "vocational" },
        { value: "analytical", label: "Data analysis and research", category: "science" }
      ]
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResults = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const categoryScores = {
        science: 0,
        arts: 0,
        commerce: 0,
        vocational: 0
      };

      // Calculate scores based on answers
      Object.entries(answers).forEach(([questionId, answer]) => {
        // Convert questionId to number
        const id = Number(questionId);
        const question = questions.find(q => q.id === id);
        
        if (question) {
          if (question.type === 'single') {
            const option = question.options.find(opt => opt.value === answer);
            if (option) {
              categoryScores[option.category]++;
            }
          } else if (question.type === 'multiple') {
            // Ensure answer is an array
            const answerArray = Array.isArray(answer) ? answer : [answer];
            answerArray.forEach(ans => {
              const option = question.options.find(opt => opt.value === ans);
              if (option) {
                categoryScores[option.category]++;
              }
            });
          }
        }
      });

      // Determine recommended stream
      const recommendedStream = Object.keys(categoryScores).reduce((a, b) => 
        categoryScores[a] > categoryScores[b] ? a : b
      );

      // Get top interests
      const interests = Object.entries(answers)
        .filter(([questionId, answer]) => {
          const id = Number(questionId);
          const question = questions.find(q => q.id === id);
          return question && question.type === 'multiple';
        })
        .flatMap(([questionId, answer]) => {
          // Ensure answer is an array
          return Array.isArray(answer) ? answer : [answer];
        })
        .slice(0, 5);

      // Determine personality type
      let personalityType = 'Balanced';
      const maxScore = Math.max(...Object.values(categoryScores));
      if (maxScore > 0) {
        if (categoryScores.science >= maxScore) personalityType = 'Analytical';
        else if (categoryScores.arts >= maxScore) personalityType = 'Creative';
        else if (categoryScores.commerce >= maxScore) personalityType = 'Practical';
        else if (categoryScores.vocational >= maxScore) personalityType = 'Hands-on';
      }

      const quizResults = {
        recommendedStream: recommendedStream.charAt(0).toUpperCase() + recommendedStream.slice(1),
        interests,
        personalityType,
        categoryScores,
        completedAt: new Date().toISOString()
      };

      setResults(quizResults);
      setQuizResults(quizResults);
      setIsCompleted(true);
      setShowResults(true);
      setLoading(false);
      
      toast.success('Quiz completed successfully!');
      navigate('/courses');

    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setShowResults(false);
    setResults(null);
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const canProceed = answers[currentQ?.id] && 
    (currentQ?.type === 'single' || 
     (currentQ?.type === 'multiple' && answers[currentQ.id].length > 0));

  if (showResults && results) {
    return (
      <div className="quiz-results">
        <div className="container">
          <div className="results-header">
            <h1 className="results-title">Your CareerSync Interest Mapper Results</h1>
            <p className="results-subtitle">
              Based on your responses, here are your personalized recommendations
            </p>
          </div>

          <div className="results-content">
            <div className="result-card primary">
              <div className="result-icon">
                <CheckCircle className="result-icon-svg" />
              </div>
              <div className="result-content">
                <h2 className="result-title">Recommended Stream</h2>
                <div className="recommended-stream">
                  {results.recommendedStream}
                </div>
                <p className="result-description">
                  This stream aligns best with your interests and strengths
                </p>
              </div>
            </div>

            <div className="results-grid">
              <div className="result-card">
                <h3 className="card-title">Your Interests</h3>
                <div className="interests-list">
                  {results.interests.map((interest, index) => (
                    <span key={index} className="interest-tag">
                      {interest.replace('_', ' ').toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="result-card">
                <h3 className="card-title">Personality Type</h3>
                <div className="personality-type">
                  {results.personalityType}
                </div>
                <p className="personality-description">
                  {getPersonalityDescription(results.personalityType)}
                </p>
              </div>

              <div className="result-card">
                <h3 className="card-title">Stream Scores</h3>
                <div className="scores-chart">
                  {Object.entries(results.categoryScores).map(([stream, score]) => (
                    <div key={stream} className="score-item">
                      <span className="score-label">
                        {stream.charAt(0).toUpperCase() + stream.slice(1)}
                      </span>
                      <div className="score-bar">
                        <div 
                          className="score-fill"
                          style={{ width: `${(score / Math.max(...Object.values(results.categoryScores))) * 100}%` }}
                        />
                      </div>
                      <span className="score-value">{score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="results-actions">
              <button onClick={resetQuiz} className="btn btn-secondary">
                <RotateCcw className="btn-icon" />
                Retake Quiz
              </button>
              <button 
                onClick={() => navigate('/courses')} 
                className="btn btn-primary"
              >
                View Course Recommendations
                <ArrowRight className="btn-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="progress-text">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
      </div>

      <div className="quiz-question">
        <h2 className="question-title">{currentQ.question}</h2>
        
        <div className="quiz-options">
          {currentQ.options.map((option, index) => {
            const isSelected = currentQ.type === 'single' 
              ? answers[currentQ.id] === option.value
              : answers[currentQ.id]?.includes(option.value);
              
            return (
              <label
                key={index}
                className={`quiz-option ${isSelected ? 'selected' : ''}`}
              >
                <input
                  type={currentQ.type === 'single' ? 'radio' : 'checkbox'}
                  name={`question-${currentQ.id}`}
                  value={option.value}
                  checked={isSelected}
                  onChange={(e) => {
                    if (currentQ.type === 'single') {
                      handleAnswer(currentQ.id, option.value);
                    } else {
                      const currentAnswers = answers[currentQ.id] || [];
                      if (e.target.checked) {
                        handleAnswer(currentQ.id, [...currentAnswers, option.value]);
                      } else {
                        handleAnswer(currentQ.id, currentAnswers.filter(a => a !== option.value));
                      }
                    }
                  }}
                  className="option-input"
                />
                <span className="option-text">{option.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="quiz-navigation">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="btn btn-outline"
        >
          <ArrowLeft className="btn-icon" />
          Previous
        </button>
        
        <button
          onClick={() => {
            if (currentQuestion === questions.length - 1) {
              calculateResults();

            } else {
              handleNext();
            }
          }}
          disabled={!canProceed}
          className="btn btn-primary"
        >
          {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next'}
          <ArrowRight className="btn-icon" />
        </button>
      </div>
    </div>
  );
};

const getPersonalityDescription = (type) => {
  const descriptions = {
    'Analytical': 'You enjoy logical thinking, problem-solving, and working with data and systems.',
    'Creative': 'You thrive in artistic and innovative environments, expressing ideas through various mediums.',
    'Practical': 'You prefer hands-on approaches and real-world applications of knowledge.',
    'Hands-on': 'You learn best through doing and enjoy working with tools and materials.',
    'Balanced': 'You have a well-rounded approach to learning and can adapt to various environments.'
  };
  return descriptions[type] || descriptions['Balanced'];
};

export default Quiz;