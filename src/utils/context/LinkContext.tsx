"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import LinkIcon from "../../../public/link.svg";
import { db } from '../firebase'; 
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
    const querySnapshot = await getDocs(collection(db, 'links'));
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
    setLinks(links?.filter(link => link.id !== id));
    await deleteDoc(doc(db, 'links', id));
  };

  const updateLink = (id: string, updatedLink: Link) => {
    setLinks(links?.map(link => (link.id === id ? updatedLink : link)));
  };

  const saveLinks = async () => {
    try {
      await runTransaction(db, async (transaction) => {
        const linksRef = collection(db, 'links');
        const existingLinksSnapshot = await getDocs(linksRef);

        existingLinksSnapshot.docs.forEach(doc => {
          transaction.delete(doc.ref);
        });

        links?.forEach(link => {
          const linkRef = doc(linksRef, link.id);
          transaction.set(linkRef, link);
        });
      });
      console.log('Transaction successfully committed!');
    } catch (error) {
      console.error('Transaction failed: ', error);
    }
  };

  return (
    <LinkContext.Provider 
    value={{ 
      links, 
      addLink, 
      removeLink, 
      updateLink, 
      saveLinks, 
      loadLinks 
      }}>
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
