import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// class Square extends React.Component {
//     // constructor(props) {
//     //     super(props);
//     //     this.state = {
//     //       value: null,
//     //     };
//     //   }
//     render() {
//       return (
//         <button className="square" 
//         onClick={()=>this.props.onClick()}
//         // onClick={function(){console.log('clicked',this.props.value);}}
//         >
//           {this.props.value}
//         </button>
//       );
//     }
//   }
  function Square(props) {
    let className = 'square';
    if (props.isWinningSquare) {
      className += ' winning-square';
    }
    // const divStyle = {
    //     color: 'red',
    //     background: props.isWinningSquare ? "yellow": "red",
    //   };
    return (
      <button  className={className} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         squares : Array(9).fill(null),
    //         xIsNext: true,
    //     }
    // }


    renderSquare(i) {
        debugger
        const winningSquares = calculateWinner(this.props.squares);
        const isWinningSquare = winningSquares && winningSquares.includes(i);
      return <Square 
      value={this.props.squares[i]}
      onClick={()=> this.props.onClick(i)}
      isWinningSquare={isWinningSquare}
       />;
    }
  
    render() {
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        //   status = 'Winner: ' + winner;
        // } else {
        //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        // }
  
      return (
        <div>
          {/* <div className="status">{status}</div> */}
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
        };
      }
      handleClick(i){
        // const history = this.state.history;
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        //const squares = current.squares.slice();
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
          }
        // const squa = this.state.squares;
       // console.log(squa)
       squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState(
            { 
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
             xIsNext: !this.state.xIsNext
            });
    }
    jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
        });
      }
    render() {
        const history = this.state.history;
        // const current = history[history.length - 1];
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move) => {
            const desc = move ?
              'Go to move #' + move :
              'Go to game start';
              const activeClass = this.state.stepNumber == move ? "isActive" :"";
            return (
              <li key={move}>
                <button className={activeClass} onClick={() => this.jumpTo(move)}>{desc}</button>
              </li>
            );
          });
        let status;
        if (winner) {
            console.log(current,winner)
          status = 'Winner: ' + current.squares[winner[0]];
        } else if(this.state.stepNumber<9) {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        } else{
            status = "Match is draw."
        }
      return (
        <div className="game">
          <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [a, b, c];;
      }
    }
    return null;
  }
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  
