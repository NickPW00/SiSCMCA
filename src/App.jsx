import React from 'react'
import './App.css'

/* function Estatistica() {
    return (
        <div className="estatistica">
            <div className="title">
                <h2>Estatísticas</h2>
                <div className="title">
                    <img src="./img/icons8-edit.svg" alt=""/>
                    <img src="./img/icons8-plus.svg" alt=""/>
                </div>
            </div>
            <EstatisticaBarra 
                numCaixa='Caixa 1'
                porcentagem={70} 
            />
        </div>
    )
} */


class Estatistica extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dados: null
        }
    }

    componentDidMount() {
        fetch("/dados/dades.json")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    dados: data
                });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

    render() {
        const { dados } = this.state;
        return (
            <div className="estatistica">
                <div className="title">
                    <h2>Estatísticas</h2>
                    <div className="title">
                        <img src="./img/icons8-edit.svg" alt="" />
                        <img src="./img/icons8-plus.svg" alt="" />
                    </div>
                </div>
                {dados === null ? (
                    <div>Carregando...</div>
                ) : (
                    dados.map(item => {
                        const sumMudanca = item.historico.reduce(
                            (accumulator, entry) => accumulator + entry.mudanca,
                            0
                        );
                        return (
                            <EstatisticaBarra
                                key={item.id}
                                numCaixa={item.nome}
                                porcentagem={(sumMudanca / item.capacidade) * 100}
                            />
                        );
                    })
                )}
            </div>
        );
    }
}

function EstatisticaBarra(props) {
    const porcentagem = {"width": props.porcentagem + "%"}
    return (
        <div className="estatistica__item">
            <p className="estatistica__describe">{props.numCaixa}</p>
            <div className="estatistica__bar">
                <div className="estatistica__progress" style={porcentagem}></div>
            </div>
        </div>
    )
}

function Historico() {
    return (
        <div className="historico">
            <h2>Histórico</h2>
            <div className="historico__itens">
                <ItemHistorico nomeCaixa='Caixa 1' numCaixa={0} />
                <ItemHistorico nomeCaixa='Caixa 2' numCaixa={1} />
            </div>
        </div>
    )
}

// Aqui ocorrerá o fetch, porém, só sobre a quantidade de Caixas
function ItemHistorico(props) {
    const estiloCaixa = {
                        "width": "100%",
                        "padding": "5px 10px"
                        }
    return(
        <div className="historico__item">
            <div style={estiloCaixa}>
                <div className="title">
                    <p className="historico__describe">{props.nomeCaixa}</p>
                    <div className="title">
                        <img src="./img/icons8-edit.svg" alt=""/>
                        <img src="./img/icons8-plus.svg" alt=""/>
                    </div>
                </div>
            </div>
            <ContainerHistorico numCaixa={props.numCaixa} />
        </div>
    )
}

// Aqui que ocorrerá o fetch.
class ContainerHistorico extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            historico: null,
            capacidade: null
        }
    }

    componentDidMount() {
        let numCaixa = this.props.numCaixa
        fetch("/dados/dades.json")
            .then(response => response.json())
            .then(data => {
                this.setState({
                historico: data[numCaixa].historico,
                capacidade: data[numCaixa].capacidade
                })
            }
            )
    }

    render() {
        const { historico, capacidade } = this.state
        return (
            <div className="historico__container">
                {historico === null ?
                <div>Carregando...</div> : 
                historico.map(({ mudanca , data }) => (
                    <CardHistorico 
                    color={mudanca > 0 ? "green" : "red"}
                    porcentagemCard={((mudanca / capacidade)*100).toFixed(2) + '%'}
                    mudanca={mudanca + " litros"}
                    data={data}/> 
                ))}
            </div>
        )
    }
}


function CardHistorico({porcentagemCard, mudanca, data, color}) {
    return (
        <div className="historico__card"> 
                <div className="card">
                    <p className={"bigLetter " + color}>{porcentagemCard}</p>
                    <p className={color}>{mudanca}</p>
                </div>
                <div className="card">
                    <p>{data}</p>
                    <p>Por enquanto vazio</p>
                </div>
            </div>
    )
}

function chamada() {
    fetch("/dados/dades.json")
        .then(response => response.json())
        .then(data => {return data})
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