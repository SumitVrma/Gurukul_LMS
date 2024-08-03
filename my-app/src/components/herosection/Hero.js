import React from 'react'
import { heroImg } from '../../assets'
import { AiOutlineSearch } from 'react-icons/ai';
import './Hero.css';
import Brain from '../brain/Brain';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import _ from 'lodash';
import { NavBar } from '../NavBar';
import CursorAnimation from '../cursor_animation/CursorAnimation';
import ParticlesContainer from '../particle-effect/ParticlesContainer';

const Hero = () => {
    // const [mousePosition, setMousePosition] = useState({
    //     x: 0,
    //     y: 0
    // });
    // const [cursorVariant, setCursorVariant] = useState("default");


    // useEffect(() => {
    //     const mouseMove = e => {
    //         setMousePosition({
    //             x: e.clientX,
    //             y: e.clientY
    //         })
    //     }

    //     window.addEventListener("mousemove", mouseMove);

    //     return () => {
    //         window.removeEventListener("mousemove", mouseMove);
    //     }
    // }, []);

    // const variants = {
    //     default: {
    //         x: mousePosition.x - 16,
    //         y: mousePosition.y - 16,
    //     },
    //     text: {
    //         height: 150,
    //         width: 150,
    //         x: mousePosition.x - 75,
    //         y: mousePosition.y - 75,
    //         backgroundColor: "yellow",
    //         mixBlendMode: "difference"
    //     }
    // }
    // const textEnter = () => setCursorVariant("text");
    // const textLeave = () => setCursorVariant("default");

    const [scaling, setscaling] = useState(false);
    return (
        <div className='container-background'>
            {/* <CursorAnimation scaling={scaling} /> */}
            <section onMouseEnter={() => setscaling(true)}
                onMouseLeave={() => setscaling(false)}>
                <NavBar />
            </section>
            <ParticlesContainer/>
            <div className='w-full py-20  '>
                <div className='md:max-w-[1360px] m-auto grid md:grid-cols-2  max-w-[600px]  h-[64vh]'>

                    {/* <motion.div onMouseEnter={textEnter} onMouseLeave={textLeave} className='flex flex-col justify-start gap-4'> */}
                        <div className='flex flex-col justify-start gap-4 '>
                            <p className=' py-2 text-3xl text-[#7ECA9C] font-black z-50 '><span className='text-[#F7F7EE]'>START</span> TO SUCCESS</p>
                            <h1 className='font-design md:leading-[72px] py-2 md:text-6xl text-5xl font-medium text-white z-50'>Access To <span className='text-[#20B486] font-bold'>5000+</span> Courses from <span className='text-[#20B486] font-bold'>300</span> Instructors & Institutions</h1>
                            <p className='py-2 text-lg text-gray-200'>Various versions have evolved over the years, sometimes by accident.</p>
                            <form className='bg-white max-w-[700px] p-4 input-bx-shadow rounded-md flex justify-between'>
                                <input
                                    className='bg-white w-[600px]'
                                    type='text'
                                    placeholder='Search for courses, tutorials and more...'
                                />
                                <button>
                                    <AiOutlineSearch
                                        size={20}
                                        className='icon'
                                        style={{ color: '#000' }}
                                    />
                                </button>
                            </form>
                        </div>

                        {/* <motion.div
                            className='cursor'
                            variants={variants}
                            animate={cursorVariant}
                        /> */}

                        {/* <img className='md:order-last order-first' src={heroImg} /> */}

                        <Brain />
                        {/* </motion.div> */}
                        </div>
                </div>
            </div>
            )
}

            export default Hero
