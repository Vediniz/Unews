import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { updateUser, userLogged } from "../services/userServices";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from "../schemas/signupSchema"
import Input from "../components/Input"
import Cookies from "js-cookie";


export default function Perfil() {
    const {user, setUser} = useContext(UserContext)

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    async function handleUpdateUser(data) {
        try {
            const id = user._id
            await updateUser(id, data)
            reset()
        } catch (error) {
            console.log(error);
        }
    }

    const token = Cookies.get('token');
    useEffect(() => {
        if (token) {
            findUserLogged();
        }else{
            setUser(undefined)
        }
    }, [token]);

    async function findUserLogged() {
        try {
            const response = await userLogged()
            setUser(response.data);
            setValue("name", response.data.name);
            setValue("email", response.data.email);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="perfil">
            <form onSubmit={handleSubmit(handleUpdateUser)}>
                
                    <div className="perfil perfil-modal">
                        <h1>Login</h1>

                        <label htmlFor="name">
                            <span>Nome</span>
                            <Input register={register} type="text" name="name" />
                            {errors.name && <p className="error">{errors.name.message}</p>}
                        </label>

                        <label htmlFor="email">
                            <span>E-mail</span>
                            <Input register={register} type="text" name="email" />
                            {errors.email && <p className="error">{errors.email.message}</p>}
                        </label>

                        <label htmlFor="password">
                            <span>Senha</span>
                            <Input register={register} type="text" name="password" />
                            {errors.password && <p className="error">{errors.password.message}</p>}
                        </label>
                    </div>
                    <button type='submit' className="button">Salvar</button>
            </form>
        </div>
    )
}