"use client";
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Services = () => {
    const projects = [
        {
          title: "Care",
          description:
            "These include routine check-ups, vaccinations, preventive treatments, diagnostics, surgeries, and emergency care.",
          link: "https://business420.netlify.app/",
          image: "/images/illustration/soin1.jpg", // Replace with your project screenshot
        },
        {
          title: "Pharmacy",
          description:
            "Our pharmacy provides specialized medications and health products tailored to the needs of animals.",
          link: "https://nike-topaz-delta.vercel.app/",
          image: "/images/illustration/pharm.jpg", // Replace with your project screenshot
        },
        {
          title: "Traveling Clinic",
          description:
            "A mobile veterinary clinic brings professional animal care directly to your doorstep. This service is ideal for those with limited mobility.",
          link: "https://clothify-two.vercel.app/",
          image: "/images/illustration/amb.jpg", // Replace with your project screenshot
        },
        {
          title: "Power supply & Accessories",
          description:
            "We offer high-quality pet food and accessories with each product carefully selected to meet your pet’s needs.",
          link: "https://clothify-two.vercel.app/",
          image: "/images/illustration/collage.png", // Replace with your project screenshot
        },
        {
          title: "Accounting & Management",
          description:
            "It ensure smooth operations and financial stability for an efficient systems care while maintaining the clinic’s profitability and sustainability.",
          link: "https://clothify-two.vercel.app/",
          image: "/images/illustration/compta.jpg", // Replace with your project screenshot
        },
        {
          title: "Project Study",
          description:
            "Project studies focus on providing tailored solutions to help farmers optimize their operations while ensuring the well-being of their animals.",
          link: "https://clothify-two.vercel.app/",
          image: "/images/illustration/projet.jpg", // Replace with your project screenshot
        },
        {
          title: "Security",
          description:
            "An IT security system to protect sensitive data. This ensures compliance with privacy regulations and safeguards both client and clinic information.",
          link: "/admin/home/security",
          image: "/images/illustration/secure.jpg", // Replace with your project screenshot
        },
      ];
  return (
    <section id='about' style={{marginTop:'-200px'}} className='bg-gradient-to-r bg-white z-50 dark:bg-boxdark py-16 px-6 text-black dark:text-white '>
      <div className='max-w-7xl mx-auto'>
        <h2 className='text-5xl font-bold text-center text-black dark:text-white mb-12'>Services</h2>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-10'>
            {projects.map((project, index) => (
                <div key={index} className=' border border-gray-300 dark:border-gray-700 bg-white z-50 dark:bg-boxdark text-black dark:text-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105'>
                    <Image
                                      className="w-full h-75 object-cover  px-3 pt-3 rounded-2xl"
                                      src={project.image}
                                      alt={project.title}
                                      width={500}
                                      height={75}
                    />
                    <div className='p-6'>
                        <h3 className='text-2xl font-semibold text-black dark:text-white mb-2'>{project.title}</h3>
                        <p className='text-black dark:text-white mb-4'>{project.description}</p>
                        <div className='flex gap-3'>
                          <Link href={project.link} className='inline-block bg-meta-3 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors'>
                              View Panel
                          </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default Services
