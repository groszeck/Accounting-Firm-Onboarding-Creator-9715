import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiX, FiPlay, FiDownload, FiExternalLink } = FiIcons;

const ScanyeVideoModal = ({ isOpen, onClose }) => {
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
            className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-[#002999] flex items-center space-x-2">
                <SafeIcon icon={FiPlay} className="text-[#002999]" />
                <span>Tutorial wideo - Scanye</span>
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <SafeIcon icon={FiX} className="text-xl text-gray-600" />
              </button>
            </div>

            <div className="p-6">
              {/* Główne wideo */}
              <div className="bg-gray-900 rounded-lg overflow-hidden mb-6 aspect-video flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <SafeIcon icon={FiPlay} className="text-6xl mb-4 mx-auto" />
                  <h4 className="text-xl font-semibold mb-2">Tutorial Scanye - Jak przesyłać dokumenty</h4>
                  <p className="text-gray-300 mb-4">Obejrzyj 5-minutowy film instruktażowy</p>
                  <button className="bg-[#002999] hover:bg-[#001E66] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                    Odtwórz wideo (5:23)
                  </button>
                </div>
              </div>

              {/* Lista filmów */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-[#002999] mb-4">📱 Filmy instruktażowe</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="w-12 h-8 bg-gray-300 rounded flex items-center justify-center">
                        <SafeIcon icon={FiPlay} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">Logowanie do Scanye</p>
                        <p className="text-sm text-gray-500">1:30 min</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="w-12 h-8 bg-gray-300 rounded flex items-center justify-center">
                        <SafeIcon icon={FiPlay} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">Przesyłanie przez przeglądarkę</p>
                        <p className="text-sm text-gray-500">2:15 min</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="w-12 h-8 bg-gray-300 rounded flex items-center justify-center">
                        <SafeIcon icon={FiPlay} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">Aplikacja mobilna</p>
                        <p className="text-sm text-gray-500">1:45 min</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="w-12 h-8 bg-gray-300 rounded flex items-center justify-center">
                        <SafeIcon icon={FiPlay} className="text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">Przesyłanie przez email</p>
                        <p className="text-sm text-gray-500">1:20 min</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#002999] mb-4">📚 Dodatkowe materiały</h4>
                  <div className="space-y-3">
                    <div className="bg-[#F2E4CD]/20 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-800 mb-2">Przewodnik PDF</h5>
                      <p className="text-sm text-gray-600 mb-3">Szczegółowa instrukcja krok po kroku</p>
                      <button className="flex items-center space-x-2 text-[#002999] hover:text-[#001E66] font-medium text-sm">
                        <SafeIcon icon={FiDownload} />
                        <span>Pobierz PDF (2.1 MB)</span>
                      </button>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-800 mb-2">Aplikacja mobilna</h5>
                      <p className="text-sm text-gray-600 mb-3">Pobierz aplikację na swój telefon</p>
                      <div className="space-y-2">
                        <button className="flex items-center space-x-2 text-[#002999] hover:text-[#001E66] font-medium text-sm">
                          <SafeIcon icon={FiExternalLink} />
                          <span>App Store</span>
                        </button>
                        <button className="flex items-center space-x-2 text-[#002999] hover:text-[#001E66] font-medium text-sm">
                          <SafeIcon icon={FiExternalLink} />
                          <span>Google Play</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-gray-800 mb-2">Wsparcie techniczne</h5>
                      <p className="text-sm text-gray-600 mb-3">Potrzebujesz pomocy?</p>
                      <button className="flex items-center space-x-2 text-[#002999] hover:text-[#001E66] font-medium text-sm">
                        <SafeIcon icon={FiExternalLink} />
                        <span>Centrum pomocy</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={onClose}
                className="w-full bg-[#002999] hover:bg-[#001E66] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Obejrzałem materiały - zamknij
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScanyeVideoModal;