
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Quiz from './component/quiz';
import Start from './component/Start';
import ThemeToggle from './component/ThemeToggle';





function App() {

  return ( 

<>
<ThemeToggle/>
<BrowserRouter>
<Routes>

  <Route path="/" element = {<Start/>}/>
  <Route path="/Quiz" element = {<Quiz/>}/>
</Routes>
</BrowserRouter>

</>
  );
}

export default App;
