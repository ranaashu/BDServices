import React from 'react';
import Routes from './Routes'
import AuthProvider from './AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  )
}

export default App