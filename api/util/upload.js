import path from "path";
import fs from "fs";

/**
 * Save the file to local folder
 * @param {*} file
 */
function save2Local(file, ...folder) {
  return new Promise((resolve, reject) => {
    const root = path.join(process.cwd(), "files", ...folder);
    const newfileName = `${new Date().getTime()}-${file.originalname}`
    const dest = path.join(root, newfileName);
    const accessPath = "/" + ["files", ...folder, newfileName].join("/");

    if (!fs.existsSync(root)) {
      fs.mkdirSync(root, { recursive: true });
    }

    fs.writeFile(dest, file.buffer, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(accessPath);
      }
    });
  });
}

/**
 * Save file to Azure blob storage
 * @param {*} file
 */
function save2Azure(file, ...folder) {
  // TODO
}

/**
 * Save file to specific place
 * @param {*} file
 */
export default function save(file, ...folder) {
  const dest = process.env.STORAGE;
  switch (dest) {
    default:
      return save2Local(file, ...folder);
  }
}
