'use client'

// React Imports
import { useState } from 'react'
import type { ChangeEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import type { SelectChangeEvent } from '@mui/material/Select'
import Image from 'next/image'

import { useSession } from "next-auth/react";

type Data = {
  firstName: string
  lastName: string
  email: string
  birthday: string // String pour simplifier, ou Date si vous préférez
  gender: string // 'male' | 'female' | 'other' (ou autre type énuméré)
  phoneNumber: number | string
  address: string
  language: string
}



// Vars


const AccountDetails = () => {
  
  const { data: session} = useSession();

  const initialData: Data = {
    firstName: session.user?.name || '',
    lastName: '',
    email: session.user?.email || '',
    birthday: '', // Date vide par défaut
    gender: '', // Genre vide par défaut
    phoneNumber: '+237',
    address: '',
    language: ''
  }
  

  // States
  const [formData, setFormData] = useState<Data>(initialData)
  const [fileInput, setFileInput] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>(session.user?.avatar)
  const [language, setLanguage] = useState<string[]>(['French'])

  const handleDelete = (value: string) => {
    setLanguage(current => current.filter(item => item !== value))
  }

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setLanguage(event.target.value as string[])
  }

  const handleFormChange = (field: keyof Data, value: Data[keyof Data]) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleFileInputChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement

    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setFileInput(reader.result as string)
      }
    }
  }

  const handleFileInputReset = () => {
    setFileInput('')
    setImgSrc(session.user?.avatar)
  }

  return (
    <div className='border border-gray-300 dark:border-gray-500 p-10 bg-white dark:bg-boxdark text-black dark:text-white '>
      <CardContent className='mbe-5 p-15'>
        <div className='flex max-sm:flex-col items-center gap-6'>
          <Image height={100} width={100} className='rounded' src={imgSrc} alt='Profile' />
          <div className='flex flex-grow flex-col gap-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
                <label
                  htmlFor='upload-photo'
                  className='ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-meta-5 px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9 cursor-pointer'
                >
                  Upload New Photo
                </label>
                <input
                  id='upload-photo'
                  type='file'
                  className='hidden w-100 h-100'
                  accept='image/png, image/jpeg'
                  onChange={handleFileInputChange} // Correctement lié au changement de fichier
                />
              <button className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-meta-1 px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9" onClick={handleFileInputReset}>
                Reset
              </button>
            </div>
            <span className="mb-1.5 block font-medium text-gray-600 dark:text-gray-300">Allowed JPG, GIF or PNG</span>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                    First Name
              </label>
              <input
                value={formData.firstName}
                placeholder='John'
                type="text"
                className="w-full rounded-lg border dark:text-white border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-meta-3 focus-visible:shadow-none "
                onChange={e => handleFormChange('firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Last Name
              </label>
              <input
                value={formData.lastName}
                placeholder='...'
                type="text"
                className="w-full dark:text-white rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-meta-3 focus-visible:shadow-none "
                onChange={e => handleFormChange('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="mb-2.5 dark:text-white block font-medium text-black">
                    Email
              </label>
              <input
                value={formData.email}
                placeholder='john.doe@gmail.com'
                type="email"
                className="dark:text-white w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-meta-3 focus-visible:shadow-none "
                onChange={e => handleFormChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="dark:text-white mb-2.5 block font-medium text-black">
                    Birthday
              </label>
              <input
                className="dark:text-white w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-meta-3 focus-visible:shadow-none "
                type="date" // Champ de type date
                placeholder='jj/mm/aaaa'
                value={formData.birthday}
                onChange={(e) => handleFormChange('birthday', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                  <label className="dark:text-white mb-2.5 block font-medium text-black">
                        Address
                  </label>
                  <input
                    className="dark:text-white w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-meta-3 focus-visible:shadow-none "
                    value={formData.address}
                    type='text'
                    placeholder='...'
                    onChange={e => handleFormChange('address', e.target.value)}
                  />
             </Grid>
            <Grid item xs={12} sm={6}>
               <label className="dark:text-white mb-2.5 block font-medium text-black">
                      Phone Number
                </label>
              <input
                className="dark:text-white w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-meta-3 focus-visible:shadow-none "
                value={formData.phoneNumber}
                type='text'
                placeholder='+237'
                onChange={e => handleFormChange('phoneNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <label className="dark:text-white mb-2.5 block font-medium text-black">
                      Gender
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  className="dark:text-white w-full rounded-lg border border-stroke bg-white dark:bg-transparent py-3 px-4 text-black outline-none focus:border-meta-3 focus-visible:shadow-none"
                  onChange={(e) => handleFormChange('gender', e.target.value)}
                >
                  <option value="" disabled>
                    Select your gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
            </Grid>
            <Grid item xs={12} sm={6}>
                <label className="dark:text-white mb-2.5 block font-medium text-black">
                      Language
                </label>
                <select
                  id="language"
                  value={formData.language}
                  className="dark:text-white w-full rounded-lg border border-stroke bg-white dark:bg-transparent py-3 px-4 text-black outline-none focus:border-meta-3 focus-visible:shadow-none"
                  onChange={(e) => handleFormChange('language', e.target.value)}
                >
                  <option value="" disabled>
                    Select your preference language
                  </option>
                  <option value="english">English</option>
                  <option value="french">French</option>
                </select>
            </Grid>
            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <button className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-meta-3 px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9" type='submit'>
                Save Changes
              </button>
              <button className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-meta-1 px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 md:block md:px-9 lg:px-6 xl:px-9" onClick={() => setFormData(initialData)}>
                Reset
              </button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </div>
  )
}

export default AccountDetails
