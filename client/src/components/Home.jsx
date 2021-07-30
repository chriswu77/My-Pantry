import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Home = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  console.log('home page');

  // useEffect(() => {
  //   if (!userId) {
  //     <Redirect to="/login" />;
  //   }
  // }, [userId]);

  return (
    <>
      <h1>Hi from Home Page!! {userId}</h1>
    </>
  );
};

export default Home;
