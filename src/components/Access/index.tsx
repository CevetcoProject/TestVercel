"use client";

import React, { useState } from "react";
import axios from "axios";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Functions from "@/components/Functions/Functions";
import ServiceSelect from "@/components/FormElements/ServiceSelect";
import { useRouter } from "next/navigation";

interface UserState {
    name: string;
    description: string;
    functionalities: string[];
    services: string[];

  }

  export default function Access() {
      const router = useRouter();
      const [newFeatureName, setNewFeatureName] = useState("");
      const [checkboxes, setCheckboxes] = useState([
        { id: "1", label: "Appointment management" },
        { id: "2", label: "Order foods" },
        { id: "3", label: "Examination" },
        { id: "4", label: "Prescribe" },
        { id: "5", label: "Medical Files" },
        { id: "6", label: "Test" },
      ]);

      const [profileState, setProfileState] = useState<UserState>({
        name: "",
        description: "",
        services: [],
        functionalities: [],
      });

      const [errors, setError] = useState<registerErrorType>({});

      const submitForm = async () => {
        console.log("The payload is", profileState);
        axios
          .post("/api/auth/access", profileState)
          .then((res) => {
            console.log("The response is", res.data);
            const response = res.data;
            if (response.status == 200) {
                router.push(`/login?message=${response.msg}`);
                console.log("Success");
            } else if (response?.status == 400) {
              setError(response?.errors);
            } else {
              setError({});
            }
          })
          .catch((err) => console.log("The error is", err));
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

      return (
        <>
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
                      onChange={(e) =>
                        setProfileState({ ...profileState, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Give a description"
                      id="description"
                      onChange={(e) =>
                        setProfileState({ ...profileState, description: e.target.value })
                      }
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-meta-3"
                    ></textarea>
                  </div>
                  <ServiceSelect 
                      id="services"
                      onChange={(value) =>
                                  setProfileState({ ...profileState, services: [...profileState.services, value] })
                                }
                 />
                  <div>
                    <label className="mb-4 block text-sm font-medium text-black dark:text-white">
                      Functionalities
                    </label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-7">
                    {checkboxes.map((checkbox) => (
                            <Functions
                            key={checkbox.id}
                            id={checkbox.id}
                            label={checkbox.label}
                            onChange={(e) => {
                                setProfileState({
                                ...profileState,
                                functionalities: e.target.checked
                                    ? [...profileState.functionalities, e.target.value] // Add value if checked
                                    : profileState.functionalities.filter((value) => value !== e.target.value), // Remove value if unchecked
                                });
                            }}
                            />
                        ))}
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <input
                        type="text"
                        value={newFeatureName}
                        onChange={(e) => setNewFeatureName(e.target.value)}
                        placeholder="Enter new functionality name"
                        className=" rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 outline-none transition text-black dark:bg-gray-800 dark:text-white focus:border-meta-3 active:border-meta-3 "
                      />
                      <button
                        onClick={handleAddCheckbox}
                        className="rounded bg-meta-3 px-4 py-2 text-white hover:bg-meta-5"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <button
                        onClick={submitForm}
                        className="rounded bg-meta-3 px-4 py-2 text-white hover:bg-meta-5"
                      >
                        Create Profile
                    </button>
                </form>
              </div>
            </div>
            <div className="flex flex-col gap-9">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Your Profile
                  </h3>
                </div>
                <div className="flex flex-col gap-5.5 p-6.5">
                  <div>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Default textarea
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Default textarea"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
  );
};
