import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Zone {
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
    countOne: number;
    countTwo: number;
    countThree: number;
    countTotalGraphs: number;
    countTotalHair: number;
    setZones: (zones: Zone[]) => void;
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
    const [zones, setZones] = useState<Zone[]>([]);
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
                setCountOne,
                countTwo,
                setCountTwo,
                countThree,
                setCountThree,
                countTotalGraphs,
                setCountTotalGraphs,
                countTotalHair,
                setCountTotalHair,
            }}
        >
            {children}
        </AppStateContext.Provider>
    );
};
