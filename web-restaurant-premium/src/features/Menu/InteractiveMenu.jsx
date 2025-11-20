import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DishCard from './DishCard';
import Button from '../../components/UI/Button';
import { menuData, categories } from './menuData';
import './InteractiveMenu.css';

const InteractiveMenu = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredDishes = activeCategory === "All"
        ? menuData
        : menuData.filter(dish => dish.category === activeCategory);

    return (
        <div className="interactive-menu">
            <div className="menu-filters">
                {categories.map(category => (
                    <Button
                        key={category}
                        variant={activeCategory === category ? 'primary' : 'secondary'}
                        onClick={() => setActiveCategory(category)}
                        className="filter-btn"
                    >
                        {category}
                    </Button>
                ))}
            </div>

            <motion.div
                layout
                className="menu-grid"
            >
                <AnimatePresence>
                    {filteredDishes.map(dish => (
                        <motion.div
                            key={dish.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                        >
                            <DishCard dish={dish} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default InteractiveMenu;
