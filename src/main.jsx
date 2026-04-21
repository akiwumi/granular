import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import "@fontsource/bebas-neue";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/jetbrains-mono/800.css";
import "./styles.css";

const slides = [
  {
    id: "01",
    kicker: "GRANULAR // INVESTOR DECK",
    title: "SEE WHAT MONEY BECAME.",
    subtitle: "Not just where it went. Exactly what was bought.",
    accent: "green",
    mode: "hero",
    ticker: ["PRIVACY-FIRST PERSONAL FINANCE", "DIGITAL RECEIPTS", "ITEM-LEVEL INTELLIGENCE"],
    blocks: [
      "Receipt intelligence for people who want financial control without surrendering their private life.",
    ],
  },
  {
    id: "02",
    kicker: "ONE-LINE SUMMARY",
    title: "BASKETS BECOME FINANCIAL RECORDS.",
    subtitle: "Granular turns receipts and purchases into item-level spending intelligence.",
    accent: "green",
    stats: ["WHAT", "WHERE", "CARD", "IMPACT"],
    blocks: [
      "Most finance apps tell users the merchant and total.",
      "Granular shows what they bought, how it changed their spending, and which products, stores, and habits are moving over time.",
    ],
  },
  {
    id: "03",
    kicker: "THE PROBLEM",
    title: "BANK FEEDS STOP TOO EARLY.",
    subtitle: "Tesco - GBP84.20 is not an explanation.",
    accent: "red",
    receipt: ["TESCO  GBP84.20", "AMAZON GBP31.50", "BOOTS  GBP18.40"],
    blocks: [
      "Users still ask: What did I buy? Which products pushed me over budget? Which retailer is getting expensive for me?",
      "Merchant-level transaction data is useful, but it is not enough for practical financial control.",
    ],
  },
  {
    id: "04",
    kicker: "USER PAIN",
    title: "REAL SPENDING IS MESSY.",
    subtitle: "Receipts scatter. Cards multiply. Categories blur.",
    accent: "red",
    bullets: [
      "Paper, email, PDFs, and retailer accounts",
      "Multiple cards and household purchasing patterns",
      "Delayed bank feeds and broad categories",
      "No clear answer to why money feels tighter",
    ],
  },
  {
    id: "05",
    kicker: "THE INSIGHT",
    title: "THE BASKET IS THE EVENT.",
    subtitle: "A payment says money moved. A basket says why.",
    accent: "green",
    stats: ["ITEMS", "QTY", "PRICE", "DISCOUNT", "CARD", "IMPACT"],
    blocks: [
      "Granular makes the basket the core record: retailer, date, items, quantities, prices, discounts, payment method where available, and spending impact.",
    ],
  },
  {
    id: "06",
    kicker: "WHAT IT IS",
    title: "A RECEIPT-FIRST FINANCE APP.",
    subtitle: "Useful on day one, more automated over time.",
    accent: "green",
    bullets: [
      "Scan and upload receipts",
      "Import digital receipts",
      "Connect cards where supported",
      "Use manual balance without bank linking",
      "Budget, alert, search, export",
    ],
  },
  {
    id: "07",
    kicker: "WHAT IT DOES",
    title: "ORGANIZES THE AFTERMATH OF EVERY PURCHASE.",
    subtitle: "Store, date, item list, prices, card, category, budget impact.",
    accent: "green",
    blocks: [
      "Across purchases, Granular shows spending by retailer, item, category, card, and period.",
      "Repeat purchases and item price changes become visible before budget pressure becomes painful.",
    ],
  },
  {
    id: "08",
    kicker: "USE FLOW // 01",
    title: "ONBOARD WITHOUT PRESSURE.",
    subtitle: "Give value before asking for deeper access.",
    accent: "green",
    flow: ["START LOCAL", "SCAN RECEIPT", "SEE VALUE", "OPTIONAL LINK"],
    bullets: [
      "Start in local-first mode",
      "Choose scan, import, manual balance, or card connection",
      "Explain privacy before requesting data access",
      "Introduce card/bank linking as an enhancement",
    ],
  },
  {
    id: "09",
    kicker: "USE FLOW // 02",
    title: "CAPTURE THE RECEIPT.",
    subtitle: "Loose proof becomes structured intelligence.",
    accent: "green",
    flow: ["CAMERA", "OCR", "CONFIRM", "SAVE", "UPDATE"],
    bullets: [
      "Scan paper receipts with the phone camera",
      "Upload image, PDF, email, or digital receipt",
      "Read retailer, date, total, and line items",
      "Ask for confirmation only when needed",
      "Update spending view and budgets instantly",
    ],
  },
  {
    id: "10",
    kicker: "USE FLOW // 03",
    title: "REVIEW THE BASKET.",
    subtitle: "The receipt becomes searchable, editable, and useful.",
    accent: "green",
    receipt: ["STORE: TESCO", "ITEMS: 17", "TOTAL: GBP84.20", "BUDGET HIT: +12%"],
    bullets: [
      "Clean itemized basket",
      "Category and card where matched",
      "Receipt image for proof of purchase",
      "Edit categories, mark recurring items, compare prices",
    ],
  },
  {
    id: "11",
    kicker: "USE FLOW // 04",
    title: "SEE WHERE YOU STAND.",
    subtitle: "A purchase-aware spending view, not a delayed statement.",
    accent: "green",
    stats: ["WEEK", "MONTH", "STORE", "ITEM", "CARD", "ALL"],
    blocks: [
      "Granular brings together scanned receipts, imported digital receipts, card activity where available, manual entries, budgets, and alerts.",
      "The app answers: What have I actually spent, and what did I spend it on?",
    ],
  },
  {
    id: "12",
    kicker: "USE FLOW // 05",
    title: "MOVE FROM TRACKING TO PREVENTION.",
    subtitle: "Budgets and alerts respond to baskets, not vague categories.",
    accent: "red",
    bullets: [
      "Weekly and monthly budgets",
      "Retailer-specific limits",
      "Item-category limits",
      "Card-level spending limits",
      "Alerts for inflation, retailer drift, and budget pressure",
    ],
  },
  {
    id: "13",
    kicker: "USE FLOW // 06",
    title: "SEARCH. TREND. EXPORT.",
    subtitle: "The user owns the history and can take it with them.",
    accent: "green",
    stats: ["ITEM", "STORE", "DATE", "CARD", "CATEGORY", "AMOUNT"],
    blocks: [
      "Search by item, store, date, card, category, or amount.",
      "Track repeat-item price changes, monthly essentials, and grocery/pharmacy/household patterns.",
      "Export spreadsheets, PDF summaries, Excel files, and receipt records.",
    ],
  },
  {
    id: "14",
    kicker: "USER BENEFITS",
    title: "CLARITY. CONTROL. CONFIDENCE.",
    subtitle: "Spending becomes something the user can act on.",
    accent: "green",
    columns: [
      ["CLARITY", "See exactly what was bought", "Find purchases fast"],
      ["CONTROL", "Track budgets by item and retailer", "Monitor multi-card spend"],
      ["CONFIDENCE", "Keep better records", "Plan from real behavior"],
    ],
  },
  {
    id: "15",
    kicker: "PREMIUM BENEFITS",
    title: "NOT MORE CHARTS. EARLIER WARNINGS.",
    subtitle: "Premium prevents financial drift before it becomes painful.",
    accent: "red",
    bullets: [
      "Overspend alerts",
      "Repeat-item inflation detection",
      "Retailer drift detection",
      "Advanced budget controls",
      "Household planning views",
      "Richer exports and trend reports",
    ],
  },
  {
    id: "16",
    kicker: "PRIVACY",
    title: "TRUST IS THE PRODUCT FEATURE.",
    subtitle: "Purchase history reveals more than users want companies to know.",
    accent: "green",
    blocks: [
      "Detailed purchase history stays on the user's phone by default.",
      "Granular does not depend on selling personal profiles.",
      "Optional sync and integrations should be explicit and consent-led.",
    ],
    ticker: ["LOCAL-FIRST", "MINIMAL COORDINATION DATA", "EXPORT", "DELETE", "CONSENT"],
  },
  {
    id: "17",
    kicker: "RETAILER VALUE",
    title: "DIGITAL RECEIPTS WITHOUT THE LOYALTY TRAP.",
    subtitle: "A better post-purchase layer for retailers and customers.",
    accent: "green",
    bullets: [
      "Reduce paper receipt costs",
      "Provide structured digital receipts",
      "Improve proof-of-purchase and returns flows",
      "Modernize beyond paper and loyalty-only receipt models",
      "Offer privacy-aware customer experience",
    ],
  },
  {
    id: "18",
    kicker: "ARCHITECTURE",
    title: "MANUAL NOW. MATCHED NEXT. INTEGRATED LATER.",
    subtitle: "Six layers scale from receipt capture to retailer infrastructure.",
    accent: "green",
    flow: ["RECEIPT", "PURCHASE", "PAYMENTS", "SPENDING", "RETAIL API", "PRIVACY"],
    blocks: [
      "Launch with receipt intelligence. Improve with payment matching. Scale with focused retailer integrations.",
    ],
  },
  {
    id: "19",
    kicker: "MODEL + ROADMAP",
    title: "CONSUMER WEDGE. B2B UPSIDE.",
    subtitle: "Freemium app now; digital receipt infrastructure as the network grows.",
    accent: "green",
    columns: [
      ["PHASE 1", "Receipt scan/import", "Itemized history"],
      ["PHASE 2", "Budgets and alerts", "Multi-card analysis"],
      ["PHASE 3", "Card matching", "Retailer API pilots"],
      ["PHASE 4", "Retailer network", "Post-purchase workflows"],
    ],
  },
  {
    id: "20",
    kicker: "WHY GRANULAR WINS",
    title: "THE LOOP COMPOUNDS.",
    subtitle: "Every receipt makes the app more useful. Every integration makes it more automatic.",
    accent: "green",
    flow: ["FIRST RECEIPT", "BETTER HISTORY", "SMARTER ALERTS", "MATCHING", "INTEGRATIONS", "TRUST"],
    blocks: [
      "Granular is not just tracking transactions.",
      "It is building a privacy-first system that turns purchases into usable financial understanding.",
    ],
  },
];

function useSwipe(activeIndex, setActiveIndex) {
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
  const items = words?.length ? words : ["GRANULAR", "ITEM-LEVEL", "BASKET DATA", "SPEND CONTROL"];
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

function SlideContent({ slide }) {
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
        <span>{slide.kicker}</span>
        <span>{slide.id}/20</span>
      </header>
      <main className="slideBody">
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
  const { bind, go } = useSwipe(activeIndex, setActiveIndex);
  const activeSlide = slides[activeIndex];
  const progress = useMemo(() => ((activeIndex + 1) / slides.length) * 100, [activeIndex]);

  return (
    <div className="appShell" {...bind}>
      <div className="desktopNoise" aria-hidden="true" />
      <aside className="deckMeta">
        <span>GRANULAR</span>
        <strong>BRUTALIST TICKER TENSION</strong>
        <span>SWIPE / ARROWS</span>
      </aside>

      <section className="deviceFrame" aria-label="Granular pitch deck">
        <AnimatePresence mode="wait">
          <SlideContent key={activeSlide.id} slide={activeSlide} />
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
