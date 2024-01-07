import { type CSSResultGroup , html, LitElement } from "lit";
import { customElement, property } from 'lit/decorators';
import { HomeAssistant } from "custom-card-helpers";
import styles from './styles'

import "./editor";
import { getdeviceName } from "./utils";
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

    public static getStubConfig(hass: HomeAssistantFixed) {
        let entities = getdeviceName(hass, 'esphome', 'ld2410_device_name');
    
        const entity = entities.length > 0 ? entities[0] : "nessun ld2410";
    
        return {
        "type": `custom:${CARD_TAG_NAME}`,
        "devices_name": [
            {
            "device": entity,
            "name": entity
            }
        ]
        };
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
    this.ld2410Name = " ";  // Imposta il valore iniziale a una stringa vuota
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
        this.ld2410Name =this.config.devices_name[0].device;
        const browserName = this.getBrowserName();
        const cardWidth = this.getBoundingClientRect().width;
        const sliderWidth = (cardWidth - 52) / 8;
        const sliderHeight = cardWidth / 1.4;
        const cardWidthPadding = cardWidth - 52;
        

        
        const ld24xx = {
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
                "zone1End" : `number.${this.ld2410Name}_zone_1_end_distance`,
                "zone2End" : `number.${this.ld2410Name}_zone_2_end_distance`,
                "zone3End" : `number.${this.ld2410Name}_zone_3_end_distance`,
                "zone1occupancy" : `binary_sensor.${this.ld2410Name}_zone_1_occupancy`,
                "zone2occupancy" : `binary_sensor.${this.ld2410Name}_zone_2_occupancy`,
                "zone3occupancy" : `binary_sensor.${this.ld2410Name}_zone_3_occupancy`,
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
          };
          


                    
          const pippoThreshold = ld24xx.gates.g3.gmove;
          const deviceMap = ld24xx.gates;
          const PrecenceSensorState = this.hass.states[ld24xx.precence_sensor]?.state;
          const PrecenceSensor = ld24xx.precence_sensor;
          const engeneerinMode = this.hass.states[ld24xx.engineering_mode]?.state; 
          const movingDistantSensor: number = Number(this.hass.states[ld24xx.DetectionDistance]?.state);
          const movingDistance: number = Number(this.hass.states[ld24xx.DetectionDistance]?.state);
          const stillDistance: number = Number(this.hass.states[ld24xx.StillDistanceSensor]?.state);

         
          

            this.MovingDistanceNumber = this.hass.states[ld24xx.move_distance_n_gates]?.state;
            this.StillDistanceNumber = this.hass.states[ld24xx.still_distance_n_gates]?.state;

            let distanzaArray;
            let calculatedPercentageMovingDistance;
            let calculatedPercentageStillDistance;
            let calculateddistanceSensor;
            let distanceSvgMan;
            let distanceSvgManBar;
            const numGatesAttivi: number = Number(this.hass.states[ld24xx.move_distance_n_gates]?.state)
            var maxDistanza;
            if (this.hass.states[ld24xx.distanceResolution]?.state === '0.75m') {
                distanzaArray = ["0,75m", "1,50m", "2,25m", "3,00m", "3,75m", "4,50m", "5,25m", "6,00m"];
                // Verifica se il numGatesAttivi è un numero valido
            if (!isNaN(numGatesAttivi) && numGatesAttivi >= 1 && numGatesAttivi <= distanzaArray.length) {
                // Il numGatesAttivi è valido, imposta il massimo dell'input
                maxDistanza = (parseFloat(distanzaArray[numGatesAttivi - 1].replace('m', '').replace(',', '.')) * 100);

                
            } else {
                // Il numGatesAttivi non è valido, gestisci l'errore o fornisci un valore di default
                console.error("Valore non valido");
            }
                distanceSvgMan = (movingDistance / maxDistanza) * 410;

                calculatedPercentageMovingDistance = (movingDistance / 600) * 88;
                calculatedPercentageStillDistance = (stillDistance / 600) * 88;
                calculateddistanceSensor = (movingDistantSensor / 600) * 88;
            } else {
                distanzaArray = ["0.20m", "0.40m", "0.60m", "0.80m", "1.00m", "1.20m", "1.40m", "1.60m"];
                if (!isNaN(numGatesAttivi) && numGatesAttivi >= 1 && numGatesAttivi <= distanzaArray.length) {
                    // Il valore è valido, imposta il massimo dell'input
                    maxDistanza = (parseFloat(distanzaArray[numGatesAttivi - 1].replace('m', '').replace(',', '.')) * 100);
    
                    
                } else {
                    console.error("Valore non valido");
                }
                calculatedPercentageMovingDistance = (movingDistance / 160) * 88;
                calculatedPercentageStillDistance = (movingDistance / 160) * 88;
                calculateddistanceSensor = (movingDistantSensor / 160) * 88;
            }
            const movingDistancePerc: number = Number(calculatedPercentageMovingDistance > 88 ? 88 : calculatedPercentageMovingDistance);
            const stillDistancePerc: number = Number(calculatedPercentageStillDistance > 88 ? 88 : calculatedPercentageStillDistance);
            const DistancePerc: number = Number(calculateddistanceSensor > 88 ? 88 : calculateddistanceSensor);
            
            const zone1 : number = Number(this.hass.states[ld24xx.zone1End]?.state)
            const zone2 : number = Number(this.hass.states[ld24xx.zone2End]?.state)
            const zone3 : number = Number(this.hass.states[ld24xx.zone3End]?.state)

            


          return html`

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
                <path @click=${() => this._moreinfo(ld24xx.precence_sensor)} style="fill:transparent; cursor:pointer" d="M380.5,46.15h-81c-9.11,0-16.5-7.39-16.5-16.5v0c0-9.11,7.39-16.5,16.5-16.5h81c9.11,0,16.5,7.39,16.5,16.5v0
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

    _callserviceSelectResolution(entity_id, platform, command, value, number1, number2, number3, numGates, distArray) {

        
        // Mostro un messaggio di conferma all'utente
        const userConfirmation = confirm("when changing resolution the three additional zones are set to default values: zone1 0-33% zone2 33-66% zone3 66-100%. Do you want to continue?");
        let maxdistanza;
        // valore invertito 0.75m e 0.2m per ottenere stato corretto
        if (this.hass.states[entity_id]?.state === '0.2m') {
            distArray = ["0,75m", "1,50m", "2,25m", "3,00m", "3,75m", "4,50m", "5,25m", "6,00m"];
            if (!isNaN(numGates) && numGates >= 1 && numGates <= distArray.length) {
                maxdistanza = (parseFloat(distArray[numGates - 1].replace('m', '').replace(',', '.')) * 100);
            } else {
                // Il numGates non è valido, gestisci l'errore o fornisci un valore di default
                console.error("Valore non valido");
        }
        } else {
            distArray = ["0.20m", "0.40m", "0.60m", "0.80m", "1.00m", "1.20m", "1.40m", "1.60m"];
            if (!isNaN(numGates) && numGates >= 1 && numGates <= distArray.length) {
                // Il valore è valido, imposta il massimo dell'input
                maxdistanza = (parseFloat(distArray[numGates - 1].replace('m', '').replace(',', '.')) * 100);
            } else {
                console.error("Valore non valido");
            }
           console.error(entity_id, this.hass.states[entity_id]?.state, numGates, );
        }
            
        
        // Se l'utente ha confermato, procedi con l'esecuzione
        if (userConfirmation) {
            this.hass.callService(platform, command, {
                entity_id: entity_id,
                option: value 
            });

                this._setNumber_zone(number1, Math.round((maxdistanza * 33) / 100));
                this._setNumber_zone(number2, Math.round((maxdistanza * 66) / 100));
                this._setNumber_zone(number3, maxdistanza);

        } else {
            // L'utente ha annullato l'azione, puoi gestire questo caso se necessario
            console.log("Azione annullata dall'utente.");
        }
        if (this.hass.states[entity_id]?.state === '0.2m') {
        // location.reload();
        }
    }


    _setNumber(gate_obj, value) {
        this.hass.callService("number", "set_value", {
            entity_id: gate_obj.entity_id,
            value: value
        });

      }

      _setNumber_zone(entity_id, value) {
        // Assicurati che il valore non sia inferiore a 2
     
        this.hass.callService("number", "set_value", {
            entity_id: entity_id,
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

    handleZone1Change(event: Event) {
        const zone1Input = event.target as HTMLInputElement;
        const zone2Input = this.shadowRoot.getElementById('zone2') as HTMLInputElement;
        const zone1spanLeft = this.shadowRoot.getElementById('spanZone1');
        const thumb1 = this.shadowRoot.getElementById('thumb1');
        const occupancy1 = this.shadowRoot.getElementById('zona1occupancy');
        const occupancy2 = this.shadowRoot.getElementById('zona2occupancy');
    
        // Assicura che zone1 non sia più grande di zone2
        if (parseInt(zone1Input.value) > parseInt(zone2Input.value)) {
            zone1Input.value = (parseInt(zone2Input.value) - 1).toString();
        }
    
        const newvalue = (100 / (parseInt(zone1Input.max) - parseInt(zone1Input.min))) * parseInt(zone1Input.value) - (100 / (parseInt(zone1Input.max) - parseInt(zone1Input.min))) * parseInt(zone1Input.min);
        zone1spanLeft.style.left = newvalue + '%';
        thumb1.style.left = newvalue + '%';
        occupancy1.style.width = newvalue + '%';
        occupancy2.style.left = newvalue + '%';
        const valueZone1Element = this.shadowRoot.getElementById('valueZone1') as HTMLElement;
        valueZone1Element.innerText = zone1Input.value;
    }

    handleZone2Change(event: Event) {
        const zone2Input = event.target as HTMLInputElement;
        const zone1Input = this.shadowRoot.getElementById('zone1') as HTMLInputElement;
        const zone3Input = this.shadowRoot.getElementById('zone3') as HTMLInputElement;
        const value2span = this.shadowRoot.getElementById('valueZone2')
        const zone2spanLeft = this.shadowRoot.getElementById('spanZone2')
        const thumb2 = this.shadowRoot.getElementById('thumb2')
        const occupancy2 = this.shadowRoot.getElementById('zona2occupancy')
        const occupancy3 = this.shadowRoot.getElementById('zona3occupancy')
        // Assicura che zone2 non sia più piccolo di zone1 e più grande di zone3
        if (parseInt(zone2Input.value) < parseInt(zone1Input.value)) {
            zone2Input.value = (parseInt(zone1Input.value) + 1).toString();
        } else if (parseInt(zone2Input.value) > parseInt(zone3Input.value)) {
            zone2Input.value = (parseInt(zone3Input.value) - 1).toString();
        }
        const newvalue=(100/(parseInt(zone2Input.max)-parseInt(zone2Input.min)))*parseInt(zone2Input.value)-(100/(parseInt(zone2Input.max)-parseInt(zone2Input.min)))*parseInt(zone2Input.min)
        zone2spanLeft.style.left=newvalue+'%';
        thumb2.style.left=newvalue+'%';
        occupancy2.style.right=(100-newvalue)+'%';
        occupancy3.style.left=newvalue+'%';
        value2span.textContent = zone2Input.value
    }

    handleZone3Change(event: Event) {
        const zone3Input = event.target as HTMLInputElement;
        const zone2Input = this.shadowRoot.getElementById('zone2') as HTMLInputElement;
        const value3span = this.shadowRoot.getElementById('valueZone3')
        const zone3spanLeft = this.shadowRoot.getElementById('spanZone3')
        const thumb3 = this.shadowRoot.getElementById('thumb3')
        const occupancy3 = this.shadowRoot.getElementById('zona3occupancy')
        const occupancy4 = this.shadowRoot.getElementById('zona4occupancy')
        // Assicura che zone3 non sia più piccola di zone2
        if (parseInt(zone3Input.value) < parseInt(zone2Input.value)) {
            zone3Input.value = (parseInt(zone2Input.value) + 1).toString();
        }
        const newvalue=(100/(parseInt(zone3Input.max)-parseInt(zone3Input.min)))*parseInt(zone3Input.value)-(100/(parseInt(zone3Input.max)-parseInt(zone3Input.min)))*parseInt(zone3Input.min)

        zone3Input.oninput = (()=>{
            
            zone3spanLeft.style.left=newvalue+'%';
            thumb3.style.left=newvalue+'%';
            occupancy3.style.right=(100-newvalue)+'%';
            // occupancy4.style.left=newvalue+'%'
            occupancy4.style.width=((newvalue - 100) * -1)+'%';
            value3span.textContent = zone3Input.value
        });
    }


    firstUpdated(changedProps) {
        // Called after the first time the element has updated
        
        const zone1input = this.shadowRoot.getElementById('zone1') as HTMLInputElement;
        const zone2input = this.shadowRoot.getElementById('zone2') as HTMLInputElement;
        const zone3input = this.shadowRoot.getElementById('zone3') as HTMLInputElement;
        const valueZone1Element = this.shadowRoot.getElementById('valueZone1') as HTMLElement;
        const valueZone2Element = this.shadowRoot.getElementById('valueZone2') as HTMLElement;
        const valueZone3Element = this.shadowRoot.getElementById('valueZone3') as HTMLElement;
        valueZone1Element.innerText = zone1input.value;
        valueZone2Element.innerText = zone2input.value;
        valueZone3Element.innerText = zone3input.value;
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
        // const selectOptions = this.hass.states[ld24xx.distanceResolution]?.attributes.options;
        // const range = this.hass.states[ld24xx.distanceResolution]?.state;

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
    //     const selectOptions = this.hass.states[ld24xx.distanceResolution]?.attributes.options;
    //     const range = this.hass.states[ld24xx.distanceResolution]?.state;
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
            ${this.config.devices_name && this.config.devices_name.length > 1 ? html`
            <select name="device_name" id="device_name" class="select-ld-device" @change=${this.handleSelectChange}>
                ${this.config.devices_name.map(device => html`
                <option style="background-color:var(--secondary-background-color);" value="${device.device}" >${device.name}</option>
                `)}
            </select>

            ` : html`
            <div style="margin-left:0.5ch;">${this.config.devices_name[0].name}</div> 
            `}
                `;
    }

    handleSelectChange(event) {
        // Ottieni il valore selezionato
        const selectedValue = event.target.value;
    
        // Imposta this.ld2410Name al valore selezionato
        this.ld2410Name = selectedValue;
        console.log(selectedValue)
    }

    static get styles (): CSSResultGroup {
        return styles
      }

   

}