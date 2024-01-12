import { css } from 'lit'

export default css`

@keyframes blinker {
  50% {
    opacity: 0;
  }
}

hr {
    width: 100%;
    border-color: var(--divider-color);
    }

ha-card {
/* --primary-backgound-color: #111111;
    --secondary-background-color:#282828;
    --primary-text-color:#e1e1e1;
    --card-background-color: #1c1c1c;
    --primary-color: #03a9f4;
    -secondary-text-color: #e1e1e1;
    --divider-color: rgba(225, 225, 225, .12); */

    /* --slider-height: 350px; */
    /* --slider-width: 50px; */
    --label-width: calc(var(--slider-width) - 15%); 
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    /* background-color: var(--card-background-color); */
    /* border: 1px solid rgb(214, 203, 203); */
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    flex-direction: column;
    padding: 20px;
}


        .ha-icon-option {
            color: var(--state-icon-color);
        }

        .ha-icon-alert {
          margin: 10px 20px;
          color: red;
          animation: blinker 1.5s linear infinite;
        }

        ha-switch {
            cursor: Pointer;
        }

        .main-container {
            display: flex;
            width: 100%;
            flex-direction: column;
            
        }

        .select-options-container, .info-container {
            display: flex;
            flex-direction:row;
            
        }

        .select-options-item{
            width: 100%;
            border: 3px double var(--divider-color);
        }

        .info-item {
            width: 100%;
            border: 3px double var(--divider-color);
        }

        .info-value {
            width: 100%;
            display: flex;
            justify-content: center;
            
        }

        .info-item-title {
            height: 18px;
            font-size: smaller;
            background-color: var(--mdc-select-fill-color);
            display: flex;
            justify-content: center;
        }

        .options-container {
            display: flex;
            flex-direction: row;
            flex-grow: 1;
        }

        .options-left {
            width: 50%;
        }

        .options-right {
            width: 50%;
            /* height: 100px; */
            
        }
        .option-select-title {
            height: 18px;
            padding-left: 1em;
            font-size: smaller;
            background-color: var(--mdc-select-fill-color);
        }

        .options-select {
            padding: 1px 0px 1px 0.6em;
            font-size: 1em;
            outline: none;
            border-top-color: transparent;
            border-right-color: transparent;
            border-left-color: transparent;
            border-bottom: 1px solid var(--mdc-select-fill-color);
            width: 100%;
        }

        .space-between-options-item {
            margin: 15px 0px 15px 15px;
            display:flex; 
            justify-content:space-between;
            font-size: calc(var(--card-width) / (220/7));
        }


        .lux-container-top {
            display:flex;
            flex-direction: row;
            margin-top:10px;
            background-color: var(--mdc-select-fill-color);
            border-top: 3px double var(--divider-color);
            border-left: 3px double var(--divider-color);
            border-right: 3px double var(--divider-color);
        }

        .lux-container-bottom {
            display:flex;
            flex-direction: row;
            border-bottom: 3px double var(--divider-color);
            border-left: 3px double var(--divider-color);
            border-right: 3px double var(--divider-color);
        }

        .lux-center-item {
            width:15%;
            display:flex;
            align-items:center;
            justify-content: center;
        }
    
        .reset {
            display: grid;
            grid-template-columns: 50% 50%;
            width:100%;
            gap: 10px 10px;

        }
        .grid-item-reset {
            cursor: pointer;
            width:100%;
            aspect-ratio: 5 / 1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;
            backgound-color: red;
            border: 1px solid var(--divider-color);
            border-radius: 15px;
            background: linear-gradient(135deg, transparent, rgba(0, 0, 0, 0.15));
        }

        .grid-item-content {
            display:flex;
            flex-direction: row;
            width: 60%;
            justify-content: center;
            align-items: center;
        }

    
    
    .gates-container {
        display:flex;
        flex-direction: row;
        /* width:100%;  */
        justify-content: center;
        /* background-color: burlywood; */
        /* width: var(--card-width2); */
        // overflow: hidden;
        margin-inline: 20px;
    }
    .inner-gates-container {
        width:45px;
        display:flex;
        flex-direction:column;
        align-items:left;
        /* height:100%; */
        /* margin:auto; */
    }
    /* .gates-container > .inner-gates-container > .cover {
    width: var(--coverdistance);
    display:inline-block;
    } */
    
    // .div-input-value{
    //     height: calc(var(--slider-width) / 4);
    //     margin-left: calc(var(--slider-width) / 2.5);
    //     margin-top: 15%;
    // }

    h2{
        /* z-index: 1; */
        color: var(--card-background-color);
    border: 1px solid var(--divider-color);
    background-color: var(--primary-color);
    width: 15px;
    height:12px;
    border-radius: 3px;;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;;
    margin-top:-10px;
    position: relative;
    left: -3px;
    top: 11px;

    }

    input[type=range][orient=vertical] {
      appearance: slider-vertical;
      width: 8px;
      height: 100%;
      padding: 0 5px;
      opacity: 0;
      border-radius: 0px;
  }


  input[type=range][orient=vertical]:hover {
    opacity: 1;
  }


    .halfslidertext {
      text-align: center;
      background-color: var(--primary-background-color);
      aspect-ratio: 1 / 1;
      font-size: calc(var(--card-width) / (220/7));
      line-height: var(--halfsliderwidth);

    }

    .distance_sensor_value {
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--primary-backgound-color);
        font-size: 12px;
        border: 1px solid var(--divider-color);
        width: 25px;
        aspect-ratio: 2 / 1;
        border-radius: 5px;
        position: relative;
        left: -28px;
        
    color: var(--primary-text-color);
    display: flex;

    margin-bottom: 4px;
    
    font-size: calc(var(--slider-width) /4);
    margin-top:0;
    margin-left: 14px;
    margin-right: 14px;;
    }
    /* .distance_sensor_value:after {
    content: "%";
    padding-left: 1px;
    font-size: 10px;
    } */

    .value-off {
      z-index: 1;
      display: flex;
      align-self: center;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      border: 1px solid var(--divider-color);
      width: 34px;
      aspect-ratio: 2 / 1;
      border-radius: 5px;
      background-color: var(--disabled-text-color);
      color: var(--card-background-color);
      margin-bottom: 5px;
      margin-top: 11px;
    }

    .g-name {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--primary-backgound-color);
      align-self: center;
      border: 1px solid var(--divider-color);
      width: 40px;
      aspect-ratio: 2 / 1;
      border-radius: 5px;
      color: var(--primary-text-color);
      display: flex;
      margin-bottom: 10px;
      font-size: 10px;
      margin-top: 10px;
      margin-left: 14px;
      margin-right: 14px;
      cursor: pointer; /* Add cursor pointer for better user experience */
    
      transition: background-color 0.3s; /* Add transition for a smooth effect */
    
      /* Styles for the tooltip */
      white-space: nowrap;
    }
    
    .g-name::before {
      content: "from g" attr(data-gfrom) " to g" attr(data-gto);
      position: absolute;
      top: -35px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 1;
    }
    
    .g-name:hover {
      background-color: /* Your hover background color */;
    }
    
    .g-name:hover::before {
      opacity: 1;
    }

    .g-name-off {

        background-color: var(--disabled-text-color);
        color:var(--card-background-color)

        }

        .slider-off {
        border: 1px solid var(--divider-color);
        height: 279px;
        width: 45px;
        color: var(--disabled-text-color);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 37.5px;
    
    

    }
    
    
    .range-holder {
    height: var(--slider-height);
    position:relative;
    cursor:pointer;
    /* display: block; */
    
    }
    .range-holder input[type="range"] {
    outline: 0;
    cursor: pointer;
    // border: 1px solid var(--divider-color);
    width: var(--slider-height);
    margin: 0;
    transition: box-shadow 0.2s ease-in-out;
    -webkit-transform:rotate(270deg);
    -moz-transform:rotate(270deg);
    -o-transform:rotate(270deg);
    -ms-transform:rotate(270deg);
    transform:rotate(270deg);
    overflow: hidden;
    height: var(--halfsliderwidth);
    -webkit-appearance: none;
    background: linear-gradient(to right, rgba(255, 0, 0, 0.4) 96%, rgba(255, 0, 0, 0.4) 4%);
    /* background-size: 30% 100%; */
    background-repeat: no-repeat;
    position: absolute;
    top: calc(50% - (var(--halfsliderwidth) / 2));
    right: calc(50% - (var(--slider-height) / 2));
    }



    .range-holder input[type="range"]::-webkit-slider-runnable-track {
    height: var(--halfsliderwidth);
    -webkit-appearance: none;
    color: #e0c2c2;
    margin-top: -1px;
    transition: box-shadow 0.2s ease-in-out;
    }
    .range-holder input[type="range"]::-webkit-slider-thumb {
    width: 6px;
    -webkit-appearance: none;
    height: var(--halfsliderwidth);
    cursor: ns-resize;
    background: var(--primary-color);
    border-radius: 5px;
    transition: box-shadow 0.2s ease-in-out;
    position: relative;
    }


    .number-of-gates {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 12% 88%;

        

        /* background-color: var(--switch-checked-button-color); */
    }

    .input-number-of-gates {
        appearance: none;
        flex-grow: 1;
        background-color:  transparent;
        border: 1px solid var(--divider-color);
        border-radius: 0px 10px 10px 0px;
        margin-left:10.1%;
        outline: none;
        overflow: hidden;


        /* padding-right: 10px; */
    }

    .input-number-of-gates::-webkit-slider-thumb {
        appearance: none;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 3px solid var(--primary-color);
        box-shadow: calc((var(--card-width) + 7px) * -1 ) 0 0 400px #27a0ff;
    }

    .ruler-meter-div {
        background-color: rgba(0, 0, 0, 0.1);
        width: 100%;
        height: 100%;
        border-radius: 0px 0px 9px 9px;
    }
    .ruler-meter-div-meter {
        background-color: rgba(255, 0, 0, 0.6);
        
        height: 100%;
        border-radius: 0px 4px 4px 9px;
    } 

    .select-ld-device {
    padding: 0.6rem;
    border-color: transparent;
    background-color: transparent;
    outline: none;
    font-size: large;
    cursor: pointer;
    }

    .div-timeout {

    width: 100%;
    border: none;
    outline: none;
    text-align: center;
    background-color: transparent;
    }

    /* buttons */

    a {
        text-decoration: none;
        color: inherit;
        display: flex;
        align-items: center;
        width:  fit-content;
        

        }

        .cta {
        position: relative;
        /* padding: 5px 10px; */
        transition: all 0.2s ease;
        height: 30px;
        cursor: pointer;
        /* width: 350px; */
        }
        .cta:before {
        content: "";
        position: absolute;
        /* top: 0;
        left: 0; */
        display: block;
        border-radius: 28px;
        background: var(--primary-color);
        aspect-ratio: 1 / 1;
        height: 100%;
        transition: all 0.3s ease;
        }
        .cta span {
        position: relative;
        font-size: 8px;
        line-height: 18px;
        font-weight: 900;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        vertical-align: middle;
        margin: 0px 10px 0px 10px;
        
        
        }

        .cta:hover,
        .cta:hover > span {
            color: var(--card-background-color);
        }

        .cta:hover:before {
            width: 100%;
            background: var(--primary-color);
            color: var(--card-background-color);
        }

        .cta:active, .grid-item-reset:active {
        transform: scale(0.96);
        border-color: var(--primary-color);
        }

        .cta-active {
            width: 100%;
            background: var(--primary-color);
            color: var(--card-background-color);
            border-radius: 15px;
            width:  fit-content;
        }

        .man-meter {
            cursor: pointer;
            --mdc-icon-size: 50px;
            transform: scaleX(-1);
            -moz-transform: scaleX(-1);
            -webkit-transform: scaleX(-1);
            -ms-transform: scaleX(-1);
            margin-top:30px
        }


        [slider] {
            position: relative;
            height: 14px;
            border-radius: 10px;
            text-align: left;
            margin: 80px 0px 10px 8px;
          }
          
          [slider] > div {
            position: absolute;
            left: 13px;
            right: 15px;
            height: 14px;
          }
          
          [slider] > div > [inverse-left] {
            position: absolute;
            left: 0;
            height: 6px;
            border-radius: 10px;
            // background-color: #ccc;
            background: var(--primary-color);
            // margin: 0 7px;
          }
          
          [slider] > div > [inverse-right] {
            position: absolute;
            right: 0;
            height: 6px;
            border-radius: 10px;
            background: var(--primary-color);
            // margin: 0 7px;
          }
          
          [slider] > div > [range] {
            position: absolute;
            left: 0;
            height: 6px;
            border-radius: 14px;
            background: var(--primary-color);;
          }
          
          // [slider] > div > [thumb] {
          //   position: absolute;
          //   top: -7px;
          //   z-index: 2;
          //   height: 28px;
          //   width: 28px;
          //   text-align: left;
          //   margin-left: -11px;
          //   cursor: pointer;
          //   box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
          //   background-color: #fff;
          //   border-radius: 50%;
          //   outline: none;
          // }

          // [slider] > div > [thumb] {
          //   position: absolute;
          //   top: -7px;
          //   z-index: 2;
          //   height: 28px;
          //   width: 28px;
          //   text-align: left;
          //   margin-left: -11px;
          //   cursor: pointer;
          //   box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
          //   background-color: #fff;
          //   border-radius: 50%;
          //   outline: none;
          // }

          [slider] > div > [thumb] {
            position: absolute;
            margin-left: -3px;
            top: -10px;
            z-index: 3;
            background-color: var(--primary-color); 
            color: #fff;
            width: 11px;
            height: 28px;
            border-radius: 28px;
            -webkit-border-radius: 2px;
            align-items: center;
            -webkit-justify-content: center;
            justify-content: center;
            text-align: center;
            cursor: pointer;
          }

          [slider] > div > [thumb]:after {
            position: absolute;
            content: "";
            left: 0px;
            border-radius: 16px;
            top: -9px;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom-width: 16px;
            border-bottom-style: solid;
            border-bottom-color: var(--primary-color);
            cursor: pointer;
          }

          // [slider] > div > [thumb] {
          //   position: absolute;
          //   top: -11px;
          //   z-index: 2;
          //   height: 28px;
          //   width: 4px;
          //   text-align: left;
          //   // margin-left: -11px;
          //   cursor: pointer;
          //   box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);
          //   background-color: #fff;
          //   // border-radius: 50%;
          //   outline: none;
          // }
          
          [slider] > input[type="range"] {
            position: absolute;
            pointer-events: none;
            -webkit-appearance: none;
            z-index: 3;
            height: 14px;
            top: -2px;
            width: 100%;
            -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
            filter: alpha(opacity=1);
            -moz-opacity: 0;
            -khtml-opacity: 0;
            opacity: 0;
          }
          
          div[slider] > input[type="range"]::-ms-track {
            -webkit-appearance: none;
            background: transparent;
            color: transparent;
          }
          
          div[slider] > input[type="range"]::-moz-range-track {
            -moz-appearance: none;
            background: transparent;
            color: transparent;
          }
          
          div[slider] > input[type="range"]:focus::-webkit-slider-runnable-track {
            background: transparent;
            border: transparent;
          }
          
          div[slider] > input[type="range"]:focus {
            outline: none;
          }
          
          div[slider] > input[type="range"]::-ms-thumb {
            pointer-events: all;
            width: 18px;
            height: 28px;
            border-radius: 0px;
            border: 0 none;
            background: red;
            cursor: pointer;
          }
          
          div[slider] > input[type="range"]::-moz-range-thumb {
            pointer-events: all;
            width: 28px;
            height: 28px;
            border-radius: 0px;
            border: 0 none;
            background: red;
            cursor: pointer;
          }
          
          div[slider] > input[type="range"]::-webkit-slider-thumb {
            pointer-events: all;
            width: 28px;
            height: 28px;
            border-radius: 0px;
            border: 0 none;
            background: red;
            -webkit-appearance: none;
            cursor: pointer;
          }
          
          div[slider] > input[type="range"]::-ms-fill-lower {
            background: transparent;
            border: 0 none;
          }
          
          div[slider] > input[type="range"]::-ms-fill-upper {
            background: transparent;
            border: 0 none;
          }
          
          div[slider] > input[type="range"]::-ms-tooltip {
            display: none;
          }
          
          [slider] > div > [sign] {
            opacity: 0;
            position: absolute;
            margin-left: -11px;
            top: -78px;
            z-index: 3;
            background-color: transparent;
            // background-color: var(--primary-color);
            color: #fff;
            width: 28px;
            height: 28px;
            // border-radius: 28px;
            // -webkit-border-radius: 28px;
            align-items: center;
            -webkit-justify-content: center;
            justify-content: center;
            text-align: center;
            font-size: 12px;
            font-weight: 700;
            line-height: 28px;
            
          }
          
          [slider] > div > [sign]:after {
            position: absolute;
            content: "";
            width: 28px;
            height: 28px;
            left: 50%;
            // border-radius: 16px;
            // top: 19px;
            background-color:red;
            z-index: -1;
            transform: translateX(-50%) rotate(45deg);
            border: 3px solid var(--primary-color);
            border-top-left-radius: 50%;
            border-top-right-radius: 50%;
            border-bottom-left-radius: 50%;
            // border-left: 14px solid transparent;
            // border-right: 14px solid transparent;
            // border-top-width: 16px;
            // border-top-style: solid;
            // border-top-color: var(--primary-color);
          }
          

          [slider]:hover > div > [sign] {
            opacity: 1;
          }

          .unavailable {
            font-size: 18px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin: 10px 0 10px 0;
          }

          // gmove & gstill
          .st0{fill:var(--divider-color)}
          .st1{fill:none;stroke:var(--divider-color);stroke-miterlimit:10;}
          .st2{fill:var(--primary-text-color);}
          .st4{font-size:10px;}
          .st5{fill:none;stroke:var(--divider-color);stroke-miterlimit:10;}



          
`