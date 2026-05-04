import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Save, Edit3, BookOpen, MapPin, Calendar, Award, BarChart3 } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUser, isAuthenticated, quizResults, preferences, updatePreferences } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    location: '',
    currentClass: '',
    stream: '',
    interests: [],
    academicGoals: '',
    preferredSubjects: []
  });

  const [isLoading, setIsLoading] = useState(false);

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say' }
  ];

  const classOptions = [
    { value: '10th', label: 'Class 10' },
    { value: '11th', label: 'Class 11' },
    { value: '12th', label: 'Class 12' },
    { value: 'graduating', label: 'Recently Graduated' },
    { value: 'gap-year', label: 'Gap Year' }
  ];

  const streamOptions = [
    { value: 'science', label: 'Science' },
    { value: 'arts', label: 'Arts' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'vocational', label: 'Vocational' },
    { value: 'undecided', label: 'Undecided' }
  ];

  const interestOptions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'History', 'Political Science', 'Economics', 'Psychology', 'Literature',
    'Business', 'Finance', 'Marketing', 'Management', 'Accounting',
    'Art', 'Music', 'Dance', 'Theater', 'Design',
    'Sports', 'Fitness', 'Health', 'Environment', 'Social Work',
    'Technology', 'Engineering', 'Research', 'Teaching', 'Law'
  ];

  const subjectOptions = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'History', 'Political Science', 'Economics', 'Psychology', 'Literature',
    'Business Studies', 'Accountancy', 'Statistics', 'Geography', 'Sociology',
    'Philosophy', 'Fine Arts', 'Music', 'Physical Education', 'Environmental Science'
  ];

  const academicGoalOptions = [
    'Pursue higher education (Masters/PhD)',
    'Get a government job',
    'Start my own business',
    'Work in corporate sector',
    'Become a teacher/professor',
    'Work in research field',
    'Join civil services',
    'Work in healthcare',
    'Work in technology sector',
    'Work in social sector',
    'Still exploring options'
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.fullname || user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        location: user.location || preferences?.location || '',
        currentClass: user.currentClass || '',
        stream: user.stream || preferences?.stream || '',
        interests: user.interests || preferences?.interests || [],
        academicGoals: user.academicGoals || '',
        preferredSubjects: user.preferredSubjects || []
      });
    }
  }, [user, preferences]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Call the backend to update account details (fullname + email)
      const data = await api.patch("/users/update-account", {
        fullname: formData.name,
        email: formData.email,
      });

      // Update user context with backend response
      const updatedUser = {
        ...data.data,
        // Keep local-only fields that aren't stored on the backend yet
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        location: formData.location,
        currentClass: formData.currentClass,
        stream: formData.stream,
        interests: formData.interests,
        academicGoals: formData.academicGoals,
        preferredSubjects: formData.preferredSubjects,
      };
      
      updateUser(updatedUser);
      updatePreferences({
        location: formData.location,
        stream: formData.stream,
        interests: formData.interests
      });
      
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.fullname || user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        location: user.location || preferences?.location || '',
        currentClass: user.currentClass || '',
        stream: user.stream || preferences?.stream || '',
        interests: user.interests || preferences?.interests || [],
        academicGoals: user.academicGoals || '',
        preferredSubjects: user.preferredSubjects || []
      });
    }
    setIsEditing(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="profile-login">
        <div className="container">
          <div className="login-prompt">
            <User className="login-icon" />
            <h2>Login to View Profile</h2>
            <p>Sign in to view and manage your profile information</p>
            <button 
              onClick={() => navigate('/login')}
              className="btn btn-primary"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile">
      <div className="container">
        <div className="profile-header">
          <h1 className="profile-title">My Profile</h1>
          <p className="profile-subtitle">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="profile-content">
          {/* Personal Information */}
          <div className="profile-section">
            <div className="section-header">
              <h2 className="section-title">Personal Information</h2>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="edit-btn"
                >
                  <Edit3 className="edit-icon" />
                  Edit Profile
                </button>
              )}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-input"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-input"
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-input"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-select"
                >
                  <option value="">Select Gender</option>
                  {genderOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-input"
                  placeholder="Enter your city/state"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className="profile-section">
            <h2 className="section-title">Academic Information</h2>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Current Academic Level</label>
                <select
                  name="currentClass"
                  value={formData.currentClass}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-select"
                >
                  <option value="">Select Class</option>
                  {classOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Stream</label>
                <select
                  name="stream"
                  value={formData.stream}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="form-select"
                >
                  <option value="">Select Stream</option>
                  {streamOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Academic Goals</label>
              <select
                name="academicGoals"
                value={formData.academicGoals}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="form-select"
              >
                <option value="">Select your academic goals</option>
                {academicGoalOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Interests and Preferences */}
          <div className="profile-section">
            <h2 className="section-title">Interests and Preferences</h2>

            <div className="form-group">
              <label className="form-label">Areas of Interest</label>
              <div className="checkbox-grid">
                {interestOptions.map(interest => (
                  <label key={interest} className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleCheckboxChange('interests', interest)}
                      disabled={!isEditing}
                      className="checkbox-input"
                    />
                    <span className="custom-checkbox"></span>
                    <span className="checkbox-label">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Preferred Subjects</label>
              <div className="checkbox-grid">
                {subjectOptions.map(subject => (
                  <label key={subject} className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={formData.preferredSubjects.includes(subject)}
                      onChange={() => handleCheckboxChange('preferredSubjects', subject)}
                      disabled={!isEditing}
                      className="checkbox-input"
                    />
                    <span className="custom-checkbox"></span>
                    <span className="checkbox-label">{subject}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Quiz Results Summary */}
          {quizResults && (
            <div className="profile-section">
              <h2 className="section-title">Aptitude Assessment Results</h2>
              <div className="quiz-summary">
                <div className="quiz-summary-item">
                  <BarChart3 className="summary-icon" />
                  <div className="summary-content">
                    <h4>Recommended Stream</h4>
                    <p>{quizResults.recommendedStream}</p>
                  </div>
                </div>
                <div className="quiz-summary-item">
                  <Award className="summary-icon" />
                  <div className="summary-content">
                    <h4>Personality Type</h4>
                    <p>{quizResults.personalityType}</p>
                  </div>
                </div>
                <div className="quiz-summary-item">
                  <BookOpen className="summary-icon" />
                  <div className="summary-content">
                    <h4>Top Interests</h4>
                    <p>{quizResults.interests?.slice(0, 3).join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {isEditing && (
            <div className="profile-actions">
              <button
                onClick={handleCancel}
                className="btn btn-secondary"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="btn-icon" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
