'use client'

import {ChecklistIcon, CopilotIcon, DatabaseIcon, FileDirectoryIcon, InboxIcon, PeopleIcon} from '@primer/octicons-react'
import {Bento, Icon, Section, Text} from '@primer/react-brand'

const ImagePlaceholder = () => (
    <div style={{
        width: '100%',
        height: '100%',
        minHeight: 220,
        background: 'rgba(46,164,78,0.06)',
        border: '1.5px dashed rgba(46,164,78,0.25)',
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <span style={{color: 'rgba(46,164,78,0.4)', fontSize: 13, letterSpacing: '0.05em'}}>image</span>
    </div>
)

export function Features() {
    return (
        <Section id="features" paddingBlockStart="none">
            <Bento>

                {/* ── Row 1 ── Αγροτεμάχια (7) + Εργασίες & Αποθήκη (5) */}
                <Bento.Item columnSpan={7} rowSpan={2} flow="column" colorMode="dark">
                    <Bento.Content padding="spacious" verticalAlign="start" leadingVisual={<Icon icon={FileDirectoryIcon} color="green" hasBackground/>}>
                        <Bento.Heading as="h3">Αγροτεμάχια</Bento.Heading>
                        <Text variant="muted" size="200">Καταγραφή και γεωχωρική απεικόνιση αγροτεμαχίων με φίλτρα ανά καλλιέργεια, νομό, ΟΤΑ και ΚΑΕΚ.</Text>
                    </Bento.Content>
                    <Bento.Visual><ImagePlaceholder/></Bento.Visual>
                </Bento.Item>

                <Bento.Item columnSpan={5} rowSpan={2} flow="column" colorMode="dark">
                    <Bento.Content padding="spacious" verticalAlign="start" leadingVisual={<Icon icon={ChecklistIcon} color="green" hasBackground/>}>
                        <Bento.Heading as="h3">Εργασίες & Αποθήκη</Bento.Heading>
                        <Text variant="muted" size="200">Προγραμματισμός εργασιών αγρού και διαχείριση αποθεμάτων εισροών, λιπασμάτων και εξοπλισμού.</Text>
                    </Bento.Content>
                    <Bento.Visual><ImagePlaceholder/></Bento.Visual>
                </Bento.Item>

                {/* ── Row 2 ── Μητρώο Φυτοπροστατευτικών (12) */}
                <Bento.Item columnSpan={12} flow={{xsmall: 'row', small: 'row', medium: 'column'}} colorMode="dark">
                    <Bento.Content padding="spacious" verticalAlign="start" leadingVisual={<Icon icon={DatabaseIcon} color="green" hasBackground/>}>
                        <Bento.Heading as="h3">Μητρώο Φυτοπροστατευτικών</Bento.Heading>
                        <Text variant="muted" size="200">Πλήρης κατάλογος προϊόντων με αναλυτικές πληροφορίες και αγαπημένα.</Text>
                    </Bento.Content>
                    <Bento.Visual><ImagePlaceholder/></Bento.Visual>
                </Bento.Item>

                {/* ── Row 3 ── Εργατικό Δυναμικό (7) + Τεχνητή Νοημοσύνη (5) */}
                <Bento.Item columnSpan={7} rowSpan={2} flow="column" colorMode="dark">
                    <Bento.Content padding="spacious" verticalAlign="start" leadingVisual={<Icon icon={PeopleIcon} color="green" hasBackground/>}>
                        <Bento.Heading as="h3">Εργατικό Δυναμικό</Bento.Heading>
                        <Text variant="muted" size="200">Μητρώο εργαζομένων, παρουσίες, αναθέσεις εργασίας και μισθοδοσία.</Text>
                    </Bento.Content>
                    <Bento.Visual><ImagePlaceholder/></Bento.Visual>
                </Bento.Item>

                <Bento.Item columnSpan={5} rowSpan={2} flow="column" colorMode="dark">
                    <Bento.Content padding="spacious" verticalAlign="start" leadingVisual={<Icon icon={CopilotIcon} color="green" hasBackground/>}>
                        <Bento.Heading as="h3">Τεχνητή Νοημοσύνη</Bento.Heading>
                        <Text variant="muted" size="200">Γεωργικές συμβουλές μέσω συνομιλίας και διάγνωση φυτικών παθήσεων μέσω φωτογραφίας.</Text>
                    </Bento.Content>
                    <Bento.Visual><ImagePlaceholder/></Bento.Visual>
                </Bento.Item>

                {/* ── Row 4 ── Ειδοποιήσεις (12) */}
                <Bento.Item columnSpan={12} flow={{xsmall: 'row', small: 'row', medium: 'column'}} colorMode="dark">
                    <Bento.Content padding="spacious" verticalAlign="start" leadingVisual={<Icon icon={InboxIcon} color="green" hasBackground/>}>
                        <Bento.Heading as="h3">Ειδοποιήσεις</Bento.Heading>
                        <Text variant="muted" size="200">Άμεσες ειδοποιήσεις υποστήριξης αποφάσεων με επίπεδο κινδύνου ανά αγροτεμάχιο και καλλιέργεια.</Text>
                    </Bento.Content>
                    <Bento.Visual><ImagePlaceholder/></Bento.Visual>
                </Bento.Item>

            </Bento>
        </Section>
    )
}
