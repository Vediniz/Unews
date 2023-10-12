import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import { recoverQuestion, validateAnswer } from '../services/userServices';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [hasQuestion, setHasQuestion] = useState(false);
    const [question, setQuestion] = useState('');
    const {
        register,
        handleSubmit,
    } = useForm({});

    async function searchQuestion(data) {
        try {
            const response = await recoverQuestion(data);
            setQuestion(response.data.question);
            setHasQuestion(true);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function checkAnswer(data) {
        try {
            const response = await validateAnswer(data);
            Cookies.set('token', response.data.token, { expires: 1 })
            navigate(`/perfil`)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container-auth">
            <div className="cardSign">
                <h1>Esqueceu a senha?</h1>
                <form onSubmit={handleSubmit(!hasQuestion ? searchQuestion : checkAnswer)}>
                    <Input type="text" placeholder="E-mail" name="email" register={register}/>
                    {hasQuestion ? (
                        <>
                            <p><span>Pergunta:</span> {question}</p>
                            <Input type="text" placeholder="Resposta" name="answer" register={register}/>
                        </>
                        )
                    : null}
                    <button type="submit" className="button">Enviar</button>
                </form>
            </div>
        </div>
    )   
}