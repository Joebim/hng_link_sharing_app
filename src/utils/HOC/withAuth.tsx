import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/context/AuthContext';

type WithAuthProps = {
    children?: React.ReactNode;
};

// Define the HOC with proper typing and add displayName
const withAuth = <P extends WithAuthProps>(WrappedComponent: React.ComponentType<P>) => {
    const ComponentWithAuth = (props: P) => {
        const { isAuthenticated } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!isAuthenticated) {
                router.push('/auth/login');
            }
        }, [isAuthenticated, router]);

        if (!isAuthenticated) {
            return null; // or a loading spinner
        }

        return <WrappedComponent {...props} />;
    };

    // Set the display name for easier debugging
    ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return ComponentWithAuth;
};

export default withAuth;
