import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { AdminUser, Category, Tag, Blog, ActivityLog, Inquiry, Session, GalleryImage } from '../types.js';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

interface DatabaseSchema {
  users: (AdminUser & { passwordHash: string; salt: string })[];
  categories: Category[];
  tags: Tag[];
  blogs: Blog[];
  inquiries: Inquiry[];
  logs: ActivityLog[];
  sessions: Session[];
  gallery: GalleryImage[];
}

// Default Admin Password is AdminPassword123!
const DEFAULT_ADMIN_EMAIL = 'admin@starsafety.com';
const DEFAULT_ADMIN_PASSWORD = 'AdminPassword123!';

function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}

function hashPassword(password: string, salt: string): string {
  return crypto.createHash('sha256').update(password + salt).digest('hex');
}

// Initial seed data
const initialCategories: Category[] = [
  { id: 'cat-1', name: 'Balcony Safety Nets', slug: 'balcony-safety-nets', description: 'Heavy-duty transparent and nylon nets designed to prevent falls and accidents in apartment balconies.', createdAt: new Date().toISOString() },
  { id: 'cat-2', name: 'Bird Protection', slug: 'bird-protection-nets', description: 'Aesthetic and durable netting solutions to stop pigeon infestation and bird nesting.', createdAt: new Date().toISOString() },
  { id: 'cat-3', name: 'Child Safety Nets', slug: 'child-safety-nets', description: 'Extra secure double-mesh nets designed to keep playful children safe near windows, balconies, and staircases.', createdAt: new Date().toISOString() },
  { id: 'cat-4', name: 'Construction Safety', slug: 'construction-safety-nets', description: 'High-tensile industrial nets built for construction sites to trap falling debris and protect workers.', createdAt: new Date().toISOString() },
  { id: 'cat-5', name: 'Coconut Tree Safety', slug: 'coconut-tree-safety-nets', description: 'Sturdy, weather-resistant safety nets to catch falling coconuts and prevent injuries or property damage.', createdAt: new Date().toISOString() }
];

const initialTags: Tag[] = [
  { id: 'tag-1', name: 'Balcony', slug: 'balcony', createdAt: new Date().toISOString() },
  { id: 'tag-2', name: 'Pigeons', slug: 'pigeons', createdAt: new Date().toISOString() },
  { id: 'tag-3', name: 'Child Safety', slug: 'child-safety', createdAt: new Date().toISOString() },
  { id: 'tag-4', name: 'Chennai', slug: 'chennai', createdAt: new Date().toISOString() },
  { id: 'tag-5', name: 'Coimbatore', slug: 'coimbatore', createdAt: new Date().toISOString() },
  { id: 'tag-6', name: 'Installation Tips', slug: 'installation-tips', createdAt: new Date().toISOString() },
  { id: 'tag-7', name: 'Industrial Netting', slug: 'industrial-netting', createdAt: new Date().toISOString() }
];

const initialBlogs: Blog[] = [
  {
    id: 'blog-1',
    title: 'How to Choose the Right Balcony Safety Net for Your Apartment',
    slug: 'how-to-choose-right-balcony-safety-net',
    shortDescription: 'Unsure which netting material or mesh size is right for your home? Read our complete guide to securing apartment balconies in Chennai, Coimbatore, and other cities.',
    content: `## Why Balcony Safety is Essential in High-Rise Apartments

Living in high-rise apartments in busy cities like **Chennai** and **Coimbatore** offers beautiful views, but it also brings safety risks—especially if you have curious toddlers, pets, or frequent bird visitations. Installing a premium balcony safety net is the most reliable, cost-effective solution to secure your home without blocking the fresh air or natural light.

In this guide, we will break down the essential factors you must consider before purchasing a balcony safety net.

---

### 1. Material Types: HDPE vs. Nylon

Choosing the right material ensures durability, strength, and longevity. The two most popular choices are:

*   **HDPE (High-Density Polyethylene) Safety Nets:** These are highly durable, UV-resistant, and weather-proof. They do not stretch over time and are perfect for open balconies exposed to heavy sunlight and rain in Tamil Nadu.
*   **Nylon Monofilament Nets:** These are nearly transparent, maintaining your balcony's aesthetics while providing high tensile strength. They are an ideal choice if you want maximum safety with minimal visual impact.

### 2. Understanding Mesh Size

Mesh size determines what the net protects against:
*   **25mm to 30mm Mesh:** Excellent for stopping smaller birds, sparrows, and preventing small items from slipping through.
*   **40mm to 50mm Mesh:** Standard size for pigeon protection and child safety. Strong, heavy-duty, and lets in maximum air and light.

### 3. Professional Installation vs. DIY

While DIY kits exist, **professional installation** is highly recommended. Here is why:
1.  **Industrial-Grade Anchors:** Professional teams use stainless steel keyhole anchors or solid fasteners that do not rust.
2.  **Tension Calibration:** A saggy net is unsafe. Professionals ensure uniform high tension across all corners.
3.  **Height Access:** High-rise balcony borders are risky to work around. Professional installers have safety harnesses and equipment to complete the job hazard-free.

---

### Our Recommendation for Tamil Nadu Homes

For typical apartments in major cities across Tamil Nadu, we recommend **0.7mm transparent Nylon nets** or **15-ply HDPE nets** with a **50mm mesh size**. They offer the perfect balance of view preservation, heavy child safety, and reliable bird resistance.

At **Star Safety Enterprises**, we provide free on-site inspections in Chennai, Coimbatore, Trichy, Salem, and Madurai to help you pick the exact configuration for your home. Contact us today!`,
    featuredImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800'
    ],
    categories: ['cat-1', 'cat-3'],
    tags: ['tag-1', 'tag-3', 'tag-4', 'tag-6'],
    status: 'published',
    publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    author: 'S. Rajkumar',
    readingTime: '5 min read',
    metaTitle: 'Choose the Best Balcony Safety Net in Tamil Nadu | Star Safety',
    metaDescription: 'Learn about HDPE vs Nylon balcony safety nets, choosing mesh sizes, and professional installation services in Chennai, Coimbatore, and across Tamil Nadu.',
    faqs: [
      { question: 'What is the lifespan of HDPE safety nets?', answer: 'Our premium HDPE safety nets are UV-stabilized and last up to 5 to 8 years under standard tropical weather conditions in Tamil Nadu.' },
      { question: 'Do transparent monofilament nets block the view?', answer: 'No, monofilament transparent safety nets are nearly invisible from a short distance and maintain 98% of your open view and airflow.' },
      { question: 'Is the site inspection free?', answer: 'Yes, Star Safety Enterprises offers 100% free site inspections and measurements across all major Tamil Nadu cities.' }
    ],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'blog-2',
    title: 'The Permanent Solution to Pigeon Infestation in High-Rise Buildings',
    slug: 'permanent-solution-pigeon-infestation-high-rise',
    shortDescription: 'Are pigeons nesting in your AC ducts, balconies, or building ledges? Learn why pigeon netting is the only long-term, humane, and sanitary solution available.',
    content: `## The Hazards of Pigeon Infestation

Pigeons may seem harmless, but their presence in residential and commercial buildings poses serious health and maintenance hazards. From corrosive droppings that destroy concrete and paint to transmitting dangerous respiratory diseases (like Histoplasmosis and Psittacosis), keeping them off your premises is critical for a sanitary living environment.

AC ducts, pipes, shafts, and balconies are prime nesting targets. In this article, we explain the most effective, humane, and lasting solution to pigeon issues.

---

### Why Repellents and Spikes Often Fail

Many home and property managers attempt temporary fixes:
*   **Plastic/Metal Spikes:** Useful for narrow ledges, but birds often fill them with twigs and build nests directly on top.
*   **Ultrasonic Repellents:** Pigeons adapt to high-frequency sounds within a few weeks, making these devices ineffective long-term.
*   **Shiny Gel or Ribbons:** Highly weather-dependent and loses effectiveness quickly when covered in dust.

### The Real Solution: High-Tensile Bird Netting

Installing a continuous, sturdy bird safety net is the only 100% guaranteed way to keep pigeons out of balconies, ducts, and shafts. It acts as a physical barrier that prevents any access, prompting the birds to migrate elsewhere without causing them harm.

#### Essential Features of Quality Pigeon Nets:
1.  **Small Mesh Size (25mm to 40mm):** Pigeons are stubborn and can squeeze through larger gaps. A 35mm-40mm mesh is the industry sweet spot—small enough to block pigeons completely but wide enough to remain fully transparent and let air through.
2.  **UV-Stabilized Materials:** Extreme summer heat in places like **Trichy**, **Madurai**, and **Chennai** will degrade cheap nets. UV-treated nylon or HDPE is essential to prevent cracking or breaking.
3.  **Stainless Steel Fasteners:** Standard iron hooks rust within one monsoon season, staining your walls and loosening the net. Always insist on SS (Stainless Steel) fasteners and robust wire rope borders.

---

### Contact Tamil Nadu's Netting Specialists

At **Star Safety Enterprises**, we have over a decade of experience installing bird protection nets in residential complexes and commercial offices across Tamil Nadu. Our team uses professional rope-access climbing gear to secure deep shafts and duct areas safely.

Get in touch for a durable pigeon protection net today!`,
    featuredImage: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&q=80&w=800'
    ],
    categories: ['cat-2'],
    tags: ['tag-2', 'tag-4', 'tag-5', 'tag-6'],
    status: 'published',
    publishDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'K. Vignesh',
    readingTime: '4 min read',
    metaTitle: 'Pigeon Netting Solutions for High-Rise Buildings | Star Safety',
    metaDescription: 'Keep pigeons away from your balcony and AC ducts permanently. Discover why high-tensile UV-stabilized bird nets are the best humane solution in Tamil Nadu.',
    faqs: [
      { question: 'Will the nets harm the pigeons?', answer: 'Absolutely not. Our bird nets act strictly as a physical barrier. They prevent pigeons from landing or nesting, gently guiding them to find other natural habitats.' },
      { question: 'Can you cover high-altitude AC duct shafts?', answer: 'Yes, our team is highly trained in rope-access and industrial climbing. We can safely install pigeon nets in narrow, deep building ducts at any height.' }
    ],
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'blog-3',
    title: 'Industrial Safety Net Standards for Modern Construction Sites',
    slug: 'industrial-safety-net-standards-construction-sites',
    shortDescription: 'A guide to understanding OSHA & IS standards for industrial debris and fall protection netting in construction projects across Tamil Nadu.',
    content: `## Prioritizing Workplace Safety in Construction

With rapid industrialization and urban expansion in cities like **Chennai**, **Coimbatore**, **Tiruppur**, and **Hosur**, construction activities are at an all-time high. However, height-related accidents remain one of the leading causes of injuries at work.

Industrial and construction safety nets are the primary passive safety system required to protect both workers from falls and passersby from falling debris.

---

### Key Requirements for Construction Safety Nets

Industrial nets are vastly different from domestic balcony nets. They must adhere to strict Indian Standards (IS-11057) and international safety protocols:

#### 1. Fall Arrest Capacity
A worker-fall safety net must be capable of absorbing the impact of a falling human body (often rated for drops of up to 6 meters). This requires:
*   **High-tensile braided nylon or polypropylene ropes.**
*   **Border ropes** with a minimum breaking strength of 20 KN.
*   **Mesh ropes** with a breaking strength of at least 10 KN.

#### 2. Debris Containment (Dual-Layer Netting)
Standard wide-mesh nets prevent people from falling, but tools, bricks, and concrete chunks can slip through. To solve this, premium installations use a **dual-layer net**:
*   **Inner Layer:** A dense HDPE green shade net or fine monofilament mesh (to trap small pebbles and dust).
*   **Outer Layer:** A high-tensile 100mm rope net (to support structural load and arrest falling bodies).

#### 3. Weathering and UV Stabilization
Since construction nets are exposed to harsh outdoor conditions, they must be chemically treated with UV stabilizers to resist degradation from sunlight, acidic rain, and chemical dust.

---

### Why Choose Star Safety Enterprises for Industrial Projects?

Star Safety Enterprises is a trusted safety partner for leading builders, factories, and warehouses in Tamil Nadu. We supply and install certified construction safety nets that comply with national safety regulations. 

Contact our commercial safety division today for a custom quote and safe site inspection.`,
    featuredImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    galleryImages: [
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800'
    ],
    categories: ['cat-4'],
    tags: ['tag-4', 'tag-7'],
    status: 'published',
    publishDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'S. Rajkumar',
    readingTime: '6 min read',
    metaTitle: 'Construction & Industrial Safety Net Standards | Star Safety',
    metaDescription: 'Understand safety net guidelines, fall arrest load capacities, and dual-layer debris containment solutions for builders in Tamil Nadu.',
    faqs: [
      { question: 'Do your nets comply with Indian Standards?', answer: 'Yes, all our construction and industrial safety nets strictly adhere to IS-11057 guidelines for fall arrest and debris netting.' },
      { question: 'Can you handle large-scale commercial factory projects?', answer: 'Absolutely. We have successfully executed large safety net installations for automobile factories, warehouses, and IT parks in Hosur, Sriperumbudur, and Coimbatore.' }
    ],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const initialInquiries: Inquiry[] = [
  { id: 'inq-1', name: 'Anand Kumar', phone: '9876543210', email: 'anand.k@gmail.com', city: 'Chennai', service: 'Balcony Safety Nets', message: 'I need a premium balcony safety net for my 5th-floor apartment in Adyar. Please contact me for a free site measurement.', status: 'new', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() }, // 2 hrs ago
  { id: 'inq-2', name: 'Priya Sundaram', phone: '9443210987', email: 'priya.s@yahoo.com', city: 'Coimbatore', service: 'Pigeon Safety Nets', message: 'There is a severe pigeon issue in our kitchen utility area and AC vents. Need a bird protection net installed.', status: 'contacted', createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 'inq-3', name: 'R. Karthikeyan', phone: '9123456789', email: 'karthik.constructions@gmail.com', city: 'Trichy', service: 'Construction Safety Nets', message: 'We require high-tensile safety nets and debris containment nets for our new 8-storey residential project site in Trichy. Please send a quote.', status: 'resolved', createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() }
];

function getDatabase(): DatabaseSchema {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (fs.existsSync(DB_FILE)) {
    try {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content) as DatabaseSchema;
    } catch (e) {
      console.error('Error parsing database file, regenerating...', e);
    }
  }

  // Generate database with seed values
  const adminSalt = generateSalt();
  const adminPasswordHash = hashPassword(DEFAULT_ADMIN_PASSWORD, adminSalt);

  const initialDB: DatabaseSchema = {
    users: [
      {
        id: 'usr-1',
        email: DEFAULT_ADMIN_EMAIL,
        name: 'Administrator',
        passwordHash: adminPasswordHash,
        salt: adminSalt,
        createdAt: new Date().toISOString()
      }
    ],
    categories: initialCategories,
    tags: initialTags,
    blogs: initialBlogs,
    inquiries: initialInquiries,
    logs: [
      { id: 'log-1', action: 'SYSTEM_INIT', details: 'Database initialized with initial system and seed content.', user: 'system', timestamp: new Date().toISOString() }
    ],
    sessions: [],
    gallery: []
  };

  saveDatabase(initialDB);
  return initialDB;
}

function saveDatabase(db: DatabaseSchema) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
}

// DB Instance API
export const db = {
  get: () => {
    const data = getDatabase();
    // Ensure gallery array always exists (for databases created before this field was added)
    if (!data.gallery) data.gallery = [];
    return data;
  },
  save: (data: DatabaseSchema) => saveDatabase(data),

  // Auth Operations
  validateUser: (email: string, password: string): AdminUser | null => {
    const data = getDatabase();
    const user = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return null;

    const testHash = hashPassword(password, user.salt);
    if (testHash === user.passwordHash) {
      const { passwordHash, salt, ...safeUser } = user;
      return safeUser;
    }
    return null;
  },

  logActivity: (action: string, details: string, user: string) => {
    const data = getDatabase();
    const log: ActivityLog = {
      id: 'log-' + Math.random().toString(36).substring(2, 9),
      action,
      details,
      user,
      timestamp: new Date().toISOString()
    };
    data.logs.unshift(log);
    // Keep logs size reasonable (last 100 logs)
    if (data.logs.length > 100) {
      data.logs = data.logs.slice(0, 100);
    }
    saveDatabase(data);
  }
};
