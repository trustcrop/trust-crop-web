'use client'

import {
    ChecklistIcon,
    CopilotIcon,
    DatabaseIcon,
    FileDirectoryIcon,
    InboxIcon,
    PeopleIcon,
} from '@primer/octicons-react'
import {Heading, Label, Section, Stack, Text} from '@primer/react-brand'
import content from '../content/el.json'
import {GeometricAccentLazy} from './GeometricAccentLazy'

const {hero} = content

const features = [
    {Icon: FileDirectoryIcon, label: 'Αγροτεμάχια', desc: 'Καταγραφή και γεωχωρική απεικόνιση αγροτεμαχίων με φίλτρα ανά καλλιέργεια, νομό, ΟΤΑ και ΚΑΕΚ'},
    {Icon: ChecklistIcon,     label: 'Εργασίες & Αποθήκη', desc: 'Προγραμματισμός εργασιών αγρού και διαχείριση αποθεμάτων εισροών, λιπασμάτων και εξοπλισμού'},
    {Icon: DatabaseIcon,      label: 'Μητρώο Φυτοπροστατευτικών', desc: 'Πλήρης κατάλογος προϊόντων με αναλυτικές πληροφορίες και αγαπημένα'},
    {Icon: PeopleIcon,        label: 'Εργατικό Δυναμικό', desc: 'Μητρώο εργαζομένων, παρουσίες, αναθέσεις εργασίας και μισθοδοσία'},
    {Icon: CopilotIcon,       label: 'Τεχνητή Νοημοσύνη', desc: 'Γεωργικές συμβουλές μέσω συνομιλίας και διάγνωση φυτικών παθήσεων μέσω φωτογραφίας'},
    {Icon: InboxIcon,         label: 'Ειδοποιήσεις', desc: 'Άμεσες ειδοποιήσεις υποστήριξης αποφάσεων με επίπεδο κινδύνου ανά αγροτεμάχιο και καλλιέργεια'},
]

export function HeroSection() {
    return (
        <Section paddingBlockStart="none">
            <Stack
                direction={{narrow: 'vertical', regular: 'horizontal'}}
                gap={48}
                alignItems="center"
                style={{paddingBlock: 'clamp(3rem, 8vw, 6rem)'}}
            >
                {/* Left: label + heading + subtitle + animation */}
                <Stack direction="vertical" gap={24} alignItems="center" style={{flex: 1}}>
                    <Label color="green" size="large">{hero.label}</Label>
                    <Heading as="h1" size="2" style={{textAlign: 'center'}}>
                        {hero.heading[0]}
                    </Heading>
                    <Text as="p" size="200" variant="muted" style={{textAlign: 'center'}}>
                        Το <span style={{color: 'var(--brand-color-accent-primary, #2da44e)', fontWeight: 600}}>TrustCrop</span>
                        {' '}είναι μια ολοκληρωμένη ψηφιακή πλατφόρμα διαχείρισης γεωργικής εκμετάλλευσης.
                    </Text>
                    <GeometricAccentLazy/>
                </Stack>

                {/* Right: feature list with octicons */}
                <Stack direction="vertical" gap={16} style={{flex: 1}}>
                    {features.map(({Icon, label, desc}) => (
                        <Stack key={label} direction="horizontal" gap={12} alignItems="flex-start">
                            <span style={{
                                flexShrink: 0,
                                marginTop: '3px',
                                color: 'var(--brand-color-accent-primary, #2da44e)',
                            }}>
                                <Icon size={16}/>
                            </span>
                            <Text as="span" size="100">
                                <Text as="span" size="100" weight="semibold">{label} — </Text>
                                {desc}
                            </Text>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Section>
    )
}