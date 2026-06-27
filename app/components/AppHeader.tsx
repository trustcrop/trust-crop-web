'use client'

import {Box, Image, Stack, SubNav, Text} from '@primer/react-brand'
import content from '../content/el.json'

const {nav} = content

export function AppHeader() {
    return (
        <Box
            padding="none"
            backgroundColor="default"
            style={{position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000}}
        >
            <SubNav>
                <SubNav.Heading href="/">
                    <Stack padding="none" direction="horizontal" gap="condensed" alignItems="center">
                        <Image src="/logo-64.png" alt="TrustCrop" width={26} height={26} style={{width: 26, height: 26, objectFit: 'contain'}}/>
                        <Text size="200" weight="medium" style={{lineHeight: 1}}>TrustCrop</Text>
                    </Stack>
                </SubNav.Heading>

                <SubNav.Link href="#features">{nav.features}</SubNav.Link>
                <SubNav.Link href="#pricing">{nav.pricing}</SubNav.Link>
                <SubNav.Link href="#find-us">{nav.contact}</SubNav.Link>

                <SubNav.Action href="https://app.trustcrop.gr" variant="accent">
                    {nav.getStarted}
                </SubNav.Action>
            </SubNav>
        </Box>
    )
}
