'use client'

import {Grid, Heading, Label, Section, Text} from '@primer/react-brand'
import content from '../content/el.json'
import {GeometricAccent} from './GeometricAccent'

const {hero} = content

const improvedDescription = `Το TrustCrop φέρνει κάθε πτυχή της αγροδιατροφικής αλυσίδας σε μία ενιαία ψηφιακή πλατφόρμα. Από την καταγραφή καλλιεργειών και τη διαχείριση εισροών έως τη συσκευασία, την ιχνηλασιμότητα και την ανάλυση δεδομένων σε πραγματικό χρόνο — αποκτήστε πλήρη έλεγχο και λαμβάνετε καλύτερες αποφάσεις καθημερινά.`

export function HeroSection() {
    return (
        <Section paddingBlockStart="none">
            <div className="hero-two-col">
                <Grid fullWidth>
                    {/* Left: label + heading */}
                    <Grid.Column span={{xsmall: 12, medium: 6}}>
                        <div className="hero-col hero-col--left">
                            <Label color="green" size="large">{hero.label}</Label>
                            <Heading as="h1" size="2" className="hero-main-heading">
                                {hero.heading[0]}
                                {hero.heading[1] ? <><br/>{hero.heading[1]}</> : null}
                            </Heading>
                        </div>
                    </Grid.Column>

                    {/* Right: improved description, no button */}
                    <Grid.Column span={{xsmall: 12, medium: 6}}>
                        <div className="hero-col hero-col--right">
                            <Text as="p" size="300" variant="muted" className="hero-desc">
                                {improvedDescription}
                            </Text>
                        </div>
                    </Grid.Column>
                </Grid>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2.5rem'}}>
                <GeometricAccent/>
            </div>
        </Section>
    )
}