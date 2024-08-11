import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Zone {
    // User inputs
    type: 'donor' | 'recipient';
    name: string;
    caliber: number;
    graftsPerCm2: number;
    hairPerCm2: number;
    area: number;
    desiredCoverageValue: number;

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
    grafts: number;
    hairs: number;
    hairPerCountedGraft: number;

    // Calculated values from user inputs
    graftsPerZone: number; // = areaInCm2 * graftsPerCm2
    coverageValue: number; // = caliber * hairPerCm2
    hairPerZone: number; // = areaInCm2 * hairPerCm2

    // Formula: graftsExtractedToReachDonorDesiredCoverageValue = graftsPerZone - ((areaInCm2 * desiredCoverageValue) / (caliber * hairPerGraft))
    graftsExtractedToReachDonorDesiredCoverageValue: number;
    //only used in counter
    graftsLeftToReachDonorDesiredCoverageValue: number; // graftsExtractedToReachDonorDesiredCoverageValue - grafts
}

export interface RecipientZone extends Zone {
    // Calculated values from user inputs
    type: 'recipient';
    startingCoverageValue: number; // = caliber * hairPerCm2
    coverageValueDifference: number; // = recipientDesiredCoverageValue - starting
    grafts: number;

    // Formula: graftsImplantedToReachDesiredRecipientCoverageValue = (areaInCm2 * coverageValueDifference) / (caliber * hairPerGraft)
    graftsImplantedToReachDesiredRecipientCoverageValue: number; // The number of FUs to be implanted to achieve the desired recipient coverage value
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
    totalHairPerGraftsCounted: number;

    calculateDonorZoneValues(zone: DonorZone): void;
    calculateRecipientZoneValues(zone: RecipientZone): void;

    ip: string;
    saveIp(ip: string): void;
}

export const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function useAppState() {
    const context = useContext(AppStateContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
}

export function AppStateProvider({ children }: { children: ReactNode }) {
    const [donorZones, setDonorZones] = useState<DonorZone[]>([]);
    const [recipientZones, setRecipientZones] = useState<RecipientZone[]>([]);
    const [initialized, setInitialized] = useState(false);

    const [totalSingles, setTotalSingles] = useState(0);
    const [totalDoubles, setTotalDoubles] = useState(0);
    const [totalTriples, setTotalTriples] = useState(0);
    const [totalQuadruples, setTotalQuadruples] = useState(0);
    const [totalGrafts, setTotalGrafts] = useState(0);
    const [totalHair, setTotalHair] = useState(0);
    const [totalHairPerGraftsCounted, setTotalHairPerGraftsCounted] = useState(0);
    const [ip, setIp] = useState('');

    async function loadIp(): Promise<string> {
        try {
            const storedIp = await AsyncStorage.getItem('ip');
            if (storedIp) {
                return storedIp;
            }
        } catch (error) {
            console.error('Failed to load ip from AsyncStorage', error);
        }
        return '';
    }

    async function loadDonorZones(): Promise<DonorZone[]> {

        // await AsyncStorage.clear();
        // console.log('AsyncStorage cleared');

        try {
            const storedDonorZones = await AsyncStorage.getItem('donorZones');
            if (storedDonorZones) {
                console.log('Loaded donor zones from AsyncStorage');
                return JSON.parse(storedDonorZones) as DonorZone[];

            }
        } catch (error) {
            console.error('Failed to load donor zones from AsyncStorage', error);
        }

        return getMockDonorZones();
    }

    async function loadRecipientZones(): Promise<RecipientZone[]> {
        try {
            const storedRecipientZones = await AsyncStorage.getItem('recipientZones');
            if (storedRecipientZones) {
                return JSON.parse(storedRecipientZones) as RecipientZone[];
            }
        } catch (error) {
            console.error('Failed to load recipient zones from AsyncStorage', error);
        }
        return getMockRecipientZones();
    }

    useEffect(() => {
        async function initializeZones() {
            const loadedDonorZones = await loadDonorZones();
            const loadedRecipientZones = await loadRecipientZones();
            setIp(await loadIp());
            loadedDonorZones.forEach(zone => calculateDonorZoneValues(zone));
            loadedRecipientZones.forEach(zone => calculateRecipientZoneValues(zone));
            setInitialized(true);

            setDonorZones([...loadedDonorZones]);
            setRecipientZones([...loadedRecipientZones]);


        }
        initializeZones();
    }, []);

    useEffect(() => {
        if (initialized) {
            saveZones('donorZones', donorZones);
            updateTotalCounts();
            recipientZones.forEach(zone => calculateRecipientZoneValues(zone));
        }
    }, [donorZones]);

    useEffect(() => {
        if (initialized) {
            saveZones('recipientZones', recipientZones);
        }
    }, [recipientZones]);

    async function saveZones(key: string, zones: DonorZone[] | RecipientZone[]) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(zones));
        } catch (error) {
            console.error(`Failed to save ${key} to AsyncStorage`, error);
        }
    }

    return (
        <AppStateContext.Provider
            value={{
                donorZones,
                setDonorZones,
                recipientZones,
                setRecipientZones,
                updateTotalCounts,
                totalSingles,
                totalDoubles,
                totalTriples,
                totalQuadruples,
                totalGrafts,
                totalHair,
                totalHairPerGraftsCounted,
                calculateDonorZoneValues,
                calculateRecipientZoneValues,
                ip,
                saveIp,

            }}
        >
            {children}
        </AppStateContext.Provider>
    );

    async function saveIp(ip: string) {
        setIp(ip);
        try {
            await AsyncStorage.setItem('ip', ip);
        } catch (error) {
            console.error('Failed to save ip to AsyncStorage', error);
        }
    }

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
        zone.hairPerGraft = zone.hairPerCm2 / zone.graftsPerCm2;
        zone.graftsPerZone = zone.area * zone.graftsPerCm2;
        zone.coverageValue = zone.caliber * zone.hairPerCm2;
        zone.hairPerZone = zone.area * zone.hairPerCm2;
        zone.graftsExtractedToReachDonorDesiredCoverageValue = Math.floor(zone.graftsPerZone - ((zone.area * zone.desiredCoverageValue) / (zone.caliber * zone.hairPerGraft)));
        zone.graftsLeftToReachDonorDesiredCoverageValue = Math.floor(zone.graftsExtractedToReachDonorDesiredCoverageValue) - zone.grafts;
    }

    function getDonorZoneAvgCaliber() {

        const amountOfDonorZones = donorZones.length;

        if (amountOfDonorZones === 0) {
            return 0;
        }

        let sum = 0;
        for (const zone of donorZones) {
            sum += zone.caliber;
        }
        console.log(sum / amountOfDonorZones);

        return sum / amountOfDonorZones;
    }

    function getDonorZoneAvgHairPerGraft() {
        const amountOfDonorZones = donorZones.length;

        if (amountOfDonorZones === 0) {
            return 0;
        }
        let sum = 0;
        for (const zone of donorZones) {
            sum += zone.hairPerGraft || 0;
        }
        return sum / amountOfDonorZones;
    }

    function calculateRecipientZoneValues(zone: RecipientZone) {
        if (zone.desiredCoverageValue === undefined) {
            zone.desiredCoverageValue = 0;
        }

        zone.grafts = zone.graftsPerCm2 * zone.area;
        zone.hairPerGraft = zone.hairPerCm2 / zone.graftsPerCm2;
        zone.startingCoverageValue = zone.caliber * zone.hairPerCm2;
        zone.coverageValueDifference = zone.desiredCoverageValue - zone.startingCoverageValue;
        zone.graftsImplantedToReachDesiredRecipientCoverageValue =
            Math.floor((zone.area * zone.coverageValueDifference) / (getDonorZoneAvgCaliber())*getDonorZoneAvgHairPerGraft());

        zone.graftsImplantedToReachDesiredRecipientCoverageValue =
            Math.floor(
                (zone.area * zone.coverageValueDifference) /
                (getDonorZoneAvgCaliber() * getDonorZoneAvgHairPerGraft())
            );
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
                graftsPerZone: 0,
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
                graftsPerZone: 0,
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
                graftsPerZone: 0,
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
                graftsPerZone: 0,
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
                graftsPerZone: 0,
                coverageValue: 0,
                hairPerZone: 0,
                graftsExtractedToReachDonorDesiredCoverageValue: 0,
                graftsLeftToReachDonorDesiredCoverageValue: 0,
            },
        ];
    }

    function getMockRecipientZones(): RecipientZone[] {
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
                graftsImplantedToReachDesiredRecipientCoverageValue: 0,
                grafts: 0,
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
                graftsImplantedToReachDesiredRecipientCoverageValue: 0,
                grafts: 0,
            },
        ];
    }
}
