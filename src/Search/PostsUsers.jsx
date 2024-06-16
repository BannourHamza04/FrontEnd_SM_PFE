import React, { useEffect, useState } from 'react';
import PostService from '../Services/PostService';
import Poste from '../Profile/Poste';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

export default function PostsUsers() {
    const author = JSON.parse(localStorage.getItem('user_data'))
    const [postes, setPostes] = useState([]);
    const navigate = useNavigate();
    const { profilId } = useParams();

    // Récupération des Postes
    const getPostes = async () => {
        try {
            const authorId = profilId
            const response = await PostService.getPostesByUser(authorId);
            if (response.status === 200) {
                setPostes(response.data.postList);
            } else {
                console.log(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Affichage des Postes
    const displayPostes = () => {
        if (postes.length === 0) {
            return <p style={{marginLeft: 30 + '%'}}>Aucun Poste trouvé</p>;
        } else {
            return postes.map((post, key) => {
                return <Poste post={post} key={key} />;
            });
        }
    };

    useEffect(() => {
        getPostes();
    }, [postes]);

    return (
        <div>{displayPostes()}</div>
    )
}
