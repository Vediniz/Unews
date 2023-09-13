import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const searchSchema = z.object({
    title: z
    .string()
    .nonempty({ message: "Campo obrigatório" })
    .refine((value) => !/^\s*$/.test(value),{ 
        message: "Campo obrigatório",
    })
})

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

    function onSearch(data) {
        const { title } = data
        navigate(`/search/${title}`)
        reset()
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
                            <input {...register("title")} type="text" id="search" placeholder={errors.title ? errors.title.message : 'Pesquisar...'} />
                        </form>
                        <Link to='/' className="menu-item" style={{ textDecoration: 'none' }}>Home</Link>
                        <div className="menu-item">Sobre</div>
                        <div className="menu-item">Contato</div>
                    </div>
                    <div className="perfil"></div>
                </div>
            </div>
            <Outlet />
        </div>
    )
}