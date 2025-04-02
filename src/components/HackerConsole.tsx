interface HackerConsoleProps {
    onClose: () => void;
  }
  
  const HackerConsole = ({ onClose }: HackerConsoleProps) => {
    return (
      <div className="fixed inset-0 bg-black/90 text-green-500 p-4 font-mono z-50">
        <button onClick={onClose} className="absolute top-4 right-4">
          [X] Close
        </button>
        <div>Hacker Console Activated</div>
      </div>
    );
  };
  
  export default HackerConsole;
  