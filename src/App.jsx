import React from 'react'
import './App.css'

function Estatistica() {
    return (
        <div className="estatistica">
            <div className="title">
                <h2>Estatísticas</h2>
                <div className="title">
                    <img src="./img/icons8-edit.svg" alt=""/>
                    <img src="./img/icons8-plus.svg" alt=""/>
                </div>
            </div>
            <EstatisticaBarra numCaixa='Caixa 1'/>
            <EstatisticaBarra numCaixa='Caixa 2'/>
        </div>
    )
}

function EstatisticaBarra(props) {
    
    return (
        <div className="estatistica__item">
            <p className="estatistica__describe">{props.numCaixa}</p>
            <div className="estatistica__bar">
                <div className="estatistica__progress progress1"></div>
            </div>
        </div>
    )
}

function Historico() {
    return (
        <div className="historico">
            <h2>Histórico</h2>
            <div className="historico__itens">
                <ItemHistorico numCaixa='Caixa 1'/>
                <ItemHistorico numCaixa='Caixa 2'/>
            </div>
        </div>
    )
}

function ItemHistorico(props) {
    const estiloCaixa = {
                        "width": "100%",
                        "padding": "5px 10px"
                        }
    return(
        <div className="historico__item">
            <div style={estiloCaixa}>
                <div className="title">
                    <p className="historico__describe">{props.numCaixa}</p>
                    <div className="title">
                        <img src="./img/icons8-edit.svg" alt=""/>
                        <img src="./img/icons8-plus.svg" alt=""/>
                    </div>
                </div>
            </div>
            <ContainerHistorico />
        </div>
    )
}

function ContainerHistorico() {
    return (
        <div className="historico__container">
            <CardHistorico color="green"/>
            <CardHistorico color="red"/>
        </div>
    )
}


function CardHistorico(props) {
    return (
        <div className="historico__card"> 
                <div className="card">
                    <p className={"bigLetter " + props.color}>5,27%</p>
                    <p className={props.color}>5 Litros</p>
                </div>
                <div className="card">
                    <p>20/10/2022</p>
                    <p>11:34</p>
                </div>
            </div>
    )
}

export default function App() {
    return (
        <>
            <header>
                <h1>SisCMCA</h1>
            </header>
            <main>
                <Estatistica />
                <Historico />
            </main>
        </>
        
    )
}