import { useState, useCallback, useEffect, useRef } from "react"

function App() {

  const[len, setLen] = useState(5);
  const[numAllowed, setNumAllowed] = useState(false);
  const[charAllowed, setCharAllowed] = useState(false);
  const[password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*()_{}+|<>?";

    for(let i = 1; i<=len;i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [len, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passwordGenerator()},[len, numAllowed, charAllowed, passwordGenerator])


  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-600 bg-gray-700">
      <h1 className="text-white text-center my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className="outline-none w-full px-3 py-1" placeholder="password" readOnly ref={passwordRef}/>
        <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyPasswordToClipboard}>copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range" min={6} max={100} value={len} className="cursor-pointer" onChange={(e) =>{setLen(e.target.value)}}/>
          <label>Length:{len}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <label>Number:{numAllowed}</label>
          <input type="checkbox" defaultChecked={numAllowed} id="numInput" onChange={()=>{setNumAllowed((prev)=>!prev)}}/>
        </div>
        <div className="flex items-center gap-x-1">
          <label>Characters:{charAllowed}</label>
          <input type="checkbox" defaultChecked={charAllowed} id="charInput" onChange={()=>{setCharAllowed((prev)=>!prev)}}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
