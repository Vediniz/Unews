import React from "react";

export default function Perfil() {
    return (
        <div id="perfil">
            <form>
                <section>
                    <div className="perfil">
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
                    <div className="contato">
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

                <div className="buttons">
                    <button type="submit" className="button">Salvar</button>
                    <button type="submit" className="button">Cancelar</button>
                </div>
            </form>
        </div>
    )
}