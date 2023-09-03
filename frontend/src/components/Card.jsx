import React from "react";

export default function Card(props) {
    return (
        <div className="card">
            <div className="card-body">
                <div>
                    <div className="card-title">{props.title}</div>

                    <div className="card-text">
                        {props.text}
                    </div>
                </div>
                <img src={props.banner} alt="Imagem da noticia" />
            </div>
        </div>
    )
}