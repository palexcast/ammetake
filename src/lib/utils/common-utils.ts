import { Breast } from '../types/feeding-event';
import {PottyType} from "../types/potty-event";

export const isNil = (obj: unknown): boolean => obj === undefined || obj === null;

/**
 * Check if it is less than x minutes from date to now.
 * @param date
 * @param minutes
 */
export const lessThanFrom = (date: Date, minutes: number): boolean => {
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	return diff < minutes * 60 * 1000;
};

export const oppositeBreast = (breast: Breast): Breast => {
	return breast === Breast.Left ? Breast.Right : Breast.Left;
};

export const breastTranslated = (breast: Breast): string => {
	return breast === Breast.Left ? 'venstre' : 'høyre';
};

export const breastTranslatedC = (breast: Breast): string => {
	return breast === Breast.Left ? 'Venstre' : 'Høyre';
};

export const twoDigits = (num: number): string => {
	return num < 10 ? `0${num}` : `${num}`;
};

export const formatTimeHM = (date: Date): string => {
	return [twoDigits(date.getHours()), twoDigits(date.getMinutes())].join(':');
};
export const formatTimeHMS = (date: Date): string => {
	return [
		twoDigits(date.getHours()),
		twoDigits(date.getMinutes()),
		twoDigits(date.getSeconds())
	].join(':');
};


export const getPottyIcon = (type: PottyType): string => {
	switch (type) {
		case PottyType.POOP:
			return '💩';
		case PottyType.PEE:
			return '💦';
		case PottyType.BOTH:
			return '💩💦';
	}
};