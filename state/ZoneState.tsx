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

    totalSingles: number;
    totalDoubles: number;
    totalTriples: number;
    totalQuadruples: number;
    totalGraphs: number;
    totalHair: number;
    totalHairPerFU: number;

    setZones: (zones: Zone[]) => void;

    setTotalSingles: (count: number) => void;
    setTotalDoubles: (count: number) => void;
    setTotalTriples: (count: number) => void;
    setTotalQuadruples: (count: number) => void;
    setTotalGraphs: (count: number) => void;
    setTotalHair: (count: number) => void;
    setTotalHairPerFU: (count: number) => void;
}

export const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const useAppState = () => {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
};

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
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
                totalSingles,
                setTotalSingles,
                totalDoubles,
                setTotalDoubles,
                totalTriples,
                setTotalTriples,
                totalQuadruples,
                setTotalQuadruples,
                totalGraphs,
                setTotalGraphs,
                totalHair,
                setTotalHair,
                totalHairPerFU,
                setTotalHairPerFU,
            }}
        >
            {children}
        </AppStateContext.Provider>
    );
};

const getMockZones = (): Zone[] => {
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
};
