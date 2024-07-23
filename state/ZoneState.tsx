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




    // singles: number;
    // doubles: number;
    // triples: number;
    // setCountOne: (count: number) => void;
    // setCountTwo: (count: number) => void;
    // setCountThree: (count: number) => void;
    // setCountTotalGraphs: (count: number) => void;
    // setCountTotalHair: (count: number) => void;
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
    // const [singles, setCountOne] = useState(0);
    // const [doubles, setCountTwo] = useState(0);
    // const [triples, setCountThree] = useState(0);
    // const [countTotalGraphs, setCountTotalGraphs] = useState(0);
    // const [countTotalHair, setCountTotalHair] = useState(0);

    return (
        <AppStateContext.Provider
            value={{
                zones,
                setZones,
                // singles,
                // doubles,
                // triples,
                // setCountOne,
                // setCountTwo,
                // setCountThree,
                // setCountTotalGraphs,
                // setCountTotalHair,
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
