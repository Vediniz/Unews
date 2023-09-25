import { newsSchema } from '../schemas/newsSchema';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createPost } from "../services/postServices"
import Input from "../components/Input"

export default function News() {
    const {
        register: registerNews,
        handleSubmit: handleSubmitNews,
        formState: { errors: errorsNews },
    } = useForm({
        resolver: zodResolver(newsSchema),
    });

    async function handleCreatePost(data) {
        try {
            const response = await createPost(data)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="create-news">
            <form onSubmit={handleSubmitNews(handleCreatePost)}>
                {console.log('carrego a pagina')}

                <span>Titulo</span>
                <Input type='text' placeholder='Titulo' name='title' register={registerNews} />
                    {errorsNews.title && <p className="error">{errorsNews.title.message}</p>}

                <span>Imagem</span>
                <Input type='text' placeholder='Imagem' name='image' register={registerNews} />

                <span>Conteudo</span>
                {/* <Input type='text' placeholder='Conteudo' name='text' register={registerNews} />   */}
                <textarea cols="30" rows="10" {...registerNews("text")}></textarea>             
                {errorsNews.text && <p className="error">{errorsNews.text.message}</p>}

                <button type="submit" className="button">Salvar</button>
            </form>
        </div>
    )
}