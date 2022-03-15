import './App.css';
import React from 'react';
import lottery from './lottery';
import web3 from './web3';

class App extends React.Component {

  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  }

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting for transaction...'});

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })

    this.setState({ message: 'You have been entered - good luck!'});
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Picking the winner...'});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })

    this.setState({ message: 'We have a winner!'});
  }

  render() {
    return (
      <div className='App'>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}<br/>
          There are currently {this.state.players.length} people entered
          competing to win {web3.utils.fromWei(this.state.balance)} ether.
          </p>
          <hr/>

          <form onSubmit={this.onSubmit}>
            <h4>Feeling lucky?</h4>
            <div>
              <label>Amount of ether to enter</label>
              <input
                value={this.state.value}
                onChange={event => this.setState({value: event.target.value})}
              />
            </div>
            <button>Enter</button>
          </form>

          <hr/>

          <h4>Pick a winner</h4>
          <button onClick={this.onClick}>Pick</button>

          <hr/>

          <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
