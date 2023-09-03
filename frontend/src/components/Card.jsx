import React from "react";
import art from '../styles/art.png'

export default function Card() {
    return (
        <div className="card">
            <div className="card-body">
                <div>
                    <div className="card-title">Titulo da noticia</div>

                    <div className="card-text">
                        Lorem ipsum dolor sit amet consectetur a dipisicing elit.
                        Lorem ipsum dolor sit amet consectetur a dipisicing elit.
                        Lorem ipsum dolor sit amet consectetur a dipisicing elit.
                        Lorem ipsum dolor sit amet consectetur a dipisicing elit.
                    </div>
                </div>
                <img src={art} alt="Imagem da noticia" />
            </div>
        </div>
    )
}