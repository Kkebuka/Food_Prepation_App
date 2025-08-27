Here's the complete README.md content you can copy and paste:

```markdown
# ��️ Foodcourt - Food Preparation App

A modern, responsive web application for discovering, exploring, and saving delicious recipes from around the world.

## ✨ Features

- **Recipe Discovery**: Browse meals by category with beautiful card layouts
- **Global Search**: Search recipes by name, ingredients, or cuisine
- **Favorites System**: Save and manage your favorite recipes with persistent storage
- **Responsive Design**: Optimized for all devices with mobile-first approach
- **Real-time Data**: Powered by TheMealDB API for authentic recipe information
- **Interactive UI**: Smooth animations and hover effects for enhanced user experience

## 🎨 Design Choices & Philosophy

### **Visual Design**
- **Color Palette**: Rose-to-orange gradients for warmth and appetite appeal
- **Typography**: Inter for body text (excellent readability), Fredoka for headings (friendly, food-related feel)
- **Card-based Layout**: Clean, scannable recipe cards that work well on all screen sizes
- **Subtle Animations**: Hover effects and transitions that enhance without overwhelming

### **User Experience**
- **Intuitive Navigation**: Clear category browsing and search functionality
- **Persistent Favorites**: Local storage ensures user preferences are saved
- **Responsive Grid**: Adaptive layouts that work seamlessly across devices
- **Accessibility**: Proper ARIA labels and semantic HTML structure

### **Technical Architecture**
- **React 19**: Latest React features for optimal performance
- **Tailwind CSS v4**: Modern utility-first CSS with custom design tokens
- **React Query**: Efficient data fetching and caching
- **Context API**: Global state management for favorites system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd food-preparation-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## ��️ Project Structure

```
src/
├── components/
│   ├── layout/          # Header, MainLayout
│   └── ui/             # Reusable UI components
├── contexts/            # Global state management
├── pages/              # Route components
│   ├── home/           # Landing page with hero and main menu
│   ├── categories/      # Category browsing
│   ├── meals/          # Search results
│   └── foodDetails/    # Individual recipe details
└── assets/             # Images and static files
```

## �� Key Technologies

- **Frontend**: React 19, Vite, Tailwind CSS v4
- **State Management**: React Context API, React Query
- **Routing**: React Router DOM v7
- **API Integration**: TheMealDB REST API
- **Deployment**: Vercel (with vercel.json configuration)

## �� Challenges Faced & Solutions

### **1. Cross-Device Stability**
**Challenge**: Category cards were unstable across different devices due to mixed CSS frameworks and inconsistent spacing.

**Solution**: 
- Standardized on Tailwind CSS v4 exclusively
- Removed DaisyUI dependencies that caused conflicts
- Implemented consistent padding and spacing
- Added proper responsive breakpoints

### **2. Global State Management**
**Challenge**: Needed a favorites system that persisted across sessions and worked seamlessly across all components.

**Solution**:
- Created a custom `FavoritesContext` with localStorage persistence
- Implemented efficient state updates with `useCallback` and `useMemo`
- Ensured consistent behavior across Home, Categories, and Search pages

### **3. API Integration & Data Handling**
**Challenge**: TheMealDB API has different endpoints for different search types, requiring data merging and deduplication.

**Solution**:
- Implemented parallel API calls for name and ingredient searches
- Created efficient merging logic with Set-based deduplication
- Added proper error handling and loading states

### **4. Responsive Design**
**Challenge**: Creating a layout that works well on mobile, tablet, and desktop while maintaining visual appeal.

**Solution**:
- Mobile-first approach with progressive enhancement
- Flexible grid system that adapts to screen size
- Touch-friendly interactive elements
- Optimized typography scaling

### **5. Performance Optimization**
**Challenge**: Large recipe lists and images could impact performance on slower devices.

**Solution**:
- Implemented React Query for efficient data caching
- Added lazy loading for images
- Used `useMemo` for expensive computations
- Optimized re-renders with proper dependency arrays

## 🌐 API Integration

The app integrates with [TheMealDB](https://www.themealdb.com/) for recipe data:

- **Categories**: `/categories.php` - Browse recipe categories
- **Meals by Category**: `/filter.php?c={category}` - Get meals in a category
- **Search by Name**: `/search.php?s={query}` - Find recipes by name
- **Search by Ingredient**: `/filter.php?i={ingredient}` - Find recipes by ingredient
- **Recipe Details**: `/lookup.php?i={id}` - Get full recipe information

## 🚀 Deployment

The app is configured for Vercel deployment with:

- **Build Optimization**: Vite for fast builds
- **Static Generation**: Optimized for performance
- **Environment Variables**: Secure API configuration
- **Responsive Images**: Optimized for different screen densities

## 🔮 Future Enhancements

- **User Authentication**: Personal recipe collections
- **Recipe Ratings**: Community-driven recommendations
- **Nutritional Information**: Health-conscious features
- **Offline Support**: PWA capabilities for offline browsing
- **Social Sharing**: Share favorite recipes on social media

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## �� Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for providing the recipe API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Query](https://tanstack.com/query) for efficient data fetching
- [Vercel](https://vercel.com/) for seamless deployment

---
