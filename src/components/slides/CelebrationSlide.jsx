import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import Confetti from '../Confetti';

const { FiStar, FiGift, FiPercent, FiCheckCircle, FiMail, FiPhone } = FiIcons;

const CelebrationSlide = ({ formData, teamMembers = [] }) => {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {showConfetti && <Confetti />}
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#F2E4CD] to-[#002999] rounded-full mb-6"
          >
            <SafeIcon icon={FiStar} className="text-4xl text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold bg-gradient-to-r from-[#002999] to-[#0041E8] bg-clip-text text-transparent mb-4"
          >
            🎉 Gratulacje!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-700 mb-2"
          >
            Witamy w rodzinie klientów Biura Rachunkowego KPJ!
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-600"
          >
            {formData.companyName && `${formData.companyName}, `}życzymy Ci powodzenia w biznesie!
          </motion.p>
        </div>

        {/* Team members section with personal greetings */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-center text-[#002999] mb-6">
            Twój zespół wspierający:
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="bg-gradient-to-br from-[#F2E4CD]/30 to-white p-6 rounded-xl border border-[#F2E4CD] text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-4 border-white shadow-md"
                />
                <h4 className="font-bold text-[#002999] mb-1">{member.name}</h4>
                <p className="text-sm text-[#002999] mb-3">{member.role}</p>
                <div className="text-sm text-gray-600 italic mb-3 min-h-[60px]">
                  {index === 0 ? (
                    "Zadbam o prawidłowe rozliczenia podatkowe i optymalizację obciążeń fiskalnych Twojej firmy."
                  ) : index === 1 ? (
                    "Zapewnię profesjonalną obsługę kadrowo-płacową i doradztwo w kwestiach pracowniczych."
                  ) : (
                    "Będę koordynować obsługę administracyjną i zapewnię sprawną komunikację."
                  )}
                </div>
                <div className="flex justify-center">
                  <div className="bg-[#F2E4CD]/50 text-[#002999] text-xs rounded-full px-3 py-1">
                    {member.expertise[0]}, {member.expertise[1]}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-br from-[#F2E4CD]/40 to-white border border-[#F2E4CD]/50 rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-[#002999] mb-4 flex items-center space-x-2">
            <SafeIcon icon={FiCheckCircle} className="text-[#002999]" />
            <span>Co otrzymujesz w ramach współpracy:</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              'Profesjonalna obsługa księgowa',
              'Terminowe rozliczenia podatkowe',
              'Stały kontakt z zespołem ekspertów',
              'Bezpieczne przesyłanie dokumentów',
              'Materiały edukacyjne i wsparcie'
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <SafeIcon icon={FiCheckCircle} className="text-[#002999] flex-shrink-0" />
                <span className="text-gray-700">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personalized offers section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-[#002999] mb-2 flex items-center justify-center space-x-2">
              <SafeIcon icon={FiGift} className="text-[#002999]" />
              <span>Oferta specjalna na start!</span>
            </h3>
            <p className="text-gray-600">
              Skorzystaj z naszych dodatkowych usług ze zniżką 50% w pierwszym miesiącu
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                className="bg-white border-2 border-[#F2E4CD] rounded-xl p-6 hover:border-[#002999] hover:shadow-lg transition-all relative overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                  <span className="bg-[#002999] text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
                    <SafeIcon icon={FiPercent} className="text-xs" />
                    <span>50%</span>
                  </span>
                </div>
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-[#002999]">{member.name}</p>
                    <p className="text-gray-600 text-xs">{member.role}</p>
                  </div>
                </div>
                <h4 className="font-semibold text-[#002999] mb-2">{member.upsellService.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{member.upsellService.description}</p>
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 line-through text-sm">{member.upsellService.price}</span>
                    <span className="text-2xl font-bold text-[#002999]">{member.upsellService.discountPrice}</span>
                  </div>
                  <p className="text-xs text-gray-500">na pierwszy miesiąc</p>
                </div>
                <button className="w-full bg-gradient-to-r from-[#002999] to-[#0041E8] hover:from-[#001E66] hover:to-[#002999] text-white font-semibold py-3 rounded-lg transition-all">
                  Zamawiam
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="bg-[#F2E4CD]/20 border border-[#F2E4CD] rounded-xl p-6 text-center"
        >
          <h3 className="text-lg font-semibold text-[#002999] mb-4">
            Masz pytania? Skontaktuj się z nami!
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiMail} className="text-[#002999]" />
              <span className="text-gray-700">kontakt@kpj.pl</span>
            </div>
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiPhone} className="text-[#002999]" />
              <span className="text-gray-700">+48 123 456 789</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="text-center mt-8"
        >
          <p className="text-gray-600 text-lg">
            Dziękujemy za zaufanie i życzymy sukcesów w biznesie! 🚀
          </p>
          {formData.dreamText && (
            <div className="mt-6 bg-gradient-to-r from-[#F2E4CD]/30 to-white p-4 rounded-lg inline-block">
              <p className="text-sm text-gray-500 mb-2">Twoje marzenie biznesowe:</p>
              <p className="text-[#002999] italic">"{formData.dreamText}"</p>
              <p className="text-xs text-gray-500 mt-2">Wrócimy do niego za rok! 🚀</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CelebrationSlide;