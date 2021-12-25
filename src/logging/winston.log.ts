// eslint-disable-next-line node/no-missing-import
import winston from "winston"
import { LOGGING_LEVEL } from "../common/config"
import { LogLevelsObject, LogColorsObject } from "../common/constants"

/**
 * Set the log level
 * @param {string | undefined} level The number of log level 
 * @returns - The name of the log level of type string
 */

export const setLogLevel = (level: string | undefined): string => {
  switch(level){
    case '0':
    return 'error';
    case '1':
    return 'warn';
    case '2':
    return 'info';
    case '3':
    return 'http';
    default:
    return 'all'
  }
}

/**
 * Winston object method to add colors to messages
 */
winston.addColors(LogColorsObject)

/**
 * Winston object method to create a log object
 */

const Logger = winston.createLogger({
  level: setLogLevel(LOGGING_LEVEL),
  levels: LogLevelsObject,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf(
          (info) => {
            const { message, level } = info;
            return `${level}: ${message}`
          },
        ),
      )
    }),
    
    new winston.transports.File({
      filename: './src/logging/logs/error.txt',
      level: 'error',
      format:  winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
        winston.format.uncolorize(),
        winston.format.printf(
          (info) => {
            const { timestamp, message, level } = info;
            return `Creating time: ${timestamp}
             ${level.toUpperCase()}: ${message}`
          },
        ),
      )
    }),
    new winston.transports.File({ 
      filename: './src/logging/logs/all.txt',
      format: winston.format.printf(
        (info) => `${info.level.toUpperCase()}: ${info.message}`,
      ), 
    }),
  ]
})

export default Logger