import React from 'react';

export function PreguntaComponente(){
    return(
        <div>
            <div key={id}>
                <h1>{titulo}</h1>
                <h4> Categoria: </h4>
                <h4>{categoria}</h4>
            </div>
        </div>
    );
}
