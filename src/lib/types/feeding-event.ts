import type { BasicEvent } from './basic-event';

export enum Breast {
	Left = 'Left',
	Right = 'Right'
}

export type FeedingEvent = BasicEvent & {
	startedWith: Breast;
	stopped?: Date;
	startedSecond?: Date;
	stoppedSecond?: Date;
};
