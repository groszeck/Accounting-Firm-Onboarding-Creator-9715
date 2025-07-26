import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import ScanyeInstructionModal from '../modals/ScanyeInstructionModal';
import ScanyeVideoModal from '../modals/ScanyeVideoModal';

const { FiSmartphone, FiMail, FiGlobe, FiPlay, FiCheck, FiArrowRight, FiArrowLeft, FiLogIn, FiCopy, FiBookOpen, FiVideo } = FiIcons;

const ScanyeSlide = ({ formData, updateFormData, onNext, onPrev, canProceed }) => {
  const [copied, setCopied] = useState(false);
  const [showInstructionModal, setShowInstructionModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [pulseCheckbox, setPulseCheckbox] = useState(false);

  const loginEmail = formData.email || 'twój_login@firma.pl';

  const handleCheckboxChange = (checked) => {
    updateFormData({ scanyeSetup: checked });
    if (checked) {
      setPulseCheckbox(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(loginEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Start pulsing effect after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!formData.scanyeSetup) {
        setPulseCheckbox(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [formData.scanyeSetup]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-[#F2E4CD] rounded-full mb-4"
        >
          <SafeIcon icon={FiSmartphone} className="text-3xl text-[#002999]" />
        </motion.div>
        <h2 className="text-3xl font-bold text-[#002999] mb-2">
          Konfiguracja aplikacji Scanye
        </h2>
        <p className="text-gray-600">
          Skonfiguruj swoje konto i naucz się jak łatwo przesyłać dokumenty
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#F2E4CD]/40 to-white p-6 rounded-xl border border-[#F2E4CD]/60">
            <h3 className="text-xl font-bold text-[#002999] mb-4">
              Zalety aplikacji Scanye
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <SafeIcon icon={FiCheck} className="text-[#002999] flex-shrink-0" />
                <span className="text-gray-700">Błyskawiczne przesyłanie dokumentów</span>
              </li>
              <li className="flex items-center space-x-3">
                <SafeIcon icon={FiCheck} className="text-[#002999] flex-shrink-0" />
                <span className="text-gray-700">Automatyczne rozpoznawanie faktur</span>
              </li>
              <li className="flex items-center space-x-3">
                <SafeIcon icon={FiCheck} className="text-[#002999] flex-shrink-0" />
                <span className="text-gray-700">Historia wszystkich dokumentów</span>
              </li>
              <li className="flex items-center space-x-3">
                <SafeIcon icon={FiCheck} className="text-[#002999] flex-shrink-0" />
                <span className="text-gray-700">Powiadomienia o statusie</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#F2E4CD]/20 p-6 rounded-xl">
            <h4 className="font-semibold text-[#002999] mb-3">Twój login do Scanye:</h4>
            <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden">
              <div className="flex-grow p-3 font-medium text-gray-700">{loginEmail}</div>
              <button
                onClick={copyToClipboard}
                className="bg-[#F2E4CD] hover:bg-[#F2E4CD]/70 text-[#002999] p-3 transition-colors"
                title="Kopiuj do schowka"
              >
                <SafeIcon icon={copied ? FiCheck : FiCopy} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {copied ? "Skopiowano do schowka!" : "Kliknij, aby skopiować login"}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-r from-[#002999] to-[#0041E8] text-white font-bold py-6 px-6 rounded-lg shadow-lg flex items-center justify-center space-x-3 hover:shadow-xl transition-all mb-6"
          >
            <SafeIcon icon={FiLogIn} className="text-2xl" />
            <span className="text-xl">Zaloguj się do Scanye</span>
          </motion.button>

          {/* Nowe przyciski instrukcji */}
          <div className="bg-[#F2E4CD]/10 p-6 rounded-xl border border-[#F2E4CD]/30">
            <h3 className="text-lg font-semibold text-[#002999] mb-4 text-center">
              📚 Instrukcje obsługi
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowInstructionModal(true)}
                className="bg-white border-2 border-[#F2E4CD] hover:border-[#002999] text-[#002999] font-semibold py-4 px-4 rounded-lg transition-all flex flex-col items-center space-y-2"
              >
                <SafeIcon icon={FiBookOpen} className="text-2xl" />
                <span className="text-sm">Przeczytaj instrukcję</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowVideoModal(true)}
                className="bg-white border-2 border-[#F2E4CD] hover:border-[#002999] text-[#002999] font-semibold py-4 px-4 rounded-lg transition-all flex flex-col items-center space-y-2"
              >
                <SafeIcon icon={FiVideo} className="text-2xl" />
                <span className="text-sm">Obejrzyj wideo</span>
              </motion.button>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-[#002999] mb-4">
            Sposoby przesyłania dokumentów
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-[#F2E4CD] rounded-full flex items-center justify-center">
                <SafeIcon icon={FiGlobe} className="text-xl text-[#002999]" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Aplikacja webowa</h4>
                <p className="text-sm text-gray-600">Przeglądarka internetowa - scanye.pl</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-[#F2E4CD] rounded-full flex items-center justify-center">
                <SafeIcon icon={FiMail} className="text-xl text-[#002999]" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Przesyłanie mailem</h4>
                <p className="text-sm text-gray-600">dokumenty@kpj.scanye.pl</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-[#F2E4CD] rounded-full flex items-center justify-center">
                <SafeIcon icon={FiSmartphone} className="text-xl text-[#002999]" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Aplikacja mobilna</h4>
                <p className="text-sm text-gray-600">Dostępna w App Store i Google Play</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <motion.div
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
              checked={formData.scanyeSetup}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className="mt-1 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <div>
              <span className="text-gray-800 font-medium">
                Potwierdzam, że obejrzałem instrukcję i rozumiem jak korzystać z aplikacji Scanye *
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Wiem jak przesyłać dokumenty przez przeglądarkę, email i aplikację mobilną
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

      {/* Modale */}
      <ScanyeInstructionModal isOpen={showInstructionModal} onClose={() => setShowInstructionModal(false)} />
      <ScanyeVideoModal isOpen={showVideoModal} onClose={() => setShowVideoModal(false)} />
    </div>
  );
};

export default ScanyeSlide;