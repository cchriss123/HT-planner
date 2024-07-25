import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Zone {
    // User inputs
    name: string; // The name of the zone
    caliber: number; // The diameter of the hair
    fuPerCm2: number; // Follicular units per square centimeter
    hairPerCm2: number; // Hairs per square centimeter
    area: number; // Area in square centimeters
    desiredCoverageValue: number; // Desired coverage value (can be used for both donor and recipient)

    // Calculated values from user inputs
    fuPerZone?: number; // = areaInCm2 * fuPerCm2
    hairPerFu?: number; // = hairPerCm2 / fuPerCm2
    coverageValue?: number; // = caliber * hairPerCm2
    hairPerZone?: number; // = areaInCm2 * hairPerCm2

    // Counter values (Donor only)
    singles?: number;
    doubles?: number;
    triples?: number;
    quadruples?: number;
    graphs?: number; // = singles + doubles + triples + quadruples
    hairs?: number; // = singles + (doubles * 2) + (triples * 3) + (quadruples * 4)
    hairPerCountedFu?: number; // = hairs / graphs

    // Output values
    // Donor
    fuExtractedToReachDonorDesiredCoverageValue?: number; // The number of FUs to be extracted to achieve the desired donor coverage value
    // Formula: fuExtractedToReachDonorDesiredCoverageValue = fuPerZone - ((areaInCm2 * desiredCoverageValue) / (caliber * hairPerFu))

    // Recipient
    fuImplantedToReachDesiredRecipientCoverageValue?: number; // The number of FUs to be implanted to achieve the desired recipient coverage value
    // Formula: fuImplantedToReachDesiredRecipientCoverageValue = (areaInCm2 * coverageValueDifference) / (caliber * hairPerFu)
}

interface AppStateContextType {
    donorZones: Zone[];
    setDonorZones: (zones: Zone[]) => void;


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
    // const [donorZones, setDonorZones] = useState<Zone[]>([]);
    const [donorZones, setDonorZones] = useState<Zone[]>(getMockZones());
    // const [recipientZones, setRecipientZones] = useState<Zone[]>([]);

    const [totalSingles, setTotalSingles] = useState(0);
    const [totalDoubles, setTotalDoubles] = useState(0);
    const [totalTriples, setTotalTriples] = useState(0);
    const [totalQuadruples, setTotalQuadruples] = useState(0);
    const [totalGraphs, setTotalGraphs] = useState(0);
    const [totalHair, setTotalHair] = useState(0);
    const [totalHairPerFuCounted, setTotalHairPerFuCounted] = useState(0);




    return (
        <AppStateContext.Provider
            value={{
                donorZones: donorZones,
                setDonorZones: setDonorZones,
                updateTotalCounts: updateTotalCounts,
                totalSingles,
                totalDoubles,
                totalTriples,
                totalQuadruples,
                totalGraphs,
                totalHair,
                totalHairPerFU: totalHairPerFuCounted,
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

        for (const zone of donorZones) {
            singles += zone.singles || 0;
            doubles += zone.doubles || 0;
            triples += zone.triples || 0;
            quadruples += zone.quadruples || 0;
            graphs += zone.graphs || 0;
            hair += zone.hairs || 0;
            totalArea += zone.area;
        }

        setTotalSingles(singles);
        setTotalDoubles(doubles);
        setTotalTriples(triples);
        setTotalQuadruples(quadruples);
        setTotalGraphs(graphs);
        setTotalHair(hair);
        setTotalHairPerFuCounted(graphs > 0 ? hair / graphs : 0);
    }
}

function getMockZones(): Zone[] {
    return [
        {
            // createdAt: new Date().toISOString(),
            name: 'Zone 1',
            caliber: 0.06,
            fuPerCm2: 100,
            hairPerCm2: 200,
            area: 13.7,
            desiredCoverageValue: 20,
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            graphs: 0,
            hairs: 0,
            hairPerCountedFu: 0,
        },

        {
            // createdAt: new Date().toISOString(),
            name: 'Zone 2',
            caliber: 0.07,
            fuPerCm2: 120,
            hairPerCm2: 150,
            area: 11.7,
            desiredCoverageValue: 20,
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            graphs: 0,
            hairs: 0,
            hairPerCountedFu: 0,
        },
    ];
}
