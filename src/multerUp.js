import multer from "multer";

const storage = multer.memoryStorage();
export const up = multer({ storage: storage });