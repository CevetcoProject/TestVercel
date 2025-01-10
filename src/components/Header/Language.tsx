import { useState } from "react";
import Image from "next/image";

const Language = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en"); // Langue par défaut
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État du menu déroulant

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang); // Change la langue
    setIsMenuOpen(false); // Ferme le menu déroulant
    // Ajoutez ici la logique pour changer la langue (par ex. avec i18n ou cookies)
  };

  return (
    <div className="relative">
      {/* Bouton pour afficher ou masquer le menu */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle du menu
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 dark:bg-boxdark rounded-md hover:bg-gray-300"
      >
        {selectedLanguage === "fr" ? (
          <>
            <Image
              src="/images/flag/fr.png"
              alt="Français"
              width={20}
              height={15}
            />
            Français
          </>
        ) : (
          <>
            <Image
              src="/images/flag/en.png"
              alt="English"
              width={20}
              height={15}
            />
            English
          </>
        )}
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {/* Menu déroulant des langues */}
      {isMenuOpen && (
        <ul className="absolute right-0 mt-2 w-36 bg-white dark:bg-boxdark rounded-md shadow-lg">
          <li
            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => handleLanguageChange("fr")}
          >
            <Image
              src="/images/flag/fr.png"
              alt="Français"
              width={20}
              height={15}
            />
            Français
          </li>
          <li
            className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => handleLanguageChange("en")}
          >
            <Image
              src="/images/flag/en.png"
              alt="English"
              width={20}
              height={15}
            />
            English
          </li>
        </ul>
      )}
    </div>
  );
};

export default Language;
