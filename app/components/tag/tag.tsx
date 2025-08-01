import React from 'react';

interface TagProps {
  children: React.ReactNode;
}

const Tag: React.FC<TagProps> = ({ children }) => {
  return (
    <span className="bg-black-1/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
      {children}
    </span>
  );
};

export default Tag;
