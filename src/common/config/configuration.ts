import { diskStorage } from 'multer';

import * as envConfigs from './env';

export default () => {
  const configs = {
    FILE_STORAGE: 'public',
    storageConfigs: {},
    ...envConfigs,
  }

  configs.storageConfigs = {
    storage: diskStorage({
      destination(request, file, cb) {
        cb(null, configs.FILE_STORAGE);
      },
      filename(request, file, cb) {
        const parts = file.mimetype.split('/');
        const extension = parts[parts.length - 1];
        const randomName = Date.now();

        cb(null, `${randomName}.${extension}`);
      },
    }),
  };

  return configs;
};
