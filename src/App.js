import React, { Component } from 'react'

export default class app extends Component {

  constructor() {
    super()

    this.state = this.defaultValues()
  }

  defaultValues = () => {
    return {
      player: 1,
      board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      winner: null,
      winningBoxes: []
    }
  }

  clickFun = (p, c) => {
    let { board, player, winner} = this.state

    if (winner) {
      return;
    }

    if (board[p][c] === 0) {
      board[p][c] = player;
    }

    const possibilities = [
      [[0,0], [0,1], [0,2]],
      [[1,0], [1,1], [1,2]],
      [[2,0], [2,1], [2,2]],
      [[0,0], [1,0], [2,0]],
      [[0,1], [1,1], [2,1]],
      [[0,2], [1,2], [2,2]],
      [[0,0], [1,1], [2,2]],
      [[0,2], [1,1], [2,0]],
    ]

    let wonBoxs = [];

    const win = possibilities.map(m => {
      if (m.filter(f => board[f[0]][f[1]] === player).length === 3) {
        wonBoxs = m
      }
      return m.filter(f => board[f[0]][f[1]] === player).length === 3
    })

    if (win.find(f => f)) {
      winner = player
      this.setState(prevState => ({
        ...prevState,
        board,
        winner,
        winningBoxes: wonBoxs
      }))

      return;
    }

    player = player === 1 ? 2 : 1;

    this.setState(prevState => ({
      ...prevState,
      player,
      board,
      winner
    }))

  }

  retry = () => {
    this.setState({
      ...this.defaultValues()
    })
  }

  render() {
    const { board, player, winner, winningBoxes} = this.state;

    return (
    <React.Fragment>
      <div className='h-full flex flex-col justify-evenly items-center bg-white'>
      <h1 className='text-7xl text-sky-400'>Tic - Tac - Toe</h1>
      <div className='w-full grid lg:grid-cols-9 justify-center items-center bg-white'>
        <div className='col-span-3 text-black text-6xl flex flex-col justify-center items-center'>
          <div>
            Player {player === 1 ? '(O)' : '(X)'} turn
          </div>
          <button className='col-span-2 m-4' onClick={ () => this.retry()}> <span className='text-sky-400 text-4xl'>Retry</span></button>
        </div>
        <div className='col-span-3 bg-gray-100 drop-shadow-lg rounded-md p-4'>
        {board.map((item, index) => {
          return (
            <React.Fragment key={index}>
            <div className='grid grid-cols-6' key={index}>
              {item.map((m, i) => {
                return (
                  <React.Fragment key={index + '' + i}>
                    <button key={index + '' + i} className={`col-span-2 m-4 ring ring-offset-0 ring-gray-400 ${winningBoxes.map(m => m.join('')).includes(index + '' + i) ? 'bg-green-200 ring-green-800' : winner ? 'bg-red-200 ring-red-800' : ''}`} onClick={ () => this.clickFun(index, i)}> <span className='text-black text-5xl'>{m === 1 ? 'O' : m === 2 ? 'X' : ' '}</span></button>
                   </React.Fragment>
                )
              })}
            </div>
             </React.Fragment>
          )
        })}
        </div>
        <div className='col-span-3 text-black text-6xl flex justify-center items-center'>{winner && <div>Player '{player === 1 ? 'O' : 'X'}' Won</div>}</div>
      </div>
      </div>
     </React.Fragment>
    )
  }
}
