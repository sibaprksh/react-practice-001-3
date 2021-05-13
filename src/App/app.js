import React from 'react';

// components
import { Header } from '../Header';
import Route from './route';
import { Alert } from '../Alert';

import './app.css';

export default function App() {
  return (
    <>
      <Alert />
      <Header />
      <Route />
    </>
  );
}
