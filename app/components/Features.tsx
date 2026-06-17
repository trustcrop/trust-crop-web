'use client'

import {Bento, Link, Section, Text,} from '@primer/react-brand'
import content from '../content/el.json'

const VISUAL_SRC = 'https://primer.style/primerProductUI-darkMode.png'

const {features} = content
const [production, packing, reports] = features.pillars

export function Features() {
    return (
        <Section paddingBlockStart="none">
            <Bento>
                {/* 1st item — content first, leading visual on the bottom */}
                <Bento.Item
                    columnSpan={7}
                    rowSpan={2}
                    flow="column"
                    colorMode="dark"
                >
                    <Bento.Content padding="spacious" verticalAlign="start">
                        <Bento.Heading as="h3">
                            {production.heading}
                        </Bento.Heading>
                        <Text variant="muted">{production.description}</Text>
                        <Link href="#features" arrowDirection="end">
                            Μάθετε περισσότερα
                        </Link>
                    </Bento.Content>
                    <Bento.Visual position="50% 0%">
                        <img alt={production.heading} src={VISUAL_SRC} />
                    </Bento.Visual>
                </Bento.Item>

                {/* 2nd item — champion: content authored first (a11y), visual reversed to top */}
                <Bento.Item
                    columnSpan={5}
                    rowSpan={2}
                    flow="row"
                    colorMode="dark"
                >
                    <Bento.Visual fillMedia={true} padding="normal" position="50% 50%">
                        <img alt={packing.heading} src={VISUAL_SRC} />
                    </Bento.Visual>
                    <Bento.Content padding="normal" verticalAlign="end">
                        <Bento.Heading as="h3">
                            Διαχείριση <em>συσκευαστηρίου</em>
                        </Bento.Heading>
                        <Link href="#features" arrowDirection="end">
                            Μάθετε περισσότερα
                        </Link>
                    </Bento.Content>
                </Bento.Item>

                {/* 3rd item — content from JSON, visual left as-is */}
                <Bento.Item
                    columnSpan={12}
                    flow={{
                        xsmall: 'row',
                        small: 'row',
                        medium: 'column',
                    }}
                >
                    <Bento.Content padding="normal">
                        <Bento.Heading as="h3">{reports.heading}</Bento.Heading>
                        <Text variant="muted">{reports.description}</Text>
                        <Link href="#features" arrowDirection="end">
                            Μάθετε περισσότερα
                        </Link>
                    </Bento.Content>
                    <Bento.Visual>
                        <img
                            alt="placeholder, blank area with an gray background color"
                            src={VISUAL_SRC}
                        />
                    </Bento.Visual>
                </Bento.Item>
            </Bento>
        </Section>
    )
}

