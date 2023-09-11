import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import { CSVLink } from "react-csv";

export function Taskproduct() {
    const [fetchvalue, setFetchvalue] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch("https://fakestoreapi.com/products/" + id)
            .then(fetchdatas => fetchdatas.json())
            .then(data => setFetchvalue(data));
    }, [id]);

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
    const srv = [fetchvalue];

    return (
        <>
            <div className="row">
                <div className="col-lg-6">
                    <img src={fetchvalue.image} className="img-fluid" alt={fetchvalue.title} />
                </div>
                <div className="col-lg-6">
                    <h1 className="card-title">{fetchvalue.title}</h1>
                    <p className="card-content mt-5 pri text-danger">{fetchvalue.price}</p>
                    <p className="card-content">{fetchvalue.description}</p>
                    <p className="card-content">{fetchvalue.category}</p>

                   
                        <StarRatings
                            rating={fetchvalue.rating && fetchvalue.rating.rate}
                            starDimension="20px"
                            starSpacing="2px"
                            starRatedColor="gold"
                        />
                    

                    <CSVLink data={srv} headers={headers} filename={'products.csv'} className="pt-5">
                        <button className='rounded-5'>Download CSV</button>
                    </CSVLink>
                </div>
            </div>
        </>
    )
}
