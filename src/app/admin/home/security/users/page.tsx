 "use client";
import React,  { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import type { ChangeEvent } from 'react'
import axios from "axios";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DatePicker from "@/components/FormElements/DatePicker/DatePicker";
import SelectLanguage from "@/components/SelectGroup/SelectLanguage";
import SelectGender from "@/components/SelectGroup/SelectGender";
import SelectProfile from "@/components/SelectGroup/SelectProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Success } from "@/components/Success";
import Image from "next/image";

interface UserState {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  birthday: string;
  address: string;
  phone: string;
  gender: string;
  language: string;
  username: string;
}

export default function Users() {
  const [fileInput, setFileInput] = useState<string>('');
  const [imgSrc, setImgSrc] = useState<string>('/images/user/user-circle.svg');

  const [errors, setError] = useState<registerErrorType>({});

  const [loading, setLoading] = useState<boolean>(false);
  const [userState, setUserState] = useState<UserState>({
      name: "",
      email: "",
      password: "",
      avatar: "",
      role: "",
      birthday: "",
      address: "",
      phone: "",
      gender: "",
      language: "",
      username: "",
    });

    const handleFileInputChange = (file: ChangeEvent<HTMLInputElement>) => {
      const { files } = file.target;
    
      if (files && files.length !== 0) {
        const selectedFile = files[0]; // Le fichier sélectionné
    
        // Utiliser URL.createObjectURL pour obtenir une URL temporaire
        const fileURL = URL.createObjectURL(selectedFile);
    
        // Lire le contenu du fichier si nécessaire (par exemple, pour une prévisualisation)
        const reader = new FileReader();
        reader.onload = () => setImgSrc(reader.result as string);
        reader.readAsDataURL(selectedFile);
    
        // Mettre à jour l'état avec l'URL du fichier et d'autres informations
        setUserState({
          ...userState,
          avatar: fileURL
        });
      }
    };
    
  
    const handleFileInputReset = () => {
      setFileInput('')
      setImgSrc('/images/user/user-circle.svg')
    };

    const submitForm = async () => {
      setLoading(true);
      console.log("The payload is", userState);
      axios
        .post("/api/auth/user", userState)
        .then((res) => {
          setLoading(false);
          console.log("The response is", res.data);
          const response = res.data;
          if (response.status == 200) {
            setUserState({ name: "", email: "", password: "", avatar: "" , role: "",
              birthday: "",
              address: "",
              phone: "",
              gender: "",
              language: "",
              username: "" });
            Success("User created successfully!");
          } else if (response?.status == 400) {
            setError(response?.errors);
          } else {
            setError({});
          }
        })
        .catch((err) => console.log("The error is", err));
    };
  return (
    <DefaultLayout>
      <ToastContainer />
      <Breadcrumb pageName="Users" />

      <div className="h-screen">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create New User
              </h3>
            </div>
            <form action="#" method="POST">
             <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
              <div className="p-6.5 border-r border-stroke dark:border-strokedark">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 items-center mb-7">
                        <div className="">
                        <Image height={150} width={175} className='rounded' src={imgSrc} alt='Profile' />
                        </div>
                        <div>
                          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Attach file
                          </label>
                          <input
                            type="file"
                            id='avatar'
                            accept='image/png, image/jpeg'
                            onChange={handleFileInputChange} 
                            className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:px-2.5 file:py-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                          />
                          <div className="w-20 ">
                          <button className="mt-5 inline-flex items-center justify-center rounded-md border border-meta-1 px-10 py-4 text-center font-medium text-meta-1 hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={handleFileInputReset}>
                            Reset
                          </button>
                        </div>
                        </div>    
                   </div>
                   <div className="mb-4.5">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={userState.address}
                        placeholder="Enter the address"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-meta-3"
                        onChange={(e) =>
                          setUserState({ ...userState, address: e.target.value })
                        }
                      />
                    </div>
                    <div className="mb-4.5">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={userState.phone}
                        placeholder="Enter the phone number"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-meta-3"
                        onChange={(e) =>
                          setUserState({ ...userState, phone: e.target.value.toString() })
                        }
                      />
                    </div>
                    <SelectGender 
                      id="gender"
                      onChange={(value) =>
                        setUserState({ ...userState, gender: value })
                      }
                    />
                    <SelectLanguage
                      id="language"
                      onChange={(value) =>
                        setUserState({ ...userState, language: value })
                      }
                    />
               </div>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      First name<span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={userState.name}
                      placeholder="Enter the first name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-meta-3"
                      onChange={(e) =>
                        setUserState({ ...userState, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      value={userState.username}
                      placeholder="Enter the last name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-meta-3"
                      onChange={(e) =>
                        setUserState({ ...userState, username: e.target.value })
                      }
                    />
                  </div>
                </div>

                <DatePicker
                    id="language"
                    onChange={(date) =>
                      setUserState({ ...userState, birthday: date.toString() })
                    }
                  />

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input 
                    type="email"
                    id="email"
                    value={userState.email}
                    placeholder="Enter your email address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-meta-3"
                    onChange={(e) =>
                      setUserState({ ...userState, email: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Password<span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={userState.password}
                    placeholder="Enter a password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-meta-3 active:border-meta-3 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-meta-3"
                    onChange={(e) =>
                      setUserState({ ...userState, password: e.target.value })
                    }
                  />
                </div>

                <SelectProfile
                  id="profile"
                  onChange={(value) =>
                    setUserState({ ...userState, role: value })
                  }
                />

                <button 
                  onClick={submitForm}
                  disabled={loading }
                  style={{marginTop: '5vh'}} 
                  className={`flex w-full justify-center rounded p-3 font-medium text-gray hover:bg-opacity-90 ${
                    loading ? "bg-green-600 " : "bg-meta-3"
                  }`}
                >
                  {loading ? "Processing.." : "Create User"}
                </button>
              </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </DefaultLayout>
  );
};

