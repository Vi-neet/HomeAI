// import Header from "./components/Header"
import Form from "./components/Form"
import { BrowserRouter,Link,Route,Routes } from "react-router-dom"
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <h1>HomeAI</h1>
          <Link to="/">Home</Link>
          <Link to="/chef">Chef</Link>
          <Link to="/Trainer">Trainer</Link>
        </nav>
        <Routes>
          <Route path="/"/>
          <Route path="/chef" element={<Form/>}/>
        </Routes>
      </BrowserRouter>
      {/* <Header/> */}
      {/* <Form/> */}
    </div>
  )
}

export default App
