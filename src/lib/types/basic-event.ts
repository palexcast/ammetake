import type { FeedingEvent } from './feeding-event';
import type { PottyEvent } from './potty-event';

export enum EventType {
	Potty = 'Potty',
	Feeding = 'Feeding'
}

export type BasicEvent = {
	id?: string;
	created: Date;
	eventType: EventType;
};

export type BabyEvent = FeedingEvent | PottyEvent;
