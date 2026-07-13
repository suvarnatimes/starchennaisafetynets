import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const IMAGES = [
  // 1. Balcony Safety Nets
  { id: 'balcony_safety_1', url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800' },
  { id: 'balcony_safety_2', url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800' },
  { id: 'balcony_safety_3', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800' },

  // 2. Bird Protection Nets
  { id: 'bird_protection_1', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
  { id: 'bird_protection_2', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800' },
  { id: 'bird_protection_3', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },

  // 3. Pigeon Safety Nets
  { id: 'pigeon_safety_1', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800' },
  { id: 'pigeon_safety_2', url: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=800' },
  { id: 'pigeon_safety_3', url: 'https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?auto=format&fit=crop&q=80&w=800' },

  // 4. Children Safety Nets
  { id: 'child_safety_1', url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800' },
  { id: 'child_safety_2', url: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&q=80&w=800' },
  { id: 'child_safety_3', url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800' },

  // 5. Construction Safety Nets
  { id: 'construction_safety_1', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800' },
  { id: 'construction_safety_2', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800' },
  { id: 'construction_safety_3', url: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800' },

  // 6. Coconut Tree Safety Nets
  { id: 'coconut_safety_1', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800' },
  { id: 'coconut_safety_2', url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800' },
  { id: 'coconut_safety_3', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800' },

  // 7. Industrial Safety Nets
  { id: 'industrial_safety_1', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800' },
  { id: 'industrial_safety_2', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' },
  { id: 'industrial_safety_3', url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800' },

  // 8. Duct Area Safety Nets
  { id: 'duct_area_1', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800' },
  { id: 'duct_area_2', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800' },
  { id: 'duct_area_3', url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800' },

  // 9. Building Safety Nets
  { id: 'building_safety_1', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
  { id: 'building_safety_2', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800' },
  { id: 'building_safety_3', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800' },

  // 10. Balcony Invisible Grill
  { id: 'invisible_grill_balcony_1', url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=800' },
  { id: 'invisible_grill_balcony_2', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800' },
  { id: 'invisible_grill_balcony_3', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800' },

  // 11. Window Invisible Grill
  { id: 'invisible_grill_window_1', url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800' },
  { id: 'invisible_grill_window_2', url: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800' },
  { id: 'invisible_grill_window_3', url: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800' },

  // 12. Staircase Invisible Grill
  { id: 'invisible_grill_staircase_1', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800' },
  { id: 'invisible_grill_staircase_2', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800' },
  { id: 'invisible_grill_staircase_3', url: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800' },

  // 13. Terrace Invisible Grill
  { id: 'invisible_grill_terrace_1', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800' },
  { id: 'invisible_grill_terrace_2', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=800' },
  { id: 'invisible_grill_terrace_3', url: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800' },

  // 14. Office Invisible Grill
  { id: 'invisible_grill_office_1', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800' },
  { id: 'invisible_grill_office_2', url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800' },
  { id: 'invisible_grill_office_3', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' },

  // 15. Cricket Practice Nets
  { id: 'cricket_practice_net_1', url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800' },
  { id: 'cricket_practice_net_2', url: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&q=80&w=800' },
  { id: 'cricket_practice_net_3', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800' },

  // 16. Football Nets
  { id: 'football_net_1', url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800' },
  { id: 'football_net_2', url: 'https://images.unsplash.com/photo-1517594422831-0dedfb10429f?auto=format&fit=crop&q=80&w=800' },
  { id: 'football_net_3', url: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800' },

  // 17. Tennis Court Nets
  { id: 'tennis_court_net_1', url: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800' },
  { id: 'tennis_court_net_2', url: 'https://images.unsplash.com/photo-1538385869424-3ebd29b827c6?auto=format&fit=crop&q=80&w=800' },
  { id: 'tennis_court_net_3', url: 'https://images.unsplash.com/photo-1622279457486-62dcc4a4b1ca?auto=format&fit=crop&q=80&w=800' },

  // 18. Golf Practice Nets
  { id: 'golf_practice_net_1', url: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=800' },
  { id: 'golf_practice_net_2', url: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=800' },
  { id: 'golf_practice_net_3', url: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&q=80&w=800' }
];

async function main() {
  console.log(`Starting to download and upload ${IMAGES.length} unique images...`);
  
  for (const item of IMAGES) {
    try {
      console.log(`Processing: ${item.id} from ${item.url}`);
      
      // Upload directly from remote Unsplash URL to Cloudinary
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
  
  console.log("All uploads completed!");
}

main();
