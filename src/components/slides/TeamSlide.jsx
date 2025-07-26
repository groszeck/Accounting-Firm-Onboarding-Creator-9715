import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiUsers, FiCheck, FiArrowRight, FiArrowLeft, FiMail, FiPhone, FiUserCheck, FiThumbsUp, FiCalendar } = FiIcons;

const TeamSlide = ({ formData, updateFormData, onNext, onPrev, canProceed, teamMembers }) => {
  const [pulseCheckbox, setPulseCheckbox] = useState(false);
  const checkboxRef = useRef(null);

  const handleCheckboxChange = (checked) => {
    updateFormData({ teamMet: checked });
    if (checked) {
      setPulseCheckbox(false);
    }
  };

  const [likes, setLikes] = useState([0, 0, 0]);
  const likeControls = [useAnimation(), useAnimation(), useAnimation()];

  // Efekt pulsowania dla ikon lajków
  useEffect(() => {
    const pulseAnimation = async () => {
      while (true) {
        await Promise.all(
          likeControls.map(control =>
            control.start({
              scale: [1, 1.15, 1],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }
            })
          )
        );
        // Dodajemy opóźnienie przed kolejnym cyklem
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    };
    pulseAnimation();
  }, []);

  // Start pulsing effect after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!formData.teamMet) {
        setPulseCheckbox(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [formData.teamMet]);

  const handleLike = (index) => {
    const newLikes = [...likes];
    newLikes[index] = newLikes[index] + 1;
    setLikes(newLikes);

    // Animacja kliknięcia
    likeControls[index].start({
      scale: [1, 1.5, 1],
      rotate: [0, 15, -15, 0],
      transition: { duration: 0.5 }
    });
  };

  const handleMeetingClick = (member) => {
    // Symulacja otwierania kalendarza
    alert(`Przekierowuję do kalendarza ${member.name}...`);
    // W rzeczywistej aplikacji tutaj byłoby:
    // window.open(member.meetingUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-[#F2E4CD] rounded-full mb-4"
        >
          <SafeIcon icon={FiUsers} className="text-3xl text-[#002999]" />
        </motion.div>
        <h2 className="text-3xl font-bold text-[#002999] mb-2">
          Poznaj swój zespół w KPJ
        </h2>
        <p className="text-gray-600">
          Profesjonaliści, którzy będą się opiekować Twoją firmą
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full md:w-2/3 mx-auto bg-gradient-to-r from-[#002999] to-[#0041E8] text-white font-bold py-5 px-6 rounded-lg shadow-lg flex items-center justify-center space-x-3 hover:shadow-xl transition-all mb-8"
      >
        <SafeIcon icon={FiUserCheck} className="text-xl" />
        <span className="text-lg">Poznaj swój zespół w KPJ</span>
      </motion.button>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mb-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-gradient-to-br from-[#F2E4CD]/30 to-white p-6 rounded-xl border border-[#F2E4CD]/40 hover:shadow-lg transition-all"
          >
            <div className="text-center mb-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
              />
              <h3 className="text-xl font-bold text-[#002999] mb-1">
                {member.name}
              </h3>
              <p className="text-[#002999] font-semibold mb-3">
                {member.role}
              </p>
            </div>

            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {member.description}
            </p>

            <div className="space-y-2 mb-4">
              <h4 className="font-semibold text-gray-800 text-sm">Specjalizacje:</h4>
              <div className="flex flex-wrap gap-1">
                {member.expertise.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 bg-[#F2E4CD] text-[#002999] text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMail} className="text-[#002999]" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="text-[#002999]" />
                <span>{member.phone}</span>
              </div>
            </div>

            {/* Sekcja z przyciskami */}
            <div className="mt-4 pt-4 border-t border-[#F2E4CD]/30">
              <div className="flex items-center justify-between gap-2">
                {/* Przycisk lajka */}
                <motion.button
                  animate={likeControls[index]}
                  onClick={() => handleLike(index)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-full bg-[#F2E4CD]/50 hover:bg-[#F2E4CD] text-[#002999] transition-colors flex-shrink-0"
                >
                  <SafeIcon icon={FiThumbsUp} className="text-[#002999]" />
                  <span className="text-sm">{likes[index] > 0 ? likes[index] : ''}</span>
                </motion.button>

                {/* Przycisk umów spotkanie */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMeetingClick(member)}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#002999] hover:bg-[#001E66] text-white rounded-lg transition-colors text-sm font-medium flex-grow"
                >
                  <SafeIcon icon={FiCalendar} className="text-white" />
                  <span>Umów spotkanie</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-6 border-t border-gray-200">
        <motion.div
          ref={checkboxRef}
          animate={pulseCheckbox ? {
            scale: [1, 1.04, 1],
            boxShadow: [
              "0 0 0 0 rgba(249, 115, 22, 0)",
              "0 0 0 4px rgba(249, 115, 22, 0.3)",
              "0 0 0 0 rgba(249, 115, 22, 0)"
            ]
          } : {}}
          transition={pulseCheckbox ? {
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut"
          } : {}}
          className="p-2 rounded-lg"
        >
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.teamMet}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className="mt-1 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <div>
              <span className="text-gray-800 font-medium">
                Poznałem zespół i wiem kto będzie się opiekować moją firmą *
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Znam osoby kontaktowe i wiem jak się z nimi skontaktować
              </p>
            </div>
          </label>
        </motion.div>
      </div>

      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPrev}
          className="px-8 py-3 border border-gray-300 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-50 transition-all"
        >
          <SafeIcon icon={FiArrowLeft} />
          <span>Wstecz</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={!canProceed}
          className={`px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all ${
            canProceed
              ? 'bg-[#002999] hover:bg-[#001E66] text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>Dalej</span>
          <SafeIcon icon={FiArrowRight} />
        </motion.button>
      </div>
    </div>
  );
};

export default TeamSlide;