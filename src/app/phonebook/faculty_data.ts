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
  // Biological Sciences Engineering Faculty (Real Data from NSUT)
  {
    id: 'bse1',
    name: 'Prof. Ashok K. Dubey',
    designation: 'Professor & HoD',
    department: 'Biological Sciences Engineering',
    email: 'adubey.nsit@gmail.com',
    phone: '011-25099027',
    qualification: 'M.Sc., Ph.D (IIT Delhi)',
    specialization: 'Antimicrobial agents, therapeutics (inflammation, diabetes, cancer), actinobacteria, pesticide bioremediation',
    office: '{empty}'
  },
  {
    id: 'bse2',
    name: 'Prof. Sonika Bhatnagar',
    designation: 'Professor',
    department: 'Biological Sciences Engineering',
    email: 'ecc999@gmail.com',
    phone: '011-25000110',
    qualification: 'Ph.D (Biophysics, AIIMS)',
    specialization: 'Cardiovascular diseases, stress response, drug design, molecular mechanisms, systems biology',
    office: '{empty}'
  },
  {
    id: 'bse3',
    name: 'Mr. Akhilesh Dubey',
    designation: 'Assistant Professor',
    department: 'Biological Sciences Engineering',
    email: 'engg.akhil111@gmail.com',
    phone: '011-25000101',
    qualification: 'B.Tech, M.Tech, Ph.D (Pursuing - UPTU)',
    specialization: 'Cell culture, pollutant toxicity, drug interaction, proteomics',
    office: '{empty}'
  },
  {
    id: 'bse4',
    name: 'Dr. Shilpa Sharma',
    designation: 'Assistant Professor',
    department: 'Biological Sciences Engineering',
    email: 'shilpa.sharma@nsut.ac.in',
    phone: '011-25000136',
    qualification: 'Ph.D (Nanotech, IIT Guwahati), B.Tech (Biotech, GGSIPU)',
    specialization: 'Nanoformulations, thermostable enzymes, nanocomposites for wastewater treatment',
    office: '{empty}'
  },
  {
    id: 'bse5',
    name: 'Dr. Yatender Kumar',
    designation: 'Assistant Professor',
    department: 'Biological Sciences Engineering',
    email: 'yatender.kumar@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.Tech (GGSIPU), Ph.D (CSIR-CCMB), Postdoc (Max-Planck, Germany)',
    specialization: 'Neurodegeneration, host-pathogen interaction, recombinant proteins, toxicology',
    office: '{empty}'
  },
  {
    id: 'bse6',
    name: 'Mr. Ajay Kataria',
    designation: 'Assistant Professor',
    department: 'Biological Sciences Engineering',
    email: 'ajay.kataria@nsit.ac.in',
    phone: '{empty}',
    qualification: 'M.Tech (Biotech, IIT Guwahati)',
    specialization: 'Molecular biology',
    office: '{empty}'
  },
  {
    id: 'bse7',
    name: 'Ms. Akanksha Kulshreshtha',
    designation: 'Assistant Professor',
    department: 'Biological Sciences Engineering',
    email: 'kulshreshtha.akanksha@gmail.com',
    phone: '{empty}',
    qualification: 'B.Tech (Biotech Hons.), M.Tech (Biotech), CSIR-NET Qualified (2013)',
    specialization: 'Genomics, transcriptomics, molecular biology',
    office: '{empty}'
  },
  // Chemistry Faculty (Real Data from NSUT)
  {
    id: 'chem1',
    name: 'Dr. Sunita',
    designation: 'Assistant Professor',
    department: 'Chemistry',
    email: 'drsunita@aiactr.ac.in',
    phone: '011-21210167',
    qualification: 'Ph.D',
    specialization: 'Physical Chemistry, Doctoral studies from IIT Delhi, CSIR-JRF recipient in Chemical Sciences',
    office: '{empty}'
  },
  {
    id: 'chem2',
    name: 'Sanjeeve Thakur',
    designation: 'Professor and Head',
    department: 'Chemistry',
    email: 'sanjeevethakur63@yahoo.co.in',
    phone: '25000239',
    qualification: 'M.Sc., Ph.D.(Chem.)',
    specialization: 'Inorganic Chemistry',
    office: '{empty}'
  },
  {
    id: 'chem3',
    name: 'Anjana Sarkar',
    designation: 'Professor',
    department: 'Chemistry',
    email: 'anjana.sarkar@nsit.ac.in',
    phone: '011-25000240',
    qualification: 'M.Sc. (Chemistry )(Calcutta University) Ph.D. (Delhi University)',
    specialization: 'Organic, Bio-organic, Bio-inorganic',
    office: '{empty}'
  },
  {
    id: 'chem4',
    name: 'Purnima Jain',
    designation: 'Professor',
    department: 'Chemistry',
    email: 'prnm_j@yahoo.co.in',
    phone: '{empty}',
    qualification: 'M.Sc. M.Tech., Ph.D.',
    specialization: 'Polymer Blends and Alloys, Nanocomposites',
    office: '{empty}'
  },
  {
    id: 'chem5',
    name: 'Uma Narang',
    designation: 'Assistant Professor',
    department: 'Chemistry',
    email: 'umanarang89@gmail.com',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Organic Chemistry',
    office: '{empty}'
  },
  {
    id: 'chem6',
    name: 'Nancy Gupta',
    designation: 'Assistant Professor',
    department: 'Chemistry',
    email: 'nancy.iitb@gmail.com',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Fluorescence spectroscopy, semiconductor nanomaterials for photovoltaic applications, photophysics',
    office: '{empty}'
  },
  {
    id: 'chem7',
    name: 'Dr. Leena Aggarwal',
    designation: 'Assistant Professor',
    department: 'Chemistry',
    email: 'leena.aggarwal@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: 'chem8',
    name: 'Dr. Sushmita',
    designation: 'Assistant Professor',
    department: 'Chemistry',
    email: 'sushmita@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: 'chem9',
    name: 'Dr. Swapnil Sonawane',
    designation: 'Assistant Professor',
    department: 'Chemistry',
    email: 'swapnil.sonawane@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: 'chem10',
    name: 'Dr. Jugal Bori',
    designation: 'Assistant Professor',
    department: 'Chemistry',
    email: 'jugal.bori@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: '{empty}'
  },
  // Computer Science & Engineering (East Campus) Faculty (Real Data from NSUT)
  {
    id: 'cse_east1',
    name: 'Dr. Vishal Bhatnagar',
    designation: 'Professor and Head',
    department: 'Computer Science & Engineering',
    email: 'vishal.bhatnagar@nsut.ac.in',
    phone: '011-21210166',
    qualification: 'B.E, M.Tech, Ph.D',
    specialization: 'Database, data warehouse, data mining, social network analysis, Data Science, video popularity prediction, cloud computing, Blockchain, big data analytics',
    office: '{empty}'
  },
  {
    id: 'cse_east2',
    name: 'Prof. Nanhay Singh',
    designation: 'Professor',
    department: 'Computer Science & Engineering',
    email: 'nsingh1973@gmail.com',
    phone: '{empty}',
    qualification: 'M.Tech (CSE), Ph.D (Kurukshetra University)',
    specialization: 'Computer Science and Engineering research, academic leadership',
    office: '{empty}'
  },
  {
    id: 'cse_east3',
    name: 'Prof. Manoj Kumar',
    designation: 'Professor',
    department: 'Computer Science & Engineering',
    email: 'manoj.kumar@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.E (CSE), M.Tech (Information System), Ph.D (Information Technology)',
    specialization: 'Information Technology, Computer Science research',
    office: '{empty}'
  },
  {
    id: 'cse_east4',
    name: 'Dr. Suresh Kumar Poonia',
    designation: 'Associate Professor',
    department: 'Computer Science & Engineering',
    email: 'drsureshpoonia@gmail.com',
    phone: '{empty}',
    qualification: 'Ph.D (Faculty of Engineering & Technology, MDU Rohtak)',
    specialization: 'Pattern Recognition, Ontology, Semantic Search, Academic Research',
    office: '{empty}'
  },
  {
    id: 'cse_east5',
    name: 'Dr. Vishal Gupta',
    designation: 'Associate Professor',
    department: 'Computer Science & Engineering',
    email: 'vishalgupta@aiactr.ac.in',
    phone: '{empty}',
    qualification: 'B.E (CSE), M.Tech (Information Technology), Ph.D (Jamia Millia Islamia)',
    specialization: 'Ad-Hoc networks, Wireless Sensor Networks, Security, Compiler Design, Operating Systems, Data Analytics',
    office: '{empty}'
  },
  {
    id: 'cse_east6',
    name: 'Dr. Bharti Nagpal',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    email: 'bharti_53@yahoo.com',
    phone: '{empty}',
    qualification: 'B.Tech (Computer Engg.), M.Tech (Information Systems), Ph.D (Computer Engg.)',
    specialization: 'Web Technologies, Information Security, Data mining, Data Warehouse, IoT, Big Data, Machine Learning',
    office: '{empty}'
  },
  {
    id: 'cse_east7',
    name: 'Dr. Amita Jain',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    email: 'amita.jain@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.E (CSE), M.Tech (IT), Ph.D (Natural Language Processing, JNU)',
    specialization: 'Natural Language Processing, Machine Learning, Software Engineering',
    office: '{empty}'
  },
  {
    id: 'cse_east8',
    name: 'Arvind Kumar',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    email: 'er.kumararvind@gmail.com',
    phone: '{empty}',
    qualification: 'B.Tech, M.Tech (UPTU Lucknow), Ph.D',
    specialization: 'Computer Science research, academic publications',
    office: '{empty}'
  },
  {
    id: 'cse_east9',
    name: 'Prakash Rao Ragiri',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    email: 'prakashraoragiri@gmail.com',
    phone: '{empty}',
    qualification: 'B.Tech, M.Tech, Ph.D (Pursuing)',
    specialization: 'Computer Science research',
    office: '{empty}'
  },
  {
    id: 'cse_east10',
    name: 'Shobha Bhatt',
    designation: 'Assistant Professor',
    department: 'Computer Science & Engineering',
    email: '{empty}',
    phone: '{empty}',
    qualification: 'Ph.D (Pursuing, GGSIPU)',
    specialization: 'Speech processing, Information security',
    office: '{empty}'
  },

  // Electrical Engineering (Main Campus) Faculty
  {
    id: 'ee_main1',
    name: 'Prof. Smriti Srivastava',
    designation: 'Professor and Head',
    department: 'Electrical Engineering',
    email: 'smriti@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.E (MANIT, BHOPAL), M.Tech (MANIT, BHOPAL), Ph.D (IIT Delhi)',
    specialization: 'Neural networks, Fuzzy logic, Modeling, Biometrics, Identification and control of nonlinear systems. Over 150 publications in international journals and conferences in AI, ML, Neural Networks, Fuzzy logic, Control Systems and Biometrics.',
    office: '{empty}'
  },
  {
    id: 'ee_main2',
    name: 'Prof. Prerna Gaur',
    designation: 'Professor',
    department: 'Electrical Engineering',
    email: 'prernagaur@yahoo.com',
    phone: '011-25000226',
    qualification: 'B.Tech, M.Tech, Ph.D',
    specialization: 'Renewable Energy, Power Electronics, Power Quality, Artificial Intelligent based Control, Electrical Drive. Over 220 research papers in international journals and IEEE conferences. H-Index-24, I-10 index-59.',
    office: '{empty}'
  },
  {
    id: 'ee_main3',
    name: 'Dr. V. S. K. V. Harish',
    designation: 'Assistant Professor',
    department: 'Electrical Engineering',
    email: 'vskv.harish@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D. (IIT Roorkee), M.E. (Jadavpur University, Kolkata: University Medal), B.E. (M.D.U. Rohtak)',
    specialization: 'Building Energy Systems, Thermostatically Controlled Loads, Power System analysis. PhD from IIT Roorkee, Post-Doctoral Fellow at TERI School of Advanced Studies on Smart grids for rural India.',
    office: '{empty}'
  },
  {
    id: 'ee_main4',
    name: 'Ankit Kumar Singh',
    designation: 'Assistant Professor',
    department: 'Electrical Engineering',
    email: 'ankit@nsut.ac.in',
    phone: '8126905637',
    qualification: 'Ph.D. (IIT Roorkee), M.Tech (NIT Hamirpur), B.Tech (Uttar Pradesh Technical University)',
    specialization: 'Electric Vehicle Charging, Renewable Energy Sources, Bidirectional DC-DC Converter and High gain DC-DC Converter. IEEE Member.',
    office: '{empty}'
  },
  {
    id: 'ee_main5',
    name: 'Dr. Ravinder Singh',
    designation: 'Assistant Professor',
    department: 'Electrical Engineering',
    email: 'ravinder.singh@nsut.ac.in',
    phone: '9780232408',
    qualification: 'Ph.D.',
    specialization: 'Unmanned Ground Vehicles, 3D Lidar Mapping, Visual SLAM, Path Optimization, Control and navigation.',
    office: '{empty}'
  },
  {
    id: 'ee_main6',
    name: 'Dr. Anjanee Kumar Mishra',
    designation: 'Assistant Professor',
    department: 'Electrical Engineering',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Electrical Engineering research and teaching.',
    office: '{empty}'
  },
  {
    id: 'ee_main7',
    name: 'Astitva Kumar',
    designation: 'Assistant Professor',
    department: 'Electrical Engineering',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Solar photovoltaics, renewable energy, electrical energy utilization, and agrovoltaics. Over 20 research publications in renowned international journals and conferences.',
    office: '{empty}'
  },
  {
    id: 'ee_main8',
    name: 'Subhodip Saha',
    designation: 'Assistant Professor',
    department: 'Electrical Engineering',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Electrical Engineering research and teaching.',
    office: '{empty}'
  },

  // Civil Engineering Faculty (Real Data from NSUT West Campus)
  {
    id: 'civil1',
    name: 'Dr. Gaurav Saini',
    designation: 'Associate Professor & HoD',
    department: 'Civil Engineering',
    email: 'gaurav.saini@nsut.ac.in',
    phone: '011-25099027',
    qualification: 'B.E. (DCE), M.S. & Ph.D. (Oregon State Univ.), Postdoc (Delaware, US)',
    specialization: 'Environmental engineering, sustainability, 25+ publications, 18 patents (3 granted), 47 Master\'s, 1 PhD guided',
    office: '{empty}'
  },
  {
    id: 'civil2',
    name: 'Prof. Athar Hussain',
    designation: 'Professor & Dean, Infrastructure Technology',
    department: 'Civil Engineering',
    email: 'athar.hussain@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: 'civil3',
    name: 'Dr. Anant Lal Murmu',
    designation: 'Assistant Professor',
    department: 'Civil Engineering',
    email: 'anant.lal.murmu@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.Tech, M.Tech, Ph.D. (VNIT Nagpur)',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: 'civil4',
    name: 'Dr. Aswathy R',
    designation: 'Assistant Professor',
    department: 'Civil Engineering',
    email: 'aswathy.r@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.Tech (CET), M.Tech (NIT Trichy), Ph.D. (IIT Delhi)',
    specialization: 'Asphalt pavement, bitumen rheology, uncertainty quantification, surrogate modelling',
    office: '{empty}'
  },
  {
    id: 'civil5',
    name: 'Dr. Arghya Ghosh',
    designation: 'Assistant Professor',
    department: 'Civil Engineering',
    email: 'arghya.ghosh@nsut.ac.in',
    phone: '+91 9804344254',
    qualification: 'B.E. (Civil), M.E. (Structures), Ph.D. (Engineering)',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: 'civil6',
    name: 'Prof. Kailash R. Harne',
    designation: 'Professor',
    department: 'Civil Engineering',
    email: 'harne.kailash@nsut.ac.in',
    phone: '9423265836',
    qualification: 'Ph.D.',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: 'civil7',
    name: 'Dr. Partha Das',
    designation: 'Assistant Professor',
    department: 'Civil Engineering',
    email: 'partha.das@nsut.ac.in',
    phone: '+91 9652667307',
    qualification: 'Ph.D. (IIT Guwahati)',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: 'civil8',
    name: 'Dr. Sulaem M. Laskar',
    designation: 'Assistant Professor',
    department: 'Civil Engineering',
    email: 'sulaem.musaddiq.laskar@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.E. (AEC), M.Tech (NIT Silchar), Ph.D. (IIT Guwahati)',
    specialization: 'Structural retrofitting, sustainable materials, bridge engineering, TEQIP III faculty, consultancy projects',
    office: '{empty}'
  },
  {
    id: 'civil9',
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
    id: 'civil10',
    name: 'Prof. A.K. Nigam',
    designation: 'Visiting Professor',
    department: 'Civil Engineering',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: '{empty}'
  },
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
  },
  
  // Faculty of Design
  {
    id: 'design_001',
    name: 'Head of Department',
    designation: 'Head of Department',
    department: 'Design',
    email: 'hod.design@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Design Studies',
    office: '{empty}'
  },
  
  // Faculty of Electrical and Mechanical Engineering
  {
    id: 'ice_001',
    name: 'Head of Department',
    designation: 'Head of Department',
    department: 'Instrumentation & Control Engineering',
    email: 'hod.ice@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Instrumentation & Control Engineering',
    office: 'Main Campus'
  },
  {
    id: 'me_west_001',
    name: 'Prof. G. Srivastava',
    designation: 'Professor',
    department: 'Mechanical Engineering',
    email: 'gsrivastava@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Mechanical Engineering',
    office: 'West Campus'
  },
  
  // Mechanical Engineering West Campus Faculty (Real Data from NSUT)
  {
    id: 'me_west_002',
    name: 'Dr. G. Srivastava',
    designation: 'Head, Visiting Faculty',
    department: 'Mechanical Engineering',
    email: 'gsrivastava@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Mechanical Engineering Design, Research and Development',
    office: 'West Campus'
  },
  {
    id: 'me_west_003',
    name: 'Dr. G. Vedabouriswaran',
    designation: 'Professor',
    department: 'Mechanical Engineering',
    email: 'gsrivastava@nsut.ac.in',
    phone: '9452907349',
    qualification: 'Ph.D.',
    specialization: 'Composite materials, Tribology, Design',
    office: 'West Campus'
  },
  {
    id: 'me_west_004',
    name: 'Mr. Sunil Kumar Tiwari',
    designation: 'Associate Professor',
    department: 'Mechanical Engineering',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Mechanical Engineering',
    office: 'West Campus'
  },
  {
    id: 'me_main_001',
    name: 'Head of Department',
    designation: 'Head of Department',
    department: 'Mechanical Engineering',
    email: 'hod.me@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Mechanical Engineering',
    office: 'Main Campus'
  },
  {
    id: 'ee_001',
    name: 'Head of Department',
    designation: 'Head of Department',
    department: 'Electrical Engineering',
    email: 'hod.ee@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Electrical Engineering',
    office: 'Main Campus'
  },
  
  // Faculty of Humanities and Social Sciences
  {
    id: 'hss_001',
    name: 'Head of Department',
    designation: 'Head of Department',
    department: 'Humanities and Social Sciences',
    email: 'hod.hss@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Humanities and Social Sciences',
    office: '{empty}'
  },
  
  // Faculty of Information Communication and Technology (ICT) - Additional entries
  {
    id: 'it_west_001',
    name: 'Prof. Sanjeev Kumar',
    designation: 'Professor',
    department: 'Information Technology',
    email: 'sanjeev.kumar@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Information Technology',
    office: 'West Campus'
  },
  {
    id: 'cse_east_001',
    name: 'Prof. Manoj Kumar',
    designation: 'Professor',
    department: 'Computer Science & Engineering',
    email: 'manojkumar@aiactr.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Computer Science & Engineering',
    office: 'East Campus'
  },
  {
    id: 'ece_east_001',
    name: 'Prof. Rashmi Gupta',
    designation: 'Professor',
    department: 'Electronics & Communication Engineering',
    email: 'rashmi.gupta@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Electronics & Communication Engineering',
    office: 'East Campus'
  },
  {
    id: 'ece_main_001',
    name: 'Head of Department',
    designation: 'Head of Department',
    department: 'Electronics and Communications Engineering',
    email: 'hod.ece@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Electronics and Communications Engineering',
    office: 'Main Campus'
  },
  
  // Faculty of Infrastructure Technology
  {
    id: 'civil_001',
    name: 'Prof. Athar Hussain',
    designation: 'Professor',
    department: 'Civil Engineering',
    email: 'athar.hussain@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Civil Engineering',
    office: 'West Campus'
  },
  
  // Faculty of Sciences - Additional entries
  {
    id: 'math_001',
    name: 'Prof. J.K. Singh',
    designation: 'Professor',
    department: 'Mathematics',
    email: 'jksingh@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Mathematics',
    office: '{empty}'
  },
  {
    id: 'chemistry_001',
    name: 'Prof. Anjana Sarkar',
    designation: 'Professor',
    department: 'Chemistry',
    email: 'anjana.sarkar@nsit.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Chemistry',
    office: '{empty}'
  },
  {
    id: 'physics_001',
    name: 'Prof. Ranjana',
    designation: 'Professor',
    department: 'Physics',
    email: 'ranjana@nsit.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Physics',
    office: '{empty}'
  },
  
  // Faculty of Inter Disciplinary Studies
  {
    id: 'bio_001',
    name: 'Prof. S. Bhatnagar',
    designation: 'Professor',
    department: 'Biological Sciences and Engineering',
    email: 'sbhatnagar@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Biological Sciences and Engineering',
    office: '{empty}'
  },
  
  // Management Studies Faculty (Real Data from NSUT)
  {
    id: 'mgmt_main_001',
    name: 'Dr. Naval Garg',
    designation: 'Associate Professor and Head',
    department: 'Management Studies',
    email: 'naval.garg@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Workplace spirituality, Gratitude, Scale development, Indian knowledge system, HR & OB',
    office: 'Main Campus'
  },
  {
    id: 'mgmt_main_002',
    name: 'Dr. Renu Ghosh',
    designation: 'Assistant Professor',
    department: 'Management Studies',
    email: 'renu20102010@gmail.com',
    phone: '{empty}',
    qualification: 'Ph.D, M.Phil, M.Com, B.Com (Hons.)',
    specialization: 'Financial management, Investment management, Business statistics, Business research and Accounting',
    office: 'Main Campus'
  },
  {
    id: 'mgmt_main_003',
    name: 'Dr. Samir Gokarn',
    designation: 'Assistant Professor',
    department: 'Management Studies',
    email: 'samir.gokarn@nsut.ac.in',
    phone: '{empty}',
    qualification: 'UGC-JRF qualified, PhD from IIT Dhanbad',
    specialization: 'Strategic management, Sustainability management, Supply chain, Blockchain technology, Big data analytics, Consumer food waste behavior, Critical thinking',
    office: 'Main Campus'
  },
  {
    id: 'mgmt_main_004',
    name: 'Dr. Shiksha Kushwah',
    designation: 'Assistant Professor',
    department: 'Management Studies',
    email: 'shiksha@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Consumption Communities, Sustainable Consumption, Selling and Sales Management, Public Policy Marketing',
    office: 'Main Campus'
  },
  {
    id: 'mgmt_main_005',
    name: 'Dr. Salini Rosaline Tharayil',
    designation: 'Assistant Professor',
    department: 'Management Studies',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: 'Main Campus'
  },
  {
    id: 'mgmt_main_006',
    name: 'Dr. Ritika',
    designation: 'Assistant Professor',
    department: 'Management Studies',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: 'Main Campus'
  },
  {
    id: 'mgmt_main_007',
    name: 'Dr. Dinesh Kumar',
    designation: 'Assistant Professor',
    department: 'Management Studies',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: 'Main Campus'
  },
  {
    id: 'mgmt_main_008',
    name: 'Dr. Himanshu',
    designation: 'Assistant Professor',
    department: 'Management Studies',
    email: 'himanshu.mgmt@nsut.ac.in',
    phone: '{empty}',
    qualification: 'UGC NET-JRF qualified in Commerce & Management, Ph.D.',
    specialization: 'Fair Value Reporting, Earnings Management, Sustainable Finance, Corporate Governance, FinTech, Banking, Fraud Risk Assessment, Behavioural Finance, Investment Management',
    office: 'Main Campus'
  },
  {
    id: 'mgmt_main_009',
    name: 'Dr. Parul Manchanda',
    designation: 'Assistant Professor',
    department: 'Management Studies',
    email: 'parul.manchanda@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D., UGC NET JRF Qualified',
    specialization: 'Consumer Behaviour, Consumer Engagement, Consumer Psychology, Mindful and Sustainable Consumption, Social Media, Sustainability, Entrepreneurship',
    office: 'Main Campus'
  },
  {
    id: 'mgmt_main_010',
    name: 'Dr. Ruchika Gahlot',
    designation: 'Assistant Professor',
    department: 'Management Studies',
    email: 'ruchikagahlot29@rediffmail.com',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Stock markets, Investment strategies, Financial derivatives, Economic policy analysis',
    office: 'Main Campus'
  },
  {
    id: 'mgmt_main_011',
    name: 'Dr. Aashima',
    designation: 'Assistant Professor',
    department: 'Management Studies',
    email: 'aashima.singhal27@gmail.com',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Health expenditure financing, Health insurance, Out-of-pocket health expenditure, Public health',
    office: 'Main Campus'
  },

  // Electronics and Communication Engineering (East Campus) Faculty
  {
    id: 'ece_east_001',
    name: 'Prof. Rashmi Gupta',
    designation: 'Professor and HOD',
    department: 'Electronics and Communication Engineering (East Campus)',
    email: 'rashmi.gupta@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Signal and Image processing, Artificial Intelligence and Machine Learning',
    office: '{empty}'
  },
  {
    id: 'ece_east_002',
    name: 'Prof. Ravindra Kumar Sharma',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering (East Campus)',
    email: '21.ravindra@gmail.com',
    phone: '9811455921',
    qualification: 'PhD.',
    specialization: 'Analog Microelectronics and Analog Signal Processing, Mixed signal circuit design, Circuit theory, VLSI Design',
    office: '{empty}'
  },
  {
    id: 'ece_east_003',
    name: 'Prof. Soven Kumar Dana',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering (East Campus)',
    email: 'soven.kumar.dana@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D., M.E., B.E.',
    specialization: 'AI & ML and Optical Networking',
    office: '{empty}'
  },
  {
    id: 'ece_east_004',
    name: 'Prof. Arti M.K.',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering (East Campus)',
    email: 'mk@yahoo.com',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Signal processing for multiple-input-multiple-output systems, cooperative communications, satellite and UAV communications',
    office: '{empty}'
  },
  {
    id: 'ece_east_005',
    name: 'Prof. Ashok Mittal',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering (East Campus)',
    email: '{empty}',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Microwave and Millimeter Wave Antennas, Microwave and Millimeter Wave Components and Systems, Radar and Communication Systems',
    office: '{empty}'
  },
  {
    id: 'ece_east_006',
    name: 'Prof. M.Gangadharappa',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering (East Campus)',
    email: 'm.gangadharappa@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Video Behaviour Profiling, Broadcasting Systems',
    office: '{empty}'
  },
  {
    id: 'ece_east_007',
    name: 'Dr. Richa Bhatia',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering (East Campus)',
    email: 'richa.bhatia@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.E., M.E., Ph.D.',
    specialization: 'Wireless Communications, Optical Systems and Networks, Radio over Fiber (RoF), Free-Space Optical (FSO) Communications, Elastic Optical Networks (EON), Digital Communication, Signal and Image Processing, Internet of Things',
    office: '{empty}'
  },
  {
    id: 'ece_east_008',
    name: 'Dr. Manisha Khulbe',
    designation: 'Associate Professor',
    department: 'Electronics and Communication Engineering (East Campus)',
    email: 'manisha.khulbe@nsut.ac.in',
    phone: '9910108550',
    qualification: 'B.Tech, M.Tech and PhD',
    specialization: 'Digital signal processing, Optical communication, Radar Signal Processing, Radar Systems, Computational techniques in Electromagnetics and Wavelets transforms',
    office: '{empty}'
  },
  {
    id: 'ece_east_009',
    name: 'Dr. Dinesh Kumar Raheja',
    designation: 'Associate Professor',
    department: 'Electronics and Communication Engineering (East Campus)',
    email: 'dineshraheja102@gmail.com',
    phone: '+91 9868283257',
    qualification: 'Ph.D.',
    specialization: 'Microstrip Patch Antenna, MIMO Antenna Systems, Super-Wideband Antennas',
    office: '{empty}'
  },
  {
    id: 'ece_east_010',
    name: 'Dr. Krishna Patteti',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (East Campus)',
    email: 'patteti.krishna@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.Tech, M.Tech, Ph.D.',
    specialization: 'Digital Systems, Wireless Communications and Networks, MIMO-OFDM and Signal Processing for wireless Communications',
    office: '{empty}'
  },
  {
    id: 'ece_east_011',
    name: 'Dr. Garima Srivastava',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (East Campus)',
    email: 'garima.srivastava@aiactr.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'RF and Microwave Engineering, Antenna Designing, Wireless Communication, Internet of Things',
    office: '{empty}'
  },
  {
    id: 'ece_east_012',
    name: 'Dr. Avinash Kumar',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (East Campus)',
    email: 'avinashk_ait@yahoo.in',
    phone: '{empty}',
    qualification: 'B.Tech, M.Tech',
    specialization: 'Control systems, Robotics and Biomedical Engineering',
    office: '{empty}'
  },
  {
    id: 'ece_east_013',
    name: 'C.S.Vinitha',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (East Campus)',
    email: '{empty}',
    phone: '{empty}',
    qualification: 'B.Tech, M.Tech, Ph.D',
    specialization: 'Digital design, VLSI Digital-based designs, Memory-based architectures and VLSI design of Signal processing systems',
    office: '{empty}'
  },
  {
    id: 'ece_east_014',
    name: 'Dr. Satadru Chatterjee',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (East Campus)',
    email: 'satadruchatterjee88@gmail.com',
    phone: '011-21210167',
    qualification: 'Ph.D',
    specialization: 'Literary Theory, Popular Culture, Culture Studies and Contemporary World Literatures',
    office: '{empty}'
  },
  // Electronics and Communication Engineering (Main Campus) Faculty
  {
    id: 'ece_main_001',
    name: 'Prof. Dharmendra Kumar Upadhyay',
    designation: 'Professor and Head',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'upadhyay_d@nsut.ac.in',
    phone: '011-25000128',
    qualification: 'B.E., M.Tech., Ph.D.',
    specialization: 'Digital Signal Processing, Microwave Filter and Antenna Designs',
    office: '{empty}'
  },
  {
    id: 'ece_main_002',
    name: 'Prof. Maneesha Gupta',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'maneeshapub@gmail.com',
    phone: '25000138',
    qualification: 'B.E., M.E., Ph.D.',
    specialization: 'Switched Capacitors Circuits and Analog Signal processing',
    office: '{empty}'
  },
  {
    id: 'ece_main_003',
    name: 'Prof. Harish Parthasarathy',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'harishp@nsit.ac.in',
    phone: '{empty}',
    qualification: 'B. Tech. Ph.D.',
    specialization: 'Digital Signal Processing, Filtering Theory, Quantum Signal Processing',
    office: '{empty}'
  },
  {
    id: 'ece_main_004',
    name: 'Prof. Parul Garg',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'parul.garg@nsut.ac.in',
    phone: '011-25000122',
    qualification: 'B.Sc.(Engg.), M.Sc.(Engg.), Ph.D.',
    specialization: 'Wireless communications, cooperative communication, free space optics, visible light communication, power line communication, physical layer security',
    office: '{empty}'
  },
  {
    id: 'ece_main_005',
    name: 'Prof. Sujata Sengar',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'nsit_sujata@yahoo.com',
    phone: '011-25000120',
    qualification: 'B.Sc.(Engg.), M.Sc.(Engg.), Ph.D.',
    specialization: 'Wireless Communication, Free Space Optical Communication, Wavelets',
    office: '{empty}'
  },
  {
    id: 'ece_main_006',
    name: 'Prof. Rajveer Singh Yaduvanshi',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'rajveer.yaduvanshi@nsut.ac.in',
    phone: '9811962830',
    qualification: 'M.E. (HON), Ph.D.',
    specialization: 'RF and Microwave, SENSORs, MIMO Dielectric Resonator Antennas, Absorber, IOT and Filters design and Implementations',
    office: '{empty}'
  },
  {
    id: 'ece_main_007',
    name: 'Dr. Raj Senani',
    designation: 'Honorary Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'senani@nsut.ac.in',
    phone: '+91-9899168678',
    qualification: 'B.Sc., B.Sc. Engineering, M.E. (Honours), Ph.D.',
    specialization: 'Current-Mode Circuits and Techniques, Bipolar and CMOS Analog Integrated Circuits, Active Circuit Analysis and Synthesis, Analog VLSI, Modern Filter Design, Analog Signal Processing',
    office: '{empty}'
  },
  {
    id: 'ece_main_008',
    name: 'Dr. Tarun Kumar Rawat',
    designation: 'Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'tarun.rawat@nsut.ac.in',
    phone: '011-25000131',
    qualification: 'AMIETE, MTech, PhD',
    specialization: 'Stochastic differential equation, stochastic nonlinear filters, image processing, quantum signal processing and designing of digital systems/wave digital filters/differentiators/Hilbert transformers/microwave filters/fractional order systems',
    office: '{empty}'
  },
  {
    id: 'ece_main_009',
    name: 'Dr. Satya Prakash Singh',
    designation: 'Associate Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'satya.prakash@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D., Post-Doc',
    specialization: 'Computer vision, Biomedical imaging, time‐series data analysis, solving healthcare problems, optimization of antenna design using AI and Deep learning techniques',
    office: '{empty}'
  },
  {
    id: 'ece_main_010',
    name: 'Dr. Bhawna Aggarwal',
    designation: 'Associate Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'kbhawnagarg@yahoo.co.in',
    phone: '{empty}',
    qualification: 'B.Tech. + M.E. + PhD.',
    specialization: 'VLSI and Circuit design in Analog domain, High performance analog circuits, Bulk–Driven MOSFET, FGMOS, Q-FGMOS, Memristance, Fractional order circuits',
    office: '{empty}'
  },
  {
    id: 'ece_main_011',
    name: 'Dhananjay V. Gadre',
    designation: 'Associate Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'dvgadre@gmail.com',
    phone: '{empty}',
    qualification: 'B.Sc., M.Sc, M.Engr(Computer Engineering)',
    specialization: 'Embedded Systems, Computer Architecture, Digital System Design, Instrumentation, Wearable Electronics, Internet Of Things',
    office: '{empty}'
  },
  {
    id: 'ece_main_012',
    name: 'Dr. Sanya Anees',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'sanya.anees@nsutac.in',
    phone: '{empty}',
    qualification: 'B.E., M.S., Ph.D.',
    specialization: 'B5G/6G communication, Mixed RF and FSO systems, Optical Wireless Communication, Cooperative Communication, UAV/HAPS based communication, ML & AI for Sustainable Environment',
    office: '{empty}'
  },
  {
    id: 'ece_main_013',
    name: 'Ritu Raj Singh',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'rituraj.singh@nsut.ac.in',
    phone: '+91-6287821839',
    qualification: 'Ph.D.',
    specialization: 'Optical Networks and Silicon Photonics, Grating devices, Nanophotonics, Nonlinear Optics, Optical Sensors/Biosensors, Optical Communications, Quantum Communication',
    office: '{empty}'
  },
  {
    id: 'ece_main_014',
    name: 'Dr. Umer Ashraf',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'umer.ashraf@nsut.ac.in',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Intelligent Reflecting Surfaces (IRS), Non-Orthogonal Multiple Access (NOMA), Unmanned Aerial Vehicles (UAVs), Machine Learning (ML)',
    office: '{empty}'
  },
  {
    id: 'ece_main_015',
    name: 'Dr. Naveen Jaglan',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Antenna design for wireless, satellite, radar, and biomedical applications; 5G/6G smartphone and MIMO antennas; UWB, DRA, reconfigurable, and conformal antennas',
    office: '{empty}'
  },
  {
    id: 'ece_main_016',
    name: 'Ankit Garg',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'ankit.garg@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Wireless communications, multiple-input multiple-output (MIMO) communication systems, free space optical communications, space-time block codes, cooperative communication, physical layer security',
    office: '{empty}'
  },
  {
    id: 'ece_main_017',
    name: 'Kunwar Singh',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'kunwar.singh@nsit.ac.in',
    phone: '{empty}',
    qualification: 'B.Tech, M.Tech, Ph.D',
    specialization: 'Applications of AI techniques for automated performance optimization of digital and analog CMOS circuits, AI driven EDA/CAD flows for VLSI Design, CMOS-memristor hybrid circuits, Neuromorphic computing',
    office: '{empty}'
  },
  {
    id: 'ece_main_018',
    name: 'Dr. Urvashi Bansal',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'urvashi.bansal@nsut.ac.in',
    phone: '011-25000138',
    qualification: 'B.E., M. E., Ph. D.',
    specialization: 'Low power Low voltage VLSI, Analog Signal Processing, Digital CMOS design, Image Processing',
    office: '{empty}'
  },
  {
    id: 'ece_main_019',
    name: 'Shweta Gautam',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'shwetauiet11@gmail.com',
    phone: '{empty}',
    qualification: 'B.Tech. ,M.Tech. , Ph.D',
    specialization: 'Analog Circuits designing such as Op-amps, OTAs, differential amplifiers, Control theory, Power electronics systems, FPGA Controllers',
    office: '{empty}'
  },
  {
    id: 'ece_main_020',
    name: 'Dr. Neeraj Goel',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'neeraj.goel@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Nanoelectronics, Microelectronics, Fabrication of electronic devices, Gas sensors, Photodetectors, 2D materials, Heterojunctions',
    office: '{empty}'
  },
  {
    id: 'ece_main_021',
    name: 'Sukhbir Singh',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'sukhbir.singh@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Optical Communication System and Networking, Nonlinear Optics and its applications, Optoelectronics Devices and Optical Sensing Devices',
    office: '{empty}'
  },
  {
    id: 'ece_main_022',
    name: 'Dr. Shailesh Mishra',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'shaileshmishra@ieee.org',
    phone: '{empty}',
    qualification: 'PhD, M.Tech, B.Tech',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: 'ece_main_023',
    name: 'Amit Singhal',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: 'amit@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D., B.Tech + M.Tech (Dual Degree)',
    specialization: 'Image Processing, Molecular Communications, Next generating communication technologies, Image retrieval, Theory and Applications of Fourier methods',
    office: '{empty}'
  },
  {
    id: 'ece_main_024',
    name: 'Dr. Ratneshwar Kumar Ratnesh',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Micro and Nanotechnology, VLSI, Nanophononics, Green Energy (Hybrid), Semiconductor QDs, Flexible electronics, Photovoltaic Cells',
    office: '{empty}'
  },
  {
    id: 'ece_main_025',
    name: 'Dr. Sandeep Singh Chauhan',
    designation: 'Assistant Professor',
    department: 'Electronics and Communication Engineering (Main Campus)',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: 'Microfabrication, piezoelectric energy harvesting, thin film growth and characterization, MEMS/NEMS device design and fabrication, sensors, actuators, and flexible electronics',
    office: '{empty}'
  },

  // Humanities and Social Sciences Faculty (East Campus) - Real Data from NSUT
  {
    id: 'hss_east_001',
    name: 'Dr. Pradeep Kumar Chaswal',
    designation: 'Assistant Professor and Associate Head',
    department: 'Humanities and Social Sciences (East Campus)',
    email: 'chaswal.pradeep@gmail.com',
    phone: '011-21210167',
    qualification: 'Ph.D.',
    specialization: 'American Literature, British Literature, Indian Writing in English, Communication Skills, Personality Development and Language Lab',
    office: '{empty}'
  },

  // Humanities and Social Sciences Faculty (Main Campus) - Real Data from NSUT
  {
    id: 'hss_main_001',
    name: 'Prof. Tanushree Choudhary',
    designation: 'Professor and Head',
    department: 'Humanities and Social Sciences (Main Campus)',
    email: 'tanushree@nsut.ac.in',
    phone: '011 25000257',
    qualification: 'PhD, M Phil, MA(Linguistics), MA (English)',
    specialization: 'English Language Teaching, Sociolinguistics, Translation. Child Language Acquisition, English communication skills, Spoken English and Personality Development',
    office: '{empty}'
  },
  {
    id: 'hss_main_002',
    name: 'Dr. Prasanta Kumar Bhuyan',
    designation: 'Assistant Professor',
    department: 'Humanities and Social Sciences (Main Campus)',
    email: 'prasantabhuyan68@gmail.com',
    phone: '{empty}',
    qualification: 'M.A. in philosophy, M.A. in sociology, M.phil in sociology, Ph.D. in sociology',
    specialization: 'Disability studies, Conservation of forest (in reference to JFM and CFM), Sociology of development in reference to different issues of development, displacement and rehabilitation',
    office: '{empty}'
  },
  {
    id: 'hss_main_003',
    name: 'Dr. Satadru Chatterjee',
    designation: 'Assistant Professor',
    department: 'Humanities and Social Sciences (Main Campus)',
    email: 'satadru.chatterjee@nsut.ac.in',
    phone: '9650317987',
    qualification: 'Ph.D.',
    specialization: 'Literary Theory, Popular Culture, Culture Studies and Contemporary World Literatures. License to Frame: Representation of the Political Other in James Bond Novels',
    office: '{empty}'
  },
  {
    id: 'hss_main_004',
    name: 'Dr. Pradeep Kumar Chaswal',
    designation: 'Assistant Professor and Associate Head',
    department: 'Humanities and Social Sciences (Main Campus)',
    email: 'chaswal.pradeep@gmail.com',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'American Literature, British Literature, Indian Writing in English, Communication Skills, Personality Development and Language Lab',
    office: '{empty}'
  },

  // Geoinformatics Faculty (West Campus) - Real Data from NSUT
  {
    id: 'geo_west_001',
    name: 'Dr. Sanjeev Kumar',
    designation: 'Assistant Professor and Associate Head',
    department: 'Geoinformatics (West Campus)',
    email: '{empty}',
    phone: '9560418279',
    qualification: '{empty}',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: 'geo_west_002',
    name: 'Dr. Navdeep Agrawal',
    designation: 'Assistant Professor',
    department: 'Geoinformatics (West Campus)',
    email: '{empty}',
    phone: '9473809251',
    qualification: '{empty}',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: 'iev_main_001',
    name: 'Dr. Naval Garg',
    designation: 'Associate Professor and Head',
    department: 'Innovation, Entrepreneurship, and Venture Development (IEV)',
    email: 'naval.garg@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'HR & OB, workplace spirituality, gratitude, scale development, and Indian knowledge system',
    office: '{empty}'
  },
  {
    id: 'iev_main_002',
    name: 'Dr. Juhi Raghuvanshi',
    designation: 'Assistant Professor',
    department: 'Innovation, Entrepreneurship, and Venture Development (IEV)',
    email: 'juhi.raghuvanshi@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Entrepreneurship and innovation management, business research, engineering management',
    office: '{empty}'
  },
  {
    id: 'iev_main_003',
    name: 'Dr. Pragati Singh',
    designation: 'Assistant Professor',
    department: 'Innovation, Entrepreneurship, and Venture Development (IEV)',
    email: 'pragati.singh@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: '{empty}',
    office: '{empty}'
  },
  {
    id: 'arch_main_001',
    name: 'Dr. Neha Gupta',
    designation: 'Associate Professor and Head',
    department: 'Architecture and Planning',
    email: 'neha.gupta@nsut.ac.in',
    phone: '9971931119',
    qualification: 'Ph.D.',
    specialization: 'Energy-efficient building design, semi-transparent photovoltaic thermal systems, solar architecture, green design',
    office: '{empty}'
  },
  {
    id: 'arch_main_002',
    name: 'Dr. Manish Sharma',
    designation: 'Assistant Professor',
    department: 'Architecture and Planning',
    email: 'manish.sharma@nsut.ac.in',
    phone: '9414317189',
    qualification: 'Ph.D.',
    specialization: 'Urban water resilience, climate change, disaster resilience, water utility assessments, community based participatory research',
    office: '{empty}'
  },
  {
    id: 'arch_main_003',
    name: 'Ar. Srishti Sagar',
    designation: 'Assistant Professor',
    department: 'Architecture and Planning',
    email: 'srishti.sagar@nsut.ac.in',
    phone: '9654341107',
    qualification: 'B.Arch., M.Plan.',
    specialization: 'Housing, Gender Studies',
    office: '{empty}'
  },
  {
    id: 'arch_main_004',
    name: 'Sanyam Bahga',
    designation: 'Assistant Professor',
    department: 'Architecture and Planning',
    email: 'sanyam@nsut.ac.in',
    phone: '9876870121',
    qualification: 'Ph.D.',
    specialization: 'History of Architecture, Theory of Architecture, Contemporary Indian Architecture',
    office: '{empty}'
  },
  {
    id: 'it_main_001',
    name: 'Sanjay Kumar Dhurandher',
    designation: 'Professor',
    department: 'Information Technology',
    email: 'dhurandher@gmail.com',
    phone: '011-25000170',
    qualification: 'M. Tech, Ph. D',
    specialization: 'Wireless ad-hoc networks, sensor networks, computer networks, opportunistic networks, network security and Underwater Sensor Networks',
    office: '{empty}'
  },
  {
    id: 'it_main_002',
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
    id: 'it_main_003',
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
    id: 'it_main_004',
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
    id: 'it_main_005',
    name: 'Dr. Deepika Kukreja',
    designation: 'Assistant Professor',
    department: 'Information Technology',
    email: 'deepika.kukreja@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph. D, M. Tech, B. E.',
    specialization: 'Wireless Networks, Mobile Ad Hoc Networks, Network Security, IoT, and Trust based security system',
    office: '{empty}'
  },
  {
    id: 'it_main_006',
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
    id: 'it_main_007',
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
    id: 'it_main_008',
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
    id: 'it_main_009',
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
    id: 'it_main_010',
    name: 'Dr. Nisha Kandhoul',
    designation: 'Assistant Professor',
    department: 'Information Technology',
    email: '{empty}',
    phone: '{empty}',
    qualification: '{empty}',
    specialization: '{empty}',
    office: '{empty}'
  },
  
  // Instrumentation & Control Engineering Faculty (Real Data from NSUT)
  {
    id: 'ice_main_001',
    name: 'Dr. Shyama Kant Jha',
    designation: 'Professor',
    department: 'Instrumentation & Control Engineering',
    email: 'jhask271@gmail.com',
    phone: '9868218924',
    qualification: 'B.Sc. Engineering (Distinction), M.E, Ph. D.',
    specialization: 'Optimal control, robust control, eternal inexhaustible and sustainable energy, bio-inspired control and electric drives',
    office: 'Main Campus'
  },
  {
    id: 'ice_main_002',
    name: 'Alok Prakash Mittal',
    designation: 'Professor Emeritus',
    department: 'Instrumentation & Control Engineering',
    email: 'mittalap@gmail.com',
    phone: '011-25099032',
    qualification: 'B.E.(Hons.), M.E., Ph.D.',
    specialization: 'Power Electronics, Electric Drives, FACTS and Intelligent Instrumentation',
    office: 'Main Campus'
  },
  {
    id: 'ice_main_003',
    name: 'R.C. Thakur',
    designation: 'Associate Professor',
    department: 'Instrumentation & Control Engineering',
    email: 'rct@nsit.ac.in',
    phone: '011-25099029',
    qualification: 'M.Tech. (Comp. Tech.)',
    specialization: 'Computer Networking, Communication Systems, and Microprocessor based System Design',
    office: 'Main Campus'
  },
  {
    id: 'ice_main_004',
    name: 'Dr. Alok Agrawal',
    designation: 'Assistant Professor',
    department: 'Instrumentation & Control Engineering',
    email: 'alok.agrawal@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.Tech. (EE), M.Tech. (PE&D), Ph.D. (EE)',
    specialization: 'Power electronics control for Renewable Energy System (RES) applications, Impact of RES integration on distribution feeders, Load / renewable energy prediction methodologies',
    office: 'Main Campus'
  },
  {
    id: 'ice_main_005',
    name: 'Dr. Bhavnesh Kumar',
    designation: 'Associate Professor',
    department: 'Instrumentation & Control Engineering',
    email: 'kumar_bhavnesh@yahoo.co.in',
    phone: '{empty}',
    qualification: 'B.Tech, M.Tech, Ph.D',
    specialization: 'Control of Electrical drives, Renewable Energy Systems, artificial intelligence techniques to renewable energy systems and electric drives',
    office: 'Main Campus'
  },
  {
    id: 'ice_main_006',
    name: 'Dr. Vineet Kumar',
    designation: 'Professor',
    department: 'Instrumentation & Control Engineering',
    email: 'vineet.kumar@nsut.ac.in',
    phone: '9205475094',
    qualification: 'M. Sc, M. Tech, Ph. D',
    specialization: 'Intelligent process control, Soft computing based control techniques and their applications, Digital Signal Processing and Robotics',
    office: 'Main Campus'
  },
  {
    id: 'ice_main_007',
    name: 'Vijander Singh',
    designation: 'Professor',
    department: 'Instrumentation & Control Engineering',
    email: 'vijaydee@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.Tech, M.E, Ph.D(IITR)',
    specialization: 'Process Control, Biomedical Instrumentation, Artificial Intelligence, Image Processing, Transducer & Measurement',
    office: 'Main Campus'
  },
  {
    id: 'ice_main_008',
    name: 'Dr. Anuradha Tomar',
    designation: 'Assistant Professor',
    department: 'Instrumentation & Control Engineering',
    email: 'eranu28@gmail.com',
    phone: '{empty}',
    qualification: 'Postdoc.(Eindhoven University of Technology, the Netherlands), Ph.D ( IIT Delhi), M.Tech.',
    specialization: 'Operation & Control of Microgrids, Photovoltaic Systems, Renewable Energy based Rural Electrification, Congestion Management in LV Distribution Systems, Artificial Intelligent & Machine Learning Applications in Power System',
    office: 'Main Campus'
  },
  {
    id: 'ice_main_009',
    name: 'Dr. Rajneesh Sharma',
    designation: 'Professor and Head',
    department: 'Instrumentation & Control Engineering',
    email: 'rajneesh496@gmail.com',
    phone: '011-25000242',
    qualification: 'B.E. (DCE), M.E. (DCE), Ph.D. (IIT Delhi), Post Doc. (EU)',
    specialization: 'Neural Networks, Fuzzy Systems, Intelligent Controllers, Robotics, Game based adaptive control, Control Systems and Multi agent Systems',
    office: 'Main Campus'
  },
  {
    id: 'ice_main_010',
    name: 'Jyoti Yadav',
    designation: 'Assistant Professor',
    department: 'Instrumentation & Control Engineering',
    email: 'jyoti@nsit.ac.in',
    phone: '{empty}',
    qualification: 'B.Tech, M.Tech, PhD, Delhi',
    specialization: 'Non-invasive glucose monitoring and control, Biomedical Instrumentation, Biomedical Transducers and Sensors, Controlled Drug Delivery System',
    office: 'Main Campus'
  },
  {
    id: 'ice_main_011',
    name: 'Dr. Asha Rani',
    designation: 'Professor',
    department: 'Instrumentation & Control Engineering',
    email: 'asha.rani@nsut.ac.in',
    phone: '{empty}',
    qualification: 'B.Tech, M.E, Ph.D (Delhi University)',
    specialization: 'Renewable Energy, Intelligent Control, Adaptive Control, Soft Computing based Adaptive Control, Biomedical Signal Processing, Robotic manipulator',
    office: 'Main Campus'
  },
  {
    id: 'ice_main_012',
    name: 'Vicky Suri',
    designation: 'Assistant Professor',
    department: 'Instrumentation & Control Engineering',
    email: 'vickysuri@gmail.com',
    phone: '{empty}',
    qualification: 'BE (ICE) from DIT, MIETE',
    specialization: 'Artificial Intelligence, Biomedical Engineering',
    office: 'Main Campus'
  },
  {
    id: 'ice_main_013',
    name: 'Tribhuwan Nath Shukla',
    designation: 'Professor Emeritus',
    department: 'Instrumentation & Control Engineering',
    email: 'tns.shukla@gmail.com',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'AI application in power system (planning and operation of Distribution system), Electrical Machines, Network Theory (analysis and synthesis)',
    office: 'Main Campus'
  },
  {
    id: 'ice_main_014',
    name: 'Prof. K.P.S. Rana',
    designation: 'Professor, Dean of Faculty',
    department: 'Instrumentation & Control Engineering',
    email: 'kpsrana1@gmail.com',
    phone: '91-11-25099050 Ext 3105',
    qualification: 'M.Sc., M.Tech., Ph.D.',
    specialization: 'AI/ML/Deep Learning, Instrumentation, VLSI Design, Image Processing, Signal Processing, Control Systems, Process Control, Biomedical Signal Processing',
    office: 'Main Campus'
  },
  {
    id: 'ice_main_015',
    name: 'Prof. A.N. Jha',
    designation: 'Professor',
    department: 'Instrumentation & Control Engineering',
    email: 'anj.nanotech@gmail.com',
    phone: '011-25000237',
    qualification: 'B.Sc Engineering, M.E, Ph.D.',
    specialization: 'Control system, process control and Mechatronics',
    office: 'Main Campus'
  },
  {
    id: 'ice_main_016',
    name: 'Mrs Manisha Singh',
    designation: 'Assistant Professor',
    department: 'Instrumentation & Control Engineering',
    email: 'manishasingh2006ji@gmail.com',
    phone: '{empty}',
    qualification: 'B.E., M.Tech., (Ph.D. pursuing)',
    specialization: 'Power Electronics, Hybrid Energy Systems and Renewable Energy',
    office: 'Main Campus'
  },
  
  // Physical Education Faculty (Real Data from NSUT)
  {
    id: 'pe_main_001',
    name: 'Dr. Praveen Saroha',
    designation: 'Director Physical Education (o)',
    department: 'Physical Education',
    email: 'dpe@nsut.ac.in',
    phone: '9205475016',
    qualification: 'PhD',
    specialization: 'Mental Toughness, Brain Plasticity, Psychological traits, Sports Management, Human Resource Management',
    office: '{empty}'
  },
  
  // Physics Faculty (Real Data from NSUT)
  {
    id: 'physics_main_001',
    name: 'Prof. Om Prakash Thakur',
    designation: 'Professor',
    department: 'Physics',
    email: 'opthakur@nsut.ac.in',
    phone: '9891548511',
    qualification: 'M.Sc., Ph.D.',
    specialization: 'Next-Generation Functional Materials, 2D materials, Ferrites, Perovskites, Metal oxides, Energy storage, Gas Sensing, Photocatalytic Applications, Supercapacitors, Perovskite Solar Cells',
    office: '{empty}'
  },
  {
    id: 'physics_main_002',
    name: 'Dr. Vinod Kumar',
    designation: 'Associate Professor and Head',
    department: 'Physics',
    email: 'vinod@nsut.ac.in',
    phone: '8199996521',
    qualification: 'M.Sc., Ph.D.',
    specialization: 'Nano-magnetic materials and Device applications, synthesis and properties of nano-magnetic particles, magnetic fluids in energy and sensor devices',
    office: '{empty}'
  },
  {
    id: 'physics_main_003',
    name: 'Dr. Harsh Yadav',
    designation: 'Assistant Professor',
    department: 'Physics',
    email: 'harsh@nsut.ac.in',
    phone: '011-25000209',
    qualification: 'Ph.D.',
    specialization: 'Single Crystal Growth, Crystallography, Piezoelectric, Ferroelectric, Nonlinear Optical, Wireless Communication, Czochralski technique, device fabrication',
    office: '{empty}'
  },
  {
    id: 'physics_main_004',
    name: 'Dr. Jehova Jire L. Hmar',
    designation: 'Assistant Professor',
    department: 'Physics',
    email: 'jehovajire52@gmail.com',
    phone: '7006236594',
    qualification: 'M.Sc., CSIR-UGC-NET, Ph.D.',
    specialization: 'Organic and inorganic Semiconductor for Flexible Electronic and Optoelectronic Applications, Non-volatile Memory device, Dielectric constant, Piezoelectric sensor, Photodetectors, Photovoltaics/solar cell, LED, Photoelectrochemical Cells',
    office: '{empty}'
  },
  {
    id: 'me_main_002',
    name: 'Prof. Shailendra Kumar Jha',
    designation: 'Professor and Head',
    department: 'Mechanical Engineering',
    email: 'skjha63@rediffmail.com',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Manufacturing processes, CNC/FMS lab development, extensive experience in mechanical engineering',
    office: 'Main Campus'
  },
  {
    id: 'me_main_003',
    name: 'Prof. D.K. Singh',
    designation: 'Professor',
    department: 'Mechanical Engineering',
    email: 'dks662002@yahoo.com',
    phone: '(011) 25000218',
    qualification: 'Ph.D.',
    specialization: 'Thermal engineering, JIT/SCM/TQM expertise',
    office: 'Main Campus'
  },
  {
    id: 'me_main_004',
    name: 'Prof. Sachin Maheshwari',
    designation: 'Professor, Dean Industrial R&D, Head MPAE Division',
    department: 'Mechanical Engineering',
    email: 'ssaacchhiinn@gmail.com',
    phone: '{empty}',
    qualification: 'PhD in Welding Engineering',
    specialization: 'Welding engineering, industrial R&D, extensive administrative experience',
    office: 'Main Campus'
  },
  {
    id: 'me_main_005',
    name: 'Prof. Sanjay Kumar Chak',
    designation: 'Professor',
    department: 'Mechanical Engineering',
    email: 'sanjaykchak@yahoo.com',
    phone: '9810287855',
    qualification: 'Ph.D.',
    specialization: 'Unconventional machining, ECDM processes, additive manufacturing, published 20+ papers',
    office: 'Main Campus'
  },
  {
    id: 'me_main_006',
    name: 'Prof. Vijayant Agarwal',
    designation: 'Professor',
    department: 'Mechanical Engineering',
    email: 'vijayantonly@yahoo.com',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Robotics and AI specialist',
    office: 'Main Campus'
  },
  {
    id: 'me_main_007',
    name: 'Sanjay Gupta',
    designation: 'Associate Professor',
    department: 'Mechanical Engineering',
    email: 'sanjay_gup@rediffmail.com',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'CAD/CAM and MCDM expertise',
    office: 'Main Campus'
  },
  {
    id: 'me_main_008',
    name: 'Dr. Pradeep Khanna',
    designation: 'Associate Professor',
    department: 'Mechanical Engineering',
    email: 'pradeep.khanna@nsut.ac.in',
    phone: '9818388160',
    qualification: 'B.E./M.E./PhD',
    specialization: 'Welding and quality control specialist',
    office: 'Main Campus'
  },
  {
    id: 'me_main_009',
    name: 'Aditya Kumar Rathi',
    designation: 'Associate Professor',
    department: 'Mechanical Engineering',
    email: 'aditya_rathihere@yahoo.com',
    phone: '{empty}',
    qualification: 'B.E./M.E./Ph.D.',
    specialization: 'Mechanical engineering research and development',
    office: 'Main Campus'
  },
  {
    id: 'me_main_010',
    name: 'Dr. A.V. Muley',
    designation: 'Associate Professor',
    department: 'Mechanical Engineering',
    email: 'avmuley2000@yahoo.com',
    phone: '011-25000192',
    qualification: 'PhD from IIT Delhi',
    specialization: 'Nano-composites research',
    office: 'Main Campus'
  },
  {
    id: 'me_main_011',
    name: 'Wing Commander Anil Chopra',
    designation: 'Professor Emeritus',
    department: 'Mechanical Engineering',
    email: 'wgcdranilchopra@gmail.com',
    phone: '9871913166',
    qualification: 'M.Tech',
    specialization: 'AI/MIS specialization',
    office: 'Main Campus'
  },
  {
    id: 'me_main_012',
    name: 'Umang Soni',
    designation: 'Associate Professor',
    department: 'Mechanical Engineering',
    email: 'umangsoni.1@gmail.com',
    phone: '011-25000072',
    qualification: 'B.E (Mechanical), M.E. (BITS Pilani), PhD (IIT Delhi)',
    specialization: 'Operations Management, Supply Chain Management, Artificial Intelligence, Risk Management',
    office: 'Main Campus'
  },
  {
    id: 'me_main_013',
    name: 'Dr. Andriya Narasimhulu',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'andriya@nsut.ac.in',
    phone: '01125000252 (O), 01125099366 (R), 011-25000252',
    qualification: 'B.Tech., M.Tech (IIT Delhi), PhD (IIT Delhi)',
    specialization: 'Metal cutting, Machining of Titanium alloys, Additive Manufacturing, Design for Manufacturing and Assembly',
    office: 'Main Campus'
  },
  {
    id: 'me_main_014',
    name: 'Narender Kumar',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'narender.kumar@nsit.ac.in',
    phone: '011 25000075',
    qualification: 'B.E, M.Tech, PhD (Pursuing)',
    specialization: 'Advanced Machining Processes, Machining of Advanced materials, Modeling & Optimization of manufacturing processes, composite materials and Design of Experiments',
    office: 'Main Campus'
  },
  {
    id: 'me_main_015',
    name: 'Abhishek Tevatia',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'abhishek.tevatia@nsut.ac.in',
    phone: '011-25000076 (O)',
    qualification: 'B.Tech., M.Tech., Ph.D.',
    specialization: 'Modeling of fatigue cracks in composite materials, Finite element fatigue analysis of structures, Fatigue and Fracture Mechanics, Design sensitivity and uncertainty analysis, Advance computational modeling techniques',
    office: 'Main Campus'
  },
  {
    id: 'me_main_016',
    name: 'Arvind Meena',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'arvind.meena@nsut.ac.in',
    phone: '011-25000073',
    qualification: 'B.E.(Mech. Engg.) & M.Tech.(Mfg. Sys. Engg.)',
    specialization: 'Total Quality Management, Manufacturing Technology',
    office: 'Main Campus'
  },
  {
    id: 'me_main_017',
    name: 'Manish Kumar',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'manish.kumar@nsut.ac.in',
    phone: '9810199720',
    qualification: 'BE (Delhi College of Engineering), Masters (IISc Bangalore), MBA (IIT Delhi), PhD (Pursuing) IIT Delhi',
    specialization: 'Engineering Design, Computational Fluid Dynamics, Technology Management, CAD/CAM/CAE, Product Design, Engineering Composites, Impact Mechanics',
    office: 'Main Campus'
  },
  {
    id: 'me_main_018',
    name: 'Pramendra Kumar Bajpai',
    designation: 'Associate Professor',
    department: 'Mechanical Engineering',
    email: 'pramendra.bajpai@nsut.ac.in',
    phone: '9911699011',
    qualification: 'B.Tech, M.Tech, Ph.D.',
    specialization: 'Processing of composites, Green composites, FEM modeling and Machining behavior of composites',
    office: 'Main Campus'
  },
  {
    id: 'me_main_019',
    name: 'Dr. Shashi Prakash',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'shashi.prakash@nsut.ac.in',
    phone: '+917765802528',
    qualification: 'PhD (IIT Patna), ME (Gold Medalist, Jadavpur University), B.Tech. (Mechanical Engineering)',
    specialization: 'Laser based machining and micromachining processes, laser related processes for bio-microfluidics',
    office: 'Main Campus'
  },
  {
    id: 'me_main_020',
    name: 'Dr. Simran Jeet Singh',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'simranjeet.singh@nsut.ac.in',
    phone: '{empty}',
    qualification: 'PhD (IIT Roorkee), M.Tech (Gold Medalist, NIT Kurukshetra), B.Tech (Kurukshetra University)',
    specialization: 'Plates and Structures, Computational Mechanics, Structural dynamics, Bio-materials, Smart materials, Functionally Graded Materials, Sandwich Structures, Semi-analytical methods, Bio-inspired materials',
    office: 'Main Campus'
  },
  {
    id: 'me_main_021',
    name: 'Dr. Vinay Panwar',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'vinay.panwar@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D. (IIT Roorkee), M.Tech. (IIT Kanpur)',
    specialization: 'Polymer composites, Nanomaterials, Synthesis & characterization, Modeling & simulation, Mechanical, thermal & bio-mechanical properties',
    office: 'Main Campus'
  },
  {
    id: 'me_main_022',
    name: 'Dr. Vivek Kumar',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'vivek.kumar@nsut.ac.in',
    phone: '+91-8532901455',
    qualification: 'Ph.D. (IIT Roorkee); M.Tech. (IIT Delhi); B.E. (CRSCE Murthal)',
    specialization: 'Tribology/Fluid Film Bearings, Smart Lubricants and Structures, Textured surface Bearings, non-Newtonian Lubricants, Rotor-dynamic Analysis of Bearings',
    office: 'Main Campus'
  },
  {
    id: 'me_main_023',
    name: 'Dr. Naveen Sharma',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'naveen.sharma@nsut.ac.in',
    phone: '+91 7417705640',
    qualification: 'Ph.D. (IIT Roorkee), M. Tech. (Gold Medalist, NIT Hamirpur), B. Tech. (MDU Rohtak)',
    specialization: 'Experimental Fluid Mechanics, PIV, Flow Visualization, Heat Transfer Enhancement, LCT, Optimization of Solar Thermal System, CFD',
    office: 'Main Campus'
  },
  {
    id: 'me_main_024',
    name: 'Dr. Nazrul Islam Khan',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'nazrul@nsut.ac.in',
    phone: '+919954653121',
    qualification: 'Ph.D. (NIT Silchar), M.Tech (NIT Silchar), BE (Gauhati University)',
    specialization: 'Self-Healing Materials, Phase Change Materials, Nanotechnology, and nano-materials, Carbon Fiber Reinforced Polymer (CFRP) composites, Adhesive joining of similar and dissimilar materials',
    office: 'Main Campus'
  },
  {
    id: 'me_main_025',
    name: 'Achhaibar Singh',
    designation: 'Adjunct Faculty',
    department: 'Mechanical Engineering',
    email: 'asingh@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Fluids Engineering, Experimental and theoretical investigations on inward flow between two disks, Thermal and Fluids Engineering',
    office: 'Main Campus'
  },
  {
    id: 'me_main_026',
    name: 'Dr. Ghanshyam Srivastava',
    designation: 'Visiting Faculty, Head of Mechanical Engineering Department (West Campus)',
    department: 'Mechanical Engineering',
    email: 'gsrivastava@nsut.ac.in',
    phone: '9452907349',
    qualification: 'Ph.D.',
    specialization: 'Thermal Engineering, Power Cycles, Combined Cycles, Cogeneration System, Turbine Blade Cooling, Refrigeration and Air-conditioning, Solar and Alternate Energy',
    office: 'Main Campus'
  },
  {
    id: 'me_main_027',
    name: 'Dr. Swati Gangwar',
    designation: 'Assistant Professor',
    department: 'Mechanical Engineering',
    email: 'swati.gangwar@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Composite materials, Tribology and Materials characterizations',
    office: 'Main Campus'
  },
  {
    id: 'math_main_001',
    name: 'Prof. Vijay Gupta',
    designation: 'Professor and Head',
    department: 'Mathematics',
    email: 'vijaygupta2001@hotmail.com',
    phone: '011-2509906',
    qualification: 'M.Sc., M. Phil., Ph. D.',
    specialization: 'Approximation Theory, linear positive operators, author of 5 books, 15 book chapters, over 300 research papers, h-index 41',
    office: 'Main Campus'
  },
  {
    id: 'math_main_002',
    name: 'Prof. Jainendra Kumar Singh',
    designation: 'Professor',
    department: 'Mathematics',
    email: 'jksingh@nsut.ac.in',
    phone: '9968184765(R), 9205475013 (O)',
    qualification: 'M.Sc., Ph.D.',
    specialization: 'Astrophysics, General Relativity, Cosmology, spatially homogeneous and isotropic cosmological models, 48 research papers published',
    office: 'Main Campus'
  },
  {
    id: 'math_main_003',
    name: 'Prof. Jasobanta Jena',
    designation: 'Professor (on Deputation)',
    department: 'Mathematics',
    email: 'jjena@nsut.ac.in',
    phone: '9868839147',
    qualification: 'Ph.D.',
    specialization: 'Gas-dynamic Waves, Shock Waves',
    office: 'Main Campus'
  },
  {
    id: 'math_main_004',
    name: 'Dr. Mamta Misra',
    designation: 'Associate Professor',
    department: 'Mathematics',
    email: 'mmishra@nsit.ac.in',
    phone: '{empty}',
    qualification: 'M.Sc., Ph.D',
    specialization: 'Fluid Mechanics, published several papers in National and International Journals',
    office: 'Main Campus'
  },
  {
    id: 'math_main_005',
    name: 'Niraj Kumar',
    designation: 'Assistant Professor',
    department: 'Mathematics',
    email: 'neeraj@nsit.ac.in',
    phone: '01125000207',
    qualification: 'M.Sc, Ph.D.',
    specialization: 'Complex Analysis, Dirichlet series, student award winner V.M. Shah Prize and ISCA Best Poster Award',
    office: 'Main Campus'
  },
  {
    id: 'math_main_006',
    name: 'Dr. Anupam Gautam',
    designation: 'Assistant Professor',
    department: 'Mathematics',
    email: 'anupam.gautam@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Stochastic Processes, Queueing Models, performance analysis of communication systems, CSIR-NET(JRF) qualified with AIR-92',
    office: 'Main Campus'
  },
  {
    id: 'math_main_007',
    name: 'Dr. Amita Sharma',
    designation: 'Assistant Professor',
    department: 'Mathematics',
    email: 'amita.sharma@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Optimization techniques, Probability and stochastic process, Probability and statistics, Financial Mathematics, portfolio optimization',
    office: 'Main Campus'
  },
  {
    id: 'math_main_008',
    name: 'Dr. Sachin Sharma',
    designation: 'Assistant Professor',
    department: 'Mathematics',
    email: 'sachin.sharma@nsut.ac.in',
    phone: '{empty}',
    qualification: 'Ph.D.',
    specialization: 'Numerical Analysis, finite difference methods for partial differential equations, CSIR-NET(JRF)-2011 and GATE-2010 qualified',
    office: 'Main Campus'
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
  'Mathematics',
  'Design',
  'Instrumentation & Control Engineering',
  'Electrical Engineering',
  'Humanities and Social Sciences',
  'Chemistry',
  'Physics',
  'Biological Sciences and Engineering',
  'Management Studies',
  'Geoinformatics',
  'Innovation, Entrepreneurship, and Venture Development (IEV)',
  'Architecture and Planning',
  'Physical Education'
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
