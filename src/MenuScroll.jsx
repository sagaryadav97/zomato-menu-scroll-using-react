// @ts-nocheck


import React, { useEffect, useState } from "react"
import { colors } from "./json"
import "./menu.css"

const UseGetRef = () => {
  const refs = React.useRef({})
  return React.useCallback(
    (idx) => (refs.current[idx] ??= React.createRef()),
    [refs]
  )
}
const UseGetCatRef = () => {
  const refs = React.useRef({})
  return React.useCallback(
    (idx) => (refs.current[idx] ??= React.createRef()),
    [refs]
  )
}

function MenuScroll() {
  // colors
  const getRef = UseGetRef()
  const catRef = UseGetCatRef()
  const ref = React.useRef({})
  const [arrValues, setArrValues] = useState()
  const [scrollDirection, setScrollDirection] = useState("")

  const handleScroll = () => {
    const position = window.pageYOffset
    // setScrollPosition(position);

    for (var key in colors) {
      const val = getRef(key).current.offsetTop - 270
      if (val < position) {
        // console.log(getRef(key).current.offsetTop, "position")
        setArrValues(key)
      }
    }
  }

  function getPerc(num, percent) {
    return Number(num) - (Number(percent) / 100) * Number(num)
  }

  useEffect(() => {
    if (arrValues) {
      // console.log(catRef.current.getBoundingClientRect(), "key")
      // console.log(, "arrValues")
      let per = getPerc(getRef(arrValues).current.offsetTop, 98)
      if (catRef(arrValues).current.getBoundingClientRect().left > 200) {
      console.log(catRef(arrValues).current.getBoundingClientRect(),'up',arrValues);
        
        ref.current.scrollLeft +=
          catRef(arrValues).current.getBoundingClientRect().left - 50
      }
      if (catRef(arrValues).current.getBoundingClientRect().left < 0) {
      console.log(catRef(arrValues).current.getBoundingClientRect(),'up',arrValues);
       
        ref.current.scrollLeft +=
          catRef(arrValues).current.getBoundingClientRect().left + -26
      }
      // console.log(catRef(arrValues).current.getBoundingClientRect(),'rect');
      // if (scrollDirection === "Down") {
      //   catRef.current.scrollLeft += per
      // } else catRef.current.scrollLeft -= per
    }
  }, [arrValues])


    const handleClick = (key) => {
    const val = getRef(key).current.offsetTop - 260

    // getRef(key).current?.scrollIntoView({ behavior: "smooth" })
    window.scroll({ top: val, behavior: "smooth" })
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  return (
    <>
      <div className="container">
        <div className="header">Header</div>
        <div className="menuContainer">
          <div className="menuContainerLeft">
            <div className="menuContainerSearch">Seach</div>
            <div ref={ref} className="menuContainerCategory">
              {colors.map((res, index) => {
                return (
                  <div
                    style={{
                      backgroundColor:
                        parseInt(index) == parseInt(arrValues)
                          ? "rebeccapurple"
                          : "red",
                    }}
                    onClick={() => {
                      handleClick(index)
                    }}
                    ref={catRef(index)}
                    key={index}
                    className="card"
                  >
                    {res.color}
                  </div>
                )
              })}
            </div>
            <div className="menuContainerMenu">
              {colors.map((res, index) => {
                return (
                  <div
                    // style={{
                    //   backgroundColor:
                    //     parseInt(index) == parseInt(arrValues)
                    //       ? "rebeccapurple"
                    //       : "red",
                    // }}
                    onClick={() => {
                      handleClick(index)
                    }}
                    ref={getRef(index)}
                    key={index}
                    className="menuCardBox"
                  >
                    <div className="menuTitle">{res.value} Catogery</div>
                    <div className="menuBox">{res.color} Menu</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="menuContainerRight"></div>
        </div>
        <div className="footer"></div>
      </div>
    </>
  )
}

export default MenuScroll
