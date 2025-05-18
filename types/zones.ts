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
    graftsImplantedToReachRecipientDesiredCoverageValue: number;
}