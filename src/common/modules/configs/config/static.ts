import { diskStorage } from 'multer';

import { storages } from '../../../constants';

function getFileExtension(mimetype) {
  const parts = mimetype.split('/');
  return parts[parts.length - 1];
}

export default {
  catsStorage: diskStorage({
    destination(request, file, cb) {
      cb(null, storages.catsPictures);
    },
    filename(request, file, cb) {
      const randomName = Date.now();
      const extension = getFileExtension(file.mimetype);

      cb(null, `${randomName}.${extension}`);
    },
  }),
};
