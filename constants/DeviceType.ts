import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const aspectRatio = width / height;

export const isTablet = aspectRatio < 1.6 && Math.min(width, height) >= 600;
export const isPhone = !isTablet;

export function getDeviceType() {
    return {
        isTablet,
        isPhone,
    };
}
