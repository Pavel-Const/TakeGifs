
import './App.css';
import MainBoard from "./MainBoard/MainBoard";


function App() {
  return (
    <div className="App">
      <h2>Введите тег или несколько тегов через запятую, для выводы десяти рандомных гифок введите 'delay'</h2>
        <MainBoard/>
    </div>
  );
}

export default App;
