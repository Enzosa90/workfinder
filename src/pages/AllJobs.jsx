import Footer from "../components/Footer";
import Header from "../components/Header";
import Vacany from "../components/Vacany";
import '../styles/Vacany.css'

import { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import searchJob from "../hooks/searchJob";

export default function AllVacany({ typeUser, fezLogin, handleLogout }) {

    const [listDataVvacany, setListDataVacany] = useState([]);
    const [searchList, setSearchList] = useState([]);
    const [searchOn, setSearchOn] = useState(false);


    useEffect(() => {
        const getAllVacany = async () => {
            const response = await fetch('http://localhost:8800/empresa/vacany');
            const data = await response.json();
            setListDataVacany(data);
        }
        getAllVacany();
    }, [])

    function handleSearch(e) {
        e.preventDefault();
        const lista = searchJob(listDataVvacany, e.target[0].value);
        setSearchList(lista);
    }

    return (
        <>
        <Header typeUser={typeUser} fezLogin={fezLogin} handleLogout={handleLogout} />
            <main>
                <div className="titulo-pagina-vaga">
                    <h1>Descubra Sua Próxima <span>Aventura Profissional!!</span></h1>
                </div>
                <div className="pesquisa-vaga">
                    <h2>Pesquise por uma <span>vaga específica</span> <label htmlFor="pesquisa-vaga"><i
                        className="bi bi-search"></i></label></h2>
                    <form className="container-pesquisa" onSubmit={handleSearch}>
                        <input
                        className="input-vaga" 
                        type="text" 
                        name="pesquisa-vaga" 
                        id="pesquisa-vaga"
                        placeholder="Digite a característica"
                        onChange={(e)=> {
                            if( e.target.value == '')
                            {
                                setSearchOn(false);
                            }
                        }}
                        />

                        <button type="submit" className="botao-pesquisa-vaga" onClick={() => setSearchOn(true)}>Pesquisar</button>
                    </form>
                </div>

                <h4 className="subtitulo-vaga">Todas as Vagas</h4>
                <div className="grid-vagas">
                    { !searchOn ? (
                        listDataVvacany.map((item, index) => (
                            <Vacany key={index} listDataVvacany={item} fezLogin={fezLogin} />
                        ))
                    ): (
                        searchList.map((item, index) => (
                            <Vacany key={index} listDataVvacany={item} fezLogin={fezLogin} />
                        ))
                    )
                    }
                </div>
            </main>

            <Footer/>
        </>
    );
}

AllVacany.prototype = {
    typeUser: PropTypes.string.isRequired,
    fezLogin: PropTypes.bool.isRequired,
    handleLogout: PropTypes.func.isRequired
}