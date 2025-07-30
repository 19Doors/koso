"use client";
import { useRef, useState } from "react";
import { MODELS, DEFAULT_MODEL } from "@/constants/models";
import { dropdownAnimations } from "@/utils/animations";

export function ModelSelector({ onModelChange }) {
  const dropdownRef = useRef(null);
  const [currentModel, setCurrentModel] = useState(DEFAULT_MODEL);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    if (newIsOpen) {
      dropdownAnimations.open(dropdownRef.current);
    } else {
      dropdownAnimations.close(dropdownRef.current);
    }
  };

  const handleModelSelect = (model, index) => {
    setCurrentModel(model.name);
    setSelectedIndex(index);
    setIsOpen(false);
    dropdownAnimations.close(dropdownRef.current);
    onModelChange?.(model);
  };

  return (
    <div className="relative font-inter">
      <button
        onClick={toggleDropdown}
        className="cursor-pointer outline-none border p-1 text-xs rounded-sm shadow-inner shadow-black/20"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {currentModel}
      </button>
      
      <div
        ref={dropdownRef}
        className="absolute opacity-0 items-start border rounded-sm p-1 flex flex-col bg-background font-inter z-10"
        role="listbox"
      >
        {MODELS.map((model, index) => (
          <button
            key={model.id}
            className={`p-1 cursor-pointer text-left w-full hover:underline ${
              index === selectedIndex ? "underline" : ""
            }`}
            onClick={() => handleModelSelect(model, index)}
            role="option"
            aria-selected={index === selectedIndex}
          >
            {model.name}
          </button>
        ))}
      </div>
    </div>
  );
}
