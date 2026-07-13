import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const REPLACEMENTS = [
  { id: 'cricket_practice_net_3', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800' },
  { id: 'football_net_1', url: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=800' },
  { id: 'football_net_2', url: 'https://images.unsplash.com/photo-1563600709-b114d57effe6?auto=format&fit=crop&q=80&w=800' },
  { id: 'tennis_court_net_2', url: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?auto=format&fit=crop&q=80&w=800' },
  { id: 'tennis_court_net_3', url: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&q=80&w=800' }
];

async function main() {
  console.log("Starting upload of replacement images...");
  for (const item of REPLACEMENTS) {
    try {
      console.log(`Uploading replacement for ${item.id}...`);
      const result = await cloudinary.uploader.upload(item.url, {
        folder: 'starchennaisafetynets',
        public_id: item.id,
        overwrite: true
      });
      console.log(`CLOUDINARY_RESULT|${item.id}|${result.secure_url}`);
    } catch (err) {
      console.error(`Failed on ${item.id}:`, err);
    }
  }
  console.log("Done!");
}

main();
