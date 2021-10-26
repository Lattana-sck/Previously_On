import styled from 'styled-components';


export const NavMenuStyle = styled.div`
    nav {
        width: 100%;
        margin: 0 auto;
        font-family: 'Poppins';
      }
      nav ul {
        list-style: none;
        text-align: center;
      }
      nav ul li {
        display: inline-block;
      }
      nav ul li a {
        display: block;
        padding: 15px;
        text-decoration: none;
        color: black;
        font-weight: 800;
        text-transform: uppercase;
        margin: 0 10px;
      }
      nav ul li a,
      nav ul li a:after,
      nav ul li a:before {
        transition: all .5s;
      }
      nav ul li a:hover {
        color: #555;
      }
      
      nav.stroke ul li a,
      nav.fill ul li a {
        position: relative;
      }
      nav.stroke ul li a:after,
      nav ul li a:after {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 0%;
        content: '.';
        color: transparent;
        background: #aaa;
        height: 1px;
      }
      nav.stroke ul li a:hover:after {
        width: 100%;
      }
      
      nav.fill ul li a {
        transition: all 2s;
      }
      
      nav.fill ul li a:after {
        text-align: left;
        content: '.';
        margin: 0;
        opacity: 0;
      }
      nav.fill ul li a:hover {
        color: #fff;
        z-index: 1;
      }
      nav.fill ul li a:hover:after {
        z-index: -10;
        animation: fill 1s forwards;
        -webkit-animation: fill 1s forwards;
        -moz-animation: fill 1s forwards;
        opacity: 1;
      }
      .free_shipping {
        background-color: #be9d4f;
        color: white;
        text-align: center;
        font-family: 'Poppins';
        font-size: large;
      }
      #cart_css {
        
      }
`;

export const LiStyle = styled.div`
    
      `;