import React from "react";

interface ProviderLoginButtonParam {
  icon: React.ReactNode
  onClick: () => void
  name: string
}

const ProviderLoginButton: React.FC<ProviderLoginButtonParam> = ({ icon, onClick, name }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 mt-4 border border-gray-300 bg-white rounded-md shadow-sm hover:bg-gray-50 transition text-sm font-medium text-gray-700"
      aria-label="Sign in with Google"
    >
      {icon}
    </button>
  );
};

export default ProviderLoginButton;
