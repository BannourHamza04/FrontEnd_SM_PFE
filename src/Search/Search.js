import { useEffect, useState } from 'react';
import './Search.css';
import ResultsSerach from './ResultsSerach';
import ProfilService from '../Services/ProfilService';

export default function Search() {

    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const user = JSON.parse(localStorage.getItem('user_data'))
    // Récupération de tous les utilisateurs
    const getAllUsers = async () => {
        try {
            const response = await ProfilService.getProfilesExecProfAuthor(user.id);
            if (response.status === 200) {
                setUsers(response.data.profileList);
            } else {
                console.log(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Affichage des résultats avec filtrage
    const displayResults = () => {
        if (searchInput && searchInput.trim() !== "") {
            const resultTemp = users.filter(user => {
                return user.nameInProfile.toLowerCase().includes(searchInput.toLowerCase());
            });

            if (resultTemp.length === 0) {
                return <p>Aucun résultat trouvé</p>;
            } else {
                return resultTemp.map((user, key) => {
                    return <ResultsSerach user={user} key={key} />;
                });
            }
        } else {
            return null;
        }
    };

    // Mise à jour de la valeur de recherche à chaque changement dans l'input
    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <>
            <div className="input-box">
                <i className="uil uil-search"></i>
                <input type="text" placeholder="Search here..." id="search" onChange={handleSearch} />
            </div>
            <section className="main-Notif" style={{ marginTop: '-60px' }}>
                <div className="wrapper-Notif">
                    <div className="left-col">
                        <div className="post-Notif-Search">
                            {displayResults()}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
