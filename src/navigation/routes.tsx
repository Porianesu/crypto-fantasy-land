import { generatePath } from 'react-router-dom'

export const ROOT_PATH = '/'
export const HOME_PATH = '/home'
export const ENTRANCE_PATH = '/entrance'

export const getHomePath = () => {
  return generatePath(HOME_PATH)
}
