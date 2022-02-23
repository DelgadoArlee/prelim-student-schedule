import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import StudentSchedule from './components/StudentSchedule/StudentSchedule';
import { Student, students } from './fakedata/students';



const getStudentsFromLS = () => {
  const data = localStorage.getItem('students');
  if (data) {
    return JSON.parse(data);
  }
  else {
    return []
  }
}


var localStorageHasBeenRun = false;

function App() {
  if (!localStorageHasBeenRun) {
    localStorage.setItem('students', JSON.stringify(students))
    localStorageHasBeenRun = true;
  }

  return (
    <>
      <StudentSchedule />
    </>

  );
}

export default App;
