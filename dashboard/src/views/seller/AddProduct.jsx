import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdImages, IoMdCloseCircle } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { get_category } from '../../store/Reducers/categoryReducer';
import { add_product, messageClear } from '../../store/Reducers/productReducer';
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import toast from 'react-hot-toast';

const AddProduct = () => {
    const dispatch = useDispatch();
    const { categorys } = useSelector(state => state.category);
    const { loader, successMessage, errorMessage } = useSelector(state => state.product);

    const [state, setState] = useState({
        name: '',
        description: '',
        discount: '',
        price: '',
        brand: '',
        stock: ''
    });

    const [cateShow, setCateShow] = useState(false);
    const [category, setCategory] = useState('');
    const [allCategory, setAllCategory] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [images, setImages] = useState([]);
    const [imageShow, setImageShow] = useState([]);

    useEffect(() => {
        dispatch(get_category({
            searchValue: '',
            parPage: '',
            page: ''
        }));
    }, [dispatch]);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
            setState({
                name: '',
                description: '',
                discount: '',
                price: '',
                brand: '',
                stock: ''
            });
            setImageShow([]);
            setImages([]);
            setCategory('');
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const categorySearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        if (value) {
            const srcValue = categorys.filter(c => c.name.toLowerCase().includes(value.toLowerCase()));
            setAllCategory(srcValue);
        } else {
            setAllCategory(categorys);
        }
    };

    const imageHandle = (e) => {
        const files = e.target.files;
        const length = files.length;
        if (length > 0) {
            const newImages = Array.from(files);
            setImages([...images, ...newImages]);
            const imageUrl = newImages.map(file => ({ url: URL.createObjectURL(file) }));
            setImageShow([...imageShow, ...imageUrl]);
        }
    };

    const changeImage = (img, index) => {
        if (img) {
            const tempUrl = [...imageShow];
            const tempImages = [...images];
            tempImages[index] = img;
            tempUrl[index] = { url: URL.createObjectURL(img) };
            setImageShow(tempUrl);
            setImages(tempImages);
        }
    };

    const removeImage = (i) => {
        const filteredImages = images.filter((_, index) => index !== i);
        const filteredImageUrls = imageShow.filter((_, index) => index !== i);
        setImages(filteredImages);
        setImageShow(filteredImageUrls);
    };

    const add = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', state.name);
        formData.append('description', state.description);
        formData.append('price', state.price);
        formData.append('stock', state.stock);
        formData.append('discount', state.discount);
        formData.append('brand', state.brand);
        formData.append('shopName', 'EasyShop');
        formData.append('category', category);

        images.forEach(image => {
            formData.append('images', image);
        });

        dispatch(add_product(formData));
    };

    useEffect(() => {
        setAllCategory(categorys);
    }, [categorys]);

    return (
        <div className='px-2 lg:px-7 pt-5'>
            <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
                <div className='flex justify-between items-center pb-4'>
                    <h1 className='text-[#d0d2d6] text-xl font-semibold'>Add Product</h1>
                    <Link to='/seller/dashboard/products' className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2'>All Products</Link>
                </div>
                <form onSubmit={add}>
                    <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor="name">Product Name</label>
                            <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' onChange={inputHandle} value={state.name} type="text" name='name' id='name' placeholder='Product Name' />
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor="brand">Product Brand</label>
                            <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' onChange={inputHandle} value={state.brand} type="text" name='brand' id='brand' placeholder='Brand Name' />
                        </div>
                    </div>

                    <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                        <div className='flex flex-col w-full gap-1 relative'>
                            <label htmlFor="category">Category</label>
                            <input readOnly onClick={() => setCateShow(!cateShow)} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' value={category} type="text" id='category' placeholder='--select category--' />
                            {cateShow && (
                                <div className='absolute top-[101%] bg-[#475569] w-full'>
                                    <div className='w-full px-4 py-2 fixed'>
                                        <input value={searchValue} onChange={categorySearch} className='px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='search' />
                                    </div>
                                    <div className='pt-14'></div>
                                    <div className='flex flex-col h-[200px] overflow-y-auto'>
                                        {allCategory.map((c, i) => (
                                            <span key={i} className={`px-4 py-2 hover:bg-indigo-500 hover:text-white w-full cursor-pointer ${category === c.name && 'bg-indigo-500'}`} onClick={() => {
                                                setCateShow(false);
                                                setCategory(c.name);
                                                setSearchValue('');
                                                setAllCategory(categorys);
                                            }}>{c.name}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor="stock">Product Stock</label>
                            <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' onChange={inputHandle} value={state.stock} type="text" name='stock' id='stock' placeholder='Stock' />
                        </div>
                    </div>

                    <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor="price">Price</label>
                            <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' onChange={inputHandle} value={state.price} type="number" name='price' id='price' placeholder='Price' />
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label htmlFor="discount">Discount</label>
                            <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' onChange={inputHandle} value={state.discount} type="number" name='discount' id='discount' placeholder='Discount by %' />
                        </div>
                    </div>

                    <div className='flex flex-col w-full gap-1 text-[#d0d2d6]'>
                        <label htmlFor="description">Description</label>
                        <textarea className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#6a5fdf] border border-slate-700 rounded-md text-[#d0d2d6]' onChange={inputHandle} value={state.description} type="text" name='description' id='description' placeholder='Description'></textarea>
                    </div>

                    <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mt-3'>
                        <label htmlFor="images">Images</label>
                        <div className='flex items-center flex-wrap mt-2'>
                            {imageShow.map((img, i) => (
                                <div key={i} className='flex items-center mr-3 mb-3'>
                                    <img className='w-20 h-20 rounded-full' src={img.url} alt={`Product ${i + 1}`} />
                                    <div className='flex flex-col items-center'>
                                        <label htmlFor={`image${i}`}><IoMdImages className='cursor-pointer' /></label>
                                        <IoMdCloseCircle onClick={() => removeImage(i)} className='cursor-pointer text-red-500' />
                                    </div>
                                    <input onChange={(e) => changeImage(e.target.files[0], i)} className='hidden' type="file" id={`image${i}`} />
                                </div>
                            ))}
                            <div>
                                <label htmlFor="image"><IoMdImages className='cursor-pointer text-4xl' /></label>
                                <input onChange={imageHandle} className='hidden' type="file" multiple id='image' />
                            </div>
                        </div>
                    </div>

                    <div className='w-full flex justify-end'>
                        <button className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2' type='submit'>
                            {loader ? <PropagateLoader css={overrideStyle} color='#fff' size={10} /> : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
