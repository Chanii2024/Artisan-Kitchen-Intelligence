export const recipes = [
    {
        id: 1,
        name: "Classic Sourdough",
        description: "Artisan fermented bread with a complex flavor profile and distinct crust.",
        category: "Bakery",
        baseServings: 1,
        ingredients: [
            { id: 'flour', name: "Strong White Bread Flour", baseAmount: 100, unit: "g", category: "Dry" },
            { id: 'water', name: "Tepid Water", baseAmount: 70, unit: "ml", category: "Wet" },
            { id: 'starter', name: "Active Sourdough Starter", baseAmount: 20, unit: "g", category: "Live" },
            { id: 'salt', name: "Fine Sea Salt", baseAmount: 2, unit: "g", category: "Dry", alternative: { name: "Himalayan Pink Salt", category: "Dry" } },
            { id: 'oil', name: "Olive Oil (for bowl)", baseAmount: 5, unit: "ml", category: "Wet", methodAdjustments: { "Express": 0.5 } }
        ],
        metadata: {
            "Standard": { label: "Standard Oven", description: "Bake in Dutch oven at 230°C." },
            "Express": { label: "Rapid Proof", description: "Use proofing box. Flavor may be milder." },
            "Pro-Batch": { label: "Commercial Deck", description: "Steam injection required." }
        }
    },
    {
        id: 2,
        name: "Batch Pasta Bolognese",
        description: "Rich, slow-cooked ragu served with al dente pasta.",
        category: "Main",
        baseServings: 1,
        ingredients: [
            { id: 'beef', name: "Beef Mince (15% fat)", baseAmount: 150, unit: "g", category: "Meat", alternative: { name: "Premium Wagyu Mince", category: "Meat" } },
            { id: 'pork', name: "Pork Mince", baseAmount: 50, unit: "g", category: "Meat" },
            { id: 'onion', name: "Yellow Onion", baseAmount: 0.25, unit: "medium", category: "Produce" },
            { id: 'garlic', name: "Garlic Clove", baseAmount: 1, unit: "unit", category: "Produce" },
            { id: 'tomato', name: "San Marzano Tomatoes", baseAmount: 100, unit: "g", category: "Pantry" },
            { id: 'oil', name: "Olive Oil", baseAmount: 15, unit: "ml", category: "Pantry", methodAdjustments: { "Express": 0.4 } },
            { id: 'pasta', name: "Dried Tagliatelle", baseAmount: 100, unit: "g", category: "Pantry", alternative: { name: "Fresh Egg Pasta", category: "Pantry" } },
            { id: 'butter', name: "Margarine", baseAmount: 10, unit: "g", category: "Dairy", alternative: { name: "Artisan Cultured Butter", category: "Dairy" } }
        ],
        metadata: {
            "Standard": { label: "Stovetop Simmer", description: "Slow cook for 3+ hours." },
            "Express": { label: "Pressure Cooker", description: "High pressure for 30 mins." },
            "Pro-Batch": { label: "Tilt Skillet", description: "Industrial batch cooking." }
        }
    },
    {
        id: 3,
        name: "Gourmet Cupcakes",
        description: "Delicate vanilla bean sponge with swiss meringue buttercream.",
        category: "Dessert",
        baseServings: 1,
        ingredients: [
            { id: 'flour', name: "Cake Flour", baseAmount: 40, unit: "g", category: "Dry" },
            { id: 'sugar', name: "Granulated Sugar", baseAmount: 30, unit: "g", category: "Dry" },
            { id: 'butter', name: "Unsalted Butter", baseAmount: 30, unit: "g", category: "Dairy", methodAdjustments: { "Express": 0.9 } },
            { id: 'eggs', name: "Free Range Egg", baseAmount: 0.5, unit: "unit", category: "Dairy" },
            { id: 'vanilla', name: "Vanilla Extract", baseAmount: 1, unit: "tsp", category: "Flavor", alternative: { name: "Madagascan Vanilla Bean Paste", category: "Flavor" } },
            { id: 'milk', name: "Whole Milk", baseAmount: 15, unit: "ml", category: "Dairy" }
        ],
        metadata: {
            "Standard": { label: "Convection Oven", description: "Bake at 160°C." },
            "Express": { label: "Air-Fryer", description: "Lower temp to 150°C, faster bake." },
            "Pro-Batch": { label: "Rack Oven", description: "Rotate racks halfway." }
        }
    }
];
