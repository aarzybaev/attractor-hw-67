import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../app/store';
import {checkPass, setStatus} from './keyboardSlice';
import './Keyboard.css';

const Keyboard: React.FC = () => {
  const [code, setCode] = useState({
    star: '',
    passcode: ''
  });
  const isCorrect = useSelector((state: RootState) => state.keyboard.isCorrect);
  const dispatch = useDispatch();

  let borderClass: React.CSSProperties;
  const btnHandler = (enteredCode: string) => {
    if (enteredCode === '<') {
      if (code.passcode.length) {
        setCode(prevState => ({
          ...prevState,
          passcode: prevState.passcode.slice(0, -1),
          star: prevState.star.slice(0, -1),
        }));
        dispatch((setStatus(undefined)));
      } else {
        dispatch(setStatus(undefined));
      }
    } else if (enteredCode === 'E') {
      dispatch(checkPass(Number(code.passcode)));
    } else {
      if (code.passcode.length < 4) {
        setCode(prevState => ({
          ...prevState,
          passcode: prevState.passcode += enteredCode,
          star: prevState.star += '*'
        }));
      }
    }
  };


  if (isCorrect === true) {
    borderClass = {
      border: '2px solid green',
      color: 'green'
    };
  } else if (isCorrect === false) {
    borderClass = {
      border: '2px solid red',
      color: 'red'
    };
  } else {
    borderClass = {
      border: '2px solid gray',
      color: 'gray'
    };
  }


  return (
    <div className="col-4 m-auto mt-3">
      <div className="d-flex flex-column justify-content-center align-items-center mt-2 gap-2">
        <input style={borderClass} type="text"
               value={isCorrect === undefined ? code.star : isCorrect ? 'Access granted' : 'Access denied'}
               name="code" disabled/>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-outline-dark btn-lg"
                  onClick={() => {
                    btnHandler('7');
                  }}>7
          </button>
          <button type="button" className="btn btn-outline-dark btn-lg"
                  onClick={() => {
                    btnHandler('8');
                  }}>8
          </button>
          <button type="button" className="btn btn-outline-dark btn-lg"
                  onClick={() => {
                    btnHandler('9');
                  }}>9
          </button>
        </div>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-outline-dark btn-lg"
                  onClick={() => {
                    btnHandler('4');
                  }}>4
          </button>
          <button type="button" className="btn btn-outline-dark btn-lg"
                  onClick={() => {
                    btnHandler('5');
                  }}>5
          </button>
          <button type="button" className="btn btn-outline-dark btn-lg"
                  onClick={() => {
                    btnHandler('6');
                  }}>6
          </button>
        </div>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-outline-dark btn-lg"
                  onClick={() => {
                    btnHandler('1');
                  }}>1
          </button>
          <button type="button" className="btn btn-outline-dark btn-lg"
                  onClick={() => {
                    btnHandler('2');
                  }}>2
          </button>
          <button type="button" className="btn btn-outline-dark btn-lg"
                  onClick={() => {
                    btnHandler('3');
                  }}>3
          </button>
        </div>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-outline-dark btn-lg"
                  onClick={() => {
                    btnHandler('<');
                  }}>&lt;</button>
          <button type="button" className="btn btn-outline-dark btn-lg"
                  onClick={() => {
                    btnHandler('0');
                  }}>0
          </button>
          <button type="submit" className="btn btn-outline-dark btn-lg"
                  onClick={() => {
                    btnHandler('E');
                  }}>E
          </button>
        </div>

      </div>

    </div>
  );
};

export default Keyboard;