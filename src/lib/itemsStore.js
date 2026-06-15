const DEFAULT_ITEMS = [
  {
    id: "aura-keyboard-x",
    title: "Aura Mechanical Keyboard",
    category: "Keyboards",
    price: 189,
    shortDescription: "A custom 75% mechanical keyboard with hot-swappable switches, wireless connectivity, and custom walnut casing.",
    fullDescription: "Crafted for enthusiasts and designers alike, the Aura Mechanical Keyboard blends mechanical perfection with natural beauty. Featuring a solid American Walnut casing, hot-swappable linear switches pre-lubed for silent typing, and custom-designed PBT dye-sub keycaps. Connect seamlessly with Bluetooth 5.1, 2.4Ghz wireless, or USB-C. Fully customizable RGB backlight gives a warm, ambient glow underneath your workspace.",
    specs: [
      "Layout: 75% ANSI layout",
      "Case Material: American Walnut & Anodized Aluminum",
      "Switches: Aura Silent Linear (Pre-lubed)",
      "Connectivity: Tri-Mode (Bluetooth, 2.4Ghz, Type-C)",
      "Battery Life: Up to 150 hours (RGB off)"
    ],
    imageUrl: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=600&auto=format&fit=crop",
    dateAdded: "2026-05-01"
  },
  {
    id: "luna-light-bar",
    title: "Luna Monitor Light Bar",
    category: "Lighting",
    price: 79,
    shortDescription: "Asymmetrical screen-glare-free monitor light bar with wireless dial controller.",
    fullDescription: "Illuminate your desk without washing out your display. The Luna Monitor Light Bar clips elegantly to the top of your monitor, throwing light downward in an asymmetrical pattern that avoids screen reflection. Comes with a wireless desktop dial controller to adjust brightness and color temperature (2700K - 6500K) with a simple turn.",
    specs: [
      "Light Source: High-CRI LED (Ra > 95)",
      "Color Temp: 2700K - 6500K adjustable",
      "Control: 2.4Ghz Wireless Dial",
      "Power Input: 5V USB Type-C",
      "Length: 45cm / 17.7 inches"
    ],
    imageUrl: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=600&auto=format&fit=crop",
    dateAdded: "2026-05-10"
  },
  {
    id: "ego-desk-mat",
    title: "Merino Wool Desk Mat",
    category: "Desk Organizers",
    price: 49,
    shortDescription: "Premium double-layered merino wool felt desk pad with non-slip cork backing.",
    fullDescription: "Bring warmth and texture to your workspace. The Merino Wool Desk Mat provides a cozy surface that protects your desk and improves mouse tracking. Sourced from 100% natural wool, it offers water resistance, noise reduction, and a luxury feel. Finished with a non-slip natural cork backing.",
    specs: [
      "Material: 100% Merino Wool Felt & Cork",
      "Thickness: 4mm",
      "Size: Medium (80cm x 30cm)",
      "Features: Anti-fray stitching, Natural liquid resistance"
    ],
    imageUrl: "https://images.unsplash.com/photo-1632292224971-0d45778b3002?q=80&w=600&auto=format&fit=crop",
    dateAdded: "2026-05-15"
  },
  {
    id: "wooden-monitor-stand",
    title: "Walnut Desk Shelf Riser",
    category: "Desk Organizers",
    price: 129,
    shortDescription: "Ergonomic monitor riser crafted from solid walnut with powder-coated steel brackets.",
    fullDescription: "Elevate your monitor to eye level while expanding your desk storage. This solid walnut desk shelf accommodates up to two monitors or a single ultra-wide. Supported by heavy-duty powder-coated steel brackets, it offers structural integrity and a modern industrial look. Store your keyboard, dock, or notebook underneath.",
    specs: [
      "Wood Type: Solid American Walnut",
      "Bracket Material: Matte Powder-Coated Steel",
      "Weight Capacity: Up to 50kg / 110lbs",
      "Dimensions: 110cm x 22cm x 11cm"
    ],
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop",
    dateAdded: "2026-05-20"
  },
  {
    id: "ambient-neon-glow",
    title: "Aura Ambient Glow Tube",
    category: "Lighting",
    price: 99,
    shortDescription: "Retro-modern RGB tube light with custom preset ambient sequences.",
    fullDescription: "Add cinematic lighting to your desktop setup. The Aura Ambient Glow Tube utilizes retro nixie-tube aesthetics combined with state-of-the-art addressable LEDs. Toggle between 16 million colors and 20 custom animation modes. Syncs with music or desk sounds using an integrated high-sensitivity microphone.",
    specs: [
      "LEDs: 60 Addressable RGB ICs",
      "Base Material: CNC-anodized Aluminum",
      "Audio Sync: Built-in Mic with AGC",
      "Power Source: USB 5V/2A"
    ],
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop",
    dateAdded: "2026-05-25"
  },
  {
    id: "ergo-chair-cushion",
    title: "Ego Lumbar Support",
    category: "Accessories",
    price: 39,
    shortDescription: "Memory foam lumbar cushion with premium mesh cover for desk chairs.",
    fullDescription: "Enhance your sitting comfort during long coding or design sessions. The Ego Ergonomic Lumbar Support is engineered to support the natural curve of your lower back. Filled with high-density cooling gel memory foam, it maintains its shape while regulating heat. Features dual adjustable straps to lock onto any desk chair.",
    specs: [
      "Filling: Cooling Gel Memory Foam",
      "Cover: Breathable 3D Mesh (Washable)",
      "Dimensions: 40cm x 38cm x 10cm",
      "Strap System: Double adjustable straps"
    ],
    imageUrl: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=600&auto=format&fit=crop",
    dateAdded: "2026-05-30"
  }
];

const ITEMS_KEY = "aura_space_items";

// Helper to check if code is executing in browser
const isClient = () => typeof window !== "undefined";

export const getItems = () => {
  if (!isClient()) return DEFAULT_ITEMS;
  
  const stored = localStorage.getItem(ITEMS_KEY);
  if (!stored) {
    localStorage.setItem(ITEMS_KEY, JSON.stringify(DEFAULT_ITEMS));
    return DEFAULT_ITEMS;
  }
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Error parsing stored items, resetting storage", e);
    localStorage.setItem(ITEMS_KEY, JSON.stringify(DEFAULT_ITEMS));
    return DEFAULT_ITEMS;
  }
};

export const getItemById = (id) => {
  const items = getItems();
  return items.find(item => item.id === id);
};

export const addItem = (newItem) => {
  if (!isClient()) return false;
  
  const items = getItems();
  const createdItem = {
    ...newItem,
    id: newItem.id || `aura-${Math.random().toString(36).substring(2, 9)}`,
    price: Number(newItem.price) || 0,
    specs: newItem.specs || [],
    dateAdded: new Date().toISOString().split("T")[0]
  };
  
  const updatedItems = [createdItem, ...items];
  localStorage.setItem(ITEMS_KEY, JSON.stringify(updatedItems));
  return createdItem;
};

export const deleteItem = (id) => {
  if (!isClient()) return false;
  
  const items = getItems();
  const updatedItems = items.filter(item => item.id !== id);
  localStorage.setItem(ITEMS_KEY, JSON.stringify(updatedItems));
  return true;
};
