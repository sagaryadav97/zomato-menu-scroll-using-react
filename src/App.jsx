// @ts-nocheck
import "./App.css"

import { useInView } from "react-intersection-observer"
import React, { useEffect, useRef, useState } from "react"

const useGetRef = () => {
  const refs = React.useRef({})
  return React.useCallback(
    (idx) => (refs.current[idx] ??= React.createRef()),
    [refs]
  )
}

function App() {
  const colors = [
    {
      color: "red",
      value: "#f00",
    },
    {
      color: "green",
      value: "#0f0",
    },
    {
      color: "blue",
      value: "#00f",
    },
    {
      color: "cyan",
      value: "#0ff",
    },
    {
      color: "magenta",
      value: "#f0f",
    },
    {
      color: "yellow",
      value: "#ff0",
    },
    {
      color: "black",
      value: "#000",
    },
  ]
  const [arrValues, setArrValues] = useState()
  const isEven = (num) => num % 2 == 0

  const handleScroll = () => {
    const position = window.pageYOffset
    // setScrollPosition(position);

    for (var key in colors) {
      const val = getRef(key).current.offsetTop
      if (val < position) {
        // console.log(val, position, "position")
        setArrValues(key)
      }
      // else setArrValues(null)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const myRef = useRef()
  const getRef = useGetRef()

  return (
    <>
      <div className="container">
        <div className="header">header</div>
        {/* <div className="itemscontainerline"></div> */}

        <div className="itemscontainer">
          <div className="leftitemscontainer">
            {colors.map((res, index) => {
              //{}
              if (index == parseInt(arrValues)) {
                console.log(parseInt(arrValues), "arrValues---", index, "index")
              }
              return (
                <div
                  style={{
                    backgroundColor:
                      parseInt(index) == parseInt(arrValues)
                        ? "rebeccapurple"
                        : "red",
                  }}
                  key={index}
                  className="card"
                >
                  {res.color}
                </div>
              )
            })}
          </div>
          <div className="rightitemscontainer">
            {colors.map((res, index) => {
              //{}

              if (isEven(index)) {
                return (
                  <div
                    ref={getRef(index)}
                    onClick={() => {
                      console.log(getRef(index).current.offsetTop, "+", index)
                    }}
                    className=""
                  >
                    <ScrollTest h={"200px"} res={res} key={index} i={index} />
                  </div>
                )
              } else
                return (
                  <div
                    ref={getRef(index)}
                    onClick={() => {
                      console.log(getRef(index).current.offsetTop, "+", index)
                    }}
                    className=""
                  >
                    <ScrollTest h={"500px"} res={res} key={index} i={index} />
                  </div>
                )
            })}
          </div>
        </div>
        <div className="footer">footer</div>
      </div>
    </>
  )
}

export default App

function ScrollTest({ res, i, h }) {
  const containerRef = useRef(null)

  return (
    <>
      <div className="">
        <div
          style={{
            height: h,
            // backgroundColor: isVisible && "red",
          }}
          ref={containerRef}
          className="leftcard"
        >
          {res.value} + {i}
        </div>
      </div>
    </>
  )
}
