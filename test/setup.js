import { register } from 'node:module'
import { pathToFileURL } from 'node:url'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
register('testdouble', pathToFileURL(__filename))