import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMockDonorZones, getMockRecipientZones } from '@/mocks/mockZones';
import {DonorZone, RecipientZone} from '@/types/zones';
import {calculateDonorZoneValues,
    calculateDonorZoneAvgCaliber,
    calculateDonorZoneAvgHairPerGraft,
    calculateRecipientZoneValues,
    calculateTotalGraftsNeeded,
    calculateTotalDonorExtractable,
    calculateGraftsToExtract,
    calculateGraftsToExtractLeft,
} from "@/calculations/calculations";

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
    totalGraftsNeeded: number;
    totalDonorExtractable: number;
    averageHairPerGraft: number;
    calculateDonorZoneValues(zone: DonorZone): void;
    performCalculationsAndRerender(): void;
    calculateGraftsToExtractLeft(zones: DonorZone[]): void;
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
    const [totalGraftsNeeded, setTotalGraftsNeeded] = useState(0);
    const [totalDonorExtractable, setTotalDonorExtractable] = useState(0);
    const [averageCaliber, setAverageCaliber] = useState(0);
    const [averageHairPerGraft, setAverageHairPerGraft] = useState(0);




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

        const avgCaliber = calculateDonorZoneAvgCaliber(donorZones);
        const avgHairPerGraft = calculateDonorZoneAvgHairPerGraft(donorZones);
        setAverageCaliber(avgCaliber);
        setAverageHairPerGraft(avgHairPerGraft);

        recipientZones.forEach(zone =>
            calculateRecipientZoneValues(zone, avgHairPerGraft, avgCaliber)
        );

        const graftsNeeded = calculateTotalGraftsNeeded(recipientZones);
        const donorExtractable = calculateTotalDonorExtractable(donorZones);

        setTotalGraftsNeeded(graftsNeeded);
        setTotalDonorExtractable(donorExtractable);

        calculateGraftsToExtract(donorZones, graftsNeeded, donorExtractable);
        calculateGraftsToExtractLeft(donorZones);

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
                totalDonorExtractable,
                totalGraftsNeeded,
                ip,
                saveIp,
                performCalculationsAndRerender,
                calculateGraftsToExtractLeft,
                averageHairPerGraft,

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
}


