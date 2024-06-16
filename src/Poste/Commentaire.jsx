import React from 'react'
import { Link } from 'react-router-dom'

export default function Commentaire({ comment }) {

    return (
        <div className="comment">
            <Link to={`/ProfilFriend/${comment.author._id}`}>
                <img src={`http://localhost:4000/${comment.author.pdp}`} alt="" />
            </Link>
            <span><h3>{comment.author.nameInProfile}</h3>
                <div className="desc">{comment.content}</div>
            </span>
        </div>
    )
}
