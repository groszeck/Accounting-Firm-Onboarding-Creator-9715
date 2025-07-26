import React from 'react';

const KPJLogo = () => {
  return (
    <div className="flex items-center">
      <div className="bg-gradient-to-r from-[#002999] to-[#0041E8] text-white font-bold text-xl p-3 rounded-lg">
        KPJ
      </div>
      <div className="ml-2 hidden sm:block">
        <p className="text-[#002999] font-bold text-sm">Biuro Rachunkowe</p>
        <p className="text-xs text-gray-600">Profesjonalizm w każdej liczbie</p>
      </div>
    </div>
  );
};

export default KPJLogo;