import { useState } from 'react'
import Main from './components/Main/main';
import FormBuilder from './components/formBuilder/formBuilder';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="">
      <h1 className="p-5">PlayGround</h1>
      <FormBuilder/>
      {/* <Main/> */}
    </div>
  )
}

export default App
