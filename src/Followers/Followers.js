import { useEffect, useState } from 'react';
import './Followers.css'
import ProfilService from '../Services/ProfilService';
import Follower from './Follower'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Followers() {

    const navigate = useNavigate();
    const token = Cookies.get('access_token');
    const [followers, setFollowers] = useState([]);
    const user = JSON.parse(localStorage.getItem('user_data'))

    // Récupération des Followings
    const getFollowers = async () => {
        try {
            const response = await ProfilService.getFollowersByAuthor(user.id);
            if (response.status === 200) {
                setFollowers(response.data.followers);
            } else {
                console.log(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Affichage des résultats avec filtrage
    const displayFollowers = () => {
            if (followers.length === 0) {
                return <p>Aucun résultat trouvé</p>;
            } else {
                return followers.map((user, key) => {
                    return <Follower user={user} key={key} />;
                });
            }
    };

    useEffect(() => {
        if(!token){
            navigate('/Login')
        }
        getFollowers();
    }, []);

    return (
        <section className="main-Notif" style={{ margintop: '-60px' }}>
            <div className="wrapper-Notif">
                <div className="left-col">
                    <div className="post-Notif">
                        <div className="info-Notif">
                            <div className="user-Notif">
                                <span className="gg--chevron-left" id="backButton"></span>
                                <h1>Followers</h1>
                            </div>
                        </div>
                        {displayFollowers()}
                    </div>
                </div>
            </div>
        </section>
    )
}
