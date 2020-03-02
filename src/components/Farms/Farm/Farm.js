import React from 'react';

const farm = ({ farmProps }) => {

    const halls = farmProps.halls.map(hall => (
        <li key={hall.id}>
            <a href="">
                {hall.name}
            </a>
        </li>
    ))

    return (
        <div>
            <h2>{farmProps.name}</h2>
            <ul>
                {halls}
            </ul>
        </div>
    )
}

export default farm;