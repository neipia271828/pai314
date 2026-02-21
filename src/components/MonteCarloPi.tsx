import { useCallback, useEffect, useRef, useState } from "react"
import styles from "../styles/MonteCarloPi.module.css"

type Point = {
  x: number
  y: number
  insideCircle: boolean
  id: number
  createdAt: number
}

const POINT_LIFETIME_MS = 3140
const ACCENT_COLOR = "#4CBCC6"
const GRID_SIZE = 20
const SAND_DURATION_MS = 500
const POINTS_PER_FRAME = 24

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.strokeStyle = "#1a1a2e"
  ctx.lineWidth = 0.5
  for (let x = 0; x <= width; x += GRID_SIZE) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
  for (let y = 0; y <= height; y += GRID_SIZE) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
}

function drawCircle(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  ctx.strokeStyle = ACCENT_COLOR
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.stroke()
}

function drawPoint(ctx: CanvasRenderingContext2D, point: Point, alpha: number) {
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.fillStyle = point.insideCircle ? ACCENT_COLOR : "#ffffff"
  ctx.fillRect(Math.round(point.x), Math.round(point.y), 1, 1)
  ctx.restore()
}

function MonteCarloPi() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<Point[]>([])
  const animFrameRef = useRef<number>(0)
  const nextIdRef = useRef(0)
  const canvasWidthRef = useRef(800)
  const canvasHeightRef = useRef(window.innerHeight)
  const [piEstimate, setPiEstimate] = useState<number | null>(null)
  const [totalPoints, setTotalPoints] = useState(0)
  const [insidePoints, setInsidePoints] = useState(0)

  const getCircleParams = useCallback(() => {
    const w = canvasWidthRef.current
    const h = canvasHeightRef.current
    const cx = w / 2
    const cy = h / 2
    // 70% of the shorter side's half-length, leaving 15% margin on each side
    const radius = Math.min(w, h) / 2 * 0.7
    return { cx, cy, radius }
  }, [])

  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const now = Date.now()
    const w = canvasWidthRef.current
    const h = canvasHeightRef.current
    const { cx, cy, radius } = getCircleParams()

    pointsRef.current = pointsRef.current.filter(
      (p) => now - p.createdAt < POINT_LIFETIME_MS
    )

    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, w, h)

    drawGrid(ctx, w, h)
    drawCircle(ctx, cx, cy, radius)

    for (const point of pointsRef.current) {
      const age = now - point.createdAt
      const lifeRatio = age / POINT_LIFETIME_MS
      const alpha = lifeRatio < 0.7 ? 1 : 1 - (lifeRatio - 0.7) / 0.3
      drawPoint(ctx, point, alpha)
    }

    animFrameRef.current = requestAnimationFrame(render)
  }, [getCircleParams])

  // Resize observer on canvas element directly so contentRect reflects
  // the actual CSS display size of the canvas (excluding info panel)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const syncSize = (w: number, h: number) => {
      if (w > 0) {
        canvasWidthRef.current = w
        canvas.width = w
      }
      // Fallback to window.innerHeight if canvas height is 0 (e.g. before layout)
      const effectiveH = h > 0 ? h : window.innerHeight
      canvasHeightRef.current = effectiveH
      canvas.height = effectiveH
    }

    // Sync initial size immediately after mount
    const rect = canvas.getBoundingClientRect()
    syncSize(Math.floor(rect.width), Math.floor(rect.height))

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        syncSize(
          Math.floor(entry.contentRect.width),
          Math.floor(entry.contentRect.height)
        )
      }
    })
    observer.observe(canvas)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [render])

  const sandTimerRef = useRef<number>(0)
  const sandStartRef = useRef<number>(0)

  const updateEstimate = useCallback(() => {
    const { radius } = getCircleParams()
    const w = canvasWidthRef.current
    const h = canvasHeightRef.current
    const activePoints = pointsRef.current
    const inside = activePoints.filter((p) => p.insideCircle).length
    const total = activePoints.length
    const canvasArea = w * h
    const estimate = total > 0 ? (inside / total) * (canvasArea / (radius * radius)) : null
    setPiEstimate(estimate)
    setTotalPoints(total)
    setInsidePoints(inside)
  }, [getCircleParams])

  const sandStep = useCallback(() => {
    const elapsed = Date.now() - sandStartRef.current
    if (elapsed >= SAND_DURATION_MS) {
      cancelAnimationFrame(sandTimerRef.current)
      sandTimerRef.current = 0
      return
    }

    const { cx, cy, radius } = getCircleParams()
    const w = canvasWidthRef.current
    const h = canvasHeightRef.current
    const now = Date.now()

    const progress = elapsed / SAND_DURATION_MS
    const pointsThisFrame = Math.max(1, Math.floor(POINTS_PER_FRAME * (1 - progress) ** 2))

    for (let i = 0; i < pointsThisFrame; i++) {
      const x = Math.random() * w
      const y = Math.random() * h
      const dx = x - cx
      const dy = y - cy
      const insideCircle = dx * dx + dy * dy <= radius * radius
      pointsRef.current.push({
        x,
        y,
        insideCircle,
        id: nextIdRef.current++,
        createdAt: now,
      })
    }

    updateEstimate()
    sandTimerRef.current = requestAnimationFrame(sandStep)
  }, [getCircleParams, updateEstimate])

  const handleClick = useCallback(() => {
    if (sandTimerRef.current) {
      cancelAnimationFrame(sandTimerRef.current)
    }
    sandStartRef.current = Date.now()
    sandTimerRef.current = requestAnimationFrame(sandStep)
  }, [sandStep])

  useEffect(() => {
    return () => {
      if (sandTimerRef.current) {
        cancelAnimationFrame(sandTimerRef.current)
      }
    }
  }, [])

  const accuracy =
    piEstimate !== null
      ? (Math.abs(piEstimate - Math.PI) / Math.PI) * 100
      : null

  return (
    <div className={styles.wrapper}>
      <canvas
        ref={canvasRef}
        width={canvasWidthRef.current}
        height={canvasHeightRef.current}
        className={styles.canvas}
        onClick={handleClick}
      />
      <div className={styles.info}>
        <div className={styles.formula}>
          <span className={styles.label}>π ≈</span>
          <span className={styles.value}>
            {insidePoints} / {totalPoints} × W×H/r²
          </span>
        </div>
        <div className={styles.result}>
          <span className={styles.label}>推定値</span>
          <span className={styles.piValue}>
            {piEstimate !== null ? piEstimate.toFixed(6) : "—"}
          </span>
        </div>
        <div className={styles.accuracy}>
          <span className={styles.label}>誤差率</span>
          <span className={styles.errorValue}>
            {accuracy !== null ? `${accuracy.toFixed(4)} %` : "—"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MonteCarloPi
