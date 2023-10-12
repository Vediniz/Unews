import Input from "../components/Input"
import Cookies from 'js-cookie'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { signinSchema } from "../schemas/signinSchema"
import { signin } from "../services/userServices"

export default function Authentication() {
    const navigate = useNavigate()

    const {
        register: registerSignin,
        handleSubmit: handleSubmitSignin,
        formState: { errors: errorsSignin },
    } = useForm({
        resolver: zodResolver(signinSchema),
    });
    

    async function inHandleSubmit(data) {
        try {
            const response = await signin(data)
            Cookies.set('token', response.data.token, { expires: 1 })
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-auth">
            <div className="cardSign">
                <h1>Login</h1>
                <form onSubmit={handleSubmitSignin(inHandleSubmit)}>
                    <Input type='email' placeholder='E-mail' name='email' register={registerSignin}/> 
                        {errorsSignin.email && <p className="error">{errorsSignin.email.message}</p>}
                    <Input type='password' placeholder='Senha' name='password' register={registerSignin}/>
                        {errorsSignin.password && <p className="error">{errorsSignin.password.message}</p>}
                    <button type="submit" className="button">Entrar</button>
                    <Link to={'/auth/reset-password'} className="forget-password">Esqueceu a senha?</Link>
                </form>
            </div>
        </div>
    )
}