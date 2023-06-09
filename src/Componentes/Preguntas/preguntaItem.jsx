import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import '../../Estilos/preguntas.css';
import { PreguntaComponente } from "./preguntaComponente";

export function PreguntaItem(){

    const[pregunta, setPregunta] = useState([]);
    const[respuesta, setRespuesta] = useState([]);
    const [preguntaS, setPreguntaS] = useState(null);
    const [contador, setContador] = useState(0);
    const [respondido, setRespondido] = useState([]);

    const {cat_id, dificultad} = useParams();

    /*
    const Listp = async() => {
        const preguntas = await axios.get(`https://triviaapi-production.up.railway.app/trivia/pregunta/esp/${cat_id}/${dificultad}`);
        setPregunta(preguntas.data);
        handleClickPregunta();
    } */

    useEffect(() => {
        const fetchData = async () => {
            const preguntas = await axios.get(`https://triviaapi-production.up.railway.app/trivia/pregunta/esp/${cat_id}/${dificultad}`);
            setPregunta(preguntas.data);
        };
        fetchData();
    }, [cat_id, dificultad]);

    const lose = () => {
        if(respondido.length === 10){
            alert("game over");
        }
    }

    console.log(pregunta);
    console.log(preguntaS);


    
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
        const res = await axios.get(`https://triviaapi-production.up.railway.app/trivia/respuestas/busp/${id_pregunta}`)
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
            {preguntaS && (
                <div key={preguntaS.id_pre}>
                    <PreguntaComponente titulo = {preguntaS.pregunta_n} categoria={preguntaS.categoriaModel.nombre_cat} dificultad={preguntaS.dificultadModel.nom_dif} />
                    <div className="contenedorRespuesta">
                        {
                            respuesta.length > 0 ? (
                                respuesta.map((r) => (
                                    <div key={r.id_res} className='respuestaCaja' onClick={() => sumarPuntaje(r.esValida, r.puntos, preguntaS.id_pre)}>
                                        <span> {r.respuesta_n}
                                        </span> 
                                    </div>    
                                ))
                            ) : 
                            (
                                <div className="sinRespuesta">
                                    <h1>No hay</h1>
                                    <Button onClick={() => handleClickPregunta()}>Cambiar Pregunta</Button>
                                </div>
                                 )
                        }
                    </div>
                
                </div>
            )}

            
            <Button onClick={() => handleClickPregunta()}>Cambiar </Button>
        </div>
    );
}