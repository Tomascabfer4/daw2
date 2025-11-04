"use client";

import { useState, useEffect } from 'react';

// --- CONFIGURA AQUÍ LA FECHA DE FIN DE REBAJAS ---
// Formato: AÑO-MES-DÍA T HORA:MINUTO:SEGUNDO
const TARGET_DATE = "2025-11-28T23:59:59"; // Ejemplo: Black Friday 2025

// Función auxiliar para calcular el tiempo restante
const calculateTimeLeft = () => {
  const difference = +new Date(TARGET_DATE) - +new Date();
  let timeLeft = { days: 0, hours: 0, min: 0, sec: 0 };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      min: Math.floor((difference / 1000 / 60) % 60),
      sec: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

export default function SalesCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, min: 0, sec: 0 });
  const [isClient, setIsClient] = useState(false); 

  useEffect(() => {
    // Se ejecuta solo en el navegador
    setIsClient(true); 
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Limpia el temporizador
    return () => clearInterval(timer);
  }, []); 

  // Evita errores de renderizado entre servidor y cliente
  if (!isClient) {
    return null; 
  }

  // Renderiza el contador
  return (
    <div className="flex justify-center gap-5">
      <div>
        <span className="countdown font-mono text-4xl">
          <span style={{ "--value": timeLeft.days }} />
        </span>
        days
      </div>
      <div>
        <span className="countdown font-mono text-4xl">
          <span style={{ "--value": timeLeft.hours }} />
        </span>
        hours
      </div>
      <div>
        <span className="countdown font-mono text-4xl">
          <span style={{ "--value": timeLeft.min }} />
        </span>
        min
      </div>
      <div>
        <span className="countdown font-mono text-4xl">
          <span style={{ "--value": timeLeft.sec }} />
        </span>
        sec
      </div>
    </div>
  );
}