import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { CategoriaMenu } from './Componentes/Categoria/categoriaMenu';
import { CategoriaDetalle } from './Componentes/Categoria/categoriaDetalle';
import { PreguntaItem } from './Preguntas/preguntaItem';

function App() {
  return (
    <Router>
      <div className="App"> 
        <Link to={'/'} >Inicio</Link>    
      </div>
      <Routes>
        <Route exact path='/' element={<CategoriaMenu /> } />
        <Route exact path='/jugando/:cat_id/:dificultad' element={<PreguntaItem />} />
        <Route exact path='/detalle/:id' element={<CategoriaDetalle />} />
       </Routes>
    </Router>

  );
}

export default App;
