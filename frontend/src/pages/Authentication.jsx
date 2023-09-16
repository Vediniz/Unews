import Input from "../components/Input"
import Cookies from 'js-cookie'
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from "../schemas/signupSchema"
import { signinSchema } from "../schemas/signinSchema"
import { signup, signin } from "../services/userServices"

export default function Authentication() {
    const navigate = useNavigate()

    const {
        register: registerSignup,
        handleSubmit: handleSubmitSignup,
        formState: { errors: errorsSignup },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

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
            Cookies.set('token', response.data, { expires: 1 })
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    async function upHandleSubmit(data) {
        try {
            const response = await signup(data)
            Cookies.set('token', response.data.token, { expires: 1 })
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-auth">
            <div className="signin cardSign">
                <h1>Entrar</h1>
                <form onSubmit={handleSubmitSignin(inHandleSubmit)}>
                    <Input type='email' placeholder='E-mail' name='email' register={registerSignin}/> 
                        {errorsSignin.email && <p className="error">{errorsSignin.email.message}</p>}
                    <Input type='password' placeholder='Senha' name='password' register={registerSignin}/>
                        {errorsSignin.password && <p className="error">{errorsSignin.password.message}</p>}
                    <button type="submit" className="button">Entrar</button>
                </form>
            </div>
            <div className="signup cardSign">
                <h1>Cadastrar</h1>
                <form onSubmit={handleSubmitSignup(upHandleSubmit)}>
                    <Input type='text' placeholder='Nome' name='name' register={registerSignup}/> 
                        {errorsSignup.name && <p className="error">{errorsSignup.name.message}</p>}
                    <Input type='email' placeholder='E-mail' name='email' register={registerSignup}/> 
                        {errorsSignup.email && <p className="error">{errorsSignup.email.message}</p>}
                    <Input type='password' placeholder='Senha' name='password' register={registerSignup}/> 
                        {errorsSignup.password && <p className="error">{errorsSignup.password.message}</p>}
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}