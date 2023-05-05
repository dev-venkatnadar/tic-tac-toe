import React, { Component } from 'react'

export default class app extends Component {

  constructor() {
    super()
    this.state = {
      player: 1,
      board: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      winner: null
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

    const win = possibilities.map(m => m.filter(f => board[f[0]][f[1]] === player).length === 3)

    console.log("win", win.find(f => f))

    if (win.find(f => f)) {
      winner = player
      this.setState(prevState => ({
        ...prevState,
        board,
        winner
      }))
      return;
    }

    player = player === 1 ? 2 : 1;


    // console.log("first", p, c, board[p][c])

    this.setState(prevState => ({
      ...prevState,
      player,
      board,
      winner
    }))

  }

  render() {
    const { board, player, winner} = this.state;
    return (
    <>
      {winner && <h1>Player '{player === 1 ? 'O' : 'X'}' Won</h1>}
      {board.map((item, index) => {
        return (
          <>
          <div key={index}>
            {item.map((m, i) => {
              return (
                <>
                  <button key={index + '' + i} onClick={ () => this.clickFun(index, i)}>{m === 1 ? 'O' : m === 2 ? 'X' : '-'}</button>
                </>
              )
            })}
          </div>
          </>
        )
      })}
      
      <div>Player {player === 1 ? 'O' : 'X'} turn</div>
    </>
    )
  }
}
