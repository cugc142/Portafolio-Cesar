import React from "react";
import {
  FaRocket,
  FaLaptopCode,
  FaTasks,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import { SiTailwindcss, SiTypescript } from "react-icons/si";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import RevealSection from "../components/RevealSection";

// ===== Animaciones CSS-in-JS =====
const ANIM_CSS = `
@media (prefers-reduced-motion: no-preference) {
  .float-slow { animation: floatY 7s ease-in-out infinite; }
  .float-delay { animation: floatY 8.5s ease-in-out infinite 1.2s; }
  .tilt-hover { transition: transform .35s ease; }
  .tilt-hover:hover { transform: perspective(900px) rotateX(2deg) rotateY(-2deg) scale(1.02); }
  .kenburns { overflow: hidden; }
  .kenburns > img { transform-origin: center; animation: kenburns 12s ease-in-out infinite alternate; }
  .parallax-1 { transform: translateY(var(--parallax, 0px)); will-change: transform; }

  @keyframes floatY { 0% { transform: translateY(0); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0); } }
  @keyframes kenburns { 0% { transform: scale(1); } 100% { transform: scale(1.06); } }
}
`;

// ===== Componentes Reutilizables =====
const GlassCard: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <motion.div
    className={`relative group rounded-3xl p-[1px] bg-gradient-to-br from-white/40 via-white/10 to-white/5 shadow-2xl shadow-black/20 ${className}`}
    initial={{ opacity: 0, y: 20, scale: 0.97 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ amount: 0.25 }}
    transition={{ type: "spring", stiffness: 120, damping: 22 }}
    whileHover={{ y: -2, scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    style={{ willChange: "transform, opacity" }}
  >
    <motion.div
      className="rounded-[calc(1.5rem-1px)] bg-white/10 backdrop-blur-xl ring-1 ring-white/15 transition-all duration-300 group-hover:bg-white/15 group-hover:ring-white/25"
      layout
    >
      {children}
    </motion.div>
  </motion.div>
);

const SectionHeader: React.FC<{
  icon: React.ReactNode;
  tag: string;
  tagColor: string;
  gradient: string;
  title: string;
}> = ({ icon, tag, tagColor, gradient, title }) => (
  <motion.div
    className="space-y-4 md:space-y-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ amount: 0.3 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    <motion.div
      className="flex items-center gap-3 md:gap-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className={`p-2 md:p-3 rounded-full ${gradient} shadow-lg shadow-black/30`}>
        {icon}
      </div>
      <span className={`${tagColor} font-semibold text-base md:text-lg tracking-wide`}>{tag}</span>
    </motion.div>

    <motion.h2
      className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {title}{" "}
      <span className="bg-gradient-to-r bg-clip-text text-transparent block">{tag}</span>
    </motion.h2>
  </motion.div>
);

type GlowVariant = "blue" | "green" | "warm" | "teal" | "white";

const GlowBelow: React.FC<{
  variant?: GlowVariant;
  widthClass?: string;
  heightClass?: string;
  className?: string;
}> = ({ variant = "white", widthClass = "w-[85%]", heightClass = "h-16 md:h-20", className = "" }) => {
  const glowClasses = {
    blue: "from-blue-400/35 via-purple-500/20",
    green: "from-green-400/35 via-cyan-400/20",
    warm: "from-amber-300/35 via-orange-400/20",
    teal: "from-cyan-400/35 via-teal-400/20",
    white: "from-white/25 via-gray-300/10",
  };
  return (
    <motion.div
      className={["absolute -bottom-3 left-1/2 -translate-x-1/2", widthClass, heightClass, "pointer-events-none blur-3xl", className].join(" ")}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: "transform, opacity" }}
    >
      <motion.div
        className={["w-full h-full bg-gradient-to-t to-transparent blur-3xl pointer-events-none", glowClasses[variant]].join(" ")}
        animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
      />
    </motion.div>
  );
};

// ===== Datos de Tareas / Proyectos =====
type Task = {
  id: number;
  title: string;
  description: string;
  imageUrl?: string | null;
  link?: string | null;
  repo?: string | null; 
  desp?: string | null; 
};

const tasksData: Task[] = [
  { id: 1, title: "Glosario Desarrollo Web", description: "Significado de siglas vistas en clase.",  link: "/glosario" },
  { id: 2, title: "Formulario de Registro", description: "Uso de diferentes inputs para formulario.", link: "/tarea2", repo: "https://github.com/cugc142/mi-formulario.git" },
  { id: 3, title: "Aplicaciones Responsivas", description: "Diseño responsive con CSS Grid y Flexbox.", repo: "https://github.com/cugc142/responsivo-cesar.git", desp: "https://responsivo-cesar-4l6g9meiu-cugc142s-projects.vercel.app/" },
  { id: 4, title: "API de Gestiones", description: "CRUD de expedientes y usuarios con NodeJS, TypeScript y SQL.", repo: "https://github.com/cugc142/cesar-api.git" },
  { id: 5, title: "Frontend de API", description: "React, TailwindCSS, Heroicons y SweetAlert2.", repo: "https://github.com/cugc142/frontend.git" },
  { id: 6, title: "Certificación FreeCodeCamp", description: "FrontEnd Development Libraries.", link: "https://www.freecodecamp.org/certification/fcc-d5900324-da87-4668-8079-6a3b051b0d59/front-end-development-libraries" }
];

// ===== Iconos =====
const GitHubIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.31.678.923.678 1.861 0 1.343-.012 2.426-.012 2.753 0 .268.18.58.688.482C17.137 18.196 20 14.44 20 10.017 20 4.484 15.523 0 10 0z" clipRule="evenodd" />
  </svg>
);

// ===== Sección Tareas =====
export default function Homepage() {
  return (
    <div className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <style>{ANIM_CSS}</style>

      {/* ===== Hero ===== */}
      <RevealSection>
        <SectionHeader
          icon={<FaRocket className="text-white w-6 h-6" />}
          tag="Inicio"
          tagColor="text-white/80"
          gradient="bg-gradient-to-r from-purple-500 to-pink-500"
          title="Bienvenido a mi Portafolio"
        />
      </RevealSection>

      {/* ===== Desarrollo ===== */}
      <RevealSection>
        <SectionHeader
          icon={<FaLaptopCode className="text-white w-6 h-6" />}
          tag="Desarrollo"
          tagColor="text-white/80"
          gradient="bg-gradient-to-r from-blue-400 to-cyan-400"
          title="Habilidades y Tecnologías"
        />
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[FaHtml5, FaCss3Alt, FaJs, SiTypescript, FaReact, SiTailwindcss, FaNodeJs].map((Icon, i) => (
            <GlassCard key={i} className="flex justify-center items-center h-24">
              <Icon className="w-12 h-12 text-white" />
            </GlassCard>
          ))}
        </div>
      </RevealSection>

      {/* ===== Tareas / Proyectos ===== */}
      <RevealSection>
        <SectionHeader
          icon={<FaTasks className="text-white w-6 h-6" />}
          tag="Proyectos"
          tagColor="text-white/80"
          gradient="bg-gradient-to-r from-green-400 to-teal-400"
          title="Mis Tareas y Proyectos"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasksData.map((task) => (
            <GlassCard key={task.id} className="relative h-80">
              {task.imageUrl && (
                <div className="h-36 w-full overflow-hidden rounded-t-2xl">
                  <img src={task.imageUrl} alt={task.title} className="h-full w-full object-cover" />
                </div>
              )}
              <div className="p-4 flex flex-col justify-between h-[calc(100%-9rem)]">
                <div>
                  <h3 className="text-xl font-semibold text-white">{task.title}</h3>
                  <p className="text-sm text-white/70 mt-1">{task.description}</p>
                </div>
                <div className="flex gap-3 mt-4">
                  {task.link && (
                    <Link
                      to={task.link}
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:opacity-90 transition"
                    >
                      Ver
                    </Link>
                  )}
                  {task.repo && (
                    <a
                      href={task.repo}
                      target="_blank"
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white text-sm font-medium hover:opacity-90 transition flex items-center gap-1"
                    >
                      <GitHubIcon /> Repo
                    </a>
                  )}
                  {task.desp && (
                    <a
                      href={task.desp}
                      target="_blank"
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-teal-400 text-white text-sm font-medium hover:opacity-90 transition"
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
              <GlowBelow variant="green" />
            </GlassCard>
          ))}
        </div>
      </RevealSection>
    </div>
  );
}
