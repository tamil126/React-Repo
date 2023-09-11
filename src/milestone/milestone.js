import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Link } from "react-router-dom";
import StarRatings from 'react-star-ratings';

function DataDownloaders() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch('https://fakestoreapi.com/products/')
            .then((response) => response.json())
            .then((data) => setData(data));
    }, []);

    const headers = [
        { label: 'ID', key: 'id' },
        { label: 'Title', key: 'title' },
        { label: 'Price', key: 'price' },
        { label: 'Description', key: 'description' },
        { label: 'Category', key: 'category' },
        { label: 'Images', key: 'image' },
        { label: 'Rating', key: 'rating.rate' },
        { label: 'People', key: 'rating.count' },
    ];
    const [count, setCount] = useState(0);

    return (
        <>
            <div className=' bg-primary p-3'>
                <CSVLink data={data} headers={headers} filename={'products.csv'} className='csv p-2 mb-2 float-right ' >
                    <button className='rounded-5'>Download CSV</button>
                </CSVLink>
                <h1 className="text-warning color-change ms-2">Product Data</h1>
            </div>

            <div>
                <table className='table table-striped mt-4'>
                    <thead>
                        <tr>
                            <th>Images</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th className='px-5'>Rating</th>
                            <th>Purchased</th>
                            <th className='px-5'>Items</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {data.map((value, index) => (
                            <tr className='mt-3'>
                                <td><img src={value.image} className="img-fluid" alt="No Img" /></td>
                                <td>{value.title}</td>
                                <td>{value.price}</td>
                                <td>{value.description}</td>
                                <td>{value.category}</td>
                                <td>
                                    <StarRatings
                                        rating={value.rating.rate}
                                        starDimension="20px"
                                        starSpacing="2px"
                                        starRatedColor="gold" />
                                </td>
                                <td>{value.rating.count}</td>
                                <td>
                                    <button className="btn btn-primary but" onClick={() => { setCount(count + 1) }}>+</button>
                                    {count}
                                    <button className="btn btn-danger  but" onClick={() => { setCount(count - 1) }}>-</button>
                                </td>
                                <td><Link to={`/Taskproduct/${value.id}`}><button className="btn btn-primary">More</button></Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default DataDownloaders;
