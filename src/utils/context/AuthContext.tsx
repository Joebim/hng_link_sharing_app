"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '../firebase';
import { updateProfile, updateEmail } from 'firebase/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User, UserCredential } from 'firebase/auth';
import {  useImageUpload } from '../ImageUploadContext';

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
    const { uploadImage } = useImageUpload(); // Use the image upload function

    const signup = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signin = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        return signOut(auth);
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
          } catch (error) {
            console.error("Error updating profile: ", error);
          }
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const isAuthenticated = !!currentUser;

    const value = {
        currentUser,
        signup,
        signin,
        logOut,
        isAuthenticated,
        updateUserProfile,
        uploadImage, // Provide the uploadImage function
    };

    return (
        <AuthContext.Provider value={value}>
                {!loading && children}
        </AuthContext.Provider>
    );
};
