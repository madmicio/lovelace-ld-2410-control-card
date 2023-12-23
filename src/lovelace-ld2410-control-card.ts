import { type CSSResultGroup , html, LitElement } from "lit";
import { customElement, property } from 'lit/decorators';
import { HomeAssistant } from "custom-card-helpers";
import styles from './styles'

import "./editor";
// import { getld240Device } from "./utils";
import { HomeAssistantFixed, WindowWithCards } from "./types";
import { CARD_TAG_NAME, CARD_VERSION, EDITOR_CARD_TAG_NAME } from "./const";

const WideCardTEst = 'v0.1';
console.groupCollapsed("%c LD 2410 CARD %c "+WideCardTEst+" installed ", "color: orange; font-weight: bold; background: black", "color: green; font-weight: bold;"),
console.log("Readme:", "https://github.com/madmicio"),
console.groupEnd();

const line1 = '  LG 2410 Control Card ';
const line2 = `  version: ${CARD_VERSION}  `;
/* eslint no-console: 0 */
console.info(
    `%c${line1}\n%c${line2}`,
    'color: orange; font-weight: bold; background: black',
    'color: white; font-weight: bold; background: dimgray',
  );

// Allow this card to appear in the card chooser menu
const windowWithCards = window as unknown as WindowWithCards;
windowWithCards.customCards = windowWithCards.customCards || [];
windowWithCards.customCards.push({
    type: CARD_TAG_NAME,
    name: "LD2410 Control Card pippo",
    preview: true,
    description: "Control card for LD2410 Device"
});









@customElement(CARD_TAG_NAME)
export class Ld2410CustomCard extends LitElement {
   @property({ attribute: false }) public hass!: HomeAssistant;
   @property({ attribute: false }) private config!: any;
   @property({ type: Number }) private MovingDistanceNumber: any;
   @property({ type: Number }) private StillDistanceNumber: any;
   @property({ type: String }) private ld2410Name: string = '';
   private _parametroDistanza: boolean;
   private _show_main: boolean;
   private _show_options: boolean;
   private _show_gmove: boolean;
   private _show_gstill: boolean;


   static getConfigElement() {
    // Create and return an editor element
    return document.createElement(EDITOR_CARD_TAG_NAME);
}


   static get properties() {
    return {
        hass: {},
        config: {},
        MovingDistanceNumber: { type: Number, reflect: true },
        StillDistanceNumber: { type: Number, reflect: true },
        ld2410Name: {},
        _parametroDistanza: {},
        _show_main: {},
        _show_options: {},
        _show_gmove: {},
        _show_still: {},
    };
}

constructor() {
    super();
    this.ld2410Name = "";  // Imposta il valore iniziale a una stringa vuota
    this.handleSelectChange = this.handleSelectChange.bind(this);  // Bind del contesto per l'evento
    this._parametroDistanza = true;
    this._show_options = false;
    this._show_main = true;
    this._show_gmove = true;
    this._show_gstill = false;
}
    
    


   setConfig(config: any): void {
    // if (!config.precence_entity) {
    //     throw new Error("You need to define precence_entity");
    // }
    
    this.config = config;
    }

    getCardSize() {
        return this.config.entities.length + 1;
      }

    
    render() {
        const browserName = this.getBrowserName();
        const cardWidth = this.getBoundingClientRect().width;
        const sliderWidth = (cardWidth - 52) / 8;
        const sliderHeight = cardWidth / 1.4;
        const cardWidthPadding = cardWidth - 52;
        

        
        const devices = {
            [this.ld2410Name]: {
                "engineering_mode" : `switch.${this.ld2410Name}_engineering_mode`,
                "precence_sensor" : `binary_sensor.${this.ld2410Name}_presence`,
                "DetectionDistance" : `sensor.${this.ld2410Name}_detection_distance`,
                "DistanceMoveDistance" : `sensor.${this.ld2410Name}_moving_distance`,
                "DistanceStillDistance" : `sensor.${this.ld2410Name}_still_distance`,
                "externalLightSensor" : `sensor.${this.ld2410Name}_light_sensor`,
                "move_distance_n_gates" : `number.${this.ld2410Name}_max_move_distance_gate`,
                "StillDistanceSensor" : `sensor.${this.ld2410Name}_still_distance`,
                "still_distance_n_gates" : `number.${this.ld2410Name}_max_still_distance_gate`,
                "distanceResolution" : `select.${this.ld2410Name}_distance_resolution`,
                "baudRate" : `select.${this.ld2410Name}_baud_rate`,
                "lightFunction" : `select.${this.ld2410Name}_light_function`,
                "lightTreshold" : `number.${this.ld2410Name}_light_threshold`,
                "lightSensor" : `sensor.${this.ld2410Name}_light`,
                "outPinLevel" : `select.${this.ld2410Name}_out_pin_level`,
                "outPinStatus" : `binary_sensor.${this.ld2410Name}_out_pin_presence_status`,
                "presenceLed" : `switch.${this.ld2410Name}_deactivate_presence_led`,
                "timeOut" : `number.${this.ld2410Name}_timeout`,
                "greenStatuLed" : `light.${this.ld2410Name}_green_led_status`,
                "bluetooth" : `switch.${this.ld2410Name}_control_bluetooth`,
                "rebootEsp" : `button.${this.ld2410Name}_esp_reboot`,
                "firmwareUpgrade" : `update.${this.ld2410Name}_firmware`,
                "firmwareVersion" : `sensor.${this.ld2410Name}_firmware_version`,
                "factoryRest" : `button.${this.ld2410Name}_factory_reset`,
                "macAddress" : `sensor.${this.ld2410Name}_mac_address`,
                "queryParams" : `button.${this.ld2410Name}_query_params`,
                "restart" : `button.${this.ld2410Name}_restart`,
              "gates": {
                "g1": {
                  "gmove": `number.${this.ld2410Name}_g0_move_threshold`,
                  "gmoveenergie": `sensor.${this.ld2410Name}_g0_move_energy`,
                  "gstill": `number.${this.ld2410Name}_g0_still_threshold`,
                  "gstillenergie": `sensor.${this.ld2410Name}_g0_still_energy`
                },
                "g2": {
                  "gmove": `number.${this.ld2410Name}_g1_move_threshold`,
                  "gmoveenergie": `sensor.${this.ld2410Name}_g1_move_energy`,
                  "gstill": `number.${this.ld2410Name}_g1_still_threshold`,
                  "gstillenergie": `sensor.${this.ld2410Name}_g1_still_energy`
                },
                "g3": {
                  "gmove": `number.${this.ld2410Name}_g2_move_threshold`,
                  "gmoveenergie": `sensor.${this.ld2410Name}_g2_move_energy`,
                  "gstill": `number.${this.ld2410Name}_g2_still_threshold`,
                  "gstillenergie": `sensor.${this.ld2410Name}_g2_still_energy`
                },
                "g4": {
                  "gmove": `number.${this.ld2410Name}_g3_move_threshold`,
                  "gmoveenergie": `sensor.${this.ld2410Name}_g3_move_energy`,
                  "gstill": `number.${this.ld2410Name}_g3_still_threshold`,
                  "gstillenergie": `sensor.${this.ld2410Name}_g3_still_energy`
                },
                "g5": {
                  "gmove": `number.${this.ld2410Name}_g4_move_threshold`,
                  "gmoveenergie": `sensor.${this.ld2410Name}_g4_move_energy`,
                  "gstill": `number.${this.ld2410Name}_g4_still_threshold`,
                  "gstillenergie": `sensor.${this.ld2410Name}_g4_still_energy`
                },
                "g6": {
                  "gmove": `number.${this.ld2410Name}_g5_move_threshold`,
                  "gmoveenergie": `sensor.${this.ld2410Name}_g5_move_energy`,
                  "gstill": `number.${this.ld2410Name}_g5_still_threshold`,
                  "gstillenergie": `sensor.${this.ld2410Name}_g5_still_energy`
                },
                "g7": {
                  "gmove": `number.${this.ld2410Name}_g6_move_threshold`,
                  "gmoveenergie": `sensor.${this.ld2410Name}_g6_move_energy`,
                  "gstill": `number.${this.ld2410Name}_g6_still_threshold`,
                  "gstillenergie": `sensor.${this.ld2410Name}_g6_still_energy`
                },
                "g8": {
                  "gmove": `number.${this.ld2410Name}_g7_move_threshold`,
                  "gmoveenergie": `sensor.${this.ld2410Name}_g7_move_energy`,
                  "gstill": `number.${this.ld2410Name}_g7_still_threshold`,
                  "gstillenergie": `sensor.${this.ld2410Name}_g7_still_energy`
                }
              }
            }
          };
          


                    
          const pippoThreshold = devices[this.ld2410Name].gates.g3.gmove;
          const deviceMap = devices[this.ld2410Name].gates;
          const PrecenceSensorState = this.hass.states[devices[this.ld2410Name].precence_sensor]?.state;
          const PrecenceSensor = devices[this.ld2410Name].precence_sensor;
          const engeneerinMode = this.hass.states[devices[this.ld2410Name].engineering_mode]?.state; 
          const movingDistantSensor: number = Number(this.hass.states[devices[this.ld2410Name].DetectionDistance]?.state);
          const movingDistance: number = Number(this.hass.states[devices[this.ld2410Name].DetectionDistance]?.state);
          const stillDistance: number = Number(this.hass.states[devices[this.ld2410Name].StillDistanceSensor]?.state);

         
          

            this.MovingDistanceNumber = this.hass.states[devices[this.ld2410Name].move_distance_n_gates]?.state;
            this.StillDistanceNumber = this.hass.states[devices[this.ld2410Name].still_distance_n_gates]?.state;

            let distanzaArray;
            let calculatedPercentageMovingDistance;
            let calculatedPercentageStillDistance;
            let calculateddistanceSensor;
            let distanceSvgMan;
            let distanceSvgManBar;
            if (this.hass.states[devices[this.ld2410Name].distanceResolution]?.state === '0.75m') {
                distanzaArray = ["0,75m", "1,50m", "2,25m", "3,00m", "3,75m", "4,50m", "5,25m", "6,00m"];
                distanceSvgMan = ((movingDistance / 600) * 400) + 20;
                distanceSvgManBar = (300 / 600) * 425;

                calculatedPercentageMovingDistance = (movingDistance / 600) * 88;
                calculatedPercentageStillDistance = (stillDistance / 600) * 88;
                calculateddistanceSensor = (movingDistantSensor / 600) * 88;
            } else {
                distanzaArray = ["0.20m", "0.40m", "0.60m", "0.80m", "1.00m", "1.20m", "1.40m", "1.60m"];
                calculatedPercentageMovingDistance = (movingDistance / 160) * 88;
                calculatedPercentageStillDistance = (movingDistance / 160) * 88;
                calculateddistanceSensor = (movingDistantSensor / 160) * 88;
            }
            const movingDistancePerc: number = Number(calculatedPercentageMovingDistance > 88 ? 88 : calculatedPercentageMovingDistance);
            const stillDistancePerc: number = Number(calculatedPercentageStillDistance > 88 ? 88 : calculatedPercentageStillDistance);
            const DistancePerc: number = Number(calculateddistanceSensor > 88 ? 88 : calculateddistanceSensor);
            const valore: number = Number(this.hass.states[devices[this.ld2410Name].move_distance_n_gates]?.state)

            // Verifica se il valore è un numero valido
            if (!isNaN(valore) && valore >= 1 && valore <= distanzaArray.length) {
                // Il valore è valido, imposta il massimo dell'input
                var maxDistanza = (parseFloat(distanzaArray[valore - 1].replace('m', '').replace(',', '.')) * 100);

                console.log(maxDistanza)
            } else {
                // Il valore non è valido, gestisci l'errore o fornisci un valore di default
                console.error("Valore non valido");
            }
          return html`
          ${distanceSvgMan}
          ${maxDistanza}
            <ha-card style="--card-width: ${cardWidthPadding}px;--slider-width: ${sliderWidth}px; --slider-height: ${sliderHeight}px;">
          
            <svg version="1.1"  id="scg  header" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 402 60" style="enable-background:new 0 0 402 60;" xml:space="preserve">
            path
            <style type="text/css">
                .button_color{stroke:var(--fc-button-border-color);stroke-width:1;stroke-miterlimit:10;}
                .presence{fill:url(#presence);}
                .no_presence{fill:url(#no_presence);}
                .hilink_button_overlay{opacity:0.59;fill:url(#SVGID_1_);}
                .shilink_tecxt_color{fill:#045CAA;}
                .hilink_red_color{fill:#D90D1D;}
                .hilink_shape_color{fill:none;stroke:var(--divider-color);stroke-miterlimit:10;}
                .hilink_precence_font_family{font-family:'arial';}
                .hilink_precence_font_size{font-size:12px; fill: var(--primary-text-color);}
            </style>
            <g  >
                <linearGradient id="no_presence" gradientUnits="userSpaceOnUse" x1="308.0827" y1="-2.2635" x2="371.9173" y2="61.571">
                    <stop  offset="0" style="stop-color:#00A000"/>
                    <stop  offset="0.7201" style="stop-color:#006200"/>
                </linearGradient>
                <linearGradient id="presence" gradientUnits="userSpaceOnUse" x1="308.0827" y1="-2.2635" x2="371.9173" y2="61.571">
                    <stop  offset="0" style="stop-color:#FF0000"/>
                    <stop  offset="0.7201" style="stop-color:#AB0000"/>
                </linearGradient>
                <path class="button_color ${PrecenceSensorState === 'on' ? 'presence' : 'no_presence' }" d="M380.5,46.15h-81c-9.11,0-16.5-7.39-16.5-16.5v0c0-9.11,7.39-16.5,16.5-16.5h81c9.11,0,16.5,7.39,16.5,16.5v0
                    C397,38.77,389.61,46.15,380.5,46.15z"/>
                    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="339.9585" y1="15.8067" x2="339.9585" y2="35.4195">
                        <stop  offset="0" style="stop-color:#FFFFFF"/>
                        <stop  offset="0.8026" style="stop-color:;stop-opacity:0"/>
                    </linearGradient>
                <path class="hilink_button_overlay" d="M380.96,15.81h-82c-5.42,0-9.81,4.39-9.81,9.81v0c0,5.42,4.39,9.81,9.81,9.81h82c5.42,0,9.81-4.39,9.81-9.81v0
                    C390.77,20.2,386.38,15.81,380.96,15.81z"/>
                <path @click=${() => this._moreinfo(devices[this.ld2410Name].precence_sensor)} style="fill:transparent; cursor:pointer" d="M380.5,46.15h-81c-9.11,0-16.5-7.39-16.5-16.5v0c0-9.11,7.39-16.5,16.5-16.5h81c9.11,0,16.5,7.39,16.5,16.5v0
                    C397,38.77,389.61,46.15,380.5,46.15z"/>
            </g>
            <g>
                <g>
                    <path class="shilink_tecxt_color" d="M26.46,45.3c-2.05,0-4.07,0-6.22,0c0.49-4.12,0.98-8.19,1.49-12.46c-1.59,0.79-2.88,1.69-4.16,2.6
                        c-1.59,1.12-3.05,2.39-4.4,3.78c-0.34,0.35-0.57,0.7-0.62,1.21c-0.16,1.58-0.37,3.16-0.58,4.82c-2.05,0-4.1,0-6.24,0
                        c-0.2-1.19-0.26-2.45,0.13-3.63c0.7-2.1,0.76-4.29,1.06-6.45c0.4-2.91,0.74-5.83,1.06-8.75c0.07-0.61,0.27-0.79,0.87-0.78
                        c1.8,0.03,3.61,0.01,5.52,0.01c-0.23,1.96-0.46,3.81-0.67,5.6c19.29-12.15,40.47-16.12,62.94-14.68
                        c-1.78,1.18-3.79,1.84-5.75,2.58c0.03,0.37,0.41,0.36,0.58,0.62c-0.13,0.03-0.25,0.08-0.36,0.08c-8.94,0.5-17.76,1.82-26.44,4.02
                        c-5.24,1.33-10.38,2.99-15.37,5.11c-0.63,0.27-0.87,0.62-0.95,1.3c-0.55,4.85-1.14,9.69-1.73,14.53
                        C26.58,44.99,26.51,45.13,26.46,45.3z"/>
                    <path class="shilink_tecxt_color" d="M113.17,20.06c-0.54,4.52-1.06,8.89-1.57,13.25c0.07,0.03,0.15,0.07,0.22,0.1c0.89-0.94,1.78-1.87,2.66-2.82
                        c1.21-1.3,2.42-2.61,3.63-3.91c0.25-0.27,0.49-0.57,0.93-0.57c2.3,0.01,4.61,0,7.14,0c-1.1,1.17-2.05,2.18-3.01,3.18
                        c-1.73,1.8-3.46,3.61-5.23,5.38c-0.47,0.47-0.52,0.76-0.12,1.32c2.17,3.05,4.3,6.12,6.55,9.34c-2,0-3.87-0.1-5.71,0.03
                        c-1.37,0.1-2.23-0.32-2.98-1.49c-1.2-1.86-2.59-3.6-3.9-5.39c-0.18-0.24-0.29-0.56-0.73-0.66c-0.31,2.48-0.61,4.95-0.93,7.45
                        c-2.18,0-4.3,0-6.5,0c0.25-2.13,0.5-4.23,0.75-6.33c0.73-6.02,1.47-12.04,2.18-18.06c0.07-0.61,0.23-0.87,0.9-0.86
                        C109.31,20.08,111.19,20.06,113.17,20.06z"/>
                    <path class="shilink_tecxt_color" d="M88.7,30.68c-0.61,4.95-1.21,9.77-1.81,14.62c-2.1,0-4.12,0-6.27,0c0.77-6.3,1.54-12.54,2.31-18.87
                        c0.95,0,1.82,0,2.69,0c3.94,0,7.88,0,11.82,0c3.49,0,5.88,2.46,5.56,5.94c-0.31,3.42-0.8,6.83-1.21,10.24
                        c-0.1,0.87-0.21,1.73-0.33,2.67c-2.09,0-4.16,0-6.28,0c0.49-4,0.98-7.96,1.44-11.93c0.24-2.08-0.31-2.67-2.39-2.67
                        C92.44,30.67,90.63,30.68,88.7,30.68z"/>
                    <path class="shilink_tecxt_color" d="M61.61,22.48c-0.31,2.54-0.6,4.95-0.89,7.37c-0.37,3.04-0.75,6.07-1.1,9.11c-0.16,1.4,0.57,2.2,2,2.21
                        c2.37,0.01,4.75,0,7.12,0c0.3,0,0.61,0,0.99,0c-0.18,1.44-0.34,2.76-0.51,4.17c-1.46,0-2.89,0-4.32,0c-2.12,0-4.25,0.01-6.37,0
                        c-3.18-0.01-5.59-2.64-5.24-5.85c0.48-4.41,1.04-8.81,1.59-13.21c0.12-0.98-0.14-2.28,0.54-2.84c0.66-0.55,1.89-0.44,2.88-0.58
                        C59.35,22.71,60.4,22.61,61.61,22.48z"/>
                    <path class="shilink_tecxt_color" d="M78.08,45.29c-2.16,0-4.18,0-6.27,0c0.31-2.6,0.61-5.13,0.92-7.67c0.41-3.41,0.83-6.82,1.21-10.23
                        c0.07-0.67,0.23-1,1-0.97c1.77,0.06,3.54,0.02,5.42,0.02C79.59,32.78,78.84,39.01,78.08,45.29z"/>
                    <path class="shilink_tecxt_color" d="M38.19,27.29c-0.78,6.09-1.53,12.02-2.29,18c-2.1,0-4.15,0-6.27,0c0.27-2.19,0.53-4.32,0.8-6.44
                        c0.36-2.82,0.73-5.63,1.08-8.45c0.05-0.43,0.14-0.76,0.6-0.94C34.04,28.69,35.99,27.94,38.19,27.29z"/>
                    <path class="shilink_tecxt_color" d="M51.03,37.01c-3.72,0-7.37,0-11.16,0c0.16-1.3,0.31-2.59,0.46-3.88c0.04-0.33,0.29-0.36,0.56-0.36
                        c3.49,0,6.99,0,10.63,0C51.36,34.23,51.2,35.6,51.03,37.01z"/>
                    <path class="shilink_tecxt_color" d="M101.73,23.51c-5.15-2.02-10.52-2.81-15.8-3.51c-0.18-0.45,0.16-0.5,0.19-0.74
                        c-0.65-0.41-1.32-0.76-2.09-0.97c-0.76-0.21-1.54-0.42-2.15-1.02C86.1,16.71,101.23,21.38,101.73,23.51z"/>
                    <path class="hilink_red_color" d="M73.31,19.18c1.36-0.84,2.77-0.96,3.85-1.73c1.11-0.79,1.13-2.37,2.2-3.57c0.14,2.76,1.19,4.56,4.07,5.04
                        c-1.22,1.04-2.75,0.99-3.6,2.13c-0.79,1.05-1.15,2.32-1.98,3.49c-0.37-1.27-0.12-2.64-0.89-3.69
                        C76.16,19.75,74.76,19.72,73.31,19.18z"/>
                    <path class="hilink_red_color" d="M15.02,20.06c-0.18,1.52-0.34,2.87-0.5,4.27c-2.09,0-4.11,0-6.28,0c0.16-1.32,0.31-2.61,0.47-3.89
                        c0.03-0.26,0.19-0.38,0.45-0.38C11.06,20.06,12.96,20.06,15.02,20.06z"/>
                    <path class="hilink_red_color" d="M23.29,20.06c2.11,0,4.13,0,6.15,0c0.22,1.75,0.07,1.98-1.43,2.59c-1.7,0.69-3.38,1.42-5.27,2.21
                        C22.93,23.21,23.1,21.69,23.29,20.06z"/>
                </g>
                <path class="hilink_shape_color" d="M1,50.98l379.5,0.16c11.88,0.01,21.5-9.62,21.5-21.5v0c0-11.87-9.62-21.5-21.5-21.5h-80.92
                    c-11.92,0-21.59,9.66-21.59,21.59v0c0,5.1-4.14,9.24-9.24,9.23l-128.85-0.15c-5.09-0.01-9.22-4.14-9.22-9.23V18.56
                    c0-5.84-4.74-10.58-10.58-10.58H1"/>
            </g>
            <text transform="matrix(1 0 0 1 152 32.7738)" class="hilink_precence_font_family hilink_precence_font_size">presence detection</text>
            </svg>

        <!-- #############################################################   fine header  ############################################################# -->
        <!-- #############################################################     options    ############################################################# -->

            <div class="main-container">
                <div style="display:flex;flex-direction:row;justify-content: center;align-items: center;font-size: large;"  >setup device:
                ${this.getLD2410DeviceNameDropdown(this.config.devices_name)}
                <div style="flex-grow:1"></div>
                 <ha-icon class="option" style="cursor: pointer;" icon="${this._show_options === false ? 'mdi:cog-outline' : 'mdi:arrow-left-circle'}" @click="${() => { this._show_options = !this._show_options ; this._show_main = !this._show_main; }}"></ha-icon>
                </div>
                <hr>
                ${this._show_options ? html`
                <div class="select-options-container">
                    <div class="select-options-item">
                        <div class="option-select-title">Baud Rate</div>
                        ${this.select_box(devices[this.ld2410Name].baudRate, this.hass.states[devices[this.ld2410Name].baudRate]?.attributes.options, this.hass.states[devices[this.ld2410Name].baudRate]?.state, )}
                    </div>

                    <div class="select-options-item">
                        <div class="option-select-title">Out Pin Level</div>
                        ${this.select_box(devices[this.ld2410Name].outPinLevel, this.hass.states[devices[this.ld2410Name].outPinLevel]?.attributes.options, this.hass.states[devices[this.ld2410Name].outPinLevel]?.state, )}
                    </div>
                </div>
                <div class="select-options-container">
                    <div class="select-options-item">
                        <div class="option-select-title">Light Function</div>
                        ${this.select_box(devices[this.ld2410Name].lightFunction, this.hass.states[devices[this.ld2410Name].lightFunction]?.attributes.options, this.hass.states[devices[this.ld2410Name].lightFunction]?.state, )}
                    </div>
                    <div class="select-options-item">
                        <div class="option-select-title">Distance Resolution</div>
                        ${this.select_box(devices[this.ld2410Name].distanceResolution, this.hass.states[devices[this.ld2410Name].distanceResolution]?.attributes.options, this.hass.states[devices[this.ld2410Name].distanceResolution]?.state, )}
                    </div>
                </div>
                    ${this.hass.states[devices[this.ld2410Name].lightFunction]?.state != 'off' ? html` 
                    <div class="lux-container-top">
                        <div style="flex-grow: 1;padding-left: 1em;">lux treshold</div>
                        <div class="lux-center-item">sensor:</div>
                    </div>
                    <div class="lux-container-bottom">
                    <input 
                            style="flex-grow: 1;" 
                            type="range" 
                            id="lux_treshold" 
                            min="0" 
                            max="255" 
                            .value="${this.hass.states[devices[this.ld2410Name].lightTreshold]?.state}"  
                            @input=${this.onRangeInputMove} 
                            @change=${e => this._setNumber_direct(devices[this.ld2410Name].lightTreshold, devices[this.ld2410Name].engineering_mode, e.target.value)}> 
                        <div class="lux-center-item">${this.hass.states[devices[this.ld2410Name].lightTreshold]?.state}</div>
                        <div class="lux-center-item">${engeneerinMode === 'on' ? this.hass.states[devices[this.ld2410Name].lightSensor]?.state : 'eng off' }</div>
                    </div>
                    ` : html`
                    `}
                <div class="options-container">
                    <div class="options-left">
                        <div class="space-between-options-item">
                            <div style="cursor: pointer;" @click=${() => this._moreinfo(devices[this.ld2410Name].firmwareUpgrade)}>Firmware:</div>
                            <div>${this.hass.states[devices[this.ld2410Name].firmwareUpgrade]?.state === 'on' ? 'update available' : 'updated'}</div>
                        </div>
                        <div class="space-between-options-item">
                            <div style="cursor: pointer;" @click=${() => this._moreinfo(devices[this.ld2410Name].firmwareVersion)}>Firmware ver.:</div>
                            <div>${this.hass.states[devices[this.ld2410Name].firmwareVersion]?.state}</div>
                        </div>
                        <div class="space-between-options-item">
                            <div style="cursor: pointer;" @click=${() => this._moreinfo(devices[this.ld2410Name].macAddress)}>Mac address:</div>
                            <div>${this.hass.states[devices[this.ld2410Name].macAddress]?.state}</div>
                        </div>
                    </div>
                    <div class="options-right">
                        <div class="space-between-options-item">
                            <div style="cursor: pointer;" @click=${() => this._moreinfo(devices[this.ld2410Name].presenceLed)}>${this.hass.states[devices[this.ld2410Name].presenceLed]?.attributes.friendly_name}</div>
                            <ha-switch 
                            .checked="${this.hass.states[devices[this.ld2410Name].presenceLed]?.state === 'on' ? true : false}"
                                @click="${() => this._callservice(devices[this.ld2410Name].presenceLed, 'switch', 'toggle')}"
                            ></ha-switch>
                        </div>
                        <div class="space-between-options-item">
                            <div style="cursor: pointer;" @click=${() => this._moreinfo(devices[this.ld2410Name].greenStatuLed)}>${this.hass.states[devices[this.ld2410Name].greenStatuLed]?.attributes.friendly_name}</div>
                            <ha-switch 
                            .checked="${this.hass.states[devices[this.ld2410Name].greenStatuLed]?.state === 'on' ? true : false}"
                                @click="${() => this._callservice(devices[this.ld2410Name].greenStatuLed, 'light', 'toggle')}"
                            ></ha-switch>
                        </div>
                        <div class="space-between-options-item">
                            <div style="cursor: pointer;" @click=${() => this._moreinfo(devices[this.ld2410Name].bluetooth)}>${this.hass.states[devices[this.ld2410Name].bluetooth]?.attributes.friendly_name}</div>
                            <ha-switch 
                            .checked="${this.hass.states[devices[this.ld2410Name].bluetooth]?.state === 'on' ? true : false}"
                                @click="${() => this._callservice(devices[this.ld2410Name].bluetooth, 'switch', 'toggle')}"
                            ></ha-switch>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="reset">
                    <div class="grid-item-reset" @click="${() => this._callservice(devices[this.ld2410Name].rebootEsp, 'button', 'press')}">
                        <div class="grid-item-content">
                            <ha-icon icon="mdi:power-cycle" ></ha-icon>  
                            <div style="flex-grow:1;margin-left: 6%;color: var(--state-icon-color);">ESP reboot</div>
                        </div>
                    </div>
                    <div class="grid-item-reset" @click="${() => this._callservice(devices[this.ld2410Name].restart, 'button', 'press')}">
                        <div class="grid-item-content">
                            <ha-icon icon="mdi:restart" ></ha-icon>  
                            <div style="flex-grow:1;margin-left: 6%;color: var(--state-icon-color);">LD Restart</div>
                        </div>
                    </div>
                    <div class="grid-item-reset" @click="${() => this._callservice(devices[this.ld2410Name].factoryRest, 'button', 'press')}">
                        <div class="grid-item-content">
                            <ha-icon icon="mdi:restart-alert" ></ha-icon>  
                            <div style="flex-grow:1;margin-left: 6%;color: var(--state-icon-color);">Factory reset</div>
                        </div>
                    </div>
                    <div class="grid-item-reset" @click="${() => this._callservice(devices[this.ld2410Name].queryParams, 'button', 'press')}">
                        <div class="grid-item-content">
                            <ha-icon icon="mdi:database" ></ha-icon>  
                            <div style="flex-grow:1;margin-left: 6%;color: var(--state-icon-color);">Query params</div>
                        </div>
                    </div>
                </div>
                <hr>

                ` : html`



            </div>


        <!-- #############################################################  fine options  ############################################################# -->






        <div class="info-container">
                    <div class="info-item">
                        <div class="info-item-title">Timeout</div>
                        <input class="div-timeout"  type="number" id="timeout" name="timeout" min="${this.hass.states[devices[this.ld2410Name].timeOut]?.attributes.min}" max="${this.hass.states[devices[this.ld2410Name].timeOut]?.attributes.max}" .value="${this.hass.states[devices[this.ld2410Name].timeOut]?.state}"  @change=${e => this._setNumber_direct(devices[this.ld2410Name].timeOut, null, e.target.value)}>
                    </div>

                    <div class="info-item" style="cursor:pointer;" @click=${() => this._moreinfo(devices[this.ld2410Name].outPinStatus)}>
                        <div class="info-item-title">Out Pin </div>
                        <div class="info-value">${this.hass.states[devices[this.ld2410Name].outPinStatus]?.state}</div>
                    </div>
                    <div class="info-item" style="cursor:pointer;" @click=${() => this._moreinfo(devices[this.ld2410Name].DetectionDistance)}>
                        <div class="info-item-title">Distance</div>
                        <div class="info-value">${this.hass.states[devices[this.ld2410Name].DetectionDistance]?.state}</div>
                    </div>
                    <div class="info-item" style="cursor:pointer;" @click=${() => this._moreinfo(devices[this.ld2410Name].DistanceMoveDistance)}>
                        <div class="info-item-title">Move</div>
                        <div class="info-value">${this.hass.states[devices[this.ld2410Name].DistanceMoveDistance]?.state}</div>
                    </div>
                    <div class="info-item" style="cursor:pointer;" @click=${() => this._moreinfo(devices[this.ld2410Name].DistanceStillDistance)}>
                        <div class="info-item-title">Still</div>
                        <div class="info-value">${this.hass.states[devices[this.ld2410Name].DistanceStillDistance]?.state}</div>
                    </div>
                    ${devices[this.ld2410Name].externalLightSensor ? html`
                    <div class="info-item" style="cursor:pointer;" @click=${() => this._moreinfo(devices[this.ld2410Name].externalLightSensor)}>
                        <div class="info-item-title">Lux</div>
                        <div class="info-value" >${this.hass.states[devices[this.ld2410Name].externalLightSensor]?.state}</div>
                    </div>
                    ` : html` `}
                </div>

                <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 450.6 76.4" style="enable-background:new 0 0 450.6 76.4;" xml:space="preserve">
<style type="text/css">
    .meter-principale-rettangolo{fill:var(--mdc-select-fill-color);}
    .meter-principale-testo{fill:var(--primary-text-color);font-family:'Arial-BoldMT';font-size:10px;}
    .meter-principale-shepe{fill:none;stroke:var(--divider-color);stroke-miterlimit:10;}
    .primary_color{fill:var(--primary-color);}
</style>
<rect id="rettangolo_x5F_ruler" y="58.5" class="meter-principale-rettangolo" width="450.6" height="17.9"/>
<g id="misure">
    <rect id="barra-detection" x="0.6" y="58.3" style="fill:red;opacity: 0.40;" width="${distanceSvgManBar}" height="18.1"/>
		<text id="gate-1-text_00000016071961384992556670000012793053045481635972_" transform="matrix(1.0488 0 0 1 9.7402 71.4121)" class="meter-principale-testo">0</text>
	<path class="meter-principale-shepe" d="M16.1,67h6.7c1,0,1.7-0.8,1.7-1.7v-6.7"/>
	<text id="gate-1-text" transform="matrix(1.0488 0 0 1 35.7798 71.4125)" class="meter-principale-testo">0,75m</text>
	<path class="meter-principale-shepe" d="M67.1,67.4h6.7c1,0,1.7-0.8,1.7-1.7V59"/>
	
		<text id="gate-1-text_00000172403478865654996700000009434690586403883428_" transform="matrix(1.0488 0 0 1 85.7788 71.4125)" class="meter-principale-testo">1,50m</text>
	<path class="meter-principale-shepe" d="M117.1,67.4h6.7c1,0,1.7-0.8,1.7-1.7V59"/>
	
		<text id="gate-1-text_00000174604340524944137280000015794942522531559070_" transform="matrix(1.0488 0 0 1 135.7778 71.4125)" class="meter-principale-testo">2,25m</text>
	<path class="meter-principale-shepe" d="M167.1,67.4h6.7c1,0,1.7-0.8,1.7-1.7V59"/>
	
		<text id="gate-1-text_00000099625697548038854210000013000206721289728953_" transform="matrix(1.0488 0 0 1 185.7788 71.4125)" class="meter-principale-testo">3,00m</text>
	<path class="meter-principale-shepe" d="M217.1,67.4h6.7c1,0,1.7-0.8,1.7-1.7V59"/>
	
		<text id="gate-1-text_00000070815017703564489300000010520145297064408724_" transform="matrix(1.0488 0 0 1 235.7788 71.4125)" class="meter-principale-testo">3,75m</text>
	<path class="meter-principale-shepe" d="M267.1,67.4h6.7c1,0,1.7-0.8,1.7-1.7V59"/>
	
		<text id="gate-1-text_00000005964308175057680080000014454426573449790897_" transform="matrix(1.0488 0 0 1 285.7798 71.4125)" class="meter-principale-testo">4,50m</text>
	<path class="meter-principale-shepe" d="M317.1,67.4h6.7c1,0,1.7-0.8,1.7-1.7V59"/>
	
		<text id="gate-1-text_00000085951868237978151280000003226438313236816520_" transform="matrix(1.0488 0 0 1 335.7778 71.4125)" class="meter-principale-testo">5,25m</text>
	<path class="meter-principale-shepe" d="M367.1,67.4h6.7c1,0,1.7-0.8,1.7-1.7V59"/>
	
		<text id="gate-1-text_00000053520815625960183270000016495147803014316929_" transform="matrix(1.0488 0 0 1 385.7769 71.9974)" class="meter-principale-testo">6,00m</text>
	<path class="meter-principale-shepe" d="M417.1,68h6.7c1,0,1.7-0.8,1.7-1.7v-6.7"/>
</g>
<foreignobject transform="matrix(1 0 0 1 ${distanceSvgMan} 14)"    width="12" height="45">
<svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 12 45" style="enable-background:new 0 0 12 45;" xml:space="preserve">
<g id="man">
<path class="primary_color" d="M6,9.7c0.6,0,1.4,0,2.5,0c2.4,0,3.5,3.1,3.5,4.6c0,3.3,0,6.8,0,11.7c0,1.5-1.5,0.6-1.7,1.9
   C9.7,33.4,9.8,37.4,9,41.6c-0.1,0.6-0.7,1.6-2.3,1.6L6,44.9h0l-0.7-1.7c-1.7,0-2.2-1-2.3-1.6c-0.7-4.1-0.6-8.1-1.3-13.7
   C1.5,26.6,0,27.5,0,26c0-4.9,0-8.4,0-11.7c0-1.6,1.1-4.6,3.5-4.6C4.5,9.7,5.4,9.7,6,9.7"/>
<ellipse class="primary_color" cx="6" cy="4.7" rx="4.1" ry="4.1"/>
</g>
</svg>
                </foreignobject>

<g id="radar">

		<g id="layer1_00000146494627415306622150000013077120801947842442_" transform="translate(0,-740.55109)">
			<path id="path4391_00000110451651967434578370000004409614462899860382_" class="primary_color" d="M15.5,756.4c2.5-2.4,4-5.7,4.2-9.3
				l-3.3,0c-0.2,5.5-4.7,9.8-10.2,9.8L6,760.2C9.7,760.2,13,758.7,15.5,756.4L15.5,756.4z M16.3,747L16.3,747L16.3,747z"/>
			<path id="path4395_00000080204113281266067360000004423022825113158022_" class="primary_color" d="M18.9,760c3.4-3.3,5.6-7.8,5.7-12.8
				l-3.3,0c-0.3,8.2-7.1,14.8-15.3,14.8l-0.1,3.4C11,765.3,15.6,763.3,18.9,760L18.9,760z M20,764.8L20,764.8L20,764.8z"/>
			<path id="path4381_00000158728040944148855660000011473676464589785535_" class="primary_color" d="M12,752.8c1.5-1.5,2.5-3.5,2.6-5.8
				l-3.2,0c-0.1,2.8-2.4,5-5.2,5l-0.1,3.2C8.4,755.2,10.5,754.2,12,752.8L12,752.8z M11.4,746.9L11.4,746.9L11.4,746.9z"/>
			<path id="path4411_00000083770962395965472580000005466728432597625011_" class="primary_color" d="M6.4,743.5c1.8,0,3.3,1.6,3.3,3.4
				c0,1.8-1.6,3.3-3.4,3.3c-1.8,0-3.3-1.6-3.3-3.4C3,745,4.5,743.5,6.4,743.5l-0.1,3.3L6.4,743.5z"/>
		</g>

</g>
</svg>

                

                </div>
      


            <div slider id="slider-distance">
                <div>
                <div inverse-left style="width:70%;"></div>
                <div inverse-right style="width:70%;"></div>
                <div range style="left:30%;right:40%;"></div>
                <span thumb style="left:30%;"></span>
                <span thumb style="left:60%;"></span>
                <div sign style="left:30%;">
                    <span id="value">30</span>
                </div>
                <div sign style="left:60%;">
                    <span id="value">60</span>
                </div>
                </div>
                <input type="range" tabindex="0" value="30" max="100" min="0" step="1" oninput="
                this.value=Math.min(this.value,this.parentNode.childNodes[5].value-1);
                var value=(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.value)-(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.min);
                var children = this.parentNode.childNodes[1].childNodes;
                children[1].style.width=value+'%';
                children[5].style.left=value+'%';
                children[7].style.left=value+'%';children[11].style.left=value+'%';
                children[11].childNodes[1].innerHTML=this.value;" />
            
                <input type="range" tabindex="0" value="60" max="100" min="0" step="1" oninput="
                this.value=Math.max(this.value,this.parentNode.childNodes[3].value-(-1));
                var value=(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.value)-(100/(parseInt(this.max)-parseInt(this.min)))*parseInt(this.min);
                var children = this.parentNode.childNodes[1].childNodes;
                children[3].style.width=(100-value)+'%';
                children[5].style.right=(100-value)+'%';
                children[9].style.left=value+'%';children[13].style.left=value+'%';
                children[13].childNodes[1].innerHTML=this.value;" />
            </div>                

                `}

            <hr>

            <a  class="cta ${this.hass.states[devices[this.ld2410Name].engineering_mode]?.state === 'on' ? 'cta-active' : ' ' }"  @click="${() => this._callservice(devices[this.ld2410Name].engineering_mode, 'switch', 'toggle')}">
            <ha-icon icon="mdi:power-cycle" style="padding-left: 3px;color: var(--card-background-color);"  ></ha-icon style="margin: 0 10px 0 10px" >  <span>Engineering mode ${this.hass.states[devices[this.ld2410Name].engineering_mode]?.state}</span>
            </a>

            ${this.hass.states[devices[this.ld2410Name].engineering_mode]?.state === 'on' ? html`
            <div style="display: flex;justify-content:space-between;margin-top: 10px;" >
            <a  class="cta ${this._show_gmove == true && this._show_gstill == false ? 'cta-active' : ' ' }" @click=${() => {
                    this._show_gmove = true;
                    this._show_gstill = false;
                    }}>
                <ha-icon icon="mdi:motion-sensor" style="padding-left: 3px;color: var(--card-background-color);"  ></ha-icon style="margin: 0 10px 0 10px" >  <span>Move</span>
                </a>
                <a  class="cta ${this._show_gmove == false && this._show_gstill == true ? 'cta-active' : ' ' }" @click=${() => {
                    this._show_gmove = false;
                    this._show_gstill = true;
                    }}>
                <ha-icon icon="mdi:motion-sensor" style="padding-left: 3px;color: var(--card-background-color);"  ></ha-icon style="margin: 0 10px 0 10px" >  <span>still</span>
                </a>
                <a  class="cta ${this._show_gmove == true && this._show_gstill == true ? 'cta-active' : ' ' }" @click=${() => {
                    this._show_gmove = true;
                    this._show_gstill = true;
                    }}>
                <ha-icon icon="mdi:account-multiple" style="padding-left: 3px;color: var(--card-background-color);"  ></ha-icon style="margin: 0 10px 0 10px" >  <span>move & still</span>
                </a>
            </div>
            

            
            <hr>

        <!-- ###########################################################    move_gates_section    ########################################################### -->
        ${this._show_gmove == true ? html`
        <div class="gates-container">
            ${Object.keys(deviceMap).map((gateKey, index) => {
            const gate = deviceMap[gateKey];
            const gMove= gate.gmove;
            const GMoveStates = this.hass.states[gate.gmove]; 
            const GMoveState = parseInt(GMoveStates?.state) || 0;
            const gMoveEnergieStates = this.hass.states[gate.gmoveenergie];
            const gMoveEnergieState = parseInt(gMoveEnergieStates?.state) || 0;
            //   console.log(gate.gmove);


            return gMove ? html`
            <div class="inner-gates-container">
                ${this.MovingDistanceNumber >= index + 1 ? html`
                <div class="div-input-value">
                    <h2 style="${gMoveEnergieState >= GMoveState ? 'background-color: red; color: white;' : ''}">
                        ${GMoveState}
                    </h2>
                </div>
                <div class="distance_sensor_value">
                    ${gMoveEnergieState}
                    <span style="font-size: smaller;">%</span>
                </div>
                <div class="range-holder" style="${this.MovingDistanceNumber >= index + 1 ? '' : 'display: none;'}">
                    <input
                    type="range"
                    min="0"
                    max="100"
                    .value="${GMoveState}"
                    style="background-size: ${gMoveEnergieState}% 100%;"
                    @change=${e => this._setNumber(GMoveStates, e.target.value)}>
                </div>
                ` : html`
                <div class="div-input-value"></div>
                <div class="distance_sensor_value value-off">off</div>
                <div class="slider-off">off</div>
                `}
                <div class="g-name ${this.MovingDistanceNumber >= index + 1 ? '' : 'g-name-off'}" >G${index + 1}</div>
            </div>
            ` : html`
            `;
            })}
            </div>
            <input 
            type="range" 
            id="n_move" 
            min="0" 
            max="8" 
            .value="${this.MovingDistanceNumber}"  
            @input=${this.onRangeInputMove} 
            @change=${e => this._setNumber_direct_move(devices[this.ld2410Name].move_distance_n_gates, devices[this.ld2410Name].engineering_mode, e.target.value)}> 

            
            
            
            
            
            <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 400 32" style="enable-background:new 0 0 400 32;" xml:space="preserve">
            <style type="text/css">
                .st0{fill:var(--divider-color)}
                .st1{fill:none;stroke:var(--divider-color);stroke-miterlimit:10;}
                .st2{fill:var(--primary-text-color);}
                .st3{font-family:'Arial-BoldMT';}
                .st4{font-size:10px;}
                .st5{fill:none;stroke:var(--divider-color);stroke-miterlimit:10;}
            </style>
            <g id="gruppo-ruler">
                <foreignobject transform="matrix(1 0 0 1 -1 13.75)"    width="402" height="18">
                    <div class="ruler-meter-div">
                        <div class="ruler-meter-div-meter" style="width: ${movingDistancePerc}%">
                        </div>
                    </div>
                </foreignobject>
                <g id="ruler">
                    <line class="st1" x1="0" y1="13.57" x2="0" y2="0.3"/>
                    <line class="st1" x1="400" y1="13.57" x2="400" y2="0.3"/>
                    <line class="st1" x1="100" y1="13.57" x2="100" y2="0.3"/>
                    <line class="st1" x1="50" y1="13.57" x2="50" y2="0.3"/>
                    <line class="st1" x1="150" y1="13.57" x2="150" y2="0.3"/>
                    <line class="st1" x1="200" y1="13.57" x2="200" y2="0.3"/>
                    <line class="st1" x1="300" y1="13.57" x2="300" y2="0.3"/>
                    <line class="st1" x1="250" y1="13.57" x2="250" y2="0.3"/>
                    <line class="st1" x1="350" y1="13.57" x2="350" y2="0.3"/>
                    <line class="st1" x1="10" y1="13.57" x2="10" y2="7.06"/>
                    <line class="st1" x1="20" y1="13.57" x2="20" y2="7.06"/>
                    <line class="st1" x1="30" y1="13.57" x2="30" y2="7.06"/>
                    <line class="st1" x1="40" y1="13.57" x2="40" y2="7.06"/>
                    <line class="st1" x1="60" y1="13.57" x2="60" y2="7.06"/>
                    <line class="st1" x1="70" y1="13.57" x2="70" y2="7.06"/>
                    <line class="st1" x1="80" y1="13.57" x2="80" y2="7.06"/>
                    <line class="st1" x1="90" y1="13.57" x2="90" y2="7.06"/>
                    <line class="st1" x1="110" y1="13.57" x2="110" y2="7.06"/>
                    <line class="st1" x1="120" y1="13.57" x2="120" y2="7.06"/>
                    <line class="st1" x1="130" y1="13.57" x2="130" y2="7.06"/>
                    <line class="st1" x1="140" y1="13.57" x2="140" y2="7.06"/>
                    <line class="st1" x1="160" y1="13.57" x2="160" y2="7.06"/>
                    <line class="st1" x1="170" y1="13.57" x2="170" y2="7.06"/>
                    <line class="st1" x1="180" y1="13.57" x2="180" y2="7.06"/>
                    <line class="st1" x1="190" y1="13.57" x2="190" y2="7.06"/>
                    <line class="st1" x1="210" y1="13.57" x2="210" y2="7.06"/>
                    <line class="st1" x1="220" y1="13.57" x2="220" y2="7.06"/>
                    <line class="st1" x1="230" y1="13.57" x2="230" y2="7.06"/>
                    <line class="st1" x1="240" y1="13.57" x2="240" y2="7.06"/>
                    <line class="st1" x1="260" y1="13.57" x2="260" y2="7.06"/>
                    <line class="st1" x1="270" y1="13.57" x2="270" y2="7.06"/>
                    <line class="st1" x1="280" y1="13.57" x2="280" y2="7.06"/>
                    <line class="st1" x1="290" y1="13.57" x2="290" y2="7.06"/>
                    <line class="st1" x1="310" y1="13.57" x2="310" y2="7.06"/>
                    <line class="st1" x1="320" y1="13.57" x2="320" y2="7.06"/>
                    <line class="st1" x1="330" y1="13.57" x2="330" y2="7.06"/>
                    <line class="st1" x1="340" y1="13.57" x2="340" y2="7.06"/>
                    <line class="st1" x1="360" y1="13.57" x2="360" y2="7.06"/>
                    <line class="st1" x1="370" y1="13.57" x2="370" y2="7.06"/>
                    <line class="st1" x1="380" y1="13.57" x2="380" y2="7.06"/>
                    <line class="st1" x1="390" y1="13.57" x2="390" y2="7.06"/>
                </g>
                <g id="misure">
                    <text id="gate-1-text" transform="matrix(1.0488 0 0 1 10.2171 26.6973)" class="st2 st3 st4">${distanzaArray[0]}</text>
                    <path class="st5" d="M41.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000172403478865654996700000009434690586403883428_" transform="matrix(1.0488 0 0 1 60.2162 26.6973)" class="st2 st3 st4">${distanzaArray[1]}</text>
                    <path class="st5" d="M91.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000174604340524944137280000015794942522531559070_" transform="matrix(1.0488 0 0 1 110.2152 26.6973)" class="st2 st3 st4">${distanzaArray[2]}</text>
                    <path class="st5" d="M141.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000099625697548038854210000013000206721289728953_" transform="matrix(1.0488 0 0 1 160.2162 26.6973)" class="st2 st3 st4">${distanzaArray[3]}</text>
                    <path class="st5" d="M191.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000070815017703564489300000010520145297064408724_" transform="matrix(1.0488 0 0 1 210.2162 26.6973)" class="st2 st3 st4">${distanzaArray[4]}</text>
                    <path class="st5" d="M241.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000005964308175057680080000014454426573449790897_" transform="matrix(1.0488 0 0 1 260.2171 26.6973)" class="st2 st3 st4">${distanzaArray[5]}</text>
                    <path class="st5" d="M291.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000085951868237978151280000003226438313236816520_" transform="matrix(1.0488 0 0 1 310.2152 26.6973)" class="st2 st3 st4">${distanzaArray[6]}</text>
                    <path class="st5" d="M341.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000053520815625960183270000016495147803014316929_" transform="matrix(1.0488 0 0 1 360.2142 27.2822)" class="st2 st3 st4">${distanzaArray[7]}</text>
                    <path class="st5" d="M391.56,24.31h1.78c3.68,0,6.65-2.98,6.65-6.65V15.9"/>
                </g>
            </g>
            <line class="st1" x1="1" y1="13.8" x2="399.49" y2="13.8"/>
            </svg>
        <!-- ###########################################################    end move_gates_section    ########################################################### -->

            ` : html` `}

        <!-- ###########################################################    still_gates_section    ########################################################### -->
            ${this._show_gstill == true ? html`
                <div class="gates-container">
            ${Object.keys(deviceMap).map((gateKey, index) => {
            const gate = deviceMap[gateKey];
            const gStill= gate.gstill;
            const GStillStates = this.hass.states[gate.gstill]; 
            const GStillState = parseInt(GStillStates?.state) || 0;
            const gStillEnergieStates = this.hass.states[gate.gstillenergie];
            const gStillEnergieState = parseInt(gStillEnergieStates?.state) || 0;
            //   console.log(gate.gmove);


            return gStill ? html`
            <div class="inner-gates-container">
                ${this.StillDistanceNumber >= index + 1 ? html`
                <div class="div-input-value">
                    <h2 style="${gStillEnergieState >= GStillState ? 'background-color: red; color: white;' : ''}">
                        ${GStillState}
                    </h2>
                </div>
                <div class="distance_sensor_value">
                    ${gStillEnergieState}
                    <span style="font-size: smaller;">%</span>
                </div>
                <div class="range-holder" style="${this.StillDistanceNumber >= index + 1 ? '' : 'display: none;'}">
                    <input
                    type="range"
                    min="0"
                    max="100"
                    .value="${GStillState}"
                    style="background-size: ${gStillEnergieState}% 100%;"
                    @change=${e => this._setNumber(GStillStates, e.target.value)}>
                </div>
                ` : html`
                <div class="div-input-value"></div>
                <div class="distance_sensor_value value-off">off</div>
                <div class="slider-off">off</div>
                `}
                <div class="g-name ${this.StillDistanceNumber >= index + 1 ? '' : 'g-name-off'}" >G${index + 1}</div>
            </div>
            ` : html`
            `;
            })}
            </div>
            <input 
            type="range" 
            id="n_still" 
            min="0" 
            max="8" 
            .value="${this.StillDistanceNumber}"  
            @input=${this.onRangeInputStill} 
            @change=${e => this._setNumber_direct_still(devices[this.ld2410Name].still_distance_n_gates, devices[this.ld2410Name].engineering_mode, e.target.value)}> 

            
            
            
           
            
            <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 400 32" style="enable-background:new 0 0 400 32;" xml:space="preserve">
            <style type="text/css">
                .st0{fill:var(--divider-color)}
                .st1{fill:none;stroke:var(--divider-color);stroke-miterlimit:10;}
                .st2{fill:var(--primary-text-color);}
                .st3{font-family:'Arial-BoldMT';}
                .st4{font-size:10px;}
                .st5{fill:none;stroke:var(--divider-color);stroke-miterlimit:10;}
            </style>
            <g id="gruppo-ruler">
                <foreignobject transform="matrix(1 0 0 1 -1 13.75)"    width="402" height="18">
                    <div class="ruler-meter-div">
                        <div class="ruler-meter-div-meter" style="width: ${stillDistancePerc}%;">
                        </div>
                    </div>
                </foreignobject>
                <g id="ruler">
                    <line class="st1" x1="0" y1="13.57" x2="0" y2="0.3"/>
                    <line class="st1" x1="400" y1="13.57" x2="400" y2="0.3"/>
                    <line class="st1" x1="100" y1="13.57" x2="100" y2="0.3"/>
                    <line class="st1" x1="50" y1="13.57" x2="50" y2="0.3"/>
                    <line class="st1" x1="150" y1="13.57" x2="150" y2="0.3"/>
                    <line class="st1" x1="200" y1="13.57" x2="200" y2="0.3"/>
                    <line class="st1" x1="300" y1="13.57" x2="300" y2="0.3"/>
                    <line class="st1" x1="250" y1="13.57" x2="250" y2="0.3"/>
                    <line class="st1" x1="350" y1="13.57" x2="350" y2="0.3"/>
                    <line class="st1" x1="10" y1="13.57" x2="10" y2="7.06"/>
                    <line class="st1" x1="20" y1="13.57" x2="20" y2="7.06"/>
                    <line class="st1" x1="30" y1="13.57" x2="30" y2="7.06"/>
                    <line class="st1" x1="40" y1="13.57" x2="40" y2="7.06"/>
                    <line class="st1" x1="60" y1="13.57" x2="60" y2="7.06"/>
                    <line class="st1" x1="70" y1="13.57" x2="70" y2="7.06"/>
                    <line class="st1" x1="80" y1="13.57" x2="80" y2="7.06"/>
                    <line class="st1" x1="90" y1="13.57" x2="90" y2="7.06"/>
                    <line class="st1" x1="110" y1="13.57" x2="110" y2="7.06"/>
                    <line class="st1" x1="120" y1="13.57" x2="120" y2="7.06"/>
                    <line class="st1" x1="130" y1="13.57" x2="130" y2="7.06"/>
                    <line class="st1" x1="140" y1="13.57" x2="140" y2="7.06"/>
                    <line class="st1" x1="160" y1="13.57" x2="160" y2="7.06"/>
                    <line class="st1" x1="170" y1="13.57" x2="170" y2="7.06"/>
                    <line class="st1" x1="180" y1="13.57" x2="180" y2="7.06"/>
                    <line class="st1" x1="190" y1="13.57" x2="190" y2="7.06"/>
                    <line class="st1" x1="210" y1="13.57" x2="210" y2="7.06"/>
                    <line class="st1" x1="220" y1="13.57" x2="220" y2="7.06"/>
                    <line class="st1" x1="230" y1="13.57" x2="230" y2="7.06"/>
                    <line class="st1" x1="240" y1="13.57" x2="240" y2="7.06"/>
                    <line class="st1" x1="260" y1="13.57" x2="260" y2="7.06"/>
                    <line class="st1" x1="270" y1="13.57" x2="270" y2="7.06"/>
                    <line class="st1" x1="280" y1="13.57" x2="280" y2="7.06"/>
                    <line class="st1" x1="290" y1="13.57" x2="290" y2="7.06"/>
                    <line class="st1" x1="310" y1="13.57" x2="310" y2="7.06"/>
                    <line class="st1" x1="320" y1="13.57" x2="320" y2="7.06"/>
                    <line class="st1" x1="330" y1="13.57" x2="330" y2="7.06"/>
                    <line class="st1" x1="340" y1="13.57" x2="340" y2="7.06"/>
                    <line class="st1" x1="360" y1="13.57" x2="360" y2="7.06"/>
                    <line class="st1" x1="370" y1="13.57" x2="370" y2="7.06"/>
                    <line class="st1" x1="380" y1="13.57" x2="380" y2="7.06"/>
                    <line class="st1" x1="390" y1="13.57" x2="390" y2="7.06"/>
                </g>
                <g id="misure">
                    <text id="gate-1-text" transform="matrix(1.0488 0 0 1 10.2171 26.6973)" class="st2 st3 st4">${distanzaArray[0]}</text>
                    <path class="st5" d="M41.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000172403478865654996700000009434690586403883428_" transform="matrix(1.0488 0 0 1 60.2162 26.6973)" class="st2 st3 st4">${distanzaArray[1]}</text>
                    <path class="st5" d="M91.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000174604340524944137280000015794942522531559070_" transform="matrix(1.0488 0 0 1 110.2152 26.6973)" class="st2 st3 st4">${distanzaArray[2]}</text>
                    <path class="st5" d="M141.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000099625697548038854210000013000206721289728953_" transform="matrix(1.0488 0 0 1 160.2162 26.6973)" class="st2 st3 st4">${distanzaArray[3]}</text>
                    <path class="st5" d="M191.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000070815017703564489300000010520145297064408724_" transform="matrix(1.0488 0 0 1 210.2162 26.6973)" class="st2 st3 st4">${distanzaArray[4]}</text>
                    <path class="st5" d="M241.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000005964308175057680080000014454426573449790897_" transform="matrix(1.0488 0 0 1 260.2171 26.6973)" class="st2 st3 st4">${distanzaArray[5]}</text>
                    <path class="st5" d="M291.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000085951868237978151280000003226438313236816520_" transform="matrix(1.0488 0 0 1 310.2152 26.6973)" class="st2 st3 st4">${distanzaArray[6]}</text>
                    <path class="st5" d="M341.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                    <text id="gate-1-text_00000053520815625960183270000016495147803014316929_" transform="matrix(1.0488 0 0 1 360.2142 27.2822)" class="st2 st3 st4">${distanzaArray[7]}</text>
                    <path class="st5" d="M391.56,24.31h1.78c3.68,0,6.65-2.98,6.65-6.65V15.9"/>
                </g>
            </g>
            <line class="st1" x1="1" y1="13.8" x2="399.49" y2="13.8"/>
            </svg>
        <!-- ###########################################################    end still_gates_section    ########################################################### -->
        ` : html` `}

        ` : html` `} 
        <!-- fine blocco engineering mode -->
          
            </ha-card>
`;
    }
    

    getBrowserName() {
        let browserName = "N/A";
        if (navigator && navigator.userAgent) {
            const userAgent = navigator.userAgent;
            if (userAgent.indexOf("Firefox") !== -1) {
                browserName = "Firefox";
            } else if (userAgent.indexOf("Chrome") !== -1) {
                browserName = "Chrome";
            } else if (userAgent.indexOf("Safari") !== -1) {
                browserName = "Safari";
            } else if (userAgent.indexOf("Edge") !== -1) {
                browserName = "Edge";
            } else if (userAgent.indexOf("Opera") !== -1 || userAgent.indexOf("OPR") !== -1) {
                browserName = "Opera";
            }
            // Aggiungi altri controlli per identificare altri browser se necessario
        }
        return browserName;
    }

    _callservice(entity_id, platform, command) {
        this.hass.callService(platform, command, {
            entity_id: entity_id 
        });
        console.log(entity_id)
    }

    _callserviceSelect(entity_id, platform, command, value) {
        this.hass.callService(platform, command, {
            entity_id: entity_id,
            option: value 
        });
        console.log(entity_id)
    }


    _setNumber(gate_obj, value) {
        this.hass.callService("number", "set_value", {
            entity_id: gate_obj.entity_id,
            value: value
        });

      }

      _setNumber_direct(entity_id, engineering_switch, value) {
        // Assicurati che il valore non sia inferiore a 2
        const newValue = Math.max(2, parseFloat(value));
    
        this.hass.callService("number", "set_value", {
            entity_id: entity_id,
            value: newValue
        });
    
        // Inserimento di un ritardo di 2 secondi prima della successiva chiamata di servizio
        setTimeout(() => {
            this.hass.callService("switch", "turn_on", {
                entity_id: engineering_switch
            });
        }, 2000); // 2000 millisecondi equivalgono a 2 secondi
    }
      
      _setNumber_direct_move(entity_id, engineering_switch, value) {
        // Assicurati che il valore non sia inferiore a 2
        const newValue = Math.max(2, parseFloat(value));
    
        // Ottenere il riferimento all'elemento input range per il movimento
        const rangeInputMove = this.shadowRoot.getElementById('n_move') as HTMLInputElement;
    
        // Se il valore è inferiore a 2, imposta il valore dello slider a 2
        if (parseFloat(value) < 2) {
            rangeInputMove.value = '2';
        }
    
        // Chiama il servizio per impostare il nuovo valore
        this.hass.callService("number", "set_value", {
            entity_id: entity_id,
            value: newValue
        });
    
        // Richiedi un aggiornamento del componente
        this.requestUpdate();
    
        // Inserimento di un ritardo di 2 secondi prima della successiva chiamata di servizio
        setTimeout(() => {
            this.hass.callService("switch", "turn_on", {
                entity_id: engineering_switch
            });
        }, 2000); // 2000 millisecondi equivalgono a 2 secondi
    }

    _setNumber_direct_still(entity_id, engineering_switch, value) {
        // Assicurati che il valore non sia inferiore a 2
        const newValue = Math.max(2, parseFloat(value));
    
        // Ottenere il riferimento all'elemento input range per la posizione ferma (still)
        const rangeInputStill = this.shadowRoot.getElementById('n_still') as HTMLInputElement;
    
        // Se il valore è inferiore a 2, imposta il valore dello slider a 2
        if (parseFloat(value) < 2) {
            rangeInputStill.value = '2';
        }
    
        // Chiama il servizio per impostare il nuovo valore
        this.hass.callService("number", "set_value", {
            entity_id: entity_id,
            value: newValue
        });
    
        // Richiedi un aggiornamento del componente
        this.requestUpdate();
    
        // Inserimento di un ritardo di 2 secondi prima della successiva chiamata di servizio
        setTimeout(() => {
            this.hass.callService("switch", "turn_on", {
                entity_id: engineering_switch
            });
        }, 2000); // 2000 millisecondi equivalgono a 2 secondi
    }


    //   firstUpdated() {
    //     // Ottenere il riferimento all'elemento input range
    //     const rangeInput = this.shadowRoot.getElementById('myRange') as HTMLInputElement;

    //     // Aggiungi un listener per controllare il valore quando viene modificato
    //     rangeInput.addEventListener('input', () => {
    //         // Controlla se il valore è inferiore a 1 e, se sì, imposta il valore a 1
    //         if (parseInt(rangeInput.value) < 1) {
    //             rangeInput.value = '1';
    //         }
    //     });
    // }
    firstUpdated() {
        // Ottenere il riferimento all'elemento select
        const selectElement = this.shadowRoot.getElementById('device_name') as HTMLSelectElement;
    
        // Imposta il valore di default di this.ld2410Name al valore selezionato dell'elemento select
        this.ld2410Name = selectElement.value;
    
        // // Ottenere il riferimento all'elemento input range per il movimento
        // const rangeInputMove = this.shadowRoot.getElementById('n_move') as HTMLInputElement;
        
    
        // // Aggiungi un listener per controllare il valore quando viene modificato
        // rangeInputMove.addEventListener('input', () => {
        //     // Controlla se il valore è inferiore a 2 e, se sì, imposta il valore a 2
        //     if (parseInt(rangeInputMove.value) < 2) {
        //         rangeInputMove.value = '2';
        //     }
        //     // console.log(rangeInputMove.value);
        // });
    
        // // Ottenere il riferimento all'elemento input range per la posizione ferma (still)
        // const rangeInputStill = this.shadowRoot.getElementById('n_still') as HTMLInputElement;
    
        // // Aggiungi un listener per controllare il valore quando viene modificato
        // rangeInputStill.addEventListener('input', () => {
        //     // Controlla se il valore è inferiore a 2 e, se sì, imposta il valore a 2
        //     if (parseInt(rangeInputStill.value) < 2) {
        //         rangeInputStill.value = '2';
        //     }
        //     // console.log(rangeInputStill.value);
        // });
    }

    onRangeInputMove(event: Event) {
        const target = event.target as HTMLInputElement;
        this.MovingDistanceNumber = parseInt(target.value);
        console.log(target.value);
    }

    onRangeInputStill(event: Event) {
        const target = event.target as HTMLInputElement;
        this.StillDistanceNumber = parseInt(target.value);
    }

    select_box(entity_id, selectOptions, range, ) {
        // const selectOptions = this.hass.states[devices[this.ld2410Name].distanceResolution]?.attributes.options;
        // const range = this.hass.states[devices[this.ld2410Name].distanceResolution]?.state;

        return html`
          <select class="options-select" name="entity" id="entity"  .value="${range}"
          @focusout=${(e) => this._callserviceSelect(entity_id, 'select', "select_option", e.target.value)}
            @change=${(e) => this._callserviceSelect(entity_id, 'select', "select_option", e.target.value)}>
            ${selectOptions ? 
              selectOptions.map((attr) => html`
                <option value="${attr}" ?selected="${attr === range}">${attr}</option>
              `) : ''}
          </select>
        `;
      }

      _moreinfo(entityinfo) {
        const popupEvent = new Event("hass-more-info", {bubbles: true, cancelable: false, composed: true});
        
        // Utilizza 'as any' per aggirare la verifica del tipo
        (popupEvent as any).detail = {"entityId": entityinfo };
        
        this.ownerDocument.querySelector("home-assistant").dispatchEvent(popupEvent);
    }
      

    // select_range(devices) {
    //     const selectOptions = this.hass.states[devices[this.ld2410Name].distanceResolution]?.attributes.options;
    //     const range = this.hass.states[devices[this.ld2410Name].distanceResolution]?.state;
    //     console.log(selectOptions);
    //     console.log(range);
    //     return html`

    //     <select name="entity" id="entity" style="padding: .6em; font-size: 1em;" .value="${range}">
            
    //         ${selectOptions.map((attr) => {
    //           if (attr != range) {
    //             return html`<option value="${attr}">${attr}</option> `;
    //           }
    //           else {
    //             return html`<option value="${attr}" selected>${attr}</option> `;
    //           }
    //         })}
    //     </select>
    //     <br>
    //     <br>`

    // }

    getLD2410DeviceNameDropdown(optionValue){
       return html`
            <select name="device_name" id="device_name" class="select-ld-device" @change=${this.handleSelectChange}>
                ${this.config.devices_name.map((ent, index) => {
                    const object = ent.ld_device;
                    // Aggiungi l'attributo selected alla prima opzione
                    return html`<option value="${object}" ${index === 0 ? 'selected' : ''}>${object}</option>`;
                })}
            </select>
`;
    }

    handleSelectChange(event) {
        // Ottieni il valore selezionato
        const selectedValue = event.target.value;
    
        // Imposta this.ld2410Name al valore selezionato
        this.ld2410Name = selectedValue;
    }

    static get styles (): CSSResultGroup {
        return styles
      }

   

}