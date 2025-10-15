import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon, CheckCircleIcon } from '../components/icons.tsx';
import { supabase } from '../supabaseClient.tsx';

// ... (StepIndicator component remains the same)

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    companyName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep(step + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            company_name: formData.companyName
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        setSuccess(true);
      } else {
         throw new Error("Registration succeeded but no user data was returned. Please check your email.");
      }

    } catch (error: any) {
      setError(error.message || "An unexpected error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
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

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && <div className="mb-4 text-center text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}
          
          {success ? (
            <div className="text-center">
              <CheckCircleIcon className="w-12 h-12 text-secondary mx-auto"/>
              <h3 className="mt-4 text-xl font-bold text-dark">Check your email</h3>
              <p className="mt-2 text-gray-600">We've sent a confirmation link to <strong>{formData.email}</strong>. Please click the link to activate your account.</p>
              <Link to="/login" className="mt-6 inline-block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">
                Back to Login
              </Link>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleRegister}>
               <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input id="fullName" name="fullName" type="text" autoComplete="name" required value={formData.fullName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
                <input id="companyName" name="companyName" type="text" required value={formData.companyName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Business Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input id="password" name="password" type="password" autoComplete="new-password" required minLength={6} value={formData.password} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm" />
              </div>
              <div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50">
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
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