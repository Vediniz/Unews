import { useNavigate, useParams } from "react-router-dom"
import { deletePost, getPostById, updatePost } from "../services/postServices"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Input from "../components/Input"

export default function EditNews() {
    const { id } = useParams()
    const [news, setNews] = useState({})
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setValue
    } = useForm({ defaultValues: news });

    async function findById() {
        try {
            const response = await getPostById(id)
            setNews(response.data.news)

            setValue("title", response.data.news.title);
            setValue("image", response.data.news.image);
            setValue("text", response.data.news.text.join('\n'));
        } catch (error) {
            console.log(error);
            setNews(undefined)
        }
    }

    useEffect(() => {
        findById()
    }, [id, setValue])

    async function handleChangePost(data) {
        try {
            await updatePost(id, data)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    async function handleDeletePost() {
        try {
            await deletePost(id)
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="create-news">
                <form onSubmit={handleSubmit(handleChangePost)}>
                    <div className="container-input">
                        <h2>Titulo</h2>
                        <Input type='text' placeholder='Titulo' name='title' register={register} />

                        <h2>Imagem</h2>
                        <Input type='text' placeholder='Imagem' name='image' register={register} />

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
                        <textarea cols="70" rows="15" {...register("text")} />
                        <div>
                            <span onClick={handleDeletePost} className="button">Deletar</span>
                            <button type="submit" className="button">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}