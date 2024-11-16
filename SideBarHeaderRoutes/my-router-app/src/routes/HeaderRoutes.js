import React from 'react';
import { Route, Routes } from 'react-router-dom';
import View1 from '../views/View1';
import View2 from '../views/View2';

function HeaderRoutes() {
  return (
    <Routes>
      <Route path="view1" element={<View1 />} />
      <Route path="view2" element={<View2 />} />
    </Routes>
  );
}

export default HeaderRoutes;