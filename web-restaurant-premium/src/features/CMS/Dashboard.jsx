import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/UI/Button';
import { menuData } from '../Menu/menuData';
import MenuEditor from './MenuEditor';
import './Dashboard.css';

const Dashboard = () => {
    const [dishes, setDishes] = useState(menuData);
    const [editingDish, setEditingDish] = useState(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this dish?')) {
            setDishes(dishes.filter(d => d.id !== id));
        }
    };

    const handleEdit = (dish) => {
        setEditingDish(dish);
        setIsEditorOpen(true);
    };

    const handleAddNew = () => {
        setEditingDish(null);
        setIsEditorOpen(true);
    };

    const handleSave = (dish) => {
        if (editingDish) {
            setDishes(dishes.map(d => d.id === dish.id ? dish : d));
        } else {
            setDishes([...dishes, { ...dish, id: Date.now() }]);
        }
        setIsEditorOpen(false);
    };

    return (
        <div className="cms-dashboard">
            <div className="dashboard-header">
                <h2>Menu Management</h2>
                <Button variant="primary" onClick={handleAddNew}>+ Add New Dish</Button>
            </div>

            <div className="dishes-list">
                {dishes.map(dish => (
                    <motion.div
                        key={dish.id}
                        className="dish-row"
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="dish-info">
                            <img src={dish.image} alt={dish.name} className="dish-thumb" />
                            <div>
                                <h4>{dish.name}</h4>
                                <span className="dish-category">{dish.category}</span>
                            </div>
                        </div>
                        <div className="dish-price">€{dish.price}</div>
                        <div className="dish-actions">
                            <button onClick={() => handleEdit(dish)}>Edit</button>
                            <button onClick={() => handleDelete(dish.id)} className="delete-btn">Delete</button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {isEditorOpen && (
                <MenuEditor
                    dish={editingDish}
                    onSave={handleSave}
                    onCancel={() => setIsEditorOpen(false)}
                />
            )}
        </div>
    );
};

export default Dashboard;
