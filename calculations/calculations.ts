import { DonorZone, RecipientZone } from "@/types/zones";


export function calculateDonorZoneValues(zone: DonorZone) {
    zone.hairPerGraft = zone.hairPerCm2 / zone.graftsPerCm2;
    zone.graftsInZone = zone.area * zone.graftsPerCm2;
    zone.coverageValue = zone.caliber * zone.hairPerCm2;
    zone.hairInZone = zone.area * zone.hairPerCm2;
    zone.availableForExtraction = Math.floor(zone.graftsInZone - ((zone.area * zone.minimumCoverageValue) / (zone.caliber * zone.hairPerGraft)));
}

export function calculateDonorZoneAvgCaliber(donorZones: DonorZone[]) : number {

    const amountOfDonorZones = donorZones.length;

    if (amountOfDonorZones === 0) {
        console.log('No donor zones');
        return 0;
    }

    let sum = 0;
    for (const zone of donorZones) {
        sum += zone.caliber;
    }

    return sum / amountOfDonorZones;
}

export function calculateDonorZoneAvgHairPerGraft(donorZones: DonorZone[]) {
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

// export function calculateRecipientZoneValues(zone: RecipientZone, averageHairPerGraft: number, averageCaliber: number) {
//     if (zone.desiredCoverageValue === undefined) {
//         zone.desiredCoverageValue = 0;
//     }
//
//     zone.grafts = zone.graftsPerCm2 * zone.area;
//     zone.hairPerGraft = zone.graftsPerCm2 > 0 ? zone.hairPerCm2 / zone.graftsPerCm2 : 0;
//     zone.startingCoverageValue = zone.caliber * zone.hairPerCm2;
//     zone.coverageValueDifference = zone.desiredCoverageValue - zone.startingCoverageValue;
//
//     const denominator = averageHairPerGraft * averageCaliber;
//
//     zone.graftsImplantedToReachRecipientDesiredCoverageValue =
//         denominator > 0
//             ? (zone.area * zone.coverageValueDifference) / denominator
//             : 0;
// }
//
//
// export function calculateTotalGraftsNeeded(recipientZones: RecipientZone[]) {
//     let sum = 0;
//     for (const zone of recipientZones) {
//         sum += zone.graftsImplantedToReachRecipientDesiredCoverageValue;
//     }
//     return Math.ceil(sum);
// }
//
// export function calculateTotalDonorExtractable(donorZones: DonorZone[]) {
//     let sum = 0;
//     for (const zone of donorZones) {
//         sum += zone.availableForExtraction;
//     }
//     return sum;
// }
//
export function calculateGraftsToExtract(
    donorZones: DonorZone[],
    totalGraftsNeeded: number,
    totalDonorExtractable: number
) {
    const percentageOfAvailable =
        totalDonorExtractable > 0 ? totalGraftsNeeded / totalDonorExtractable : 0;

    for (const zone of donorZones) {
        zone.graftsToExtract = Math.round(
            zone.availableForExtraction * percentageOfAvailable
        );
    }
}

export function calculateGraftsToExtractLeft(donorZones: DonorZone[]) {
    for (const zone of donorZones) {
        zone.graftsToExtractLeft = zone.graftsToExtract - zone.graftsCounted;
    }
}