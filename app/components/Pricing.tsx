'use client'

import {useState} from 'react'
import {
    Section,
    SectionIntro,
    PricingOptions,
    AnimationProvider,
    Stack,
    Button,
} from '@primer/react-brand'
import content from '../content/el.json'

const {pricing} = content

// Champion-level pricing: only the first 3 plans for now.
const plans = pricing.plans.slice(0, 3)

type Billing = 'monthly' | 'annual'

export function Pricing() {
    const [billing, setBilling] = useState<Billing>('monthly')

    return (
        <Section id="pricing">
            <AnimationProvider animationTrigger="on-visible" runOnce>
                <SectionIntro align="center" fullWidth animate="fade-in">
                    <SectionIntro.Label color="green">{pricing.sectionIntro.label}</SectionIntro.Label>
                    <SectionIntro.Heading>{pricing.sectionIntro.heading}</SectionIntro.Heading>
                    <SectionIntro.Description>
                        {pricing.sectionIntro.description}
                    </SectionIntro.Description>
                </SectionIntro>

                {/* Segmented billing toggle — Primer Brand components only */}
                <Stack
                    direction="horizontal"
                    justifyContent="center"
                    gap="condensed"
                    padding="normal"
                >
                    {(['monthly', 'annual'] as const).map((option) => {
                        const selected = billing === option
                        return (
                            <Button
                                key={option}
                                variant={selected ? 'primary' : 'subtle'}
                                aria-pressed={selected}
                                onClick={() => setBilling(option)}
                            >
                                {pricing.billingToggle[option]}
                            </Button>
                        )
                    })}
                </Stack>

                {/* default-gradient = connected tiers, no gaps between them */}
                <PricingOptions variant="default-gradient">
                    {plans.map((plan, i) => {
                        const price = plan.price[billing]
                        const isHighlighted = 'label' in plan && Boolean(plan.label)
                        return (
                            <PricingOptions.Item
                                key={plan.heading}
                                animate={{variant: 'slide-in-up', delay: i * 120}}
                            >
                                {isHighlighted && plan.label && (
                                    <PricingOptions.Label
                                        color={plan.label.color as 'blue' | 'green' | 'purple'}
                                    >
                                        {plan.label.text}
                                    </PricingOptions.Label>
                                )}
                                <PricingOptions.Heading>{plan.heading}</PricingOptions.Heading>
                                <PricingOptions.Description>
                                    {plan.description}
                                </PricingOptions.Description>
                                <PricingOptions.Price
                                    currencyCode=""
                                    currencySymbol={'symbol' in price ? price.symbol : ''}
                                    trailingText={'trailing' in price ? price.trailing : undefined}
                                    originalPrice={
                                        'originalValue' in price ? price.originalValue : undefined
                                    }
                                >
                                    {price.value}
                                </PricingOptions.Price>
                                <PricingOptions.FeatureList hasDivider>
                                    {[
                                        <PricingOptions.FeatureListGroupHeading key="heading">
                                            {plan.featureListHeading}
                                        </PricingOptions.FeatureListGroupHeading>,
                                        ...plan.included.map((item) => (
                                            <PricingOptions.FeatureListItem key={item}>
                                                {item}
                                            </PricingOptions.FeatureListItem>
                                        )),
                                        ...plan.excluded.map((item) => (
                                            <PricingOptions.FeatureListItem
                                                key={`x-${item}`}
                                                variant="excluded"
                                            >
                                                {item}
                                            </PricingOptions.FeatureListItem>
                                        )),
                                    ]}
                                </PricingOptions.FeatureList>
                                <PricingOptions.PrimaryAction variant="accent" as="a" href={plan.primaryAction.href}>
                                    {plan.primaryAction.text}
                                </PricingOptions.PrimaryAction>
                            </PricingOptions.Item>
                        )
                    })}
                </PricingOptions>
            </AnimationProvider>
        </Section>
    )
}



