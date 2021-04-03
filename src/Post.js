import React from 'react'
import "./Post.css";
import Avatar from "@material-ui/core/Avatar"

function Post({ username, imageURL, caption }) {
    return (
        <div className="post">
            {/* Header -> avatar + username */}
            <div className="post__header">
                <Avatar alt={username} className="post__avatar" />
                <h3>{username}</h3>
            </div>

            {/* Picture */}
            <img className="post__img" src={imageURL}></img>

            {/* Username + caption */}
            <h4 className="post__text"><strong>{username}:</strong> {caption}</h4>
        </div>
    )
}

export default Post
