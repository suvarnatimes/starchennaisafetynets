import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

// Load env from the project directory
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const ARTIFACT_DIR = 'C:\\Users\\Admin\\.gemini\\antigravity\\brain\\9df06dff-6e49-40ad-8ac1-692b2446fbea';

const targetFiles = [
  'chennai_hero_backdrop_1783938282245.png',
  'chennai_balcony_safety_net_1783938300022.png',
  'chennai_pigeon_safety_net_1783938317886.png',
  'chennai_child_safety_net_1783938333941.png',
  'chennai_coconut_safety_net_1783938351273.png',
  'chennai_construction_net_1783938370215.png',
  'chennai_industrial_net_1783938388376.png',
  'chennai_grill_balcony_1783938405341.png',
  'chennai_grill_window_1783938422353.png',
  'chennai_cricket_net_1783938441584.png',
  'chennai_turf_net_1783938458612.png'
];

async function runUpload() {
  console.log('Starting upload to Cloudinary...');
  
  for (const filename of targetFiles) {
    const fullPath = path.join(ARTIFACT_DIR, filename);
    if (!fs.existsSync(fullPath)) {
      console.error(`File does not exist: ${fullPath}`);
      continue;
    }
    
    // Extract base description from the filename
    const cleanPublicId = filename.split('_178')[0];
    
    try {
      console.log(`Uploading ${filename} as public ID ${cleanPublicId}...`);
      const result = await cloudinary.uploader.upload(fullPath, {
        folder: 'starchennaisafetynets',
        public_id: cleanPublicId
      });
      console.log(`CLOUDINARY_RESULT|${cleanPublicId}|${result.secure_url}`);
    } catch (error) {
      console.error(`Error uploading ${filename}:`, error);
    }
  }
}

runUpload();
