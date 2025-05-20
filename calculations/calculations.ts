import { DonorZone, RecipientZone } from "@/types/zones";

export function calculateDonorZoneValues(zone: DonorZone) : void {
    zone.hairPerGraft = zone.hairPerCm2 / zone.graftsPerCm2;
    zone.graftsInZone = zone.area * zone.graftsPerCm2;
    zone.coverageValue = zone.caliber * zone.hairPerCm2;
    zone.hairInZone = zone.area * zone.hairPerCm2;
    zone.availableForExtraction = Math.floor(zone.graftsInZone - ((zone.area * zone.minimumCoverageValue) / (zone.caliber * zone.hairPerGraft)));
}

export function calculateDonorZoneAvgCaliber(donorZones: DonorZone[]): number {
    let weightedCaliberSum = 0;
    let totalGrafts = 0;

    for (const zone of donorZones) {
        if (zone.graftsInZone) {
            weightedCaliberSum += zone.caliber * zone.graftsInZone;
            totalGrafts += zone.graftsInZone;
        }
    }
    return totalGrafts > 0 ? weightedCaliberSum / totalGrafts : 0;
}

export function calculateDonorZoneAvgHairPerGraft(donorZones: DonorZone[]): number {
    let totalGrafts = 0;
    let totalHairs = 0;

    for (const zone of donorZones) {
        if (zone.hairPerGraft && zone.graftsInZone) {
            totalHairs += zone.hairPerGraft * zone.graftsInZone;
            totalGrafts += zone.graftsInZone;
        }
    }
    return totalGrafts > 0 ? totalHairs / totalGrafts : 0;
}

export function calculateRecipientZoneValues(zone: RecipientZone, averageHairPerGraft: number, averageCaliber: number) {
    if (zone.desiredCoverageValue === undefined) {
        zone.desiredCoverageValue = 0;
    }

    zone.grafts = zone.graftsPerCm2 * zone.area;
    zone.hairPerGraft = zone.graftsPerCm2 > 0 ? zone.hairPerCm2 / zone.graftsPerCm2 : 0;
    zone.startingCoverageValue = zone.caliber * zone.hairPerCm2;
    zone.coverageValueDifference = zone.desiredCoverageValue - zone.startingCoverageValue;

    const denominator = averageHairPerGraft * averageCaliber;

    zone.graftsImplantedToReachRecipientDesiredCoverageValue =
        denominator > 0
            ? (zone.area * zone.coverageValueDifference) / denominator
            : 0;
}

export function calculateTotalGraftsNeeded(recipientZones: RecipientZone[]) : number {
    let sum = 0;
    for (const zone of recipientZones) {
        sum += zone.graftsImplantedToReachRecipientDesiredCoverageValue;
    }
    return Math.ceil(sum);
}

export function calculateTotalDonorExtractable(donorZones: DonorZone[]) : number {
    let sum = 0;
    for (const zone of donorZones) {
        sum += zone.availableForExtraction;
    }
    return sum;
}

export function calculateGraftsToExtract(
    donorZones: DonorZone[],
    totalGraftsNeeded: number,
    totalDonorExtractable: number
) : void {
    const percentageOfAvailable =
        totalDonorExtractable > 0 ? totalGraftsNeeded / totalDonorExtractable : 0;

    for (const zone of donorZones) {
        zone.graftsToExtract = Math.round(
            zone.availableForExtraction * percentageOfAvailable
        );
    }
}

export function calculateGraftsToExtractLeft(donorZones: DonorZone[]) : void {
    for (const zone of donorZones) {
        zone.graftsToExtractLeft = zone.graftsToExtract - zone.graftsCounted;
    }
}

export function calculateTotalGrafts(donorZones: DonorZone[]) : number {
    return donorZones.reduce((acc, zone) => acc + zone.graftsInZone, 0);
}