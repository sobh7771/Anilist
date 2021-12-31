import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *{
    padding:0;
    margin:0;
    box-sizing:border-box;
  }

  html,body{
    overflow-x:hidden;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
    background-color: #EDF1F5;
    color: #647380;
  }

  .container {
    max-width: 114rem;
    margin: 0 auto;
    padding: 0 1.6rem;
  }


  a {
    text-decoration: none;
    font: inherit;
  }

  ul{list-style:none;}

  h1{
        font-size: 1.9rem;
    font-weight: 400;
  }

  h2 {
    font-size: 1.4rem;
    font-weight: 500;
  }

  .link{
   		transition: 0.15s;

		&:hover {
			color: #3db4f2;
		}
  }

`;
