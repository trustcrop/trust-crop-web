'use client'

import {MoonIcon, SunIcon} from '@primer/octicons-react'
import {Box, Image, Stack, SubNav, Text} from '@primer/react-brand'
import content from '../content/el.json'
import {useTheme} from './ThemeContext'

const {nav} = content

export function AppHeader() {
    const {colorMode, toggle} = useTheme()

    return (
        <Box
            padding="none"
            backgroundColor="default"
            style={{position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000}}
        >
            {/* Mobile-only toggle — sits left of the hamburger menu button */}
            <button
                className="mobile-theme-toggle"
                onClick={toggle}
                aria-label={colorMode === 'dark' ? 'Εναλλαγή σε φωτεινό θέμα' : 'Εναλλαγή σε σκοτεινό θέμα'}
            >
                {colorMode === 'dark' ? <SunIcon size={16}/> : <MoonIcon size={16}/>}
            </button>

            <SubNav>
                <SubNav.Heading href="/">
                    <Stack padding="none" direction="horizontal" gap="condensed" alignItems="center">
                        <Image src="/apple-icon.png" alt="TrustCrop" width={26} height={26} style={{width: 26, height: 26, objectFit: 'contain'}}/>
                        <Text size="200" weight="medium" style={{lineHeight: 1}}>TrustCrop</Text>
                    </Stack>
                </SubNav.Heading>

                <SubNav.Link href="#features">{nav.features}</SubNav.Link>
                <SubNav.Link href="#pricing">{nav.pricing}</SubNav.Link>
                <SubNav.Link href="#find-us">{nav.contact}</SubNav.Link>

                {/*
                  Theme toggle — rendered as the LAST link so it lands in the
                  same <ul> as the CTA, immediately to its left on desktop.
                  Hidden inside the collapsed overlay on mobile (see globals.css);
                  the floating .mobile-theme-toggle button is used there instead.
                */}
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <SubNav.Link
                    href="#"
                    onClick={(e: React.MouseEvent) => { e.preventDefault(); toggle() }}
                    aria-label={colorMode === 'dark' ? 'Εναλλαγή σε φωτεινό θέμα' : 'Εναλλαγή σε σκοτεινό θέμα'}
                    className="theme-toggle-desktop"
                >
                    {colorMode === 'dark' ? <SunIcon size={16}/> : <MoonIcon size={16}/>}
                </SubNav.Link>

                <SubNav.Action href="https://app.trustcrop.gr" variant="accent">
                    {nav.getStarted}
                </SubNav.Action>
            </SubNav>
        </Box>
    )
}
