import React from "react";
import styled from "styled-components";

const FloatingButton = styled.button`
    display: block;
    position: fixed;
    bottom: 30px;
    right: 40px;
    z-index: 9999;
    border: none;
    outline: none;
    color: white;
    cursor: pointer;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    background-color: #5F22D9;
`
export default FloatingButton