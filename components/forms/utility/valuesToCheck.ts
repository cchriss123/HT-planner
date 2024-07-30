


export function valuesToCheck(args: ZoneArgs) {
    const replaceCommaWithDot = (value: string) => value.replace(',', '.');

    return {
        caliber: parseFloat(replaceCommaWithDot(args.caliber)),
        fuPerCm2: parseInt(args.fuPerCm2),
        hairsPerCm2: parseInt(args.hairsPerCm2),
        area: parseFloat(replaceCommaWithDot(args.area)),
        desiredCoverageValue: parseFloat(replaceCommaWithDot(args.desiredCoverageValue))
    };
}


export interface ZoneArgs {
    name: string;
    caliber: string;
    fuPerCm2: string;
    hairsPerCm2: string;
    area: string;
    desiredCoverageValue: string;
}