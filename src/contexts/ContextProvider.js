import axios from "axios";
import React, { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userColor = user?.themeColor || "#1E4DB7";
  const userMode = user?.themeMode || "Light";

  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState(userColor);
  const [currentMode, setCurrentMode] = useState(userMode);
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/themeMode/${user._id}`,
        { themeMode: e.target.value }
      )
      .then((response) => {
        console.log("Theme mode updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating theme mode:", error);
      });
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
    axios
      .patch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/themeColor/${user._id}`,
        { themeColor: color }
      )
      .then((response) => {
        console.log("Theme color updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating theme color:", error);
      });
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
