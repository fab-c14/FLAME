import fs from 'fs';

const createTempFile = (extension, code) => {
  const tempFileName = `temp.${extension}`;
  fs.writeFileSync(tempFileName, code);
  return tempFileName;
};

export { createTempFile };
