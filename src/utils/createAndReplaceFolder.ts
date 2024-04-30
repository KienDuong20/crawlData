import fs from 'fs';

export const createAndReplaceFolder = (folderPath: any) => {
    if (fs.existsSync(folderPath)) {
        fs.rmdirSync(folderPath, { recursive: true });
    }
    fs.mkdirSync(folderPath, { recursive: false });
};