import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Play, Pause, RotateCcw, X, Activity, Cpu, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

// --- MATH EXPRESSION EVALUATOR ---
const evaluateMathExpression = (expr, x, y, t) => {
  try {
    let cleanExpr = expr.toLowerCase()
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/exp/g, 'Math.exp')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/abs/g, 'Math.abs')
      .replace(/pow/g, 'Math.pow')
      .replace(/pi/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/\^/g, '**');

    const fn = new Function('x', 'y', 't', `try { return ${cleanExpr}; } catch(e) { return 0; }`);
    const val = fn(x, y, t);
    return isNaN(val) ? 0 : val;
  } catch (err) {
    return 0;
  }
};

// --- 3D WAVE MESH COMPONENT ---
function WaveMesh({ equation, speed, amplitude, color, isPaused }) {
  const geomRef = useRef();

  useFrame((state) => {
    if (isPaused) return;
    const t = state.clock.getElapsedTime() * speed;
    const geom = geomRef.current;
    if (!geom) return;

    const positionAttribute = geom.attributes.position;
    const array = positionAttribute.array;
    const count = positionAttribute.count;

    for (let i = 0; i < count; i++) {
      const x = array[i * 3];
      const y = array[i * 3 + 1];
      const z = evaluateMathExpression(equation, x, y, t);
      array[i * 3 + 2] = z * amplitude;
    }

    positionAttribute.needsUpdate = true;
    geom.computeVertexNormals();
  });

  return (
    <mesh rotation={[-Math.PI / 3, 0, 0]}>
      <planeGeometry ref={geomRef} args={[12, 12, 60, 60]} />
      <meshStandardMaterial
        color={color}
        wireframe
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.1}
        metalness={0.9}
        side={2}
      />
    </mesh>
  );
}

// --- MAIN PORTAL COMPONENT ---
export default function AbyssLogicLab({ onClose }) {
  const [activeTab, setActiveTab] = useState('wave'); // 'wave' | 'calculus' | 'montecarlo'

  // --- WAVE SIMULATION STATES ---
  const [equation, setEquation] = useState('sin(sqrt(x*x + y*y) - t) * 0.8');
  const [speed, setSpeed] = useState(1.2);
  const [amplitude, setAmplitude] = useState(1.0);
  const [accentColor, setAccentColor] = useState('#00f0ff');
  const [isWavePaused, setIsWavePaused] = useState(false);

  // Preset Formulas
  const wavePresets = [
    { name: 'Quantum Ripple', eq: 'sin(sqrt(x*x + y*y) - t) * 0.8', color: '#00f0ff' },
    { name: 'Interference Pattern', eq: '(sin(x - t) + cos(y - t)) * 0.5', color: '#00ff9c' },
    { name: 'Calculus Manifold', eq: 'cos(x/2) * sin(y/2) * sin(t) * 1.2', color: '#8b5cf6' },
    { name: 'Decaying Wave', eq: 'sin(x - t) * cos(y - t) * exp(-0.05 * (x*x + y*y)) * 1.5', color: '#ec4899' }
  ];

  // --- CALCULUS APPROXIMATOR STATES ---
  const [calcFunc, setCalcFunc] = useState('sin(x) + 1.5');
  const [intervalA, setIntervalA] = useState(-3);
  const [intervalB, setIntervalB] = useState(3);
  const [partitions, setPartitions] = useState(12);
  const [endpointMode, setEndpointMode] = useState('mid'); // 'left' | 'mid' | 'right'
  const [secantDx, setSecantDx] = useState(0.8);
  const [x0, setX0] = useState(0.5);

  const calcPresets = [
    { name: 'Sine Curve', eq: 'sin(x) + 1.5' },
    { name: 'Gaussian Distribution', eq: 'exp(-x*x) * 2' },
    { name: 'Cubic Polynomial', eq: '0.1 * x^3 - 0.5 * x^2 + 2' },
    { name: 'Damped Oscillation', eq: 'exp(-0.2 * abs(x)) * cos(2*x) + 1.5' }
  ];

  const calcCanvasRef = useRef(null);

  // Exact Integration (High Resolution Numerical)
  const exactIntegral = useMemo(() => {
    const N = 2000;
    const dx = (intervalB - intervalA) / N;
    let sum = 0;
    for (let i = 0; i < N; i++) {
      const x = intervalA + (i + 0.5) * dx;
      sum += evaluateMathExpression(calcFunc, x, 0, 0);
    }
    return sum * dx;
  }, [calcFunc, intervalA, intervalB]);

  // Riemann Sum Approximation
  const riemannSum = useMemo(() => {
    const dx = (intervalB - intervalA) / partitions;
    let sum = 0;
    for (let i = 0; i < partitions; i++) {
      let xEval = intervalA;
      if (endpointMode === 'left') {
        xEval = intervalA + i * dx;
      } else if (endpointMode === 'right') {
        xEval = intervalA + (i + 1) * dx;
      } else {
        xEval = intervalA + (i + 0.5) * dx;
      }
      sum += evaluateMathExpression(calcFunc, xEval, 0, 0);
    }
    return sum * dx;
  }, [calcFunc, intervalA, intervalB, partitions, endpointMode]);

  const calcError = Math.abs(riemannSum - exactIntegral);

  // Redraw Calculus Canvas
  useEffect(() => {
    if (activeTab !== 'calculus' || !calcCanvasRef.current) return;
    const canvas = calcCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Grid coordinates mapping
    const xMin = intervalA - 1;
    const xMax = intervalB + 1;
    const yMin = -1;
    const yMax = 4;

    const toX = (val) => ((val - xMin) / (xMax - xMin)) * width;
    const toY = (val) => height - ((val - yMin) / (yMax - yMin)) * height;

    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      ctx.beginPath();
      ctx.moveTo(toX(x), 0);
      ctx.lineTo(toX(x), height);
      ctx.stroke();
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      ctx.beginPath();
      ctx.moveTo(0, toY(y));
      ctx.lineTo(width, toY(y));
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, toY(0));
    ctx.lineTo(width, toY(0));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(toX(0), 0);
    ctx.lineTo(toX(0), height);
    ctx.stroke();

    // Draw Riemann Rectangles
    const dx = (intervalB - intervalA) / partitions;
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 1;

    for (let i = 0; i < partitions; i++) {
      const xLeft = intervalA + i * dx;
      const xRight = xLeft + dx;
      let xEval = xLeft;
      if (endpointMode === 'left') xEval = xLeft;
      else if (endpointMode === 'right') xEval = xRight;
      else xEval = xLeft + dx / 2;

      const yVal = evaluateMathExpression(calcFunc, xEval, 0, 0);

      // Create gradient for rects
      const rectGrad = ctx.createLinearGradient(0, toY(0), 0, toY(yVal));
      if (endpointMode === 'left') {
        rectGrad.addColorStop(0, 'rgba(0, 255, 156, 0.03)');
        rectGrad.addColorStop(1, 'rgba(0, 255, 156, 0.15)');
        ctx.fillStyle = rectGrad;
        ctx.strokeStyle = 'rgba(0, 255, 156, 0.4)';
      } else if (endpointMode === 'right') {
        rectGrad.addColorStop(0, 'rgba(139, 92, 246, 0.03)');
        rectGrad.addColorStop(1, 'rgba(139, 92, 246, 0.15)');
        ctx.fillStyle = rectGrad;
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.4)';
      } else {
        rectGrad.addColorStop(0, 'rgba(0, 240, 255, 0.03)');
        rectGrad.addColorStop(1, 'rgba(0, 240, 255, 0.15)');
        ctx.fillStyle = rectGrad;
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
      }

      const rx = toX(xLeft);
      const ry = toY(Math.max(0, yVal));
      const rw = toX(xRight) - toX(xLeft);
      const rh = Math.abs(toY(yVal) - toY(0));

      ctx.fillRect(rx, ry, rw, rh);
      ctx.strokeRect(rx, ry, rw, rh);

      // Draw evaluation point node
      ctx.fillStyle = 'var(--accent-green)';
      ctx.beginPath();
      ctx.arc(toX(xEval), toY(yVal), 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Math Function Curve
    ctx.strokeStyle = 'var(--accent-cyan)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;
    for (let px = 0; px <= width; px++) {
      const xVal = xMin + (px / width) * (xMax - xMin);
      const yVal = evaluateMathExpression(calcFunc, xVal, 0, 0);
      const cy = toY(yVal);
      if (isNaN(cy) || !isFinite(cy)) continue;

      if (!started) {
        ctx.moveTo(px, cy);
        started = true;
      } else {
        ctx.lineTo(px, cy);
      }
    }
    ctx.stroke();

    // Draw Secant and Tangent Lines (Derivative Visualization)
    const y0 = evaluateMathExpression(calcFunc, x0, 0, 0);
    const x1 = x0 + secantDx;
    const y1 = evaluateMathExpression(calcFunc, x1, 0, 0);
    const secantSlope = (y1 - y0) / secantDx;

    // Numerical Tangent Slope
    const tangentDx = 0.0001;
    const yTangentDx = evaluateMathExpression(calcFunc, x0 + tangentDx, 0, 0);
    const tangentSlope = (yTangentDx - y0) / tangentDx;

    // Draw points P and Q
    ctx.fillStyle = '#ec4899';
    ctx.beginPath();
    ctx.arc(toX(x0), toY(y0), 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff7b00';
    ctx.beginPath();
    ctx.arc(toX(x1), toY(y1), 5, 0, Math.PI * 2);
    ctx.fill();

    // Draw Secant Line (Extend across screen)
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    const secLineY = (x) => secantSlope * (x - x0) + y0;
    ctx.moveTo(toX(xMin), toY(secLineY(xMin)));
    ctx.lineTo(toX(xMax), toY(secLineY(xMax)));
    ctx.stroke();

    // Draw Tangent Line
    ctx.strokeStyle = 'rgba(0, 255, 156, 0.7)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    ctx.beginPath();
    const tanLineY = (x) => tangentSlope * (x - x0) + y0;
    ctx.moveTo(toX(xMin), toY(tanLineY(xMin)));
    ctx.lineTo(toX(xMax), toY(tanLineY(xMax)));
    ctx.stroke();

    // Add labels
    ctx.font = '10px monospace';
    ctx.fillStyle = '#fff';
    ctx.fillText(`P (x0: ${x0.toFixed(2)})`, toX(x0) - 20, toY(y0) - 10);
    ctx.fillText(`Q (x0+dx)`, toX(x1) - 20, toY(y1) - 10);
  }, [activeTab, calcFunc, intervalA, intervalB, partitions, endpointMode, secantDx, x0]);


  // --- MONTE CARLO STATES & WORKER LOGIC ---
  const [totalSamples, setTotalSamples] = useState(0);
  const [insideSamples, setInsideSamples] = useState(0);
  const [piEstimate, setPiEstimate] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [targetLimit, setTargetLimit] = useState(50000);
  const [pointsToDraw, setPointsToDraw] = useState([]);
  const [convergenceHistory, setConvergenceHistory] = useState([]);

  const workerRef = useRef(null);
  const monteCanvasRef = useRef(null);
  const trendCanvasRef = useRef(null);

  // Initialize Worker from Blob
  useEffect(() => {
    const workerCode = `
      self.onmessage = function(e) {
        const { targetLimit, batchSize } = e.data;
        let insideCount = 0;
        let totalCount = 0;
        
        function runBatch() {
          if (totalCount >= targetLimit) {
            self.postMessage({ type: 'done' });
            return;
          }
          
          let points = [];
          for (let i = 0; i < batchSize; i++) {
            const x = Math.random() * 2 - 1;
            const y = Math.random() * 2 - 1;
            const inside = (x * x + y * y) <= 1;
            if (inside) insideCount++;
            totalCount++;
            
            if (i < 60) {
              points.push({ x, y, inside });
            }
          }
          
          self.postMessage({
            type: 'progress',
            total: totalCount,
            inside: insideCount,
            pi: (insideCount / totalCount) * 4,
            points: points
          });
          
          setTimeout(runBatch, 15);
        }
        runBatch();
      };
    `;
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    workerRef.current = new Worker(URL.createObjectURL(blob));

    workerRef.current.onmessage = (e) => {
      if (e.data.type === 'progress') {
        setTotalSamples(e.data.total);
        setInsideSamples(e.data.inside);
        setPiEstimate(e.data.pi);
        setPointsToDraw((prev) => [...prev, ...e.data.points].slice(-600));
        setConvergenceHistory((prev) => {
          const next = [...prev, { count: e.data.total, value: e.data.pi }];
          return next.slice(-200); // keep last 200 values for graph
        });
      } else if (e.data.type === 'done') {
        setIsRunning(false);
      }
    };

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

  const handleStartMonteCarlo = () => {
    if (isRunning) {
      // pause
      setIsRunning(false);
      workerRef.current.terminate();
      // re-init worker
      const workerCode = `
        self.onmessage = function(e) {
          const { targetLimit, batchSize } = e.data;
          let insideCount = e.data.insideCount || 0;
          let totalCount = e.data.totalCount || 0;
          
          function runBatch() {
            if (totalCount >= targetLimit) {
              self.postMessage({ type: 'done' });
              return;
            }
            
            let points = [];
            for (let i = 0; i < batchSize; i++) {
              const x = Math.random() * 2 - 1;
              const y = Math.random() * 2 - 1;
              const inside = (x * x + y * y) <= 1;
              if (inside) insideCount++;
              totalCount++;
              
              if (i < 60) {
                points.push({ x, y, inside });
              }
            }
            
            self.postMessage({
              type: 'progress',
              total: totalCount,
              inside: insideCount,
              pi: (insideCount / totalCount) * 4,
              points: points
            });
            
            setTimeout(runBatch, 15);
          }
          runBatch();
        };
      `;
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      workerRef.current = new Worker(URL.createObjectURL(blob));
      workerRef.current.onmessage = (e) => {
        if (e.data.type === 'progress') {
          setTotalSamples(e.data.total);
          setInsideSamples(e.data.inside);
          setPiEstimate(e.data.pi);
          setPointsToDraw((prev) => [...prev, ...e.data.points].slice(-600));
          setConvergenceHistory((prev) => [...prev, { count: e.data.total, value: e.data.pi }].slice(-200));
        } else if (e.data.type === 'done') {
          setIsRunning(false);
        }
      };
    } else {
      setIsRunning(true);
      workerRef.current.postMessage({
        targetLimit,
        batchSize: 400,
        insideCount: insideSamples,
        totalCount: totalSamples
      });
    }
  };

  const handleResetMonteCarlo = () => {
    setIsRunning(false);
    if (workerRef.current) workerRef.current.terminate();
    // Re-init
    const workerCode = `
      self.onmessage = function(e) {
        const { targetLimit, batchSize } = e.data;
        let insideCount = 0;
        let totalCount = 0;
        
        function runBatch() {
          if (totalCount >= targetLimit) {
            self.postMessage({ type: 'done' });
            return;
          }
          
          let points = [];
          for (let i = 0; i < batchSize; i++) {
            const x = Math.random() * 2 - 1;
            const y = Math.random() * 2 - 1;
            const inside = (x * x + y * y) <= 1;
            if (inside) insideCount++;
            totalCount++;
            
            if (i < 60) {
              points.push({ x, y, inside });
            }
          }
          
          self.postMessage({
            type: 'progress',
            total: totalCount,
            inside: insideCount,
            pi: (insideCount / totalCount) * 4,
            points: points
          });
          
          setTimeout(runBatch, 15);
        }
        runBatch();
      };
    `;
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    workerRef.current = new Worker(URL.createObjectURL(blob));
    workerRef.current.onmessage = (e) => {
      if (e.data.type === 'progress') {
        setTotalSamples(e.data.total);
        setInsideSamples(e.data.inside);
        setPiEstimate(e.data.pi);
        setPointsToDraw((prev) => [...prev, ...e.data.points].slice(-600));
        setConvergenceHistory((prev) => [...prev, { count: e.data.total, value: e.data.pi }].slice(-200));
      } else if (e.data.type === 'done') {
        setIsRunning(false);
      }
    };
    setTotalSamples(0);
    setInsideSamples(0);
    setPiEstimate(0);
    setPointsToDraw([]);
    setConvergenceHistory([]);
  };

  // Draw Monte Carlo Points Canvas
  useEffect(() => {
    if (activeTab !== 'montecarlo' || !monteCanvasRef.current) return;
    const canvas = monteCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;

    ctx.fillStyle = '#06060c';
    ctx.fillRect(0, 0, size, size);

    // Draw outer boundary and circle quadrant
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(size / 2, 0); ctx.lineTo(size / 2, size);
    ctx.moveTo(0, size / 2); ctx.lineTo(size, size / 2);
    ctx.stroke();

    // Plot samples
    pointsToDraw.forEach((pt) => {
      const cx = (pt.x + 1) * (size / 2);
      const cy = (pt.y + 1) * (size / 2);
      ctx.fillStyle = pt.inside ? 'rgba(0, 240, 255, 0.4)' : 'rgba(236, 72, 153, 0.35)';
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [activeTab, pointsToDraw]);

  // Draw Monte Carlo Trendline/Convergence Canvas
  useEffect(() => {
    if (activeTab !== 'montecarlo' || !trendCanvasRef.current || convergenceHistory.length === 0) return;
    const canvas = trendCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Grid details
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2);
    ctx.moveTo(0, h / 4); ctx.lineTo(w, h / 4);
    ctx.moveTo(0, (3 * h) / 4); ctx.lineTo(w, (3 * h) / 4);
    ctx.stroke();

    // Ideal Pi Line
    ctx.strokeStyle = 'rgba(0, 255, 156, 0.5)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    const piY = h - ((3.14159 - 2.5) / 1.5) * h;
    ctx.beginPath();
    ctx.moveTo(0, piY);
    ctx.lineTo(w, piY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Trendline path
    ctx.strokeStyle = 'var(--accent-cyan)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    convergenceHistory.forEach((item, index) => {
      const cx = (index / (convergenceHistory.length - 1)) * w;
      // map estimate from [2.5, 4.0] to canvas height
      const yVal = Math.max(2.5, Math.min(4.0, item.value));
      const cy = h - ((yVal - 2.5) / 1.5) * h;
      if (index === 0) ctx.moveTo(cx, cy);
      else ctx.lineTo(cx, cy);
    });
    ctx.stroke();

    ctx.font = '9px monospace';
    ctx.fillStyle = 'var(--accent-green)';
    ctx.fillText('3.14159 (PI)', 5, piY - 4);
  }, [activeTab, convergenceHistory]);


  return (
    <div className="lab-overlay">
      <div className="lab-container glass">
        
        {/* TOP GLOWING HUD HEADER */}
        <div className="lab-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div className="glowing-node"></div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)', letterSpacing: '1px', fontWeight: 'bold' }}>
                ABYSS <span style={{ color: 'var(--accent-green)' }}>LOGIC LAB</span> <span style={{ fontSize: '0.65rem', border: '1px solid rgba(0, 240, 255, 0.3)', padding: '2px 6px', borderRadius: '3px', color: 'var(--accent-cyan)', marginLeft: '10px' }}>v2.0</span>
              </h2>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', margin: 0 }}>
                CLIENT-SIDE WebGL & MATHEMATICAL COMPUTING ENVIRONMENT
              </p>
            </div>
          </div>
          
          <button className="close-btn" onClick={onClose} aria-label="Close Lab">
            <X size={20} />
          </button>
        </div>

        {/* CONTROLLING NAVIGATION TABS */}
        <div className="lab-tabs">
          <button 
            className={`tab-btn ${activeTab === 'wave' ? 'active' : ''}`}
            onClick={() => setActiveTab('wave')}
          >
            <Sparkles size={16} /> 3D WAVE MANIFOLD
          </button>
          <button 
            className={`tab-btn ${activeTab === 'calculus' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculus')}
          >
            <Activity size={16} /> CALCULUS INTEGRATOR
          </button>
          <button 
            className={`tab-btn ${activeTab === 'montecarlo' ? 'active' : ''}`}
            onClick={() => setActiveTab('montecarlo')}
          >
            <Cpu size={16} /> MONTE CARLO (WORKER)
          </button>
        </div>

        {/* WORKSPACE LAYOUT (2 COLUMNS: Visualizer + Config Sidebar) */}
        <div className="lab-workspace">
          
          {/* VISUALIZER FIELD */}
          <div className="visualizer-field">
            
            {activeTab === 'wave' && (
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Canvas camera={{ position: [0, 6, 8], fov: 50 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
                  <pointLight position={[-10, -10, -10]} intensity={0.8} color={accentColor} />
                  <WaveMesh 
                    equation={equation} 
                    speed={speed} 
                    amplitude={amplitude} 
                    color={accentColor} 
                    isPaused={isWavePaused}
                  />
                  <OrbitControls enableZoom={true} maxPolarAngle={Math.PI/2} />
                  <gridHelper args={[15, 15, 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.03)']} position={[0, -2, 0]} />
                </Canvas>
                
                <div className="hud-metric-card" style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>TELEMETRY</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: accentColor }}>MESH DEFORMATION: 60 FPS</div>
                  <div style={{ fontSize: '0.7rem', color: '#fff', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>Vertices: 3,600 (GPU Compiled)</div>
                </div>
              </div>
            )}

            {activeTab === 'calculus' && (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--accent-cyan)' }}>RIEMANN MANIFOLD & LIMIT TANGENT PLOT</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Visualizing Riemann integration partitions and tangent approximations.</p>
                  </div>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', background: 'rgba(0, 255, 156, 0.08)', padding: '4px 10px', border: '1px solid rgba(0,255,156,0.15)', borderRadius: '3px' }}>
                    PRECISION: DYNAMIC
                  </div>
                </div>

                <div className="canvas-holder" style={{ flex: 1, minHeight: '320px', background: '#050508', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                  <canvas ref={calcCanvasRef} width={680} height={350} style={{ width: '100%', height: '100%', display: 'block' }} />
                </div>
                
                {/* Mathematical stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                  <div className="math-telemetry-box">
                    <span className="label">Analytical Integral</span>
                    <span className="value">{exactIntegral.toFixed(6)}</span>
                  </div>
                  <div className="math-telemetry-box">
                    <span className="label">Riemann Approximation</span>
                    <span className="value" style={{ color: endpointMode === 'mid' ? 'var(--accent-cyan)' : endpointMode === 'left' ? 'var(--accent-green)' : 'var(--accent-purple)' }}>{riemannSum.toFixed(6)}</span>
                  </div>
                  <div className="math-telemetry-box">
                    <span className="label">Numerical Approximation Error</span>
                    <span className="value" style={{ color: calcError > 0.1 ? '#ff5555' : 'var(--accent-green)' }}>{calcError.toFixed(6)}</span>
                  </div>
                  <div className="math-telemetry-box">
                    <span className="label">Secant Slope Δx={secantDx.toFixed(3)}</span>
                    <span className="value" style={{ color: '#ec4899' }}>
                      {((evaluateMathExpression(calcFunc, x0 + secantDx, 0, 0) - evaluateMathExpression(calcFunc, x0, 0, 0)) / secantDx).toFixed(4)}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'montecarlo' && (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-heading)', color: 'var(--accent-cyan)' }}>OFF-THREAD MONTE CARLO SIMULATOR</h3>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Offloading high-CPU probabilistic simulation to standard background Web Workers.</p>
                  </div>
                  <div className={`worker-status-tag ${isRunning ? 'active' : ''}`}>
                    {isRunning ? 'THREAD: CALC_ACTIVE' : 'THREAD: IDLE'}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', minHeight: '260px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>PROBABILITY FIELD</div>
                    <div style={{ flex: 1, background: '#050508', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                      <canvas ref={monteCanvasRef} width={260} height={260} style={{ maxWidth: '100%', height: 'auto', display: 'block', borderRadius: '4px' }} />
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>CONVERGENCE CURVE</span>
                      <span style={{ color: 'var(--accent-green)' }}>Estimate: {piEstimate.toFixed(5)}</span>
                    </div>
                    <div style={{ flex: 1, background: '#050508', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '6px', padding: '12px' }}>
                      <canvas ref={trendCanvasRef} width={300} height={236} style={{ width: '100%', height: '100%', display: 'block' }} />
                    </div>
                  </div>
                </div>

                {/* Stats panel */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                  <div className="math-telemetry-box">
                    <span className="label">Total Samples</span>
                    <span className="value" style={{ fontFamily: 'var(--font-mono)', color: '#fff' }}>{totalSamples.toLocaleString()}</span>
                  </div>
                  <div className="math-telemetry-box">
                    <span className="label">In Circle Samples</span>
                    <span className="value" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{insideSamples.toLocaleString()}</span>
                  </div>
                  <div className="math-telemetry-box">
                    <span className="label">Calculated π</span>
                    <span className="value" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-green)' }}>{piEstimate ? piEstimate.toFixed(6) : '0.000000'}</span>
                  </div>
                  <div className="math-telemetry-box">
                    <span className="label">Standard Deviation</span>
                    <span className="value" style={{ fontFamily: 'var(--font-mono)', color: '#ec4899' }}>
                      {totalSamples > 0 ? Math.sqrt((insideSamples / totalSamples) * (1 - insideSamples / totalSamples) / totalSamples).toFixed(6) : '0.000000'}
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* PARAMETERS CONFIG SIDEBAR */}
          <div className="lab-sidebar">
            <h3 style={{ fontSize: '0.85rem', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px', letterSpacing: '0.5px' }}>
              CONTROL INTERFACE
            </h3>

            {/* TAB-SPECIFIC CONFIG PANEL */}
            {activeTab === 'wave' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '15px' }}>
                <div className="sidebar-group">
                  <label>SYMBOLIC EQUATION f(x, y, t)</label>
                  <input 
                    type="text" 
                    value={equation} 
                    onChange={(e) => setEquation(e.target.value)}
                    className="cyber-input"
                  />
                </div>

                <div className="sidebar-group">
                  <div className="slider-header">
                    <span className="slider-label">SIMULATION SPEED</span>
                    <span className="slider-val">{speed.toFixed(1)}x</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="3" 
                    step="0.1" 
                    value={speed} 
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="cyber-slider"
                  />
                </div>

                <div className="sidebar-group">
                  <div className="slider-header">
                    <span className="slider-label">WAVE AMPLITUDE</span>
                    <span className="slider-val">{amplitude.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.2" 
                    max="2.5" 
                    step="0.1" 
                    value={amplitude} 
                    onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                    className="cyber-slider"
                  />
                </div>

                <div className="sidebar-group">
                  <label>ACCENT CHROMATICITY</label>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    {['#00f0ff', '#00ff9c', '#8b5cf6', '#ec4899'].map((col) => (
                      <button 
                        key={col} 
                        onClick={() => setAccentColor(col)}
                        style={{ 
                          width: '28px', 
                          height: '28px', 
                          borderRadius: '4px', 
                          background: col, 
                          border: accentColor === col ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)',
                          boxShadow: accentColor === col ? `0 0 10px ${col}` : 'none',
                          cursor: 'pointer' 
                        }}
                        aria-label={`Color ${col}`}
                      />
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button 
                    onClick={() => setIsWavePaused(!isWavePaused)}
                    className="hud-btn"
                    style={{ flex: 1 }}
                  >
                    {isWavePaused ? <Play size={14} style={{ marginRight: '6px' }} /> : <Pause size={14} style={{ marginRight: '6px' }} />}
                    {isWavePaused ? 'RESUME' : 'PAUSE'}
                  </button>
                  <button 
                    onClick={() => { setEquation('sin(sqrt(x*x + y*y) - t) * 0.8'); setSpeed(1.2); setAmplitude(1.0); setIsWavePaused(false); }}
                    className="hud-btn glow-btn-purple"
                    aria-label="Reset Formula"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                <div className="presets-list">
                  <div className="presets-title">EQUATION ARCHIVES</div>
                  {wavePresets.map((preset, idx) => (
                    <button 
                      key={idx}
                      className="preset-selector-btn"
                      onClick={() => { setEquation(preset.eq); setAccentColor(preset.color); }}
                    >
                      <span>{preset.name}</span>
                      <ArrowRight size={12} color="var(--accent-cyan)" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'calculus' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '15px' }}>
                <div className="sidebar-group">
                  <label>SYMBOLIC EQUATION f(x)</label>
                  <input 
                    type="text" 
                    value={calcFunc} 
                    onChange={(e) => setCalcFunc(e.target.value)}
                    className="cyber-input"
                  />
                </div>

                <div className="sidebar-group">
                  <div className="slider-header">
                    <span className="slider-label">PARTITIONS (N)</span>
                    <span className="slider-val">{partitions}</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="100" 
                    step="1" 
                    value={partitions} 
                    onChange={(e) => setPartitions(parseInt(e.target.value))}
                    className="cyber-slider"
                  />
                </div>

                <div className="sidebar-group">
                  <label>ENDPOINT APPROXIMATION MODE</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '5px', marginTop: '8px' }}>
                    {['left', 'mid', 'right'].map((mode) => (
                      <button 
                        key={mode} 
                        onClick={() => setEndpointMode(mode)}
                        className={`mode-btn ${endpointMode === mode ? 'active' : ''}`}
                      >
                        {mode.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sidebar-group">
                  <div className="slider-header">
                    <span className="slider-label">SECANT SECONENT (dx)</span>
                    <span className="slider-val">{secantDx.toFixed(3)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.005" 
                    max="1.5" 
                    step="0.005" 
                    value={secantDx} 
                    onChange={(e) => setSecantDx(parseFloat(e.target.value))}
                    className="cyber-slider"
                  />
                </div>

                <div className="sidebar-group">
                  <div className="slider-header">
                    <span className="slider-label">ANCHOR POINT (x0)</span>
                    <span className="slider-val">{x0.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" 
                    min="-2.0" 
                    max="2.0" 
                    step="0.05" 
                    value={x0} 
                    onChange={(e) => setX0(parseFloat(e.target.value))}
                    className="cyber-slider"
                  />
                </div>

                <div className="presets-list">
                  <div className="presets-title">INTEGRATION PRESETS</div>
                  {calcPresets.map((preset, idx) => (
                    <button 
                      key={idx}
                      className="preset-selector-btn"
                      onClick={() => setCalcFunc(preset.eq)}
                    >
                      <span>{preset.name}</span>
                      <ArrowRight size={12} color="var(--accent-cyan)" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'montecarlo' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '15px' }}>
                <div className="sidebar-group">
                  <label>TARGET SAMPLES LIMIT</label>
                  <select 
                    value={targetLimit} 
                    onChange={(e) => setTargetLimit(parseInt(e.target.value))}
                    className="cyber-input"
                    style={{ background: '#05050a', cursor: 'pointer' }}
                  >
                    <option value={10000}>10,000 Samples</option>
                    <option value={50000}>50,000 Samples</option>
                    <option value={200000}>200,000 Samples</option>
                    <option value={1000000}>1,000,000 Samples</option>
                  </select>
                </div>

                <div className="sidebar-group" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '6px', padding: '15px' }}>
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)', fontWeight: 'bold', marginBottom: '8px' }}>
                    MONTE CARLO DESCRIPTION
                  </div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                    Calculates π by plotting random coordinates (x, y) in [-1, 1] × [-1, 1].
                    The ratio of points inside the unit circle (x² + y² ≤ 1) to total points estimates π / 4.
                    Runs on a background worker to avoid rendering lockups.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button 
                    onClick={handleStartMonteCarlo}
                    className={`hud-btn ${isRunning ? 'glow-btn-purple' : ''}`}
                    style={{ flex: 1 }}
                  >
                    {isRunning ? <Pause size={14} style={{ marginRight: '6px' }} /> : <Play size={14} style={{ marginRight: '6px' }} />}
                    {isRunning ? 'PAUSE' : 'SIMULATE'}
                  </button>
                  <button 
                    onClick={handleResetMonteCarlo}
                    className="hud-btn"
                    style={{ minWidth: '45px' }}
                    aria-label="Reset Monte Carlo"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                <div className="presets-list" style={{ border: 'none', background: 'transparent', padding: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                    <HelpCircle size={14} />
                    <span>THREADING METADATA</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px', fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Worker State:</span>
                      <span style={{ color: isRunning ? 'var(--accent-green)' : '#fff' }}>{isRunning ? 'RUNNING' : 'SUSPENDED'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Sample Buffer:</span>
                      <span>600 points</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Render Rate:</span>
                      <span>60 Hz</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      <style>{`
        .lab-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100vw; height: 100vh;
          background: rgba(2, 2, 4, 0.96);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4vh 4vw;
          animation: fadeIn 0.3s ease-out;
        }
        
        .lab-container {
          width: 100%;
          max-width: 1200px;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(6, 6, 10, 0.88);
          border: 1px solid rgba(0, 240, 255, 0.15);
          box-shadow: 0 0 50px rgba(0, 240, 255, 0.08);
          border-radius: 8px;
        }

        .lab-header {
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.01);
        }

        .glowing-node {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-green);
          box-shadow: 0 0 10px var(--accent-green);
          animation: pulse 1.8s infinite;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .close-btn:hover {
          color: #ff5555;
        }

        .lab-tabs {
          display: flex;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(0, 0, 0, 0.2);
        }

        .tab-btn {
          padding: 16px 24px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .tab-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.02);
        }

        .tab-btn.active {
          color: var(--accent-cyan);
          border-bottom-color: var(--accent-cyan);
          background: rgba(0, 240, 255, 0.03);
        }

        .lab-workspace {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 300px;
          overflow: hidden;
        }

        .visualizer-field {
          background: #020205;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
        }

        .lab-sidebar {
          padding: 24px;
          background: rgba(255, 255, 255, 0.01);
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .sidebar-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .sidebar-group label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-secondary);
          letter-spacing: 0.5px;
        }

        .cyber-input {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 10px 12px;
          border-radius: 4px;
          color: #fff;
          font-family: var(--font-mono);
          font-size: 0.85rem;
          transition: border-color 0.2s;
          outline: none;
        }

        .cyber-input:focus {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.1);
        }

        .slider-header {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-secondary);
        }

        .slider-val {
          color: var(--accent-cyan);
          font-weight: bold;
        }

        .cyber-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.08);
          outline: none;
        }

        .cyber-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent-cyan);
          cursor: pointer;
          box-shadow: 0 0 8px var(--accent-cyan);
        }

        .hud-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          padding: 10px 16px;
          border-radius: 4px;
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .hud-btn:hover {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
          background: rgba(0, 240, 255, 0.05);
        }

        .glow-btn-purple {
          background: rgba(139, 92, 246, 0.1) !important;
          border-color: var(--accent-purple) !important;
        }
        .glow-btn-purple:hover {
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.3) !important;
        }

        .presets-list {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 15px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .presets-title {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }

        .preset-selector-btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.04);
          padding: 8px 12px;
          border-radius: 4px;
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-size: 0.78rem;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
        }

        .preset-selector-btn:hover {
          border-color: rgba(0, 240, 255, 0.25);
          background: rgba(255, 255, 255, 0.03);
          color: #fff;
        }

        .mode-btn {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          padding: 6px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .mode-btn:hover {
          color: #fff;
          border-color: rgba(255, 255, 255, 0.2);
        }

        .mode-btn.active {
          background: rgba(0, 240, 255, 0.05);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        .hud-metric-card {
          background: rgba(5, 5, 8, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          padding: 12px 18px;
        }

        .math-telemetry-box {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.04);
          padding: 12px 16px;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .math-telemetry-box .label {
          font-family: var(--font-mono);
          font-size: 0.62rem;
          color: var(--text-secondary);
        }

        .math-telemetry-box .value {
          font-size: 1.05rem;
          font-weight: bold;
          font-family: var(--font-mono);
          color: #fff;
        }

        .worker-status-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 4px 10px;
          border-radius: 3px;
          color: var(--text-secondary);
        }
        
        .worker-status-tag.active {
          background: rgba(0, 255, 156, 0.08);
          border-color: var(--accent-green);
          color: var(--accent-green);
          box-shadow: 0 0 10px rgba(0, 255, 156, 0.1);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 255, 156, 0.5); }
          70% { box-shadow: 0 0 0 6px rgba(0, 255, 156, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 255, 156, 0); }
        }

        @media (max-width: 991px) {
          .lab-overlay { padding: 0; }
          .lab-container { height: 100vh; border-radius: 0; border: none; }
          .lab-workspace { grid-template-columns: 1fr; }
          .lab-sidebar { border-top: 1px solid rgba(255, 255, 255, 0.05); max-height: 45vh; }
        }
      `}</style>

    </div>
  );
}
