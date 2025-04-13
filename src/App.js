import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages';
import './App.css';
import Login from './components/Auth/Auth';
import LandingPage from './pages/LandingPage';

import { useStateContext } from './contexts/ContextProvider';
import axios from 'axios';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  const user = JSON.parse(localStorage.getItem('user'));
  
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
    if(!user){
      if(window.location.pathname !== '/' && window.location.pathname !== '/auth'){
        window.location.href = '/';
        alert('Please login to access this page!');
      }
    }
    if(user?.role=='admin'){
      axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/website`)
      .then((response) => {
        //console.log(response.data);
        localStorage.setItem('websiteData', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
      axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api`)
      .then((response) => {
        //console.log(response.data);
        localStorage.setItem('apiData', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
      axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/database`)
      .then((response) => {
        //console.log(response.data);
        localStorage.setItem('databaseData', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });

      axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/calendar`)
      .then((response) => {
        //console.log(response.data);
        localStorage.setItem('calendarData', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
    }
    else{
      axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/website/${user?._id}`)
      .then((response) => {
        //console.log(response.data);
        localStorage.setItem('websiteData', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
      axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/${user?._id}`)
      .then((response) => {
        //console.log(response.data);
        localStorage.setItem('apiData', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
      axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/database/${user?._id}`)
      .then((response) => {
        //console.log(response.data);
        localStorage.setItem('databaseData', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
    }
  }, []);
  

  return (
    <>
    {user ?
      (<div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Ecommerce />)} />
                <Route path="/dashboard" element={(<Ecommerce />)} />

                {/* pages  */}
                <Route path="/Websites" element={<Orders />} />
                <Route path="/APIs" element={<Employees />} />
                <Route path="/Databases" element={<Customers />} />

                {/* apps  */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* charts  */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />

              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
          ): (window.location.pathname === '/'?<LandingPage/>:<></>)}

    {!user ? <>
      <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Login />} />
      </Routes>
    </BrowserRouter></> : <></>}

    
    </>
  );
};

export default App;
