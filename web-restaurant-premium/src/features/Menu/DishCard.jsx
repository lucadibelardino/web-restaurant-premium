import Card from '../../components/UI/Card';
import './DishCard.css';

const DishCard = ({ dish }) => {
    return (
        <Card className="dish-card">
            <div className="dish-image-container">
                <img src={dish.image} alt={dish.name} className="dish-image" loading="lazy" />
                <div className="dish-price">€{dish.price}</div>
            </div>
            <div className="dish-content">
                <div className="dish-header">
                    <h3>{dish.name}</h3>
                    <div className="dish-dietary">
                        {dish.dietary.map(tag => (
                            <span key={tag} className="dietary-tag">{tag}</span>
                        ))}
                    </div>
                </div>
                <p className="dish-description">{dish.description}</p>
            </div>
        </Card>
    );
};

export default DishCard;
