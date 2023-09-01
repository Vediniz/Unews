import React, { useState } from "react";

export default function Modal() {
    // user define se o modal vai ser de login ou cadastro, onde true = login e false = cadastro.
    const [user, setUser] = useState(true);

    function handleUser() {
        setUser(!user);
    }

    function login(e) {
        e.preventDefault();
        console.log('login');
    }

    function signup(e) {
        e.preventDefault();
        console.log('signup');
    }

    return (
        <div className="modal">
            <form action="" className="form">
                <h1 className="title">{user ? 'Login' : 'Cadastro'}</h1>

                <div className="inputs">
                    <div className="input-content">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" id="email" placeholder="Digite seu e-mail" />
                    </div>
                    <div className="input-content">
                        <label htmlFor="password">Senha</label>
                        <input type="password" name="password" id="password" placeholder="Digite sua senha" />
                    </div>
                </div>

                <div className="options">
                    {user ? (
                        <>
                            <button type="submit" onClick={login}>Entrar</button>
                            <a href="#">Esqueceu sua senha?</a>
                            <p>Não tem uma conta? <a href="#" onClick={handleUser}>Cadastre-se</a></p>
                        </>
                    ) : (
                        <>
                            <button type="submit" onClick={signup}>Cadastrar</button>
                            <p>Já tem uma conta? <a href="#" onClick={handleUser}>Entre</a></p>
                        </>
                    )}
                </div>
            </form>
        </div>
    )
}