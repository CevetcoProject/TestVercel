"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Functions from "@/components/Functions/Functions";
import ServiceSelect from "@/components/FormElements/ServiceSelect";
import { useRouter } from "next/navigation";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

interface UserState {
  name: string;
  description: string;
  services: string[];
  functionalities: string[];
}

export default function ProfileAccess() {
  const [disable, setDisable] = useState<boolean>(false); 
  const [disablecheck, setDisableCheck] = useState<boolean>(false); 
  const [newFeatureName, setNewFeatureName] = useState("");
  const [checkboxes, setCheckboxes] = useState([
    { id: "1", label: "Appointment management" },
    { id: "2", label: "Order foods" },
    { id: "3", label: "Examination" },
    { id: "4", label: "Prescribe" },
    { id: "5", label: "Medical Files" },
    { id: "6", label: "Test" },
  ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [userState, setUserState] = useState<UserState>({
    name: "",
    description: "",
    services: [],
    functionalities: [],
  });
  const [errors, setError] = useState<any>({});
  const [profiles, setProfiles] = useState<UserState[]>([]); // Etat pour les profils
  const router = useRouter();

  // Fonction pour récupérer les profils après soumission
   // Fonction pour récupérer les profils
   const fetchProfiles = async () => {
    try {
      const response = await axios.get("/api/auth/access");
      console.log("Profiles fetched:", response.data);
      setProfiles(response.data.data);  // Mettre à jour l'état avec les profils
    } catch (error) {
      console.error("Error fetching profiles", error);
    } finally {
    }
  };

  const submitForm = async () => {
    setLoading(true);
    setDisable(true);
    setDisableCheck(true);
    try {
      const response = await axios.post("/api/auth/access", userState);
      if (response.status === 200) {
        setUserState({ name: "", description: "", services: [], functionalities: [] });
        setError({});
        setProfiles((prevProfiles) => [
          ...prevProfiles,
          response.data.data,
        ]);
      } else {
        console.error("Unexpected response", response);
        setError({ message: "An unexpected error occurred." });
      }
    } catch (err) {
      console.error("Error during submission", err);
      setError({});
    } finally {
      setLoading(false);
      setDisable(false);
      setDisableCheck(false);
    }
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleAddCheckbox = () => {
    if (!newFeatureName.trim()) {
      alert("Please enter a name for the new functionality.");
      return;
    }
    const newId = (checkboxes.length + 1).toString(); // Génère un nouvel ID unique
    const newCheckbox = { id: newId, label: newFeatureName }; // Crée une nouvelle checkbox
    setCheckboxes([...checkboxes, newCheckbox]); // Met à jour la liste
    setNewFeatureName(""); // Réinitialise l'input
  };

  useEffect(() => {
    fetchProfiles(); // Charger les profils au montage du composant
  }, []);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Profile Access" />
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 h-screen">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Create a New Profile
                </h3>
              </div>
              <form action="#" className="flex flex-col gap-5.5 p-6.5" method="POST">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a name for the profile"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-meta-3"
                    id="name"
                    value={userState.name}
                    required
                    onChange={(e) =>
                      setUserState({ ...userState, name: capitalizeFirstLetter(e.target.value) })
                    }
                  />
                  <span className="text-red-500">{errors?.name}</span>
                </div>
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Give a description"
                    id="description"
                    value={userState.description}
                    required
                    onChange={(e) =>
                      setUserState({ ...userState, description: capitalizeFirstLetter(e.target.value) })
                    }
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-meta-3"
                  ></textarea>
                  <span className="text-red-500">{errors?.description}</span>
                </div>

                <ServiceSelect
                  id="services"
                  disable={disable}
                  onChange={(selectedServices) =>
                    setUserState({ ...userState, services: selectedServices })
                  }
                />

                <div>
                  <label className="mb-4 block text-sm font-medium text-black dark:text-white">
                    Functionalities
                  </label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-7">
                    {checkboxes.map((checkbox) => (
                      <Functions
                        key={checkbox.label}
                        id={checkbox.label}
                        label={checkbox.label}
                        disable={disablecheck}
                        onChange={(e) => {
                          setUserState({
                            ...userState,
                            functionalities: e.target.checked
                              ? [...userState.functionalities, e.target.value] // Add value if checked
                              : userState.functionalities.filter(
                                  (value) => value !== e.target.value
                                ), // Remove value if unchecked
                          });
                        }}
                      />
                    ))}
                  </div>

                  <div className="w-full mt-4 flex items-center gap-4">
                    <input
                      type="text"
                      value={newFeatureName}
                      onChange={(e) => setNewFeatureName(e.target.value)}
                      placeholder="Enter new functionality name"
                      className="w-10/12 rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition text-black dark:bg-gray-800 dark:text-white focus:border-meta-3 active:border-meta-3 "
                    />
                    <button
                      onClick={handleAddCheckbox}
                      className="rounded bg-meta-5 px-5 py-3  text-white hover:bg-meta-5"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className={`w-full cursor-pointer rounded-lg border border-meta-3 p-4 text-white transition hover:bg-opacity-90  ${
                    loading ? "bg-green-600 " : "bg-meta-3"
                  }`}
                  onClick={submitForm}
                  disabled={loading }
                >
                  {loading ? "Processing.." : "Create Profile"}
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Your Profile</h3>
              </div>
              
                {loading ? (
                  <p className="p-5 text-black dark:text-white">Loading...</p>  // Afficher un message de chargement pendant la récupération des données
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5.5 p-5">
                    {profiles.length > 0 ? (
                      profiles.map((profile, index) => (
                        <div key={index} className="flex flex-col border border-stroke p-2 dark:border-strokedark">
                          <h2 className="text-meta-3 font-medium uppercase p-1">{profile.name}</h2>
                          <p className="pl-2 pb-2 text-black dark:text-white">{profile.description}</p>
                          <ul className="list-disc pl-7 pb-4">
                            {profile.services.map((service, serviceIndex) => (
                              <li key={serviceIndex} className="text-sm">{service}</li>
                            ))}
                          </ul>
                          <div className="mt-auto flex justify-center items-center space-x-3 pb-2">
                              {/* Bouton View */}
                              <button
                                className=" pl-2 py-2 text-white bg-meta-5 rounded"
                              >
                                <FaEye className="mr-2" />
                              </button>

                              {/* Bouton Edit */}
                              <button
                                className="pl-2 py-2 text-white bg-meta-3 rounded"
                              >
                                <FaEdit className="mr-2" />
                              </button>

                              {/* Bouton Delete */}
                              <button
                                className="pl-2 py-2 text-white bg-meta-1 rounded"
                              >
                                <FaTrash className="mr-2" />
                              </button>
                            </div>
                        </div>
                      ))
                    ) : (
                      <p>No profiles found.</p>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
}
