import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiBookOpen, FiDownload, FiPlay, FiCheck, FiArrowRight, FiArrowLeft, FiFileText, FiVideo } = FiIcons;

const ResourcesSlide = ({ formData, updateFormData, onNext, onPrev, canProceed }) => {
  const [pulseCheckbox, setPulseCheckbox] = useState(false);

  const handleCheckboxChange = (checked) => {
    updateFormData({ resourcesDownloaded: checked });
    if (checked) {
      setPulseCheckbox(false);
    }
  };

  // Start pulsing effect after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!formData.resourcesDownloaded) {
        setPulseCheckbox(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [formData.resourcesDownloaded]);

  const handleDownload = (type, filename) => {
    // Symulacja pobierania pliku
    const link = document.createElement('a');
    link.href = '#';
    link.download = filename;
    link.click();
  };

  const resources = [
    {
      type: 'ebook',
      title: 'Przewodnik dla początkującego przedsiębiorcy',
      description: 'Kompletny przewodnik zawierający najważniejsze informacje o prowadzeniu firmy, obowiązkach podatkowych i księgowych.',
      filename: 'przewodnik-przedsiebiorca.pdf',
      size: '2.5 MB',
      pages: '45 stron',
      icon: FiBookOpen,
      color: 'blue'
    },
    {
      type: 'video',
      title: 'Pierwsze kroki w biznesie - seria filmów',
      description: 'Seria 5 filmów instruktażowych o zakładaniu firmy, pierwszych formalnościach i najczęstszych błędach.',
      filename: 'pierwsze-kroki-biznes.mp4',
      size: '250 MB',
      duration: '45 min',
      icon: FiVideo,
      color: 'red'
    }
  ];

  const tips = [
    {
      category: 'Podatki',
      items: [
        'Prowadź regularną ewidencję wszystkich przychodów i kosztów',
        'Zachowuj oryginały wszystkich dokumentów księgowych',
        'Pamiętaj o terminach płatności podatków i składek ZUS'
      ]
    },
    {
      category: 'Dokumentacja',
      items: [
        'Numeruj faktury w sposób ciągły i chronologiczny',
        'Archiwizuj dokumenty przez wymagany okres (min. 5 lat)',
        'Rób kopie zapasowe ważnych dokumentów'
      ]
    },
    {
      category: 'Planowanie',
      items: [
        'Przygotowuj budżet na najbliższy rok działalności',
        'Monitoruj przepływy pieniężne w firmie',
        'Planuj większe wydatki z wyprzedzeniem'
      ]
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-[#F2E4CD] rounded-full mb-4"
        >
          <SafeIcon icon={FiBookOpen} className="text-3xl text-[#002999]" />
        </motion.div>
        <h2 className="text-3xl font-bold text-[#002999] mb-2">
          Materiały pomocnicze
        </h2>
        <p className="text-gray-600">
          Pobierz bezpłatne materiały, które pomogą Ci w prowadzeniu firmy
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[#002999] mb-4">
            📚 Materiały do pobrania
          </h3>
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-[#F2E4CD]/40 rounded-xl p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#F2E4CD]">
                  <SafeIcon icon={resource.icon} className="text-xl text-[#002999]" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#002999] mb-2">
                    {resource.title}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <span className="mr-3">{resource.size}</span>
                      <span>{resource.pages || resource.duration}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDownload(resource.type, resource.filename)}
                      className="px-4 py-2 rounded-lg font-medium text-sm flex items-center space-x-2 transition-all bg-[#002999] hover:bg-[#001E66] text-white"
                    >
                      <SafeIcon icon={resource.type === 'ebook' ? FiDownload : FiPlay} />
                      <span>{resource.type === 'ebook' ? 'Pobierz' : 'Oglądaj'}</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-[#002999] mb-4">
            💡 Najważniejsze tipy
          </h3>
          {tips.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#F2E4CD]/40 to-white border border-[#F2E4CD]/50 rounded-xl p-6"
            >
              <h4 className="font-semibold text-[#002999] mb-3">
                {category.category}
              </h4>
              <ul className="space-y-2">
                {category.items.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheck} className="text-[#002999] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#F2E4CD]/50 to-white border border-[#F2E4CD]/50 p-6 rounded-xl mb-8">
        <h3 className="text-lg font-semibold text-[#002999] mb-3">
          🎯 Dlaczego warto skorzystać z materiałów?
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiCheck} className="text-[#002999]" />
            <span className="text-gray-700">Unikniesz częstych błędów</span>
          </div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiCheck} className="text-[#002999]" />
            <span className="text-gray-700">Zaoszczędzisz czas i pieniądze</span>
          </div>
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiCheck} className="text-[#002999]" />
            <span className="text-gray-700">Będziesz lepiej przygotowany</span>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
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
              checked={formData.resourcesDownloaded}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className="mt-1 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <div>
              <span className="text-gray-800 font-medium">
                Pobrałem materiały pomocnicze i zapoznałem się z tipami *
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Wykorzystam te materiały do lepszego prowadzenia mojej firmy
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

export default ResourcesSlide;