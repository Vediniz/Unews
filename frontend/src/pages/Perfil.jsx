import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { updateUser, userLogged } from "../services/userServices";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from "../schemas/signupSchema"
import Input from "../components/Input"
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


export default function Perfil() {
    const { user, setUser } = useContext(UserContext)
    const [showPassword, setShowPassword] = useState(false);

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
        resolver: zodResolver(signupSchema),
        defaultValues: user,
    });

    async function handleUpdateUser(data) {
        // console.log(data);
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
        } else {
            setUser(undefined)
        }
    }, [token]);

    async function findUserLogged() {
        try {
            const response = await userLogged()
            setUser(response.data);
            setValue("name", response.data.name);
            setValue("email", response.data.email);
            setValue("recoveryQuestion.question", response.data.recoveryQuestion.question);
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
                        <div className="input-password">
                            <Input register={register} type={showPassword ? 'text' : 'password'} name="password" />
                            <span className="eye-icon" onClick={togglePasswordVisibility}>
                                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                            </span>
                        </div>
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    </label>

                    <label htmlFor="confirmPassword">
                        <span>Confirmar Senha</span>
                        <Input register={register} type={showPassword ? 'text' : 'password'} name="confirmPassword" />
                        {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
                    </label>

                    <label htmlFor="recoveryQuestion.question">
                        <span>Pergunta de Recuperação</span>
                        <Input register={register} type="text" name="recoveryQuestion.question" />
                        {errors['recoveryQuestion.question'] && <p className="error">{errors['recoveryQuestion.question'].message}</p>}
                    </label>

                    <label htmlFor="recoveryQuestion.answer">
                        <span>Resposta de Recuperação</span>
                        <Input register={register} type="text" name="recoveryQuestion.answer" />
                        {errors['recoveryQuestion.answer'] && <p className="error">{errors['recoveryQuestion.answer'].message}</p>}
                    </label>
                </div>
                <button type='submit' className="button">Salvar</button>
            </form>
        </div>
    )
}