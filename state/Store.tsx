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

    // Calculated values from user inputs
    hairPerGraft?: number;
}

export interface DonorZone extends Zone {
    // User inputs
    minimumCoverageValue: number;

    // Counter values
    type: 'donor';
    singles: number;
    doubles: number;
    triples: number;
    quadruples: number;
    graftsCounted: number;
    hairsCounted: number;
    hairPerCountedGraft: number;

    // Calculated values from user inputs
    graftsInZone: number;
    coverageValue: number;
    hairInZone: number;

    availableForExtraction: number;   //total

    graftsToExtract: number;
    graftsToExtractLeft: number;
}

export interface RecipientZone extends Zone {


    desiredCoverageValue: number;
    // Calculated values from user inputs
    type: 'recipient';
    startingCoverageValue: number;
    coverageValueDifference: number;
    grafts: number;

    graftsImplantedToReachRecipientDesiredCoverageValue: number; // The number of FUs to be implanted to achieve the desired recipient coverage value
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
    performCalculationsAndRerender(): void;
    calculateGraftsToExtractLeft(): void;

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
    const [initialCalculationsDone, setInitialCalculationsDone] = useState(false);


    const [totalSingles, setTotalSingles] = useState(0);
    const [totalDoubles, setTotalDoubles] = useState(0);
    const [totalTriples, setTotalTriples] = useState(0);
    const [totalQuadruples, setTotalQuadruples] = useState(0);
    const [totalGrafts, setTotalGrafts] = useState(0);
    const [totalHair, setTotalHair] = useState(0);
    const [totalHairPerGraftsCounted, setTotalHairPerGraftsCounted] = useState(0);
    const [ip, setIp] = useState('');
    const averageCaliber = React.useRef(0);
    const averageHairPerGraft = React.useRef(0);
    const totalGraftsNeeded = React.useRef(0);
    const totalDonorExtractable = React.useRef(0);


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
            setDonorZones([...loadedDonorZones]);
            setRecipientZones([...loadedRecipientZones]);
            setInitialized(true);
        }
        initializeZones();

    }, []);

    useEffect(() => {
        if (initialized && initialCalculationsDone) {
            saveZones('donorZones', donorZones);
            saveZones('recipientZones', recipientZones);
        }
    }, [donorZones, recipientZones]);

    useEffect(() => {
        if (initialized && donorZones.length > 0 && recipientZones.length > 0 && !initialCalculationsDone) {
            performCalculationsAndRerender();
            setInitialCalculationsDone(true);
        }
    }, [initialized, donorZones, recipientZones, initialCalculationsDone]);


    function performCalculationsAndRerender() {

        donorZones.forEach(zone => calculateDonorZoneValues(zone));
        calculateDonorZoneAvgCaliber();
        calculateDonorZoneAvgHairPerGraft();
        recipientZones.forEach(zone => calculateRecipientZoneValues(zone));
        calculateTotalGraftsNeeded();
        calculateTotalDonorExtractable();
        calculateGraftsToExtract();
        calculateGraftsToExtractLeft();
        setDonorZones([...donorZones]);
        setRecipientZones([...recipientZones]);
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
                ip,
                saveIp,
                performCalculationsAndRerender,
                calculateGraftsToExtractLeft,

            }}
        >
            {children}
        </AppStateContext.Provider>
    );

    async function saveZones(key: string, zones: DonorZone[] | RecipientZone[]) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(zones));
        } catch (error) {
            console.error(`Failed to save ${key} to AsyncStorage`, error);
        }
    }

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
            grafts += zone.graftsCounted;
            hair += zone.hairsCounted;
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
        zone.graftsInZone = zone.area * zone.graftsPerCm2;
        zone.coverageValue = zone.caliber * zone.hairPerCm2;
        zone.hairInZone = zone.area * zone.hairPerCm2;
        zone.availableForExtraction = Math.floor(zone.graftsInZone - ((zone.area * zone.minimumCoverageValue) / (zone.caliber * zone.hairPerGraft)));
    }

    function calculateDonorZoneAvgCaliber() {

        const amountOfDonorZones = donorZones.length;

        if (amountOfDonorZones === 0) {
            console.log('No donor zones');
            return 0;
        }

        let sum = 0;
        for (const zone of donorZones) {
            sum += zone.caliber;
        }

        averageCaliber.current = sum / amountOfDonorZones;
    }

    function calculateDonorZoneAvgHairPerGraft() {
        const amountOfDonorZones = donorZones.length;

        if (amountOfDonorZones === 0) {
            return 0;
        }
        let sum = 0;
        for (const zone of donorZones) {
            sum += zone.hairPerGraft || 0;
        }
        averageHairPerGraft.current = sum / amountOfDonorZones;
    }

    function calculateRecipientZoneValues(zone: RecipientZone) {
        if (zone.desiredCoverageValue === undefined) {
            zone.desiredCoverageValue = 0;
        }

        zone.grafts = zone.graftsPerCm2 * zone.area;
        zone.hairPerGraft = zone.hairPerCm2 / zone.graftsPerCm2;
        zone.startingCoverageValue = zone.caliber * zone.hairPerCm2;
        zone.coverageValueDifference = zone.desiredCoverageValue - zone.startingCoverageValue;


        zone.graftsImplantedToReachRecipientDesiredCoverageValue =
            (zone.area * zone.coverageValueDifference) / ( averageHairPerGraft.current * averageCaliber.current);

    }

    function calculateTotalGraftsNeeded() : number {
        totalGraftsNeeded.current = 0;
        for (const zone of recipientZones) {
            totalGraftsNeeded.current += zone.graftsImplantedToReachRecipientDesiredCoverageValue;
        }
        return Math.ceil(totalGraftsNeeded.current);
    }

    function calculateTotalDonorExtractable() {
        let sum = 0;
        for (const zone of donorZones) {
            sum += zone.availableForExtraction;
        }
        totalDonorExtractable.current = sum;
    }

    function calculateGraftsToExtract() {

        let percentageOfAvailable = totalGraftsNeeded.current / totalDonorExtractable.current;
        for (const zone of donorZones) {
            zone.graftsToExtract = Math.round(zone.availableForExtraction * percentageOfAvailable);
        }

    }

    function calculateGraftsToExtractLeft() {
        for (const zone of donorZones) {
            zone.graftsToExtractLeft = zone.graftsToExtract - zone.graftsCounted;
        }
    }

    function getMockDonorZones(): DonorZone[] {
        return [
            {
                type: 'donor',
                name: 'Donor Zone 1',
                caliber: 0.06,
                graftsPerCm2: 80,
                hairPerCm2: 200,
                area: 45,
                minimumCoverageValue: 6,
                singles: 0,
                doubles: 0,
                triples: 0,
                quadruples: 0,
                graftsCounted: 0,
                hairsCounted: 0,
                hairPerCountedGraft: 0,
                graftsInZone: 0,
                coverageValue: 0,
                hairInZone: 0,
                availableForExtraction: 0,
                graftsToExtract: 0,
                graftsToExtractLeft: 0,
            },
            {
                type: 'donor',
                name: 'Donor Zone 2',
                caliber: 0.05,
                graftsPerCm2: 60,
                hairPerCm2: 190,
                area: 40,
                minimumCoverageValue: 6,
                singles: 0,
                doubles: 0,
                triples: 0,
                quadruples: 0,
                graftsCounted: 0,
                hairsCounted: 0,
                hairPerCountedGraft: 0,
                graftsInZone: 0,
                coverageValue: 0,
                hairInZone: 0,
                availableForExtraction: 0,
                graftsToExtract: 0,
                graftsToExtractLeft: 0,
            },
            {
                type: 'donor',
                name: 'Donor Zone 3',
                caliber: 0.07,
                graftsPerCm2: 90,
                hairPerCm2: 200,
                area: 6,
                minimumCoverageValue: 6,
                singles: 0,
                doubles: 0,
                triples: 0,
                quadruples: 0,
                graftsCounted: 0,
                hairsCounted: 0,
                hairPerCountedGraft: 0,
                graftsInZone: 0,
                coverageValue: 0,
                hairInZone: 0,
                availableForExtraction: 0,
                graftsToExtract: 0,
                graftsToExtractLeft: 0,
            },
            {
                type: 'donor',
                name: 'Donor Zone 4',
                caliber: 0.06,
                graftsPerCm2: 95,
                hairPerCm2: 210,
                area: 60,
                minimumCoverageValue: 6,
                singles: 0,
                doubles: 0,
                triples: 0,
                quadruples: 0,
                graftsCounted: 0,
                hairsCounted: 0,
                hairPerCountedGraft: 0,
                graftsInZone: 0,
                coverageValue: 0,
                hairInZone: 0,
                availableForExtraction: 0,
                graftsToExtract: 0,
                graftsToExtractLeft: 0,
            },
        ];
    }

    function getMockRecipientZones(): RecipientZone[] {
        return [
            {
                type: 'recipient',
                name: 'Recipient Zone 1',
                caliber: 0,
                graftsPerCm2: 0,
                hairPerCm2: 0,
                area: 160,
                desiredCoverageValue: 5.4,
                startingCoverageValue: 0,
                coverageValueDifference: 0,
                graftsImplantedToReachRecipientDesiredCoverageValue: 0,
                grafts: 0,
            },
        ];
    }
}


