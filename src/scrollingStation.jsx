// @ts-nocheck
import "./App.css"

import { useInView } from "react-intersection-observer"
import React, { useEffect, useRef, useState } from "react"
import { colors } from "./json"

const useGetRef = () => {
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

function ScrollingStation() {
  
  const [arrValues, setArrValues] = useState()
  const isEven = (num) => num % 2 == 0
  const catRef = UseGetCatRef()
  const ref = React.useRef({})

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
  function getPerc(num, percent) {
    return Number(num) - (Number(percent) / 100) * Number(num)
  }

  useEffect(() => {
    if (arrValues) {

      let per = getPerc(getRef(arrValues).current.offsetTop, 98)
      if (catRef(arrValues).current.getBoundingClientRect().top > 200) {
        ref.current.scrollTop +=
          catRef(arrValues).current.getBoundingClientRect().top - 250
      }
      
      if (catRef(arrValues).current.getBoundingClientRect().top < 200) {
        ref.current.scrollTop +=
          catRef(arrValues).current.getBoundingClientRect().top + -250
      }
      console.log(arrValues,'arrValues');   
    }
  }, [arrValues])

  const handleClick = (key) => {
    const val = getRef(key).current.offsetTop + 25

    // getRef(key).current?.scrollIntoView({ behavior: "smooth" })
    window.scroll({top:val,behavior:'smooth'})

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
          <div ref={ref} className="leftitemscontainer">
            {colors.map((res, index) => {
              //{}
              if (index == parseInt(arrValues)) {
                // console.log(parseInt(arrValues), "arrValues---", index, "index")
              }
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
                  {res.color} == {index}
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

export default ScrollingStation

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
