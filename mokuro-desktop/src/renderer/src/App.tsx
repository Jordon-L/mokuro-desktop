import icons from './assets/icons.svg'
import Mokuro from './components/Mokuro'

function App(): JSX.Element {
  return (
    <div className="container">
      <img className="hero-logo" src={icons} alt="Owl SVG" />
      <h2 className="hero-text">Mokuro Desktop</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          margin: '10px'
        }}
      >
        <Mokuro></Mokuro>
      </div>
    </div>
  )
}

export default App
