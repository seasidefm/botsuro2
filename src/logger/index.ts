enum LogLevel {
	INFO = 'INFO',
	WARN = 'WARN',
	ERROR = 'ERROR',
	DEBUG = 'DEBUG',
}

class Logger {
	constructor() {
		this.log('Logger initialized');
	}

	formatMessage(level: LogLevel, message: string): string {
		return `[${new Date().toLocaleTimeString()}] ${level} - ${message}`;
	}

	public log(message: string): void {
		console.log(this.formatMessage(LogLevel.INFO, message));
	}

	public warn(message: string): void {
		console.warn(this.formatMessage(LogLevel.WARN, message));
	}

	public error(message: string): void {
		console.error(this.formatMessage(LogLevel.ERROR, message));
	}

	public debug(message: string): void {
		console.debug(this.formatMessage(LogLevel.DEBUG, message));
	}
}

let logger: Logger;

export function getLogger(): Logger {
	if (!logger) {
		logger = new Logger();
	}

	return logger;
}
