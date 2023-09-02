import React from "react";

export default function Card() {
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-header">
                    <div className="card-title">Titulo da noticia</div>
                </div>
                <div className="card-text">
                    Lorem ipsum dolor sit amet consectetur a dipisicing elit.
                    Lorem ipsum dolor sit amet consectetur a dipisicing elit.
                    Lorem ipsum dolor sit amet consectetur a dipisicing elit.
                    Lorem ipsum dolor sit amet consectetur a dipisicing elit.
                </div>
            </div>
            <div className="card-image">
                {/* <img src="#" alt="Imagem da noticia" /> */}
            </div>
        </div>
    )
}