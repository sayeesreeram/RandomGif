import styled, { keyframes } from "styled-components";


export const StyledMainContainer = styled.div`
textAlign:center;
`

export const SearchBarContainer = styled.div`
margin: 20px 0;
`

export const SearchInput = styled.input`
  padding: 10px;
  width: 200px;
`;

export const SearchButton = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const GifGrid = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  justify-items: center;
`;

export const GifCard = styled.div`
  padding: 10px;
  border-radius: 5px;
`;

export const GifImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 5px;
`;

export const StyledRowFlex = styled.div`
display:flex;
width:100%;
justify-content:center;
align-items:center;
`


export const ErrorDiv = styled.div`
color:red;
`

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;


export const LoaderDiv = styled.div`
position:relative;
top:50%;
left:50%;
transform:translate(-50%,-50%);
border: 5px solid #333; 
border-top: 5px solid #fff; 
border-radius: 50%;
margin-top:30px;
width: 30px;
height: 30px;
animation: ${rotateAnimation} 2s linear infinite;`

export const RetryButton = styled.button`
background-color: #007BFF;
color: #fff;
border: none;
padding: 0px 20px;
cursor: pointer;
margin: 0px 20px;
font-size: 16px;
height: 30px;
border-radius: 5px;
transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

export const BackButton = styled.button`
  background-color: #3498db; /* Blue background color */
  color: #fff; /* White text color */
  padding: 10px 20px; /* Padding around the button text */
  border: none; /* No border */
  cursor: pointer; /* Show a pointer cursor on hover */
  font-size: 16px; /* Font size */
  border-radius: 5px; /* Rounded corners */
  transition: background-color 0.3s ease; /* Smooth background color transition on hover */
  
  &:hover {
    background-color: #2980b9; /* Darker blue background color on hover */
  }
`;

export const StyledBtn = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  margin:10px 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

export const DarkModeSwitchContainer = styled.div`
  display: flex;
  align-items: center;
 
`;

export const ToggleButton = styled.button`
  background-color: ${props => !props.darkMode ? "black" : "#fff"};
  color: ${props => !props.darkMode ? "#fff" : "black"};
  padding: 1vh 1vw;
  border: none;
  border-radius: 10px;
  position:absolute;
  top:2vh;
  left:${props => props.left ? "0" : null};
  right:${props => props.right ? "0 !important" : null};
  cursor: pointer;
  transition: background-color 0.3s ease;

`;






