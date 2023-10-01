import config from '../../config'

export function ConsoleLog<T>(data: T) {
  if (config.env === 'development') {
    console.log(data)
  }
}

// logInDevelopment('This is a log for development environment.')
// logInDevelopment({ key: result }) // Logs an object
// logInDevelopment(42) // Logs a number
