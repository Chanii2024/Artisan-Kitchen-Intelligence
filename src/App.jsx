import React, { useState, useMemo } from 'react';
import { Plus, Trash2, ChefHat, Users, Repeat, Scale, Info, ShoppingBasket, Search, X, Flame } from 'lucide-react';
import { recipes } from './recipes';

// Utility for pretty number formatting
const formatNumber = (num) => {
  if (num % 1 === 0) return num;
  return num.toFixed(2).replace(/\.00$/, '');
};

// Unit conversion helper
const formatUnit = (amount, unit) => {
  let finalAmount = amount;
  let finalUnit = unit;

  if (unit === 'g' && finalAmount >= 1000) {
    finalAmount /= 1000;
    finalUnit = 'kg';
  } else if (unit === 'ml' && finalAmount >= 1000) {
    finalAmount /= 1000;
    finalUnit = 'L';
  }

  return `${formatNumber(finalAmount)} ${finalUnit}`;
};

const Header = () => (
  <header className="py-8 px-6 border-b border-bronze-light/30 bg-parchment flex items-center justify-between sticky top-0 z-40 bg-opacity-95 backdrop-blur-sm">
    <div className="flex items-center gap-3">
      <div className="bg-bronze text-white p-2 rounded-lg shadow-md">
        <ChefHat size={32} strokeWidth={1.5} />
      </div>
      <div>
        <h1 className="text-2xl md:text-3xl font-serif text-bronze-dark tracking-tight">Artisan Kitchen Intelligence</h1>
        <p className="text-bronze-light text-sm font-sans tracking-wide uppercase">Precision Culinary Workspace</p>
      </div>
    </div>
  </header>
);

const RecipeCard = ({ item, onUpdate, onDelete }) => {
  const recipe = recipes.find(r => r.id === item.recipeId);
  const metadata = recipe.metadata[item.method] || {};

  const handleUpdate = (field, value) => {
    onUpdate(item.uniqueId, { ...item, [field]: value });
  };

  const calculatedIngredients = useMemo(() => {
    return recipe.ingredients.map(ing => {
      let amount = ing.baseAmount * item.people * item.frequency;

      // Method Adjustment
      if (ing.methodAdjustments && ing.methodAdjustments[item.method]) {
        amount *= ing.methodAdjustments[item.method];
      }

      // Variation
      const activeIngredient = (item.premium && ing.alternative) ? ing.alternative : ing;

      return {
        ...activeIngredient,
        originalId: ing.id,
        amount,
        unit: ing.unit,
        category: ing.category
      };
    });
  }, [recipe, item]);

  return (
    <div className="card-paper relative group animate-fade-in-up">
      <button
        onClick={() => onDelete(item.uniqueId)}
        className="absolute top-4 right-4 text-stone-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 size={18} />
      </button>

      <div className="mb-6">
        <span className="text-xs font-bold tracking-widest text-bronze uppercase bg-bronze/10 px-2 py-1 rounded mb-2 inline-block">
          {recipe.category}
        </span>
        <h3 className="text-2xl font-serif text-stone-800 leading-none">{recipe.name}</h3>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-600">
              <Users size={18} />
              <span className="text-sm font-medium">People</span>
            </div>
            <div className="flex items-center bg-parchment border border-bronze-light/30 rounded-full px-1">
              <button
                className="p-1 hover:text-bronze"
                onClick={() => handleUpdate('people', Math.max(1, item.people - 1))}
              >-</button>
              <span className="w-8 text-center font-bold text-bronze-dark">{item.people}</span>
              <button
                className="p-1 hover:text-bronze"
                onClick={() => handleUpdate('people', item.people + 1)}
              >+</button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-600">
              <Repeat size={18} />
              <span className="text-sm font-medium">Meals/Person</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={item.frequency}
              onChange={(e) => handleUpdate('frequency', parseInt(e.target.value))}
              className="accent-bronze w-24 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-bold text-bronze-dark w-6 text-right">{item.frequency}</span>
          </div>

        </div>

        <div className="space-y-4 pl-0 md:pl-6 md:border-l border-bronze-light/20">

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase text-stone-500 flex items-center gap-1">
              <Flame size={12} /> Method
            </label>
            <select
              value={item.method}
              onChange={(e) => handleUpdate('method', e.target.value)}
              className="input-base text-sm py-1 bg-transparent"
            >
              {Object.keys(recipe.metadata).map(m => (
                <option key={m} value={m}>{recipe.metadata[m].label}</option>
              ))}
            </select>
            <p className="text-[10px] text-bronze/80 italic">{metadata.description}</p>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="text-sm font-medium text-stone-600 cursor-pointer select-none" htmlFor={`prem-${item.uniqueId}`}>
              Chef's Choice
            </label>
            <div
              onClick={() => handleUpdate('premium', !item.premium)}
              className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${item.premium ? 'bg-bronze' : 'bg-stone-300'}`}
            >
              <div className={`bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${item.premium ? 'translate-x-[1.15rem]' : ''}`} />
            </div>
          </div>

        </div>
      </div>

      {/* Ingredient Table */}
      <div className="bg-parchment/50 rounded border border-stone-200/60 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-stone-50 text-stone-500 font-sans text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 font-medium">Ingredient</th>
              <th className="px-4 py-3 font-medium text-right">Qty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {calculatedIngredients.map((ing, idx) => (
              <tr key={idx} className="hover:bg-white transition-colors">
                <td className="px-4 py-2 border-r border-dashed border-stone-200">
                  <span className={`font-medium ${ing.alternative ? 'text-bronze-dark' : 'text-stone-700'}`}>
                    {ing.name}
                  </span>
                  {ing.alternative && <span className="ml-2 text-[10px] text-bronze border border-bronze/20 px-1 rounded">PREMIUM</span>}
                </td>
                <td className="px-4 py-2 text-right font-mono text-stone-600">
                  {formatUnit(ing.amount, ing.unit)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AggregatedList = ({ items }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const aggregated = useMemo(() => {
    const total = {};

    items.forEach(item => {
      const recipe = recipes.find(r => r.id === item.recipeId);
      recipe.ingredients.forEach(baseIng => {
        let amount = baseIng.baseAmount * item.people * item.frequency;
        if (baseIng.methodAdjustments && baseIng.methodAdjustments[item.method]) {
          amount *= baseIng.methodAdjustments[item.method];
        }

        const activeName = (item.premium && baseIng.alternative) ? baseIng.alternative.name : baseIng.name;
        // Group by name + unit to avoid mixing 'g' and 'ml' purely by name
        const key = `${activeName}||${baseIng.unit}||${baseIng.category}`;

        if (!total[key]) {
          total[key] = { name: activeName, amount: 0, unit: baseIng.unit, category: baseIng.category };
        }
        total[key].amount += amount;
      });
    });

    return Object.values(total).sort((a, b) => a.category.localeCompare(b.category));
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className={`mt-12 bg-stone-900 text-stone-200 rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.3)] transition-all duration-500 ease-in-out max-w-4xl mx-auto transform overflow-hidden ${isMinimized ? 'translate-y-[calc(100%-64px)]' : 'translate-y-0'}`}>
      {/* Minimize Handle */}
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className="w-full h-8 flex items-center justify-center group pointer-events-auto"
      >
        <div className="w-12 h-1 bg-stone-700 rounded-full group-hover:bg-bronze transition-colors flex items-center justify-center">
          <div className="w-4 h-0.5 bg-current"></div>
        </div>
      </button>

      <div className="px-8 pb-8 pt-2">
        <div className="flex items-center gap-3 mb-6 border-b border-stone-800 pb-4">
          <ShoppingBasket className="text-bronze-light" />
          <h2 className="text-xl font-serif text-white tracking-wide">Consolidated Inventory</h2>
          <span className="ml-auto text-sm text-stone-500">{items.length} Active Recipes</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-12 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
          {aggregated.map((ing, idx) => (
            <div key={idx} className="flex justify-between items-end border-b border-stone-800 pb-1">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-stone-500 tracking-wider mb-0.5">{ing.category}</span>
                <span className="text-stone-300 font-medium">{ing.name}</span>
              </div>
              <span className="font-mono text-bronze-light text-lg">{formatUnit(ing.amount, ing.unit)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeRecipes, setActiveRecipes] = useState([]);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const addRecipe = (recipeId) => {
    const newItem = {
      uniqueId: Date.now(),
      recipeId,
      people: 1,
      frequency: 1,
      method: 'Standard',
      premium: false
    };
    setActiveRecipes(prev => [...prev, newItem]);
    setIsSelectorOpen(false);
    setSearchQuery("");
  };

  const updateRecipe = (uniqueId, updatedData) => {
    setActiveRecipes(prev => prev.map(item => item.uniqueId === uniqueId ? updatedData : item));
  };

  const removeRecipe = (uniqueId) => {
    setActiveRecipes(prev => prev.filter(item => item.uniqueId !== uniqueId));
  };

  const filteredRecipes = recipes.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20">
      <Header />

      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">

        {/* Workspace Control */}
        <div className="flex justify-between items-end mb-8 animate-fade-in">
          <div>
            <h2 className="text-3xl font-serif text-stone-800">Your Workspace</h2>
            <p className="text-stone-500 font-sans mt-1">Manage portions, dietary modes, and sourcing variations.</p>
          </div>
          <button
            onClick={() => setIsSelectorOpen(true)}
            className="bg-bronze hover:bg-bronze-dark text-white pl-4 pr-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium"
          >
            <Plus size={20} /> Add Dish
          </button>
        </div>

        {/* Empty State */}
        {activeRecipes.length === 0 && (
          <div className="border-2 border-dashed border-bronze/20 rounded-xl p-12 text-center text-stone-400 font-sans">
            <Scale size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">Your workspace is clear.</p>
            <p className="text-sm">Add a recipe to begin calculating ingredients.</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activeRecipes.map(item => (
            <RecipeCard
              key={item.uniqueId}
              item={item}
              onUpdate={updateRecipe}
              onDelete={removeRecipe}
            />
          ))}
        </div>

      </main>

      {/* Aggregate Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
        <div className="pointer-events-auto">
          <AggregatedList items={activeRecipes} />
        </div>
      </div>

      {/* Recipe Selector Modal */}
      {isSelectorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-up">
            <div className="p-4 border-b border-stone-100 flex items-center gap-3">
              <Search className="text-stone-400" />
              <input
                autoFocus
                className="flex-1 text-lg outline-none text-stone-700 placeholder:text-stone-300 font-sans"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={() => setIsSelectorOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredRecipes.map(recipe => (
                <button
                  key={recipe.id}
                  onClick={() => addRecipe(recipe.id)}
                  className="w-full text-left p-4 hover:bg-parchment rounded-lg group transition-colors flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-serif text-lg text-stone-800 group-hover:text-bronze transition-colors">{recipe.name}</h4>
                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">{recipe.category}</span>
                  </div>
                  <Plus className="opacity-0 group-hover:opacity-100 text-bronze transition-opacity" />
                </button>
              ))}
              {filteredRecipes.length === 0 && (
                <div className="p-8 text-center text-stone-400 text-sm">No recipes found.</div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
