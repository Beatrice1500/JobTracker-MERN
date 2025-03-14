const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salaryRange: { min: Number, max: Number },
  experienceLevel: String,
  education: String,
  workType: String,
});

const User = mongoose.model('User', userSchema);
const Job = mongoose.model('Job', jobSchema);

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ email: req.body.email, password: hashedPassword });
    await user.save();
    res.json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: 'Login failed' });
  }
});

app.post('/api/jobs/populate', verifyToken, async (req, res) => {
  try {
    const jobs = [
      // Technology (15 jobs)
      { title: 'Senior Software Engineer', company: 'Google', location: 'Mountain View, CA', salaryRange: { min: 150000, max: 220000 }, experienceLevel: 'Senior', education: 'Master’s', workType: 'Hybrid' },
      { title: 'Machine Learning Engineer', company: 'OpenAI', location: 'San Francisco, CA', salaryRange: { min: 160000, max: 250000 }, experienceLevel: 'Senior', education: 'PhD', workType: 'Remote' },
      { title: 'iOS Developer', company: 'Apple', location: 'Cupertino, CA', salaryRange: { min: 130000, max: 180000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'On-Site' },
      { title: 'Cloud Architect', company: 'Amazon Web Services', location: 'Seattle, WA', salaryRange: { min: 140000, max: 210000 }, experienceLevel: 'Senior', education: 'Bachelor’s', workType: 'Remote' },
      { title: 'Cybersecurity Analyst', company: 'Palo Alto Networks', location: 'Santa Clara, CA', salaryRange: { min: 90000, max: 140000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'Hybrid' },
      { title: 'Full Stack Developer', company: 'Facebook', location: 'Menlo Park, CA', salaryRange: { min: 120000, max: 180000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'Remote' },
      { title: 'DevOps Engineer', company: 'Microsoft', location: 'Redmond, WA', salaryRange: { min: 115000, max: 155000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'Hybrid' },
      { title: 'Data Engineer', company: 'Netflix', location: 'Los Gatos, CA', salaryRange: { min: 130000, max: 190000 }, experienceLevel: 'Senior', education: 'Master’s', workType: 'Remote' },
      { title: 'UI/UX Designer', company: 'Adobe', location: 'San Jose, CA', salaryRange: { min: 100000, max: 150000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'Hybrid' },
      { title: 'Blockchain Developer', company: 'Coinbase', location: 'San Francisco, CA', salaryRange: { min: 140000, max: 200000 }, experienceLevel: 'Senior', education: 'Bachelor’s', workType: 'Remote' },
      { title: 'AI Research Scientist', company: 'DeepMind', location: 'London, UK', salaryRange: { min: 150000, max: 250000 }, experienceLevel: 'Senior', education: 'PhD', workType: 'On-Site' },
      { title: 'Game Developer', company: 'Epic Games', location: 'Cary, NC', salaryRange: { min: 90000, max: 140000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'On-Site' },
      { title: 'QA Engineer', company: 'Sony', location: 'San Diego, CA', salaryRange: { min: 80000, max: 120000 }, experienceLevel: 'Junior', education: 'Bachelor’s', workType: 'On-Site' },
      { title: 'Mobile App Developer', company: 'Uber', location: 'San Francisco, CA', salaryRange: { min: 110000, max: 160000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'Hybrid' },
      { title: 'Backend Developer', company: 'Twitter', location: 'San Francisco, CA', salaryRange: { min: 120000, max: 170000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'Remote' },

      // Finance (5 jobs)
      { title: 'Investment Banker', company: 'Goldman Sachs', location: 'New York, NY', salaryRange: { min: 150000, max: 300000 }, experienceLevel: 'Senior', education: 'MBA', workType: 'On-Site' },
      { title: 'Financial Analyst', company: 'JPMorgan Chase', location: 'New York, NY', salaryRange: { min: 80000, max: 120000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'Hybrid' },
      { title: 'Risk Manager', company: 'Morgan Stanley', location: 'New York, NY', salaryRange: { min: 130000, max: 180000 }, experienceLevel: 'Senior', education: 'Master’s', workType: 'On-Site' },
      { title: 'Accountant', company: 'Deloitte', location: 'Chicago, IL', salaryRange: { min: 70000, max: 110000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'Hybrid' },
      { title: 'Tax Consultant', company: 'PwC', location: 'San Francisco, CA', salaryRange: { min: 90000, max: 140000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'Remote' },

      // Healthcare (5 jobs)
      { title: 'Clinical Research Manager', company: 'Pfizer', location: 'New York, NY', salaryRange: { min: 110000, max: 160000 }, experienceLevel: 'Senior', education: 'Master’s', workType: 'On-Site' },
      { title: 'Pediatric Nurse', company: 'Mayo Clinic', location: 'Rochester, MN', salaryRange: { min: 75000, max: 110000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'On-Site' },
      { title: 'Medical Doctor', company: 'Cleveland Clinic', location: 'Cleveland, OH', salaryRange: { min: 200000, max: 300000 }, experienceLevel: 'Senior', education: 'MD', workType: 'On-Site' },
      { title: 'Pharmacist', company: 'CVS Health', location: 'Woonsocket, RI', salaryRange: { min: 100000, max: 140000 }, experienceLevel: 'Mid-Level', education: 'PharmD', workType: 'On-Site' },
      { title: 'Dental Hygienist', company: 'Aspen Dental', location: 'Chicago, IL', salaryRange: { min: 70000, max: 100000 }, experienceLevel: 'Mid-Level', education: 'Associate’s', workType: 'On-Site' },

      // Engineering (5 jobs)
      { title: 'Aerospace Engineer', company: 'SpaceX', location: 'Hawthorne, CA', salaryRange: { min: 120000, max: 180000 }, experienceLevel: 'Senior', education: 'Master’s', workType: 'On-Site' },
      { title: 'Civil Engineer', company: 'Bechtel', location: 'Reston, VA', salaryRange: { min: 80000, max: 130000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'Hybrid' },
      { title: 'Mechanical Engineer', company: 'Tesla', location: 'Palo Alto, CA', salaryRange: { min: 100000, max: 150000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'On-Site' },
      { title: 'Electrical Engineer', company: 'General Electric', location: 'Boston, MA', salaryRange: { min: 90000, max: 140000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'Hybrid' },
      { title: 'Chemical Engineer', company: 'Dow Chemical', location: 'Midland, MI', salaryRange: { min: 95000, max: 145000 }, experienceLevel: 'Mid-Level', education: 'Bachelor’s', workType: 'On-Site' },
    ];

    await Job.deleteMany({}); // Clear existing jobs
    await Job.insertMany(jobs);
    res.json({ message: '30 jobs populated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/jobs', verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch jobs' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));