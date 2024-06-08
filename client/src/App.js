import './App.css';
import Header from './components/Header';
import Form from './components/Form';
import Recomend from './components/Recomend';

function App() {
  return (
    <div className="App">
      <Header title="Grocery_List_App" />
      <Form/>
      <Recomend/>
    </div>
  );
}

export default App;



