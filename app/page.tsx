'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { 
  Wind, 
  Settings, 
  VolumeX, 
  Volume2, 
  Sun, 
  Smartphone, 
  Check, 
  Compass, 
  FileText, 
  X, 
  Heart, 
  Sparkles, 
  Download,
  Camera,
  Trash2,
  Upload
} from 'lucide-react';

// ---------------------------------------------------------
// Luxury Palettes and Celestial Themes
// ---------------------------------------------------------
interface Theme {
  id: string;
  name: string;
  poeticName: string;
  bgGradient: string;
  petalGrad: string;
  petalHoverGrad: string;
  stamenBg: string;
  antherBg: string;
  centerBg: string;
  centerGlow: string;
  glowColor: string;
  accentClass: string;
  sphereColor: string;
}

const THEMES: Theme[] = [
  {
    id: 'midnight',
    name: 'Midnight Bloom',
    poeticName: 'Oasis Celestial',
    bgGradient: 'from-[#0b0312] via-[#050109] to-[#010005]',
    petalGrad: 'linear-gradient(rgba(255, 255, 255, 0.98), rgba(255, 122, 147, 0.95) 55%, rgba(212, 255, 141, 0.85))',
    petalHoverGrad: 'linear-gradient(#ffffff, rgba(255, 87, 122, 0.98) 55%, rgba(181, 230, 98, 0.9))',
    stamenBg: '#b5d596',
    antherBg: '#ffa500',
    centerBg: '#fffacd',
    centerGlow: 'rgba(255, 250, 205, 0.82)',
    glowColor: 'rgba(255, 107, 139, 0.25)',
    accentClass: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    sphereColor: 'bg-rose-500',
  },
  {
    id: 'solar',
    name: 'Solar Glow',
    poeticName: 'Sol de Corona',
    bgGradient: 'from-[#140b00] via-[#040200] to-[#0d0500]',
    petalGrad: 'linear-gradient(rgba(18, 12, 8, 0.96), rgba(245, 130, 48, 0.95) 60%, rgba(255, 215, 0, 0.9))',
    petalHoverGrad: 'linear-gradient(rgba(35, 25, 15, 0.98), rgba(255, 107, 0, 0.98) 55%, rgba(255, 235, 50, 0.95))',
    stamenBg: '#d97706',
    antherBg: '#fef08a',
    centerBg: '#f59e0b',
    centerGlow: 'rgba(245, 158, 11, 0.85)',
    glowColor: 'rgba(245, 130, 48, 0.35)',
    accentClass: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    sphereColor: 'bg-amber-600',
  },
  {
    id: 'aurora',
    name: 'Aurora Borealis',
    poeticName: 'Luzes do Norte',
    bgGradient: 'from-[#01141a] via-[#010408] to-[#040e1c]',
    petalGrad: 'linear-gradient(rgba(250, 255, 255, 0.96), rgba(20, 217, 184, 0.9) 65%, rgba(138, 43, 226, 0.85))',
    petalHoverGrad: 'linear-gradient(rgba(255, 255, 255, 0.98), rgba(0, 240, 190, 0.95) 55%, rgba(162, 70, 255, 0.92))',
    stamenBg: '#2cc9b0',
    antherBg: '#d8b4fe',
    centerBg: '#22d3ee',
    centerGlow: 'rgba(34, 211, 238, 0.85)',
    glowColor: 'rgba(20, 217, 184, 0.3)',
    accentClass: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    sphereColor: 'bg-emerald-500',
  },
  {
    id: 'luna',
    name: 'Luna Eclipse',
    poeticName: 'Serenata da Lua',
    bgGradient: 'from-[#080d1a] via-[#020409] to-[#120b24]',
    petalGrad: 'linear-gradient(rgba(255, 255, 255, 0.98), rgba(181, 194, 255, 0.88) 60%, rgba(125, 249, 255, 0.78))',
    petalHoverGrad: 'linear-gradient(rgba(255, 255, 255, 1), rgba(138, 160, 255, 0.98) 55%, rgba(70, 235, 245, 0.88))',
    stamenBg: '#93c5fd',
    antherBg: '#e0f2fe',
    centerBg: '#cbd5e1',
    centerGlow: 'rgba(203, 213, 225, 0.85)',
    glowColor: 'rgba(181, 194, 255, 0.25)',
    accentClass: 'text-blue-300 bg-blue-500/10 border-blue-500/20',
    sphereColor: 'bg-indigo-500',
  }
];

const CHIME_PITCHES = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.00, // G4
  440.00, // A4
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.00, // A5
];

const MELODY_SEQUENCE = [0, 2, 4, 1, 3, 5];
const MELODY_NAMES = ["Nota Sol", "Nota Si", "Nota Re", "Nota La", "Nota Do", "Nota Mi"];

function CelestialLilyGarden() {
  const [proposalStep, setProposalStep] = useState<'names' | 'letter' | 'accepted'>('names');
  const [partnerName] = useState<string>('Samara');
  const [senderName] = useState<string>('Mateus');
  const [loveLetter] = useState<string>(
    `Eu poderia escrever mil linhas de código,
criar os sistemas mais complexos do mundo,
mas existe um bug que nunca consegui corrigir:
o fato de que meu coração sempre dá overflow quando está perto de você.

Entre todas as flores que existem,
você escolheu os lírios.
E talvez seja porque eles sejam como você:
delicados, raros, elegantes,
e capazes de transformar qualquer lugar apenas por existir.

Se a minha vida fosse um programa,
você seria a função que eu chamaria todos os dias.
O meu commit favorito.
O meu "hello world" depois de tantos erros.

Eu não preciso de inteligência artificial
para prever o meu futuro,
porque existe uma única resposta que meu coração sempre retorna:
é você.

Você chegou como uma atualização inesperada,
corrigiu falhas que eu nem sabia que tinha,
e trouxe novas cores para uma tela que antes era apenas código em preto e branco.

Então hoje eu quero fazer um deploy definitivo desse sentimento.

Chega de estar em fase de testes.
Chega de versão beta.

Eu quero lançar a nossa versão 1.0.

Você aceita deixar de ser a minha "namorada não oficial"
para ser oficialmente a minha namorada?

E prometo cuidar do nosso amor como o código mais precioso que já escrevi:
com paciência, atenção,
manutenção constante,
e sem nunca deixar o nosso servidor cair.

Com amor,
o programador que encontrou no seu lírio favorito
o motivo mais bonito para florescer.`
  );

  const [petalCount, setPetalCount] = useState<number>(6);
  const [bloomLevel, setBloomLevel] = useState<number>(1.0);
  const [windLevel, setWindLevel] = useState<number>(2);
  const [musicMuted, setMusicMuted] = useState<boolean>(false);
  const [activeTheme, setActiveTheme] = useState<Theme>(THEMES[0]);

  const [hoveredPetalIdx, setHoveredPetalIdx] = useState<number | null>(null);
  const [isCenterHovered, setIsCenterHovered] = useState<boolean>(false);
  const [synthFrequency, setSynthFrequency] = useState<number>(0);
  
  const [noButtonClicks, setNoButtonClicks] = useState<number>(0);
  const noButtonTexts = [
    "Nao",
    "Tem certeza?",
    "Pense com todo o carinho...",
    "Nem em outra constelacao?",
    "E se eu soltar mais mil lanternas?",
    "Ok, talvez sim!"
  ];

  const [currentMelodyStep, setCurrentMelodyStep] = useState<number>(0);
  const [lanternsCount, setLanternsCount] = useState<number>(12);
  
  const [activeDrawer, setActiveDrawer] = useState<'none' | 'notes' | 'settings' | 'themes' | 'letter'>('none');
  const [isWallpaperModalOpen, setIsWallpaperModalOpen] = useState<boolean>(false);
  const [wallpaperRatio, setWallpaperRatio] = useState<'9:16' | '19.5:9' | '1:1'>('9:16');
  const [wallpaperMessage, setWallpaperMessage] = useState<string>('Sintonizados sob as lanternas');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedImageSrc, setGeneratedImageSrc] = useState<string | null>(null);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);
  const [photoStyle, setPhotoStyle] = useState<'portrait' | 'background' | 'none'>('portrait');

  const [isTouch] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    return false;
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientHumRef = useRef<BiquadFilterNode | null>(null);

  const musicMutedRef = useRef<boolean>(musicMuted);
  const activeThemeRef = useRef<Theme>(activeTheme);
  const windLevelRef = useRef<number>(windLevel);
  const triggerChimeRef = useRef<(petalIndex: number) => void>(() => {});
  const spawnSporesRef = useRef<((x: number, y: number, count: number) => void) | null>(null);
  const launchLanternsRef = useRef<((count: number) => void) | null>(null);

  useEffect(() => {
    musicMutedRef.current = musicMuted;
  }, [musicMuted]);

  useEffect(() => {
    activeThemeRef.current = activeTheme;
  }, [activeTheme]);

  useEffect(() => {
    windLevelRef.current = windLevel;
  }, [windLevel]);

  const selectedMelodyPetal = MELODY_SEQUENCE[currentMelodyStep] % petalCount;

  // ---------------------------------------------------------
  // Sound Synthesis API
  // ---------------------------------------------------------
  const startAmbientAtmosphere = useCallback(() => {
    if (!audioContextRef.current) return;
    try {
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;

      const carrier = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const mainGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      carrier.type = 'sine';
      carrier.frequency.setValueAtTime(55, now);

      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.2, now);
      lfoGain.gain.setValueAtTime(10, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, now);
      filter.Q.setValueAtTime(1.2, now);

      mainGain.gain.setValueAtTime(0.02, now);

      lfo.connect(lfoGain);
      lfoGain.connect(carrier.frequency);
      carrier.connect(filter);
      filter.connect(mainGain);
      mainGain.connect(ctx.destination);

      carrier.start(now);
      lfo.start(now);
      ambientHumRef.current = filter;
    } catch (e) {
      console.warn("Could not start ambient audio context", e);
    }
  }, []);

  const initAudio = useCallback(() => {
    if (musicMutedRef.current) return;
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
        startAmbientAtmosphere();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, [startAmbientAtmosphere]);

  const triggerChime = useCallback((petalIndex: number) => {
    initAudio();
    if (musicMutedRef.current || !audioContextRef.current) return;

    try {
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;

      const pitchIdx = petalIndex % CHIME_PITCHES.length;
      const frequency = CHIME_PITCHES[pitchIdx];
      setSynthFrequency(Math.round(frequency));

      const osc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const strikeOsc = ctx.createOscillator();
      const strikeGain = ctx.createGain();

      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const delay = ctx.createDelay();
      const feedback = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(frequency, now);

      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(frequency * 2.008, now);

      strikeOsc.type = 'sine';
      strikeOsc.frequency.setValueAtTime(frequency * 4.23, now);
      
      strikeGain.gain.setValueAtTime(0, now);
      strikeGain.gain.linearRampToValueAtTime(0.06, now + 0.003);
      strikeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      delay.delayTime.setValueAtTime(0.35, now);
      feedback.gain.setValueAtTime(0.25, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1500, now);
      filter.frequency.exponentialRampToValueAtTime(320, now + 0.8);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(filter);
      subOsc.connect(filter);
      strikeOsc.connect(strikeGain);
      strikeGain.connect(filter);
      filter.connect(gain);
      
      gain.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(ctx.destination);

      gain.connect(ctx.destination);

      osc.start(now);
      subOsc.start(now);
      strikeOsc.start(now);
      
      osc.stop(now + 2.2);
      subOsc.stop(now + 2.2);
      strikeOsc.stop(now + 0.1);
    } catch (e) {
      console.error(e);
    }
  }, [initAudio]);

  const triggerCenterSwell = useCallback(() => {
    initAudio();
    if (musicMutedRef.current || !audioContextRef.current) return;

    try {
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;
      setSynthFrequency(110);

      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 1.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(185, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + 0.8);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 2.0);

      for (let i = 0; i < petalCount; i++) {
        setTimeout(() => {
          triggerChime(i);
        }, i * 140);
      }
    } catch (e) {
      console.error(e);
    }
  }, [initAudio, triggerChime, petalCount]);

  useEffect(() => {
    triggerChimeRef.current = triggerChime;
  }, [triggerChime]);

  // Adjust lowpass in response to wind slider variations
  useEffect(() => {
    if (ambientHumRef.current && audioContextRef.current) {
      const now = audioContextRef.current.currentTime;
      ambientHumRef.current.frequency.exponentialRampToValueAtTime(
        120 + windLevel * 45,
        now + 0.8
      );
    }
  }, [windLevel]);

  // ---------------------------------------------------------
  // High-Performance Celestial Canvas (Descending Lanterns/Stars)
  // ---------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Star {
      x: number;
      y: number;
      originalX: number;
      originalY: number;
      size: number;
      depth: number;
      twinkleSpeed: number;
      twinklePhase: number;
    }

    interface Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      alpha: number;
      speedX: number;
      speedY: number;
      life: number;
      maxLife: number;
    }

    interface SkyLantern {
      x: number;
      y: number;
      size: number;
      height: number;
      speedY: number;
      speedX: number;
      wiggle: number;
      wiggleSpeed: number;
      alpha: number;
    }

    const stars: Star[] = Array.from({ length: 65 }).map(() => {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      return {
        x: rx,
        y: ry,
        originalX: rx,
        originalY: ry,
        size: Math.random() * 1.3 + 0.3,
        depth: Math.random() * 0.3 + 0.1,
        twinkleSpeed: Math.random() * 0.012 + 0.003,
        twinklePhase: Math.random() * Math.PI * 2,
      };
    });

    let spores: Particle[] = [];
    let lanterns: SkyLantern[] = [];

    spawnSporesRef.current = (px, py, count) => {
      const colors = ['#ffd6e0', '#fef08a', '#a7f3d0', '#bae6fd'];
      for (let i = 0; i < count; i++) {
        spores.push({
          x: px,
          y: py,
          size: Math.random() * 1.8 + 0.6,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1.0,
          speedX: (Math.random() - 0.5) * 1.2 + (windLevelRef.current * 0.15),
          speedY: (Math.random() - 0.7) * 1.0 - 0.2,
          life: 0,
          maxLife: Math.random() * 60 + 40,
        });
      }
    };

    // User requested that lanterns float DOWNWARD from the top of the viewport
    launchLanternsRef.current = (count: number) => {
      setLanternsCount(prev => prev + count);
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 10 + 7;
        lanterns.push({
          x: Math.random() * width,
          y: -40 - Math.random() * 180, // Descending from above
          size,
          height: size * 1.3,
          speedY: Math.random() * 0.45 + 0.25, // positive speed causes downward drift
          speedX: (Math.random() - 0.5) * 0.12,
          wiggle: Math.random() * Math.PI * 2,
          wiggleSpeed: Math.random() * 0.012 + 0.004,
          alpha: Math.random() * 0.3 + 0.7,
        });
      }
    };

    // Prepopulate background with a few gorgeous floating lanterns falling from above
    for (let i = 0; i < 8; i++) {
      const size = Math.random() * 8 + 5;
      lanterns.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.6, // Placed randomly in upper half initially
        size,
        height: size * 1.3,
        speedY: Math.random() * 0.22 + 0.12, // positive downward speed
        speedX: (Math.random() - 0.5) * 0.06,
        wiggle: Math.random() * Math.PI * 2,
        wiggleSpeed: Math.random() * 0.008 + 0.002,
        alpha: Math.random() * 0.35 + 0.45,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const tX = mouseRef.current.active ? (mouseRef.current.x - width / 2) * 0.02 : 0;
      const tY = mouseRef.current.active ? (mouseRef.current.y - height / 2) * 0.02 : 0;

      // Draw Twinkling Stars
      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed;
        const alpha = 0.2 + Math.abs(Math.sin(star.twinklePhase)) * 0.8;
        const windDrift = Math.sin(star.twinklePhase) * windLevelRef.current * 0.05;

        star.x += (star.originalX + tX * star.depth + windDrift - star.x) * 0.08;
        star.y += (star.originalY + tY * star.depth - star.y) * 0.08;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(254, 250, 224, ${alpha})`;
        ctx.fill();
      }

      // Draw and update procedural Lanterns descending from above
      lanterns = lanterns.filter(lantern => {
        lantern.wiggle += lantern.wiggleSpeed;
        const windDrift = windLevelRef.current * 0.1;
        
        lantern.x += lantern.speedX + windDrift;
        lantern.y += lantern.speedY; // Falling/drifting downwards

        // Reset to top if out of bounds (at the bottom)
        if (lantern.y > height + 40) {
          lantern.y = -40;
          lantern.x = Math.random() * width;
        }

        ctx.save();
        ctx.globalAlpha = lantern.alpha;
        ctx.translate(lantern.x, lantern.y);
        ctx.rotate(Math.sin(lantern.wiggle) * 0.05);

        // Core paper structure
        ctx.beginPath();
        const wTop = lantern.size * 1.15;
        const wBottom = lantern.size * 0.8;
        const lh = lantern.height;

        ctx.moveTo(-wTop / 2, -lh / 2);
        ctx.lineTo(wTop / 2, -lh / 2);
        ctx.lineTo(wBottom / 2, lh / 2);
        ctx.lineTo(-wBottom / 2, lh / 2);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, lh / 2, 0, -lh / 2);
        const code = activeThemeRef.current.id;
        if (code === 'midnight') {
          grad.addColorStop(0, 'rgba(234, 88, 12, 0.95)');
          grad.addColorStop(0.5, 'rgba(244, 63, 94, 0.9)');
          grad.addColorStop(1, 'rgba(255, 241, 242, 0.95)');
        } else if (code === 'solar') {
          grad.addColorStop(0, 'rgba(220, 38, 38, 0.95)');
          grad.addColorStop(0.5, 'rgba(245, 158, 11, 0.9)');
          grad.addColorStop(1, 'rgba(254, 240, 138, 0.95)');
        } else if (code === 'aurora') {
          grad.addColorStop(0, 'rgba(13, 148, 136, 0.95)');
          grad.addColorStop(0.5, 'rgba(20, 184, 166, 0.9)');
          grad.addColorStop(1, 'rgba(238, 242, 255, 0.95)');
        } else {
          grad.addColorStop(0, 'rgba(79, 70, 229, 0.95)');
          grad.addColorStop(0.5, 'rgba(147, 197, 253, 0.9)');
          grad.addColorStop(1, 'rgba(240, 249, 255, 0.95)');
        }

        ctx.fillStyle = grad;
        ctx.fill();

        // Hot burning wick glow effect at the bottom base
        ctx.beginPath();
        ctx.arc(0, lh / 2 - 2, lantern.size * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#fdba74';
        ctx.fill();

        ctx.restore();
        return true;
      });

      // Draw Flower Spores
      spores = spores.filter(spore => {
        spore.life++;
        spore.x += spore.speedX;
        spore.y += spore.speedY;
        spore.alpha = 1.0 - (spore.life / spore.maxLife);

        if (spore.life >= spore.maxLife || spore.y < -10) {
          return false;
        }

        ctx.save();
        ctx.globalAlpha = spore.alpha;
        ctx.beginPath();
        ctx.arc(spore.x, spore.y, spore.size, 0, Math.PI * 2);
        ctx.fillStyle = spore.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = spore.color;
        ctx.fill();
        ctx.restore();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      spawnSporesRef.current = null;
      launchLanternsRef.current = null;
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseRef.current = {
      x: e.clientX,
      y: e.clientY,
      active: true,
    };
  };

  const handleMouseLeaveGlobal = () => {
    mouseRef.current.active = false;
  };

  // ---------------------------------------------------------
  // Interaction Logic & Melody Validation
  // ---------------------------------------------------------
  const handlePetalClick = (idx: number) => {
    setHoveredPetalIdx(idx);
    triggerChime(idx);

    if (spawnSporesRef.current) {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      spawnSporesRef.current(halfW, halfH - 12, 10);
    }

    const expectedPetal = MELODY_SEQUENCE[currentMelodyStep] % petalCount;
    if (idx === expectedPetal) {
      if (currentMelodyStep === MELODY_SEQUENCE.length - 1) {
        setCurrentMelodyStep(0);
        if (launchLanternsRef.current) {
          launchLanternsRef.current(32);
        }
      } else {
        setCurrentMelodyStep(prev => prev + 1);
      }
    }
  };

  // ---------------------------------------------------------
  // High-Resolution Non-Blocking Wallpaper Generator
  // ---------------------------------------------------------
  const generateAndDownloadWallpaper = useCallback(() => {
    setTimeout(() => {
      setIsGenerating(true);
      setGeneratedImageSrc(null);
    }, 0);
    
    setTimeout(async () => {
      try {
        const offscreen = document.createElement('canvas');
        let width = 1080;
        let height = 1920;

        if (wallpaperRatio === '19.5:9') {
          width = 1085;
          height = 2340;
        } else if (wallpaperRatio === '1:1') {
          width = 1080;
          height = 1080;
        }

        offscreen.width = width;
        offscreen.height = height;
        const ctx = offscreen.getContext('2d');
        if (!ctx) return;

        // Background Gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
        if (activeTheme.id === 'midnight') {
          bgGrad.addColorStop(0, '#0e0310');
          bgGrad.addColorStop(0.5, '#050109');
          bgGrad.addColorStop(1, '#000002');
        } else if (activeTheme.id === 'solar') {
          bgGrad.addColorStop(0, '#1c0d02');
          bgGrad.addColorStop(0.5, '#060200');
          bgGrad.addColorStop(1, '#020000');
        } else if (activeTheme.id === 'aurora') {
          bgGrad.addColorStop(0, '#021820');
          bgGrad.addColorStop(0.5, '#01050a');
          bgGrad.addColorStop(1, '#010003');
        } else {
          bgGrad.addColorStop(0, '#0b162c');
          bgGrad.addColorStop(0.5, '#03050c');
          bgGrad.addColorStop(1, '#100720');
        }
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Load uploaded image if any
        let loadedImg: HTMLImageElement | null = null;
        if (uploadedImageSrc && photoStyle !== 'none') {
          try {
            loadedImg = await new Promise<HTMLImageElement>((resolve, reject) => {
              const img = new Image();
              img.crossOrigin = 'anonymous';
              img.onload = () => resolve(img);
              img.onerror = (e) => reject(e);
              img.src = uploadedImageSrc;
            });
          } catch (e) {
            console.error("Failed to load uploaded image in wallpaper generator:", e);
          }
        }

        // Background Photo Mode integration
        if (loadedImg && photoStyle === 'background') {
          ctx.save();
          ctx.globalAlpha = 0.22;
          const canvasRatio = width / height;
          const imgRatio = loadedImg.width / loadedImg.height;
          let drawW = width;
          let drawH = height;
          let drawX = 0;
          let drawY = 0;
          if (imgRatio > canvasRatio) {
            drawW = height * imgRatio;
            drawX = (width - drawW) / 2;
          } else {
            drawH = width / imgRatio;
            drawY = (height - drawH) / 2;
          }
          ctx.drawImage(loadedImg, drawX, drawY, drawW, drawH);
          ctx.restore();
        }

        // Core central ambient glow
        const glowRad = width * 0.45;
        const bgGlow = ctx.createRadialGradient(
          width / 2, height / 2, 40,
          width / 2, height / 2, glowRad
        );
        bgGlow.addColorStop(0, activeTheme.glowColor);
        bgGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = bgGlow;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, glowRad, 0, Math.PI * 2);
        ctx.fill();

        // Stardust sparkles
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 120; i++) {
          const starX = Math.random() * width;
          const starY = Math.random() * height;
          const size = Math.random() * 1.8 + 0.4;
          ctx.beginPath();
          ctx.arc(starX, starY, size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Portrait Photo Mode integration (draw above flower/stardust)
        if (loadedImg && photoStyle === 'portrait') {
          ctx.save();
          const cx = width / 2;
          const cy = height * 0.26;
          const radius = width * 0.16;

          // Cozy glow border for portrait
          ctx.shadowBlur = 30;
          ctx.shadowColor = activeTheme.glowColor;

          ctx.fillStyle = '#050209';
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fill();

          ctx.save();
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.clip();

          const imgRatio = loadedImg.width / loadedImg.height;
          let drawW = radius * 2;
          let drawH = radius * 2;
          let drawX = cx - radius;
          let drawY = cy - radius;
          if (imgRatio > 1) {
            drawW = (radius * 2) * imgRatio;
            drawX = cx - (drawW / 2);
          } else {
            drawH = (radius * 2) / imgRatio;
            drawY = cy - (drawH / 2);
          }
          ctx.drawImage(loadedImg, drawX, drawY, drawW, drawH);
          ctx.restore();

          // Outer glowing ring
          ctx.strokeStyle = activeTheme.glowColor;
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.arc(cx, cy, radius + 3, 0, Math.PI * 2);
          ctx.stroke();

          // Warm secondary frame detail
          ctx.strokeStyle = 'rgba(255, 250, 205, 0.45)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, radius + 11, 0, Math.PI * 2);
          ctx.stroke();

          ctx.restore();
        }

        // Draw iconic lily flower center
        ctx.save();
        const centerFlowerX = width / 2;
        const centerFlowerY = wallpaperRatio === '1:1' ? height / 2 : height * 0.58;
        ctx.translate(centerFlowerX, centerFlowerY);

        ctx.shadowBlur = 20;
        ctx.shadowColor = activeTheme.glowColor;

        const totalPetalsToDraw = petalCount;
        for (let pIdx = 0; pIdx < totalPetalsToDraw; pIdx++) {
          const angleValue = (pIdx * 2 * Math.PI) / totalPetalsToDraw;
          ctx.save();
          ctx.rotate(angleValue);
          ctx.globalAlpha = 0.95;

          const petalHeight = 200;
          const petalWidth = 68;

          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-petalWidth / 2, -petalHeight * 0.35, -petalWidth * 0.6, -petalHeight * 0.8, 0, -petalHeight);
          ctx.bezierCurveTo(petalWidth * 0.6, -petalHeight * 0.8, petalWidth / 2, -petalHeight * 0.35, 0, 0);
          ctx.closePath();

          const cGrad = ctx.createLinearGradient(0, 0, 0, -petalHeight);
          if (activeTheme.id === 'midnight') {
            cGrad.addColorStop(0, 'rgba(212, 255, 141, 0.95)');
            cGrad.addColorStop(0.55, 'rgba(255, 122, 147, 0.95)');
            cGrad.addColorStop(1, '#ffffff');
          } else if (activeTheme.id === 'solar') {
            cGrad.addColorStop(0, 'rgba(255, 215, 0, 0.95)');
            cGrad.addColorStop(0.55, 'rgba(245, 130, 48, 0.95)');
            cGrad.addColorStop(1, '#ffffff');
          } else if (activeTheme.id === 'aurora') {
            cGrad.addColorStop(0, 'rgba(138, 43, 226, 0.95)');
            cGrad.addColorStop(0.55, 'rgba(20, 217, 184, 0.95)');
            cGrad.addColorStop(1, '#ffffff');
          } else {
            cGrad.addColorStop(0, 'rgba(125, 249, 255, 0.95)');
            cGrad.addColorStop(0.55, 'rgba(181, 194, 255, 0.95)');
            cGrad.addColorStop(1, '#ffffff');
          }
          ctx.fillStyle = cGrad;
          ctx.fill();
          ctx.restore();
        }

        // Draw center stamen threads
        for (let sIdx = 0; sIdx < totalPetalsToDraw; sIdx++) {
          const sAngle = (sIdx * 2 * Math.PI) / totalPetalsToDraw + (Math.PI / totalPetalsToDraw);
          ctx.save();
          ctx.rotate(sAngle);
          
          const sHeight = 100;
          ctx.lineWidth = 3;
          ctx.strokeStyle = activeTheme.stamenBg;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, -sHeight);
          ctx.stroke();

          ctx.fillStyle = activeTheme.antherBg;
          ctx.beginPath();
          ctx.arc(0, -sHeight - 3, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // Central core disk
        ctx.fillStyle = activeTheme.centerBg;
        ctx.beginPath();
        ctx.arc(0, 0, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore(); // Exit flower translation

        // Add beautiful premium footer text to the Wallpaper
        ctx.save();
        ctx.textAlign = 'center';
        
        const textY = height * 0.83;
        ctx.font = "italic 36px 'Georgia', serif";
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`${senderName} & ${partnerName}`, width / 2, textY);

        ctx.font = "300 20px 'Courier New', monospace";
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fillText(`"${wallpaperMessage}"`, width / 2, textY + 50);

        ctx.restore();

        const imgUrl = offscreen.toDataURL('image/png', 1.0);
        setGeneratedImageSrc(imgUrl);
        setIsGenerating(false);
      } catch (err) {
        console.error(err);
        setIsGenerating(false);
      }
    }, 600);
  }, [wallpaperRatio, wallpaperMessage, activeTheme, petalCount, senderName, partnerName, uploadedImageSrc, photoStyle]);

  useEffect(() => {
    if (isWallpaperModalOpen) {
      generateAndDownloadWallpaper();
    }
  }, [isWallpaperModalOpen, generateAndDownloadWallpaper]);

  const petalsList = Array.from({ length: petalCount }).map((_, index) => {
    const angleValue = (index * 360) / petalCount;
    const angle = `${angleValue}deg`;
    const twirlDeg = `${(index % 2 === 0 ? 1 : -1) * (2 + index * 0.5)}deg`;
    return { index, angle, twirlDeg };
  });

  const stamensList = Array.from({ length: petalCount }).map((_, index) => {
    const angleValue = (index * 360) / petalCount + (180 / petalCount);
    const angle = `${angleValue}deg`;
    return { index, angle };
  });

  return (
    <div 
      className={`min-h-screen bg-gradient-to-b ${activeTheme.bgGradient} flex flex-col items-center justify-between overflow-hidden relative font-sans select-none transition-colors duration-[1500ms]`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveGlobal}
      id="root-viewport"
    >
      {/* Background canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-10" 
        id="bg-sparkle-canvas"
      />

      {/* Decorative ambient glow pools */}
      <div 
        className={`absolute w-[220px] h-[220px] sm:w-[360px] sm:h-[360px] rounded-full gradient-sphere ${activeTheme.sphereColor} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0`}
        style={{
          boxShadow: `0 0 120px 60px ${activeTheme.glowColor}`,
          transform: `translate(-50%, -50%) scale(${0.85 + bloomLevel * 0.35 + (isCenterHovered ? 0.15 : 0)})`,
        }}
        id="pulsating-glow-sphere"
      />

      {/* -----------------------------------------------------------------
          ROMANTIC PROPOSAL SCREENS
         ----------------------------------------------------------------- */}
      {proposalStep !== 'accepted' && (
        <div className="absolute inset-0 flex items-center justify-center z-50 p-4 bg-[#030104]/85 backdrop-blur-xl" id="proposal-wrapper">
          
          {/* STEP 1: Entrance & Names */}
          {proposalStep === 'names' && (
            <div className="w-full max-w-sm glass-panel rounded-3xl p-6 text-center relative border border-white/5 shadow-2xl flex flex-col items-center" id="step-names">
              <div className="w-12 h-12 bg-amber-500/15 border border-amber-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              
              <h2 className="text-2xl font-serif font-light text-white tracking-wide mb-1">
                O Portal de Corona
              </h2>
              <p className="text-[9px] text-[#fffacd]/70 font-mono tracking-widest uppercase mb-6">
                Para: Mateus & Samara
              </p>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 mb-4 text-xs text-white/70 leading-relaxed font-serif">
                Um jardim celestial interativo, onde lírios florescem sob a luz de constelações e mil lanternas douradas flutuam ao vento.
              </div>

              <button
                onClick={() => {
                  initAudio();
                  setProposalStep('letter');
                  if (launchLanternsRef.current) {
                    launchLanternsRef.current(10);
                  }
                }}
                className="w-full mt-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-xl py-3 text-xs font-semibold uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
                id="next-step-btn"
              >
                Entrar no Jardim
              </button>
            </div>
          )}

          {/* STEP 2: The Magnificent Proposal Page */}
          {proposalStep === 'letter' && (
            <div className="w-full max-w-sm glass-panel rounded-3xl p-6 text-center relative border border-rose-500/20" id="step-proposal-letter">
              <div className="mx-auto w-12 h-12 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400/20" />
              </div>

              <h2 className="text-xl font-serif text-white tracking-wide mb-1 italic">
                Para {partnerName}
              </h2>
              <div className="text-[9px] text-white/40 uppercase tracking-widest font-mono mb-3">
                Do seu par, {senderName}
              </div>

              {/* Polished Letter text, completely free of unicode emojis */}
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 mb-4 text-[13.5px] text-white/95 leading-relaxed font-serif text-center whitespace-pre-line overflow-y-auto max-h-[220px] custom-scroll scroll-smooth" id="proposal-letter-body">
                {loveLetter}
              </div>

              <p className="text-xs font-serif font-medium text-amber-200 tracking-wide mb-5">
                Aceita dar o proximo passo comigo e namorar comigo para sempre?
              </p>

              {/* Creative mobile-safe actions */}
              <div className="flex flex-col gap-2" id="proposal-actions">
                <button
                  onClick={() => {
                    initAudio();
                    triggerCenterSwell();
                    setProposalStep('accepted');
                    if (launchLanternsRef.current) {
                      launchLanternsRef.current(45);
                    }
                  }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl py-3 text-xs font-mono uppercase tracking-widest hover:opacity-95 active:scale-[0.98] transition-all shadow-md shadow-emerald-500/15"
                  id="accept-yes-btn"
                  style={{
                    transform: `scale(${1 + noButtonClicks * 0.12})`,
                    transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                >
                  Sim, eu aceito tudo
                </button>

                <button
                  onClick={() => {
                    triggerChime(Math.floor(Math.random() * 5));
                    setNoButtonClicks(prev => prev + 1);
                    if (noButtonClicks >= 5) {
                      initAudio();
                      triggerCenterSwell();
                      setProposalStep('accepted');
                      if (launchLanternsRef.current) {
                        launchLanternsRef.current(45);
                      }
                    }
                  }}
                  className="w-full border border-white/10 text-white/40 hover:text-white/70 bg-white/5 rounded-xl py-2 text-[11px] tracking-wider transition-all duration-300"
                  id="accept-no-btn"
                  style={{
                    transform: `scale(${Math.max(0.6, 1 - noButtonClicks * 0.12)})`,
                    opacity: Math.max(0.4, 1 - noButtonClicks * 0.15)
                  }}
                >
                  {noButtonTexts[noButtonClicks % noButtonTexts.length]}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* -----------------------------------------------------------------
          SATELLITE UPPER HEADER BAR
         ----------------------------------------------------------------- */}
      <header className="w-full max-w-lg mx-auto px-4 pt-4 flex items-center justify-between z-20 pointer-events-auto" id="app-header">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5" id="brand-logo-panel">
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-[pulse_2.5s_infinite]" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-mono">
              Universo de {partnerName}
            </span>
          </div>
          <h1 className="text-sm font-serif text-white/80 font-light mt-0.5 tracking-tight">
            O lirio Magico de Corona
          </h1>
        </div>

        <button
          onClick={() => setMusicMuted(prev => !prev)}
          className={`p-2 rounded-full border transition-all duration-300 ${
            musicMuted 
              ? 'bg-red-500/10 border-red-500/20 text-red-400' 
              : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
          }`}
          id="sound-opt-btn"
        >
          {musicMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </header>

      {/* -----------------------------------------------------------------
          STABILIZED PROCEDURAL INTERACTIVE CENTRAL LILY
         ----------------------------------------------------------------- */}
      <main className="w-full flex-1 flex flex-col items-center justify-center z-20 px-4 py-2 relative" id="garden-viewports-stage">
        
        {/* Flower Stage - Scaled Down for Mobile heights to prevent overlap */}
        <div className="flower-stage-wrapper flex items-center justify-center w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] aspect-square relative" id="flower-arena">
          
          <div className="flower-ground-glow" />

          <div 
            onClick={() => {
              triggerCenterSwell();
              if (spawnSporesRef.current) {
                const centerW = window.innerWidth / 2;
                const centerH = window.innerHeight / 2;
                spawnSporesRef.current(centerW, centerH - 20, 15);
              }
            }}
            onMouseEnter={() => !isTouch && setIsCenterHovered(true)}
            onMouseLeave={() => !isTouch && setIsCenterHovered(false)}
            className={`flower transition-all duration-700 ${isCenterHovered ? 'scale-105' : 'scale-100'} ${proposalStep === 'accepted' ? 'active-bloom' : ''}`}
            style={{
              '--glow-color': activeTheme.glowColor,
              '--sway-duration': '10s',
              '--sway-degrees': '1.8deg',
            } as React.CSSProperties}
            id="vector-lily-flower"
          >
            {/* Render Petals */}
            {petalsList.map((pet) => {
              const isMelodyHighlighted = selectedMelodyPetal === pet.index;
              const isHovered = !isTouch && hoveredPetalIdx === pet.index;

              return (
                <div
                  key={pet.index}
                  onMouseEnter={() => !isTouch && setHoveredPetalIdx(pet.index)}
                  onMouseLeave={() => !isTouch && setHoveredPetalIdx(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePetalClick(pet.index);
                  }}
                  className="petal cursor-pointer"
                  style={{
                    '--angle': pet.angle,
                    '--twirl': pet.twirlDeg,
                    '--petal-scale': isHovered ? 1.05 : isMelodyHighlighted ? 1.02 : 1.0,
                    '--petal-grad': activeTheme.petalGrad,
                    '--petal-hover-grad': activeTheme.petalHoverGrad,
                    animationDelay: `${pet.index * 0.12 + 0.2}s`,
                    border: isMelodyHighlighted ? '1.5px solid rgba(254, 240, 138, 0.4)' : 'none',
                    boxShadow: isMelodyHighlighted ? '0 0 12px rgba(254, 240, 138, 0.4)' : '',
                  } as React.CSSProperties}
                />
              );
            })}

            {/* Render Stamens */}
            {stamensList.map((stam) => (
              <div
                key={stam.index}
                className="stamen stamen-bloom-delayed"
                style={{
                  '--angle': stam.angle,
                  '--index': stam.index,
                  '--stamen-bg': activeTheme.stamenBg,
                  '--anther-bg': activeTheme.antherBg,
                } as React.CSSProperties}
              />
            ))}

            {/* Crystal Core Center */}
            <div 
              className="center"
              style={{
                '--center-bg': activeTheme.centerBg,
                '--center-glow': activeTheme.centerGlow,
                transform: `scale(${isCenterHovered ? 1.15 : 1.0})`,
              } as React.CSSProperties}
            />
          </div>
        </div>

        {proposalStep === 'accepted' && (
          <p className="text-white/30 text-[10px] uppercase font-mono tracking-widest mt-4">
            Toque nas petalas para a melodia
          </p>
        )}
      </main>

      {/* -----------------------------------------------------------------
          MOBILE HUD WITH FIXED FLOATING CONTROLS
         ----------------------------------------------------------------- */}
      <footer className="w-full max-w-md mx-auto px-4 pb-4 z-20 pointer-events-auto relative" id="garden-footer-hud">
        
        {/* Expanded overlay drawer positioned absolutely above bottom menu */}
        {activeDrawer !== 'none' && (
          <div className="absolute bottom-[72px] left-4 right-4 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl text-left z-30 transition-all duration-300 transform translate-y-0" id="expanded-drawer">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
              <span className="text-[9px] uppercase font-mono tracking-widest text-amber-300">
                {activeDrawer === 'notes' && 'Sinfonia de Corona'}
                {activeDrawer === 'themes' && 'Temas Celestiais'}
                {activeDrawer === 'settings' && 'Ajustes de Ambiente'}
                {activeDrawer === 'letter' && 'Sua Declaracao'}
              </span>
              <button 
                onClick={() => setActiveDrawer('none')}
                className="p-1 rounded-full text-white/50 hover:bg-white/10 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* notes sequence */}
            {activeDrawer === 'notes' && (
              <div id="drawer-harmony-sequence">
                <p className="text-[11px] text-white/70 leading-relaxed mb-3">
                  Toque nas notas abaixo para sintonizar a melodia ou acompanhe o brilho dourado nas pétalas da flor:
                </p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {MELODY_SEQUENCE.map((item, idx) => {
                    const isPassed = idx < currentMelodyStep;
                    const isCurrent = idx === currentMelodyStep;
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          const pIdx = item % petalCount;
                          setCurrentMelodyStep(idx);
                          triggerChime(pIdx);
                          if (spawnSporesRef.current) {
                            const halfW = window.innerWidth / 2;
                            const halfH = window.innerHeight / 2;
                            spawnSporesRef.current(halfW, halfH - 12, 12);
                          }
                        }}
                        className={`text-[10.5px] py-2 px-3 rounded-xl font-mono tracking-wide transition-all active:scale-95 cursor-pointer ${
                          isCurrent
                            ? 'bg-amber-500/25 text-amber-200 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-bold'
                            : isPassed
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/10'
                            : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5'
                        }`}
                      >
                        {MELODY_NAMES[idx]}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[9.5px] text-white/40 mt-1 italic">
                  * Toque em cada nota para ouvir seu som e iluminá-la na flor de forma livre, leve e divertida.
                </p>
              </div>
            )}

            {/* themes selector */}
            {activeDrawer === 'themes' && (
              <div className="grid grid-cols-2 gap-1.5" id="drawer-themes-selector">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTheme(t);
                      if (spawnSporesRef.current) {
                        const hWidth = window.innerWidth / 2;
                        const hHeight = window.innerHeight / 2;
                        spawnSporesRef.current(hWidth, hHeight - 20, 15);
                      }
                    }}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      activeTheme.id === t.id
                        ? 'border-rose-400 bg-rose-500/10 text-white'
                        : 'border-white/5 hover:border-white/10 bg-white/[0.02] text-white/50'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-medium">{t.name}</div>
                    <div className="text-[8px] font-sans text-white/30 mt-0.5">{t.poeticName}</div>
                  </button>
                ))}
              </div>
            )}

            {/* settings panel */}
            {activeDrawer === 'settings' && (
              <div className="space-y-3.5" id="drawer-environment-controls">
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-white/50 mb-1">
                    <span>Quantidade de Petalas</span>
                    <span>{petalCount}</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="10"
                    step="1"
                    value={petalCount}
                    onChange={(e) => {
                      setPetalCount(parseInt(e.target.value));
                      setCurrentMelodyStep(0);
                    }}
                    className="w-full h-1"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-mono text-white/50 mb-1">
                    <span>Intensidade do Vento</span>
                    <span>{windLevel}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={windLevel}
                    onChange={(e) => setWindLevel(parseInt(e.target.value))}
                    className="w-full h-1"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                  <button
                    onClick={() => {
                      if (launchLanternsRef.current) {
                        launchLanternsRef.current(6);
                      }
                    }}
                    className="flex-1 py-2 text-center text-[9px] uppercase font-mono tracking-widest text-[#fffacd] bg-amber-500/15 rounded-lg hover:bg-amber-500/25 transition-all border border-amber-500/20"
                  >
                    Lancar 6 Lanternas
                  </button>
                </div>
              </div>
            )}

            {/* letter customizer */}
            {activeDrawer === 'letter' && (
              <div className="space-y-3" id="drawer-love-letter">
                <p className="text-[10px] text-amber-300 font-mono tracking-wider uppercase">
                  Sua Declaracao de Amor
                </p>
                <div 
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl p-3 text-[11.5px] text-white/80 font-serif leading-relaxed h-32 overflow-y-auto whitespace-pre-line custom-scroll text-left"
                >
                  {loveLetter}
                </div>
                <button
                  onClick={() => {
                    setIsWallpaperModalOpen(true);
                    generateAndDownloadWallpaper();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-mono rounded-xl bg-gradient-to-r from-rose-500/10 to-amber-500/10 text-rose-300 hover:text-white border border-rose-500/30 transition-all cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Obter Imagem de Tela</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Static horizontal menu bar (never causes layout shift) */}
        <div className="grid grid-cols-4 gap-1 bg-[#0a0510]/90 backdrop-blur-md rounded-2xl p-1 border border-white/5 shadow-xl">
          <button
            onClick={() => setActiveDrawer(activeDrawer === 'notes' ? 'none' : 'notes')}
            className={`py-2 px-1 text-[9px] font-mono rounded-xl tracking-wider flex flex-col items-center gap-1 transition-all ${
              activeDrawer === 'notes' ? 'bg-rose-500/10 text-rose-300' : 'text-white/60 hover:text-white'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Sinfonia</span>
          </button>

          <button
            onClick={() => setActiveDrawer(activeDrawer === 'themes' ? 'none' : 'themes')}
            className={`py-2 px-1 text-[9px] font-mono rounded-xl tracking-wider flex flex-col items-center gap-1 transition-all ${
              activeDrawer === 'themes' ? 'bg-rose-500/10 text-rose-300' : 'text-white/60 hover:text-white'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>Temas</span>
          </button>

          <button
            onClick={() => setActiveDrawer(activeDrawer === 'settings' ? 'none' : 'settings')}
            className={`py-2 px-1 text-[9px] font-mono rounded-xl tracking-wider flex flex-col items-center gap-1 transition-all ${
              activeDrawer === 'settings' ? 'bg-rose-500/10 text-rose-300' : 'text-white/60 hover:text-white'
            }`}
          >
            <Wind className="w-4 h-4" />
            <span>Ajustes</span>
          </button>

          <button
            onClick={() => setActiveDrawer(activeDrawer === 'letter' ? 'none' : 'letter')}
            className={`py-2 px-1 text-[9px] font-mono rounded-xl tracking-wider flex flex-col items-center gap-1 transition-all ${
              activeDrawer === 'letter' ? 'bg-rose-500/10 text-rose-300' : 'text-white/60 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Carta</span>
          </button>
        </div>
      </footer >

      {/* -----------------------------------------------------------------
          MOBILE-SAFE WALLPAPER PREVIEW & DOWNLOAD DIALOG
         ----------------------------------------------------------------- */}
      {isWallpaperModalOpen && (
        <div className="fixed inset-0 bg-[#000000]/95 backdrop-blur-xl z-50 flex items-center justify-center p-4" id="wallpaper-designer-overlay">
          <div className="w-full max-w-sm max-h-[92vh] overflow-y-auto glass-panel rounded-3xl p-5 relative border border-white/5 scrollbar-none" id="wallpaper-designer-modal">
            
            <button
              onClick={() => setIsWallpaperModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-serif text-white mb-0.5">
              Papel de Parede Corona
            </h3>
            <p className="text-[9px] text-white/40 font-mono tracking-widest mb-4 uppercase">
              Toque e segure para salvar no celular
            </p>

            <div className="space-y-3.5 text-left">
              <div>
                <label className="block text-[9px] uppercase tracking-widest text-[#fffacd] font-mono mb-1.5">
                  Proporcao da Imagem
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['9:16', '19.5:9', '1:1'] as const).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => {
                        setWallpaperRatio(ratio);
                        generateAndDownloadWallpaper();
                      }}
                      className={`py-1 text-[10px] font-mono rounded-lg transition-colors ${
                        wallpaperRatio === ratio
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                          : 'bg-white/5 text-white/50'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-widest text-[#fffacd] font-mono mb-1.5">
                  Frase do Subtitulo
                </label>
                <input
                  type="text"
                  value={wallpaperMessage}
                  onChange={(e) => {
                    setWallpaperMessage(e.target.value.substring(0, 24));
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400/50"
                  placeholder="Ex: Vejo a luz brilhar"
                />
              </div>

              {/* Foto do Casal integration */}
              <div className="border-t border-white/5 pt-3">
                <label className="block text-[9px] uppercase tracking-widest text-[#fffacd] font-mono mb-1.5 flex items-center justify-between">
                  <span>Sua Foto com o Par (Opcional)</span>
                  {uploadedImageSrc && (
                    <button
                      onClick={() => {
                        setUploadedImageSrc(null);
                        setPhotoStyle('none');
                        // Reset file input if present, but since it's controlled by state, this is enough
                      }}
                      className="text-rose-400 hover:text-rose-300 text-[9px] lowercase font-sans flex items-center gap-0.5 cursor-pointer"
                    >
                      <Trash2 className="w-2.5 h-2.5" /> remover
                    </button>
                  )}
                </label>

                {uploadedImageSrc ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-1.5">
                      {(['portrait', 'background', 'none'] as const).map((style) => (
                        <button
                          key={style}
                          onClick={() => setPhotoStyle(style)}
                          className={`py-1 text-[9px] font-mono rounded-lg transition-colors cursor-pointer ${
                            photoStyle === style
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                              : 'bg-white/5 text-white/50 hover:bg-white/10'
                          }`}
                        >
                          {style === 'portrait' && 'Retrato'}
                          {style === 'background' && 'No Fundo'}
                          {style === 'none' && 'Ocultar'}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <label className="flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-white/20 bg-white/5 hover:bg-white/10 hover:border-amber-400/30 transition-all cursor-pointer text-center">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                              if (typeof reader.result === 'string') {
                                setUploadedImageSrc(reader.result);
                                setPhotoStyle('portrait');
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <Camera className="w-4.5 h-4.5 text-amber-300/70 mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] text-white/60">Carregar foto de voces</span>
                      <span className="text-[8px] text-white/30 font-mono mt-0.5">Disparar camera ou galeria</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Real-time high fidelity CSS render window or full canvas preview to bypass sandboxed mobile browser downloads */}
              <div className="border border-white/10 rounded-xl overflow-hidden aspect-[9/16] max-h-[220px] mx-auto bg-black flex items-center justify-center relative">
                {isGenerating || !generatedImageSrc ? (
                  <div className="flex flex-col items-center gap-1.5 text-white/30 text-xs font-mono">
                    <span className="animate-spin h-4 w-4 border-2 border-white/30 border-t-white rounded-full" />
                    <span>Gerando HD...</span>
                  </div>
                ) : (
                  <img 
                    src={generatedImageSrc} 
                    alt="Wallpaper Preview" 
                    className="w-full h-full object-cover active:scale-95 transition-transform"
                    id="pwa-wallpaper-download-img"
                  />
                )}
              </div>

              <div className="text-[10px] text-white/40 leading-normal text-center">
                Dica: Toque e pressione a imagem acima no seu celular para salvar como foto de fundo!
              </div>
            </div>

            <button
              onClick={() => {
                if (generatedImageSrc) {
                  const safeA = document.createElement('a');
                  safeA.href = generatedImageSrc;
                  safeA.download = `Sinfonia_Corona_${senderName}.png`;
                  safeA.click();
                }
              }}
              disabled={isGenerating || !generatedImageSrc}
              className="w-full mt-4 bg-gradient-to-r from-amber-500 to-rose-500 py-2.5 text-white text-[10px] font-mono uppercase tracking-widest rounded-xl hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-20"
              id="generate-hd-download-btn"
            >
              Forcar Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const CelestialLilyGardenDynamic = dynamic(
  () => Promise.resolve(CelestialLilyGarden),
  { ssr: false }
);

export default function Page() {
  return <CelestialLilyGardenDynamic />;
}
