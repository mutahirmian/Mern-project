import { useContext } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storeContext'
import { toast } from 'react-toastify' // Import toast

const FoodItem = ({id, name, price, description, image}) => {

    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    const handleAddToCart = () => {
        addToCart(id);
        toast.success(`${name} has been added to the cart!`); // Notify on add
    };

    const handleRemoveFromCart = () => {
        removeFromCart(id);
        toast.info(`${name} has been removed from the cart!`); // Notify on remove
    };

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-image' src={url + "/images/" + image} alt="" />
                {!cartItems[id] ? (
                    <img className='add' onClick={handleAddToCart} src={assets.add_icon_white} alt="" />
                ) : (
                    <div className='food-item-counter'>
                        <img onClick={handleRemoveFromCart} src={assets.remove_icon_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={handleAddToCart} src={assets.add_icon_green} alt="" />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">Rs {price}</p>
            </div>
        </div>
    )
}

export default FoodItem;
