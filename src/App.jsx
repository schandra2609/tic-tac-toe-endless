import Body from "./Components/Body.jsx";

// Header component of the game
const Header = () => {
    return (
        <div className="flex justify-center items-center uppercase">
            <span className="text-3xl px-5 py-3 font-arial font-extrabold bg-white text-black border-none rounded-full shadow-[0_0_15px_rgb(0,217,255)] my-5">Tic-Tac-Toe: Endless</span>
        </div>
    );
};

// The main App component
const App = () => {
    return (
        <div className="App flex flex-col min-h-screen h-auto w-screen bg-[rgb(6,0,22)] text-white">
            {/* Header of the game */}
            <Header />

            {/* Body of the game */}
            <Body />
        </div>
    );
};

export default App;