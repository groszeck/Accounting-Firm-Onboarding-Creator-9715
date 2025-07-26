import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiX } = FiIcons;

const ContractModal = ({ isOpen, onClose }) => {
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
              <h3 className="text-2xl font-bold text-[#002999]">
                Warunki umowy świadczenia usług księgowych
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <SafeIcon icon={FiX} className="text-xl text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4 text-gray-700">
              <section>
                <h4 className="font-semibold text-lg mb-2 text-[#002999]">§1 Przedmiot umowy</h4>
                <p>Biuro Rachunkowe KPJ zobowiązuje się do prowadzenia ksiąg rachunkowych Klienta zgodnie z obowiązującymi przepisami prawa, w szczególności ustawą o rachunkowości oraz przepisami podatkowymi.</p>
              </section>

              <section>
                <h4 className="font-semibold text-lg mb-2 text-[#002999]">§2 Obowiązki Klienta</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Dostarczanie dokumentów księgowych do 10 dnia następnego miesiąca</li>
                  <li>Przekazywanie kompletnych i rzetelnych informacji</li>
                  <li>Regulowanie należności w terminie 14 dni od daty wystawienia faktury</li>
                  <li>Informowanie o zmianach w działalności gospodarczej</li>
                </ul>
              </section>

              <section>
                <h4 className="font-semibold text-lg mb-2 text-[#002999]">§3 Obowiązki Biura</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Prowadzenie ksiąg rachunkowych zgodnie z przepisami</li>
                  <li>Sporządzanie deklaracji podatkowych w terminie</li>
                  <li>Doradztwo w zakresie optymalizacji podatkowej</li>
                  <li>Zapewnienie poufności danych Klienta</li>
                </ul>
              </section>

              <section>
                <h4 className="font-semibold text-lg mb-2 text-[#002999]">§4 Wynagrodzenie</h4>
                <p>Wynagrodzenie za świadczone usługi jest określone w cenniku i płatne miesięcznie z góry. Klient zobowiązuje się do regulowania należności w terminie 14 dni od daty wystawienia faktury.</p>
              </section>

              <section>
                <h4 className="font-semibold text-lg mb-2 text-[#002999]">§5 Ochrona danych</h4>
                <p>Biuro zobowiązuje się do zachowania poufności wszystkich danych otrzymanych od Klienta oraz przetwarzania danych osobowych zgodnie z RODO.</p>
              </section>

              <section>
                <h4 className="font-semibold text-lg mb-2 text-[#002999]">§6 Postanowienia końcowe</h4>
                <p>Umowa zostaje zawarta na czas nieokreślony. Każda ze stron może wypowiedzieć umowę z 30-dniowym okresem wypowiedzenia. W sprawach nieuregulowanych niniejszą umową mają zastosowanie przepisy Kodeksu cywilnego.</p>
              </section>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={onClose}
                className="w-full bg-[#002999] hover:bg-[#001E66] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Zamknij
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContractModal;