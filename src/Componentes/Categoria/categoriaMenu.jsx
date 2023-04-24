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
        const results = await axios.get('http://localhost:8080/trivia/categoria');
        setDatos(results.data); 
    } 

    return(
        <div className="categoriaMenu">
            {datos.map((dato) => (
                <CategoriaItem key={dato.id_cat} id_c={dato.id_cat} titulo={dato.nombre_cat} categoriaId={dato.id_cat} />
            ))}
            <CategoriaItem key={3} id_c={3} titulo={"nalgas"} categoriaId={"dasd"} />
            <CategoriaItem key={4} id_c={3} titulo={"nalgas"} categoriaId={"dasd"} />
            <CategoriaItem key={5} id_c={3} titulo={"nalgas"} categoriaId={"dasd"} />
            <CategoriaItem key={6} id_c={3} titulo={"nalgas"} categoriaId={"dasd"} />
            <CategoriaItem key={7} id_c={3} titulo={"nalgas"} categoriaId={"dasd"} />
            <CategoriaItem key={8} id_c={3} titulo={"nalgas"} categoriaId={"dasd"} />
            <CategoriaItem key={9} id_c={3} titulo={"nalgas"} categoriaId={"dasd"} />
            <CategoriaItem key={10} id_c={3} titulo={"nalgas"} categoriaId={"dasd"} />
        </div>
    );
}