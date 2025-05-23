import {DonorZone, RecipientZone} from "@/types/zones";

export function getMockDonorZones(): DonorZone[] {
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
            area: 70,
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

export function getMockRecipientZones(): RecipientZone[] {
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
