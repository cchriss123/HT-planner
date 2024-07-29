import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Zone {
    // User inputs
    name: string; // The name of the zone
    caliber: number; // The diameter of the hair
    fuPerCm2: number; // Follicular units per square centimeter
    hairPerCm2: number; // Hairs per square centimeter
    area: number; // Area in square centimeters
    desiredCoverageValue?: number; // Desired coverage value (can be used for both donor and recipient)

    // Calculated values from user inputs
    hairPerFu?: number; // = hairPerCm2 / fuPerCm2
}

export interface DonorZone extends Zone {
    // Counter values
    singles: number;
    doubles: number;
    triples: number;
    quadruples: number;
    graphs: number; // = singles + doubles + triples + quadruples //TODO change to grafts
    hairs: number; // = singles + (doubles * 2) + (triples * 3) + (quadruples * 4)
    hairPerCountedFu: number; // = hairs / graphs //TODO change to hair to hair per counted grafts

    // Calculated values from user inputs
    fuPerZone?: number; // = areaInCm2 * fuPerCm2
    coverageValue?: number; // = caliber * hairPerCm2
    hairPerZone?: number; // = areaInCm2 * hairPerCm2

    // Formula: fuExtractedToReachDonorDesiredCoverageValue = fuPerZone - ((areaInCm2 * desiredCoverageValue) / (caliber * hairPerFu))
    fuExtractedToReachDonorDesiredCoverageValue?: number;
    //only used in counter
   fuLeftToReachDonorDesiredCoverageValue?: number; // fuExtractedToReachDonorDesiredCoverageValue - grafts
}

// export type AnyZone = DonorZone | RecipientZone;

export interface RecipientZone extends Zone {

    // Calculated values from user inputs
    startingCoverageValue?: number; // = caliber * hairPerCm2
    coverageValueDifference?: number; // = recipientDesiredCoverageValue - starting

    // Formula: fuImplantedToReachDesiredRecipientCoverageValue = (areaInCm2 * coverageValueDifference) / (caliber * hairPerFu)
    fuImplantedToReachDesiredRecipientCoverageValue?: number; // The number of FUs to be implanted to achieve the desired recipient coverage value
}

interface AppStateContextType {
    donorZones: DonorZone[];
    setDonorZones: (zones: DonorZone[]) => void;
    recipientZones: RecipientZone[];
    setRecipientZones: (zones: RecipientZone[]) => void;

    updateTotalCounts(): void;
    totalSingles: number;
    totalDoubles: number;
    totalTriples: number;
    totalQuadruples: number;
    totalGraphs: number;
    totalHair: number;
    totalHairPerFU: number;
    calculateDonorZoneValues(zone: DonorZone): void;
    calculateRecipientZoneValues(zone: RecipientZone): void;
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
    // const [recipientZones, setRecipientZones] = useState<Zone[]>([]);
    const [donorZones, setDonorZones] = useState<DonorZone[]>(getMockDonorZones());
    const [recipientZones, setRecipientZones] = useState<RecipientZone[]>(getMockRecipientZones());
    donorZones.forEach(zone => calculateDonorZoneValues(zone));
    recipientZones.forEach(zone => calculateRecipientZoneValues(zone));

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
                recipientZones: recipientZones,
                setRecipientZones: setRecipientZones,
                updateTotalCounts: updateTotalCounts,
                totalSingles,
                totalDoubles,
                totalTriples,
                totalQuadruples,
                totalGraphs,
                totalHair,
                totalHairPerFU: totalHairPerFuCounted,
                calculateDonorZoneValues : calculateDonorZoneValues,
                calculateRecipientZoneValues : calculateRecipientZoneValues
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
            singles += zone.singles;
            doubles += zone.doubles;
            triples += zone.triples;
            quadruples += zone.quadruples;
            graphs += zone.graphs;
            hair += zone.hairs;
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
   function calculateDonorZoneValues(zone: DonorZone) {

        if(zone.desiredCoverageValue === undefined) {
            zone.desiredCoverageValue = 0;
        }

        zone.hairPerFu = zone.hairPerCm2 / zone.fuPerCm2;zone.fuPerZone = zone.area * zone.fuPerCm2;
        zone.coverageValue = zone.caliber * zone.hairPerCm2;
        zone.hairPerZone = zone.area * zone.hairPerCm2;
        zone.fuExtractedToReachDonorDesiredCoverageValue =  Math.floor(zone.fuPerZone - ((zone.area * zone.desiredCoverageValue) / (zone.caliber * zone.hairPerFu)));
        zone.fuLeftToReachDonorDesiredCoverageValue = Math.floor(zone.fuExtractedToReachDonorDesiredCoverageValue) - zone.graphs;
       console.log(JSON.stringify(zone));


   }
    function calculateRecipientZoneValues(zone: RecipientZone) {

        if(zone.desiredCoverageValue === undefined) {
            zone.desiredCoverageValue = 0;
        }

        zone.hairPerFu = zone.hairPerCm2 / zone.fuPerCm2;
        zone.startingCoverageValue = zone.caliber * zone.hairPerCm2;
        zone.coverageValueDifference = zone.desiredCoverageValue - zone.startingCoverageValue;
    }


function getMockDonorZones(): DonorZone[] {
    return [
        {
            name: 'Donor Zone 1',
            caliber: 0.05,
            fuPerCm2: 60,
            hairPerCm2: 180,
            area: 45,
            desiredCoverageValue: 6,
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            graphs: 0,
            hairs: 0,
            hairPerCountedFu: 0,

            fuPerZone: 0,
            coverageValue: 0,
            hairPerZone: 0,
            fuExtractedToReachDonorDesiredCoverageValue: 0,
            fuLeftToReachDonorDesiredCoverageValue: 0,

        },

        {
            name: 'Donor Zone 2',
            caliber: 0.07,
            fuPerCm2: 120,
            hairPerCm2: 150,
            area: 11.7,
            desiredCoverageValue: 5,
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            graphs: 0,
            hairs: 0,
            hairPerCountedFu: 0,

            fuPerZone: 0,
            coverageValue: 0,
            hairPerZone: 0,
            fuExtractedToReachDonorDesiredCoverageValue: 0,
            fuLeftToReachDonorDesiredCoverageValue: 0,

        },
        {
            name: 'Donor Zone 3',
            caliber: 0.08,
            fuPerCm2: 130,
            hairPerCm2: 170,
            area: 15.7,
            desiredCoverageValue: 5,
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            graphs: 0,
            hairs: 0,
            hairPerCountedFu: 0,

            fuPerZone: 0,
            coverageValue: 0,
            hairPerZone: 0,
            fuExtractedToReachDonorDesiredCoverageValue: 0,
            fuLeftToReachDonorDesiredCoverageValue: 0,

        }
    ];
}

function getMockRecipientZones() {
    return [
        {
            name: 'Recipient Zone 1',
            caliber: 0.06,
            fuPerCm2: 100,
            hairPerCm2: 200,
            area: 13.7,
            desiredCoverageValue: 20,
        },
        {
            name: 'Recipient Zone 2',
            caliber: 0.07,
            fuPerCm2: 120,
            hairPerCm2: 150,
            area: 11.7,
            desiredCoverageValue: 20,
        },
    ];
}
}
