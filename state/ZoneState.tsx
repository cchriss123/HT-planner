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
    setZones: (zones: Zone[]) => void;
    updateZone: (zone: Zone) => void;
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
    const [zones, setZones] = useState<Zone[]>([]);
    const [countOne, setCountOne] = useState(0);
    const [countTwo, setCountTwo] = useState(0);
    const [countThree, setCountThree] = useState(0);
    const [countTotalGraphs, setCountTotalGraphs] = useState(0);
    const [countTotalHair, setCountTotalHair] = useState(0);




    function updateZone(Zone: Zone) {
        for (const z of zones) {
            if (z.createdAt === Zone.createdAt) {
                Object.assign(z, Zone);
                break;
            }
        }
        // zoneState.setCountTotalGraphs(zoneState.countOne + zoneState.countTwo + zoneState.countThree);
        // zoneState.setCountTotalHair(zoneState.countOne + zoneState.countTwo + zoneState.countThree + value * value);
        //
        // zoneState.updateZone(updatedZone);

        const newZones = [...zones];
        setZones(newZones);
    }

    return (
        <AppStateContext.Provider
            value={{
                zones,
                setZones,
                updateZone,
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