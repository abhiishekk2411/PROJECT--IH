import React from 'react';

const PageHeader = ({ title, subtitle, children }) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-gradient-to-r from-primary-600 to-primary-500 p-6 md:p-8 rounded-2xl shadow-md text-white">
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl md:text-4xl font-extrabold truncate">{title}</h1>
        {subtitle && <p className="text-primary-50 text-lg md:text-xl mt-2 font-medium">{subtitle}</p>}
      </div>
      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
