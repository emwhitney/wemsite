import React from 'react'
import { Route, Routes } from "react-router-dom";
import About from './About';
import Projects from './Projects/Projects';
import Writing from './Writing';
import BrokenHeart from './BrokenHeart/BrokenHeart';
import Regulation from './Regulation';

function RoutesTree() {
  return (
    <div>
        <Routes>
            <Route path="/about" element={<About/>}/>
            <Route path="/projects" element={<Projects />}/>
            <Route path="/writing" element={<Writing />}/>
            <Route path="/projects/brokenheart" element={<BrokenHeart />}/>
            <Route path="/projects/regulate" element={<Regulation />}/>
        </Routes>
    </div>
  )
}

export default RoutesTree