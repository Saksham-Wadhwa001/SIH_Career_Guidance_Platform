import React, { useState, useEffect } from 'react';
import { Search, Filter, BookOpen, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';
import { useUser } from '../context/UserContext';

const CourseMapper = () => {
  const { quizResults, preferences } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStream, setSelectedStream] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const streams = [
    { value: 'all', label: 'All Streams' },
    { value: 'science', label: 'Science' },
    { value: 'arts', label: 'Arts' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'vocational', label: 'Vocational' }
  ];

  const courses = [
  {
    id: 1,
    name: 'Bachelor of Science (B.Sc.)',
    stream: 'science',
    duration: '3 years',
    description: 'A comprehensive undergraduate degree covering various scientific disciplines',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
    careerPaths: [
      {
        title: 'Research Scientist',
        description: 'Conduct research in various scientific fields',
        salary: '₹4-8 LPA',
        requirements: 'M.Sc. or Ph.D. preferred'
      },
      {
        title: 'Data Analyst',
        description: 'Analyze data to help organizations make decisions',
        salary: '₹3-6 LPA',
        requirements: 'Additional certification in data science'
      },
      {
        title: 'Teacher/Professor',
        description: 'Educate students in science subjects',
        salary: '₹3-7 LPA',
        requirements: 'B.Ed. for school teaching, NET for college'
      },
      {
        title: 'Lab Technician',
        description: 'Work in laboratories conducting experiments',
        salary: '₹2-4 LPA',
        requirements: 'Specialized training in lab techniques'
      }
    ],
    higherEducation: [
      'M.Sc. in specialized subjects',
      'M.Tech in Engineering',
      'MBA for management roles',
      'Ph.D. for research careers'
    ],
    governmentExams: [
      'UPSC Civil Services',
      'SSC Combined Graduate Level',
      'Banking Exams (IBPS, SBI)',
      'Railway Recruitment Board',
      'State PSC Exams'
    ],
    skills: ['Analytical Thinking', 'Research', 'Data Analysis', 'Problem Solving'],
    difficulty: 'Medium',
    popularity: 'High'
  },
  {
    id: 2,
    name: 'Bachelor of Arts (B.A.)',
    stream: 'arts',
    duration: '3 years',
    description: 'A versatile degree covering humanities, social sciences, and languages',
    subjects: ['History', 'Political Science', 'Economics', 'Psychology', 'Literature'],
    careerPaths: [
      {
        title: 'Civil Services Officer',
        description: 'Serve in various government departments',
        salary: '₹5-12 LPA',
        requirements: 'UPSC Civil Services Exam'
      },
      {
        title: 'Journalist',
        description: 'Report news and create content for media',
        salary: '₹2-6 LPA',
        requirements: 'Mass Communication degree preferred'
      },
      {
        title: 'Social Worker',
        description: 'Help communities and individuals in need',
        salary: '₹2-5 LPA',
        requirements: 'MSW degree for advanced roles'
      },
      {
        title: 'Content Writer',
        description: 'Create written content for various platforms',
        salary: '₹2-5 LPA',
        requirements: 'Strong writing skills'
      }
    ],
    higherEducation: [
      'M.A. in specialized subjects',
      'LLB for law career',
      'MBA for management roles',
      'M.Phil/Ph.D. for research'
    ],
    governmentExams: [
      'UPSC Civil Services',
      'SSC Combined Graduate Level',
      'State PSC Exams',
      'Banking Exams',
      'Railway Exams'
    ],
    skills: ['Communication', 'Critical Thinking', 'Writing', 'Research'],
    difficulty: 'Easy',
    popularity: 'Very High'
  },
  {
    id: 3,
    name: 'Bachelor of Commerce (B.Com.)',
    stream: 'commerce',
    duration: '3 years',
    description: 'Focus on business, finance, and commercial activities',
    subjects: ['Accounting', 'Business Studies', 'Economics', 'Mathematics', 'Statistics'],
    careerPaths: [
      {
        title: 'Chartered Accountant',
        description: 'Handle financial matters for businesses',
        salary: '₹6-15 LPA',
        requirements: 'CA qualification'
      },
      {
        title: 'Banking Professional',
        description: 'Work in various banking operations',
        salary: '₹3-8 LPA',
        requirements: 'Banking exams (IBPS, SBI)'
      },
      {
        title: 'Business Analyst',
        description: 'Analyze business processes and suggest improvements',
        salary: '₹4-10 LPA',
        requirements: 'MBA preferred'
      },
      {
        title: 'Tax Consultant',
        description: 'Help individuals and businesses with tax matters',
        salary: '₹3-7 LPA',
        requirements: 'Tax-related certifications'
      }
    ],
    higherEducation: [
      'M.Com for advanced commerce',
      'MBA for management roles',
      'CA/CS/CMA qualifications',
      'M.Phil/Ph.D. for research'
    ],
    governmentExams: [
      'Banking Exams (IBPS, SBI)',
      'SSC Combined Graduate Level',
      'Railway Recruitment Board',
      'State PSC Exams',
      'UPSC Civil Services'
    ],
    skills: ['Numerical Analysis', 'Financial Planning', 'Business Acumen', 'Communication'],
    difficulty: 'Medium',
    popularity: 'High'
  },
  {
    id: 4,
    name: 'Bachelor of Business Administration (BBA)',
    stream: 'commerce',
    duration: '3 years',
    description: 'Professional degree focusing on business management and administration',
    subjects: ['Management', 'Marketing', 'Finance', 'Human Resources', 'Operations'],
    careerPaths: [
      {
        title: 'Management Trainee',
        description: 'Entry-level position in corporate management',
        salary: '₹3-6 LPA',
        requirements: 'MBA preferred for senior roles'
      },
      {
        title: 'Marketing Executive',
        description: 'Develop and implement marketing strategies',
        salary: '₹2-5 LPA',
        requirements: 'Digital marketing certifications helpful'
      },
      {
        title: 'HR Executive',
        description: 'Handle human resource functions',
        salary: '₹2-5 LPA',
        requirements: 'HR certifications preferred'
      },
      {
        title: 'Entrepreneur',
        description: 'Start and run your own business',
        salary: 'Variable',
        requirements: 'Business plan and capital'
      }
    ],
    higherEducation: [
      'MBA for advanced management',
      'M.Com for commerce specialization',
      'Specialized master\'s programs',
      'Executive MBA programs'
    ],
    governmentExams: [
      'Banking Exams',
      'SSC Combined Graduate Level',
      'Railway Recruitment Board',
      'State PSC Exams'
    ],
    skills: ['Leadership', 'Strategic Thinking', 'Communication', 'Problem Solving'],
    difficulty: 'Medium',
    popularity: 'High'
  },
  {
    id: 5,
    name: 'Bachelor of Computer Applications (BCA)',
    stream: 'science',
    duration: '3 years',
    description: 'Focus on computer applications and software development',
    subjects: ['Programming', 'Database Management', 'Web Development', 'Software Engineering', 'Networking'],
    careerPaths: [
      {
        title: 'Software Developer',
        description: 'Develop software applications and systems',
        salary: '₹3-8 LPA',
        requirements: 'Strong programming skills'
      },
      {
        title: 'Web Developer',
        description: 'Create and maintain websites',
        salary: '₹2-6 LPA',
        requirements: 'Web development technologies'
      },
      {
        title: 'System Administrator',
        description: 'Manage computer systems and networks',
        salary: '₹3-7 LPA',
        requirements: 'IT certifications preferred'
      },
      {
        title: 'Database Administrator',
        description: 'Manage and maintain databases',
        salary: '₹4-9 LPA',
        requirements: 'Database certifications'
      }
    ],
    higherEducation: [
      'MCA for advanced computer applications',
      'M.Tech in Computer Science',
      'MBA in IT Management',
      'M.Sc. in Computer Science'
    ],
    governmentExams: [
      'SSC Combined Graduate Level',
      'Banking Exams (IT Officer)',
      'Railway Recruitment Board',
      'State PSC Exams'
    ],
    skills: ['Programming', 'Problem Solving', 'Logical Thinking', 'Technical Skills'],
    difficulty: 'Medium',
    popularity: 'Very High'
  },
  {
    id: 6,
    name: 'Bachelor of Education (B.Ed.)',
    stream: 'arts',
    duration: '2 years',
    description: 'Professional degree for teaching careers',
    subjects: ['Educational Psychology', 'Teaching Methods', 'Curriculum Development', 'Classroom Management', 'Educational Technology'],
    careerPaths: [
      {
        title: 'School Teacher',
        description: 'Teach students in primary and secondary schools',
        salary: '₹2-6 LPA',
        requirements: 'TET/CTET qualification'
      },
      {
        title: 'Educational Administrator',
        description: 'Manage educational institutions',
        salary: '₹4-8 LPA',
        requirements: 'Additional management qualifications'
      },
      {
        title: 'Curriculum Developer',
        description: 'Design educational curricula and materials',
        salary: '₹3-7 LPA',
        requirements: 'Subject expertise'
      },
      {
        title: 'Educational Consultant',
        description: 'Advise on educational policies and practices',
        salary: '₹3-8 LPA',
        requirements: 'Advanced degrees preferred'
      }
    ],
    higherEducation: [
      'M.Ed. for advanced education',
      'M.A. in Education',
      'Ph.D. in Education',
      'Specialized teaching certifications'
    ],
    governmentExams: [
      'TET/CTET for teaching',
      'State PSC Exams',
      'SSC Combined Graduate Level',
      'Railway Recruitment Board'
    ],
    skills: ['Teaching', 'Communication', 'Patience', 'Subject Knowledge'],
    difficulty: 'Easy',
    popularity: 'High'
  },
  {
    id: 7,
    name: 'Bachelor of Science in Agriculture (B.Sc. Agriculture)',
    stream: 'science',
    duration: '4 years',
    description: 'Comprehensive degree focusing on agricultural sciences and sustainable farming practices',
    subjects: ['Crop Science', 'Soil Science', 'Plant Pathology', 'Agricultural Economics', 'Horticulture', 'Animal Husbandry'],
    careerPaths: [
      {
        title: 'Agricultural Officer',
        description: 'Work with government agricultural departments',
        salary: '₹3-7 LPA',
        requirements: 'J&K PSC or UPSC exams'
      },
      {
        title: 'Farm Manager',
        description: 'Manage agricultural operations and farms',
        salary: '₹2-5 LPA',
        requirements: 'Practical experience in farming'
      },
      {
        title: 'Agricultural Consultant',
        description: 'Provide expert advice to farmers and agricultural businesses',
        salary: '₹3-8 LPA',
        requirements: 'M.Sc. Agriculture preferred'
      },
      {
        title: 'Research Scientist',
        description: 'Conduct research in agricultural sciences',
        salary: '₹4-10 LPA',
        requirements: 'M.Sc./Ph.D. in Agriculture'
      }
    ],
    higherEducation: [
      'M.Sc. Agriculture in specialized subjects',
      'Ph.D. in Agricultural Sciences',
      'MBA in Agribusiness',
      'Post Graduate Diploma in Agricultural Management'
    ],
    governmentExams: [
      'J&K PSC Agricultural Officer',
      'UPSC Agricultural Services',
      'SSC Combined Graduate Level',
      'Banking Exams (Agriculture Officer)'
    ],
    skills: ['Crop Management', 'Soil Analysis', 'Research', 'Problem Solving'],
    difficulty: 'Medium',
    popularity: 'High'
  },
  {
    id: 8,
    name: 'Bachelor of Veterinary Science (B.V.Sc.)',
    stream: 'science',
    duration: '5 years',
    description: 'Professional degree for veterinary medicine and animal healthcare',
    subjects: ['Anatomy', 'Physiology', 'Pathology', 'Pharmacology', 'Surgery', 'Animal Nutrition'],
    careerPaths: [
      {
        title: 'Veterinary Doctor',
        description: 'Provide medical care to animals',
        salary: '₹4-8 LPA',
        requirements: 'Veterinary Council registration'
      },
      {
        title: 'Livestock Inspector',
        description: 'Inspect and monitor livestock health',
        salary: '₹3-6 LPA',
        requirements: 'Government veterinary services'
      },
      {
        title: 'Animal Husbandry Officer',
        description: 'Manage animal breeding and health programs',
        salary: '₹4-7 LPA',
        requirements: 'J&K PSC or UPSC exams'
      },
      {
        title: 'Research Veterinarian',
        description: 'Conduct research in veterinary sciences',
        salary: '₹5-12 LPA',
        requirements: 'M.V.Sc./Ph.D. preferred'
      }
    ],
    higherEducation: [
      'M.V.Sc. in specialized veterinary subjects',
      'Ph.D. in Veterinary Sciences',
      'Diploma in Veterinary Public Health',
      'Specialized veterinary certifications'
    ],
    governmentExams: [
      'J&K PSC Veterinary Officer',
      'UPSC Veterinary Services',
      'SSC Combined Graduate Level',
      'State Animal Husbandry Department'
    ],
    skills: ['Animal Care', 'Medical Diagnosis', 'Surgery', 'Research'],
    difficulty: 'Hard',
    popularity: 'Medium'
  },
  {
    id: 9,
    name: 'Bachelor of Technology (B.Tech) / B.E.',
    stream: 'engineering',
    duration: '4 years',
    description: 'A professional undergraduate engineering degree focusing on practical and theoretical technical skills.',
    subjects: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Electronics'],
    careerPaths: [
      {
        title: 'Software Engineer',
        description: 'Design, develop, and maintain software systems and applications',
        salary: '₹6-15 LPA',
        requirements: 'Strong coding skills, DSA knowledge'
      },
      {
        title: 'Data Scientist',
        description: 'Analyze complex data to build predictive machine learning models',
        salary: '₹8-18 LPA',
        requirements: 'Python, Math, and Machine Learning expertise'
      },
      {
        title: 'Civil/Mechanical Core Engineer',
        description: 'Design physical infrastructure or mechanical systems',
        salary: '₹4-8 LPA',
        requirements: 'Core engineering concepts, AutoCAD/SolidWorks'
      },
      {
        title: 'Product Manager',
        description: 'Lead the strategy and development of tech products',
        salary: '₹10-25 LPA',
        requirements: 'Tech background with business acumen (MBA preferred)'
      }
    ],
    higherEducation: [
      'M.Tech in specialized engineering fields (via GATE)',
      'MBA for corporate leadership (via CAT)',
      'MS abroad for specialized research',
      'Ph.D. for academia'
    ],
    governmentExams: [
      'GATE (Graduate Aptitude Test in Engineering)',
      'Engineering Services Examination (ESE/IES)',
      'ISRO/DRDO Scientist Exams',
      'RRB JE (Railway Junior Engineer)',
      'UPSC Civil Services'
    ],
    skills: ['Programming', 'Logical Reasoning', 'System Design', 'Project Management'],
    difficulty: 'Hard',
    popularity: 'Very High'
  },
  {
    id: 10,
    name: 'Bachelor of Medicine, Bachelor of Surgery (MBBS)',
    stream: 'medical',
    duration: '5.5 years (including 1 year internship)',
    description: 'The premier professional degree for becoming a certified medical doctor in India.',
    subjects: ['Anatomy', 'Physiology', 'Pharmacology', 'Pathology', 'Surgery'],
    careerPaths: [
      {
        title: 'General Physician',
        description: 'Diagnose and treat everyday medical conditions and illnesses',
        salary: '₹8-15 LPA',
        requirements: 'MBBS Degree and State Medical Council Registration'
      },
      {
        title: 'Specialist/Surgeon',
        description: 'Perform specialized medical treatments or surgeries',
        salary: '₹15-35+ LPA',
        requirements: 'MD/MS Degree after MBBS'
      },
      {
        title: 'Medical Officer',
        description: 'Manage government hospitals and public health initiatives',
        salary: '₹7-12 LPA',
        requirements: 'Clearing UPSC CMS or State PSC'
      },
      {
        title: 'Clinical Researcher',
        description: 'Conduct trials and research for new drugs and treatments',
        salary: '₹6-12 LPA',
        requirements: 'Interest in pharmacology and research methodology'
      }
    ],
    higherEducation: [
      'MD (Doctor of Medicine)',
      'MS (Master of Surgery)',
      'Diploma in specialized medical fields',
      'MBA in Hospital Management'
    ],
    governmentExams: [
      'NEET PG (For Masters/Specialization)',
      'UPSC CMS (Combined Medical Services)',
      'State Public Service Commission Medical Officer Exams',
      'Army Medical Corps (AMC) Exams'
    ],
    skills: ['Patient Care', 'Quick Decision Making', 'High Stamina', 'Empathy', 'Scientific Aptitude'],
    difficulty: 'Very Hard',
    popularity: 'Very High'
  },
  {
    id: 11,
    name: 'Bachelor of Design (B.Des)',
    stream: 'arts', 
    duration: '4 years',
    description: 'A premium creative degree focusing on product design, UI/UX, fashion, and visual communication.',
    subjects: ['Design Thinking', 'Visual Ergonomics', 'Human-Computer Interaction (HCI)', 'Material Science', 'Graphic Design'],
    careerPaths: [
      {
        title: 'UI/UX Designer',
        description: 'Design the user interfaces and experiences for apps and websites',
        salary: '₹6-14 LPA',
        requirements: 'Strong portfolio, Figma/Adobe XD skills'
      },
      {
        title: 'Product Designer',
        description: 'Design physical or digital products focusing on user needs',
        salary: '₹8-16 LPA',
        requirements: 'Problem-solving mindset, 3D modeling'
      },
      {
        title: 'Fashion Designer',
        description: 'Create clothing and lifestyle accessories',
        salary: '₹4-10 LPA',
        requirements: 'Trend forecasting, fabric knowledge'
      }
    ],
    higherEducation: [
      'M.Des (Master of Design)',
      'MBA in Design Management',
      'Specialized courses at NID or NIFT'
    ],
    governmentExams: [
      'CEED (For Masters in Design at IITs)',
      'NID DAT (National Institute of Design Exam)'
    ],
    skills: ['Creativity', 'Empathy', 'Prototyping', 'Visual Communication'],
    difficulty: 'Medium',
    popularity: 'High'
  },
  {
    id: 12,
    name: 'Integrated Law (B.A. LL.B. / BBA LL.B.)',
    stream: 'arts', 
    duration: '5 years',
    description: 'A dual degree combining bachelor studies with a professional degree in law.',
    subjects: ['Constitutional Law', 'Criminal Law', 'Corporate Law', 'Jurisprudence', 'Intellectual Property Rights (IPR)'],
    careerPaths: [
      {
        title: 'Corporate Lawyer',
        description: 'Advise companies on legal rights, mergers, and corporate governance',
        salary: '₹8-18 LPA',
        requirements: 'Degree from a top NLU, strong negotiation skills'
      },
      {
        title: 'Litigation Attorney',
        description: 'Represent clients in civil or criminal court cases',
        salary: '₹3-10 LPA (Varies highly by experience)',
        requirements: 'Bar Council of India registration'
      },
      {
        title: 'Legal Advisor / Consultant',
        description: 'Provide legal guidance to NGOs, government bodies, or startups',
        salary: '₹5-12 LPA',
        requirements: 'Specialized knowledge in specific legal sectors'
      }
    ],
    higherEducation: [
      'LL.M. (Master of Laws)',
      'Ph.D. in Law',
      'Specialized Diplomas (Cyber Law, Human Rights)'
    ],
    governmentExams: [
      'Judiciary Exams (PCS-J) to become a judge',
      'UPSC Civil Services',
      'CLAT PG (For LLM and PSU jobs)',
      'JAG (Judge Advocate General) in Indian Army'
    ],
    skills: ['Debating', 'Critical Reading', 'Logical Reasoning', 'Public Speaking'],
    difficulty: 'Hard',
    popularity: 'Very High'
  },
  {
    id: 13,
    name: 'Bachelor of Psychology (B.A. / B.Sc.)',
    stream: 'science', 
    duration: '3 years',
    description: 'An increasingly popular degree focused on understanding the human mind, behavior, and mental health.',
    subjects: ['Clinical Psychology', 'Cognitive Psychology', 'Research Methodology', 'Organizational Behavior', 'Counseling'],
    careerPaths: [
      {
        title: 'Clinical Psychologist',
        description: 'Diagnose and treat mental, emotional, and behavioral disorders',
        salary: '₹4-9 LPA',
        requirements: 'M.Phil/Psy.D and RCI License'
      },
      {
        title: 'Corporate HR / Industrial Psychologist',
        description: 'Improve workplace productivity and employee well-being',
        salary: '₹5-12 LPA',
        requirements: 'Masters in Industrial/Organizational Psychology'
      },
      {
        title: 'School/Career Counselor',
        description: 'Guide students through academic, personal, and career choices',
        salary: '₹3-6 LPA',
        requirements: 'Diploma in Guidance & Counseling'
      }
    ],
    higherEducation: [
      'M.A. / M.Sc. in Clinical or Counseling Psychology',
      'M.Phil in Clinical Psychology (RCI recognized)',
      'Ph.D. for research and academia'
    ],
    governmentExams: [
      'State PSC Exams (Child Development Project Officer)',
      'UPSC Civil Services',
      'Government Hospital Recruitment'
    ],
    skills: ['Active Listening', 'Empathy', 'Data Analysis', 'Patience'],
    difficulty: 'Medium',
    popularity: 'High'
  },
  {
    id: 14,
    name: 'Bachelor of Journalism and Mass Communication (BJMC)',
    stream: 'arts',
    duration: '3 years',
    description: 'A dynamic degree for students interested in media, news broadcasting, filmmaking, and digital content.',
    subjects: ['Media Ethics', 'Video Production', 'Digital Marketing', 'Print Journalism', 'Public Relations (PR)'],
    careerPaths: [
      {
        title: 'Digital Content Producer / Filmmaker',
        description: 'Create engaging video and multimedia content for web and OTT',
        salary: '₹4-10 LPA',
        requirements: 'Video editing, storytelling, portfolio'
      },
      {
        title: 'Public Relations (PR) Manager',
        description: 'Manage the public image and communications of a brand or celebrity',
        salary: '₹5-12 LPA',
        requirements: 'Strong networking and crisis management skills'
      },
      {
        title: 'Broadcast Journalist',
        description: 'Report news on television or digital media platforms',
        salary: '₹3-8 LPA',
        requirements: 'Excellent communication, camera presence'
      }
    ],
    higherEducation: [
      'Masters in Mass Communication (MJMC)',
      'PG Diploma in Specialized Journalism (e.g., at IIMC)',
      'MBA in Media Management'
    ],
    governmentExams: [
      'UPSC (Indian Information Service)',
      'Prasar Bharati Recruitment',
      'State Public Relations Officer Exams'
    ],
    skills: ['Storytelling', 'Confidence', 'Networking', 'Writing'],
    difficulty: 'Easy',
    popularity: 'Medium'
  },
  {
    id: 15,
    name: 'Bachelor of Hotel Management (BHM)',
    stream: 'commerce',
    duration: '3 to 4 years',
    description: 'A highly practical, skill-based degree for the global hospitality, tourism, and culinary industry.',
    subjects: ['Food Production', 'Front Office Operations', 'Hospitality Marketing', 'Housekeeping Management', 'Event Management'],
    careerPaths: [
      {
        title: 'Hotel General Manager',
        description: 'Oversee all operations, staff, and finances of a hotel property',
        salary: '₹8-20+ LPA',
        requirements: 'Years of industry experience and leadership'
      },
      {
        title: 'Executive Chef',
        description: 'Manage the kitchen, create menus, and oversee culinary staff',
        salary: '₹6-15 LPA',
        requirements: 'Culinary expertise, high stamina'
      },
      {
        title: 'Event/Wedding Planner',
        description: 'Organize and execute large-scale corporate events or weddings',
        salary: '₹4-12 LPA (Highly variable)',
        requirements: 'Vendor management, extreme organization'
      }
    ],
    higherEducation: [
      'MHM (Master of Hotel Management)',
      'MBA in Hospitality and Tourism',
      'International Culinary Diplomas'
    ],
    governmentExams: [
      'IRCTC Recruitment (Railways)',
      'State Tourism Department Exams',
      'Army Service Corps (Hospitality wings)'
    ],
    skills: ['Customer Service', 'Crisis Management', 'Multitasking', 'Foreign Languages'],
    difficulty: 'Medium',
    popularity: 'Medium'
  }
];

  useEffect(() => {
    let filtered = courses;
    
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.subjects.some(subject => 
          subject.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    if (selectedStream !== 'all') {
      filtered = filtered.filter(course => course.stream === selectedStream);
    }
    
    setFilteredCourses(filtered);
  }, [searchTerm, selectedStream]);

  const getStreamColor = (stream) => {
    const colors = {
      science: 'bg-blue-50 text-blue-600 border-blue-200',
      arts: 'bg-purple-50 text-purple-600 border-purple-200',
      commerce: 'bg-green-50 text-green-600 border-green-200',
      vocational: 'bg-orange-50 text-orange-600 border-orange-200'
    };
    return colors[stream] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': 'text-green-600 bg-green-50',
      'Medium': 'text-yellow-600 bg-yellow-50',
      'Hard': 'text-red-600 bg-red-50'
    };
    return colors[difficulty] || 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="course-mapper">
      <div className="container">
        <div className="mapper-header">
          <h1 className="mapper-title">Course to Career Mapping</h1>
          <p className="mapper-subtitle">
            Explore degree programs available in Jammu & Kashmir and discover the career opportunities they unlock
          </p>
        </div>

        {/* Search and Filter */}
        {/* <div className="search-filter-section">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search courses, subjects, or careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-section">
            <Filter className="filter-icon" />
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="stream-filter"
            >
              {streams.map(stream => (
                <option key={stream.value} value={stream.value}>
                  {stream.label}
                </option>
              ))}
            </select>
          </div>
        </div> */}

        <div className="search-filter-section">
  <div className="search-box">
    <Search className="search-icon" />
    <input
      type="text"
      placeholder="Search courses, subjects, or careers..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
    />
  </div>

  <div className="filter-section">
    <Filter className="filter-icon" />
    <select
      value={selectedStream}
      onChange={(e) => setSelectedStream(e.target.value)}
      className="stream-filter"
    >
      {streams.map((stream) => (
        <option key={stream.value} value={stream.value}>
          {stream.label}
        </option>
      ))}
    </select>
  </div>
</div>


        {/* Quiz Results Recommendation */}
        {quizResults && (
          <div className="quiz-results-dashboard">
            <div className="dashboard-header">
              <h2>Your Assessment Insights</h2>
              <p>Based on your quiz results, we've tailored these recommendations for you.</p>
            </div>
            <div className="quiz-results-grid">
              <div className="result-card stream-card">
                <h4 className="result-title">Recommended Stream</h4>
                <div className="primary-result">{quizResults.recommendedStream}</div>
              </div>
              
              <div className="result-card">
                <h4 className="result-title">Top Interests</h4>
                <div className="interest-tags">
                  {quizResults.interests.map((interest, index) => (
                    <span key={index} className="interest-tag">{interest}</span>
                  ))}
                </div>
              </div>

              <div className="result-card personality-card">
                <h4 className="result-title">Personality Type</h4>
                <div className="primary-result">{quizResults.personalityType}</div>
              </div>

              <div className="result-card">
                <h4 className="result-title">Category Scores</h4>
                <div className="score-list">
                  {Object.entries(quizResults.categoryScores).map(([category, score]) => (
                    <div key={category} className="score-item">
                      <span className="score-label">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                      <span className="score-value">{score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}




        {/* Courses Grid */}
        <div className="courses-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <div className="course-title-section">
                  <h3 className="course-name">{course.name}</h3>
                  <div className="course-meta">
                    <span className={`stream-badge ${getStreamColor(course.stream)}`}>
                      {course.stream.charAt(0).toUpperCase() + course.stream.slice(1)}
                    </span>
                    <span className="course-duration">{course.duration}</span>
                    <span className={`difficulty-badge ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </span>
                  </div>
                </div>
                <div className="course-stats">
                  <div className="stat-item">
                    <TrendingUp className="stat-icon" />
                    <span>{course.popularity}</span>
                  </div>
                </div>
              </div>

              <p className="course-description">{course.description}</p>

              <div className="course-subjects">
                <h4 className="subjects-title">Key Subjects:</h4>
                <div className="subjects-list">
                  {course.subjects.map((subject, index) => (
                    <span key={index} className="subject-tag">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="course-skills">
                <h4 className="skills-title">Skills Developed:</h4>
                <div className="skills-list">
                  {course.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setSelectedCourse(course)}
                className="view-details-btn"
              >
                View Career Paths
                <ArrowRight className="btn-icon" />
              </button>
            </div>
          ))}
        </div>

        {/* Course Details Modal */}
        {selectedCourse && (
          <div className="course-modal-overlay" onClick={() => setSelectedCourse(null)}>
            <div className="course-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">{selectedCourse.name}</h2>
                <button 
                  className="modal-close"
                  onClick={() => setSelectedCourse(null)}
                >
                  ×
                </button>
              </div>

              <div className="modal-content">
                <div className="modal-section">
                  <h3 className="section-title">Career Paths</h3>
                  <div className="career-paths">
                    {selectedCourse.careerPaths.map((path, index) => (
                      <div key={index} className="career-path">
                        <div className="path-header">
                          <h4 className="path-title">{path.title}</h4>
                          <span className="path-salary">{path.salary}</span>
                        </div>
                        <p className="path-description">{path.description}</p>
                        <p className="path-requirements">
                          <strong>Requirements:</strong> {path.requirements}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Higher Education Options</h3>
                  <div className="education-options">
                    {selectedCourse.higherEducation.map((option, index) => (
                      <div key={index} className="education-option">
                        <Award className="education-icon" />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-section">
                  <h3 className="section-title">Government Exams</h3>
                  <div className="government-exams">
                    {selectedCourse.governmentExams.map((exam, index) => (
                      <div key={index} className="exam-item">
                        <Users className="exam-icon" />
                        <span>{exam}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="no-results">
            <BookOpen className="no-results-icon" />
            <h3>No courses found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseMapper;
