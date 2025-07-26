import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiStar, FiVideo, FiMic, FiPlay, FiPause, FiStopCircle, FiCheck, FiArrowRight, FiArrowLeft } = FiIcons;

const DreamsSlide = ({ formData, updateFormData, onNext, onPrev, canProceed }) => {
  const [dreamText, setDreamText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingType, setRecordingType] = useState(null); // 'text', 'video', or 'audio'
  const [pulseCheckbox, setPulseCheckbox] = useState(false);

  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Start pulsing effect after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!formData.dreamShared) {
        setPulseCheckbox(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [formData.dreamShared]);

  const handleDreamTextChange = (e) => {
    setDreamText(e.target.value);
    if (e.target.value) {
      setRecordingType('text');
      updateFormData({
        dreamShared: true,
        dreamText: e.target.value
      });
      setPulseCheckbox(false);
    } else {
      updateFormData({
        dreamShared: false,
        dreamText: ''
      });
    }
  };

  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingType('video');
      startTimer();
      updateFormData({ dreamShared: true });
      setPulseCheckbox(false);
    } catch (err) {
      console.error("Error accessing media devices:", err);
      alert("Nie udało się uzyskać dostępu do kamery. Sprawdź uprawnienia przeglądarki.");
    }
  };

  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingType('audio');
      startTimer();
      updateFormData({ dreamShared: true });
      setPulseCheckbox(false);
    } catch (err) {
      console.error("Error accessing media devices:", err);
      alert("Nie udało się uzyskać dostępu do mikrofonu. Sprawdź uprawnienia przeglądarki.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();

      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }

      // Symulacja zapisania nagrania
      setTimeout(() => {
        alert("Nagranie zostało zapisane!");
      }, 500);
    }
  };

  const startTimer = () => {
    setRecordingTime(0);
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4"
        >
          <SafeIcon icon={FiStar} className="text-3xl text-[#002999]" />
        </motion.div>
        <h2 className="text-3xl font-bold text-[#002999] mb-2">
          Twoje marzenia biznesowe
        </h2>
        <p className="text-gray-600">
          Podziel się z nami swoimi marzeniami związanymi z firmą. Wrócimy do nich za rok!
        </p>
      </div>

      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#F2E4CD]/60 to-white p-6 rounded-xl border border-[#F2E4CD] mb-6">
          <h3 className="text-lg font-semibold text-[#002999] mb-4">
            Dlaczego warto dzielić się marzeniami?
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start space-x-2">
              <SafeIcon icon={FiCheck} className="text-[#002999] mt-1 flex-shrink-0" />
              <span className="text-gray-700">Określone cele zwiększają szansę na ich realizację</span>
            </div>
            <div className="flex items-start space-x-2">
              <SafeIcon icon={FiCheck} className="text-[#002999] mt-1 flex-shrink-0" />
              <span className="text-gray-700">Za rok przypomnimy Ci o Twoich celach</span>
            </div>
            <div className="flex items-start space-x-2">
              <SafeIcon icon={FiCheck} className="text-[#002999] mt-1 flex-shrink-0" />
              <span className="text-gray-700">Pomożemy Ci w realizacji Twoich planów</span>
            </div>
            <div className="flex items-start space-x-2">
              <SafeIcon icon={FiCheck} className="text-[#002999] mt-1 flex-shrink-0" />
              <span className="text-gray-700">Wspólnie będziemy świętować Twój sukces</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-lg text-[#002999] mb-4">
              Opisz swoje marzenia biznesowe
            </h3>
            <textarea
              value={dreamText}
              onChange={handleDreamTextChange}
              className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#002999] focus:border-transparent transition-all"
              placeholder="Opisz tutaj swoje cele i marzenia związane z firmą na najbliższy rok..."
              disabled={isRecording || (recordingType && recordingType !== 'text')}
            ></textarea>
          </div>

          <div>
            <h3 className="font-semibold text-lg text-[#002999] mb-4">
              Lub nagraj wideo/audio
            </h3>
            <div className="space-y-4">
              {recordingType === 'video' && (
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-100 aspect-video flex items-center justify-center">
                  {isRecording ? (
                    <video ref={videoRef} className="w-full h-full object-cover" muted />
                  ) : (
                    <div className="text-center p-4">
                      <p className="text-gray-500 mb-2">Nagranie wideo zostało zakończone</p>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Zapisano!
                      </span>
                    </div>
                  )}
                </div>
              )}

              {recordingType === 'audio' && (
                <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-100 p-6 flex items-center justify-center">
                  <div className="text-center">
                    {isRecording ? (
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
                          <div className="w-6 h-6 bg-red-500 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-red-600 font-medium">Nagrywanie...</span>
                      </div>
                    ) : (
                      <div className="text-center p-4">
                        <p className="text-gray-500 mb-2">Nagranie audio zostało zakończone</p>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Zapisano!
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {isRecording && (
                <div className="flex items-center justify-center space-x-4">
                  <div className="bg-red-100 text-red-600 px-3 py-1 rounded-full flex items-center space-x-1">
                    <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                    <span>{formatTime(recordingTime)}</span>
                  </div>
                  <button
                    onClick={stopRecording}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <SafeIcon icon={FiStopCircle} />
                    <span>Zatrzymaj nagrywanie</span>
                  </button>
                </div>
              )}

              {!isRecording && !recordingType && (
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={startVideoRecording}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    disabled={dreamText || isRecording}
                  >
                    <SafeIcon icon={FiVideo} />
                    <span>Nagraj wideo</span>
                  </button>
                  <button
                    onClick={startAudioRecording}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                    disabled={dreamText || isRecording}
                  >
                    <SafeIcon icon={FiMic} />
                    <span>Nagraj audio</span>
                  </button>
                </div>
              )}
            </div>
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
              checked={formData.dreamShared}
              onChange={(e) => {
                updateFormData({ dreamShared: e.target.checked });
                if (e.target.checked) {
                  setPulseCheckbox(false);
                }
              }}
              className="mt-1 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
            />
            <div>
              <span className="text-gray-800 font-medium">
                Podzieliłem/am się swoimi marzeniami i celami biznesowymi *
              </span>
              <p className="text-sm text-gray-600 mt-1">
                KPJ Biuro Rachunkowe pomoże mi w realizacji moich celów i przypomni mi o nich za rok
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

export default DreamsSlide;