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

    const updateFilters = () => {
        const selectedFilters = Array.from(document.querySelectorAll('input[type^="checkbox"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.name);

        setValue("filters", selectedFilters.length > 0 ? selectedFilters : []);
    };

    async function findById() {
        try {
            const response = await getPostById(id)
            setNews(response.data.news)

            setValue("title", response.data.news.title);
            setValue("image", response.data.news.image);
            setValue("text", response.data.news.text.join('\n'));

            if (response.data.news.filters) {
                const filters = response.data.news.filters;
                filters.forEach(filter => {
                    const checkbox = document.getElementById(filter);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
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
                    <Input type='hidden' placeholder='' name='filters' register={register} />
                    <div className="container-input">
                        <h2>Titulo</h2>
                        <Input type='text' placeholder='Titulo' name='title' register={register} />

                        <h2>Imagem</h2>
                        <Input type='text' placeholder='Imagem' name='image' register={register} />

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