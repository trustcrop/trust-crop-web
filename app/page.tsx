'use client'

import dynamic from 'next/dynamic'
import {
    MinimalFooter,
} from "@primer/react-brand";
import {AppHeader} from "./components/AppHeader";
import {HeroSection} from "./components/HeroSection";
import content from "./content/el.json";

// Below-fold sections: split into separate JS chunks, loaded after initial paint
const Features = dynamic(() => import('./components/Features').then(m => ({ default: m.Features })))
const Pricing  = dynamic(() => import('./components/Pricing').then(m => ({ default: m.Pricing })))
const FindUs   = dynamic(() => import('./components/FindUs').then(m => ({ default: m.FindUs })))

const {footer} = content;

export default function Home() {
    return (
        <div style={{position: "relative", marginTop: '120px'}}>
            {/* ── Navigation ── */}
            <AppHeader/>

            {/* ── Hero (above fold — eager) ── */}
            <HeroSection/>

            {/* ── Feature Bento ── */}
            <Features/>

            {/* ── Pricing ── */}
            <Pricing/>

            {/* ── Find Us ── */}
            <FindUs/>

            {/* ── Footer ── */}
            <MinimalFooter
                socialLinks={false}
                copyrightStatement={
                    <span style={{display: "block", width: "100%", textAlign: "center"}}>
            {footer.copyright.replace("{year}", String(new Date().getFullYear()))}{" · "}
                        Powered by{" "}
                        <span style={{fontWeight: 700, color: "#8957e5"}}>NextOracle</span>
          </span>
                }
            />
        </div>
    );
}
