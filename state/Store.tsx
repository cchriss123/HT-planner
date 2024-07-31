import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Zone {
    // User inputs
    type: 'donor' | 'recipient';
    name: string; // The name of the zone
    caliber: number; // The diameter of the hair
    graftsPerCm2: number; // Follicular units per square centimeter
    hairPerCm2: number; // Hairs per square centimeter
    area: number; // Area in square centimeters
    desiredCoverageValue: number; // Desired coverage value (can be used for both donor and recipient)

    // Calculated values from user inputs
    hairPerGraft?: number; // = hairPerCm2 / graftsPerCm2
}

export interface DonorZone extends Zone {
    // Counter values
    type: 'donor';
    singles: number;
    doubles: number;
    triples: number;
    quadruples: number;
    grafts: number; // = singles + doubles + triples + quadruples
    hairs: number; // = singles + (doubles * 2) + (triples * 3) + (quadruples * 4)
    hairPerCountedGraft: number; // = hairs / grafts

    // Calculated values from user inputs
    fuPerZone: number; // = areaInCm2 * graftsPerCm2
    coverageValue: number; // = caliber * hairPerCm2
    hairPerZone: number; // = areaInCm2 * hairPerCm2

    // Formula: graftsExtractedToReachDonorDesiredCoverageValue = fuPerZone - ((areaInCm2 * desiredCoverageValue) / (caliber * hairPerGraft))
    graftsExtractedToReachDonorDesiredCoverageValue: number;
    //only used in counter
   graftsLeftToReachDonorDesiredCoverageValue: number; // graftsExtractedToReachDonorDesiredCoverageValue - grafts
}


export interface RecipientZone extends Zone {

    // Calculated values from user inputs
    type: 'recipient';
    startingCoverageValue: number; // = caliber * hairPerCm2
    coverageValueDifference: number; // = recipientDesiredCoverageValue - starting

    // Formula: fuImplantedToReachDesiredRecipientCoverageValue = (areaInCm2 * coverageValueDifference) / (caliber * hairPerGraft)
    fuImplantedToReachDesiredRecipientCoverageValue: number; // The number of FUs to be implanted to achieve the desired recipient coverage value
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
    totalGrafts: number;
    totalHair: number;
    totalHairPerGraft: number;
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
    const [totalGrafts, setTotalGrafts] = useState(0);
    const [totalHair, setTotalHair] = useState(0);
    const [totalHairPerGraftsCounted, setTotalHairPerGraftsCounted] = useState(0);



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
                totalGrafts: totalGrafts,
                totalHair,
                totalHairPerGraft: totalHairPerGraftsCounted,
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
        let grafts = 0;
        let hair = 0;
        let totalArea = 0;

        for (const zone of donorZones) {
            singles += zone.singles;
            doubles += zone.doubles;
            triples += zone.triples;
            quadruples += zone.quadruples;
            grafts += zone.grafts;
            hair += zone.hairs;
            totalArea += zone.area;
        }

        setTotalSingles(singles);
        setTotalDoubles(doubles);
        setTotalTriples(triples);
        setTotalQuadruples(quadruples);
        setTotalGrafts(grafts);
        setTotalHair(hair);
        setTotalHairPerGraftsCounted(grafts > 0 ? hair / grafts : 0);

    }
   function calculateDonorZoneValues(zone: DonorZone) {


        zone.hairPerGraft = zone.hairPerCm2 / zone.graftsPerCm2;zone.fuPerZone = zone.area * zone.graftsPerCm2;
        zone.coverageValue = zone.caliber * zone.hairPerCm2;
        zone.hairPerZone = zone.area * zone.hairPerCm2;
        zone.graftsExtractedToReachDonorDesiredCoverageValue =  Math.floor(zone.fuPerZone - ((zone.area * zone.desiredCoverageValue) / (zone.caliber * zone.hairPerGraft)));
        zone.graftsLeftToReachDonorDesiredCoverageValue = Math.floor(zone.graftsExtractedToReachDonorDesiredCoverageValue) - zone.grafts;
        // console.log(JSON.stringify(zone));


   }
    function calculateRecipientZoneValues(zone: RecipientZone) {

        if(zone.desiredCoverageValue === undefined) {
            zone.desiredCoverageValue = 0;
        }

        zone.hairPerGraft = zone.hairPerCm2 / zone.graftsPerCm2;
        zone.startingCoverageValue = zone.caliber * zone.hairPerCm2;
        zone.coverageValueDifference = zone.desiredCoverageValue - zone.startingCoverageValue;
    }


function getMockDonorZones(): DonorZone[] {
    return [
        {
            type: 'donor',
            name: 'Donor Zone 1',
            caliber: 0.05,
            graftsPerCm2: 60,
            hairPerCm2: 180,
            area: 45,
            desiredCoverageValue: 6,
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            grafts: 0,
            hairs: 0,
            hairPerCountedGraft: 0,

            fuPerZone: 0,
            coverageValue: 0,
            hairPerZone: 0,
            graftsExtractedToReachDonorDesiredCoverageValue: 0,
            graftsLeftToReachDonorDesiredCoverageValue: 0,

        },

        {
            type: 'donor',
            name: 'Donor Zone 2',
            caliber: 0.07,
            graftsPerCm2: 120,
            hairPerCm2: 150,
            area: 11.7,
            desiredCoverageValue: 5,
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            grafts: 0,
            hairs: 0,
            hairPerCountedGraft: 0,

            fuPerZone: 0,
            coverageValue: 0,
            hairPerZone: 0,
            graftsExtractedToReachDonorDesiredCoverageValue: 0,
            graftsLeftToReachDonorDesiredCoverageValue: 0,

        },
        {
            type: 'donor',
            name: 'Donor Zone 3',
            caliber: 0.08,
            graftsPerCm2: 130,
            hairPerCm2: 170,
            area: 15.7,
            desiredCoverageValue: 5,
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            grafts: 0,
            hairs: 0,
            hairPerCountedGraft: 0,

            fuPerZone: 0,
            coverageValue: 0,
            hairPerZone: 0,
            graftsExtractedToReachDonorDesiredCoverageValue: 0,
            graftsLeftToReachDonorDesiredCoverageValue: 0,

        },
        {
            type: 'donor',
            name: 'Donor Zone 4',
            caliber: 0.09,
            graftsPerCm2: 140,
            hairPerCm2: 190,
            area: 17.7,
            desiredCoverageValue: 5,
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            grafts: 0,
            hairs: 0,
            hairPerCountedGraft: 0,

            fuPerZone: 0,
            coverageValue: 0,
            hairPerZone: 0,
            graftsExtractedToReachDonorDesiredCoverageValue: 0,
            graftsLeftToReachDonorDesiredCoverageValue: 0,
        },
        {
            type: 'donor',
            name: 'Donor Zone 5',
            caliber: 0.1,
            graftsPerCm2: 150,
            hairPerCm2: 200,
            area: 19.7,
            desiredCoverageValue: 5,
            singles: 0,
            doubles: 0,
            triples: 0,
            quadruples: 0,
            grafts: 0,
            hairs: 0,
            hairPerCountedGraft: 0,

            fuPerZone: 0,
            coverageValue: 0,
            hairPerZone: 0,
            graftsExtractedToReachDonorDesiredCoverageValue: 0,
            graftsLeftToReachDonorDesiredCoverageValue: 0,
        },
        // {
        //     type: 'donor',
        //     name: 'Donor Zone 6',
        //     caliber: 0.11,
        //     graftsPerCm2: 160,
        //     hairPerCm2: 210,
        //     area: 21.7,
        //     desiredCoverageValue: 5,
        //     singles: 0,
        //     doubles: 0,
        //     triples: 0,
        //     quadruples: 0,
        //     grafts: 0,
        //     hairs: 0,
        //     hairPerCountedGraft: 0,
        //
        //     fuPerZone: 0,
        //     coverageValue: 0,
        //     hairPerZone: 0,
        //     graftsExtractedToReachDonorDesiredCoverageValue: 0,
        //     graftsLeftToReachDonorDesiredCoverageValue: 0,
        // },
        // {
        //     type: 'donor',
        //     name: 'Donor Zone 7',
        //     caliber: 0.12,
        //     graftsPerCm2: 170,
        //     hairPerCm2: 220,
        //     area: 23.7,
        //     desiredCoverageValue: 5,
        //     singles: 0,
        //     doubles: 0,
        //     triples: 0,
        //     quadruples: 0,
        //     grafts: 0,
        //     hairs: 0,
        //     hairPerCountedGraft: 0,
        //
        //     fuPerZone: 0,
        //     coverageValue: 0,
        //     hairPerZone: 0,
        //     graftsExtractedToReachDonorDesiredCoverageValue: 0,
        //     graftsLeftToReachDonorDesiredCoverageValue: 0,
        // }
        // ,
        // {
        //     type: 'donor',
        //     name: 'Donor Zone 8',
        //     caliber: 0.13,
        //     graftsPerCm2: 180,
        //     hairPerCm2: 230,
        //     area: 25.7,
        //     desiredCoverageValue: 5,
        //     singles: 0,
        //     doubles: 0,
        //     triples: 0,
        //     quadruples: 0,
        //     grafts: 0,
        //     hairs: 0,
        //     hairPerCountedGraft: 0,
        //
        //     fuPerZone: 0,
        //     coverageValue: 0,
        //     hairPerZone: 0,
        //     graftsExtractedToReachDonorDesiredCoverageValue: 0,
        //     graftsLeftToReachDonorDesiredCoverageValue: 0,
        // },
        // {
        //     type: 'donor',
        //     name: 'Donor Zone 9',
        //     caliber: 0.14,
        //     graftsPerCm2: 190,
        //     hairPerCm2: 240,
        //     area: 27.7,
        //     desiredCoverageValue: 5,
        //     singles: 0,
        //     doubles: 0,
        //     triples: 0,
        //     quadruples: 0,
        //     grafts: 0,
        //     hairs: 0,
        //     hairPerCountedGraft: 0,
        //
        //     fuPerZone: 0,
        //     coverageValue: 0,
        //     hairPerZone: 0,
        //     graftsExtractedToReachDonorDesiredCoverageValue: 0,
        //     graftsLeftToReachDonorDesiredCoverageValue: 0,
        // },
        // {
        //     type: 'donor',
        //     name: 'Donor Zone 10',
        //     caliber: 0.15,
        //     graftsPerCm2: 200,
        //     hairPerCm2: 250,
        //     area: 29.7,
        //     desiredCoverageValue: 5,
        //     singles: 0,
        //     doubles: 0,
        //     triples: 0,
        //     quadruples: 0,
        //     grafts: 0,
        //     hairs: 0,
        //     hairPerCountedGraft: 0,
        //
        //     fuPerZone: 0,
        //     coverageValue: 0,
        //     hairPerZone: 0,
        //     graftsExtractedToReachDonorDesiredCoverageValue: 0,
        //     graftsLeftToReachDonorDesiredCoverageValue: 0,
        // }





    ];
}

function getMockRecipientZones() : RecipientZone[] {
    return [
        {
            type: 'recipient',
            name: 'Recipient Zone 1',
            caliber: 0.06,
            graftsPerCm2: 100,
            hairPerCm2: 200,
            area: 13.7,
            desiredCoverageValue: 20,

            startingCoverageValue: 0,
            coverageValueDifference: 0,
            fuImplantedToReachDesiredRecipientCoverageValue: 0,
        },
        {
            type: 'recipient',
            name: 'Recipient Zone 2',
            caliber: 0.07,
            graftsPerCm2: 120,
            hairPerCm2: 150,
            area: 11.7,
            desiredCoverageValue: 20,

            startingCoverageValue: 0,
            coverageValueDifference: 0,
            fuImplantedToReachDesiredRecipientCoverageValue: 0,
        },
    ];
}
}
