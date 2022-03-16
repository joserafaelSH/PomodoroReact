import { useEffect, useState } from "react";
import "./App.css";

// 60sec x tempo de trabalho(em minutos)
const SECONDS_POMODORO_TIME = 60 * 25;
const SECONDS_POMODORO_PAUSE = 60 * 5;

function App() {
  const [cicles, setCicles] = useState(0);
  const [seconds, setSeconds] = useState(SECONDS_POMODORO_TIME);
  const [start, setStart] = useState(false);
  const [work, setWork] = useState(true);
  const [pause, setPause] = useState(false);
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const handleClick = () => {
    setStart(true);
  };

  useEffect(() => {
    if (start) {
      if (seconds > 0) {
        setTimeout(() => {
          setSeconds((state) => state - 1);
        }, 1000);
      } else {
        if (work) {
          setWork(false);
          setPause(true);
          setSeconds(SECONDS_POMODORO_PAUSE);
          setCicles((state) => state + 1);
          alert("Trabalho finalizado. Começar pausa");
        } else {
          setWork(true);
          setPause(false);
          setSeconds(SECONDS_POMODORO_TIME);
          alert("Pausa finalizada. Voltar ao trabalho");
        }
        setStart(false);
      }
    }
  }, [start, seconds, work, pause]);

  return (
    <div className="App">
      <div className="title">{work ? "Work" : "Break"}</div>
      <div className="display">
        <div className="box">
          <div className="time">Minutes</div>
          <div className="count">{String(minutes).padStart(2, "0")}</div>
        </div>
        <div className="box">
          <div className="time">Seconds</div>
          <div className="count">{String(secs).padStart(2, "0")}</div>
        </div>
      </div>
      <div className="btns">
        <button onClick={handleClick} className="btn">
          Start {work ? "Work" : "Break"}
        </button>
      </div>
      <div className="cicles">
        <div className="cicle">Ciclos completos: {cicles}</div>
      </div>
    </div>
  );
}

export default App;
