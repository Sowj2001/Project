import React, { useEffect, useState } from 'react';
import Search from '../components/Search';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../../store/Reducers/productReducer';

const Products = () => {
    const dispatch = useDispatch();
    const { products, totalProduct } = useSelector(state => state.product);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);

    useEffect(() => {
        const params = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        };
        dispatch(get_products(params));
    }, [dispatch, searchValue, currentPage, parPage]);

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <h1 className='text-[#000000] font-semibold text-lg mb-3'>All Products</h1>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />

                <div className='relative overflow-x-auto mt-5'>
                    <table className='w-full text-sm text-left text-[#d0d2d6]'>
                        <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                            <tr>
                                <th scope='col' className='py-3 px-4'>No</th>
                                <th scope='col' className='py-3 px-4'>Image</th>
                                <th scope='col' className='py-3 px-4'>Name</th>
                                <th scope='col' className='py-3 px-4'>Category</th>
                                <th scope='col' className='py-3 px-4'>Brand</th>
                                <th scope='col' className='py-3 px-4'>Price</th>
                                <th scope='col' className='py-3 px-4'>Discount</th>
                                <th scope='col' className='py-3 px-4'>Stock</th>
                                <th scope='col' className='py-3 px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map((product, index) => (
                                <tr key={product.id || index}>
                                    <td className='py-1 px-4 font-medium whitespace-nowrap'>{index + 1}</td>
                                    <td className='py-1 px-4 font-medium whitespace-nowrap'>
                                        <img className='w-[45px] h-[45px]' src={product.images?.[0] || '/default-image.jpg'} alt={product.name} />
                                    </td>
                                    <td className='py-1 px-4 font-medium whitespace-nowrap'>{product.name?.slice(0, 15)}...</td>
                                    <td className='py-1 px-4 font-medium whitespace-nowrap'>{product.category}</td>
                                    <td className='py-1 px-4 font-medium whitespace-nowrap'>{product.brand}</td>
                                    <td className='py-1 px-4 font-medium whitespace-nowrap'>₹{product.price}</td>
                                    <td className='py-1 px-4 font-medium whitespace-nowrap'>
                                        {product.discount === 0 ? 'No Discount' : `%${product.discount}`}
                                    </td>
                                    <td className='py-1 px-4 font-medium whitespace-nowrap'>{product.stock}</td>
                                    <td className='py-1 px-4 font-medium whitespace-nowrap'>
                                        <div className='flex items-center gap-4'>
                                            <Link to={`/seller/dashboard/edit-product/${product.id}`} className='p-2 bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'>
                                                <FaEdit />
                                            </Link>
                                            <Link to={`/seller/dashboard/view-product/${product.id}`} className='p-2 bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50'>
                                                <FaEye />
                                            </Link>
                                            <button className='p-2 bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {totalProduct > parPage && (
                    <div className='w-full flex justify-end mt-4'>
                        <Pagination
                            pageNumber={currentPage}
                            setPageNumber={setCurrentPage}
                            totalItem={totalProduct}
                            parPage={parPage}
                            showItem={3}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
