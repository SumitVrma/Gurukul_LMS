/** @format */

import { useEffect, useState } from "react";
import "./CursorAnimation.css";
import { motion } from "framer-motion";

// const CursorAnimation = ({ scaling }) => {
const CursorAnimation = ({ scaling, color }) => {
  const [largecircle, setlargecircle] = useState({ x: 0, y: 0 });
  const [smallcircle, setsmallcircle] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mousemove = (e) => {
      setlargecircle({ x: e.clientX, y: e.clientY });
      setsmallcircle({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mousemove);

    return () => {
      window.removeEventListener("mousemove", mousemove);
    };
  }, []);

  return (
    <div>
      {/* <motion.div
        animate={{
          x: largecircle.x - 32,
          y: largecircle.y - 32,
          transition: { type: "spring", mass: 1 },
        }}
        className="large_circle"
        style={{ scale: scaling ? 0 : 1 }}></motion.div> */}
      <motion.div
        animate={{
          x: smallcircle.x-70,
          y: smallcircle.y-70,
          transition: { type:"just" , mass: 0.1 },
        }}
        className="small_circle"
        // style={{ scale: scaling ? 0.5 : 1 }}
        // style={{ scale: scaling ? 0.3 : 0.5 }}
        style={{ scale: scaling ? 0.3 : 0.5, borderColor: color}}
        ></motion.div>
        {/* className="bg-purple-700 absolute scale-[1.5] blur-3xl w-40 h-40 rounded-full z-999 transition-opacity duration-300 hidden md:block"></motion.div>  */}
    </div>
  );
};

export default CursorAnimation;