import React, { ReactNode } from 'react';
// import { useAuth } from '../contexts/AuthContext'; // To be used when feature flags are implemented

interface FeatureGuardProps {
    feature: string;
    children: ReactNode;
}

/**
 * A placeholder component for feature guarding. In a real app, this would check
 * the user's subscription plan or feature flags from a service.
 */
const FeatureGuard: React.FC<FeatureGuardProps> = ({ feature, children }) => {
    // const { profile, workspace } = useAuth(); // Example of getting user data

    // Example logic:
    // const hasAccess = checkUserAccess(profile, workspace, feature);
    // if (!hasAccess) {
    //   return <UpgradePrompt featureName={feature} />;
    // }

    // For now, we allow all features.
    return <>{children}</>;
};

export default FeatureGuard;
