import React, { useContext, useEffect } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "../schemas/searchSchema";
import { userLogged } from "../services/userServices";
import Cookies from "js-cookie";
import { UserContext } from "../context/UserContext";

export default function Header() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(searchSchema)
    })

    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext)

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

    return (
        <div className="content-header">
            <div className="header">
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <div className="brand">
                        <div className="name">U<span>news</span></div>
                    </div>
                </Link>
                <div className="content-menu">
                    <div className="menu">
                        <form onSubmit={handleSubmit(onSearch)}>
                            <div className="search-input">
                                <input {...register("title")} type="text" id="search" placeholder={errors.title ? errors.title.message : 'Pesquisar...'} />
                                <span className="search-icon" onClick={handleSubmit(onSearch)}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
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