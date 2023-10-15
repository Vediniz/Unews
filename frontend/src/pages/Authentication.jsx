import Input from "../components/Input"
import Cookies from 'js-cookie'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { signinSchema } from "../schemas/signinSchema"
import { signin } from "../services/userServices"
import { useState } from "react"

export default function Authentication() {
    const navigate = useNavigate()
    const [authorized, setAuthorized] = useState(true)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(signinSchema),
    });
    

    async function inHandleSubmit(data) {
        try {
            const response = await signin(data)
            Cookies.set('token', response.data.token, { expires: 1 })
            navigate('/')
        } catch (error) {
            setAuthorized(false)
            reset()
        }
    }

    return (
        <div className="container-auth">
            <div className="cardSign">
                <h1>Login</h1>
                <form onSubmit={handleSubmit(inHandleSubmit)}>
                    <Input type='email' placeholder='E-mail' name='email' register={register}/> 
                        {errors.email && <p className="error">{errors.email.message}</p>}
                    <Input type='password' placeholder='Senha' name='password' register={register}/>
                        {errors.password && <p className="error">{errors.password.message}</p>}
                    {!authorized ? <p className="error">E-mail ou senha inválidos</p> : null}
                    <button type="submit" className="button">Entrar</button>
                    <Link to={'/auth/reset-password'} className="forget-password">Esqueceu a senha?</Link>
                </form>
            </div>
        </div>
    )
}