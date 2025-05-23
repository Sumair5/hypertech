import React from 'react';

const Reviews = () => {
    const reviews = [
        {
            id: 1,
            name: 'John Doe',
            review: 'HyperTech is amazing! Their service exceeded my expectations.',
            rating: 5,
        },
        {
            id: 2,
            name: 'Jane Smith',
            review: 'I had a great experience with HyperTech. Highly recommend!',
            rating: 4,
        },
        {
            id: 3,
            name: 'Alice Johnson',
            review: 'Fantastic support and excellent products. Will use again!',
            rating: 5,
        },
    ];

    return (
        <div>
            <h1>Customer Reviews</h1>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id} style={{ marginBottom: '20px' }}>
                        <h3>{review.name}</h3>
                        <p>{review.review}</p>
                        <p>Rating: {'⭐'.repeat(review.rating)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reviews;