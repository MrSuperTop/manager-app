import { FormikValues } from 'formik';
import { AnyZodObject } from 'zod';
import { lowerFirst, upperFirst } from 'lodash';

export const zodAdapter = (schema: AnyZodObject) => {
  return async (values: FormikValues) => {
    const result = await schema.safeParseAsync(values);
  
    if (result.success || result.error.errors.length === 0) return;
  
    const errorsMap: Record<string, string> = {};
  
    for (const error of result.error.errors) {
      const message = lowerFirst(error.message);
      const fieldName = upperFirst(error.path[error.path.length - 1] as string);
  
      errorsMap[error.path.join('.')] = `${fieldName} ${message}`;
    }
  
    return errorsMap;
  };
};