import React, { useState } from 'react';
import { fieldTypes } from '../../utils/formItem';

function ButtonWithDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown')) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className="relative">
      <button
        size="icon"
        className="text-center h-min rounded-full text-white px-2 py-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        +
      </button>
      {isOpen && (
        <div className="dropdown absolute left-0 top-full mt-2 bg-black rounded shadow-lg z-10">
          <ul>
            {fieldTypes.map((field)=>(<li className="border border-b-1 px-3 py-2" key={field.id}>{field.name}</li>))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ButtonWithDropdown;