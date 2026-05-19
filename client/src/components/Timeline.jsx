import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlertCircle, CheckCircle, BookOpen, GraduationCap, Award, Users } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Timeline = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [filteredEvents, setFilteredEvents] = useState([]);

  const categories = [
    { value: 'all', label: 'All Events' },
    { value: 'admission', label: 'Admissions' },
    { value: 'exam', label: 'Exams' },
    { value: 'scholarship', label: 'Scholarships' },
    { value: 'registration', label: 'Registrations' },
    { value: 'result', label: 'Results' }
  ];

  const months = [
    { value: 'all', label: 'All Months' },
    { value: 'january', label: 'January' },
    { value: 'february', label: 'February' },
    { value: 'march', label: 'March' },
    { value: 'april', label: 'April' },
    { value: 'may', label: 'May' },
    { value: 'june', label: 'June' },
    { value: 'july', label: 'July' },
    { value: 'august', label: 'August' },
    { value: 'september', label: 'September' },
    { value: 'october', label: 'October' },
    { value: 'november', label: 'November' },
    { value: 'december', label: 'December' }
  ];

  const events = [
    {
      id: 1,
      title: 'University of Kashmir Admissions Open',
      description: 'Online application process begins for undergraduate courses in J&K',
      date: '2024-06-15',
      category: 'admission',
      priority: 'high',
      university: 'University of Kashmir',
      deadline: '2024-07-15',
      requirements: ['Class 12 marksheet', 'Passport size photo', 'Domicile certificate', 'Category certificate'],
      website: 'www.kashmiruniversity.ac.in',
      icon: BookOpen
    },
    {
      id: 2,
      title: 'J&K CET (Common Entrance Test)',
      description: 'Common entrance test for various undergraduate programs in J&K universities',
      date: '2024-06-20',
      category: 'exam',
      priority: 'high',
      university: 'J&K Board of Professional Entrance Examinations',
      duration: '3 hours',
      subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'General Knowledge'],
      website: 'www.jkbopee.gov.in',
      icon: GraduationCap
    },
    {
      id: 3,
      title: 'Central Sector Scholarship Application',
      description: 'Merit-based scholarship for economically weaker students',
      date: '2024-06-25',
      category: 'scholarship',
      priority: 'medium',
      university: 'Ministry of Education',
      amount: '₹10,000-20,000/year',
      eligibility: 'Family income less than ₹4.5 LPA',
      website: 'www.scholarships.gov.in',
      icon: Award
    },
    {
      id: 4,
      title: 'JAM Registration Opens',
      description: 'Joint Admission Test for M.Sc. programs',
      date: '2024-07-01',
      category: 'registration',
      priority: 'medium',
      university: 'IITs',
      deadline: '2024-09-15',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
      website: 'www.jam.iitd.ac.in',
      icon: BookOpen
    },
    {
      id: 5,
      title: 'UPSC Civil Services Preliminary Exam',
      description: 'Preliminary examination for civil services',
      date: '2024-07-07',
      category: 'exam',
      priority: 'high',
      university: 'UPSC',
      duration: '2 hours each paper',
      subjects: ['General Studies', 'CSAT'],
      website: 'www.upsc.gov.in',
      icon: GraduationCap
    },
    {
      id: 6,
      title: 'SSC Combined Graduate Level Exam',
      description: 'Recruitment examination for various government posts',
      date: '2024-07-14',
      category: 'exam',
      priority: 'high',
      university: 'Staff Selection Commission',
      duration: '2 hours',
      subjects: ['General Intelligence', 'General Awareness', 'Quantitative Aptitude', 'English'],
      website: 'www.ssc.nic.in',
      icon: Users
    },
    {
      id: 7,
      title: 'Banking Exams (IBPS PO)',
      description: 'Probationary Officer recruitment in public sector banks',
      date: '2024-08-15',
      category: 'exam',
      priority: 'high',
      university: 'IBPS',
      duration: '2 hours',
      subjects: ['Reasoning', 'English Language', 'Quantitative Aptitude', 'General Awareness'],
      website: 'www.ibps.in',
      icon: BookOpen
    },
    {
      id: 8,
      title: 'Railway Recruitment Board Exams',
      description: 'Various technical and non-technical posts in Indian Railways',
      date: '2024-08-20',
      category: 'exam',
      priority: 'medium',
      university: 'Railway Recruitment Board',
      posts: ['Junior Engineer', 'Station Master', 'Clerk', 'Technician'],
      website: 'www.rrbcdg.gov.in',
      icon: Users
    },
    {
      id: 9,
      title: 'State PSC Exams',
      description: 'State Public Service Commission examinations',
      date: '2024-09-01',
      category: 'exam',
      priority: 'medium',
      university: 'Various State PSCs',
      posts: ['Deputy Collector', 'Tehsildar', 'Block Development Officer'],
      website: 'Various state websites',
      icon: GraduationCap
    },
    {
      id: 10,
      title: 'University Results Declaration',
      description: 'Declaration of semester and annual examination results',
      date: '2024-09-15',
      category: 'result',
      priority: 'high',
      university: 'Various Universities',
      results: ['B.A.', 'B.Sc.', 'B.Com.', 'M.A.', 'M.Sc.', 'M.Com.'],
      website: 'University specific',
      icon: CheckCircle
    },
    {
      id: 11,
      title: 'Scholarship Disbursement',
      description: 'Distribution of various government scholarships',
      date: '2024-10-01',
      category: 'scholarship',
      priority: 'low',
      university: 'Ministry of Education',
      scholarships: ['Merit Scholarship', 'Means Scholarship', 'Minority Scholarship'],
      website: 'www.scholarships.gov.in',
      icon: Award
    },
    {
      id: 12,
      title: 'Winter Admission Session',
      description: 'Second round of admissions for various courses',
      date: '2024-12-01',
      category: 'admission',
      priority: 'medium',
      university: 'Various Universities',
      courses: ['Distance Learning', 'Evening Courses', 'Part-time Programs'],
      website: 'University specific',
      icon: BookOpen
    }
  ];

  useEffect(() => {
    let filtered = events;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    
    if (selectedMonth !== 'all') {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        const eventMonth = eventDate.toLocaleString('default', { month: 'long' }).toLowerCase();
        return eventMonth === selectedMonth;
      });
    }
    
    // Sort by date
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    setFilteredEvents(filtered);
  }, [selectedCategory, selectedMonth]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-default';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      admission: BookOpen,
      exam: GraduationCap,
      scholarship: Award,
      registration: Users,
      result: CheckCircle
    };
    return icons[category] || Calendar;
  };

  const getCategoryColor = (category) => {
    const colors = {
      admission: 'category-admission',
      exam: 'category-exam',
      scholarship: 'category-scholarship',
      registration: 'category-registration',
      result: 'category-result'
    };
    return colors[category] || 'category-default';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  const isUpcoming = (dateString) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    return eventDate >= today;
  };

  return (
    <div className="timeline">
      <div className="container">
        <div className="timeline-header">
          <h1 className="timeline-title">Academic Timeline</h1>
          <p className="timeline-subtitle">
            Stay updated with important dates, deadlines, and events for your academic journey
          </p>
        </div>

        {/* Filters */}
        <div className="timeline-filters">
          <div className="filter-group">
            <Calendar className="filter-icon" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <Clock className="filter-icon" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="filter-select"
            >
              {months.map(month => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Timeline Events */}
        <div className="timeline-events">
          {filteredEvents.map((event, index) => {
            const Icon = event.icon;
            const CategoryIcon = getCategoryIcon(event.category);
            const daysUntil = getDaysUntil(event.date);
            const upcoming = isUpcoming(event.date);
            
            return (
              <div key={event.id} className={`timeline-item ${upcoming ? 'upcoming' : 'past'}`}>
                <div className="timeline-marker">
                  <div className="marker-icon">
                    <Icon className="marker-icon-svg" />
                  </div>
                  <div className="timeline-line" />
                </div>
                
                <div className="timeline-content">
                  <div className="event-header">
                    <div className="event-title-section">
                      <h3 className="event-title">{event.title}</h3>
                      <div className="event-meta">
                        <span className="event-date">{formatDate(event.date)}</span>
                        <span className={`event-priority ${getPriorityColor(event.priority)}`}>
                          {event.priority}
                        </span>
                        <span className={`event-category ${getCategoryColor(event.category)}`}>
                          <CategoryIcon className="category-icon" size={14} />
                          {event.category}
                        </span>
                      </div>
                    </div>
                    <div className="event-timing">
                      <div className="days-until">
                        {daysUntil}
                      </div>
                      {upcoming && (
                        <div className="upcoming-badge">
                          <AlertCircle className="upcoming-icon" size={16} />
                          Upcoming
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="event-description">{event.description}</p>
                  
                  <div className="event-details">
                    <div className="detail-item">
                      <strong>University/Organization:</strong> {event.university}
                    </div>
                    
                    {event.deadline && (
                      <div className="detail-item">
                        <strong>Application Deadline:</strong> {formatDate(event.deadline)}
                      </div>
                    )}
                    
                    {event.duration && (
                      <div className="detail-item">
                        <strong>Duration:</strong> {event.duration}
                      </div>
                    )}
                    
                    {event.amount && (
                      <div className="detail-item">
                        <strong>Amount:</strong> {event.amount}
                      </div>
                    )}
                    
                    {event.eligibility && (
                      <div className="detail-item">
                        <strong>Eligibility:</strong> {event.eligibility}
                      </div>
                    )}
                    
                    {event.subjects && (
                      <div className="detail-item">
                        <strong>Subjects:</strong> {event.subjects.join(', ')}
                      </div>
                    )}
                    
                    {event.requirements && (
                      <div className="detail-item">
                        <strong>Requirements:</strong> {event.requirements.join(', ')}
                      </div>
                    )}
                    
                    {event.posts && (
                      <div className="detail-item">
                        <strong>Posts:</strong> {event.posts.join(', ')}
                      </div>
                    )}
                    
                    {event.results && (
                      <div className="detail-item">
                        <strong>Results:</strong> {event.results.join(', ')}
                      </div>
                    )}
                    
                    {event.courses && (
                      <div className="detail-item">
                        <strong>Courses:</strong> {event.courses.join(', ')}
                      </div>
                    )}
                    
                    {event.scholarships && (
                      <div className="detail-item">
                        <strong>Scholarships:</strong> {event.scholarships.join(', ')}
                      </div>
                    )}
                  </div>

                  {event.website && (
                    <div className="event-actions">
                      <a 
                        href={`https://${event.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="website-link"
                      >
                        Visit Official Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredEvents.length === 0 && (
          <div className="no-events">
            <Calendar className="no-events-icon" />
            <h3>No events found</h3>
            <p>Try adjusting your filters to see more events</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="timeline-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <AlertCircle className="stat-icon-svg" />
              </div>
              <div className="stat-content">
                <div className="stat-number">
                  {filteredEvents.filter(e => isUpcoming(e.date) && e.priority === 'high').length}
                </div>
                <div className="stat-label">High Priority Events</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Calendar className="stat-icon-svg" />
              </div>
              <div className="stat-content">
                <div className="stat-number">
                  {filteredEvents.filter(e => isUpcoming(e.date)).length}
                </div>
                <div className="stat-label">Upcoming Events</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <GraduationCap className="stat-icon-svg" />
              </div>
              <div className="stat-content">
                <div className="stat-number">
                  {filteredEvents.filter(e => e.category === 'exam').length}
                </div>
                <div className="stat-label">Examinations</div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Award className="stat-icon-svg" />
              </div>
              <div className="stat-content">
                <div className="stat-number">
                  {filteredEvents.filter(e => e.category === 'scholarship').length}
                </div>
                <div className="stat-label">Scholarships</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
