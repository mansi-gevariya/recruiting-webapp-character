import './App.css';
import { CharacterList } from './components/character/list/CharacterList';

function App() {
  return (
    <div className="App py-6">
      <header className="App-header">
        <h1>Build your characters</h1>
      </header>
      <div className="container mx-auto">
        <CharacterList />
      </div>
    </div>
  );
}

export default App;
