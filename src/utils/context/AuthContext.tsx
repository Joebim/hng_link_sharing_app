"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../firebase';
import { updateProfile, updateEmail } from 'firebase/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, UserCredential } from 'firebase/auth';
import { useImageUpload } from '../ImageUploadContext';

type UserProfile = {
    email?: string;
    displayName?: string;
    photoURL?: string | null;
};

type AuthContextType = {
    currentUser: User | null;
    signup: (email: string, password: string) => Promise<UserCredential>;
    signin: (email: string, password: string) => Promise<UserCredential>;
    logOut: () => Promise<void>;
    isAuthenticated: boolean;
    updateUserProfile: (profile: UserProfile) => Promise<void>;
    uploadImage: (file: File) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

type Props = {
    children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const { uploadImage } = useImageUpload();


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleAuthError = (error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        let message = '';

        switch (errorCode) {
            case 'auth/email-already-in-use':
                message = 'The email address is already in use by another account.';
                break;
            case 'auth/invalid-email':
                message = 'The email address is not valid.';
                break;
            case 'auth/operation-not-allowed':
                message = 'Email/password accounts are not enabled.';
                break;
            case 'auth/weak-password':
                message = 'The password is too weak.';
                break;
            case 'auth/user-not-found':
                message = 'No user found with this email.';
                break;
            case 'auth/wrong-password':
                message = 'Wrong password.';
                break;
            default:
                message = errorMessage;
                break;
        }

        toast.error(message, {
            position: "bottom-center",
            style: { background: "#FF3939", color: "#ffffff", border: "none", boxShadow: "none" }
        });
    };

    const signup = async (email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            toast.success('Sign up successful!', {
                position: "bottom-center",
                style: { background: "#333333", color: "#ffffff", border: "none", boxShadow: "none" }
            });
            return userCredential;
        } catch (error) {
            handleAuthError(error);
            throw error;
        }
    };

    const signin = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            toast.success('Sign in successful!', {
                position: "bottom-center",
                style: { background: "#333333", color: "#ffffff", border: "none", boxShadow: "none" }
            });
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setCurrentUser(user);
                setLoading(false);
            });
            unsubscribe();
            return userCredential;
        } catch (error) {
            handleAuthError(error);
            throw error;
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully!', {
                position: "bottom-center",
                style: { background: "#333333", color: "#ffffff", border: "none", boxShadow: "none" }
            });
        } catch (error) {
            handleAuthError(error);
            throw error;
        }
    };

    const updateUserProfile = async (profile: UserProfile) => {
        if (currentUser) {
            try {
                if (profile.displayName || profile.photoURL) {
                    await updateProfile(currentUser, {
                        displayName: profile.displayName,
                        photoURL: profile.photoURL,
                    });
                }
                if (profile.email) {
                    await updateEmail(currentUser, profile.email);
                }
                setCurrentUser(auth.currentUser);
                toast.success('Profile updated successfully!', {
                    position: "bottom-center",
                    style: { background: "#333333", color: "#ffffff", border: "none", boxShadow: "none" }
                });
            } catch (error) {
                handleAuthError(error);
                throw error;
            }
        }
    };



    const isAuthenticated = !!currentUser;

    const value = {
        currentUser,
        signup,
        signin,
        logOut,
        isAuthenticated,
        updateUserProfile,
        uploadImage,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
