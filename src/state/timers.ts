export class Timers {
	private readonly defaultTimeout: number = 30_000;
	private readonly timers: Map<string, number> = new Map();

	constructor(defaultTimeout?: number) {
		this.defaultTimeout = defaultTimeout ?? this.defaultTimeout;
	}

	public clearTimer(key: string): void {
		const timer = this.timers.get(key);
		if (timer) {
			this.timers.delete(key);
		}
	}

	public setTimer(key: string): void {
		this.clearTimer(key);
		this.timers.set(key, new Date().getTime());
	}

	public hasTimer(key: string): boolean {
		return this.timers.has(key);
	}

	public getRemainingTime(key: string): number {
		const timer = this.timers.get(key);
		if (!timer) {
			return 0;
		}
		const now = new Date().getTime();
		return this.defaultTimeout - (now - timer);
	}

	public timerExpired(key: string): boolean {
		const timer = this.timers.get(key);
		if (!timer) {
			return false;
		}
		const now = new Date().getTime();
		return now - timer > this.defaultTimeout;
	}
}

let timers: Timers;
export function getTimers(): Timers {
	if (!timers) {
		timers = new Timers();
	}
	return timers;
}
