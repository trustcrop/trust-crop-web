'use client'

import {
  SubNav,
  Hero,
  Section,
  SectionIntro,
  Grid,
  Pillar,
  River,
  Heading,
  Text,
  Link,
  Image,
  MinimalFooter,
  PricingOptions,
  Statistic,
  AnimationProvider,
  Animate,
} from "@primer/react-brand";
import { useState } from "react";
import {
  SunIcon,
  MoonIcon,
  GraphIcon,
  PackageIcon,
  CommentDiscussionIcon,
} from "@primer/octicons-react";
import { useColorScheme } from "./components/PrimerBrandProvider";
import content from "./content/el.json";

const { nav, hero, features, howItWorks, stats, pricing, footer } = content;

const pillarIcons = [
  { icon: <GraphIcon size={24} />, color: "green" as const },
  { icon: <PackageIcon size={24} />, color: "blue" as const },
  { icon: <SunIcon size={24} />, color: "purple" as const },
  { icon: <CommentDiscussionIcon size={24} />, color: "teal" as const },
];

export default function Home() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const { colorScheme, toggleColorScheme } = useColorScheme();
  return (
    <div style={{ position: "relative" }}>
      {/* ── Navigation ── */}
      <SubNav>
        <SubNav.Heading href="/">
          <span className="brand-heading">
            <Image src="/images/logo.png" alt="TrustCrop" width={45} height={45} />
            <span className="brand-name">
              <span className="brand-name-text">Trust Crop</span>
            </span>
          </span>
        </SubNav.Heading>
        <SubNav.Link href="#features">{nav.features}</SubNav.Link>
        <SubNav.Link href="#how-it-works">{nav.howItWorks}</SubNav.Link>
        <SubNav.Link href="#pricing">{nav.pricing}</SubNav.Link>
        <SubNav.Link href="https://app.trust-crop.org/support">{nav.contact}</SubNav.Link>
        <SubNav.Link
          href="#"
          onClick={(event) => {
            event.preventDefault();
            toggleColorScheme();
          }}
          aria-label={colorScheme === "dark" ? "Φωτεινό θέμα" : "Σκοτεινό θέμα"}
        >
          {colorScheme === "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
        </SubNav.Link>
        <SubNav.Action href="https://app.trust-crop.org">{nav.getStarted}</SubNav.Action>
      </SubNav>

      {/* Mobile-only theme toggle, sits next to the hamburger menu button */}
      <button
        type="button"
        className="mobile-theme-toggle"
        onClick={toggleColorScheme}
        aria-label={colorScheme === "dark" ? "Φωτεινό θέμα" : "Σκοτεινό θέμα"}
      >
        {colorScheme === "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
      </button>


      {/* ── Hero ── */}
      <div className="hero-banner" style={{ backgroundImage: "url('/images/TOP%20BANER.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div className="hero-overlay" style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}>
          <Hero align="center" enableAnimation>
            <Hero.Label>{hero.label}</Hero.Label>
            <Hero.Heading>
              {hero.heading[0]}
              <br />
              {hero.heading[1]}
            </Hero.Heading>
            <Hero.Description>{hero.description}</Hero.Description>
            <Hero.PrimaryAction href="https://app.trust-crop.org">{hero.primaryAction}</Hero.PrimaryAction>
          </Hero>
        </div>
      </div>

      {/* ── Feature pillars ── */}
      <Section id="features" backgroundColor="subtle">
        <AnimationProvider animationTrigger="on-visible" runOnce>
          <SectionIntro align="center" fullWidth animate="fade-in">
            <SectionIntro.Heading>{features.sectionIntro.heading}</SectionIntro.Heading>
            <SectionIntro.Description>{features.sectionIntro.description}</SectionIntro.Description>
          </SectionIntro>

          <Grid enableGutters>
            {features.pillars.map((pillar, i) => (
              <Grid.Column
                key={pillar.heading}
                span={{ xsmall: 12, medium: 6, large: 3 }}
              >
                <div className="feature-card">
                  <Pillar animate={{ variant: "slide-in-up", delay: i * 150 }}>
                    <Pillar.Icon
                      icon={pillarIcons[i].icon}
                      color={pillarIcons[i].color}
                    />
                    <Pillar.Heading>{pillar.heading}</Pillar.Heading>
                    <Pillar.Description>{pillar.description}</Pillar.Description>
                  </Pillar>
                </div>
              </Grid.Column>
            ))}
          </Grid>
        </AnimationProvider>
      </Section>

      {/* ── River sections ── */}
      <Section id="how-it-works">
        <AnimationProvider animationTrigger="on-visible" runOnce visibilityOptions="bottom-of-screen">
          <River>
            <River.Visual>
              <Animate animate="slide-in-right">
                <Image src="/images/banner1.jpg" alt={howItWorks.rivers[0].heading} style={{ borderRadius: 12 }} />
              </Animate>
            </River.Visual>
            <River.Content>
              <Heading as="h3" animate="slide-in-up">{howItWorks.rivers[0].heading}</Heading>
              <Text animate={{ variant: "slide-in-up", delay: 100 }}>{howItWorks.rivers[0].body}</Text>
              <Animate animate={{ variant: "fade-in", delay: 200 }}>
                <Link href="#get-started">{howItWorks.rivers[0].link}</Link>
              </Animate>
            </River.Content>
          </River>

          <River align="end">
            <River.Visual>
              <Animate animate="slide-in-left">
                <Image src="/images/traceability.jpg" alt={howItWorks.rivers[1].heading} style={{ borderRadius: 12 }} />
              </Animate>
            </River.Visual>
            <River.Content>
              <Heading as="h3" animate="slide-in-up">{howItWorks.rivers[1].heading}</Heading>
              <Text animate={{ variant: "slide-in-up", delay: 100 }}>{howItWorks.rivers[1].body}</Text>
              <Animate animate={{ variant: "fade-in", delay: 200 }}>
                <Link href="#get-started">{howItWorks.rivers[1].link}</Link>
              </Animate>
            </River.Content>
          </River>

          <River>
            <River.Visual>
              <Animate animate="slide-in-right">
                <Image src="/images/devices.jpg" alt={howItWorks.rivers[2].heading} style={{ borderRadius: 12 }} />
              </Animate>
            </River.Visual>
            <River.Content>
              <Heading as="h3" animate="slide-in-up">{howItWorks.rivers[2].heading}</Heading>
              <Text animate={{ variant: "slide-in-up", delay: 100 }}>{howItWorks.rivers[2].body}</Text>
              <Animate animate={{ variant: "fade-in", delay: 200 }}>
                <Link href="#get-started">{howItWorks.rivers[2].link}</Link>
              </Animate>
            </River.Content>
          </River>
        </AnimationProvider>
      </Section>

      {/* ── Social proof stats ── */}
      <Section id="stats" backgroundColor="default">
        <div className="glow-divider" aria-hidden="true" />
        <AnimationProvider animationTrigger="on-visible" runOnce autoStaggerChildren staggerDelayIncrement={120}>
          <Grid enableGutters>
            {stats.map((stat) => (
              <Grid.Column
                key={stat.label}
                span={{ xsmall: 6, medium: 3 }}
              >
                <Animate animate="scale-in-up">
                  <Statistic>
                    <Statistic.Heading>{stat.value}</Statistic.Heading>
                    <Statistic.Description>{stat.label}</Statistic.Description>
                  </Statistic>
                </Animate>
              </Grid.Column>
            ))}
          </Grid>
        </AnimationProvider>
      </Section>

      {/* ── Pricing ── */}
      <Section id="pricing">
        <AnimationProvider animationTrigger="on-visible" runOnce>
          <SectionIntro align="center" fullWidth animate="fade-in">
            <SectionIntro.Label>{pricing.sectionIntro.label}</SectionIntro.Label>
            <SectionIntro.Heading>{pricing.sectionIntro.heading}</SectionIntro.Heading>
            <SectionIntro.Description>{pricing.sectionIntro.description}</SectionIntro.Description>
          </SectionIntro>

          <div
            role="tablist"
            aria-label={pricing.sectionIntro.label}
            style={{
              display: "flex",
              width: "fit-content",
              gap: "var(--base-size-4)",
              margin: "0 auto var(--base-size-32)",
              padding: "var(--base-size-4)",
              border: "var(--brand-borderWidth-thin) solid var(--brand-color-border-default)",
              borderRadius: "var(--brand-borderRadius-medium)",
              background: "var(--brand-color-canvas-subtle)",
            }}
          >
            {(["monthly", "annual"] as const).map((option) => {
              const selected = billing === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setBilling(option)}
                  style={{
                    cursor: "pointer",
                    border: "none",
                    borderRadius: "var(--brand-borderRadius-small)",
                    padding: "var(--base-size-8) var(--base-size-16)",
                    font: "inherit",
                    fontWeight: 600,
                    color: selected
                      ? "var(--brand-color-text-default)"
                      : "var(--brand-color-text-muted)",
                    background: selected ? "var(--brand-color-canvas-default)" : "transparent",
                    boxShadow: selected ? "var(--brand-shadow-small)" : "none",
                  }}
                >
                  {pricing.billingToggle[option]}
                </button>
              );
            })}
          </div>

          <PricingOptions variant="cards-gradient" align="center">
            {pricing.plans.map((plan, i) => {
              const price = plan.price[billing];
              return (
                <PricingOptions.Item
                  key={plan.heading}
                  animate={{ variant: "slide-in-up", delay: i * 120 }}
                >
                  {"label" in plan && plan.label && (
                    <PricingOptions.Label color={plan.label.color as "blue" | "green" | "purple"}>
                      {plan.label.text}
                    </PricingOptions.Label>
                  )}
                  <PricingOptions.Heading>{plan.heading}</PricingOptions.Heading>
                  <PricingOptions.Description>{plan.description}</PricingOptions.Description>
                  <PricingOptions.Price
                    className={"symbol" in price ? "price-coming-soon" : undefined}
                    currencyCode=""
                    currencySymbol={"symbol" in price ? price.symbol : ""}
                    trailingText={"trailing" in price ? price.trailing : undefined}
                    originalPrice={"originalValue" in price ? price.originalValue : undefined}
                  >
                    {price.value}
                  </PricingOptions.Price>
                  <PricingOptions.FeatureList hasDivider>
                    {[
                      <PricingOptions.FeatureListHeading key="heading">
                        {plan.featureListHeading}
                      </PricingOptions.FeatureListHeading>,
                      ...plan.included.map((item) => (
                        <PricingOptions.FeatureListItem key={item}>
                          {item}
                        </PricingOptions.FeatureListItem>
                      )),
                      ...plan.excluded.map((item) => (
                        <PricingOptions.FeatureListItem key={`x-${item}`} variant="excluded">
                          {item}
                        </PricingOptions.FeatureListItem>
                      )),
                    ]}
                  </PricingOptions.FeatureList>
                  <PricingOptions.PrimaryAction as="a" href={plan.primaryAction.href}>
                    {plan.primaryAction.text}
                  </PricingOptions.PrimaryAction>
                </PricingOptions.Item>
              );
            })}
          </PricingOptions>
        </AnimationProvider>
      </Section>

      {/* ── Footer ── */}
      <MinimalFooter
        socialLinks={false}
        copyrightStatement={
          <span style={{ display: "block", width: "100%", textAlign: "center" }}>
            {footer.copyright.replace("{year}", String(new Date().getFullYear()))}{" · "}
            Powered by{" "}
            <span style={{ fontWeight: 700, color: "#8957e5" }}>NXO</span>
          </span>
        }
      />
    </div>
  );
}
