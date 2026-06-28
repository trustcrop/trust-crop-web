'use client'

import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import * as topojson from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'

const SIZE = 96
const WORLD_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

export function GeometricAccent() {
    const [geoJson, setGeoJson] = useState<d3.ExtendedFeatureCollection | null>(null)
    const landRef  = useRef<SVGPathElement>(null)
    const sphereRef = useRef<SVGPathElement>(null)
    const graticuleRef = useRef<SVGPathElement>(null)

    // Fetch world TopoJSON once
    useEffect(() => {
        fetch(WORLD_URL)
            .then(r => r.json())
            .then((topo: Topology) => {
                const countries = (topo.objects as Record<string, GeometryCollection>).countries
                setGeoJson(topojson.feature(topo, countries) as d3.ExtendedFeatureCollection)
            })
    }, [])

    // Animate — bypass React reconciliation by mutating SVG attrs directly
    useEffect(() => {
        if (!geoJson) return

        const projection = d3.geoOrthographic()
            .scale(SIZE / 2 - 2)
            .translate([SIZE / 2, SIZE / 2])
            .clipAngle(90)

        const path      = d3.geoPath(projection)
        const graticule = d3.geoGraticule10()

        // Always paint at least one static frame so the globe is visible
        // even when the animation loop is disabled (reduced-motion / SSR).
        const render = (rot: number) => {
            projection.rotate([rot, -20])
            landRef.current?.setAttribute('d',      path(geoJson)          ?? '')
            sphereRef.current?.setAttribute('d',    path({type: 'Sphere'}) ?? '')
            graticuleRef.current?.setAttribute('d', path(graticule)        ?? '')
        }

        render(0)


        let rotation = 0
        let rafId: number

        const tick = () => {
            rotation += 0.2
            render(rotation)
            rafId = requestAnimationFrame(tick)
        }

        rafId = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafId)
    }, [geoJson])

    return (
        <div className="geo-accent" aria-hidden="true">
            <div className="earth-globe">
                <svg width={SIZE} height={SIZE}>
                    {/* Ocean fill */}
                    <path ref={sphereRef} fill="#0c2340"/>
                    {/* Graticule grid */}
                    <path ref={graticuleRef} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.4"/>
                    {/* Countries */}
                    <path ref={landRef} fill="#2da44e" fillOpacity="0.88" stroke="#1a7a30" strokeWidth="0.4"/>
                </svg>
                <div className="earth-sheen"/>
            </div>
        </div>
    )
}
