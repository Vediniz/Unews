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

                    <h2>Titulo</h2>
                    <Input type='text' placeholder='Titulo' name='title' register={register} />

                    <h2>Imagem</h2>
                    <Input type='text' placeholder='Imagem' name='image' register={register} />

                    <h2>Conteudo</h2>
                    <textarea cols="50" rows="10" {...register("text")} />

                    <div>
                        <span onClick={handleDeletePost} className="button">Deletar</span>
                        <button type="submit" className="button">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}