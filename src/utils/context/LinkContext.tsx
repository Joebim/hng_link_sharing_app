"use client"

import React, { createContext, useState, useContext, ReactNode } from 'react';
import LinkIcon from "../../../public/link.svg"

type Link = {
  id: number;
  platform: string;
  url: string;
  icon: React.ElementType;
  color: string;
};

type LinkContextType = {
  links: Link[];
  addLink: () => void;
  removeLink: (id: number) => void;
  updateLink: (id: number, updatedLink: Link) => void;
};

const LinkContext = createContext<LinkContextType | undefined>(undefined);

export const LinkProvider = ({ children }: { children: ReactNode }) => {
  const [links, setLinks] = useState<Link[]>([]);

  const addLink = () => {
    const newLink = { id: links.length + 1, platform: 'GitHub', url: '', icon: LinkIcon, color: '#1A1A1A' };
    setLinks([...links, newLink]);
  };

  const removeLink = (id: number) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const updateLink = (id: number, updatedLink: Link) => {
    setLinks(links.map(link => (link.id === id ? updatedLink : link)));

    console.log('links', links)
  };

  return (
    <LinkContext.Provider value={{ links, addLink, removeLink, updateLink }}>
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
