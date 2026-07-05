"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiHome,
  FiUser,
  FiBookOpen,
  FiStar,
  FiGrid,
  FiLayers,
  FiMessageSquare,
  FiSend,
  FiArrowUp,
  FiSettings,
  FiX,
  FiCheck,
} from "react-icons/fi";
import { useTheme, ACCENTS } from "./ThemeContext";

const NAV = [
  { icon: FiHome, href: "#home", label: "Home" },
  { icon: FiUser, href: "#about", label: "About" },
  { icon: FiBookOpen, href: "#education", label: "Education" },
  { icon: FiStar, href: "#work", label: "Work" },
  { icon: FiGrid, href: "#services", label: "Services" },
  { icon: FiLayers, href: "#tech", label: "Tech Stack" },
  { icon: FiMessageSquare, href: "#testimonials", label: "Testimonials" },
  { icon: FiSend, href: "#contact", label: "Contact" },
];

export default function NavRail() {
  const [active, setActive] = useState("#home");
  const [panelOpen, setPanelOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // drives the slide-in transition
  const panelRef = useRef(null);
  const gearRef = useRef(null);
  const { theme, accent, toggleTheme, setAccent } = useTheme();

  /* Scroll-spy for section links */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 180;
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.querySelector(NAV[i].href);
        if (el && el.offsetTop <= y) {
          setActive(NAV[i].href);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close panel on outside click / Escape */
  useEffect(() => {
    if (!panelOpen) return;

    function onPointerDown(e) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        gearRef.current &&
        !gearRef.current.contains(e.target)
      ) {
        setPanelOpen(false);
      }
    }
    function onKeyDown(e) {
      if (e.key === "Escape") setPanelOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [panelOpen]);

  /* Trigger the slide/fade transition a frame after mounting */
  useEffect(() => {
    if (panelOpen) {
      setMounted(false);
      const id = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(id);
    }
    setMounted(false);
  }, [panelOpen]);

  return (
    <nav
      className="fixed right-0 top-0 z-40 flex h-screen flex-col items-center justify-between"
      style={{ width: "52px", padding: "22px 0" }}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-1">
        {NAV.map(({ icon: Icon, href, label }) => {
          const isActive = active === href;
          return (
            <a
              key={href}
              href={href}
              aria-label={label}
              onClick={() => setActive(href)}
              className="group relative flex items-center justify-center transition-all duration-200"
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "9px",
                background: isActive ? "var(--accent-dim)" : "transparent",
                color: isActive ? "var(--accent)" : "var(--text-muted)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-muted)";
                }
              }}
            >
              <Icon size={14} />
              <span
                className="pointer-events-none absolute opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                style={{
                  right: "calc(100% + 8px)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "7px",
                  padding: "4px 9px",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  whiteSpace: "nowrap",
                  fontFamily: "Inter",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                {label}
              </span>
            </a>
          );
        })}

        {/* Divider between page links and settings */}
        <div
          style={{
            width: "18px",
            height: "1px",
            background: "var(--border-strong)",
            margin: "8px 0",
          }}
        />

        {/* Settings trigger — last item in the rail, opens the Configuration panel */}
        <div style={{ position: "relative" }}>
          <button
            ref={gearRef}
            onClick={() => setPanelOpen((o) => !o)}
            aria-label="Open appearance settings"
            aria-expanded={panelOpen}
            className="group relative flex items-center justify-center transition-all duration-200"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "9px",
              background: panelOpen ? "var(--accent-dim)" : "transparent",
              color: panelOpen ? "var(--accent)" : "var(--text-muted)",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (!panelOpen) {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }
            }}
            onMouseLeave={(e) => {
              if (!panelOpen) {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--text-muted)";
              }
            }}
          >
            <FiSettings size={14} />
            {!panelOpen && (
              <span
                className="pointer-events-none absolute opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                style={{
                  right: "calc(100% + 8px)",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-strong)",
                  borderRadius: "7px",
                  padding: "4px 9px",
                  fontSize: "11px",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  whiteSpace: "nowrap",
                  fontFamily: "Inter",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                Settings
              </span>
            )}
          </button>

          {/* ── Configuration drawer — full-height sidebar, slides in from the right edge ── */}
          {panelOpen && (
            <div
              ref={panelRef}
              role="dialog"
              aria-label="Appearance settings"
              style={{
                position: "fixed",
                right: 0,
                top: 0,
                height: "100vh",
                width: "320px",
                transform: mounted ? "translateX(0)" : "translateX(24px)",
                opacity: mounted ? 1 : 0,
                transition:
                  "opacity 0.28s ease, transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
                zIndex: 60,
                background: "var(--bg-card)",
                borderLeft: "1px solid var(--border-strong)",
                padding: "28px 24px",
                boxShadow: "-24px 0 48px rgba(0,0,0,0.4)",
                overflowY: "auto",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "28px",
                }}
              >
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    fontFamily: "Space Grotesk",
                  }}
                >
                  Configuration
                </span>
                <button
                  onClick={() => setPanelOpen(false)}
                  aria-label="Close settings"
                  style={{
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "none",
                    border: "none",
                    borderRadius: "6px",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--bg-card-border)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "none";
                    e.currentTarget.style.color = "var(--text-muted)";
                  }}
                >
                  <FiX size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Theme toggle */}
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  marginBottom: "12px",
                  fontFamily: "Inter",
                }}
              >
                Theme
              </p>
              <div
                style={{ display: "flex", gap: "8px", marginBottom: "32px" }}
              >
                {["dark", "light"].map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleTheme()}
                    style={{
                      flex: 1,
                      padding: "9px 0",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "Inter",
                      background:
                        theme === t ? "var(--accent)" : "var(--bg-card-border)",
                      color: theme === t ? "#000" : "var(--text-secondary)",
                      border: "none",
                      transition: "all 0.2s",
                      textTransform: "capitalize",
                    }}
                  >
                    {t === "dark" ? "Dark" : "Light"}
                  </button>
                ))}
              </div>

              {/* Color list — matches the reference layout */}
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "12px",
                  fontFamily: "Space Grotesk",
                }}
              >
                Color
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                {ACCENTS.map(({ id, label, hex }) => {
                  const selected = accent === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setAccent(id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        padding: "11px 12px",
                        borderRadius: "12px",
                        background: selected
                          ? "var(--accent-dim)"
                          : "transparent",
                        border: "1px solid transparent",
                        borderColor: selected
                          ? "var(--accent-border)"
                          : "transparent",
                        cursor: "pointer",
                        transition: "background 0.15s, border-color 0.15s",
                        width: "100%",
                        textAlign: "left",
                      }}
                      onMouseEnter={(e) => {
                        if (!selected)
                          e.currentTarget.style.background =
                            "var(--bg-card-border)";
                      }}
                      onMouseLeave={(e) => {
                        if (!selected)
                          e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          background: hex,
                          flexShrink: 0,
                          border: "1px solid rgba(255,255,255,0.15)",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "var(--text-primary)",
                          fontFamily: "Inter",
                          flex: 1,
                        }}
                      >
                        {label}
                      </span>
                      {selected && (
                        <FiCheck
                          size={16}
                          style={{ color: "var(--accent)", flexShrink: 0 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Back to top */}
      <a
        href="#home"
        aria-label="Back to top"
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "9px",
          background: "var(--bg-card-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--text-secondary)",
          textDecoration: "none",
          transition: "background 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--accent-dim)";
          e.currentTarget.style.color = "var(--accent)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--bg-card-border)";
          e.currentTarget.style.color = "var(--text-secondary)";
        }}
      >
        <FiArrowUp size={13} />
      </a>
    </nav>
  );
}
