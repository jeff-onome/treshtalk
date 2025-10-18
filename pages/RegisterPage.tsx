import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoIcon, CheckIcon } from '../components/icons.tsx';
import { supabase } from '../supabaseClient.tsx';
import { countries, industryOptions, companySizeOptions, roleOptions } from '../data/formOptions.ts';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Form state
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('United States');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [industry, setIndustry] = useState(industryOptions[0]);
    const [companySize, setCompanySize] = useState(companySizeOptions[0]);
    const [role, setRole] = useState(roleOptions[0]);
    const [otherIndustry, setOtherIndustry] = useState('');
    const [otherRole, setOtherRole] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation for step 1
        if (fullName.trim() && email.trim() && password.length >= 6) {
            setError(null);
            setStep(2);
        } else {
            setError('Please fill in all personal details. Password must be at least 6 characters.');
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation for step 2
        if (!companyName.trim()) {
            setError('Please enter your company name.');
            return;
        }
        
        setLoading(true);
        setError(null);
        try {
            const finalIndustry = industry === 'Other' ? otherIndustry : industry;
            const finalRole = role === 'Other' ? otherRole : role;

            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        company_name: companyName,
                        country: country,
                        industry: finalIndustry,
                        company_size: companySize,
                        user_role: finalRole,
                    }
                }
            });

            if (signUpError) throw signUpError;
            if (!data.user) throw new Error('Registration failed, please try again.');

            navigate('/registration-success');

        } catch (err: any) {
            setError(err.error_description || err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                <Link to="/" className="flex justify-center">
                    <LogoIcon className="h-12 w-auto text-primary" />
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Get started with TreshTalk
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
                        Sign in
                    </Link>
                </p>

                {/* Progress Bar */}
                <div className="mt-8">
                    <div className="flex justify-between mb-1">
                        <span className={`text-sm font-medium ${step >= 1 ? 'text-primary' : 'text-gray-400'}`}>Personal Info</span>
                        <span className={`text-sm font-medium ${step >= 2 ? 'text-primary' : 'text-gray-400'}`}>Business Info</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: step === 1 ? '50%' : '100%' }}></div>
                    </div>
                </div>
            </div>

            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-lg">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && <div className="mb-4 text-center text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}
                    
                    {step === 1 && (
                        <form className="space-y-6" onSubmit={handleNextStep}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Business Email</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Country</label>
                                <select value={country} onChange={e => setCountry(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white">
                                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">
                                    Continue
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 2 && (
                        <form className="space-y-6" onSubmit={handleRegister}>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                                <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} required className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Industry / Field</label>
                                <select value={industry} onChange={e => setIndustry(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white">
                                    {industryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                {industry === 'Other' && (
                                     <input type="text" placeholder="Please specify your industry" value={otherIndustry} onChange={e => setOtherIndustry(e.target.value)} required className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                                )}
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Company Size</label>
                                <select value={companySize} onChange={e => setCompanySize(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white">
                                     {companySizeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Your Role</label>
                                <select value={role} onChange={e => setRole(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white">
                                     {roleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                                 {role === 'Other' && (
                                     <input type="text" placeholder="Please specify your role" value={otherRole} onChange={e => setOtherRole(e.target.value)} required className="mt-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                                )}
                            </div>
                            <div className="flex gap-4">
                                 <button type="button" onClick={() => setStep(1)} className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                    Back
                                </button>
                                <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover disabled:opacity-50">
                                    {loading ? 'Creating account...' : 'Create Account'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
                 <div className="mt-6 text-center text-sm text-gray-600">
                    <Link to="/" className="font-medium text-primary hover:text-primary-hover">
                        &larr; Back to homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
