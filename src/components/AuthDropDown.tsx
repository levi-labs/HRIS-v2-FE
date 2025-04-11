import React, { useEffect, useRef, useState } from 'react';

interface AuthDropdownProps {
  username: string;
  onLogout?: () => void;
}
const AuthDropdown = ({ username, onLogout }: AuthDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null); // Ref untuk elemen pemicu (Welcome, Admin)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      isDropdownOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, dropdownRef, triggerRef]);
  return (
    <div className='relative' ref={dropdownRef}>
      <div
        className='text-sm text-wrap text-gray-600 cursor-pointer'
        onClick={toggleDropdown}
        //on click outside of dropdown hide
        ref={triggerRef}
      >
        Welcome,{username}
      </div>

      {isDropdownOpen && (
        <div
          onMouseLeave={() => setIsDropdownOpen(false)} // hide on mouse leave from dropdown
          className='absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
        >
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu-button'
          >
            <a
              href='/profile'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              role='menuitem'
            >
              Profile
            </a>
            <a
              href='/logout'
              className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
              role='menuitem'
            >
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthDropdown;
