/**
 * Seed script — populates all collections with realistic dummy data
 * Usage: node scripts/seed.js
 */
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

const Admin = require("../models/Admin");
const Notice = require("../models/Notice");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Blog = require("../models/Blog");
const Testimonial = require("../models/Testimonial");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await Promise.all([
      Admin.deleteMany({}),
      Notice.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      Blog.deleteMany({}),
      Testimonial.deleteMany({}),
    ]);
    console.log("Cleared existing data.");

    // ── ADMIN ──────────────────────────────────────────────────────────────
    const admin = await Admin.create({
      name: "Super Admin",
      email: process.env.ADMIN_EMAIL || "admin@vijayoverseas.com",
      password: process.env.ADMIN_PASSWORD || "Admin@1234",
      role: "superadmin",
    });
    console.log(`Admin created: ${admin.email}`);

    // ── NOTICES ────────────────────────────────────────────────────────────
    await Notice.insertMany([
      {
        title: "Expansion of GI-Tagged Agricultural Export Operations",
        message:
          "Public Notice: Vijay Overseas is expanding its GI-Tagged Agricultural Export Operations to new international markets. Partners and buyers are invited to reach out.",
        type: "info",
        isActive: true,
        startDate: new Date("2025-01-01"),
        endDate: new Date("2026-12-31"),
        autoHideMs: 0,
      },
      {
        title: "New Basmati Rice Export Certification",
        message:
          "We have received updated APEDA certification for Basmati Rice exports. All shipments now comply with the latest EU standards.",
        type: "info",
        isActive: true,
        startDate: new Date("2025-03-01"),
        endDate: null,
        autoHideMs: 5000,
      },
      {
        title: "Office Closed — National Holiday",
        message:
          "Our offices will be closed on 15th August 2025 for Independence Day. Orders placed will be processed the next business day.",
        type: "warning",
        isActive: false,
        startDate: new Date("2025-08-14"),
        endDate: new Date("2025-08-16"),
        autoHideMs: 0,
      },
      {
        title: "Urgent: Revised Saffron Export Norms",
        message:
          "The Ministry of Commerce has issued revised export norms for Kashmiri Saffron. All export orders from July 2025 must comply with new quality certification standards.",
        type: "urgent",
        isActive: true,
        startDate: new Date("2025-07-01"),
        endDate: null,
        autoHideMs: 0,
      },
    ]);
    console.log("Notices seeded.");

    // ── CATEGORIES ─────────────────────────────────────────────────────────
    const categories = await Category.create([
      {
        name: "Agricultural Products",
        description:
          "Premium GI-tagged agricultural produce sourced directly from certified Indian farmers.",
        isActive: true,
        order: 1,
      },
      {
        name: "Food Products",
        description:
          "Traditional Indian food products with authentic GI certification and superior taste.",
        isActive: true,
        order: 2,
      },
      {
        name: "Spices & Condiments",
        description:
          "Aromatic spices and condiments from the finest growing regions of India.",
        isActive: true,
        order: 3,
      },
      {
        name: "Tea & Beverages",
        description:
          "Premium teas and beverages from iconic Indian tea-growing regions.",
        isActive: true,
        order: 4,
      },
      {
        name: "Grains & Pulses",
        description:
          "Heritage grains and pulses grown using traditional and sustainable methods.",
        isActive: true,
        order: 5,
      },
    ]);
    console.log("Categories seeded.");

    const [agri, food, spices, tea, grains] = categories;

    // ── PRODUCTS ───────────────────────────────────────────────────────────
    await Product.create([
      {
        name: "Darjeeling Tea (Premium GI-Certified) — 250g Pack",
        category: tea._id,
        description:
          "Darjeeling Tea is one of India's most celebrated beverages, grown in the Himalayan foothills of West Bengal at altitudes between 600–2000 meters.",
        richDescription: `<h3>About Darjeeling Tea</h3><p>Darjeeling Tea is one of India's most celebrated beverages, grown in the Himalayan foothills of West Bengal. Known globally as the "Champagne of Teas", this first-flush batch features signature muscatel notes and a delicate golden liquor.</p><h3>Key Highlights</h3><ul><li>Single-estate sourcing from Makaibari Tea Estate</li><li>First flush harvest (March–April)</li><li>FSSAI approved | APEDA certified | Organic</li></ul>`,
        images: [
          "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&h=340&fit=crop",
        ],
        price: 850,
        unit: "250g",
        origin: "India",
        region: "West Bengal",
        state: "West Bengal",
        giYear: "2004–05",
        sku: "O-DT-GI-250",
        rating: 5,
        status: "In Stock",
        isActive: true,
        isFeatured: true,
        productType: "Agricultural Product",
        tags: [
          "Darjeeling Tea",
          "GI Certified Tea",
          "Premium Indian Tea",
          "First Flush",
          "Himalayan Tea",
        ],
        seoTitle:
          "Buy Darjeeling Tea GI Certified | Premium First Flush | Vijay Overseas",
        seoDescription:
          "Authentic GI-certified Darjeeling Tea from Makaibari Estate. First flush, organic, muscatel notes. Export-quality 250g pack.",
      },
      {
        name: "Alphonso Mango (Hapus) — Export Grade",
        category: food._id,
        description:
          "The king of mangoes — GI-tagged Alphonso from Ratnagiri, Maharashtra. Known for its rich aroma, deep saffron colour, and buttery texture.",
        richDescription: `<h3>About Alphonso Mango</h3><p>Alphonso (Hapus) is the king of mangoes. Grown in the coastal Konkan belt of Maharashtra, this GI-tagged fruit is renowned worldwide for its saffron-coloured flesh, zero fiber, and unparalleled sweetness.</p><h3>Export Grades Available</h3><ul><li>Grade A: 250–300g per fruit</li><li>Grade B: 200–250g per fruit</li></ul>`,
        images: [
          "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=600&h=340&fit=crop",
        ],
        price: 1200,
        unit: "dozen",
        origin: "India",
        region: "Maharashtra",
        state: "Maharashtra",
        giYear: "2018–19",
        sku: "O-AM-GI-12",
        rating: 5,
        status: "In Stock",
        isActive: true,
        isFeatured: true,
        productType: "Food Product",
        tags: ["Alphonso Mango", "Hapus", "GI Tagged Mango", "Ratnagiri", "Export Grade"],
        seoTitle:
          "Buy Alphonso Mango GI Certified Export Grade | Vijay Overseas",
        seoDescription:
          "Export-grade Ratnagiri Alphonso (Hapus) mango — GI certified, saffron flesh, zero fiber. Premium quality direct from farmers.",
      },
      {
        name: "Kashmiri Saffron — Premium Grade A (2g)",
        category: spices._id,
        description:
          "World's finest Kashmiri saffron from Pampore, the 'Saffron Town' of India. Deep crimson threads with intense aroma and colour.",
        richDescription: `<h3>Kashmiri Saffron</h3><p>Saffron (Crocus sativus) from the Pampore region of Kashmir is the world's most premium saffron. ISO 3632 Grade A certified with crocin content above 240 units — far exceeding Iranian and Spanish varieties.</p>`,
        images: [
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=340&fit=crop",
        ],
        price: 3500,
        unit: "2g",
        origin: "India",
        region: "Jammu & Kashmir",
        state: "Jammu and Kashmir",
        giYear: "2020–21",
        sku: "O-KS-GI-2G",
        rating: 5,
        status: "In Stock",
        isActive: true,
        isFeatured: true,
        productType: "Agricultural Product",
        tags: [
          "Kashmiri Saffron",
          "GI Saffron",
          "Pampore Saffron",
          "Premium Kesar",
          "ISO 3632",
        ],
        seoTitle:
          "Buy Kashmiri Saffron GI Certified Grade A | Vijay Overseas",
        seoDescription:
          "Premium Kashmiri Saffron from Pampore — GI certified, ISO Grade A, deep crimson threads. 2g pack for export.",
      },
      {
        name: "Basmati Rice — Extra Long Grain (5kg)",
        category: grains._id,
        description:
          "APEDA-certified Indian Basmati Rice with extra-long grains, nutty aroma, and fluffy texture. Sourced from the Indo-Gangetic Plains.",
        richDescription: `<h3>Indian Basmati Rice</h3><p>Indian Basmati is the world's premier aromatic rice, grown in the foothills of the Himalayas. Our Extra Long Grain variety is sourced from Punjab, Haryana, and UP — the traditional Basmati belt.</p>`,
        images: [
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=340&fit=crop",
        ],
        price: 650,
        unit: "5kg",
        origin: "India",
        region: "Punjab",
        state: "Punjab",
        giYear: "1997–98",
        sku: "O-BR-GI-5K",
        rating: 4,
        status: "In Stock",
        isActive: true,
        isFeatured: false,
        productType: "Agricultural Product",
        tags: ["Basmati Rice", "GI Rice", "Indian Basmati", "Long Grain", "APEDA Certified"],
        seoTitle: "Buy Indian Basmati Rice GI Certified Extra Long Grain | Vijay Overseas",
        seoDescription:
          "APEDA-certified Indian Basmati — extra long grain, nutty aroma, fluffy texture. 5kg export pack.",
      },
      {
        name: "Coorg Orange — Kodagu Mandarin (3kg)",
        category: food._id,
        description:
          "Sweet and tangy Coorg Orange from the misty hills of Kodagu, Karnataka. Known for its thin skin and rich juice content.",
        richDescription: `<h3>Coorg (Kodagu) Mandarin Orange</h3><p>Grown at 900–1700m altitude in the Western Ghats, Coorg Orange is celebrated for its exceptional juice content, thin peel, and balanced sweet-tart flavour.</p>`,
        images: [
          "https://images.unsplash.com/photo-1547514701-42782101795e?w=600&h=340&fit=crop",
        ],
        price: 320,
        unit: "3kg",
        origin: "India",
        region: "Karnataka",
        state: "Karnataka",
        giYear: "2018–19",
        sku: "O-CO-GI-3K",
        rating: 4,
        status: "In Stock",
        isActive: true,
        isFeatured: false,
        productType: "Food Product",
        tags: ["Coorg Orange", "Kodagu Mandarin", "GI Tagged Orange", "Karnataka Citrus"],
        seoTitle: "Buy Coorg Orange GI Certified | Kodagu Mandarin | Vijay Overseas",
        seoDescription:
          "Fresh Coorg (Kodagu) Mandarin Oranges — GI certified, thin skin, high juice content. 3kg export pack.",
      },
      {
        name: "Nanjanagud Banana — Premium Bunch",
        category: agri._id,
        description:
          "The fragrant Nanjanagud Rasabale banana from Mysuru district — unique for its creamy texture and distinctive floral aroma.",
        richDescription: `<h3>Nanjanagud Rasabale Banana</h3><p>Nanjanagud Rasabale is a rare variety of banana grown exclusively along the Kapila river basin in Mysuru district, Karnataka. It has a GI tag and is protected under Indian GI Act.</p>`,
        images: [
          "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&h=340&fit=crop",
        ],
        price: 180,
        unit: "bunch",
        origin: "India",
        region: "Karnataka",
        state: "Karnataka",
        giYear: "2017–18",
        sku: "O-NB-GI-BN",
        rating: 4,
        status: "In Stock",
        isActive: true,
        isFeatured: false,
        productType: "Agricultural Product",
        tags: ["Nanjanagud Banana", "Rasabale", "GI Banana", "Karnataka", "Mysuru"],
        seoTitle: "Buy Nanjanagud Rasabale Banana GI Certified | Vijay Overseas",
        seoDescription:
          "Authentic Nanjanagud Rasabale banana — GI certified, creamy texture, floral aroma. Premium export-grade bunch.",
      },
      {
        name: "Nagpur Orange — Premium Santra (5kg)",
        category: food._id,
        description:
          "Juicy and vibrant Nagpur Santra from Vidarbha, Maharashtra — the 'Orange City' of India. Deep orange peel, sweet pulp, low seeds.",
        richDescription: `<h3>Nagpur Orange (Santra)</h3><p>Nagpur is the Orange Capital of India. The GI-tagged Nagpur Santra is grown in the Vidarbha region and is prized for its deep orange colour, sweet-tart balance, and ease of peeling.</p>`,
        images: [
          "https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=600&h=340&fit=crop",
        ],
        price: 280,
        unit: "5kg",
        origin: "India",
        region: "Maharashtra",
        state: "Maharashtra",
        giYear: "2014–15",
        sku: "O-NO-GI-5K",
        rating: 4,
        status: "In Stock",
        isActive: true,
        isFeatured: false,
        productType: "Food Product",
        tags: ["Nagpur Orange", "Santra", "GI Orange", "Vidarbha", "Maharashtra Citrus"],
        seoTitle: "Buy Nagpur Orange GI Certified Santra 5kg | Vijay Overseas",
        seoDescription:
          "Fresh Nagpur Santra — GI certified from Orange City. Sweet-tart, easy peel, deep orange flesh. 5kg export pack.",
      },
      {
        name: "Munnar Tea — High-Range Estate (200g)",
        category: tea._id,
        description:
          "Aromatic Munnar tea from the scenic high-range estates of Kerala. A bold CTC blend with rich malty notes and bright amber liquor.",
        richDescription: `<h3>Munnar High-Range Estate Tea</h3><p>Grown at 1200–1600m in the Western Ghats, Munnar tea is renowned for its bold, malty character. Our High-Range blend combines second-flush Nilgiri leaves for a robust morning brew.</p>`,
        images: [
          "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=340&fit=crop",
        ],
        price: 420,
        unit: "200g",
        origin: "India",
        region: "Kerala",
        state: "Kerala",
        giYear: "2013–14",
        sku: "O-MT-GI-200",
        rating: 4,
        status: "In Stock",
        isActive: true,
        isFeatured: false,
        productType: "Agricultural Product",
        tags: ["Munnar Tea", "Kerala Tea", "High Range Tea", "CTC Tea", "Western Ghats"],
        seoTitle: "Buy Munnar High-Range Estate Tea GI | Kerala Tea | Vijay Overseas",
        seoDescription:
          "Bold, malty Munnar tea from Western Ghats high-range estates — GI certified, 200g export pack.",
      },
    ]);
    console.log("Products seeded.");

    // ── BLOGS ──────────────────────────────────────────────────────────────
    await Blog.create([
      {
        title:
          "Understanding GI Tags: How India Protects Its Agricultural Heritage",
        excerpt:
          "A deep dive into India's Geographical Indication system — how it works, why it matters, and which products carry the coveted GI tag.",
        content: `<h2>What is a GI Tag?</h2><p>A Geographical Indication (GI) tag is an intellectual property right that identifies a product as originating from a specific geographical region, possessing qualities attributable to that region.</p><p>India has registered over 400 GI products across textiles, handicrafts, agriculture, and food. The GI Act came into force in 2003, and since then, iconic products like Darjeeling Tea, Kashmiri Saffron, and Alphonso Mango have been protected under this framework.</p><h2>Why GI Tags Matter for Exports</h2><p>GI tags command premium prices in international markets. Studies show that GI-tagged products fetch 15–30% higher prices compared to untagged counterparts. For small farmers, this translates directly into higher incomes and sustainable livelihoods.</p><h2>Top Indian Agricultural GI Products</h2><ul><li>Darjeeling Tea (West Bengal, 2004)</li><li>Basmati Rice (Indo-Gangetic Plains, 1997)</li><li>Alphonso Mango (Maharashtra, 2018)</li><li>Kashmiri Saffron (J&K, 2020)</li></ul><p>At Vijay Overseas, we work exclusively with GI-certified produce, ensuring authenticity from farm to export.</p>`,
        author: "Vijay Overseas Team",
        tags: ["GI Tags", "Agricultural Heritage", "Indian Exports", "Farmers"],
        categories: ["Agriculture", "Export"],
        isPublished: true,
        publishedAt: new Date("2025-01-15"),
        coverImage:
          "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=630&fit=crop",
        seoTitle:
          "Understanding GI Tags in India | Agricultural Heritage Protection",
        seoDescription:
          "Learn how India's GI tagging system protects agricultural heritage, boosts export values, and supports farmer livelihoods.",
      },
      {
        title: "India's Spice Route: From Farm to Global Market",
        excerpt:
          "India supplies over 75% of the world's spice demand. Explore the journey of premium Indian spices from cultivation to export.",
        content: `<h2>India: The World's Spice Kitchen</h2><p>India has been the world's spice hub for over 3000 years. Today, we export over 1.5 million tonnes of spices annually, earning ₹25,000+ crore in foreign exchange.</p><p>Key spice-growing regions include Kerala (pepper, cardamom), Rajasthan (coriander, cumin), Gujarat (fennel), and Kashmir (saffron).</p><h2>Quality Standards in Indian Spice Export</h2><p>All Indian spice exports must comply with FSSAI standards and international certifications including ISO 22000, HACCP, and USDA Organic. Vijay Overseas sources exclusively from certified farms.</p><h2>The Kashmiri Saffron Story</h2><p>Kashmir's Pampore region produces less than 20 tonnes of saffron annually — making it the world's rarest spice. With ISO 3632 Grade A certification and now GI protection, Kashmiri saffron commands $3000–$5000 per kilogram globally.</p>`,
        author: "Vijay Overseas Team",
        tags: ["Spices", "India Exports", "Saffron", "Supply Chain"],
        categories: ["Spices", "Export", "Agriculture"],
        isPublished: true,
        publishedAt: new Date("2025-02-20"),
        coverImage:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&h=630&fit=crop",
        seoTitle: "India's Spice Route: Farm to Global Market | Vijay Overseas",
        seoDescription:
          "Discover how India supplies 75% of global spice demand. From Kashmiri Saffron to Kerala Pepper — the export journey explained.",
      },
      {
        title: "Basmati Rice: The Grain That Conquered Global Kitchens",
        excerpt:
          "The fragrant, long-grain Basmati has become India's top agricultural export. Here's the complete story of its journey from field to fork.",
        content: `<h2>What Makes Basmati Special?</h2><p>The word 'Basmati' derives from the Sanskrit 'vasumaati' — meaning fragrant earth. This aromatic long-grain rice grows exclusively in the Indo-Gangetic Plains at the foothills of the Himalayas.</p><p>Basmati is India's largest agricultural export product, with annual exports exceeding $4 billion. The EU, US, Saudi Arabia, and UAE are the top buyers.</p><h2>APEDA's Role in Basmati Quality</h2><p>The Agricultural and Processed Food Products Export Development Authority (APEDA) sets strict standards for Basmati exports including minimum grain length (6.61mm uncooked), aroma requirements, and pesticide residue limits.</p><h2>Vijay Overseas Basmati Offering</h2><p>We source Extra Long Grain Basmati from certified farms in Punjab, Haryana, and Uttarakhand. All batches are APEDA-registered, FSSAI certified, and tested for pesticide residues before export.</p>`,
        author: "Vijay Overseas Team",
        tags: ["Basmati Rice", "India Exports", "APEDA", "Rice Cultivation"],
        categories: ["Grains", "Export"],
        isPublished: true,
        publishedAt: new Date("2025-03-05"),
        coverImage:
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&h=630&fit=crop",
        seoTitle: "Basmati Rice Export from India | APEDA Certified | Vijay Overseas",
        seoDescription:
          "Complete guide to Indian Basmati Rice — quality standards, APEDA certification, and Vijay Overseas premium export grades.",
      },
      {
        title: "Alphonso Mango: Why the World Calls It the King of Mangoes",
        excerpt:
          "Ratnagiri's Alphonso (Hapus) has conquered global palates. Explore the science, story, and export journey of India's most premium mango.",
        content: `<h2>The Alphonso Mystique</h2><p>Alphonso (Hapus) is India's most celebrated mango variety — a GI-tagged fruit grown exclusively in the Konkan coast of Maharashtra. Named after Afonso de Albuquerque, the Portuguese colonial administrator who introduced grafted mango cultivation to India, Alphonso has evolved over centuries into a distinct variety prized worldwide.</p><h2>What Separates Alphonso from Other Mangoes</h2><p>The combination of Ratnagiri's laterite soil, coastal climate, and specific altitude creates conditions impossible to replicate elsewhere. Key characteristics: deep saffron flesh, zero fiber, Brix value of 19–22 (ultra sweet), and a shelf life superior to most Indian varieties.</p><h2>Export Standards</h2><p>EU-bound Alphonso exports must pass phytosanitary inspections including vapour heat treatment to eliminate fruit flies. Vijay Overseas works with APEDA-registered packhouses that comply with EC 1148/2001 standards.</p>`,
        author: "Vijay Overseas Team",
        tags: ["Alphonso Mango", "Hapus", "Ratnagiri", "GI Tagged Fruits"],
        categories: ["Fruits", "Export", "GI Products"],
        isPublished: true,
        publishedAt: new Date("2025-04-12"),
        coverImage:
          "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=1200&h=630&fit=crop",
        seoTitle:
          "Alphonso Mango Export | King of Mangoes | Ratnagiri GI | Vijay Overseas",
        seoDescription:
          "Why Alphonso (Hapus) is the world's most prized mango. GI tag, Ratnagiri terroir, zero fiber, export-grade standards.",
      },
      {
        title: "Darjeeling Tea: The Champagne of Teas Explained",
        excerpt:
          "From misty Himalayan slopes to global teacups — the complete story of Darjeeling's GI-protected first-flush teas.",
        content: `<h2>Geography of Darjeeling Tea</h2><p>Darjeeling tea grows on slopes between 600–2000 metres in the Darjeeling Himalayan hills of West Bengal. The unique combination of cool temperatures, abundant rainfall, mist, and mountain soil creates the signature muscatel flavour that no other region can replicate.</p><p>With only about 87 registered tea gardens and an annual production of 8–10 million kg, Darjeeling tea is genuinely rare — this scarcity is partly why it commands premium global prices.</p><h2>The First Flush Premium</h2><p>First flush teas (March–April harvest) are the most prized. Immediately after winter dormancy, the tender young leaves yield a delicate, floral, light-amber brew that's unlike any other tea. Premium first-flush teas can fetch ₹50,000+ per kg at auction.</p><h2>The GI Protection</h2><p>Darjeeling became India's first GI-tagged product in 2004. The GI certification is managed by the Tea Board of India and protects against counterfeit "Darjeeling" teas from Nepal and other regions.</p>`,
        author: "Vijay Overseas Team",
        tags: ["Darjeeling Tea", "First Flush", "GI Tea", "Tea Export", "Premium Tea"],
        categories: ["Tea", "Agriculture", "GI Products"],
        isPublished: true,
        publishedAt: new Date("2025-05-08"),
        coverImage:
          "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=1200&h=630&fit=crop",
        seoTitle: "Darjeeling Tea Guide | GI Certified First Flush | Vijay Overseas",
        seoDescription:
          "Complete guide to Darjeeling Tea — first flush vs second flush, GI certification, Himalayan terroir, and export quality standards.",
      },
      {
        title: "Sustainable Farming Practices Behind India's GI Products",
        excerpt:
          "The farmers behind India's most prized GI-tagged exports and the sustainable methods that make these products world-class.",
        content: `<h2>Traditional Farming Meets Modern Standards</h2><p>Many of India's GI-tagged agricultural products owe their unique character to centuries-old farming practices. These aren't just heritage methods — they often produce superior products while maintaining ecological balance.</p><h2>Kashmiri Saffron: The Labour of Love</h2><p>Kashmiri saffron farming is almost entirely manual. Each saffron flower must be harvested by hand at dawn before the sun opens the petals. A single gram of saffron requires 150–180 flowers. This labour-intensive process, combined with Kashmir's unique soil chemistry, creates the world's highest-grade saffron.</p><h2>Alphonso Mango's Soil Story</h2><p>Ratnagiri's laterite soil is high in iron and deficient in calcium — a combination that produces the Alphonso's signature saffron flesh and concentrated sweetness. Farmers use traditional organic mulching practices passed down through generations.</p><h2>Vijay Overseas's Farmer Partnership Program</h2><p>We partner directly with 200+ farmer families across 8 states, offering fair prices, technical support, and market access. Our supply chain eliminates 4–5 layers of middlemen, ensuring farmers receive 40–60% more than they'd earn through traditional channels.</p>`,
        author: "Vijay Overseas Team",
        tags: ["Sustainable Farming", "Farmer Partnership", "GI Products", "Organic Agriculture"],
        categories: ["Sustainability", "Farming", "GI Products"],
        isPublished: false,
        coverImage:
          "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=630&fit=crop",
        seoTitle: "Sustainable Farming Behind India's GI Agricultural Exports | Vijay Overseas",
        seoDescription:
          "How traditional and sustainable farming practices create India's most premium GI-tagged exports. Vijay Overseas farmer partnership program.",
      },
    ]);
    console.log("Blogs seeded.");

    // ── TESTIMONIALS ───────────────────────────────────────────────────────
    await Testimonial.insertMany([
      {
        name: "Ahmed Al-Rashidi",
        designation: "Procurement Director",
        company: "Gulf Commodities FZE, Dubai",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        message:
          "Vijay Overseas has been our trusted partner for GI-certified Indian products for three years. Their quality consistency, transparent documentation, and on-time delivery have made them our preferred supplier. The Kashmiri Saffron and Darjeeling Tea they supply consistently pass our lab tests with flying colours.",
        rating: 5,
        isActive: true,
        order: 1,
      },
      {
        name: "Priya Mehta",
        designation: "Category Head — Gourmet Imports",
        company: "Nature's Basket, Mumbai",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        message:
          "We've been sourcing Alphonso Mangoes and premium spices through Vijay Overseas for our premium retail chain. Their GI certification documentation is meticulous, and the product quality is exactly what our discerning customers expect. The traceability from farm to our shelves is impressive.",
        rating: 5,
        isActive: true,
        order: 2,
      },
      {
        name: "Klaus Müller",
        designation: "Specialty Foods Buyer",
        company: "BioFach Import GmbH, Germany",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg",
        message:
          "We import Darjeeling First Flush and Basmati Rice from Vijay Overseas for the European organic specialty market. Their understanding of EU phytosanitary requirements and APEDA certifications saves us enormous compliance effort. The quality of produce is consistently premium-grade.",
        rating: 5,
        isActive: true,
        order: 3,
      },
      {
        name: "Rajesh Nair",
        designation: "Co-Founder",
        company: "Kerala Spice Trail, UK",
        avatar: "https://randomuser.me/api/portraits/men/21.jpg",
        message:
          "As an Indian diaspora food brand in the UK, authenticity is everything to us. Vijay Overseas provides us with genuine GI-tagged spices and products that let us confidently market 'real India' to our UK customers. Their support team is responsive and knowledgeable.",
        rating: 4,
        isActive: true,
        order: 4,
      },
      {
        name: "Yuki Tanaka",
        designation: "Import Manager",
        company: "Nihon Fine Foods, Tokyo",
        avatar: "https://randomuser.me/api/portraits/women/56.jpg",
        message:
          "Japan's specialty food market is extremely quality-conscious. Vijay Overseas understands this and consistently provides Darjeeling Tea and Alphonso Mango that meet our strict quality benchmarks. Their product knowledge and export documentation are among the best we've encountered.",
        rating: 5,
        isActive: true,
        order: 5,
      },
    ]);
    console.log("Testimonials seeded.");

    console.log("\n✅ Database seeded successfully!");
    console.log(`\nAdmin credentials:`);
    console.log(`  Email: ${process.env.ADMIN_EMAIL || "admin@vijayoverseas.com"}`);
    console.log(`  Password: ${process.env.ADMIN_PASSWORD || "Admin@1234"}`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
