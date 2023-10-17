import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { updateUser, userLogged } from "../services/userServices";
import { set, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from "../schemas/signupSchema"
import Input from "../components/Input"
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


export default function Perfil() {
    const { user, setUser } = useContext(UserContext)
    const [showPassword, setShowPassword] = useState(false);
    const [msg, setMsg] = useState(null);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        // resolver: zodResolver(signupSchema),
        defaultValues: user,
    });

    async function handleUpdateUser(data) {
        try {
            const id = user._id
            await updateUser(id, data)
            setMsg("Usuário atualizado com sucesso!")
            reset()
        } catch (error) {
            setMsg(error.response.data.message)
            console.log(error);
        }
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
            console.log(response.data);
            setUser(response.data);
            setValue("name", response.data.name);
            setValue("email", response.data.email);
            setValue("new_question", response.data.recoveryQuestion.question);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id="perfil">
            <form onSubmit={handleSubmit(handleUpdateUser)}>
                <div className="perfil perfil-modal">
                    <h1>Login</h1>

                    {msg && <p className="error">{msg}</p>}

                    <label htmlFor="name">
                        <span>Nome</span>
                        <Input register={register} type="text" name="name" />
                    </label>

                    <label htmlFor="email">
                        <span>E-mail</span>
                        <Input register={register} type="text" name="email" />
                    </label>

                    <label htmlFor="password">
                        <span>Senha</span>
                        <div className="input-password">
                            <Input register={register} type={showPassword ? 'text' : 'password'} name="password" />
                            <span className="eye-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </span>
                        </div>
                    </label>

                    {/* <label htmlFor="confirmPassword">
                        <span>Confirmar Senha</span>
                        // <Input register={register} type={showPassword ? 'password' : 'text'} name="confirmPassword" />
                    </label> */}

                    <label htmlFor="new_question">
                        <span>Pergunta de Recuperação</span>
                        <Input register={register} type="text" name="new_question" />
                    </label>

                    <label htmlFor="new_answer">
                        <span>Resposta de Recuperação</span>
                        <Input register={register} type="text" name="new_answer" />
                    </label>
                </div>
                <button type='submit' className="button">Salvar</button>
            </form>
        </div>
    )
}