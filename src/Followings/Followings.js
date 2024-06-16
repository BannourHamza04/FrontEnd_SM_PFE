import { useEffect, useState } from 'react';
import './Followings.css'
import ProfilService from '../Services/ProfilService';
import Following from './Following'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Followings() {

    const token = Cookies.get('access_token');
    const navigate = useNavigate();
    const [followings, setFollowings] = useState([]);
    const user = JSON.parse(localStorage.getItem('user_data'))

    // Récupération des Followings
    const getFollowings = async () => {
        try {
            const response = await ProfilService.getFollowingsByAuthor(user.id);
            if (response.status === 200) {
                console.log(response.data.followings)
                setFollowings(response.data.followings);
            } else {
                console.log(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Affichage des résultats avec filtrage
    const displayFollowings = () => {
            if (followings.length === 0) {
                return <p>Aucun résultat trouvé</p>;
            } else {
                return followings.map((user, key) => {
                    return <Following user={user} key={key} />;
                });
            }
    };

    useEffect(() => {
        if(!token){
            navigate('/Login')
        }
        getFollowings();
    }, []);

    return (
        <section className="main-Notif" style={{ margintop: '-60px' }}>
            <div className="wrapper-Notif">
                <div className="left-col">
                    <div className="post-Notif">
                        <div className="info-Notif">
                            <div className="user-Notif">
                                <span className="gg--chevron-left" id="backButton"></span>
                                <h1>Followings</h1>
                            </div>
                        </div>
                        {displayFollowings()}
                    </div>
                </div>
            </div>
        </section>
    )
}
