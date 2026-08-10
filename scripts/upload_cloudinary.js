import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Configure Cloudinary from process.env
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Error: Cloudinary environment variables are missing!');
  console.error('Available keys:', {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: !!cloudName,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: !!apiKey,
    CLOUDINARY_API_SECRET: !!apiSecret
  });
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true
});

async function uploadLogo() {
  const filePath = path.join(process.cwd(), 'assets', 'star_enterprises_logo.svg');
  
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File not found at ${filePath}`);
    process.exit(1);
  }

  console.log(`Uploading ${filePath} to Cloudinary...`);
  
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: 'star_enterprises_logo',
      resource_type: 'image',
      overwrite: true,
      invalidate: true
    });
    
    console.log('--- CLOUDINARY UPLOAD SUCCESS ---');
    console.log('Public ID:', result.public_id);
    console.log('Secure URL:', result.secure_url);
    console.log('URL:', result.url);
    console.log('Format:', result.format);
    console.log('---------------------------------');
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    process.exit(1);
  }
}

uploadLogo();
