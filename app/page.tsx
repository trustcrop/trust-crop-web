'use client'

import {
    MinimalFooter,
} from "@primer/react-brand";
import {AppHeader} from "./components/AppHeader";
import {HeroSection} from "./components/HeroSection";
import {Features} from "./components/Features";
import {Pricing} from "./components/Pricing";
import {FindUs} from "./components/FindUs";
import content from "./content/el.json";

const {footer} = content;

export default function Home() {
    return (
        <div style={{position: "relative", marginTop: '120px'}}>
            {/* ── Navigation ── */}
            <AppHeader/>

            {/* ── Hero ── */}
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
