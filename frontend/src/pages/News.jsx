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
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(newsSchema),
    });

    const updateFilters = () => {
        const selectedFilters = Array.from(document.querySelectorAll('input[type^="checkbox"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.name);

        setValue("filters", selectedFilters.length > 0 ? selectedFilters : []);
    };

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
                <Input type='hidden' placeholder='' name='filters' register={register} />
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
                            <input id='Alunos' type='checkbox' name='Alunos' onChange={updateFilters} />
                            <label htmlFor="Alunos">Alunos</label>
                        </div>
                        <div>
                            <input id="Segurança da Informação" type='checkbox' name='Segurança da Informação' onChange={updateFilters} />
                            <label htmlFor="Segurança da Informação">Segurança da Informação</label>
                        </div>
                        <div>
                            <input id="TI" type='checkbox' name='TI' onChange={updateFilters} />
                            <label htmlFor="TI">TI</label>
                        </div>
                        <div>
                            <input id="Design de Moda" type='checkbox' name='Design de Moda' onChange={updateFilters} />
                            <label htmlFor="Design de Moda">Design de Moda</label>
                        </div>
                        <div>
                            <input id="Moda e Textil" type='checkbox' name='Moda e Textil' onChange={updateFilters} />
                            <label htmlFor="Moda e Textil">Moda e Textil</label>
                        </div>
                        <div>
                            <input id="Logistica" type='checkbox' name='Logistica' onChange={updateFilters} />
                            <label htmlFor="Logistica">Logistica</label>
                        </div>
                        <div>
                            <input id="Gestão de Empresas" type='checkbox' name='Gestão de Empresas' onChange={updateFilters} />
                            <label htmlFor="Gestão de Empresas">Gestão de Empresas</label>
                        </div>
                        <div>
                            <input id="Jogos Digitais" type='checkbox' name='Jogos Digitais' onChange={updateFilters} />
                            <label htmlFor="Jogos Digitais">Jogos Digitais</label>
                        </div>
                        <div>
                            <input id="Modas" type='checkbox' name='Modas' onChange={updateFilters} />
                            <label htmlFor="Modas">Modas</label>
                        </div>
                        <div>
                            <input id="IMPORTANTES" type='checkbox' name='IMPORTANTES' onChange={updateFilters} />
                            <label htmlFor="IMPORTANTES">IMPORTANTES</label>
                        </div>
                        <div>
                            <input id="Analise e Desenvolvimento de Sistemas" type='checkbox' name='Analise e Desenvolvimento de Sistemas' onChange={updateFilters} />
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