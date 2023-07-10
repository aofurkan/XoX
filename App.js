import { useState } from "react";
import { Text, TouchableOpacity, Button } from "react-native";
import { HStack, VStack, Flex } from "react-native-flex-layout";
import checkWinner from "./checkWinner";

function Box({ value, onPress, disable, highlighted }) {
  return (
    <TouchableOpacity disabled={disable} onPress={onPress}>
      <Flex
        w={60}
        h={60}
        center
        style={{ backgroundColor: highlighted ? "lightgreen" : "lightgrey" }}
      >
        <Text style={{ fontSize: 36 }}>{value}</Text>
      </Flex>
    </TouchableOpacity>
  );
}

function App() {
  const [currentPlayer, setCurrentPlayer] = useState(Array(9).fill(null));
  const [board, setBoard] = useState([]);
  const [highlighted, setHighlighted] = useState([]);
  const [winner, setWinner] = useState(null);
  const handlePress = (index) => {
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    const winnerLine = checkWinner(newBoard);
    if(winnerLine){
      setHighlighted(winnerLine);
      setWinner(currentPlayer);
      alert(`${currentPlayer} won!`);
      
    }else{
      setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    }
  };
  const handleReset = () =>{
    setCurrentPlayer("X");
    setBoard(Array(9).fill(null));
    setHighlighted([]);
    setWinner(null);
  }
  const getBox = (index) => (
    <Box
      value={board[index]}
      onPress={() => handlePress(index)}
      highlighted={highlighted.includes(index)}
      disabled={winner || board[index]}
    />
  );

  return (
    <VStack fill center spacing={4}>
      <Text style={{ fontSize: 36 }}>{currentPlayer} to Play</Text>
      <HStack spacing={4} shouldWrapChildren>
        {getBox(0)}
        {getBox(1)}
        {getBox(2)}
      </HStack>
      <HStack spacing={4} shouldWrapChildren>
        {getBox(3)}
        {getBox(4)}
        {getBox(5)}
      </HStack>
      <HStack spacing={4} shouldWrapChildren>
        {getBox(6)}
        {getBox(7)}
        {getBox(8)}
      </HStack>
      <Button spacing={4} title="Reset" onPress={handleReset}></Button>
    </VStack>
    
  );
}
export default App;
