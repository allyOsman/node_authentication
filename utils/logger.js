const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize } = format;

// format.
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${timestamp}`;
});

//logger instance.
const logger = createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    // all logs
    new transports.File({ filename: "logs/combined.log" }),

    // errors log
    new transports.File({ filename: "logs/errors.log", level: "error" }),
  ],
});

// Add console output only in development
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(colorize(), logFormat),
    })
  );
}

module.exports = logger;
