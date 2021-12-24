// eslint-disable-next-line node/no-missing-import
import winston from "winston"
import { LOGGING_LEVEL } from "../common/config"
import { LogLevelsObject, LogColorsObject } from "../common/constants"

export const setLogLevel = (level: string | undefined) => {
  switch(level){
    case '0':
    return 'error';
    case '1':
    return 'warn';
    case '2':
    return 'info';
    case '3':
    return 'http';
    case '4':
    return 'all'
    default:
    return undefined
  }
}


winston.addColors(LogColorsObject)

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
            return `Creating time: ${timestamp}/n ${level.toUpperCase()}: ${message}`
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