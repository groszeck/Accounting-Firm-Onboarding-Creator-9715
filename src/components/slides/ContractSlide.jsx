import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import ContractModal from '../ContractModal';

const { FiFileText, FiCheck, FiArrowRight, FiFileSignature, FiBuilding, FiMail, FiPhone, FiPackage, FiUsers } = FiIcons;

const ContractSlide = ({ formData, updateFormData, onNext, canProceed }) => {
  const [showContract, setShowContract] = useState(false);
  const [pulseCheckbox, setPulseCheckbox] = useState(false);

  // Dane statyczne - wstępnie wypełnione dla klienta
  const clientData = {
    companyName: formData.companyName || "ABC Sp. z o.o.",
    email: formData.email || "kontakt@abc-firma.pl",
    phone: formData.phone || "+48 123 456 789",
    servicePackage: "Premium - dokumenty bez limitu",
    employeeCount: "10"
  };

  // Ustawiamy dane statyczne w formData jeśli nie są jeszcze ustawione
  if (!formData.companyName || !formData.email || !formData.phone || !formData.servicePackage || !formData.employeeCount) {
    updateFormData({
      companyName: clientData.companyName,
      email: clientData.email,
      phone: clientData.phone,
      servicePackage: clientData.servicePackage,
      employeeCount: clientData.employeeCount
    });
  }

  const handleCheckboxChange = (checked) => {
    updateFormData({ contractAccepted: checked });
    if (checked) {
      setPulseCheckbox(false);
    }
  };

  // Start pulsing effect after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!formData.contractAccepted) {
        setPulseCheckbox(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [formData.contractAccepted]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-[#F2E4CD] rounded-full mb-4"
        >
          <SafeIcon icon={FiFileText} className="text-3xl text-[#002999]" />
        </motion.div>
        <h2 className="text-3xl font-bold text-[#002999] mb-2">
          Warunki umowy i dane firmy
        </h2>
        <p className="text-gray-600">
          Sprawdź swoje dane i zaakceptuj warunki współpracy
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Lewa kolumna - dane statyczne */}
        <div className="space-y-6">
          <div className="bg-[#F2E4CD]/20 p-6 rounded-xl border border-[#F2E4CD]/40">
            <h3 className="text-lg font-semibold text-[#002999] mb-4 flex items-center space-x-2">
              <SafeIcon icon={FiBuilding} className="text-[#002999]" />
              <span>Dane Twojej firmy</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nazwa firmy
                </label>
                <div className="bg-white border border-gray-300 rounded-lg p-3 text-gray-800 font-medium">
                  {clientData.companyName}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                  <SafeIcon icon={FiMail} className="text-[#002999]" />
                  <span>Adres e-mail</span>
                </label>
                <div className="bg-white border border-gray-300 rounded-lg p-3 text-gray-800 font-medium">
                  {clientData.email}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                  <SafeIcon icon={FiPhone} className="text-[#002999]" />
                  <span>Numer telefonu</span>
                </label>
                <div className="bg-white border border-gray-300 rounded-lg p-3 text-gray-800 font-medium">
                  {clientData.phone}
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 flex items-center space-x-2">
                <SafeIcon icon={FiCheck} className="text-blue-600" />
                <span>Dane zostały automatycznie wypełnione na podstawie Twojego profilu</span>
              </p>
            </div>
          </div>
        </div>

        {/* Prawa kolumna - pakiet i warunki */}
        <div className="space-y-6">
          <div className="bg-[#F2E4CD]/20 p-6 rounded-xl border border-[#F2E4CD]/40">
            <h3 className="text-lg font-semibold text-[#002999] mb-4 flex items-center space-x-2">
              <SafeIcon icon={FiPackage} className="text-[#002999]" />
              <span>Twój pakiet</span>
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pakiet usług księgowych
                </label>
                <div className="bg-white border border-gray-300 rounded-lg p-3 text-gray-800 font-medium">
                  {clientData.servicePackage}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center space-x-2">
                  <SafeIcon icon={FiUsers} className="text-[#002999]" />
                  <span>Liczba pracowników</span>
                </label>
                <div className="bg-white border border-gray-300 rounded-lg p-3 text-gray-800 font-medium">
                  {clientData.employeeCount}
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 flex items-center space-x-2">
                <SafeIcon icon={FiCheck} className="text-blue-600" />
                <span>Pakiet i liczba pracowników zostały dobrane dla Twojej firmy</span>
              </p>
            </div>
          </div>

          <div className="bg-[#F2E4CD]/30 p-4 rounded-lg">
            <h4 className="font-semibold text-[#002999] mb-2">Warunki umowy</h4>
            <p className="text-sm text-gray-700 mb-3">
              Zapoznaj się z warunkami świadczenia usług księgowych
            </p>
            <button
              onClick={() => setShowContract(true)}
              className="text-[#002999] hover:text-blue-800 font-medium text-sm underline"
            >
              Przeczytaj pełną treść umowy
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-gradient-to-r from-[#002999] to-[#0041E8] text-white font-bold py-4 px-6 rounded-lg shadow-lg flex items-center justify-center space-x-3 hover:shadow-xl transition-all"
          >
            <SafeIcon icon={FiFileSignature} className="text-xl" />
            <span className="text-lg">Podpisz umowę w Autenti</span>
          </motion.button>
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
              checked={formData.contractAccepted}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className="mt-1 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <div>
              <span className="text-gray-800 font-medium">
                Akceptuję warunki umowy i wyrażam zgodę na przetwarzanie danych osobowych *
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Potwierdzam, że zapoznałem się z warunkami świadczenia usług księgowych
              </p>
            </div>
          </label>
        </motion.div>
      </div>

      <div className="flex justify-end mt-8">
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

      <ContractModal isOpen={showContract} onClose={() => setShowContract(false)} />
    </div>
  );
};

export default ContractSlide;