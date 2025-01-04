import { useState } from 'react'
import { generateMnemonic } from "bip39";function App() {

  const [mnemonic, setMnemonic] = useState("");
  return (
    <div className=' min-h-screen w-full bg-black font-bold justify-center'>
      <div className='px-56 py-8 '>
      <h1 className=' text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent'>PURSE.v1</h1>
        <h1 className='text-xl text-white'>a web based crypto wallet</h1>
        <div className='flex justify-center py-28'>
        <button onClick={async function () {
          const mn = await generateMnemonic();
          setMnemonic(mn);
        }} className='bg-blue-500 p-4 text-white'>Generate</button>
          <input type="text" placeholder='Enter 12word Seed phrase or Click Button to Generate' size={100} className='rounded-sm p-3' value={mnemonic}></input>
          </div>
      </div>
    </div>
  )
}

export default App
