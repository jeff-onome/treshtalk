import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoIcon, CheckCircleIcon } from '../components/icons';

const StepIndicator: React.FC<{ currentStep: number; step: number; title: string }> = ({ currentStep, step, title }) => {
    const isActive = currentStep === step;
    const isCompleted = currentStep > step;
    
    return (
        <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? 'bg-primary text-white' : isActive ? 'bg-primary-light text-primary border-2 border-primary' : 'bg-gray-200 text-gray-500'}`}>
                {isCompleted ? <CheckCircleIcon className="w-5 h-5" /> : step}
            </div>
            <span className={`ml-3 text-sm font-medium hidden sm:block ${isActive || isCompleted ? 'text-dark' : 'text-gray-500'}`}>{title}</span>
        </div>
    );
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    industry: '',
    companySize: '',
    role: '',
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };
  
  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFinish = () => {
    // Simulate a successful registration
    navigate('/dashboard/chats');
  };
  
  const codeSnippet = `<!-- TreshTalk Installation -->
<script src="https://cdn.treshtalk.com/widget.js" async></script>
<script>
  window.treshtalk = { id: "YOUR_UNIQUE_ID" };
</script>
<!-- End TreshTalk Installation -->`;


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <Link to="/" className="flex justify-center">
          <LogoIcon className="h-12 w-auto text-primary" />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
         <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {/* Progress Bar */}
            <div className="flex justify-between items-center mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-0 h-0.5 bg-primary transform -translate-y-1/2" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
                <StepIndicator currentStep={step} step={1} title="Profile" />
                <StepIndicator currentStep={step} step={2} title="Company" />
                <StepIndicator currentStep={step} step={3} title="Install" />
            </div>

            {step === 1 && (
                <form className="space-y-6" onSubmit={handleNext}>
                     <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input id="fullName" name="fullName" type="text" autoComplete="name" required value={formData.fullName} onChange={handleInputChange} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Business Email</label>
                      <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleInputChange} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                      <input id="password" name="password" type="password" autoComplete="new-password" required value={formData.password} onChange={handleInputChange} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                    </div>
                    <div>
                      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        Continue
                      </button>
                    </div>
                </form>
            )}

            {step === 2 && (
                <form className="space-y-6" onSubmit={handleNext}>
                    <div>
                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                        <input id="companyName" name="companyName" type="text" required value={formData.companyName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                        <select id="industry" name="industry" required value={formData.industry} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-primary focus:border-primary">
                            <option value="">Select an industry</option>
                            <option>Technology</option>
                            <option>E-commerce</option>
                            <option>Healthcare</option>
                            <option>Finance</option>
                            <option>Education</option>
                            <option>Retail</option>
                            <option>Other</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="companySize" className="block text-sm font-medium text-gray-700">Company Size</label>
                        <select id="companySize" name="companySize" required value={formData.companySize} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-primary focus:border-primary">
                            <option value="">Select a size</option>
                            <option>1-10 employees</option>
                            <option>11-50 employees</option>
                            <option>51-200 employees</option>
                            <option>201-500 employees</option>
                            <option>500+ employees</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Your Role</label>
                        <select id="role" name="role" required value={formData.role} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-primary focus:border-primary">
                             <option value="">Select your role</option>
                            <option>Founder / CEO</option>
                            <option>Marketing</option>
                            <option>Sales</option>
                            <option>Customer Support</option>
                             <option>Product</option>
                            <option>Engineering</option>
                             <option>Other</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                         <button type="button" onClick={handlePrev} className="text-sm font-medium text-gray-600 hover:text-dark">Back</button>
                         <button type="submit" className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                            Create Account
                        </button>
                    </div>
                </form>
            )}

            {step === 3 && (
                <div>
                     <h3 className="text-lg font-medium text-dark">Welcome to TreshTalk!</h3>
                     <p className="mt-2 text-sm text-gray-600">Your account has been created. To get started, install the widget on your website by pasting this code into your HTML.</p>
                     <div className="mt-4 bg-gray-900 rounded-lg p-4">
                        <pre>
                            <code className="text-white text-xs sm:text-sm whitespace-pre-wrap">
                                {codeSnippet}
                            </code>
                        </pre>
                    </div>
                     <div className="mt-6 flex justify-end">
                          <button type="button" onClick={handleFinish} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                           Go to Dashboard
                          </button>
                     </div>
                </div>
            )}
           
            <div className="mt-6 text-center">
                <div className="text-sm">
                    <Link to="/" className="font-medium text-primary hover:text-primary-hover">
                      Back to home
                    </Link>
                </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
