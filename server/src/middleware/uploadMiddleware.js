import multer from 'multer';

/**
 * Multer upload middleware for image uploads.
 *
 * - storage: memoryStorage — file buffer is kept in memory (req.file.buffer)
 * - limits: 10 MB max file size (multer will set err.code = 'LIMIT_FILE_SIZE')
 * - fileFilter: accepts only image/jpeg, image/png, image/webp
 */
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
});

export default upload;
