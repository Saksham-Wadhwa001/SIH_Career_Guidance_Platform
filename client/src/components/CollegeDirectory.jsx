import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, Star, Users, BookOpen, Wifi, Home, GraduationCap, Phone, Mail, ExternalLink } from 'lucide-react';
import { useUser } from '../context/UserContext';

const CollegeDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [filteredColleges, setFilteredColleges] = useState([]);

  const states = [
    { value: 'all', label: 'All States' },
    { value: 'jammu_kashmir', label: 'Jammu & Kashmir' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'tamil_nadu', label: 'Tamil Nadu' },
    { value: 'west_bengal', label: 'West Bengal' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'uttar_pradesh', label: 'Uttar Pradesh' },
    { value: 'bihar', label: 'Bihar' }
  ];

  const streams = [
    { value: 'all', label: 'All Streams' },
    { value: 'science', label: 'Science' },
    { value: 'arts', label: 'Arts' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medical', label: 'Medical' }
  ];

  const colleges = [
    {
      id: 1,
      name: 'University of Kashmir',
      location: 'Srinagar, Jammu & Kashmir',
      state: 'jammu_kashmir',
      type: 'State University',
      established: 1948,
      rating: 4.2,
      totalStudents: 25000,
      courses: ['B.A.', 'B.Sc.', 'B.Com.', 'BBA', 'B.Tech', 'M.A.', 'M.Sc.', 'M.Com.', 'MBA', 'B.Ed.'],
      streams: ['science', 'arts', 'commerce', 'engineering'],
      cutOffs: {
        'B.A.': '60-75%',
        'B.Sc.': '65-80%',
        'B.Com.': '60-75%',
        'BBA': '70-85%'
      },
      facilities: ['Library', 'Hostel', 'Laboratory', 'Sports Complex', 'Cafeteria', 'WiFi', 'Computer Lab', 'Medical Center'],
      contact: {
        phone: '+91-194-2272096',
        email: 'info@kashmiruniversity.ac.in',
        website: 'www.kashmiruniversity.ac.in'
      },
      address: 'University of Kashmir, Hazratbal, Srinagar - 190006',
      admissionProcess: 'Merit-based and Entrance Exam',
      fees: {
        'B.A.': '₹8,000-15,000/year',
        'B.Sc.': '₹12,000-25,000/year',
        'B.Com.': '₹8,000-15,000/year'
      },
      highlights: [
        'Premier university of Jammu & Kashmir',
        'Beautiful campus in Srinagar',
        'Strong focus on research and innovation',
        'Affordable education for local students'
      ]
    },
    {
      id: 2,
      name: 'University of Jammu',
      location: 'Jammu, Jammu & Kashmir',
      state: 'jammu_kashmir',
      type: 'State University',
      established: 1969,
      rating: 4.0,
      totalStudents: 20000,
      courses: ['B.A.', 'B.Sc.', 'B.Com.', 'BBA', 'B.Tech', 'M.A.', 'M.Sc.', 'M.Com.', 'MBA', 'B.Ed.'],
      streams: ['science', 'arts', 'commerce', 'engineering'],
      cutOffs: {
        'B.A.': '55-70%',
        'B.Sc.': '60-75%',
        'B.Com.': '55-70%',
        'BBA': '65-80%'
      },
      facilities: ['Library', 'Hostel', 'Laboratory', 'Sports Complex', 'Cafeteria', 'WiFi', 'Computer Lab'],
      contact: {
        phone: '+91-191-2430830',
        email: 'info@jammuuniversity.ac.in',
        website: 'www.jammuuniversity.ac.in'
      },
      address: 'University of Jammu, Jammu - 180006',
      admissionProcess: 'Merit-based',
      fees: {
        'B.A.': '₹6,000-12,000/year',
        'B.Sc.': '₹10,000-20,000/year',
        'B.Com.': '₹6,000-12,000/year'
      },
      highlights: [
        'Leading university in Jammu region',
        'Modern infrastructure and facilities',
        'Strong industry connections',
        'Focus on skill development'
      ]
    },
    {
      id: 3,
      name: 'Sher-e-Kashmir University of Agricultural Sciences and Technology',
      location: 'Srinagar, Jammu & Kashmir',
      state: 'jammu_kashmir',
      type: 'State University',
      established: 1982,
      rating: 4.3,
      totalStudents: 8000,
      courses: ['B.Sc. Agriculture', 'B.V.Sc.', 'M.Sc. Agriculture', 'Ph.D. Agriculture'],
      streams: ['science', 'agriculture'],
      cutOffs: {
        'B.Sc. Agriculture': '70-85%',
        'B.V.Sc.': '75-90%',
        'M.Sc. Agriculture': '65-80%'
      },
      facilities: ['Library', 'Hostel', 'Laboratory', 'Research Farm', 'Cafeteria', 'WiFi', 'Computer Lab', 'Veterinary Hospital'],
      contact: {
        phone: '+91-194-2263150',
        email: 'info@skuastkashmir.ac.in',
        website: 'www.skuastkashmir.ac.in'
      },
      address: 'SKUAST-K, Shalimar, Srinagar - 190025',
      admissionProcess: 'Entrance Exam (JET)',
      fees: {
        'B.Sc. Agriculture': '₹15,000-25,000/year',
        'B.V.Sc.': '₹20,000-30,000/year',
        'M.Sc. Agriculture': '₹18,000-28,000/year'
      },
      highlights: [
        'Premier agricultural university in J&K',
        'Focus on sustainable agriculture',
        'Research in mountain agriculture',
        'Strong industry partnerships'
      ]
    },
    {
      id: 4,
      name: 'Islamic University of Science and Technology',
      location: 'Awantipora, Jammu & Kashmir',
      state: 'jammu_kashmir',
      type: 'State University',
      established: 2005,
      rating: 4.1,
      totalStudents: 5000,
      courses: ['B.Tech', 'M.Tech', 'MBA', 'BBA', 'M.A.', 'M.Sc.', 'Ph.D.'],
      streams: ['engineering', 'science', 'commerce'],
      cutOffs: {
        'B.Tech': '75-90%',
        'MBA': '70-85%',
        'BBA': '65-80%'
      },
      facilities: ['Library', 'Hostel', 'Laboratory', 'Sports Complex', 'Cafeteria', 'WiFi', 'Computer Lab', 'Incubation Center'],
      contact: {
        phone: '+91-1933-247954',
        email: 'info@islamicuniversity.edu.in',
        website: 'www.islamicuniversity.edu.in'
      },
      address: 'IUST, Awantipora, Pulwama - 192122',
      admissionProcess: 'Entrance Exam and Merit-based',
      fees: {
        'B.Tech': '₹25,000-40,000/year',
        'MBA': '₹30,000-50,000/year',
        'BBA': '₹20,000-35,000/year'
      },
      highlights: [
        'Modern technology-focused university',
        'Strong emphasis on innovation',
        'Industry-aligned curriculum',
        'Beautiful campus in Kashmir valley'
      ]
    },
    {
      id: 5,
      name: 'Central University of Kashmir',
      location: 'Srinagar, Jammu & Kashmir',
      state: 'jammu_kashmir',
      type: 'Central University',
      established: 2009,
      rating: 4.4,
      totalStudents: 3000,
      courses: ['B.A.', 'B.Sc.', 'M.A.', 'M.Sc.', 'M.Tech', 'MBA', 'Ph.D.'],
      streams: ['science', 'arts', 'commerce', 'engineering'],
      cutOffs: {
        'B.A.': '70-85%',
        'B.Sc.': '75-90%',
        'M.A.': '65-80%',
        'M.Sc.': '70-85%'
      },
      facilities: ['Library', 'Hostel', 'Laboratory', 'Sports Complex', 'Cafeteria', 'WiFi', 'Computer Lab', 'Research Center'],
      contact: {
        phone: '+91-194-2415073',
        email: 'info@cukashmir.ac.in',
        website: 'www.cukashmir.ac.in'
      },
      address: 'Central University of Kashmir, Srinagar - 190015',
      admissionProcess: 'Entrance Exam (CUCET)',
      fees: {
        'B.A.': '₹12,000-20,000/year',
        'B.Sc.': '₹15,000-25,000/year',
        'M.A.': '₹18,000-28,000/year',
        'M.Sc.': '₹20,000-30,000/year'
      },
      highlights: [
        'Central university status',
        'High-quality education',
        'Research opportunities',
        'Affordable fees for local students'
      ]
    },
    {
      id: 6,
      name: 'Baba Ghulam Shah Badshah University',
      location: 'Rajouri, Jammu & Kashmir',
      state: 'jammu_kashmir',
      type: 'State University',
      established: 2002,
      rating: 3.8,
      totalStudents: 4000,
      courses: ['B.A.', 'B.Sc.', 'B.Com.', 'BBA', 'M.A.', 'M.Sc.', 'M.Com.', 'MBA'],
      streams: ['science', 'arts', 'commerce'],
      cutOffs: {
        'B.A.': '50-65%',
        'B.Sc.': '55-70%',
        'B.Com.': '50-65%',
        'BBA': '60-75%'
      },
      facilities: ['Library', 'Hostel', 'Laboratory', 'Sports Complex', 'Cafeteria', 'WiFi', 'Computer Lab'],
      contact: {
        phone: '+91-1962-241004',
        email: 'info@bgsbu.ac.in',
        website: 'www.bgsbu.ac.in'
      },
      address: 'BGSBU, Rajouri - 185234',
      admissionProcess: 'Merit-based',
      fees: {
        'B.A.': '₹5,000-10,000/year',
        'B.Sc.': '₹8,000-15,000/year',
        'B.Com.': '₹5,000-10,000/year'
      },
      highlights: [
        'Affordable education in Rajouri',
        'Focus on local development',
        'Community engagement',
        'Skill-based programs'
      ]
    },
    {
      id: 7,
      name: 'National Institute of Technology (NIT), Srinagar',
      location: 'Srinagar, Jammu & Kashmir',
      state: 'jammu_kashmir',
      type: 'Government (Institute of National Importance)',
      established: 1960,
      rating: 4.5,
      totalStudents: 3500,
      courses: ['B.Tech', 'M.Tech', 'M.Sc.', 'Ph.D.'],
      streams: ['engineering', 'science'],
      cutOffs: {
        'B.Tech': 'JEE Main Rank: 25,000 - 80,000',
        'M.Tech': 'GATE Score Required',
        'M.Sc.': 'IIT JAM Rank'
      },
      facilities: ['Library', 'Hostel', 'High-Tech Labs', 'Sports Complex', 'Cafeteria', 'WiFi', 'Innovation Cell', 'Medical Center'],
      contact: {
        phone: '+91-194-2422032',
        email: 'info@nitsri.ac.in',
        website: 'www.nitsri.ac.in'
      },
      address: 'NIT Srinagar, Hazratbal, Srinagar - 190006',
      admissionProcess: 'Entrance Exam (JEE Main / JoSAA Counseling)',
      fees: {
        'B.Tech': '₹1,20,000-1,40,000/year',
        'M.Tech': '₹80,000-1,00,000/year',
        'M.Sc.': '₹40,000-60,000/year'
      },
      highlights: [
        'Institute of National Importance',
        'Excellent placement records in top tech companies',
        'Home state quota available for J&K students',
        'Stunning campus next to Dal Lake'
      ]
    },
    {
      id: 8,
      name: 'Indian Institute of Technology (IIT), Jammu',
      location: 'Jammu, Jammu & Kashmir',
      state: 'jammu_kashmir',
      type: 'Government (Institute of National Importance)',
      established: 2016,
      rating: 4.6,
      totalStudents: 1200,
      courses: ['B.Tech', 'M.Tech', 'Ph.D.'],
      streams: ['engineering', 'science'],
      cutOffs: {
        'B.Tech': 'JEE Advanced Rank: 4,000 - 15,000',
        'M.Tech': 'GATE Score Required'
      },
      facilities: ['Library', 'Hostel', 'Advanced Research Labs', 'Sports Complex', 'Cafeteria', 'WiFi', 'Incubation Center'],
      contact: {
        phone: '+91-191-2570381',
        email: 'info@iitjammu.ac.in',
        website: 'www.iitjammu.ac.in'
      },
      address: 'IIT Jammu, Jagti, Nagrota, Jammu - 181221',
      admissionProcess: 'Entrance Exam (JEE Advanced / JoSAA Counseling)',
      fees: {
        'B.Tech': '₹2,00,000-2,20,000/year',
        'M.Tech': '₹30,000-50,000/year'
      },
      highlights: [
        'Premier engineering institute of India',
        'World-class faculty and research facilities',
        'Rapidly growing infrastructure',
        'Top-tier corporate placements'
      ]
    },
    {
      id: 9,
      name: 'Government Medical College (GMC), Srinagar',
      location: 'Srinagar, Jammu & Kashmir',
      state: 'jammu_kashmir',
      type: 'Government',
      established: 1959,
      rating: 4.7,
      totalStudents: 1500,
      courses: ['MBBS', 'MD', 'MS', 'B.Sc. Paramedical'],
      streams: ['medical', 'science'],
      cutOffs: {
        'MBBS': 'NEET UG Score: 550+',
        'MD/MS': 'NEET PG Qualified',
        'B.Sc. Paramedical': 'JKBOPEE Merit'
      },
      facilities: ['Library', 'Hostel', 'Clinical Labs', 'Attached Hospital', 'Cafeteria', 'WiFi', 'Auditorium'],
      contact: {
        phone: '+91-194-2504114',
        email: 'principal@gmcs.edu.in',
        website: 'www.gmcs.edu.in'
      },
      address: 'GMC Srinagar, Karan Nagar, Srinagar - 190010',
      admissionProcess: 'Entrance Exam (NEET UG / BOPEE Counseling)',
      fees: {
        'MBBS': '₹25,000-30,000/year',
        'MD/MS': '₹50,000-75,000/year',
        'B.Sc. Paramedical': '₹10,000-20,000/year'
      },
      highlights: [
        'Oldest and most prestigious medical college in Kashmir',
        'Attached to major tertiary care hospitals',
        'Highly subsidized government fee structure',
        'Excellent clinical exposure'
      ]
    },
    {
      id: 10,
      name: 'Shri Mata Vaishno Devi University (SMVDU)',
      location: 'Katra, Jammu & Kashmir',
      state: 'jammu_kashmir',
      type: 'State/Deemed University',
      established: 1999,
      rating: 4.2,
      totalStudents: 2200,
      courses: ['B.Tech', 'B.Arch', 'MBA', 'M.Sc.', 'M.A.', 'Ph.D.'],
      streams: ['engineering', 'architecture', 'commerce', 'science', 'arts'],
      cutOffs: {
        'B.Tech': 'JEE Main Score / CUET',
        'B.Arch': 'NATA Score',
        'MBA': 'MAT/CMAT/CAT Score'
      },
      facilities: ['Library', 'Hostel', 'Laboratory', 'Sports Complex', 'Cafeteria', 'WiFi', 'Bank/ATM', 'Medical Center'],
      contact: {
        phone: '+91-1991-285524',
        email: 'info@smvdu.ac.in',
        website: 'www.smvdu.ac.in'
      },
      address: 'SMVDU Campus, Sub-Post Office, Katra - 182320',
      admissionProcess: 'Entrance Exams (JEE, NATA, CUET) & Direct Counseling',
      fees: {
        'B.Tech': '₹1,30,000-1,50,000/year',
        'B.Arch': '₹1,30,000-1,50,000/year',
        'MBA': '₹1,50,000-1,70,000/year'
      },
      highlights: [
        'Fully residential campus at the foothills of Trikuta Mountains',
        'Funded by Shri Mata Vaishno Devi Shrine Board',
        'Strong alumni network and placements',
        'Excellent architecture and management programs'
      ]
    },
    {
      id: 11,
      name: 'Indian Institute of Management (IIM), Jammu',
      location: 'Jammu, Jammu & Kashmir',
      state: 'jammu_kashmir',
      type: 'Government (Institute of National Importance)',
      established: 2016,
      rating: 4.6,
      totalStudents: 800,
      courses: ['MBA', 'IPM (BBA+MBA)', 'Ph.D.'],
      streams: ['commerce'],
      cutOffs: {
        'MBA': 'CAT Percentile: 90+',
        'IPM': 'JIPMAT Score'
      },
      facilities: ['Library', 'Hostel', 'Seminar Halls', 'Sports Complex', 'Cafeteria', 'WiFi', 'Business Incubator'],
      contact: {
        phone: '+91-191-2585837',
        email: 'info@iimj.ac.in',
        website: 'www.iimj.ac.in'
      },
      address: 'IIM Jammu, Jagti, Jammu - 181221',
      admissionProcess: 'Entrance Exam (CAT / JIPMAT) followed by Personal Interview',
      fees: {
        'MBA': '₹8,00,000-9,00,000/year',
        'IPM': '₹5,00,000-6,00,000/year'
      },
      highlights: [
        'Offers the unique 5-year Integrated Programme in Management (IPM)',
        'Off-campus center in Srinagar for executive education',
        'International student exchange programs',
        '100% placement record in top MNCs'
      ]
    },
    {
      id: 12,
      name: 'Sher-e-Kashmir University of Agricultural Sciences and Technology of Jammu (SKUAST-J)',
      location: 'Jammu, Jammu & Kashmir',
      state: 'jammu_kashmir',
      type: 'State University',
      established: 1999,
      rating: 4.1,
      totalStudents: 2000,
      courses: ['B.Sc. Agriculture', 'B.V.Sc. & A.H.', 'B.Tech Biotechnology', 'M.Sc.', 'Ph.D.'],
      streams: ['agriculture', 'science', 'medical'],
      cutOffs: {
        'B.Sc. Agriculture': 'SKUAST-J CET Merit',
        'B.V.Sc.': 'SKUAST-J CET / NEET'
      },
      facilities: ['Library', 'Hostel', 'Farms', 'Veterinary Clinics', 'Cafeteria', 'WiFi', 'Sports Complex'],
      contact: {
        phone: '+91-191-2262011',
        email: 'registrar@skuast.org',
        website: 'www.skuast.org'
      },
      address: 'SKUAST-Jammu, Main Campus Chatha, Jammu - 180009',
      admissionProcess: 'University Entrance Test (SKUAST-J CET)',
      fees: {
        'B.Sc. Agriculture': '₹20,000-35,000/year',
        'B.V.Sc.': '₹30,000-45,000/year',
        'B.Tech Biotechnology': '₹40,000-55,000/year'
      },
      highlights: [
        'Dedicated to agricultural research in the Jammu region',
        'Excellent veterinary sciences program',
        'Promotes agri-entrepreneurship',
        'Hands-on field training for students'
      ]
    }
  ];

  useEffect(() => {
    let filtered = colleges;
    
    if (searchTerm) {
      filtered = filtered.filter(college =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.courses.some(course => 
          course.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    if (selectedState !== 'all') {
      filtered = filtered.filter(college => college.state === selectedState);
    }
    
    if (selectedStream !== 'all') {
      filtered = filtered.filter(college => college.streams.includes(selectedStream));
    }
    
    setFilteredColleges(filtered);
  }, [searchTerm, selectedState, selectedStream]);

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="star-icon filled" size={16} />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="star-icon half" size={16} />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="star-icon empty" size={16} />);
    }
    
    return stars;
  };

  const getTypeColor = (type) => {
    const colors = {
      'Central University': 'bg-blue-50 text-blue-600 border-blue-200',
      'State University': 'bg-green-50 text-green-600 border-green-200',
      'Deemed University': 'bg-purple-50 text-purple-600 border-purple-200',
      'Private University': 'bg-orange-50 text-orange-600 border-orange-200'
    };
    return colors[type] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  return (
    <div className="college-directory">
      <div className="container">
        <div className="directory-header">
          <h1 className="directory-title">Government Colleges Directory</h1>
          <p className="directory-subtitle">
            Find government colleges near you with detailed information about programs, facilities, and admission requirements
          </p>
        </div>

        {/* Search and Filter */}
        <div className="search-filter-section">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search colleges, courses, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filters-row">
            <div className="filter-group">
              <Filter className="filter-icon" />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="filter-select"
              >
                {states.map(state => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <BookOpen className="filter-icon" />
              <select
                value={selectedStream}
                onChange={(e) => setSelectedStream(e.target.value)}
                className="filter-select"
              >
                {streams.map(stream => (
                  <option key={stream.value} value={stream.value}>
                    {stream.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="colleges-grid">
          {filteredColleges.map(college => (
            <div key={college.id} className="college-card">
              <div className="college-header">
                <div className="college-title-section">
                  <h3 className="college-name">{college.name}</h3>
                  <div className="college-location">
                    <MapPin className="location-icon" />
                    <span>{college.location}</span>
                  </div>
                </div>
                <div className="college-rating">
                  <div className="rating-stars">
                    {getRatingStars(college.rating)}
                  </div>
                  <span className="rating-text">{college.rating}/5</span>
                </div>
              </div>

              <div className="college-meta">
                <span className={`university-type ${getTypeColor(college.type)}`} style={{ color : 'black'}}>
                  {college.type}
                </span>
                <span className="established-year">
                  Est. {college.established}
                </span>
                <div className="student-count">
                  <Users className="student-icon" />
                  <span>{college.totalStudents.toLocaleString()}+ students</span>
                </div>
              </div>

              <div className="college-courses">
                <h4 className="courses-title">Available Courses:</h4>
                <div className="courses-list">
                  {college.courses.slice(0, 6).map((course, index) => (
                    <span key={index} className="course-tag">
                      {course}
                    </span>
                  ))}
                  {college.courses.length > 6 && (
                    <span className="course-tag more">
                      +{college.courses.length - 6} more
                    </span>
                  )}
                </div>
              </div>

              <div className="college-facilities">
                <h4 className="facilities-title">Facilities:</h4>
                <div className="facilities-list">
                  {college.facilities.slice(0, 4).map((facility, index) => (
                    <span key={index} className="facility-tag">
                      {facility}
                    </span>
                  ))}
                  {college.facilities.length > 4 && (
                    <span className="facility-tag more">
                      +{college.facilities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <div className="college-fees">
                <h4 className="fees-title">Approximate Fees:</h4>
                <div className="fees-list">
                  {Object.entries(college.fees).slice(0, 3).map(([course, fee]) => (
                    <div key={course} className="fee-item">
                      <span className="fee-course">{course}:</span>
                      <span className="fee-amount">{fee}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedCollege(college)}
                className="view-details-btn"
              >
                View Full Details
                <ExternalLink className="btn-icon" />
              </button>
            </div>
          ))}
        </div>

        {/* College Details Modal */}
        {selectedCollege && (
          <div className="college-modal-overlay" onClick={() => setSelectedCollege(null)}>
            <div className="college-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title-section">
                  <h2 className="modal-title">{selectedCollege.name}</h2>
                  <div className="modal-location">
                    <MapPin className="location-icon" />
                    <span>{selectedCollege.location}</span>
                  </div>
                </div>
                <button 
                  className="modal-close"
                  onClick={() => setSelectedCollege(null)}
                >
                  ×
                </button>
              </div>

              <div className="modal-content">
                <div className="modal-section">
                  <h3 className="section-title">University Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <strong>Type:</strong> {selectedCollege.type}
                    </div>
                    <div className="info-item">
                      <strong>Established:</strong> {selectedCollege.established}
                    </div>
                    <div className="info-item">
                      <strong>Total Students:</strong> {selectedCollege.totalStudents.toLocaleString()}
                    </div>
                    <div className="info-item">
                      <strong>Rating:</strong> 
                      <div className="modal-rating">
                        {getRatingStars(selectedCollege.rating)}
                        <span>{selectedCollege.rating}/5</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Contact Information</h3>
                  <div className="contact-info">
                    <div className="contact-item">
                      <Phone className="contact-icon" />
                      <span>{selectedCollege.contact.phone}</span>
                    </div>
                    <div className="contact-item">
                      <Mail className="contact-icon" />
                      <span>{selectedCollege.contact.email}</span>
                    </div>
                    <div className="contact-item">
                      <ExternalLink className="contact-icon" />
                      <a href={`https://${selectedCollege.contact.website}`} target="_blank" rel="noopener noreferrer">
                        {selectedCollege.contact.website}
                      </a>
                    </div>
                    <div className="contact-item">
                      <MapPin className="contact-icon" />
                      <span>{selectedCollege.address}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Available Courses & Cut-offs</h3>
                  <div className="courses-table">
                    <div className="table-header">
                      <span>Course</span>
                      <span>Cut-off</span>
                      <span>Fees (Annual)</span>
                    </div>
                    {Object.entries(selectedCollege.cutOffs).map(([course, cutOff]) => (
                      <div key={course} className="table-row">
                        <span className="course-name">{course}</span>
                        <span className="cutoff">{cutOff}</span>
                        <span className="fees">{selectedCollege.fees[course] || 'N/A'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Facilities</h3>
                  <div className="facilities-grid">
                    {selectedCollege.facilities.map((facility, index) => (
                      <div key={index} className="facility-item">
                        <div className="facility-icon">
                          {facility === 'Library' && <BookOpen size={20} />}
                          {facility === 'Hostel' && <Home size={20} />}
                          {facility === 'WiFi' && <Wifi size={20} />}
                          {facility === 'Laboratory' && <GraduationCap size={20} />}
                          {facility === 'Sports Complex' && <Users size={20} />}
                          {!['Library', 'Hostel', 'WiFi', 'Laboratory', 'Sports Complex'].includes(facility) && <BookOpen size={20} />}
                        </div>
                        <span>{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Admission Process</h3>
                  <p className="admission-info">{selectedCollege.admissionProcess}</p>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Highlights</h3>
                  <ul className="highlights-list">
                    {selectedCollege.highlights.map((highlight, index) => (
                      <li key={index} className="highlight-item">
                        <Star className="highlight-icon" size={16} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredColleges.length === 0 && (
          <div className="no-results">
            <MapPin className="no-results-icon" />
            <h3>No colleges found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeDirectory;
