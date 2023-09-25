import { newsSchema } from '../schemas/newsSchema';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createPost } from "../services/postServices"
import Input from "../components/Input"

export default function News() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors},
    } = useForm({
        resolver: zodResolver(newsSchema),
    });

    async function handleCreatePost(data) {
        try {
            await createPost(data)
            reset()
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="create-news">
            <form onSubmit={handleSubmit(handleCreatePost)}>
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
            </form>
        </div>
    )
}