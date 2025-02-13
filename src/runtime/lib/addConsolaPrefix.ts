import { CONSOLA_PREFIX } from './consts'

export const addConsolaPrefix = (message: string): string => {
  return `${CONSOLA_PREFIX}${message}`
}
