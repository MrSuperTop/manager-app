import { FormikValues } from 'formik';
import { AnyZodObject } from 'zod';
export declare const zodAdapter: (schema: AnyZodObject) => (values: FormikValues) => Promise<Record<string, string> | undefined>;
