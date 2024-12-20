import multer from "multer";
import nextConnect from "next-connect";
import path from "path";
import fs from "fs";

// Define the folder where files will be stored
const uploadPath = path.join(process.cwd(), "Project1\\data");

// Ensure the upload directory exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
});

// Add the multer middleware
apiRoute.use(upload.single("file"));

apiRoute.post((req, res) => {
  res.status(200).json({
    message: "File uploaded successfully",
    filePath: `/project1/data/${req.file.filename}`,
  });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser to use multer
  },
};
