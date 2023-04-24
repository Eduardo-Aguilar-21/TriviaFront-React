import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import '../Estilos/preguntas.css';

export function PreguntaItem(){

    const[pregunta, setPregunta] = useState(null);
    const[respuesta, setRespuesta] = useState([]);
    const [preguntaS, setPreguntaS] = useState(null);
    const [contador, setContador] = useState(0);
    const [respondido, setRespondido] = useState([]);

    const {cat_id, dificultad} = useParams();

    useEffect(() => {
        listp();
    },[])

    useEffect(() => {
        handleClickPregunta();
    }, [pregunta, respondido]);

    const lose = () => {
        if(respondido.length == 2){
            alert("game over");
        }
    }


    const listp = async() => {
        const preguntas = await axios.get(`http://localhost:8080/trivia/pregunta/esp/${cat_id}/${dificultad}`);
        setPregunta(preguntas.data);
        handleClickPregunta();
    } 
    
    const handleClickPregunta = () => {
        if (pregunta && pregunta.length > 0) {

            let idran ;
            do {
                idran = Math.floor(Math.random() * pregunta.length);
            } while (respondido.includes(pregunta[idran].id_pre));
            

            setPreguntaS(pregunta[idran]);
            setRespuesta([]);
            handleClick(pregunta[idran].id_pre);
            lose();
        }
    }   
    
    if(!pregunta){
        return <div>... Cargando</div>
    }

    const listr = async(id_pregunta) => {
        const res = await axios.get(`http://localhost:8080/trivia/respuestas/busp/${id_pregunta}`)
        setRespuesta(res.data);
    }

    const handleClick  = (id_pregunta) => {
        listr(id_pregunta);
    }


    const sumarPuntaje= (v,p,id) => {
        if(v){
            setContador(contador + p);
        }
        setRespondido([...respondido, id ]);
        handleClickPregunta();
    }



    return(
        <div className="preguntaContenedor">
            <h1>Puntaje {contador}</h1>
            <h1>Respondido {respondido.length}</h1>
            {preguntaS &&(
                <div key={preguntaS.id_pre}>
                    <h1>Pregunta: {preguntaS.id_pre}</h1>
                    <h1>{preguntaS.pregunta_n}</h1>
                    <h4> Categoria: </h4>
                    <h4>{preguntaS.categoriaModel.nombre_cat}</h4>
                    {
                        respuesta.length > 0 ? (
                            respuesta.map((r) => (
                                <div key={r.id_res}>
                                    <h5>Respuesta : {r.respuesta_n}
                                        <Button onClick={() => sumarPuntaje(r.esValida, r.puntos, preguntaS.id_pre)} >Seleccionar</Button>
                                    </h5> 
                                </div>    
                            ))
                        ) : 
                        (
                            <h1>No hay</h1>
                        )
                    }
                </div>
            )}

            <Button onClick={() => handleClickPregunta()}>Cambiar Pregunta</Button>
        </div>
    );
}