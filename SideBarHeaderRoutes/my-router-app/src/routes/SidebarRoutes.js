import React from 'react';
import { Route, Routes } from 'react-router-dom';
import View3 from '../views/View3';
import View4 from '../views/View4';
import View5 from '../views/View5';

function SidebarRoutes() {
  return (
    <Routes>
      <Route path="view3" element={<View3 />} />
      <Route path="view4" element={<View4 />} />
      <Route path="view5" element={<View5 />} />
    </Routes>
  );
}

export default SidebarRoutes;