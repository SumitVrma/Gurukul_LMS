import React, { useState } from 'react'
import Hero from './herosection/Hero';
import Companies from './companies/Companies';
import Courses from './courses/Courses';
import Achievement from './achievements/Achievement';
import Categories from './categories/Categories';
import Feedback from './feedback/Feedback';
import CTA from './CallToAction/CTA';
import Footer from './footer/Footer';
import CursorAnimation from './cursor_animation/CursorAnimation';

const Home = () => {
  const [scaling, setscaling] = useState(false);
  const [color, setColor] = useState('white');
  return (
    <div>
      <CursorAnimation scaling={scaling} color={color} />
      <Hero />
      <Companies />
      <section onMouseEnter={() => { setscaling(true); setColor('white') }}
        onMouseLeave={() => { setscaling(false); setColor('white') }}>
        <Courses />
      </section>
      <Achievement />
      <section onMouseEnter={() => { setscaling(true); setColor('white') }}
        onMouseLeave={() => { setscaling(false); setColor('white') }}>
        <Categories />
      </section>
      <Feedback />
      <CTA />
    </div>
  )
}

export default Home
