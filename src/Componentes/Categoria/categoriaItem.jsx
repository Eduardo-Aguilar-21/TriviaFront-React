import React, { useEffect, useState } from "react";
import '../../Estilos/categoria.css';
import { Link } from "react-router-dom";
import { GiSoccerBall } from "react-icons/gi";
import { TbMovie } from "react-icons/tb";

export function CategoriaItem({id_c , titulo, categoriaId }){
    const [icono, setIcono] = useState(null);

    useEffect(()=>{
        switch(id_c){
            case 1:
                setIcono(<GiSoccerBall />);
            break;
            case 2:
                setIcono(<TbMovie />);
            break;
            default:
                setIcono(<TbMovie />);
            break;
        }
    },[id_c]);



    return(
        <div className="categoriaItem" > 
            <Link to={`/detalle/${categoriaId}`} className="link" >
                <h1 className="icono">{icono}</h1>
                <h1>{titulo}</h1>
            </Link>
        </div>
    );
}