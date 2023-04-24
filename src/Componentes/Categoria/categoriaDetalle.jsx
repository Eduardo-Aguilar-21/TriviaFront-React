import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import '../../Estilos/categoria.css';

export function CategoriaDetalle(){
    const { id } = useParams();
    const[categoria, setCategoria] = useState (null);
    const[dificultad, setDificultad] = useState(null);
    const[ndificultad, setNdificultad] = useState(null);
    const cat_id = id;


    useEffect(()=>{
        if(id){
            getCat();
        }
    },[id]);

    const getCat = async() => {
        const resul = await axios.get(`http://localhost:8080/trivia/categoria/${id}`);
        setCategoria(resul.data);
    }

    const seleccionarD = (v) =>{
        setDificultad(v);
        switch(v){
            case 1:
                setNdificultad("Facil");
            break;
            case 2:
                setNdificultad("Normal");
            break;
            case 3:
                setNdificultad("Dificil");
            break;
        }
    }

    if(!categoria){
        return <div>...Cargando</div>
    }
    
    return(
        <div className="categoriaDetalle"> 
            <h1>{categoria.nombre_cat}</h1>
            <h2>Descripcion</h2>
            <span> Por qahora como ejemplo aqui iria la aprte de la descripcion de la categoria</span>
            <h3>Seleccione dificultad</h3>
            <Button id="n1" variant="warning" value={1} onClick={() => seleccionarD(1)}>Facil</Button>
            <Button id="n2" variant="success" value={2} onClick={() => seleccionarD(2)}>Normal</Button>
            <Button id="n3" variant="danger" value={3} onClick={() => seleccionarD(3)}>Dificil</Button>
            <h3>Selecciono {ndificultad}</h3>
            <Link to={`/jugando/${cat_id}/${dificultad}`}>
                <Button>¡Jugar!</Button>
            </Link>
        </div>
    );
}