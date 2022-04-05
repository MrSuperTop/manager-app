import config from '../config';
import { isProd } from './isProd';

export const useTracing = !isProd && config.tracing;
