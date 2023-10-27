"use client"

import React, { useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import Button from "@atom/button/index"

import { Link } from "gatsby"

import { Check } from "lucide-react"
import confetti from "canvas-confetti"

const Success = ({ happyURL }: any) => {
  useEffect(() => {
    toast("Great! You are subscribe to the course", {
      icon: "👏",
    })
    celebration()
  }, [])

  function celebration() {
    var duration = 15 * 1000
    var animationEnd = Date.now() + duration
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    var interval: any = setInterval(function () {
      var timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      var particleCount = 50 * (timeLeft / duration)
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      )
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      )
    }, 250)
  }

  return (
    <>
      <Toaster position="top-center" />

      <div className="m-auto flex flex--items-center flex--justify-center h40 w40 circle bg-green">
        <Check className="mx-auto" color="green" size={48} />
      </div>
      <div>
        <p className="headline headline__text text-center m-b-15">
          Thanks for subscribing to the course. Click the below link to go to
          the course.
        </p>
      </div>
      <Link to={happyURL}>
        <Button
          className="mx-auto"
          textValue="Go to the couse →"
          btnSize="large"
          btnTheme="outline"
        />
      </Link>
    </>
  )
}

export default Success
