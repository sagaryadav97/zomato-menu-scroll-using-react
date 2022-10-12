import React from "react"
import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import MenuScroll from "./MenuScroll"
import ScrollingStation from "./scrollingStation"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="MenuScroll"
            element={<MenuScroll />}
            // <></>
          />
          <Route
            path="ScrollingStation"
            element={<ScrollingStation />}
            // <></>
          />
          <Route
            path="/"
            element={<ScrollingStation />}
            // <></>
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
