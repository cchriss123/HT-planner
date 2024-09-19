


export function valuesToCheck(args: ZoneArgs, zoneType: "donor" | "recipient") {
    const replaceCommaWithDot = (value: string) => value.replace(',', '.');

    return (zoneType === 'donor') ? {
        caliber: parseFloat(replaceCommaWithDot(args.caliber)),
        fuPerCm2: parseInt(args.fuPerCm2),
        hairsPerCm2: parseInt(args.hairsPerCm2),
        area: parseFloat(replaceCommaWithDot(args.area)),
        minimumCoverageValue: parseFloat(replaceCommaWithDot(args.minimumCoverageValue || '0')),
    } : {
        caliber: parseFloat(replaceCommaWithDot(args.caliber)),
        fuPerCm2: parseInt(args.fuPerCm2),
        hairsPerCm2: parseInt(args.hairsPerCm2),
        area: parseFloat(replaceCommaWithDot(args.area)),
        desiredCoverageValue: parseFloat(replaceCommaWithDot(args.desiredCoverageValue || '0')),
    }
}


export interface ZoneArgs {
    name: string;
    caliber: string;
    fuPerCm2: string;
    hairsPerCm2: string;
    area: string;
    desiredCoverageValue?: string;
    minimumCoverageValue?: string;
}
