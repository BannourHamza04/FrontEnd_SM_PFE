import React, { useEffect, useState } from 'react';
import PostService from '../Services/PostService';
import Poste from '../Profile/Poste';
import { useNavigate } from 'react-router-dom';

export default function PostesAuthor() {
    const author = JSON.parse(localStorage.getItem('user_data'))
    const [postes, setPostes] = useState([]);
    const navigate = useNavigate();

    // Récupération des Postes
    const getPostes = async () => {
        try {
            const authorId = author.id
            const response = await PostService.getPostesByAuthor(authorId);
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
            return <p style={{marginLeft: 25 + '%'}}>Aucun Poste trouvé</p>;
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
