import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Zone {
    createdAt: string;
    name: string;
    countOne: number;
    countTwo: number;
    countThree: number;
    totalGraphs: number;
    totalHair: number;
}

interface AppStateContextType {
    zones: Zone[];
    setZones: (zones: Zone[]) => void;
    countOne: number;
    countTwo: number;
    countThree: number;
    setCountOne: (count: number) => void;
    setCountTwo: (count: number) => void;
    setCountThree: (count: number) => void;
    setCountTotalGraphs: (count: number) => void;
    setCountTotalHair: (count: number) => void;
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
    const [countOne, setCountOne] = useState(0);
    const [countTwo, setCountTwo] = useState(0);
    const [countThree, setCountThree] = useState(0);
    const [countTotalGraphs, setCountTotalGraphs] = useState(0);
    const [countTotalHair, setCountTotalHair] = useState(0);

    return (
        <AppStateContext.Provider
            value={{
                zones,
                setZones,
                countOne,
                countTwo,
                countThree,
                setCountOne,
                setCountTwo,
                setCountThree,
                setCountTotalGraphs,
                setCountTotalHair,
            }}
        >
            {children}
        </AppStateContext.Provider>
    );
};

const getMockZones = (): Zone[] => {
    return [
        {
            createdAt: new Date(new Date().getTime() + 1000).toISOString(),
            name: 'Zone 1',
            countOne: 0,
            countTwo: 0,
            countThree: 0,
            totalGraphs: 0,
            totalHair: 0,
        },
        {
            createdAt: new Date().toISOString(),
            name: 'Zone 2',
            countOne: 0,
            countTwo: 0,
            countThree: 0,
            totalGraphs: 0,
            totalHair: 0,
        },
    ];
};
