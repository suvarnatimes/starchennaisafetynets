import dotenv from 'dotenv';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const CLOTH_HANGERS_DIR = 'C:\\Users\\Admin\\Desktop\\projects\\web\\starchennaisafetynets\\imagesforservicecards\\cloth hangers';
const MONKEY_NETS_DIR = 'C:\\Users\\Admin\\Desktop\\projects\\web\\starchennaisafetynets\\imagesforservicecards\\monkey safety nets';

const uploads = [
  {
    filePath: path.join(CLOTH_HANGERS_DIR, 'WhatsApp Image 2026-07-14 at 7.55.38 AM.jpeg'),
    publicId: 'cloth_hanger_1'
  },
  {
    filePath: path.join(CLOTH_HANGERS_DIR, 'WhatsApp Image 2026-07-14 at 7.55.38 AM (1).jpeg'),
    publicId: 'cloth_hanger_2'
  },
  {
    filePath: path.join(CLOTH_HANGERS_DIR, 'WhatsApp Image 2026-07-14 at 7.55.38 AM (2).jpeg'),
    publicId: 'cloth_hanger_3'
  },
  {
    filePath: path.join(MONKEY_NETS_DIR, 'Monkey_safety_net_on_balcony_202607140842.jpeg'),
    publicId: 'monkey_safety_net_1'
  },
  {
    filePath: path.join(MONKEY_NETS_DIR, 'Apartment_building_with_monkey_nets_202607140842.jpeg'),
    publicId: 'monkey_safety_net_2'
  },
  {
    filePath: path.join(MONKEY_NETS_DIR, 'Monkey_prevention_net_on_balcony_202607140843.jpeg'),
    publicId: 'monkey_safety_net_3'
  }
];

async function main() {
  console.log('Starting upload of cloth hangers and monkey safety nets images to Cloudinary...');
  for (const item of uploads) {
    try {
      console.log(`Uploading ${item.filePath} as ${item.publicId}...`);
      const result = await cloudinary.uploader.upload(item.filePath, {
        folder: 'starchennaisafetynets',
        public_id: item.publicId,
        overwrite: true
      });
      console.log(`SUCCESS | ${item.publicId} | ${result.secure_url}`);
    } catch (err) {
      console.error(`Failed on ${item.publicId}:`, err);
    }
  }
  console.log('Finished uploads.');
}

main();
