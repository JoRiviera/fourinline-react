import { Board } from './gameComponents/Board';

export function App() {
  return (
    <div className="App">
      <Board
        height={6}
        width={7}
      />
    </div>
  );
}