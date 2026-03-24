"use client";
import { useState } from "react";

interface embedding {
  score: number,
  text: string,
  source: string
}
export default function Page() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<embedding[]>([]);
  const [formLinkActive, setFormLinkActive] = useState(false)

  const handleLinkSubmit = async (e:any) => {
    e.preventDefault()
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scrape?url=${e.target.link.value}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setFormLinkActive(false)
    alert("Página adicionada!")
    
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?query=${query}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setResults(data.result);
  };

  return (
    <div className="container">
      <h1>Busca Inteligente</h1>

      <form onSubmit={handleSubmit} className="form">

        <input
          className="query"
          type="text"
          placeholder="Digite sua busca..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      <div className="results">
        <h2>Resultados</h2>

        {results.length === 0 ? (
          <p className="empty">Nenhum resultado ainda...</p>
        ) : (
          results.map((res, index) => (
            <div key={index} className="card">
              <p>Texto: <br />{res.text}</p>
              <p>Score: <br />{res.score}</p>
              <p>Origem do texto: <br /><a href={res.source}>{res.source}</a></p>
            </div>
          ))
        )}
      </div>
      {formLinkActive ? <div>
        <form onSubmit={handleLinkSubmit} action="">
          <label htmlFor="">
            <input id="link" type="text" placeholder="informe um link" />
          </label>
          <div>
            <button 
            type="submit"
            >confirmar</button>
            <button className="bg-red"
              onClick={()=> setFormLinkActive(false)}
            >cancelar</button>
          </div>
        </form>
      </div>: 
      <button 
        onClick={()=> setFormLinkActive(true)}
      >Adicionar fontes</button>}
    </div>
  );
}