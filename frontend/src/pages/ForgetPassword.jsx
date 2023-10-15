import { useForm } from 'react-hook-form';
import Input from '../components/Input';
import { recoverQuestion, validateAnswer } from '../services/userServices';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [userFound, setUserFound] = useState(true);
    const [correctAnswer, setCorrectAnswer] = useState(true);
    const [hasQuestion, setHasQuestion] = useState(false);
    const [question, setQuestion] = useState('');
    const {
        register,
        handleSubmit,
        reset,
        setValue,
    } = useForm({});

    async function searchQuestion(data) {
        try {
            const response = await recoverQuestion(data);
            setQuestion(response.data.question);
            setHasQuestion(true);
            setUserFound(true);
        } catch (error) {
            setUserFound(false);
            reset();
        }
    }

    async function checkAnswer(data) {
        try {
            const response = await validateAnswer(data);
            Cookies.set('token', response.data.token, { expires: 1 })
            navigate('/perfil')
        } catch (error) {
            setCorrectAnswer(false);
            setValue('answer', '');
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
                            <p><span>Pergunta:</span> {question} </p>
                            <Input type="text" placeholder="Resposta" name="answer" register={register}/>
                        </>
                        )
                    : null}
                    {!userFound ? <p className="error">Usuário não encontrado</p> : null}
                    {!correctAnswer ? <p className="error">Resposta incorreta</p> : null}
                    <button type="submit" className="button">Enviar</button>
                </form>
            </div>
        </div>
    )   
}