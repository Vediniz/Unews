import Input from "../components/Input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from "../schemas/signupSchema"
import { signinSchema } from "../schemas/signinSchema"

export default function Authentication() {
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
    

    function inHandleSubmit(data) {
        console.log(data)
    }

    function upHandleSubmit(data) {
        console.log(data)
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