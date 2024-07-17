import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delete_product, messageClear } from '../../store/Reducers/productReducer';
import toast from 'react-hot-toast';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';

const DeleteProduct = () => {
    const dispatch = useDispatch();

    // const {productId}=useParams()
    const { products, loader, successMessage, errorMessage } = useSelector(state => state.product);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    const handleDelete = (productId) => {
        dispatch(delete_product(productId))
    };

    // useEffect(()=>{
    //     dispatch(delete_product(productId))
    // },[productId])
   

    return (
        <div className='product-list'>
            <h1>Product List</h1>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        <span>{product.name}</span>
                        <button onClick={() => handleDelete(product._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {loader && <PropagateLoader color='#fff' cssOverride={overrideStyle} />}
        </div>
    );
};

export default DeleteProduct;
