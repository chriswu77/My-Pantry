import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavBar from './NavBar';

const Home = (props) => {
  const userId = useSelector((state) => state.auth.userId);

  return (
    <>
      <NavBar />
      <h1>Hi from Home Page!! {userId}</h1>
    </>
  );
};

export default Home;
