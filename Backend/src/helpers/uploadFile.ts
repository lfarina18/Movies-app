import { UploadedFile } from 'express-fileupload';
import path from 'path';

export const uploadFile = (
  file: UploadedFile,
  validatedExtension = 'csv',
  folder = ''
) => {
  return new Promise<string>((resolve, reject) => {
    if (!file.mimetype.includes(validatedExtension)) {
      return reject(
        `The extension ${validatedExtension} is not valid. Only CSV files are allowed.`
      );
    }

    const fileReplace = file.name.replace(/\s/g, '-').toLowerCase();

    const uploadPath = path.join(
      __dirname,
      '../../uploads/',
      folder,
      fileReplace
    );

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err.message);
      }
    });
    setTimeout(() => {
      resolve(fileReplace);
    }, 500);
  });
};
