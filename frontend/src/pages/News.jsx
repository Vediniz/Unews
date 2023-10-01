import { newsSchema } from '../schemas/newsSchema';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createPost } from "../services/postServices"
import Input from "../components/Input"
import { useNavigate } from 'react-router-dom';

export default function News() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(newsSchema),
    });

    async function handleCreatePost(data) {
        try {
            await createPost(data)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="create-news">
            <form onSubmit={handleSubmit(handleCreatePost)}>

                {/* <h2>Titulo</h2>
                <Input type='text' placeholder='Titulo' name='title' register={register} />
                    {errors.title && <p className="error">{errors.title.message}</p>}

                <h2>Imagem</h2>
                <Input type='text' placeholder='Imagem' name='image' register={register} />
                    {errors.image && <p className="error">{errors.image.message}</p>}

                <h2>Conteudo</h2>
                <textarea cols="50" rows="10" {...register("text")}></textarea>             
                    {errors.text && <p className="error">{errors.text.message}</p>}

                <button type="submit" className="button">Salvar</button> */}

                <div className="container-input">
                    <h2>Titulo</h2>
                    <Input type='text' placeholder='Titulo' name='title' register={register} />
                    {errors.title && <p className="error">{errors.title.message}</p>}

                    <h2>Imagem</h2>
                    <Input type='text' placeholder='Imagem' name='image' register={register} />
                    {errors.image && <p className="error">{errors.image.message}</p>}

                    <h2>Filtros</h2>

                    <div className="checkbox-filters">
                        <div>
                            <Input id='Alunos' type='checkbox' name='Alunos' register={register} />
                            <label htmlFor="Alunos">Alunos</label>
                        </div>
                        <div>
                            <Input id="Segurança da Informação" type='checkbox' name='Segurança da Informação' register={register} />
                            <label htmlFor="Segurança da Informação">Segurança da Informação</label>
                        </div>
                        <div>
                            <Input id="TI" type='checkbox' name='TI' register={register} />
                            <label htmlFor="TI">TI</label>
                        </div>
                        <div>
                            <Input id="Design de Moda" type='checkbox' name='Design de Moda' register={register} />
                            <label htmlFor="Design de Moda">Design de Moda</label>
                        </div>
                        <div>
                            <Input id="Moda e Textil" type='checkbox' name='Moda e Textil' register={register} />
                            <label htmlFor="Moda e Textil">Moda e Textil</label>
                        </div>
                        <div>
                            <Input id="Logistica" type='checkbox' name='Logistica' register={register} />
                            <label htmlFor="Logistica">Logistica</label>
                        </div>
                        <div>
                            <Input id="Gestão de Empresas" type='checkbox' name='Gestão de Empresas' register={register} />
                            <label htmlFor="Gestão de Empresas">Gestão de Empresas</label>
                        </div>
                        <div>
                            <Input id="Jogos Digitais" type='checkbox' name='Jogos Digitais' register={register} />
                            <label htmlFor="Jogos Digitais">Jogos Digitais</label>
                        </div>
                        <div>
                            <Input id="Modas" type='checkbox' name='Modas' register={register} />
                            <label htmlFor="Modas">Modas</label>
                        </div>
                        <div>
                            <Input id="IMPORTANTES" type='checkbox' name='IMPORTANTES' register={register} />
                            <label htmlFor="IMPORTANTES">IMPORTANTES</label>
                        </div>
                        <div>
                            <Input id="Analise e Desenvolvimento de Sistemas" type='checkbox' name='Analise e Desenvolvimento de Sistemas' register={register} />
                            <label htmlFor="Analise e Desenvolvimento de Sistemas">Analise e Desenvolvimento de Sistemas</label>
                        </div>
                    </div>
                </div>

                <div className="container-textarea">
                    <h2>Conteudo</h2>
                    {errors.text && <p className="error">{errors.text.message}</p>}
                    <textarea cols="70" rows="15" {...register("text")} />

                    <button type="submit" className="button">Salvar</button>
                </div>
            </form>
        </div>
    )
}