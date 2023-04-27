import React, { useEffect, useState } from "react";
import { CategoriaItem } from "./categoriaItem";
import '../../Estilos/categoria.css';
import axios from "axios";


export function CategoriaMenu(){

    const [datos, setDatos] = useState ([]);

    useEffect(() => {
        ListDatos();
    },[]);

    const ListDatos = async() => {
        const results = await axios.get('https://triviaapi-production.up.railway.app/trivia/categoria');
        setDatos(results.data); 
    } 

    return(
        <div className="categoriaMenu">
            {datos.map((dato) => (
                <CategoriaItem key={dato.id_cat} id_c={dato.id_cat} titulo={dato.nombre_cat} categoriaId={dato.id_cat} />
            ))}
        </div>
    );
}