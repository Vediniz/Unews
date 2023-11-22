import React, { useContext, useEffect, useState } from "react";
import { faBars, faEllipsisVertical, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { userLogged } from "../services/userServices";
import Cookies from "js-cookie";
import { UserContext } from "../context/UserContext";

export default function Header() {
    // block filters
    const [isFilterVisible, setIsFilterVisible] = useState(false)

    function toggleFilterVisible() {
        setIsFilterVisible(!isFilterVisible)
    }

    const updateFilters = () => {
        const selectedFilters = Array.from(document.querySelectorAll('input[type^="checkbox"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.name);

        const filtersJoin = selectedFilters.join(',')
        setValue("filter", selectedFilters.length > 0 ? filtersJoin : []);
    };

    const filterNames = [
        'Alunos',
        'Segurança da Informação',
        'TI',
        'Design de Moda',
        'Moda e Textil',
        'Logistica',
        'Gestão de Empresas',
        'Jogos Digitais',
        'Modas',
        'IMPORTANTES',
        'Analise e Desenvolvimento de Sistemas'
    ];

    function onFilter(data) {
        const {filter} = data
        navigate(`/filters/${filter}`)
    }
    // end filters

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        // resolver: zodResolver(searchSchema)
    })

    const navigate = useNavigate()
    const [isVisible, setIsVisible] = useState(false);
    const { user, setUser } = useContext(UserContext)

    const location = useLocation();

    const closeMenuOnNavigation = () => {
        if (window.innerWidth < 768) {
            setIsVisible(false);
            setIsFilterVisible(false);
        }
    };

    useEffect(() => {
        closeMenuOnNavigation();
        if(isFilterVisible) toggleFilterVisible()
    }, [location]);


    function onSearch(data) {
        const { title } = data
        navigate(`/search/${title}`)
        reset()
    }

    function signout() {
        Cookies.remove('token')
        setUser(undefined)
        navigate('/')
    }

    const token = Cookies.get('token');
    useEffect(() => {
        if (token) {
            findUserLogged();
        } else {
            setUser(undefined)
        }
    }, [token]);

    async function findUserLogged() {
        try {
            const response = await userLogged()
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const checkWindowSize = () => {
        if (window.innerWidth < 768) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    useEffect(() => {
        window.addEventListener("resize", checkWindowSize);
        checkWindowSize();

        return () => {
            window.removeEventListener("resize", checkWindowSize);
        };
    }, []);

    return (
        <div className="content-header">
            <div className="header">
                <div className="faBars" onClick={toggleVisibility}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <div className="brand">
                        <div className="name">U<span>news</span></div>
                    </div>
                </Link>
                <div className="content-menu"
                    style={{
                        display: isVisible ? 'flex' : 'none',
                        height: !user && 'auto'
                    }}>
                    <div className="menu">
                        <form onSubmit={handleSubmit(onSearch)}>
                            <div className="search-input">
                                {/* <input {...register("title")} type="text" id="search" placeholder={errors.title ? errors.title.message : 'Pesquisar...'} /> */}
                                <input {...register("title")} type="text" id="search" placeholder='Pesquisar...' />
                                <span className="search-icon" onClick={handleSubmit(onSearch)}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                            </div>
                        </form>
                        <form onSubmit={handleSubmit(onFilter)}>
                            <span className="filterBar" onClick={toggleFilterVisible}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </span>
                            
                            <input type='hidden' name='filter' {...register("filter")} />
                            <div className="filtersDiv" style={{ display: isFilterVisible ? 'flex' : 'none'}}>
                                <button className="button" style={{width: '100%'}} onClick={handleSubmit(onFilter)}>Aplicar</button>
                                {filterNames.map((option) => (
                                    <div key={option}>
                                        <input
                                            id={`${option}1`}
                                            name={option}
                                            type="checkbox"
                                            onChange={updateFilters}
                                        />
                                        <label htmlFor={`${option}1`}>{option}</label>
                                    </div>
                                ))}
                            </div>
                        </form>
                        {user && (
                            <>
                                <Link to='/perfil' className="menu-item" style={{ textDecoration: 'none' }}>Perfil</Link>
                                <Link to='/news' className="menu-item" style={{ textDecoration: 'none' }}>Adicionar</Link>
                            </>
                        )}
                    </div>
                    {user ? (
                        <div className="logout">
                            <h1>{user.name}</h1>
                            <button className="button" onClick={signout}>Sair</button>
                        </div>
                    ) : (
                        <Link to='/auth'>
                            <button className="button">Entrar</button>
                        </Link>
                    )}
                </div>
            </div>
            <Outlet />
        </div>
    )
}