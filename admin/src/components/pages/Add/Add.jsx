import "./Add.css"
import { assets } from '../../../assets/assets'
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

const Add = ({url}) => {

    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad" // Setting a default value for the category
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData (data=>({...data,[name]:value}));
    }

    const onSubmitHandler = async(event)=>{
        event.preventDefault();
        
        // Check if image is uploaded
        if (!image) {
            toast.error("Please upload an image!");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);

        const price = Number(data.price);
        // Check if price is valid
        if (isNaN(price) || price <= 0) {
            toast.error("Please enter a valid price");
            return;
        }

        formData.append("price", price);
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            console.log(response.data); // Log the response for debugging
            if (response.data.success) {
                setData({
                    name:"",
                    description:"",
                    price:"",
                    category:"Salad" // Reset to default category
                });
                setImage(false);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error submitting the form", error);
            toast.error("An error occurred. Please try again.");
        }
    }

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input 
                        onChange={(e) => setImage(e.target.files[0])} 
                        type="file" 
                        id="image" 
                        hidden 
                        required 
                    />
                </div>
                <div className="add-product-name flex col">
                    <p>Product name</p>
                    <input 
                        onChange={onChangeHandler} 
                        value={data.name} 
                        type="text" 
                        name="name" 
                        placeholder="Type here" 
                        required 
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea 
                        onChange={onChangeHandler} 
                        value={data.description} 
                        name="description" 
                        rows="6" 
                        placeholder="Write content here" 
                        required 
                    ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select 
                            onChange={onChangeHandler} 
                            name="category" 
                            value={data.category} // Setting the select value
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure veg">Pure veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input 
                            onChange={onChangeHandler} 
                            value={data.price} 
                            type="number" 
                            name="price" 
                            placeholder="$20" 
                            required 
                        />
                    </div>
                </div>
                <button className="add-btn" type="submit">ADD</button>
            </form>
        </div>
    );
}

export default Add;
