import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { types } from './constants';

export const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(0);
  const [pokemons, setPokemons] = useState(null);

  useEffect(() => axios.get('https://pokeapi.co/api/v2/pokemon/?limit=900').then((res) => setPokemons(res.data.results)), []);
  const filter = (t) => axios.get(`https://pokeapi.co/api/v2/${t}/`).then((res) => {
    setPokemons(t.includes('9') ? res.data.results : res.data.pokemon.map((p) => p.pokemon));
  });
  return (
    <div className='page'>
    <input onChange={(e) => {setValue(e.target.value);setPage(0)}} value={value} type="text"/>
    <ul>{types.map(t => <li onClick={() => filter(`type/${t}`)} key={t}>{t}</li>)}
    <li onClick={() => filter('pokemon/?limit=900')} key='all'>All</li></ul>
       <div className='pokemonList'>
          {pokemons && pokemons.filter((p) => p.name.indexOf(value) !== -1).slice((page+1)*20-20, (page+1)*20)
            .map((p) => <div key={p.name} className='pokemon'>
            {p.name}
            <img alt='hi' src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${ p.url.split('/')[p.url.split('/').length - 2]}.png?raw=true`}></img>
          </div>)}
       </div>
        <ReactPaginate pageCount={pokemons && pokemons.filter((p) => p.name.indexOf(value) !== -1).length / 20}
         onPageChange={(e) => setPage(e.selected)} previousLabel='' nextLabel=''/>
    </div>
  );
};

