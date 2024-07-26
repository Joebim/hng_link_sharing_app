"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, storage } from './firebase';
import { getDownloadURL, ref, uploadBytesResumable, TaskState } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

type UploadState = {
    progress: number | null;
    state: TaskState | null;
    error: string | null;
    downloadURL: string | null;
};

type ImageUploadContextType = {
    uploadImage: (file: File) => void;
    uploadStatus: UploadState;
};

const ImageUploadContext = createContext<ImageUploadContextType | null>(null);

export function useImageUpload() {
    const context = useContext(ImageUploadContext);
    if (!context) {
        throw new Error('useImageUpload must be used within an ImageUploadProvider');
    }
    return context;
}

type Props = {
    children: ReactNode;
};

export const ImageUploadProvider: React.FC<Props> = ({ children }) => {
    const [uploadStatus, setUploadStatus] = useState<UploadState>({
        progress: null,
        state: null,
        error: null,
        downloadURL: null
    });

    const uploadImage = (file: File) => {
        const currentUser = auth.currentUser;

        if (!currentUser) {
            setUploadStatus({
                progress: null,
                state: null,
                error: 'Not logged in!',
                downloadURL: null
            });
            toast.error('Not logged in!', {
                position: "bottom-center",
                style: { background: "#FF3939", color: "#ffffff", border: "none", boxShadow: "none" }
            });
            return;
        }

        const uid = currentUser.uid;

        if (file.size >= 1 * 1024 * 1024) {
            setUploadStatus({
                progress: null,
                state: null,
                error: 'Image size must be less than 1MB!',
                downloadURL: null
            });
            toast.error('Image size must be less than 1MB!', {
                position: "bottom-center",
                style: { background: "#FF3939", color: "#ffffff", border: "none", boxShadow: "none" }
            });
            return;
        }

        const uploadTask = uploadBytesResumable(
            ref(storage, `images/${uid}/${file.name}`),
            file
        );

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadStatus({
                    progress,
                    state: snapshot.state,
                    error: null,
                    downloadURL: null
                });
            },
            (error) => {
                setUploadStatus({
                    progress: null,
                    state: 'error',
                    error: error.message,
                    downloadURL: null
                });
                toast.error(error.message, {
                    position: "bottom-center",
                    style: { background: "#FF3939", color: "#ffffff", border: "none", boxShadow: "none" }
                });
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        if (!currentUser) {
                            setUploadStatus({
                                progress: null,
                                state: 'error',
                                error: 'User is not authenticated!',
                                downloadURL: null
                            });
                            toast.error('User is not authenticated!', {
                                position: "bottom-center",
                                style: { background: "#FF3939", color: "#ffffff", border: "none", boxShadow: "none" }
                            });
                            return;
                        }

                        updateProfile(currentUser, {
                            displayName: currentUser.displayName,
                            photoURL: downloadURL
                        }).then(() => {
                            setUploadStatus({
                                progress: 100,
                                state: 'success',
                                error: null,
                                downloadURL
                            });
                            toast.success('Image uploaded successfully!', {
                                position: "bottom-center",
                                style: { background: "#333333", color: "#ffffff", border: "none", boxShadow: "none" }
                            });
                        }).catch((error) => {
                            setUploadStatus({
                                progress: null,
                                state: 'error',
                                error: error.message,
                                downloadURL: null
                            });
                            toast.error(error.message, {
                                position: "bottom-center",
                                style: { background: "#FF3939", color: "#ffffff", border: "none", boxShadow: "none" }
                            });
                        });
                    });
            }
        );
    };

    return (
        <ImageUploadContext.Provider value={{ uploadImage, uploadStatus }}>
            {children}
            <ToastContainer/>
        </ImageUploadContext.Provider>
    );
};
