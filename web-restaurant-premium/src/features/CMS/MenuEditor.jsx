import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../../components/UI/Button';
import { categories } from '../Menu/menuData';
import './MenuEditor.css';

const MenuEditor = ({ dish, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: categories[1], // Default to first actual category
        image: '',
        dietary: []
    });

    useEffect(() => {
        if (dish) {
            setFormData(dish);
        }
    }, [dish]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="editor-overlay">
            <motion.div
                className="editor-modal"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h3>{dish ? 'Edit Dish' : 'Add New Dish'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Price (€)</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" value={formData.category} onChange={handleChange}>
                                {categories.filter(c => c !== 'All').map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input name="image" value={formData.image} onChange={handleChange} placeholder="https://..." />
                    </div>

                    <div className="editor-actions">
                        <Button variant="secondary" type="button" onClick={onCancel}>Cancel</Button>
                        <Button variant="primary" type="submit">Save Dish</Button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default MenuEditor;
