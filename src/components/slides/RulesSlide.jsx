import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiClipboard, FiCheck, FiArrowRight, FiArrowLeft, FiClock, FiCalendar, FiDollarSign, FiAlertCircle } = FiIcons;

const RulesSlide = ({ formData, updateFormData, onNext, onPrev, canProceed }) => {
  const [checkedRules, setCheckedRules] = useState(formData.checkedRules || []);
  const [pulseCheckbox, setPulseCheckbox] = useState(false);

  const handleRuleCheck = (index) => {
    const newCheckedRules = [...checkedRules];
    const position = newCheckedRules.indexOf(index);
    if (position === -1) {
      newCheckedRules.push(index);
    } else {
      newCheckedRules.splice(position, 1);
    }
    setCheckedRules(newCheckedRules);
    updateFormData({
      checkedRules: newCheckedRules,
      rulesAccepted: newCheckedRules.length === rules.length
    });
    
    if (newCheckedRules.length === rules.length) {
      setPulseCheckbox(false);
    }
  };

  // Start pulsing effect after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!formData.rulesAccepted) {
        setPulseCheckbox(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [formData.rulesAccepted]);

  const rules = [
    {
      icon: FiClock,
      title: "Terminowe dostarczanie dokumentów",
      description: "Wszystkie dokumenty księgowe należy dostarczyć do 10 dnia następnego miesiąca. Późniejsze dostarczenie może wpłynąć na terminowe rozliczenia.",
      color: "blue"
    },
    {
      icon: FiCalendar,
      title: "Umawianie spotkań z wyprzedzeniem",
      description: "Spotkania należy umawiać minimum 2 dni wcześniej. W nagłych przypadkach prosimy o kontakt telefoniczny.",
      color: "green"
    },
    {
      icon: FiDollarSign,
      title: "Płatności w terminie",
      description: "Faktury należy regulować w terminie 14 dni od daty wystawienia. Opóźnienia mogą skutkować naliczeniem odsetek.",
      color: "yellow"
    },
    {
      icon: FiAlertCircle,
      title: "Miesięczne uzgodnienia obowiązkowe",
      description: "Do 15 każdego miesiąca przeprowadzamy uzgodnienia sald i omawiamy bieżące sprawy podatkowe.",
      color: "purple"
    },
    {
      icon: FiClipboard,
      title: "Kompletność dokumentacji",
      description: "Dokumenty muszą być czytelne i kompletne. Brakujące elementy mogą opóźnić przetwarzanie.",
      color: "indigo"
    },
    {
      icon: FiCheck,
      title: "Weryfikacja danych przed wysłaniem",
      description: "Prosimy o sprawdzenie poprawności danych na dokumentach przed ich przesłaniem do biura.",
      color: "teal"
    },
    {
      icon: FiClock,
      title: "Czas odpowiedzi na zapytania",
      description: "Na zapytania mailowe odpowiadamy w ciągu 24h w dni robocze. W pilnych sprawach prosimy dzwonić.",
      color: "orange"
    },
    {
      icon: FiCalendar,
      title: "Informowanie o zmianach",
      description: "O wszelkich zmianach w działalności należy informować minimum 7 dni wcześniej.",
      color: "red"
    },
    {
      icon: FiDollarSign,
      title: "Rozliczenia w terminach ustawowych",
      description: "Deklaracje podatkowe składamy zgodnie z terminami ustawowymi. Opóźnienia dokumentów mogą wpłynąć na terminy.",
      color: "cyan"
    },
    {
      icon: FiCheck,
      title: "Poufność i bezpieczeństwo danych",
      description: "Wszystkie dane klientów są chronione zgodnie z RODO. Nie udostępniamy informacji osobom trzecim.",
      color: "pink"
    }
  ];

  const getColorClasses = () => {
    // Wszystkie kolory zmieniamy na odcienie beżu i niebieskiego
    return "bg-[#F2E4CD]/50 text-[#002999] border-[#F2E4CD]";
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
          <SafeIcon icon={FiClipboard} className="text-3xl text-[#002999]" />
        </motion.div>
        <h2 className="text-3xl font-bold text-[#002999] mb-2">
          Zasady współpracy
        </h2>
        <p className="text-gray-600">
          10 kluczowych zasad dla sprawnej współpracy i terminowych rozliczeń
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {rules.map((rule, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`flex items-start space-x-4 p-6 border rounded-xl hover:shadow-md transition-all ${
              checkedRules.includes(index)
                ? 'border-[#002999] bg-gradient-to-r from-[#F2E4CD]/40 to-white'
                : 'border-[#F2E4CD]/30'
            }`}
            onClick={() => handleRuleCheck(index)}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 border ${getColorClasses()}`}
            >
              <SafeIcon icon={rule.icon} className="text-xl" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#002999] mb-2">
                {index + 1}. {rule.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {rule.description}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              <motion.div
                animate={{
                  scale: checkedRules.includes(index) ? [1, 1.2, 1] : 1,
                  opacity: checkedRules.includes(index) ? 1 : 0.5
                }}
                transition={{ duration: 0.3 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  checkedRules.includes(index) ? "bg-[#002999]" : "bg-gray-200"
                }`}
              >
                <SafeIcon
                  icon={FiCheck}
                  className={checkedRules.includes(index) ? "text-white" : "text-gray-400"}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#F2E4CD]/30 border border-[#F2E4CD]/50 p-6 rounded-xl mb-8">
        <h3 className="text-lg font-semibold text-[#002999] mb-3">
          📋 Dlaczego te zasady są ważne?
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="space-y-2">
            <p className="flex items-center space-x-2">
              <SafeIcon icon={FiCheck} className="text-[#002999] flex-shrink-0" />
              <span>Zapewniają terminowe rozliczenia podatkowe</span>
            </p>
            <p className="flex items-center space-x-2">
              <SafeIcon icon={FiCheck} className="text-[#002999] flex-shrink-0" />
              <span>Gwarantują wysoką jakość obsługi</span>
            </p>
            <p className="flex items-center space-x-2">
              <SafeIcon icon={FiCheck} className="text-[#002999] flex-shrink-0" />
              <span>Minimalizują ryzyko błędów i kar</span>
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center space-x-2">
              <SafeIcon icon={FiCheck} className="text-[#002999] flex-shrink-0" />
              <span>Umożliwiają sprawną komunikację</span>
            </p>
            <p className="flex items-center space-x-2">
              <SafeIcon icon={FiCheck} className="text-[#002999] flex-shrink-0" />
              <span>Zapewniają bezpieczeństwo danych</span>
            </p>
            <p className="flex items-center space-x-2">
              <SafeIcon icon={FiCheck} className="text-[#002999] flex-shrink-0" />
              <span>Budują długotrwałą współpracę</span>
            </p>
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
              checked={formData.rulesAccepted}
              onChange={(e) => {
                updateFormData({ rulesAccepted: e.target.checked });
                if (e.target.checked) {
                  setPulseCheckbox(false);
                }
              }}
              className="mt-1 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <div>
              <span className="text-gray-800 font-medium">
                Zapoznałem się z zasadami współpracy i zobowiązuję się ich przestrzegać *
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Rozumiem, że przestrzeganie tych zasad jest kluczowe dla sprawnej współpracy
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

export default RulesSlide;