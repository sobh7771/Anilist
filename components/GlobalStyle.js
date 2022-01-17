import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  .preload * {
    transition: none !important;
  }
  
  * {
    padding:0;
    margin:0;
    box-sizing:border-box;
  }

  html, body {
    overflow-x:hidden;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
    background-color: #EDF1F5;
    color: #647380;
  }

  .container {
    max-width: 114rem;
    margin: 0 auto;
    padding: 0 1.6rem;
    width: 100%;
  }


  a {
    text-decoration: none;
    font: inherit;
  }

  ul { list-style:none; }

  h1 {
    font-size: 1.9rem;
    font-weight: 400;
  }

  h2 {
    font-size: 1.4rem;
    font-weight: 500;
  }

  .heading-3 {
    display: flex;
    justify-content: space-between;
    color: rgb(100, 115, 128);
    font-family: Overpass;
    font-weight: 700;

    p:first-child {
      letter-spacing: 0.03em;
      text-transform: uppercase;
      margin-bottom: 20px;
    }

    p:last-child {
      color:#8ba0b2;
      font-size:1.2rem;
    }
  }

  .link{
    transition: 0.15s;

		&:hover {
			color: #3db4f2;
		}
  }

  .mb-1 {
    margin-bottom:1rem;
  }

  .name {
		color: #5c728a;
		font-size: 1.2rem;
	}

	.role {
		color: #9299a1;
		font-size: 1.1rem;
	}

  .load-more {
    background:#fafafa;
    padding:1.4rem;
    border:0;
    border-radius:4px;
    width:100%;
    font-weight: 600;
    color:#5c728a;
    cursor:pointer;

    &:disabled{
      cursor:not-allowed;
      opacity: 0.5;
    }
  }

  .create-new-thread {
    font-size: 1.2rem;
    color: #7a858f;
  }

  .custom-scrollbar {

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      transition: 0.2s linear;
        &:hover {
          background-color: #eee;
          opacity: 0.9;
        }
    }

    &::-webkit-scrollbar-thumb {
      transition: background-color 0.2s linear;
      background: #aaa;
      border-radius: 6px;
        &:hover {
          background-color: #999;
        }
    }
  }

`;
