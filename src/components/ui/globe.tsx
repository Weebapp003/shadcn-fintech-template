"use client"

import { useEffect, useRef, useCallback } from "react"
import createGlobe from "cobe"
import { cn } from "@/lib/utils"

interface GlobeProps {
  className?: string
}

export function Globe({ className }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const phiRef = useRef(0)
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null)

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      pointerInteracting.current =
        e.clientX - pointerInteractionMovement.current
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grabbing"
      }
    },
    []
  )

  const onPointerUp = useCallback(() => {
    pointerInteracting.current = null
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab"
    }
  }, [])

  const onPointerOut = useCallback(() => {
    pointerInteracting.current = null
    if (canvasRef.current) {
      canvasRef.current.style.cursor = "grab"
    }
  }, [])

  const onMouseMove = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (pointerInteracting.current !== null) {
        const delta = e.clientX - pointerInteracting.current
        pointerInteractionMovement.current = delta
        phiRef.current += delta / 200
        pointerInteracting.current = e.clientX
      }
    },
    []
  )

  useEffect(() => {
    let width = 0
    let animationId: number

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }
    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [251 / 255, 100 / 255, 21 / 255],
      glowColor: [0.15, 0.15, 0.15],
      markers: [
        { location: [37.7749, -122.4194], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.05 },
        { location: [51.5072, -0.1276], size: 0.05 },
        { location: [48.8566, 2.3522], size: 0.03 },
        { location: [35.6762, 139.6503], size: 0.05 },
        { location: [22.3193, 114.1694], size: 0.04 },
        { location: [1.3521, 103.8198], size: 0.04 },
        { location: [-33.8688, 151.2093], size: 0.03 },
        { location: [55.7558, 37.6173], size: 0.03 },
        { location: [19.076, 72.8777], size: 0.04 },
        { location: [-23.5505, -46.6333], size: 0.04 },
        { location: [25.2048, 55.2708], size: 0.04 },
      ],
      arcs: [
        { from: [40.7128, -74.006], to: [51.5072, -0.1276] },
        { from: [35.6762, 139.6503], to: [22.3193, 114.1694] },
        { from: [37.7749, -122.4194], to: [1.3521, 103.8198] },
        { from: [48.8566, 2.3522], to: [25.2048, 55.2708] },
        { from: [-23.5505, -46.6333], to: [40.7128, -74.006] },
      ],
      arcColor: [251 / 255, 100 / 255, 21 / 255],
      arcWidth: 0.3,
      arcHeight: 0.5,
    })

    globeRef.current = globe

    function animate() {
      if (pointerInteracting.current === null) {
        phiRef.current += 0.003
      }
      globe.update({
        phi: phiRef.current,
        width: width * 2,
        height: width * 2,
      })
      animationId = requestAnimationFrame(animate)
    }
    animationId = requestAnimationFrame(animate)

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1"
      }
    }, 100)

    return () => {
      cancelAnimationFrame(animationId)
      globe.destroy()
      globeRef.current = null
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerOut={onPointerOut}
      onPointerMove={onMouseMove}
      className={cn("cursor-grab", className)}
      style={{
        width: "100%",
        height: "100%",
        contain: "layout paint size",
        opacity: 0,
        transition: "opacity 1s ease",
      }}
    />
  )
}
