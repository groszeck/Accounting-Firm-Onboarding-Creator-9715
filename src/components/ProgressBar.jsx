import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ currentStep, totalSteps, stepTitle, teamMembers = [], allSteps = [] }) => {
  const progress = (currentStep / totalSteps) * 100;
  const showTeamPhotos = currentStep >= 2; // Show team photos after team slide

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-[#002999]">
          Krok {currentStep} z {totalSteps}: {stepTitle}
        </span>
        <span className="text-sm text-gray-500">
          {currentStep}/{totalSteps}
        </span>
      </div>
      
      {/* Steps list - visible only on desktop */}
      <div className="hidden md:flex mb-3 space-x-4 overflow-x-auto">
        {allSteps.map((step, index) => (
          <div 
            key={index} 
            className={`flex items-center ${
              index < currentStep 
                ? 'text-[#002999]' 
                : index === currentStep - 1 
                  ? 'text-[#002999] font-medium' 
                  : 'text-gray-400'
            }`}
          >
            <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center text-xs ${
              index < currentStep - 1 
                ? 'bg-[#002999] text-white' 
                : index === currentStep - 1 
                  ? 'border-2 border-[#002999] bg-white text-[#002999]' 
                  : 'border border-gray-300 bg-white text-gray-400'
            }`}>
              {index < currentStep - 1 ? '✓' : index + 1}
            </div>
            <span className="text-xs whitespace-nowrap">{step}</span>
          </div>
        ))}
      </div>
      
      {/* Mobile view - only circles */}
      <div className="flex md:hidden mb-3 space-x-2 justify-center">
        {allSteps.map((_, index) => (
          <div 
            key={index} 
            className={`w-2.5 h-2.5 rounded-full ${
              index < currentStep - 1 
                ? 'bg-[#002999]' 
                : index === currentStep - 1 
                  ? 'bg-[#002999]' 
                  : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
        <motion.div
          className="bg-gradient-to-r from-[#002999] to-[#0041E8] h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Team members photos in progress bar */}
      {showTeamPhotos && teamMembers.length > 0 && (
        <motion.div
          className="flex -space-x-2 overflow-hidden mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {teamMembers.map((member, index) => (
            <motion.img
              key={index}
              src={member.image}
              alt={member.name}
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              title={member.name}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            />
          ))}
          <motion.span
            className="inline-flex items-center justify-center h-6 px-2 rounded-full bg-[#F2E4CD] text-[#002999] text-xs font-medium"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            Twój zespół
          </motion.span>
        </motion.div>
      )}
    </div>
  );
};

export default ProgressBar;