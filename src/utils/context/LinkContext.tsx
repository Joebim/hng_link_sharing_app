"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LinkIcon from "../../../public/link.svg";
import { db, auth } from '../firebase';
import { collection, doc, runTransaction, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { Link } from '../types/types';

type LinkContextType = {
  links: Link[];
  addLink: () => void;
  removeLink: (id: string) => void;
  updateLink: (id: string, updatedLink: Link) => void;
  saveLinks: () => void;
  loadLinks: () => void;
};

const LinkContext = createContext<LinkContextType | undefined>(undefined);

export const LinkProvider = ({ children }: { children: ReactNode }) => {
  const [links, setLinks] = useState<Link[]>([]);

  const loadLinks = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      return;
    }
    const querySnapshot = await getDocs(collection(db, 'users', uid, 'links'));
    const loadedLinks = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Link));
    setLinks(loadedLinks);
  };

  useEffect(() => {
    loadLinks();
  }, []);

  const addLink = () => {
    const newLink = { id: (links?.length + 1).toString(), platform: 'GitHub', url: '', color: '#1A1A1A' };
    setLinks([...links, newLink]);
  };

  const removeLink = async (id: string) => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      toast.error('User not authenticated', {
        position: "bottom-center",
        style: { background: "#FF3939", color: "#ffffff", border: "none", boxShadow: "none" }
      });
      return;
    }

    try {
      setLinks(links?.filter(link => link.id !== id));
      await deleteDoc(doc(db, 'users', uid, 'links', id));
      toast.success('Link removed successfully', {
        position: "bottom-center",
        style: { background: "#333333", color: "#ffffff", border: "none", boxShadow: "none" }
      });
    } catch (error) {
      toast.error('Failed to remove link', {
        position: "bottom-center",
        style: { background: "#FF3939", color: "#ffffff", border: "none", boxShadow: "none" }
      });
    }
  };

  const updateLink = (id: string, updatedLink: Link) => {
    setLinks(links?.map(link => (link.id === id ? updatedLink : link)));
  };

  const saveLinks = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      toast.error('User not authenticated', {
        position: "bottom-center",
        style: { background: "#FF3939", color: "#ffffff", border: "none", boxShadow: "none" }
      });
      return;
    }

    try {
      await runTransaction(db, async (transaction) => {
        const linksRef = collection(db, 'users', uid, 'links');
        const existingLinksSnapshot = await getDocs(linksRef);

        existingLinksSnapshot.docs.forEach(doc => {
          transaction.delete(doc.ref);
        });

        links?.forEach(link => {
          const linkRef = doc(linksRef, link.id);
          transaction.set(linkRef, link);
        });
      });
      toast.success('Links saved successfully', {
        position: "bottom-center",
        style: { background: "#333333", color: "#ffffff", border: "none", boxShadow: "none" }
      });
    } catch (error) {
      toast.error('Transaction failed', {
        position: "bottom-center",
        style: { background: "#FF3939", color: "#ffffff", border: "none", boxShadow: "none" }
      });
    }
  };

  return (
    <LinkContext.Provider value={{ links, addLink, removeLink, updateLink, saveLinks, loadLinks }}>
      {children}
    </LinkContext.Provider>
  );
};

export const useLinkContext = () => {
  const context = useContext(LinkContext);
  if (!context) {
    throw new Error('useLinkContext must be used within a LinkProvider');
  }
  return context;
};
