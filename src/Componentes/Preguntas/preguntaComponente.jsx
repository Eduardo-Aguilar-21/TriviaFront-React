import React from 'react';
import '../../Estilos/preguntas.css';

export function PreguntaComponente({titulo, categoria, dificultad}){
    return(
        <div className='cajaPregunta'>
            <h1>{titulo}</h1>
            <div className='detallePregunta'>
                <h5>Categoria: {categoria}</h5>
                <h5>Dificultad: {dificultad}</h5>
            </div>

        </div>
    );
}
