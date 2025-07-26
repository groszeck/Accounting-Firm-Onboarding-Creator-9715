import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiPlay, FiPause, FiVolume2, FiVolumeX, FiCheck, FiArrowRight, FiHeart } = FiIcons;

const WelcomeSlide = ({ formData, updateFormData, onNext, canProceed }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [pulseCheckbox, setPulseCheckbox] = useState(false);
  
  const videoRef = useRef(null);
  const progressInterval = useRef(null);

  useEffect(() => {
    // Start pulsing effect after a delay if video hasn't been watched
    const timer = setTimeout(() => {
      if (!formData.welcomeVideoWatched) {
        setPulseCheckbox(true);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [formData.welcomeVideoWatched]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    updateFormData({ welcomeVideoWatched: true });
    setPulseCheckbox(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleCheckboxChange = (checked) => {
    updateFormData({ welcomeVideoWatched: checked });
    if (checked) {
      setPulseCheckbox(false);
    }
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
          <SafeIcon icon={FiHeart} className="text-3xl text-[#002999]" />
        </motion.div>
        <h2 className="text-3xl font-bold text-[#002999] mb-2">
          Witamy w KPJ Biuro Rachunkowe!
        </h2>
        <p className="text-gray-600">
          Zapoznaj się z procesem onboardingu i dowiedz się, co przygotowaliśmy dla Ciebie
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="bg-[#F2E4CD]/20 p-6 rounded-xl border border-[#F2E4CD]/40">
            <h3 className="text-xl font-bold text-[#002999] mb-4">
              Twoja ścieżka onboardingu
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#002999] text-white flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Witamy w KPJ!</h4>
                  <p className="text-sm text-gray-600">Obejrzyj film powitalny i poznaj naszą firmę</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#F2E4CD] text-[#002999] flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Poznaj zespół</h4>
                  <p className="text-sm text-gray-600">Przedstawimy osoby, które będą opiekować się Twoją firmą</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#F2E4CD] text-[#002999] flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Warunki umowy</h4>
                  <p className="text-sm text-gray-600">Zapoznaj się z warunkami współpracy i akceptuj umowę</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#F2E4CD] text-[#002999] flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Konfiguracja Scanye</h4>
                  <p className="text-sm text-gray-600">Skonfiguruj aplikację do przesyłania dokumentów</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#F2E4CD] text-[#002999] flex items-center justify-center flex-shrink-0 mt-0.5">5</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Zasady współpracy</h4>
                  <p className="text-sm text-gray-600">Poznaj 10 zasad efektywnej współpracy</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#F2E4CD] text-[#002999] flex items-center justify-center flex-shrink-0 mt-0.5">6</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Materiały pomocnicze</h4>
                  <p className="text-sm text-gray-600">Pobierz przydatne materiały do prowadzenia firmy</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-[#F2E4CD] text-[#002999] flex items-center justify-center flex-shrink-0 mt-0.5">7</div>
                <div>
                  <h4 className="font-semibold text-gray-800">Twoje marzenia</h4>
                  <p className="text-sm text-gray-600">Podziel się swoimi celami biznesowymi</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video shadow-lg">
            {/* Video element */}
            <video 
              ref={videoRef}
              className="w-full h-full object-cover"
              onEnded={handleVideoEnded}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              poster="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=450&fit=crop"
            >
              {/* For demonstration purposes, using a placeholder video */}
              <source src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4" type="video/mp4" />
              Twoja przeglądarka nie obsługuje odtwarzania wideo.
            </video>
            
            {/* Video overlay controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3 md:p-4">
              <div className="flex items-center justify-between mb-1 md:mb-2">
                <div className="text-white text-xs md:text-sm">
                  {videoRef.current ? formatTime(videoRef.current.currentTime) : '0:00'} / 
                  {videoDuration ? formatTime(videoDuration) : '0:00'}
                </div>
                <div className="flex items-center space-x-1 md:space-x-2">
                  <button 
                    onClick={handleMuteToggle}
                    className="text-white p-1.5 md:p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <SafeIcon icon={isMuted ? FiVolumeX : FiVolume2} className="text-sm md:text-lg" />
                  </button>
                </div>
              </div>
              
              <div className="w-full bg-gray-600 h-1 rounded-full mb-2 md:mb-3">
                <div 
                  className="bg-[#002999] h-1 rounded-full"
                  style={{ width: `${videoProgress}%` }}
                ></div>
              </div>
              
              <button
                onClick={handlePlayPause}
                className="mx-auto bg-white/30 hover:bg-white/50 text-white p-3 md:p-4 rounded-full transition-all backdrop-blur-sm"
              >
                <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="text-2xl md:text-3xl" />
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#F2E4CD]/40 to-white p-6 rounded-xl border border-[#F2E4CD]/60">
            <h3 className="text-lg font-bold text-[#002999] mb-3">
              Co zyskujesz w KPJ Biuro Rachunkowe?
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiCheck} className="text-[#002999]" />
                <span className="text-gray-700">Profesjonalną obsługę księgową</span>
              </li>
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiCheck} className="text-[#002999]" />
                <span className="text-gray-700">Dedykowany zespół specjalistów</span>
              </li>
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiCheck} className="text-[#002999]" />
                <span className="text-gray-700">Nowoczesne narzędzia do przesyłania dokumentów</span>
              </li>
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiCheck} className="text-[#002999]" />
                <span className="text-gray-700">Wsparcie w rozwijaniu Twojego biznesu</span>
              </li>
              <li className="flex items-center space-x-2">
                <SafeIcon icon={FiCheck} className="text-[#002999]" />
                <span className="text-gray-700">Bezpieczeństwo finansowe i podatkowe</span>
              </li>
            </ul>
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
              checked={formData.welcomeVideoWatched}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              className="mt-1 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <div>
              <span className="text-gray-800 font-medium">
                Obejrzałem/am film powitalny i rozumiem proces onboardingu *
              </span>
              <p className="text-sm text-gray-600 mt-1">
                Zapoznałem/am się z procesem onboardingu i wiem, co mnie czeka w kolejnych krokach
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
    </div>
  );
};

export default WelcomeSlide;