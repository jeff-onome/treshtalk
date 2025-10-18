import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoIcon, EnvelopeIcon } from '../components/icons.tsx';

const RegistrationSuccessPage: React.FC = () => {
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        if (countdown === 0) {
            navigate('/login');
            return;
        }

        const timer = setTimeout(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link to="/" className="flex justify-center">
                    <LogoIcon className="h-12 w-auto text-primary" />
                </Link>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <EnvelopeIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <h2 className="mt-6 text-2xl font-extrabold text-gray-900">
                        Please check your email
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 max-w-sm mx-auto">
                        We've sent a confirmation link to your email address. Please click the link to activate your account and get started.
                    </p>
                    <div className="mt-6">
                        <Link
                            to="/login"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Back to Sign In
                        </Link>
                    </div>
                     <p className="mt-4 text-xs text-gray-500">
                        You will be redirected automatically in {countdown} seconds...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationSuccessPage;
