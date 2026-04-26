import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import "@fontsource/bebas-neue";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/jetbrains-mono/800.css";
import "./styles.css";

const logoSrc = "/yellow-logo.png";

const slides = [
  {
    id: "01",
    kicker: "GRANULAR // PITCH DECK II",
    title: "THE ITEMIZED SPENDING LAYER.",
    subtitle: "For everything a household pays for.",
    accent: "green",
    mode: "hero",
    ticker: [
      "DIRECT RETAILER CONNECTIONS",
      "BILLER VISIBILITY",
      "VERIFIABLE HOUSEHOLD RECORDS",
      "ITEMIZED SPENDING",
    ],
    blocks: [
      "Granular gives households direct retailer-to-user and biller-to-user visibility so spending records arrive with more context, more detail, and more proof.",
    ],
  },
  {
    id: "02",
    kicker: "THE PROBLEM",
    title: "HOUSEHOLD SPENDING IS FRAGMENTED.",
    subtitle: "People see money leaving. They rarely see the full record behind it.",
    accent: "red",
    bullets: [
      "Shops and online stores",
      "Utilities and mortgage payments",
      "Service providers and recurring bills",
      "Paper receipts and email receipts",
      "Bank records and cash purchases",
    ],
  },
  {
    id: "03",
    kicker: "CORE INSIGHT",
    title: "THE REAL GAP IS ITEMIZATION.",
    subtitle: "Payment movement is visible. Spending detail usually is not.",
    accent: "green",
    stats: ["BASKETS", "BILLS", "ITEMS", "DRIFT", "PROOF", "CONTROL"],
    blocks: [
      "People feel cost pressure at the level of grocery baskets, household essentials, utility bills, mortgage obligations, and recurring services.",
      "The winning product connects users directly to the businesses they pay so spending enters the app already itemized wherever possible.",
    ],
  },
  {
    id: "04",
    kicker: "THE SOLUTION",
    title: "DIRECT RECORDS. ONE PLACE.",
    subtitle: "Retailers and billers feed structured purchase and billing data into the app.",
    accent: "green",
    flow: ["CONNECT", "PULL", "ITEMIZE", "VERIFY", "TRACK"],
    bullets: [
      "See what was bought",
      "See what was paid for",
      "Spot drifting categories",
      "See recurring bills increasing",
      "Measure how much spending is directly verified",
    ],
  },
  {
    id: "05",
    kicker: "PRODUCT INPUTS",
    title: "FOUR LAYERS CREATE COVERAGE.",
    subtitle: "Automation first, capture everywhere else.",
    accent: "green",
    flow: ["DIRECT APIS", "IMPORTS", "OCR REVIEW", "MANUAL INPUT"],
    blocks: [
      "Granular combines direct retailer and biller API connections, digital receipt and invoice imports, OCR review for scanned documents, and manual input for non-connected providers or cash transactions.",
      "The result is a structured household spending record that aims to leave nothing important out.",
    ],
  },
  {
    id: "06",
    kicker: "WHY THIS IS DIFFERENT",
    title: "MOST APPS SUMMARIZE. GRANULAR ITEMIZES.",
    subtitle: "This is obligation-level and line-item level, not just merchant-level reporting.",
    accent: "red",
    columns: [
      ["MOST APPS", "Merchant-level summaries", "Account access first", "After-the-fact views"],
      ["GRANULAR", "Line-item and obligation detail", "Retailer and biller data first", "Living purchase intelligence"],
    ],
  },
  {
    id: "07",
    kicker: "PRODUCT SCOPE",
    title: "ONE APP FOR THE FULL HOUSEHOLD PICTURE.",
    subtitle: "Not limited to retail shopping.",
    accent: "green",
    bullets: [
      "Physical retail",
      "E-commerce",
      "Grocery and pharmacy",
      "Utilities and energy",
      "Mortgage payments",
      "Recurring household services",
      "Cash spending via manual capture",
    ],
  },
  {
    id: "08",
    kicker: "TRUST LAYER",
    title: "BLOCKCHAIN STAYS UNDER THE SURFACE.",
    subtitle: "It supports trust without turning the app into a crypto product.",
    accent: "green",
    columns: [
      ["OFF-CHAIN", "Receipt images", "Invoice contents", "User identities", "Analytics and budgets"],
      ["VERIFIED", "Hashes", "Timestamps", "Partner attestations", "Permission logs", "Proof references"],
    ],
  },
  {
    id: "09",
    kicker: "BUSINESS MODEL",
    title: "SUBSCRIPTION FIRST. INFRASTRUCTURE NEXT.",
    subtitle: "Consumer value leads, integration revenue follows.",
    accent: "green",
    columns: [
      ["STAGE 1", "Consumer subscription", "Overspend prevention", "Inflation visibility", "Advanced reporting"],
      ["STAGE 2", "Retailer and biller revenue", "Integration fees", "Onboarding fees", "Structured delivery support"],
      ["STAGE 3", "Infrastructure expansion", "Verification APIs", "Permission workflows", "Provenance services"],
    ],
  },
  {
    id: "10",
    kicker: "LAUNCH POSITION",
    title: "SOFTWARE-LED, NOT PAYMENTS-LED.",
    subtitle: "The launch product monitors, analyzes, categorizes, and verifies spending without moving funds.",
    accent: "red",
    receipt: ["MONITORS SPEND", "TRACKS VERIFIED RECORDS", "NO WALLET", "NO BALANCE HOLDING"],
    blocks: [
      "Granular does not execute payments at launch. It analyzes purchases and bills, tracks verified records, and matches payment context where useful.",
      "That keeps the launch operationally focused and avoids unnecessary payment complexity on day one.",
    ],
  },
  {
    id: "11",
    kicker: "GO-TO-MARKET",
    title: "START WITH PEOPLE WHO FEEL THE DRIFT.",
    subtitle: "Consumer wedge first, partner wedge alongside it.",
    accent: "green",
    columns: [
      ["CONSUMER", "Privacy-conscious users", "Inflation-sensitive households", "Budget-aware consumers", "Recurring spend visibility seekers"],
      ["PARTNER", "Focused retailers", "Online merchants", "Utilities", "Recurring household billers"],
    ],
    blocks: [
      "The partner story is practical: send already itemized records directly into the consumer experience.",
    ],
  },
  {
    id: "12",
    kicker: "CLOSING",
    title: "SEE EVERYTHING. IN ITEMIZED FORM.",
    subtitle: "One place for the household spending record, even before the network is complete.",
    accent: "green",
    ticker: ["ITEMIZED RECORDS", "DIRECT CONNECTIONS", "MANUAL COVERAGE", "TRUST UNDERNEATH"],
    blocks: [
      "Granular is building the household spending layer around direct connections between consumers and the businesses they pay.",
      "Retailer and biller APIs create the primary record. Manual receipt capture closes the coverage gap. Blockchain adds proof and trust underneath the system.",
      "The launch story is simple: Granular helps people see everything they spend on, in itemized form, in one place.",
    ],
  },
];

function useSwipe(setActiveIndex) {
  const [start, setStart] = useState(null);

  const go = useCallback(
    (direction) => {
      setActiveIndex((current) => {
        const next = current + direction;
        if (next < 0) return slides.length - 1;
        if (next >= slides.length) return 0;
        return next;
      });
    },
    [setActiveIndex],
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") go(1);
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") go(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go]);

  const bind = {
    onTouchStart: (event) => setStart(event.touches[0].clientX),
    onTouchEnd: (event) => {
      if (start === null) return;
      const end = event.changedTouches[0].clientX;
      const delta = start - end;
      if (Math.abs(delta) > 44) go(delta > 0 ? 1 : -1);
      setStart(null);
    },
  };

  return { bind, go };
}

function Ticker({ words }) {
  const items = words?.length ? words : ["GRANULAR", "ITEMIZED", "VERIFIED", "HOUSEHOLD SPENDING"];
  return (
    <div className="ticker" aria-hidden="true">
      <motion.div
        className="tickerTrack"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        {[...items, ...items, ...items, ...items].map((word, index) => (
          <span key={`${word}-${index}`}>{word}</span>
        ))}
      </motion.div>
    </div>
  );
}

function SlideVisual({ slide }) {
  if (slide.receipt) {
    return (
      <motion.div className="receiptBlock" initial={{ rotate: -2 }} animate={{ rotate: 1 }}>
        {slide.receipt.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </motion.div>
    );
  }

  if (slide.flow) {
    return (
      <div className="flowStack">
        {slide.flow.map((item, index) => (
          <motion.div
            className="flowNode"
            key={item}
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item}
          </motion.div>
        ))}
      </div>
    );
  }

  if (slide.stats) {
    return (
      <div className="statGrid">
        {slide.stats.map((stat, index) => (
          <motion.div
            className="statCell"
            key={stat}
            initial={{ opacity: 0, scale: 0.78 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.045 }}
          >
            {stat}
          </motion.div>
        ))}
      </div>
    );
  }

  return <KineticWord word={slide.title.split(" ")[0]} />;
}

function KineticWord({ word }) {
  return (
    <motion.div
      className="kineticWord"
      initial={{ opacity: 0, skewX: -12, y: 28 }}
      animate={{ opacity: 1, skewX: 0, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {word}
    </motion.div>
  );
}

function LogoMark({ className = "", alt = "Granular logo" }) {
  return <img className={className} src={logoSrc} alt={alt} />;
}

function SlideContent({ slide, totalSlides }) {
  return (
    <motion.article
      className={`slide slide-${slide.accent}`}
      initial={{ opacity: 0, x: 80, filter: "blur(8px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -80, filter: "blur(8px)" }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="scanline" aria-hidden="true" />
      <Ticker words={slide.ticker} />
      <header className="slideHeader">
        <div className="slideBrand">
          <LogoMark className="headerLogo" />
          <span>{slide.kicker}</span>
        </div>
        <span>
          {slide.id}/{totalSlides}
        </span>
      </header>
      <main className="slideBody">
        <LogoMark className="slideStamp" alt="" />

        <section className="copy">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            {slide.title}
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {slide.subtitle}
          </motion.p>
        </section>

        <section className="visual">
          <SlideVisual slide={slide} />
        </section>

        <section className="details">
          {slide.blocks?.map((block, index) => (
            <motion.p
              key={block}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.05 }}
            >
              {block}
            </motion.p>
          ))}

          {slide.bullets && (
            <ul>
              {slide.bullets.map((bullet, index) => (
                <motion.li
                  key={bullet}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.14 + index * 0.04 }}
                >
                  {bullet}
                </motion.li>
              ))}
            </ul>
          )}

          {slide.columns && (
            <div className="columns">
              {slide.columns.map((column, index) => (
                <motion.div
                  className="column"
                  key={column[0]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.05 }}
                >
                  <strong>{column[0]}</strong>
                  {column.slice(1).map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </motion.article>
  );
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { bind, go } = useSwipe(setActiveIndex);
  const activeSlide = slides[activeIndex];
  const progress = useMemo(() => ((activeIndex + 1) / slides.length) * 100, [activeIndex]);

  return (
    <div className="appShell" {...bind}>
      <div className="desktopNoise" aria-hidden="true" />
      <aside className="deckMeta">
        <LogoMark className="metaLogo" />
        <span>GRANULAR</span>
        <strong>ITEMIZED HOUSEHOLD SPENDING</strong>
        <span>SWIPE / ARROWS</span>
      </aside>

      <section className="deviceFrame" aria-label="Granular pitch deck">
        <AnimatePresence mode="wait">
          <SlideContent key={activeSlide.id} slide={activeSlide} totalSlides={slides.length} />
        </AnimatePresence>
      </section>

      <nav className="navigation" aria-label="Deck navigation">
        <button type="button" onClick={() => go(-1)} aria-label="Previous slide">
          ←
        </button>
        <div className="dots">
          {slides.map((slide, index) => (
            <button
              className={index === activeIndex ? "active" : ""}
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next slide">
          →
        </button>
      </nav>

      <div className="progress" aria-hidden="true">
        <motion.div animate={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
