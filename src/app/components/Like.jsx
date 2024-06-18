import React from 'react';

const Like = ({ likes, onLike }) => {
    return (
        <div className="like">
            <button onClick={onLike}>Like</button>
            <span>{likes} likes</span>
        </div>
    );
};

export default Like;
