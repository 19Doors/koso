"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

export function DropdownButton({ 
  children, 
  menuItems = [], 
  className = "",
  menuClassName = "",
  direction = "down" // "down" | "up" | "left" | "right"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const containerRef = useRef(null);

  const toggleDropdown = () => {
    if (!isOpen) {
      // Opening animation
      setIsOpen(true);
      gsap.set(menuRef.current, { 
        display: "block",
        opacity: 0,
        scale: 0.95,
        y: direction === "up" ? 10 : -10
      });
      gsap.to(menuRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      // Closing animation
      gsap.to(menuRef.current, {
        opacity: 0,
        scale: 0.95,
        y: direction === "up" ? 10 : -10,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setIsOpen(false);
          gsap.set(menuRef.current, { display: "none" });
        }
      });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        if (isOpen) {
          gsap.to(menuRef.current, {
            opacity: 0,
            scale: 0.95,
            y: direction === "up" ? 10 : -10,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
              setIsOpen(false);
              gsap.set(menuRef.current, { display: "none" });
            }
          });
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, direction]);

  const getMenuPositionClasses = () => {
    switch (direction) {
      case "up":
        return "bottom-full mb-2 left-0";
      case "left":
        return "right-full mr-2 top-0";
      case "right":
        return "left-full ml-2 top-0";
      default: // "down"
        return "top-full mt-2 left-0";
    }
  };

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Button */}
      <button
        onClick={toggleDropdown}
        className={`
          relative px-4 py-2 bg-black text-white rounded-md font-semibold 
          transition-all duration-200 hover:bg-gray-800 focus:outline-none 
          focus:ring-2 focus:ring-gray-400 focus:ring-offset-2
          ${className}
        `}
      >
        {children}
        {/* Optional arrow indicator */}
        <span className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Dropdown Menu */}
      <div
        ref={menuRef}
        className={`
          absolute ${getMenuPositionClasses()} min-w-[200px] bg-white 
          shadow-lg rounded-md py-2 z-50 border border-gray-200
          ${menuClassName}
        `}
        style={{ display: "none" }}
      >
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              if (item.onClick) item.onClick();
              toggleDropdown(); // Close dropdown after item click
            }}
            className={`
              px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer
              transition-colors duration-150 flex items-center gap-2
              ${item.className || ''}
            `}
          >
            {item.icon && <span className="text-lg">{item.icon}</span>}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
