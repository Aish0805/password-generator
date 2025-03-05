import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolsAllowed, setSymbolsAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const [copied, setCopied] = useState(false);

  const passRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass);
    setCopied(false); 

  }, [length, numberAllowed, charAllowed]); // dependencies for useCallback to prevent re-rendering

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passRef.current?.select();
    setCopied(true); 
  }

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white my-3 text-center'>Password Generator</h1>
      <span className='px-1 mb-3 text-green'>{copied ? 'Copied' : ''}</span>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type='text'
          className='outline-none w-full py-1 px-3 bg-white'
          value={password}
          placeholder='Password'
          readOnly
          ref={passRef} />
        <button
          style={{ cursor: 'pointer' }}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClipboard}
        >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type='range'
            min={6}
            max={20}
            name=''
            id=''
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)} />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            name=''
            id=''
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            defaultChecked={numberAllowed} />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
            type='checkbox'
            name=''
            id=''
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
            defaultChecked={charAllowed} />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
