import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiX, FiBookOpen, FiSmartphone, FiMail, FiGlobe, FiCheck, FiDownload } = FiIcons;

const ScanyeInstructionModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-[#002999] flex items-center space-x-2">
                <SafeIcon icon={FiBookOpen} className="text-[#002999]" />
                <span>Instrukcja korzystania z Scanye</span>
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <SafeIcon icon={FiX} className="text-xl text-gray-600" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
              {/* Krok 1 - Logowanie */}
              <section className="bg-[#F2E4CD]/20 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 text-[#002999] flex items-center space-x-2">
                  <span className="bg-[#002999] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
                  <span>Logowanie do systemu</span>
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p>• Wejdź na stronę: <strong>scanye.pl</strong></p>
                  <p>• Użyj swojego loginu: <strong>{localStorage.getItem('userEmail') || 'twój_login@firma.pl'}</strong></p>
                  <p>• Hasło otrzymasz w osobnym mailu od naszego zespołu</p>
                  <p>• Po pierwszym logowaniu system poprosi o zmianę hasła</p>
                </div>
              </section>

              {/* Krok 2 - Przesyłanie przez przeglądarkę */}
              <section className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 text-[#002999] flex items-center space-x-2">
                  <span className="bg-[#002999] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
                  <SafeIcon icon={FiGlobe} className="text-[#002999]" />
                  <span>Przesyłanie przez przeglądarkę</span>
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p>• Kliknij przycisk <strong>"Dodaj dokument"</strong></p>
                  <p>• Przeciągnij pliki lub kliknij <strong>"Wybierz pliki"</strong></p>
                  <p>• Możesz przesłać wiele plików jednocześnie</p>
                  <p>• System automatycznie rozpozna typ dokumentu</p>
                  <p>• Dodaj opcjonalny opis do dokumentu</p>
                  <p>• Kliknij <strong>"Wyślij"</strong></p>
                </div>
              </section>

              {/* Krok 3 - Przesyłanie przez email */}
              <section className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 text-[#002999] flex items-center space-x-2">
                  <span className="bg-[#002999] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
                  <SafeIcon icon={FiMail} className="text-[#002999]" />
                  <span>Przesyłanie przez email</span>
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p>• Adres email: <strong>dokumenty@kpj.scanye.pl</strong></p>
                  <p>• W temacie wpisz nazwę swojej firmy</p>
                  <p>• Załącz dokumenty jako załączniki</p>
                  <p>• Możesz dodać krótki opis w treści maila</p>
                  <p>• System automatycznie przetworzy dokumenty</p>
                </div>
              </section>

              {/* Krok 4 - Aplikacja mobilna */}
              <section className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 text-[#002999] flex items-center space-x-2">
                  <span className="bg-[#002999] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
                  <SafeIcon icon={FiSmartphone} className="text-[#002999]" />
                  <span>Aplikacja mobilna</span>
                </h4>
                <div className="space-y-2 text-gray-700">
                  <p>• Pobierz aplikację "Scanye" z App Store lub Google Play</p>
                  <p>• Zaloguj się używając tych samych danych</p>
                  <p>• Zrób zdjęcie dokumentu lub wybierz z galerii</p>
                  <p>• Aplikacja automatycznie poprawi jakość zdjęcia</p>
                  <p>• Dodaj opis i wyślij</p>
                </div>
              </section>

              {/* Wskazówki */}
              <section className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-lg mb-3 text-[#002999]">💡 Przydatne wskazówki</h4>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                  <div className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheck} className="text-[#002999] mt-0.5 flex-shrink-0" />
                    <span>Rób zdjęcia w dobrej jakości i oświetleniu</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheck} className="text-[#002999] mt-0.5 flex-shrink-0" />
                    <span>Wszystkie dokumenty są automatycznie archiwizowane</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheck} className="text-[#002999] mt-0.5 flex-shrink-0" />
                    <span>Możesz sprawdzić status przetwarzania online</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheck} className="text-[#002999] mt-0.5 flex-shrink-0" />
                    <span>System wysyła powiadomienia o nowych dokumentach</span>
                  </div>
                </div>
              </section>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={onClose}
                className="w-full bg-[#002999] hover:bg-[#001E66] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Rozumiem - zamknij instrukcję
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScanyeInstructionModal;