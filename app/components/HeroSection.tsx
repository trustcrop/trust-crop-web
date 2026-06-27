'use client'

import {Hero, Section} from '@primer/react-brand'
import content from '../content/el.json'
import {GeometricAccent} from './GeometricAccent'

const {hero} = content

export function HeroSection() {
    return (
        <Section paddingBlockStart="none">
            <Hero align="center" variant="gridline-expressive">
                <Hero.Label>{hero.label}</Hero.Label>

                <Hero.Heading size="2">
                    {hero.heading[0]}
                    {hero.heading[1] ? <><br/>{hero.heading[1]}</> : null}
                </Hero.Heading>

                <Hero.Description>
                    {hero.description}
                </Hero.Description>

                <Hero.PrimaryAction href="https://app.trustcrop.gr">
                    {hero.primaryAction}
                </Hero.PrimaryAction>
            </Hero>

            <GeometricAccent/>
        </Section>
    )
}
