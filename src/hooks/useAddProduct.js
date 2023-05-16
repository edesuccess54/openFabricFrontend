import { useState } from "react";
import { useAuthContext } from "./useAuthContext";


export const useAddProduct = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext()

    const addProduct = async (name, price, discount, desc, image) => {
        setIsLoading(true);
        setError(null)

        try {

            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('discount', discount);
            formData.append('desc', desc);
            formData.append('image', image);

            const response = await fetch('http://localhost:2030/api/products/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                },
                body: formData
                
            })

            const json = await response.json()
        
            if (!response.ok) {
                setIsLoading(false)
                setError(json.error)
            }

            if (response.ok) {
  

                setIsLoading(false)
            }
      
        } catch (error) {
            setIsLoading(false)
            setError(error.message);
        }
    }

    return { addProduct, isLoading, error }
}