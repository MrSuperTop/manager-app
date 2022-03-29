import { readFileSync } from 'fs';
import { join } from 'path';
import { template as lodashTempalate } from 'lodash';

export const templateNames = ['changePassword', 'confirmEmail'] as const;
export type templateTypes = typeof templateNames[number];

const templates = {} as Record<templateTypes, string>;

for (const template of templateNames) {
  const templateFilePath = join(__filename, `../templates/${template}.html`);
  templates[template] = readFileSync(templateFilePath).toString();
}

export interface TemplateFormatOptions {
  changePassword: {
    origin: string,
    token: string
  },
  confirmEmail: {
    code: string
  }
}

export const getTemplate = <T extends templateTypes>(
  template: T,
  formatOptions: TemplateFormatOptions[T]
) => {
  const compiled = lodashTempalate(templates[template]);
  return compiled(formatOptions);
};
