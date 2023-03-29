import { useState } from 'react'

const config = {
  title: 'Select a Directory',
  buttonLabel: 'Select',
  properties: ['openDirectory']
}

const method = 'showOpenDialog'

export default function SelectDirectory(): JSX.Element {
  const [directory, setDirectory] = useState('')
  const [message, setMessage] = useState('')
  const [disable, setDisable] = useState(false)
  window.electron.ipcRenderer.on('data', (_event, data) => {
    setMessage(data.message)
  })
  window.electron.ipcRenderer.on('finish', (_event, data) => {
    setMessage(data.message)
    setDisable(false)
  })
  return (
    <>
      <button
        className="mokuro-button"
        disabled={disable}
        onClick={(): void => {
          window.electron.ipcRenderer.invoke('dialog', method, config).then((result) => {
            if (result.canceled === false) {
              setDirectory(result.filePaths[0])
              setDisable(false)
            }
          })
        }}
      >
        Select a directory
      </button>
      <div className="selectedFile">
        <p>Selected Directory:</p>
        <p>{directory}</p>
      </div>
      <div className="options">
        <label>
          Only use CPU
          <input type="checkbox" name="forceCPU" value="--force_cpu"></input>
        </label>
        <label>
          As One File
          <input type="checkbox" name="oneFile" value="--as_one_file"></input>
        </label>
      </div>

      <button
        className="mokuro-button"
        disabled={disable}
        onClick={(): void => {
          setDisable(true)
          window.electron.ipcRenderer.invoke('mokuro', method, { location: directory })
        }}
      >
        Run
      </button>
      <p>{message}</p>
    </>
  )
}
