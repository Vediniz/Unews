import React from "react";
import { Link } from "react-router-dom";

export default function Perfil() {
    return (
        <div id="perfil">
            <Link to="/">
                <span className="button-back">&larr;</span>
            </Link>
            <form>
                <section>
                    <div className="perfil perfil-modal">
                        <h1>Login</h1>

                        <label htmlFor="name">
                            <span>Nome</span>
                            <input type="text" name="name" id="name" />
                        </label>

                        <label htmlFor="email-login">
                            <span>E-mail</span>
                            <input type="text" name="email-login" id="email-login" />
                        </label>

                        <label htmlFor="password">
                            <span>Senha</span>
                            <input type="text" name="password" id="password" />
                        </label>
                    </div>
                    <div className="contato perfil-modal">
                        <h1>Contato</h1>

                        <label htmlFor="phone-1">
                            <span>Telefone 1</span>
                            <input type="text" name="phone-1" id="phone-1" />
                        </label>

                        <label htmlFor="phone-2">
                            <span>Telefone 2</span>
                            <input type="text" name="phone-2" id="phone-2" />
                        </label>

                        <label htmlFor="email-contato">
                            <span>E-mail</span>
                            <input type="text" name="email-contato" id="email-contato" />
                        </label>
                    </div>
                </section>
                <h1>Informações</h1>
                <div className="profile-info">
                    <div>
                        <span className="profile-item">Nome</span>
                        <span className="profile-item">E-mail</span>
                    </div>
                    <div>
                        <span className="profile-item">Telefone 1</span>
                        <span className="profile-item">Telefone 2</span>
                        <span className="profile-item">E-mail Contato</span>
                    </div>
                </div>

                <div className="buttons">
                    <button type="submit" className="button">Salvar</button>
                    <button type="submit" className="button">Cancelar</button>
                </div>
            </form>
        </div>
    )
}