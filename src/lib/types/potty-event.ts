import type { BasicEvent } from './basic-event';

export enum PottyType {
	POOP = 'Poop',
	PEE = 'Pee',
	BOTH = 'Both'
}

export type PottyEvent = BasicEvent & {
	id?: string;
	type: PottyType;
	created: Date;
};
