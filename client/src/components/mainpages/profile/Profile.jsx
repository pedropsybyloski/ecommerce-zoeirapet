import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';

const initialState = {
  name: '',
  email: '',
  cep: '',
  bairro: '',
  cidade: '',
  estado: '',
  numero: ''
}

export default function Profile() {
  const state = useContext(GlobalState);
  const param = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(initialState);
  const [token] = state.token;
  //const [isLogged, setIsLogged] = useState(false);
  //const [isAdmin, setIsAdmin] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const getUser = async () => {
      try {
        if (token) {
          const res = await axios.get('/user/infor', {
            headers: { Authorization: token },
          });

          const newUser = res.data;
          setName(res.data.name);
          //setIsLogged(true);

          //res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          if (param.id) {
            setOnEdit(true);
            if (res.data.id === Number(param.id)) {
              //setUser([...user, ...newUser]);
              console.log(newUser);
              setUser(newUser);
            }
          } else {
            setOnEdit(false);
            setUser(initialState);
          }
        }
      } catch (err) {
        alert(err);
      }
    }
    getUser();
  }, [token, param.id]);

  const handleChangeInput = e => {
    const { name, value } = e.target
    console.log(e.target);
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (onEdit) {
        await axios.put(`/user/update/${user.id}`, user, {
          headers: { Authorization: token }
        }).then((req, res) => {
          alert("Usuário atualizado com sucesso.");
          navigate('/');
        })
      } else {
        await axios.post('/user/update_user', { ...user }, {
          headers: { Authorization: token }
        })
      }
      navigate("/");

    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <form className='form' onSubmit={handleSubmit}>
        <div className='profile-content'>
          <div className='profile-setup'>
            <h3 className="">Configuração do perfil</h3>
            <div className="profile-input">
              <label className="">Nome: </label>
              <input className="name" type="text" name="name" defaultValue={user.name} onChange={handleChangeInput} required/>
            </div>

            <div className="profile-input">
              <label className="">CEP: </label>
              <input type="text" placeholder="00000-000" name='cep' defaultValue={user.cep} onChange={handleChangeInput} required/>
            </div>

            <div className="profile-input">
              <label >Número: </label>
              <input type="text" placeholder="" name='numero' defaultValue={user.numero} onChange={handleChangeInput} required/>
            </div>

            <div className="profile-input">
              <label >Bairro: </label>
              <input type="text" placeholder="Digite o seu bairro" name='bairro' defaultValue={user.bairro} onChange={handleChangeInput} required/>
            </div>

            <div className="profile-input">
              <label >Cidade: </label>
              <input className="cidade" type="text" placeholder="Cidade" name='cidade' defaultValue={user.cidade} onChange={handleChangeInput} required/>
            </div>

            <div className="profile-input">
              <label >Estado: </label>
              <input type="text" placeholder="AA" name='estado' defaultValue={user.estado} onChange={handleChangeInput} required/>
            </div>
          </div>

          <div className='profile-contact'>
            <h3 className="">Contato</h3>
            <div className="profile-input">
              <label >Email: </label>
              <input type="text" placeholder="email@provider.com" name='email' defaultValue={user.email} onChange={handleChangeInput} disabled required/>
            </div>
          </div>
        </div>
        <hr />
        <div className='class-btn'>
          <button className='btn' type="submit">{"Atualizar"}</button>
        </div>
      </form>
    </>
  )
}