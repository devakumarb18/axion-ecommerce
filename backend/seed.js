const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

// Sample helmet products
const products = [
    {
        name: 'Axion Max (Special Edition)',
        price: 2999,
        description: 'Iron Man Red Edition with premium visor and advanced safety features.',
        image: 'https://via.placeholder.com/300x300/ff0000/ffffff?text=Axion+Max',
        stock: 15,
        category: 'premium',
        featured: true
    },
    {
        name: 'Axion Stealth',
        price: 1499,
        description: 'Matte black finish for stealth riders. Lightweight and aerodynamic.',
        image: 'https://via.placeholder.com/300x300/000000/ffffff?text=Stealth',
        stock: 25,
        category: 'standard',
        featured: false
    },
    {
        name: 'Axion Green Viper',
        price: 1899,
        description: 'High visibility neon green for maximum safety on the road.',
        image: 'https://via.placeholder.com/300x300/00ff00/000000?text=Viper',
        stock: 20,
        category: 'standard',
        featured: false
    },
    {
        name: 'Axion Gold Rush',
        price: 3499,
        description: 'Limited edition gold plating with carbon fiber shell.',
        image: 'https://via.placeholder.com/300x300/ffd700/000000?text=Gold',
        stock: 5,
        category: 'premium',
        featured: true
    },
    {
        name: 'Axion Carbon Pro',
        price: 2299,
        description: 'Professional grade carbon fiber construction.',
        image: 'https://via.placeholder.com/300x300/333333/ffffff?text=Carbon',
        stock: 12,
        category: 'premium',
        featured: false
    },
    {
        name: 'Axion Street Rider',
        price: 999,
        description: 'Affordable protection for daily commuters.',
        image: 'https://via.placeholder.com/300x300/0066cc/ffffff?text=Street',
        stock: 30,
        category: 'standard',
        featured: false
    }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/axion-helmets');
        console.log('✅ MongoDB Connected');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert new products
        const createdProducts = await Product.insertMany(products);
        console.log(`✅ ${createdProducts.length} products seeded successfully`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
