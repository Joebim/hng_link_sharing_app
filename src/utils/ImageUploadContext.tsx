"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { auth, storage } from './firebase';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable, TaskState } from 'firebase/storage';
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
        if (!auth.currentUser) {
            setUploadStatus({
                progress: null,
                state: null,
                error: 'Not logged in!',
                downloadURL: null
            });
            return;
        }

        const uid = auth.currentUser.uid;

        if (file.size >= 1 * 1024 * 1024) {
            setUploadStatus({
                progress: null,
                state: null,
                error: 'Image size must be less than 1MB!',
                downloadURL: null
            });
            return;
        }

        const uploadTask = uploadBytesResumable(
            ref(storage, `profiles/${uid}/${file.name}`),
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
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                        deleteObject(ref(storage, `profiles/${uid}/${file.name}`)).then(() => {
                            if (!auth.currentUser) {
                                throw new Error('No User!');
                            }
                            updateProfile(auth.currentUser, {
                                displayName: auth.currentUser.displayName,
                                photoURL: downloadURL
                            }).then(() => {
                                setUploadStatus({
                                    progress: 100,
                                    state: 'success',
                                    error: null,
                                    downloadURL
                                });
                            });
                        });
                    });
            }
        );
    };

    return (
        <ImageUploadContext.Provider value={{ uploadImage, uploadStatus }}>
            {children}
        </ImageUploadContext.Provider>
    );
};
