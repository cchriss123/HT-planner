import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Zone {
    name: string;
    singles: number;
    doubles: number;
    triples: number;
    quadruples: number;
    graphs: number;
    hair: number;
    averageHairPerFU: number;
    area: number;
}

interface AppStateContextType {
    zones: Zone[];
    setZones: (zones: Zone[]) => void;
    updateTotalCounts(): void;
    totalSingles: number;
    totalDoubles: number;
    totalTriples: number;
    totalQuadruples: number;
    totalGraphs: number;
    totalHair: number;
    totalHairPerFU: number;
}

export const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function useAppState() {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
}

export function AppStateProvider({children}: { children: ReactNode }) {
    // const [zones, setZones] = useState<Zone[]>([]);
    const [zones, setZones] = useState<Zone[]>(getMockZones());

    const [totalSingles, setTotalSingles] = useState(0);
    const [totalDoubles, setTotalDoubles] = useState(0);
    const [totalTriples, setTotalTriples] = useState(0);
    const [totalQuadruples, setTotalQuadruples] = useState(0);
    const [totalGraphs, setTotalGraphs] = useState(0);
    const [totalHair, setTotalHair] = useState(0);
    const [totalHairPerFU, setTotalHairPerFU] = useState(0);

    return (
        <AppStateContext.Provider
            value={{
                zones,
                setZones,
                updateTotalCounts: updateTotalCounts,
                totalSingles,
                totalDoubles,
                totalTriples,
                totalQuadruples,
                totalGraphs,
                totalHair,
                totalHairPerFU,
            }}
        >
            {children}
        </AppStateContext.Provider>
    );

    function updateTotalCounts() {
        let singles = 0;
        let doubles = 0;
        let triples = 0;
        let quadruples = 0;
        let graphs = 0;
        let hair = 0;
        let totalArea = 0;

        for (const zone of zones) {
            singles += zone.singles;
            doubles += zone.doubles;
            triples += zone.triples;
            quadruples += zone.quadruples;
            graphs += zone.graphs;
            hair += zone.hair;
            totalArea += zone.area;
        }

        setTotalSingles(singles);
        setTotalDoubles(doubles);
        setTotalTriples(triples);
        setTotalQuadruples(quadruples);
        setTotalGraphs(graphs);
        setTotalHair(hair);
        setTotalHairPerFU(graphs > 0 ? hair / graphs : 0);
    }
}

function getMockZones(): Zone[] {
    return [
        {
            // createdAt: new Date(new Date().getTime() + 1000).toISOString(),
            name: 'Zone 1',
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            graphs: 0,
            hair: 0,
            area: 4.5,
            averageHairPerFU: 0,
        },
        {
            // createdAt: new Date().toISOString(),
            name: 'Zone 2',
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            graphs: 0,
            hair: 0,
            area: 13.7,
            averageHairPerFU: 0,
        },
    ];
}
