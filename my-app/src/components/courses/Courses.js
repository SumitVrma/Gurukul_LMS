import React from 'react'
import { CourseCard } from './CourseCard'
import Slider from "react-slick";
import { courses } from '../../data/CoursesData';
import { useState, useEffect } from 'react';
import { useElementSize, useMouse } from "@mantine/hooks";
import { motion } from 'framer-motion';
import './Courses.css';
import CursorAnimation from '../cursor_animation/CursorAnimation';
import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';


const Courses = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1289,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 975,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 717,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };
  const [scaling, setscaling] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.3
  });
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        x: 0,
        transition: {
          type: 'spring', duration: 3, bounce: 0.3
        }
      });
    }
    if (!inView) {
      animation.start({ x: '-100vw' })
    }
    console.log(inView);
  }, [inView]);


  return (
    <div ref={ref} className='w-full bg-[#24153d] relative py-16'>


      {/* <motion.div
        className='cursor'
        variants={variants}
        animate={cursorVariant}
      /> */}

      <div className='md:max-w-[1350px] m-auto max-w-[600px]'


      >
        <div className='py-4'>
          <h1 className='py-3 text-3xl font-bold text-white'>Most Popular <span className='text-[#20B486]'>Courses</span></h1>
          <p className='text-[#6D737A]'>Various versions have evolved over the years, sometimes by accident.</p>
        </div>
        <motion.div animate={animation}>
          <Slider {...settings} >
            {courses.map(course =>
              <CourseCard course={course} />
            )}
          </Slider>
        </motion.div>


      </div>
    </div>
  )
}

export default Courses
