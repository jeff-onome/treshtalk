import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoIcon } from '../components/icons.tsx';
import { supabase } from '../supabaseClient.tsx';
import { countries, industries, companySizes, roles } from '../data/formOptions.ts';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        country: 'United States',
        password: '',
        companyName: '',
        industry: '',
        companySize: '',
        userRole: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(5);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple validation for step 1
        if (formData.fullName && formData.email && formData.password.length >= 6) {
            setError(null);
            setStep(2);
        } else {
            setError('Please fill in all personal details. Password must be at least 6 characters.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Final validation
        if (!formData.companyName || !formData.industry || !formData.companySize || !formData.userRole) {
            setError('Please fill in all business details.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.fullName,
                        country: formData.country,
                        company_name: formData.companyName,
                        industry: formData.industry,
                        company_size: formData.companySize,
                        user_role: formData.userRole,
                    },
                },
            });

            if (signUpError) throw signUpError;
            
            setStep(3); // Move to success step

        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setTimeout> for browser compatibility.
        let timer: ReturnType<typeof setTimeout>;
        if (step === 3 && countdown > 0) {
            timer = setTimeout(() => setCountdown(c => c - 1), 1000);
        } else if (step === 3 && countdown === 0) {
            navigate('/login');
        }
        return () => clearTimeout(timer);
    }, [step, countdown, navigate]);

    const progressPercentage = step === 1 ? '0%' : step === 2 ? '50%' : '100%';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link to="/" className="flex justify-center">
                    <LogoIcon className="h-12 w-auto text-primary" />
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {step === 3 ? 'Account Created!' : 'Create your account'}
                </h2>
                {step !== 3 && (
                     <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
                            sign in to your existing account
                        </Link>
                    </p>
                )}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {step === 3 ? (
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="mt-5 text-lg leading-6 font-medium text-gray-900">Check your email</h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    We've sent a verification link to <strong className="text-gray-700">{formData.email}</strong>. Please check your inbox and follow the instructions to activate your account.
                                </p>
                            </div>
                             <div className="mt-4 text-sm text-gray-500">
                                Redirecting to login in {countdown} seconds...
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="mb-6">
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-primary">Step {step} of 2</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: progressPercentage }}></div>
                                </div>
                            </div>
                            
                            {error && <div className="mb-4 text-center text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}
                            
                            <form onSubmit={step === 1 ? handleNextStep : handleSubmit}>
                                {step === 1 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                            <input name="fullName" type="text" required value={formData.fullName} onChange={handleInputChange} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Business Email</label>
                                            <input name="email" type="email" required value={formData.email} onChange={handleInputChange} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Country</label>
                                            <select name="country" value={formData.country} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white">
                                                {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Password</label>
                                            <input name="password" type="password" required minLength={6} value={formData.password} onChange={handleInputChange} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                                        </div>
                                        <div>
                                            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover">Continue</button>
                                        </div>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Company Name</label>
                                            <input name="companyName" type="text" required value={formData.companyName} onChange={handleInputChange} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Industry</label>
                                            <select name="industry" required value={formData.industry} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white">
                                                <option value="" disabled>Select an industry...</option>
                                                {industries.map(i => <option key={i} value={i}>{i}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Company Size</label>
                                            <select name="companySize" required value={formData.companySize} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white">
                                                <option value="" disabled>Select a size...</option>
                                                {companySizes.map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Your Role</label>
                                            <select name="userRole" required value={formData.userRole} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white">
                                                <option value="" disabled>Select a role...</option>
                                                {roles.map(r => <option key={r} value={r}>{r}</option>)}
                                            </select>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button type="button" onClick={() => setStep(1)} className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">Back</button>
                                            <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover disabled:opacity-50">
                                                {loading ? 'Creating Account...' : 'Create Account'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </>
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