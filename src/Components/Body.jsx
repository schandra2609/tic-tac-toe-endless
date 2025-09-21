import { useState } from 'react';
import Board from './Board.jsx';


const TurnIndicator = ({ turnx }) => {
    const styleXTurn = {
        backgroundColor: turnx ? "rgb(173, 106, 245)" : "rgb(166, 76, 250)",
        color: turnx ? "white" : "rgb(58, 1, 58)",
        boxShadow: turnx ? "0 0 20px rgb(169, 96, 238)" : "none"
    };
    const styleOTurn = {
        backgroundColor: !turnx ? "rgb(58, 249, 249)" : "rgb(1, 189, 189)",
        color: !turnx ? "white" : "rgb(5, 94, 157)",
        boxShadow: !turnx ? "0 0 20px rgb(120, 234, 234)" : "none"
    }

    return (
        <div className="h-fit w-screen md:w-[20vw] flex justify-around py-2.5 mx-auto">
            <button disabled="disabled" id="turnx" className="font-nunito-bold flex justify-center items-center border-0 text-[2.5rem] h-[7vh] w-[7vh] rounded-[10px]" style={styleXTurn}>X</button>
            <button disabled="disabled" id="turno" className="font-nunito-bold flex justify-center items-center border-0 text-[2.5rem] h-[7vh] w-[7vh] rounded-[10px]" style={styleOTurn}>O</button>
        </div>
    );
};


const Body = () => {
    const [turnx, setTurnx] = useState(true);
    return (
        <div className="flex flex-col flex-grow">
            <TurnIndicator turnx={turnx}/>
            <Board turnx={turnx} setTurnx={setTurnx}/>
        </div>
    );
};

export default Body;