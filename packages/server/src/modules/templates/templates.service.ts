import fs from 'fs';
import path from 'path';

import { Injectable, Logger } from '@nestjs/common';

import { TemplateOptionsType } from '@templates/interfaces/template-options.type';

@Injectable()
export class TemplatesService {
  private readonly logger = new Logger(TemplatesService.name);

  async loadHtmlTemplate(templatePath: string): Promise<string | null> {
    return fs.promises
      .readFile(path.join(__dirname, '../../templates/html' + templatePath))
      .then((value) => value.toString())
      .catch((err) => {
        this.logger.error(err);

        return null;
      });
  }

  async buildHtmlTemplate(
    options: TemplateOptionsType = {},
  ): Promise<string | null> {
    const { template, layout, ...data } = options;

    const templateData = template
      ? await this.loadHtmlTemplate(template)
      : null;

    const layoutData = layout
      ? await this.loadHtmlTemplate(options.layout)
      : null;

    const preparedLayout = layoutData
      ? this.replaceTokens(layoutData, { body: templateData })
      : templateData;

    return this.replaceTokens(preparedLayout, data);
  }

  private replaceTokens(templateData, tokens) {
    return templateData
      ? templateData.replace(
          /{{(.*?)}}/g,
          (entry, word) => tokens[word] || '{{' + word + '}}',
        )
      : templateData;
  }
}
