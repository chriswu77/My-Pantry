import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LogOutButton from './LogOutButton';

const Home = (props) => {
  const userId = useSelector((state) => state.auth.userId);

  return (
    <>
      <h1>Hi from Home Page!! {userId}</h1>
      <LogOutButton />
    </>
  );
};

export default Home;
