import React, {useState} from "react"

export default function Filter() {
    const [filter, setFilter] = useState('')

    const updateFilters = () => {
        const selectedFilters = Array.from(document.querySelectorAll('input[type^="checkbox"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.name);

        setFilter(selectedFilters.join(','));
    };

    return (
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
    )
}