import React from 'react';

// components
import { Header } from '../index';
import Route from './Route';
import { Alert } from '../Alert';

import './App.css';

export default function App() {
  return (
    <>
      <Alert />
      <Header />
      <Route />
    </>
  );
}
