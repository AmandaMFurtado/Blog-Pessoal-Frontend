import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Navbar from './componentes/estaticos/navbar/Navbar';
import Footer from './componentes/estaticos/footer/Footer';
import ListaTema from './componentes/temas/listatema/ListaTema';
import ListaPostagem from './componentes/postagens/listapostagem/ListaPostagem';
import CadastroPost from './componentes/postagens/cadastroPost/CadastroPost';
import CadastroTema from './componentes/temas/cadastroTema/CadastroTema';
import DeletarPostagem from './componentes/postagens/deletarPostagem/DeletarPostagem';
import DeletarTema from './componentes/temas/deletarTema/DeletarTema';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import Home from './paginas/home/Home';
import Login from './paginas/login/Login';
import store from './store/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

function App() {
  return (
        <Provider store={store}>
          <ToastContainer />
          <Router>
            <Navbar />
            <Switch>

              <div style={{ minHeight: '100vh' }}>

                <Route exact path='/'>
                  <Home />
                </Route>

                <Route path='/login'>
                  <Login />
                </Route>

                <Route path='/home'>
                  <Home />
                </Route>

                <Route path='/cadastrousuario'>
                  <CadastroUsuario />
                </Route>

                <Route path='/temas'>
                  <ListaTema />
                </Route>

                <Route path='/postagens'>
                  <ListaPostagem />
                </Route>

                <Route exact path='/formularioPostagem'>
                  <CadastroPost />
                </Route>

                <Route exact path='/formularioPostagem/:id'>
                  <CadastroPost />
                </Route>

                <Route exact path='/formularioTema'>
                  <CadastroTema />
                </Route>

                <Route exact path='/formularioTema/:id'>
                  <CadastroTema />
                </Route>

                <Route path='/deletarPostagem/:id'>
                  <DeletarPostagem />
                </Route>

                <Route path='/deletarTema/:id'>
                  <DeletarTema />
                </Route>
              </div>
            </Switch>
            <Footer />
          </Router>
        </Provider>
  );
}

export default App;