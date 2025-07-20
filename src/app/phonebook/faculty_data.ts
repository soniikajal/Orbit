// Faculty data interface
export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  qualification: string;
  specialization?: string;
  office?: string;
  image?: string;
}

// Sample faculty data (this would typically come from an API or database)
export const facultyData: FacultyMember[] = [
  // Computer Science and Engineering Faculty (Real Data from NSUT)
  {
    id: '1',
    name: 'Prof. Sushama Nagpal',
    designation: 'Professor and Head',
    department: 'Computer Science & Engineering',
    email: 'sushma.nagpal@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.E (CSE), M.Tech, Ph.D.',
    specialization: 'Software Quality Measurement, Data Science, Data Mining/Machine Learning, Social Network Analysis and Recommender Systems',
    office: '{empty}'
  },
  {
    id: '2',
    name: 'Bijendra Kumar',
    designation: 'Professor',
    department: 'Computer Science & Engineering',
    email: 'bizender@gmail.com',
    phone: '9205475069',
    qualification: 'Ph.D.',
    specialization: 'Video on Demand, Cloud Computing, Wireless Sensor Networks, Cryptography/Watermarking',
    office: '{empty}'
  },
  {
    id: '3',
    name: 'Shampa Chakraverty',
    designation: 'Professor',
    department: 'Computer Science & Engineering',
    email: 'shampa@nsut.ac.in',
    phone: '9899568694',
    qualification: 'B.E., MTech, PhD.',
    specialization: 'Computational Intelligence and Machine Learning, Security and Trust, and Computational Linguistics',
    office: '{empty}'
  },
  {
    id: '4',
    name: 'Sangeeta Sabharwal',
    designation: 'Professor',
    department: 'Computer Science & Engineering',
    email: 'ssab63@gmail.com',
    phone: '{empty}',
    qualification: 'B.E., M.E., Ph.D.',
    specialization: 'Requirement engineering, Meta modeling, object Oriented analysis, Software testing and Data Warehouse',
    office: '{empty}'
  },
  {
    id: '5',
    name: 'MPS Bhatia',
    designation: 'Professor',
    department: 'Computer Science & Engineering',
    email: 'mpsbhatia@nsut.ac.in',
    phone: '9205475008,9818192294',
    qualification: 'Ph.D.',
    specialization: 'Data Science, Social Media Analytics, Pervasive Healthcare, and cybersecurity',
    office: '{empty}'
  },
  {
    id: '6',
    name: 'Ritu Sibal',
    designation: 'Professor',
    department: 'Computer Science & Engineering',
    email: 'ritu.sibal.nsit@gmail.com',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Software Engineering, Agile Software Development, Software Testing, Soft Computing Techniques',
    office: '{empty}'
  },
  {
    id: '7',
    name: 'Rajeev Kumar',
    designation: 'Associate Professor',
    department: 'Computer Science & Engineering',
    email: 'rajeevd.kumar@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.Tech(CSE), M.Tech(CTA)',
    specialization: 'Mobile Computing, Artificial Intelligence, Distributed Computing',
    office: '{empty}'
  },
  {
    id: '8',
    name: 'Dr. Veenu',
    designation: 'Associate Professor',
    department: 'Computer Science & Engineering',
    email: 'veenu@nsut.ac.in',
    phone: '09810198358',
    qualification: 'M.Sc.(Computer Science Software), M.Tech.(IT), Ph.D.(Computer Engineering) , NET Qualified',
    specialization: 'Artificial neural networks',
    office: '{empty}'
  },
  {
    id: '9',
    name: 'Preeti Kaur',
    designation: 'Associate Professor',
    department: 'Computer Science & Engineering',
    email: 'preetikaur1@rediffmail.com',
    phone: '{empty}',
    qualification: 'PhD, MTech',
    specialization: 'Software Engineering',
    office: '{empty}'
  },
  {
    id: '10',
    name: 'Anand Gupta',
    designation: 'Associate Professor',
    department: 'Computer Science & Engineering',
    email: 'anand.gupta@nsit.ac.in',
    phone: '011- 25000181',
    qualification: 'Ph.D.',
    specialization: 'Data mining, Information retrieval, Computer Vision',
    office: '{empty}'
  },
  {
    id: '11',
    name: 'Suresh Kumar',
    designation: 'Associate Professor',
    department: 'Computer Science & Engineering',
    email: 'drsureshpoonia@gmail.com',
    phone: '9811714004',
    qualification: 'M.Tech (CSE), Ph.D',
    specialization: 'Biomedical Engineering, Control systems',
    office: '{empty}'
  },
  {
    id: '12',
    name: 'Dr. Poonam Rani',
    designation: 'Associate Professor',
    department: 'Computer Science & Engineering',
    email: 'poonam.rani@nsut.ac.in',
    phone: '011 - 25000051',
    qualification: 'Ph.D.(CSE)',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: '13',
    name: 'Pinaki Chakraborty',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    email: 'pinaki.chakraborty@nsut.ac.in',
    phone: '25000102',
    qualification: 'B.Tech., M.Tech., Ph.D.',
    specialization: 'Educational software, human-computer interaction and societal applications of digital technologies',
    office: '{empty}'
  },
  {
    id: '14',
    name: 'Swati Aggarwal',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    email: 'swati1178@gmail.com',
    phone: '{empty}',
    qualification: 'Ph.D, M.Tech, B.Tech',
    specialization: 'Neutrosophic Logic, Fuzzy sets, Artificial intelligence, Neural network, Machine learning and other Soft computing based techniques',
    office: '{empty}'
  },
  {
    id: '15',
    name: 'Savita Yadav',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    email: 'savita.yadav@nsut.ac.in',
    phone: '011-25000151(Office)',
    qualification: 'M.Tech (Computer Science & Engineering)',
    specialization: 'Human-computer interaction, smartphone and touchscreen device interaction',
    office: '{empty}'
  },
  {
    id: '16',
    name: 'Dr. Abhinav Tomar',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    email: 'abhinav.tomar@nsut.ac.in',
    phone: '{empty}',
    qualification: 'PhD, MTech, BTech',
    specialization: 'Wireless Rechargeable Sensor Networks, Decision Making, Cloud Service Selection and Task scheduling in Cloud Computing, Edge Computing, Soft Computing, Artificial Intelligence, Nature-inspired Algorithms, Recommender Systems, Reinforcement Learning',
    office: '{empty}'
  },
  {
    id: '17',
    name: 'Dr. Geetanjali',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    email: 'geetanjali.rathi@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D., M. Tech., B. Tech.',
    specialization: 'Handoff security, cognitive networks, blockchain technology, resilience in wireless mesh networking, routing protocols, networking, and industry 4.0',
    office: '{empty}'
  },
  {
    id: '18',
    name: 'Gaurav Singal',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    email: 'gaurav.singal@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Internet of Things, Mobile Adhoc Networks, Edge computing, Applied Deep learning and Reinforcement learning',
    office: '{empty}'
  },
  {
    id: '19',
    name: 'Vijay Kumar Bohat',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    email: 'vijay.bohat@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Computational Intelligence, Machine Learning, and Image Processing',
    office: '{empty}'
  },
  {
    id: '20',
    name: 'Rashmi Chaudhry',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    email: 'rashmi@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D',
    specialization: 'Internet of Things, Wireless Sensor Networks, Intelligent Transportation Systems',
    office: '{empty}'
  },
  {
    id: '21',
    name: 'Dr. Vandana Bhatia',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    email: 'vandana.bhatia@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Machine Learning, Computer Vision, Big Data analytics, Deep Learning',
    office: '{empty}'
  },
  {
    id: '22',
    name: 'Dr. Rudresh dwivedi',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: '{empty}'
  },

  // Mechanical Engineering Faculty
  {
    id: '23',
    name: 'Shailendra Kumar Jha',
    designation: 'Professor and Head',
    department: 'Mechanical Engineering',
    email: 'shailendra.jha@nsut.ac.in',
    phone: '+91-11-25000022',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Thermal Engineering, Heat Transfer',
    office: 'ME-101'
  },
  {
    id: '24',
    name: 'D. K. Singh',
    designation: 'Professor',
    department: 'Mechanical Engineering',
    email: 'dk.singh@nsut.ac.in',
    phone: '+91-11-25000023',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Manufacturing Processes, Production Engineering',
    office: 'ME-102'
  },
  {
    id: '25',
    name: 'Anil Chopra',
    designation: 'Professor Emeritus',
    department: 'Mechanical Engineering',
    email: 'anil.chopra@nsut.ac.in',
    phone: '+91-11-25000024',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Machine Design, Vibrations',
    office: 'ME-103'
  },
  {
    id: '26',
    name: 'Sachin Maheshwari',
    designation: 'Professor',
    department: 'Mechanical Engineering',
    email: 'sachin.maheshwari@nsut.ac.in',
    phone: '+91-11-25000025',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Welding Technology, Materials Science',
    office: 'ME-104'
  },
  {
    id: '27',
    name: 'Sanjay Kumar Chak',
    designation: 'Professor',
    department: 'Mechanical Engineering',
    email: 'sanjay.chak@nsut.ac.in',
    phone: '+91-11-25000026',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Fluid Mechanics, CFD',
    office: 'ME-105'
  },
  {
    id: '28',
    name: 'Vijayant Agarwal',
    designation: 'Professor',
    department: 'Mechanical Engineering',
    email: 'vijayant.agarwal@nsut.ac.in',
    phone: '+91-11-25000027',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Automotive Engineering, IC Engines',
    office: 'ME-106'
  },
  {
    id: '29',
    name: 'Sanjay Gupta',
    designation: 'Associate Professor',
    department: 'Mechanical Engineering',
    email: 'sanjay.gupta@nsut.ac.in',
    phone: '+91-11-25000028',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Robotics, Automation',
    office: 'ME-107'
  },
  {
    id: '30',
    name: 'Pradeep Khanna',
    designation: 'Associate Professor',
    department: 'Mechanical Engineering',
    email: 'pradeep.khanna@nsut.ac.in',
    phone: '+91-11-25000029',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'CAD/CAM, CNC Machining',
    office: 'ME-108'
  },
  {
    id: '31',
    name: 'Aditya Kumar Rathi',
    designation: 'Associate Professor',
    department: 'Mechanical Engineering',
    email: 'aditya.rathi@nsut.ac.in',
    phone: '+91-11-25000030',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Renewable Energy, Solar Systems',
    office: 'ME-109'
  },
  {
    id: '32',
    name: 'AV Muley',
    designation: 'Associate Professor',
    department: 'Mechanical Engineering',
    email: 'av.muley@nsut.ac.in',
    phone: '+91-11-25000031',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Industrial Engineering, Operations Research',
    office: 'ME-110'
  },
  {
    id: '33',
    name: 'Umang Soni',
    designation: 'Associate Professor',
    department: 'Mechanical Engineering',
    email: 'umang.soni@nsut.ac.in',
    phone: '+91-11-25000032',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Composite Materials, Fracture Mechanics',
    office: 'ME-111'
  },
  {
    id: '34',
    name: 'Andriya Narasimhulu',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'andriya.narasimhulu@nsut.ac.in',
    phone: '+91-11-25000033',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Tribology, Surface Engineering',
    office: 'ME-112'
  },
  {
    id: '35',
    name: 'Narender Kumar',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'narender.kumar@nsut.ac.in',
    phone: '+91-11-25000034',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Heat Transfer, Thermal Systems',
    office: 'ME-113'
  },
  {
    id: '36',
    name: 'Abhishek Tevatia',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'abhishek.tevatia@nsut.ac.in',
    phone: '+91-11-25000035',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Manufacturing Technology, Quality Control',
    office: 'ME-114'
  },
  {
    id: '37',
    name: 'Arvind Meena',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'arvind.meena@nsut.ac.in',
    phone: '+91-11-25000036',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Mechanical Design, FEA',
    office: 'ME-115'
  },
  {
    id: '38',
    name: 'Manish Kumar',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'manish.kumar@nsut.ac.in',
    phone: '+91-11-25000037',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Power Plant Engineering, Energy Systems',
    office: 'ME-116'
  },
  {
    id: '39',
    name: 'Pramendra Kumar Bajpai',
    designation: 'Associate Professor',
    department: 'Mechanical Engineering',
    email: 'pramendra.bajpai@nsut.ac.in',
    phone: '+91-11-25000038',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Biomechanics, Medical Devices',
    office: 'ME-117'
  },
  {
    id: '40',
    name: 'Shashi Prakash',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'shashi.prakash@nsut.ac.in',
    phone: '+91-11-25000039',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Mechatronics, Control Systems',
    office: 'ME-118'
  },
  {
    id: '41',
    name: 'Dr. Simran Jeet Singh',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'simran.singh@nsut.ac.in',
    phone: '+91-11-25000040',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Advanced Manufacturing, 3D Printing',
    office: 'ME-119'
  },
  {
    id: '42',
    name: 'Dr. Vinay Panwar',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'vinay.panwar@nsut.ac.in',
    phone: '+91-11-25000041',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Computational Mechanics, Simulation',
    office: 'ME-120'
  },
  {
    id: '43',
    name: 'Dr. Vivek Kumar',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'vivek.kumar@nsut.ac.in',
    phone: '+91-11-25000042',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Materials Engineering, Nanotechnology',
    office: 'ME-121'
  },
  {
    id: '44',
    name: 'Dr. Naveen Sharma',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'naveen.sharma@nsut.ac.in',
    phone: '+91-11-25000043',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'HVAC Systems, Refrigeration',
    office: 'ME-122'
  },
  {
    id: '45',
    name: 'Dr. Nazrul Islam Khan',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'nazrul.khan@nsut.ac.in',
    phone: '+91-11-25000044',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Fluid Power Systems, Hydraulics',
    office: 'ME-123'
  },
  {
    id: '46',
    name: 'Swati Gangwar',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'swati.gangwar@nsut.ac.in',
    phone: '+91-11-25000045',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Sustainable Manufacturing, Green Technology',
    office: 'ME-124'
  },
  {
    id: '47',
    name: 'Achhaibar Singh',
    designation: 'Adjunct Faculty',
    department: 'Mechanical Engineering',
    email: 'achhaibar.singh@nsut.ac.in',
    phone: '+91-11-25000046',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Industry Experience, Consulting',
    office: 'ME-125'
  },
  {
    id: '48',
    name: 'Ghanshyam Srivastava',
    designation: 'Visiting Faculty',
    department: 'Mechanical Engineering',
    email: 'ghanshyam.srivastava@nsut.ac.in',
    phone: '+91-11-25000047',
    qualification: 'Ph.D. in Mechanical Engineering',
    specialization: 'Research Collaboration, Innovation',
    office: 'ME-126'
  },

  // Information Technology Faculty - URL 40 (Real Data from NSUT)
  {
    id: '49',
    name: 'Sushama Nagpal',
    designation: 'Professor and Head',
    department: 'Information Technology',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: '50',
    name: 'Sanjay Kumar Dhurandher',
    designation: 'Professor',
    department: 'Information Technology',
    email: 'dhurandher@gmail.com',
    phone: '011-25000170',
    qualification: 'M. Tech, Ph. D',
    specialization: 'Wireless Networks, Underwater Sensor Networks, Opportunistic Networks, Cognitive Radio Networks',
    office: '{empty}'
  },
  {
    id: '51',
    name: 'Devender Kumar',
    designation: 'Associate Professor',
    department: 'Information Technology',
    email: 'dk_iitm@yahoo.co.in',
    phone: '011-25000142',
    qualification: 'M.Sc., M.Tech., Ph.D.',
    specialization: 'Cryptography and Network Security, Design and Analysis of Algorithms, Discrete Structures and Computer Graphics',
    office: '{empty}'
  },
  {
    id: '52',
    name: 'Amarjit Malhotra',
    designation: 'Associate Professor',
    department: 'Information Technology',
    email: 'uppalz_amar@yahoo.com',
    phone: '{empty}',
    qualification: 'M.Tech',
    specialization: 'Cloud Computing, Adhoc Networks',
    office: '{empty}'
  },
  {
    id: '53',
    name: 'Vikas Maheshkar',
    designation: 'Assistant Professor',
    department: 'Information Technology',
    email: 'vikas.maheshkar@gmail.com',
    phone: '{empty}',
    qualification: 'B.E, M.Tech, Ph.D (MNNIT, Allahabad)',
    specialization: 'Image Processing, Artificial intelligence',
    office: '{empty}'
  },
  {
    id: '54',
    name: 'Deepika Kukreja',
    designation: 'Assistant Professor',
    department: 'Information Technology',
    email: 'deepika.kukreja@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph. D, M. Tech, B. E.',
    specialization: 'Wireless Networks, Mobile Ad Hoc Networks, Network Security, IoT, and Trust based security system',
    office: '{empty}'
  },
  {
    id: '55',
    name: 'Ankita Jain Bansal',
    designation: 'Assistant Professor',
    department: 'Information Technology',
    email: 'ankita.bansal06@gmail.com',
    phone: '{empty}',
    qualification: 'Ph. D. pursuing, M. E., B. Tech',
    specialization: 'Software quality and metrics, Software Change Prediction and Assessment',
    office: '{empty}'
  },
  {
    id: '56',
    name: 'Satish Kumar Singh',
    designation: 'Assistant Professor',
    department: 'Information Technology',
    email: 'satishsingh23@gmail.com',
    phone: '{empty}',
    qualification: 'M.Tech (Integrated) Ph.d Pursuing',
    specialization: 'Internet of Things, Cloud and Fog Computing, Computer Networks, Software Engineering',
    office: '{empty}'
  },
  {
    id: '57',
    name: 'Dr. Mohit Sajwan',
    designation: 'Assistant Professor',
    department: 'Information Technology',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: '58',
    name: 'Dr. Nisha Kandhoul',
    designation: 'Assistant Professor',
    department: 'Information Technology',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: '{empty}'
  },

  // Civil Engineering Faculty - URL 30 (Real Data from NSUT)
  {
    id: '59',
    name: 'Dr. Gaurav Saini',
    designation: 'Associate Professor and Head',
    department: 'Civil Engineering',
    email: 'gaurav.saini@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D',
    specialization: 'Environmental Biotechnology, Water and Wastewater Treatment, Waste Management, Sustainable materials & processes',
    office: '{empty}'
  },
  {
    id: '60',
    name: 'Athar Hussain',
    designation: 'Professor & Dean, Infrastructure Technology',
    department: 'Civil Engineering',
    email: 'athar.hussain@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Industrial wastewater treatment, water quality management and solid waste management with special focus on anaerobic treatment',
    office: '{empty}'
  },
  {
    id: '61',
    name: 'Kailash Rajaram Harne',
    designation: 'Professor',
    department: 'Civil Engineering',
    email: 'harne.kailash@nsut.ac.in',
    phone: '9423265836, 011-25318158',
    qualification: 'Ph.D.',
    specialization: 'Water and Wastewater Treatment, Bridge Engineering, Environmental Engineering',
    office: '{empty}'
  },
  {
    id: '62',
    name: 'Dr. Partha Das',
    designation: 'Assistant Professor',
    department: 'Civil Engineering',
    email: 'partha.das@nsut.ac.in',
    phone: '+919652667307',
    qualification: 'PhD (IIT Guwahati)',
    specialization: 'Geotechnical Engineering, Soil stabilization using waste materials, Unsaturated Soil Mechanics, Artificial Intelligence in Geotechnical Engineering',
    office: '{empty}'
  },
  {
    id: '63',
    name: 'Dr. Sulaem Musaddiq Laskar',
    designation: 'Assistant Professor',
    department: 'Civil Engineering',
    email: 'sulaem.musaddiq.laskar@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Doctor of Philosophy (Indian Institute of Technology Guwahati)',
    specialization: 'Structural Engineering, Repairing and Retrofitting of RC Structures, Non-destructive testing, Bridge engineering',
    office: '{empty}'
  },
  {
    id: '64',
    name: 'Dr. Anant Lal Murmu',
    designation: 'Assistant Professor',
    department: 'Civil Engineering',
    email: 'anant.lal.murmu@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B. Tech., M. Tech. and PhD (Visvesvaraya National Institute of Technology, Nagpur)',
    specialization: 'Geopolymer, Building Materials, Ground Improvement, Sustainable Construction Materials and Soil Stabilization',
    office: '{empty}'
  },
  {
    id: '65',
    name: 'Dr. Aswathy R',
    designation: 'Assistant Professor',
    department: 'Civil Engineering',
    email: 'aswathy.r@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D',
    specialization: 'Pavement design, rheology of bitumen, asphaltic materials, uncertainty quantification, surrogate modelling, advanced statistics',
    office: '{empty}'
  },
  {
    id: '66',
    name: 'Dr. Arghya Ghosh',
    designation: 'Assistant Professor',
    department: 'Civil Engineering',
    email: 'arghya.ghosh@nsut.ac.in',
    phone: '(+91) 9804344254',
    qualification: 'B.E. (Civil), M.E. (Structures), Ph.D. (Engineering)',
    specialization: '{empty}',
    office: 'Room No.: PC-06, Department of Civil Engineering, NSUT (West Campus), Jaffarpur, New Delhi- 110073'
  },
  {
    id: '67',
    name: 'Prof. Mehtab Alam',
    designation: 'Emeritus Professor',
    department: 'Civil Engineering',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: '68',
    name: 'Prof. A.K. Nigam',
    designation: 'Visiting Professor',
    department: 'Civil Engineering',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: '{empty}'
  },

  // Electronics and Communication Engineering Faculty - URL 35 (Real Data from NSUT)
  {
    id: '69',
    name: 'Prof. Rashmi Gupta',
    designation: 'Professor and HOD',
    department: 'Electronics and Communication Engineering',
    email: 'rashmi.gupta@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Signal and Image processing, Artificial Intelligence and Machine Learning',
    office: '{empty}'
  },
  {
    id: '70',
    name: 'Ravindra Kumar Sharma',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering',
    email: '21.ravindra@gmail.com',
    phone: '9811455921',
    qualification: 'PhD.',
    specialization: 'Analog Microelectronics and Analog Signal Processing, Mixed signal circuit design, Circuit theory, VLSI Design',
    office: '{empty}'
  },
  {
    id: '71',
    name: 'Prof. Soven Kumar Dana',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering',
    email: 'soven.kumar.dana@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D., M.E., B.E.',
    specialization: 'AI & ML and Optical Networking',
    office: '{empty}'
  },
  {
    id: '72',
    name: 'Dinesh Kumar Raheja',
    designation: 'Associate Professor',
    department: 'Electronics and Communication Engineering',
    email: 'dineshraheja102@gmail.com',
    phone: '+91 9868283257',
    qualification: 'Ph.D.',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: '73',
    name: 'Arti M.K.',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering',
    email: 'mk@yahoo.com',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Signal processing for multiple-input-multiple-output systems, cooperative communications, satellite and UAV communications',
    office: '{empty}'
  },
  {
    id: '74',
    name: 'Dr. Satadru Chatterjee',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering',
    email: 'satadruchatterjee88@gmail.com',
    phone: '011-21210167',
    qualification: 'Ph.D',
    specialization: 'Literary Theory, Popular Culture, Culture Studies and Contemporary World Literatures',
    office: '{empty}'
  },
  {
    id: '75',
    name: 'Ashok Mittal',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering',
    email: '{empty}',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Microwave and Millimeter Wave Antennas, Microwave and Millimeter Wave Components and Systems, Radar and Communication Systems',
    office: '{empty}'
  },
  {
    id: '76',
    name: 'M.Gangadharappa',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering',
    email: 'm.gangadharappa@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Real Time Analysis of Video Behaviour Profiling, Microwave and Mobile Communication',
    office: '{empty}'
  },
  {
    id: '77',
    name: 'Dr. Richa Bhatia',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering',
    email: 'richa.bhatia@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.E., M.E., Ph.D.',
    specialization: 'Wireless Communications, Optical Systems and Networks, Radio over Fiber (RoF), Free-Space Optical (FSO) Communications, Digital Communication, Signal and Image Processing, Internet of Things',
    office: '{empty}'
  },
  {
    id: '78',
    name: 'Manisha Khulbe',
    designation: 'Associate Professor',
    department: 'Electronics and Communication Engineering',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: '79',
    name: 'C.S.Vinitha',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering',
    email: '{empty}',
    phone: '{empty}',
    qualification: 'B.Tech, M.Tech, Ph.D',
    specialization: 'Digital design, VLSI Digital-based designs, Memory-based architectures and VLSI design of Signal processing systems',
    office: '{empty}'
  },
  {
    id: '80',
    name: 'Garima Srivastava',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering',
    email: 'garima.srivastava@aiactr.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'RF and Microwave Engineering, Antenna Designing, Wireless Communication, Internet of Things',
    office: '{empty}'
  },
  {
    id: '81',
    name: 'Dr Krishna Patteti',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering',
    email: 'patteti.krishna@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.Tech, M.Tech, Ph.D.',
    specialization: 'Digital Systems, Wireless Communications and Networks, MIMO-OFDM and Signal Processing for wireless Communications',
    office: '{empty}'
  },
  {
    id: '82',
    name: 'Avinash Kumar',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering',
    email: 'avinashk_ait@yahoo.in',
    phone: '{empty}',
    qualification: 'B.Tech, M.Tech',
    specialization: 'Control systems, Robotics and Biomedical Engineering',
    office: '{empty}'
  },

  // Mathematics Faculty - URL 45 (Real Data from NSUT)
  {
    id: '83',
    name: 'Vijay Gupta',
    designation: 'Professor and Head',
    department: 'Mathematics',
    email: 'vijaygupta2001@hotmail.com',
    phone: '011-2509906',
    qualification: 'M.Sc., M. Phil., Ph. D.',
    specialization: 'Approximation Theory, linear positive operators',
    office: '{empty}'
  },
  {
    id: '84',
    name: 'Jainendra Kumar Singh',
    designation: 'Professor',
    department: 'Mathematics',
    email: 'jksingh@nsut.ac.in',
    phone: '9968184765(R), 9205475013 (O)',
    qualification: 'M.Sc., Ph.D.',
    specialization: 'General Theory of Relativity and Cosmology, spatially homogeneous and isotropic cosmological models',
    office: '{empty}'
  },
  {
    id: '85',
    name: 'Sachin Sharma',
    designation: 'Assistant Professor',
    department: 'Mathematics',
    email: 'sachin.sharma@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Numerical Analysis, finite difference methods for second and fourth order partial differential equations',
    office: '{empty}'
  },
  {
    id: '86',
    name: 'Jasobanta Jena',
    designation: 'Professor (on Deputation)',
    department: 'Mathematics',
    email: 'jjena@nsut.ac.in',
    phone: '9868839147',
    qualification: 'Ph.D.',
    specialization: 'Gas-dynamic Waves, Shock Waves',
    office: '{empty}'
  },
  {
    id: '87',
    name: 'Mamta Misra',
    designation: 'Associate Professor',
    department: 'Mathematics',
    email: 'mmishra@nsit.ac.in',
    phone: '{empty}',
    qualification: 'M.Sc., Ph.D',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: '88',
    name: 'Niraj Kumar',
    designation: 'Assistant Professor',
    department: 'Mathematics',
    email: 'neeraj@nsit.ac.in',
    phone: '01125000207',
    qualification: 'M.Sc, Ph.D.',
    specialization: 'Entire Dirichlet series, FK-space and Frechet space',
    office: '{empty}'
  },
  {
    id: '89',
    name: 'Anupam',
    designation: 'Assistant Professor',
    department: 'Mathematics',
    email: 'anupam.gautam@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Queueing theory, stochastic modelling and performance analysis of communication systems',
    office: '{empty}'
  },
  {
    id: '90',
    name: 'Amita Sharma',
    designation: 'Assistant Professor',
    department: 'Mathematics',
    email: 'amita.sharma@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Portfolio optimization, mean-risk modeling, stochastic dominance, robust optimization, machine learning in investment science',
    office: '{empty}'
  }
];

// Department list for filtering
export const departments = [
  'All Departments',
  'Computer Science & Engineering',
  'Mechanical Engineering',
  'Information Technology',
  'Civil Engineering',
  'Electronics and Communication Engineering',
  'Mathematics'
];

// Function to get faculty by department
export const getFacultyByDepartment = (department: string): FacultyMember[] => {
  if (department === 'All Departments') {
    return facultyData;
  }
  return facultyData.filter(faculty => faculty.department === department);
};

// Function to search faculty
export const searchFaculty = (query: string, department: string = 'All Departments'): FacultyMember[] => {
  let filtered = getFacultyByDepartment(department);
  
  if (query) {
    const searchQuery = query.toLowerCase();
    filtered = filtered.filter(faculty =>
      faculty.name.toLowerCase().includes(searchQuery) ||
      faculty.designation.toLowerCase().includes(searchQuery) ||
      faculty.department.toLowerCase().includes(searchQuery) ||
      faculty.email.toLowerCase().includes(searchQuery) ||
      faculty.qualification.toLowerCase().includes(searchQuery) ||
      (faculty.specialization && faculty.specialization.toLowerCase().includes(searchQuery))
    );
  }
  
  return filtered;
};

// Function to get faculty statistics
export const getFacultyStats = () => {
  const totalFaculty = facultyData.length;
  const departmentCounts = departments.slice(1).reduce((acc, dept) => {
    acc[dept] = getFacultyByDepartment(dept).length;
    return acc;
  }, {} as Record<string, number>);
  
  return {
    totalFaculty,
    departmentCounts,
    totalDepartments: departments.length - 1
  };
};
