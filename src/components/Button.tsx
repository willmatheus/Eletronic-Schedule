import styled from "styled-components";

const handleColorStatus: (color : string | any) => string =
    function(color : string | any){
        if (color == "primary")
          return '#5F22D9'
        else
          return '#51D6CA'
    }
    

const Button = styled.button`
  border: none;
  outline: none;
  color: white;
  background-color: ${({color}) => handleColorStatus(color)};
  cursor: pointer;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-left: 10px;
`

export default Button