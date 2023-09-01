import React from "react";

export default function Header() {
    return (
        <div className="content-header">
            <div className="header">
                <div className="brand">
                    <div className="logo">@</div>
                    <div className="name">Fatec<span>News</span></div>
                </div>
                <div className="content-menu">
                    <div className="menu">
                        <input type="text" name="search" id="search" placeholder="Noticias..." />
                        <div className="menu-item">Home</div>
                        <div className="menu-item">Sobre</div>
                        <div className="menu-item">Contato</div>
                    </div>
                    <div className="perfil"></div>
                </div>
            </div>
        </div>
    )
}