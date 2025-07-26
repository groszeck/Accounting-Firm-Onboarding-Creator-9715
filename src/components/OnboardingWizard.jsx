import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeSlide from './slides/WelcomeSlide';
import TeamSlide from './slides/TeamSlide';
import ContractSlide from './slides/ContractSlide';
import ScanyeSlide from './slides/ScanyeSlide';
import RulesSlide from './slides/RulesSlide';
import ResourcesSlide from './slides/ResourcesSlide';
import DreamsSlide from './slides/DreamsSlide';
import CelebrationSlide from './slides/CelebrationSlide';
import ProgressBar from './ProgressBar';
import KPJLogo from './KPJLogo';

const OnboardingWizard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    // Dane statyczne - wstępnie wypełnione
    companyName: 'ABC Sp. z o.o.',
    email: 'kontakt@abc-firma.pl',
    phone: '+48 123 456 789',
    servicePackage: 'Premium - dokumenty bez limitu',
    employeeCount: '10',
    
    // Pozostałe pola
    welcomeVideoWatched: false,
    contractAccepted: false,
    scanyeSetup: false,
    teamMet: false,
    rulesAccepted: false,
    checkedRules: [],
    resourcesDownloaded: false,
    dreamShared: false,
    dreamText: ''
  });

  // Team members data - defined here so it can be shared between components
  const teamMembers = [
    {
      name: "Justyna Wójcik",
      role: "Główna księgowa",
      description: "15 lat doświadczenia w księgowości. Specjalizuje się w optymalizacji podatkowej i księgowości małych i średnich przedsiębiorstw.",
      email: "justyna.wojcik@kpj.pl",
      phone: "+48 123 456 789",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
      expertise: ["VAT", "CIT", "Optymalizacja podatkowa", "Księgi rachunkowe"],
      meetingUrl: "https://calendly.com/justyna-wojcik",
      upsellService: {
        title: "Polityka rachunkowości",
        description: "Kompleksowe opracowanie polityki rachunkowości dopasowanej do specyfiki Twojej firmy",
        price: "1200 zł",
        discountPrice: "600 zł"
      }
    },
    {
      name: "Aleksandra Wiatrowska-Szurpit",
      role: "Specjalistka kadr i płac",
      description: "Ekspert w zakresie prawa pracy i naliczania wynagrodzeń. Prowadzi obsługę kadrowo-płacową dla firm o różnej wielkości.",
      email: "aleksandra.wiatrowska@kpj.pl",
      phone: "+48 123 456 790",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face",
      expertise: ["Kadry", "Płace", "ZUS", "Prawo pracy"],
      meetingUrl: "https://calendly.com/aleksandra-wiatrowska",
      upsellService: {
        title: "Wzory umów z pracownikami",
        description: "Komplet wzorów umów z pracownikami wraz z komentarzem prawnym",
        price: "800 zł",
        discountPrice: "400 zł"
      }
    },
    {
      name: "Wioletta Ciechowicz",
      role: "Manager administracji",
      description: "Odpowiada za sprawną komunikację z klientami i koordynację procesów. Dba o terminową realizację wszystkich usług.",
      email: "wioletta.ciechowicz@kpj.pl",
      phone: "+48 123 456 791",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=300&h=300&fit=crop&crop=face",
      expertise: ["Obsługa klienta", "Koordynacja", "Administracja", "Zarządzanie"],
      meetingUrl: "https://calendly.com/wioletta-ciechowicz",
      upsellService: {
        title: "Pakiet 5 godzin wsparcia asystenckiego",
        description: "Dedykowane wsparcie administracyjne i asystenckie dla Twojego biznesu",
        price: "750 zł",
        discountPrice: "375 zł"
      }
    }
  ];

  const slides = [
    { component: WelcomeSlide, title: 'Witamy w KPJ!' },
    { component: TeamSlide, title: 'Poznaj nasz zespół' },
    { component: ContractSlide, title: 'Warunki umowy' },
    { component: ScanyeSlide, title: 'Konfiguracja Scanye' },
    { component: RulesSlide, title: 'Zasady współpracy' },
    { component: ResourcesSlide, title: 'Materiały pomocnicze' },
    { component: DreamsSlide, title: 'Twoje marzenia biznesowe' },
    { component: CelebrationSlide, title: 'Witamy w rodzinie!' }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      window.scrollTo(0, 0);
    }
  };

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const canProceed = () => {
    switch (currentSlide) {
      case 0: return formData.welcomeVideoWatched;
      case 1: return formData.teamMet;
      case 2: return formData.contractAccepted;
      case 3: return formData.scanyeSetup;
      case 4: return formData.rulesAccepted;
      case 5: return formData.resourcesDownloaded;
      case 6: return formData.dreamShared;
      default: return true;
    }
  };

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Stały pasek postępu - zawsze widoczny */}
      <div className="bg-white shadow-md border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <KPJLogo />
            <h1 className="text-2xl font-bold text-[#002999] hidden md:block">
              Kreator Onboarding - KPJ Biuro Rachunkowe
            </h1>
          </div>
          <ProgressBar 
            currentStep={currentSlide + 1} 
            totalSteps={slides.length} 
            stepTitle={slides[currentSlide].title} 
            teamMembers={teamMembers}
            allSteps={slides.map(slide => slide.title)} 
          />
        </div>
      </div>

      {/* Zawartość główna */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentSlideComponent
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextSlide}
                onPrev={prevSlide}
                canProceed={canProceed()}
                isFirst={currentSlide === 0}
                isLast={currentSlide === slides.length - 1}
                teamMembers={teamMembers}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;