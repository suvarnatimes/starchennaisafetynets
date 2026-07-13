import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function main() {
  try {
    const result = await cloudinary.uploader.upload('https://images.unsplash.com/photo-1543351611-58f69d7c1781?auto=format&fit=crop&q=80&w=800', {
      folder: 'starchennaisafetynets',
      public_id: 'football_net_2',
      overwrite: true
    });
    console.log(`CLOUDINARY_RESULT|football_net_2|${result.secure_url}`);
  } catch (err) {
    console.error("Failed on football_net_2:", err);
  }
}

main();
