import React, { useState } from 'react';

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col mt-8 z-0">
         <div className="flex-grow container mx-auto py-12">
          <h1 className="text-4xl font-bold text-center mb-8">Welcome to MyApp!</h1>
          <p className="text-center text-gray-700">Explore our features and projects, and feel free to reach out to us anytime.</p>
      </div>
    </div>
  );
}


export default Home;
