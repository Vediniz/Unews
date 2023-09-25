import { useNavigate, useParams } from "react-router-dom"
import { deletePost, getPostById, updatePost } from "../services/postServices"
import { useEffect, useState } from "react"
import { newsSchema } from '../schemas/newsSchema';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "../components/Input"

export default function EditNews() {
    const { id } = useParams()
    const [news, setNews] = useState({})
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors},
    } = useForm({
        resolver: zodResolver(newsSchema),
    });

    async function findById() {
        try {
            const response = await getPostById(id)
            setNews(response.data.news)
        } catch (error) {
            console.log(error);
            setNews(undefined)
        }
    }

    useEffect(() => {
        findById()
    }, [id])

    async function handleChangePost(data) {
        try {
            await updatePost(id, data)
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
                    {console.log('carrego a pagina')}

                    <span>Titulo</span>
                    <Input type='text' placeholder='Titulo' name='title' register={register} />
                    {errors.title && <p className="error">{errors.title.message}</p>}

                    <span>Imagem</span>
                    <Input type='text' placeholder='Imagem' name='image' register={register} />
                    {errors.image && <p className="error">{errors.image.message}</p>}

                    <span>Conteudo</span>
                    <textarea cols="50" rows="10" {...register("text")}></textarea>
                    {errors.text && <p className="error">{errors.text.message}</p>}

                    <button type="submit" className="button">Salvar</button>
                    <span onClick={handleDeletePost} className="button">Deletar</span>
                </form>
            </div>
        </div>
    )
}