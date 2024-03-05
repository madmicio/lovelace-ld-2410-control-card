import { type CSSResultGroup, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators";
import { HomeAssistant } from "custom-card-helpers";
import styles from "./styles";

import "./editor";
import { getdeviceName } from "./utils";
import { HomeAssistantFixed, WindowWithCards } from "./types";
import { CARD_TAG_NAME, CARD_VERSION, EDITOR_CARD_TAG_NAME } from "./const";

const WideCardTEst = "v0.1";
console.groupCollapsed(
  "%c LD 2410 CARD %c " + WideCardTEst + " installed ",
  "color: orange; font-weight: bold; background: black",
  "color: green; font-weight: bold;"
),
  console.log("Readme:", "https://github.com/madmicio"),
  console.groupEnd();

const line1 = "  LG 2410 Control Card ";
const line2 = `  version: ${CARD_VERSION}  `;
/* eslint no-console: 0 */
console.info(
  `%c${line1}\n%c${line2}`,
  "color: orange; font-weight: bold; background: black",
  "color: white; font-weight: bold; background: dimgray"
);

// Allow this card to appear in the card chooser menu
const windowWithCards = window as unknown as WindowWithCards;
windowWithCards.customCards = windowWithCards.customCards || [];
windowWithCards.customCards.push({
  type: CARD_TAG_NAME,
  name: "LD2410 Control Card",
  preview: true,
  description: "Control card for LD2410 Device",
});

@customElement(CARD_TAG_NAME)
export class Ld2410CustomCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) private config!: any;
  @property({ type: Number }) private MovingDistanceNumber: any;
  @property({ type: Number }) private StillDistanceNumber: any;
  @property({ type: String }) private ld24xxName: string = "";
  private _show_main: boolean;
  private _show_options: boolean;
  private _show_gmove: boolean;
  private _show_gstill: boolean;

  static getConfigElement() {
    // Create and return an editor element
    return document.createElement(EDITOR_CARD_TAG_NAME);
  }

  public static getStubConfig(hass: HomeAssistantFixed) {
    let entities = getdeviceName(hass, "esphome", "espresenceld_", "timeout");
    console.log(entities);
    return {
      type: `custom:${CARD_TAG_NAME}`,
      devices_name: [
        {
          device: entities[0].device,
          name: entities[0].friendly_name,
        },
      ],
    };
  }

  static get properties() {
    return {
      hass: {},
      config: {},
      MovingDistanceNumber: { type: Number, reflect: true },
      StillDistanceNumber: { type: Number, reflect: true },
      ld24xxName: { type: String, reflect: true },
      _show_main: {},
      _show_options: {},
      _show_gmove: {},
      _show_still: {},
    };
  }

  constructor() {
    super();

    this.handleSelectChange = this.handleSelectChange.bind(this); // Bind del contesto per l'evento
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
    this.ld24xxName = this.config.devices_name[0].device;
  }

  getCardSize() {
    return this.config.entities.length + 1;
  }

  render() {
    const cardWidth = this.getBoundingClientRect().width;
    const cardWidthPadding = cardWidth - 52;

    interface Gate {
      gmove: string;
      gmoveenergie: string;
      gstill: string;
      gstillenergie: string;
    }

    interface Gates {
      [key: string]: Gate;
    }

    interface LD24xx {
      // ... (altre proprietà)
      gates: Gates;
    }
    const ld24xx = {
      engineering_mode: `switch.${this.ld24xxName}_engineering_mode`,
      precence_sensor: `binary_sensor.${this.ld24xxName}_presence`,
      DetectionDistance: `sensor.${this.ld24xxName}_last_detection_distance`,
      DistanceMoveDistance: `sensor.${this.ld24xxName}_moving_distance`,
      DistanceStillDistance: `sensor.${this.ld24xxName}_still_distance`,
      externalLightSensor: `sensor.${this.ld24xxName}_light_sensor`,
      move_distance_n_gates: `number.${this.ld24xxName}_max_move_distance_gate`,
      StillDistanceSensor: `sensor.${this.ld24xxName}_still_distance`,
      still_distance_n_gates: `number.${this.ld24xxName}_max_still_distance_gate`,
      distanceResolution: `select.${this.ld24xxName}_distance_resolution`,
      baudRate: `select.${this.ld24xxName}_baud_rate`,
      lightFunction: `select.${this.ld24xxName}_light_function`,
      lightTreshold: `number.${this.ld24xxName}_light_threshold`,
      lightSensor: `sensor.${this.ld24xxName}_light`,
      outPinLevel: `select.${this.ld24xxName}_out_pin_level`,
      outPinStatus: `binary_sensor.${this.ld24xxName}_out_pin_presence_status`,
      presenceLed: `switch.${this.ld24xxName}_deactivate_presence_led`,
      timeOut: `number.${this.ld24xxName}_timeout`,
      greenStatuLed: `light.${this.ld24xxName}_status_led_esp32`, 
      bluetooth: `switch.${this.ld24xxName}_control_bluetooth`,
      rebootEsp: `button.${this.ld24xxName}_esp_reboot`,
      firmwareUpgrade: `update.${this.ld24xxName}_firmware`,
      firmwareVersion: `sensor.${this.ld24xxName}_firmware_version`,
      factoryRest: `button.${this.ld24xxName}_ld_2410_factory_reset`,
      macAddress: `sensor.${this.ld24xxName}_mac_address`,
      queryParams: `button.${this.ld24xxName}_query_params`,
      restart: `button.${this.ld24xxName}_ld_2410_restart`,
      zone1End: `number.${this.ld24xxName}_zone_1_end_distance`,
      zone2End: `number.${this.ld24xxName}_zone_2_end_distance`,
      zone3End: `number.${this.ld24xxName}_zone_3_end_distance`,
      zone1occupancy: `binary_sensor.${this.ld24xxName}_zone_1_occupancy`,
      zone2occupancy: `binary_sensor.${this.ld24xxName}_zone_2_occupancy`,
      zone3occupancy: `binary_sensor.${this.ld24xxName}_zone_3_occupancy`,

      gates: {},
    };

    if (this.hass.states[`sensor.${this.ld24xxName}_array_sensor_data`]) {
      if (
        this.hass.states[`sensor.${this.ld24xxName}_array_sensor_data`]
          ?.state !== "engineering mode off"
      ) {
        const arraySensorDataString =
          this.hass.states[`sensor.${this.ld24xxName}_array_sensor_data`]
            ?.state;
        const arraySensorData = JSON.parse(arraySensorDataString);
        // Set gates based on array_sensor_data
        for (let i = 0; i <= 8; i++) {
          const moveIndex = i * 2; // Indice per gmoveenergie
          const stillIndex = moveIndex + 1; // Indice per gstillenergie

          ld24xx.gates[`g${i}`] = {
            gmove: `number.${this.ld24xxName}_g${i}_move_threshold`,
            gmoveenergie:
              isNaN(arraySensorData[moveIndex]) ||
              arraySensorData[moveIndex] > 100
                ? 0
                : Math.min(arraySensorData[moveIndex], 100),

            gstill: `number.${this.ld24xxName}_g${i}_still_threshold`,
            gstillenergie:
              isNaN(arraySensorData[stillIndex]) ||
              arraySensorData[stillIndex] > 100
                ? 0
                : Math.min(arraySensorData[stillIndex], 100),
          };
        }
      } else {
        for (let i = 0; i <= 8; i++) {
          ld24xx.gates[`g${i}`] = {
            gmove: `number.${this.ld24xxName}_g${i}_move_threshold`,
            gmoveenergie: "0",
            gstill: `number.${this.ld24xxName}_g${i}_still_threshold`,
            gstillenergie: "0",
          };
        }
      }
    } else {
      // Set default gates
      for (let i = 0; i <= 8; i++) {
        ld24xx.gates[`g${i}`] = {
          gmove: `number.${this.ld24xxName}_g${i}_move_threshold`,
          gmoveenergie: this.hass.states[`sensor.${this.ld24xxName}_g${i}_move_energy`]?.state,
          gstill: `number.${this.ld24xxName}_g${i}_still_threshold`,
          gstillenergie: this.hass.states[`sensor.${this.ld24xxName}_g${i}_still_energy`]?.state,
        };
      }
    }

    const deviceMap = ld24xx.gates;
    const PrecenceSensorState = this.hass.states[ld24xx.precence_sensor]?.state;
    const engeneerinMode = this.hass.states[ld24xx.engineering_mode]?.state;
    const movingDistantSensor: number = Number(
      this.hass.states[ld24xx.DetectionDistance]?.state
    );
    const movingDistance: number = Number(
      this.hass.states[ld24xx.DetectionDistance]?.state
    );
    const stillDistance: number = Number(
      this.hass.states[ld24xx.StillDistanceSensor]?.state
    );

    this.MovingDistanceNumber =
      this.hass.states[ld24xx.move_distance_n_gates]?.state;
    this.StillDistanceNumber =
      this.hass.states[ld24xx.still_distance_n_gates]?.state;

    let distanzaArray;
    let calculatedPercentageMovingDistance;
    let calculatedPercentageStillDistance;
    let calculateddistanceSensor;
    let distanceSvgMan;
    const numGatesAttivi: number = Number(
      this.hass.states[ld24xx.move_distance_n_gates]?.state
    );
    var maxDistanza;
    if (this.hass.states[ld24xx.distanceResolution]?.state === "0.75m") {
      distanzaArray = [
        "0,75m",
        "1,50m",
        "2,25m",
        "3,00m",
        "3,75m",
        "4,50m",
        "5,25m",
        "6,00m",
      ];
      // Verifica se il numGatesAttivi è un numero valido
      if (
        !isNaN(numGatesAttivi) &&
        numGatesAttivi >= 1 &&
        numGatesAttivi <= distanzaArray.length
      ) {
        // Il numGatesAttivi è valido, imposta il massimo dell'input
        maxDistanza =
          parseFloat(
            distanzaArray[numGatesAttivi - 1].replace("m", "").replace(",", ".")
          ) * 100;
      }
      distanceSvgMan = (movingDistance / maxDistanza) * 410;

      calculatedPercentageMovingDistance = (movingDistance / 600) * 100;
      calculatedPercentageStillDistance = (stillDistance / 600) * 100;
      calculateddistanceSensor = (movingDistantSensor / 600) * 100;
    } else {
      distanzaArray = [
        "0.20m",
        "0.40m",
        "0.60m",
        "0.80m",
        "1.00m",
        "1.20m",
        "1.40m",
        "1.60m",
      ];
      if (
        !isNaN(numGatesAttivi) &&
        numGatesAttivi >= 1 &&
        numGatesAttivi <= distanzaArray.length
      ) {
        // Il valore è valido, imposta il massimo dell'input
        maxDistanza =
          parseFloat(
            distanzaArray[numGatesAttivi - 1].replace("m", "").replace(",", ".")
          ) * 100;
      }
      calculatedPercentageMovingDistance = (movingDistance / 160) * 100;
      calculatedPercentageStillDistance = (movingDistance / 160) * 100;
      calculateddistanceSensor = (movingDistantSensor / 160) * 100;
    }
    const movingDistancePerc: number = Number(
      calculatedPercentageMovingDistance > 100
        ? 100
        : calculatedPercentageMovingDistance
    );
    let zoneConfig;

    if (
      this.hass.states[`number.${this.ld24xxName}_zone_1_end_distance`] &&
      this.hass.states[`number.${this.ld24xxName}_zone_2_end_distance`] &&
      this.hass.states[`number.${this.ld24xxName}_zone_3_end_distance`]
    ) {
      zoneConfig = true;
    } else {
      zoneConfig = false;
    }

    const zone1: number = Number(this.hass.states[ld24xx.zone1End]?.state);
    const zone2: number = Number(this.hass.states[ld24xx.zone2End]?.state);
    const zone3: number = Number(this.hass.states[ld24xx.zone3End]?.state);
    const test: number = Number(
      this.hass.states[`sensor.${this.ld24xxName}_array_sensor_data`]?.state[1]
    );
    return html`
            <ha-card style="--card-width: ${cardWidthPadding}px;">
          
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
                <path class="button_color ${
                  PrecenceSensorState === "on" ? "presence" : "no_presence"
                }" d="M380.5,46.15h-81c-9.11,0-16.5-7.39-16.5-16.5v0c0-9.11,7.39-16.5,16.5-16.5h81c9.11,0,16.5,7.39,16.5,16.5v0
                    C397,38.77,389.61,46.15,380.5,46.15z"/>
                    <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="339.9585" y1="15.8067" x2="339.9585" y2="35.4195">
                        <stop  offset="0" style="stop-color:#FFFFFF"/>
                        <stop  offset="0.8026" style="stop-color:;stop-opacity:0"/>
                    </linearGradient>
                <path class="hilink_button_overlay" d="M380.96,15.81h-82c-5.42,0-9.81,4.39-9.81,9.81v0c0,5.42,4.39,9.81,9.81,9.81h82c5.42,0,9.81-4.39,9.81-9.81v0
                    C390.77,20.2,386.38,15.81,380.96,15.81z"/>
                <path @click=${() =>
                  this._moreinfo(
                    ld24xx.precence_sensor
                  )} style="fill:transparent; cursor:pointer" d="M380.5,46.15h-81c-9.11,0-16.5-7.39-16.5-16.5v0c0-9.11,7.39-16.5,16.5-16.5h81c9.11,0,16.5,7.39,16.5,16.5v0
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
        <!-- #############################################################     select device    ############################################################# -->

            <div class="main-container">
                <div style="display:flex;flex-direction:row;justify-content: center;align-items: center;font-size: large;"  >setup device:
                ${this.getLD2410DeviceNameDropdown(this.config.devices_name)}
                
         <!-- #############################################################     options    ############################################################# -->
                
              <div style="flex-grow:1"></div>
                ${
                  this._show_options === false
                    ? html`
                        <ha-icon
                          class="ha-icon-option"
                          style="cursor: pointer;"
                          icon="mdi:cog-outline"
                          @click="${() => {
                            this._show_options = !this._show_options;
                            this._show_main = !this._show_main;
                          }}"
                        ></ha-icon>
                      `
                    : html`
                        <ha-icon
                          class="ha-icon-option"
                          style="cursor: pointer;"
                          icon="mdi:arrow-left-circle"
                          @click="${() => {
                            this._show_options = !this._show_options;
                            this._show_main = !this._show_main;
                            this.pushValue();
                          }}"
                        ></ha-icon>
                      `
                }
                 </div>
                <hr>
                ${
                  this.hass.states[`number.${this.ld24xxName}_timeout`] &&
                  this.hass.states[`number.${this.ld24xxName}_timeout`]
                    .state !== "unavailable"
                    ? html`
                ${
                  this._show_options
                    ? html`
                    <div style="font-size:10px">ver.: ${CARD_VERSION}</div>
                        <div class="select-options-container">
                          <div class="select-options-item">
                            <div class="option-select-title">Baud Rate</div>
                            ${this.select_box(
                              ld24xx.baudRate,
                              this.hass.states[ld24xx.baudRate]?.attributes
                                .options,
                              this.hass.states[ld24xx.baudRate]?.state
                            )}
                          </div>

                          <div class="select-options-item">
                            <div class="option-select-title">Out Pin Level</div>
                            ${this.select_box(
                              ld24xx.outPinLevel,
                              this.hass.states[ld24xx.outPinLevel]?.attributes
                                .options,
                              this.hass.states[ld24xx.outPinLevel]?.state
                            )}
                          </div>
                        </div>
                        <div class="select-options-container">
                          <div class="select-options-item">
                            <div class="option-select-title">
                              Light Function
                            </div>
                            ${this.select_box(
                              ld24xx.lightFunction,
                              this.hass.states[ld24xx.lightFunction]?.attributes
                                .options,
                              this.hass.states[ld24xx.lightFunction]?.state
                            )}
                          </div>
                          <div class="select-options-item">
                            <div class="option-select-title">
                              Distance Resolution
                            </div>
                            <select
                              class="options-select"
                              name="entity"
                              id="entity"
                              .value="${this.hass.states[
                                ld24xx.distanceResolution
                              ]?.state}"
                              @change=${(e) =>
                                this._callserviceSelectResolution(
                                  ld24xx.distanceResolution,
                                  "select",
                                  "select_option",
                                  e.target.value,
                                  ld24xx.zone1End,
                                  ld24xx.zone2End,
                                  ld24xx.zone3End,
                                  numGatesAttivi,
                                  distanzaArray
                                )}
                            >
                              ${this.hass.states[ld24xx.distanceResolution]
                                ?.attributes.options
                                ? this.hass.states[
                                    ld24xx.distanceResolution
                                  ]?.attributes.options.map(
                                    (attr) => html`
                                      <option
                                        value="${attr}"
                                        ?selected="${attr ===
                                        this.hass.states[
                                          ld24xx.distanceResolution
                                        ]?.state}"
                                      >
                                        ${attr}
                                      </option>
                                    `
                                  )
                                : ""}
                            </select>
                          </div>
                        </div>
                        ${this.hass.states[ld24xx.lightFunction]?.state != "off"
                          ? html`
                              <div class="lux-container-top">
                                <div style="flex-grow: 1;padding-left: 1em;">
                                  lux treshold
                                </div>
                                <div class="lux-center-item">sensor:</div>
                              </div>
                              <div class="lux-container-bottom">
                                <input
                                  style="flex-grow: 1;"
                                  type="range"
                                  id="lux_treshold"
                                  min="0"
                                  max="255"
                                  .value="${this.hass.states[
                                    ld24xx.lightTreshold
                                  ]?.state}"
                                  @input=${this.onRangeInputMove}
                                  @change=${(e) =>
                                    this._setNumber_direct(
                                      ld24xx.lightTreshold,
                                      ld24xx.engineering_mode,
                                      e.target.value
                                    )}
                                />
                                <div class="lux-center-item">
                                  ${this.hass.states[ld24xx.lightTreshold]
                                    ?.state}
                                </div>
                                <div class="lux-center-item">
                                  ${engeneerinMode === "on"
                                    ? this.hass.states[ld24xx.lightSensor]
                                        ?.state
                                    : "eng off"}
                                </div>
                              </div>
                            `
                          : html``}
                        <div class="options-container">
                          <div class="options-left">
                            <div class="space-between-options-item">
                              <div
                                style="cursor: pointer;"
                                @click=${() =>
                                  this._moreinfo(ld24xx.firmwareUpgrade)}
                              >
                                Firmware:
                              </div>
                              <div>
                                ${this.hass.states[ld24xx.firmwareUpgrade]
                                  ?.state === "on"
                                  ? "update available"
                                  : "updated"}
                              </div>
                            </div>
                            <div class="space-between-options-item">
                              <div
                                style="cursor: pointer;"
                                @click=${() =>
                                  this._moreinfo(ld24xx.firmwareVersion)}
                              >
                                Firmware ver.:
                              </div>
                              <div>
                                ${this.hass.states[ld24xx.firmwareVersion]
                                  ?.state}
                              </div>
                            </div>
                            <div class="space-between-options-item">
                              <div
                                style="cursor: pointer;"
                                @click=${() =>
                                  this._moreinfo(ld24xx.macAddress)}
                              >
                                Mac address:
                              </div>
                              <div>
                                ${this.hass.states[ld24xx.macAddress]?.state}
                              </div>
                            </div>
                          </div>
                          <div class="options-right">
                            <div class="space-between-options-item">
                              <div
                                style="cursor: pointer;"
                                @click=${() =>
                                  this._moreinfo(ld24xx.presenceLed)}
                              >
                                Presence LED
                              </div>
                              <ha-switch
                                .checked="${this.hass.states[ld24xx.presenceLed]
                                  ?.state === "on"
                                  ? true
                                  : false}"
                                @click="${() =>
                                  this._callservice(
                                    ld24xx.presenceLed,
                                    "switch",
                                    "toggle"
                                  )}"
                              ></ha-switch>
                            </div>
                            <div class="space-between-options-item">
                              <div
                                style="cursor: pointer;"
                                @click=${() =>
                                  this._moreinfo(ld24xx.greenStatuLed)}
                              >
                                Green LED
                              </div>
                              <ha-switch
                                .checked="${this.hass.states[
                                  ld24xx.greenStatuLed
                                ]?.state === "on"
                                  ? true
                                  : false}"
                                @click="${() =>
                                  this._callservice(
                                    ld24xx.greenStatuLed,
                                    "light",
                                    "toggle"
                                  )}"
                              ></ha-switch>
                            </div>
                            <div class="space-between-options-item">
                              <div
                                style="cursor: pointer;"
                                @click=${() => this._moreinfo(ld24xx.bluetooth)}
                              >
                                Bluetooth Control
                              </div>
                              <ha-switch
                                .checked="${this.hass.states[ld24xx.bluetooth]
                                  ?.state === "on"
                                  ? true
                                  : false}"
                                @click="${() =>
                                  this._callservice(
                                    ld24xx.bluetooth,
                                    "switch",
                                    "toggle"
                                  )}"
                              ></ha-switch>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div class="reset">
                          <div
                            class="grid-item-reset"
                            @click="${() =>
                              this._callservice(
                                ld24xx.rebootEsp,
                                "button",
                                "press"
                              )}"
                          >
                            <div class="grid-item-content">
                              <ha-icon icon="mdi:power-cycle"></ha-icon>
                              <div
                                style="flex-grow:1;margin-left: 6%;color: var(--state-icon-color);"
                              >
                                ESP reboot
                              </div>
                            </div>
                          </div>
                          <div
                            class="grid-item-reset"
                            @click="${() =>
                              this._callservice(
                                ld24xx.restart,
                                "button",
                                "press"
                              )}"
                          >
                            <div class="grid-item-content">
                              <ha-icon icon="mdi:restart"></ha-icon>
                              <div
                                style="flex-grow:1;margin-left: 6%;color: var(--state-icon-color);"
                              >
                                LD Restart
                              </div>
                            </div>
                          </div>
                          <div
                            class="grid-item-reset"
                            @click="${() =>
                              this._callservice(
                                ld24xx.factoryRest,
                                "button",
                                "press"
                              )}"
                          >
                            <div class="grid-item-content">
                              <ha-icon icon="mdi:restart-alert"></ha-icon>
                              <div
                                style="flex-grow:1;margin-left: 6%;color: var(--state-icon-color);"
                              >
                                Factory reset
                              </div>
                            </div>
                          </div>
                          <div
                            class="grid-item-reset"
                            @click="${() =>
                              this._callservice(
                                ld24xx.queryParams,
                                "button",
                                "press"
                              )}"
                          >
                            <div class="grid-item-content">
                              <ha-icon icon="mdi:database"></ha-icon>
                              <div
                                style="flex-grow:1;margin-left: 6%;color: var(--state-icon-color);"
                              >
                                Query params
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      `
                    : html`



            </div>


        <!-- #############################################################  fine options  ############################################################# -->






        <div class="info-container">
                    <div class="info-item">
                        <div class="info-item-title">Timeout</div>
                        <input class="div-timeout"  type="number" id="timeout" name="timeout" min="${
                          this.hass.states[ld24xx.timeOut]?.attributes.min
                        }" max="${
                        this.hass.states[ld24xx.timeOut]?.attributes.max
                      }" .value="${
                        this.hass.states[ld24xx.timeOut]?.state
                      }"  @change=${(e) =>
                        this._setNumber_direct(
                          ld24xx.timeOut,
                          null,
                          e.target.value
                        )}>
                    </div>

                    <div class="info-item" style="cursor:pointer;" @click=${() =>
                      this._moreinfo(ld24xx.outPinStatus)}>
                        <div class="info-item-title">Out Pin </div>
                        <div class="info-value">${
                          this.hass.states[ld24xx.outPinStatus]?.state
                        }</div>
                    </div>
                    <div class="info-item" style="cursor:pointer;" @click=${() =>
                      this._moreinfo(ld24xx.DetectionDistance)}>
                        <div class="info-item-title">Distance</div>
                        <div class="info-value">${
                          this.hass.states[ld24xx.DetectionDistance]?.state
                        }</div>
                    </div>
                    <div class="info-item" style="cursor:pointer;" @click=${() =>
                      this._moreinfo(ld24xx.DistanceMoveDistance)}>
                        <div class="info-item-title">Move</div>
                        <div class="info-value">${
                          this.hass.states[ld24xx.DistanceMoveDistance]?.state
                        }</div>
                    </div>
                    <div class="info-item" style="cursor:pointer;" @click=${() =>
                      this._moreinfo(ld24xx.DistanceStillDistance)}>
                        <div class="info-item-title">Still</div>
                        <div class="info-value">${
                          this.hass.states[ld24xx.DistanceStillDistance]?.state
                        }</div>
                    </div>
                    ${
                      ld24xx.externalLightSensor
                        ? html`
                            <div
                              class="info-item"
                              style="cursor:pointer;"
                              @click=${() =>
                                this._moreinfo(ld24xx.externalLightSensor)}
                            >
                              <div class="info-item-title">Lux</div>
                              <div class="info-value">
                                ${this.hass.states[ld24xx.externalLightSensor]
                                  ?.state}
                              </div>
                            </div>
                          `
                        : html``
                    }
                </div>

    <!-- ###################################### indicatore ######################################### --> 

                <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 450.6 ${
                          zoneConfig ? "130" : "89"
                        }" style="enable-background:new 0 0 450.6 130;" xml:space="preserve">
                <style type="text/css">
                    .meter-principale-rettangolo{fill:var(--mdc-select-fill-color);}
                    .primary_color{fill:var(--primary-color);}
                    .grey_man{fill: var(--divider-color)}

                </style>
                <g id="gruppo-gates-fissi">
                    <rect id="rettangolo_x5F_ruler" y="71.8" class="meter-principale-rettangolo" width="450.6" height="17.9"/>

                    <foreignobject transform="matrix(1 0 0 1 9 71.8)"    width="425" height="17.9"">
                    <div Style="display:flex;flexdirection: row;justify-content:space-between;">
                        <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 15 16" style="enable-background:new 0 0 15 16;width:15px" xml:space="preserve" >
                        <style type="text/css">
                            .meter-principale-testo{fill:var(--primary-text-color);font-size:10px;}
                            .meter-principale-shape{fill:none;stroke:var(--divider-color);stroke-miterlimit:10;}
                        </style>
                        <g id="_x3C_Gruppo_x3E_0">
                            <text id="gate-0" transform="matrix(1.0438 0 0 1 -0.2324 14.1904)" class="meter-principale-testo">0</text>
                            <path id="tacciato0" class="meter-principale-shape" d="M6,10.2h6.7c1,0,1.7-0.8,1.7-1.7V1.8"/>
                        </g>
                        </svg>

                        ${Array.from(
                          { length: this.MovingDistanceNumber },
                          (_, index) => {
                            const testoSVG =
                              distanzaArray[index % distanzaArray.length];

                            return html`
                              <svg
                                version="1.1"
                                id="Livello_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 40 16"
                                style="enable-background:new 0 0 40 16;width:40px;"
                                xml:space="preserve"
                              >
                                <style type="text/css"></style>
                                <g id="_x3C_Gruppo_x3E_6">
                                  <text
                                    id="gate-6_00000000190920724572184100000018113593952632234386_"
                                    transform="matrix(1.0438 0 0 1 0.7812 14.1904)"
                                    class="meter-principale-testo"
                                  >${testoSVG}</text>
                                  <path
                                    id="tacciato6_00000026858519343495812740000007173033270969586816_"
                                    class="meter-principale-shape"
                                    d="M31.1,10.2h6.7c1,0,1.7-0.8,1.7-1.7V1.8"
                                  />
                                </g>
                              </svg>
                            `;
                          }
                        )}
                        </foreignobject>

                        


                    </div>
                   
                </g>
                <foreignobject transform="matrix(1 0 0 1 17 27)"    width="422" height="45">
                    
                    <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 12 45" style="enable-background:new 0 0 12 45;height: 45px;margin-left:${distanceSvgMan}px;" xml:space="preserve">
                    <g id="man" style="fill:${
                      PrecenceSensorState === "on"
                        ? "var(--primary-color)"
                        : "var(--divider-color)"
                    }">
                    <path  d="M6,9.7c0.6,0,1.4,0,2.5,0c2.4,0,3.5,3.1,3.5,4.6c0,3.3,0,6.8,0,11.7c0,1.5-1.5,0.6-1.7,1.9
                    C9.7,33.4,9.8,37.4,9,41.6c-0.1,0.6-0.7,1.6-2.3,1.6L6,44.9h0l-0.7-1.7c-1.7,0-2.2-1-2.3-1.6c-0.7-4.1-0.6-8.1-1.3-13.7
                    C1.5,26.6,0,27.5,0,26c0-4.9,0-8.4,0-11.7c0-1.6,1.1-4.6,3.5-4.6C4.5,9.7,5.4,9.7,6,9.7"/>
                    <ellipse  cx="6" cy="4.7" rx="4.1" ry="4.1"/>
                    </g>
                    </svg>
                  
                </foreignobject>

                <g id="radar">
                    <g>
                        <sodipodi:namedview  bordercolor="#666666" borderopacity="1.0" id="base" pagecolor="#ffffff" showgrid="false">
                            </sodipodi:namedview>
                        <g id="layer1_00000146494627415306622150000013077120801947842442_" transform="translate(0,-740.55109)">
                            <path id="path4391_00000110451651967434578370000004409614462899860382_" class="primary_color" d="M15.5,764.7c2.5-2.4,4-5.7,4.2-9.3
                                l-3.3,0c-0.2,5.5-4.7,9.8-10.2,9.8L6,768.5C9.7,768.5,13,767.1,15.5,764.7L15.5,764.7z M16.3,755.3L16.3,755.3L16.3,755.3z"/>
                            <path id="path4395_00000080204113281266067360000004423022825113158022_" class="primary_color" d="M18.9,768.3c3.4-3.3,5.6-7.8,5.7-12.8
                                l-3.3,0c-0.3,8.2-7.1,14.8-15.3,14.8l-0.1,3.4C11,773.6,15.6,771.6,18.9,768.3L18.9,768.3z M20,773.1L20,773.1L20,773.1z"/>
                            <path id="path4381_00000158728040944148855660000011473676464589785535_" class="primary_color" d="M12,761.1c1.5-1.5,2.5-3.5,2.6-5.8
                                l-3.2,0c-0.1,2.8-2.4,5-5.2,5l-0.1,3.2C8.4,763.5,10.5,762.6,12,761.1L12,761.1z M11.4,755.3L11.4,755.3L11.4,755.3z"/>
                            <path id="path4411_00000083770962395965472580000005466728432597625011_" class="primary_color" d="M6.4,751.8c1.8,0,3.3,1.6,3.3,3.4
                                c0,1.8-1.6,3.3-3.4,3.3c-1.8,0-3.3-1.6-3.3-3.4C3,753.3,4.5,751.8,6.4,751.8l-0.1,3.3L6.4,751.8z"/>
                        </g>
                    </g>
                </g>
                <foreignobject transform="matrix(1 0 0 1 0 29)"    width="445" height="100">
                ${
                  zoneConfig
                    ? html`
                        <div slider id="slider-distance">
                          <div>
                            <div
                              id="zona1occupancy"
                              inverse-left
                              style="width:${(zone1 / maxDistanza) *
                              100}%;${this.hass.states[ld24xx.zone1occupancy]
                                ?.state === "on"
                                ? "background-color: red"
                                : ""}"
                            ></div>
                            <div
                              id="zona4occupancy"
                              inverse-right
                              style="width:${100 -
                              (zone3 / maxDistanza) *
                                100}%;background-color: grey;"
                            ></div>
                            <div
                              id="zona2occupancy"
                              range
                              style="left:${(zone1 / maxDistanza) *
                              100}%;right:${((zone2 / maxDistanza) * 100 -
                                100) *
                              -1}%;${this.hass.states[ld24xx.zone2occupancy]
                                ?.state === "on"
                                ? "background-color: red"
                                : ""}"
                            ></div>
                            <div
                              id="zona3occupancy"
                              range
                              style="left:${(zone2 / maxDistanza) *
                              100}%;right:${((zone3 / maxDistanza) * 100 -
                                100) *
                              -1}%;${this.hass.states[ld24xx.zone3occupancy]
                                ?.state === "on"
                                ? "background-color: red"
                                : ""}"
                            ></div>
                            <span
                              thumb
                              id="thumb1"
                              style="left:${(zone1 / maxDistanza) * 100}%;"
                            ></span>
                            <span
                              thumb
                              id="thumb2"
                              style="left:${(zone2 / maxDistanza) * 100}%;"
                            ></span>
                            <span
                              thumb
                              id="thumb3"
                              style="left:${(zone3 / maxDistanza) * 100}%;"
                            ></span>
                            <div
                              sign
                              id="spanZone1"
                              sign
                              style="left:${(zone1 / maxDistanza) * 100}%;"
                            >
                              <span id="valueZone1"></span>
                            </div>
                            <div
                              sign
                              id="spanZone2"
                              sign
                              style="left:${(zone2 / maxDistanza) * 100}%;"
                            >
                              <span id="valueZone2"></span>
                            </div>
                            <div
                              id="spanZone3"
                              sign
                              style="left:${(zone3 / maxDistanza) * 100}%;"
                            >
                              <span id="valueZone3"></span>
                            </div>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="${maxDistanza}"
                            value="${zone1}"
                            id="zone1"
                            @input=${(e) => this.handleZone1Change(e)}
                            @change=${(e) =>
                              this._setNumber_zone(
                                ld24xx.zone1End,
                                e.target.value
                              )}
                          />
                          <input
                            type="range"
                            min="1"
                            max="${maxDistanza}"
                            value="${zone2}"
                            id="zone2"
                            @input=${(e) => this.handleZone2Change(e)}
                            @change=${(e) =>
                              this._setNumber_zone(
                                ld24xx.zone2End,
                                e.target.value
                              )}
                          />
                          <input
                            type="range"
                            min="1"
                            max="${maxDistanza}"
                            value="${zone3}"
                            id="zone3"
                            @input=${(e) => this.handleZone3Change(e)}
                            @change=${(e) =>
                              this._setNumber_zone(
                                ld24xx.zone3End,
                                e.target.value
                              )}
                          />
                        </div>
                      `
                    : ``
                }
                </foreignobject>
                </svg>

      

                `
                }

            <hr>

            <a  class="cta ${
              this.hass.states[ld24xx.engineering_mode]?.state === "on"
                ? "cta-active"
                : " "
            }"  @click="${() =>
                        this._callservice(
                          ld24xx.engineering_mode,
                          "switch",
                          "toggle"
                        )}">
            <ha-icon icon="mdi:power-cycle" style="padding-left: 3px;color: var(--card-background-color);"  ></ha-icon style="margin: 0 10px 0 10px" >  <span>Engineering mode ${
              this.hass.states[ld24xx.engineering_mode]?.state
            }</span>
            </a>

            ${
              this.hass.states[ld24xx.engineering_mode]?.state === "on"
                ? html`
            <div style="display: flex;justify-content:space-between;margin-top: 10px;" >
            <a  class="cta ${
              this._show_gmove == true && this._show_gstill == false
                ? "cta-active"
                : " "
            }" @click=${() => {
                    this._show_gmove = true;
                    this._show_gstill = false;
                  }}>
                <ha-icon icon="mdi:motion-sensor" style="padding-left: 3px;color: var(--card-background-color);"  ></ha-icon style="margin: 0 10px 0 10px" >  <span>Move</span>
                </a>
                <a  class="cta ${
                  this._show_gmove == false && this._show_gstill == true
                    ? "cta-active"
                    : " "
                }" @click=${() => {
                    this._show_gmove = false;
                    this._show_gstill = true;
                  }}>
                <ha-icon icon="mdi:motion-sensor" style="padding-left: 3px;color: var(--card-background-color);"  ></ha-icon style="margin: 0 10px 0 10px" >  <span>still</span>
                </a>
                <a  class="cta ${
                  this._show_gmove == true && this._show_gstill == true
                    ? "cta-active"
                    : " "
                }" @click=${() => {
                    this._show_gmove = true;
                    this._show_gstill = true;
                  }}>
                <ha-icon icon="mdi:account-multiple" style="padding-left: 3px;color: var(--card-background-color);"  ></ha-icon style="margin: 0 10px 0 10px" >  <span>move & still</span>
                </a>
            </div>
            

            
            <hr>

        <!-- ###########################################################    move_gates_section    ########################################################### -->
        
       
       
       
        ${
          this._show_gmove == true
            ? html`

        <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 400 360" style="enable-background:new 0 0 400 400;" xml:space="preserve">
            <foreignobject transform="matrix(1 0 0 1 0 0)"    width="400" height="400"">  
            <div class="gates-container">
            ${Object.keys(deviceMap).map((gateKey, index) => {
              const gate = deviceMap[gateKey];
              const gMove = gate.gmove;
              const GMoveStates = this.hass.states[gate.gmove];
              const GMoveState = parseInt(GMoveStates?.state) || 0;
              const gMoveEnergieState = isNaN(gate.gmoveenergie)
                ? 0
                : gate.gmoveenergie;

              const isLastGate = index === Object.keys(deviceMap).length - 1;

              const nextGateKey = Object.keys(deviceMap)[index + 1];
              const nextGateMoveStates = nextGateKey
                ? this.hass.states[deviceMap[nextGateKey].gmove]
                : null;
              const nextGateMoveState =
                parseInt(nextGateMoveStates?.state) || 0;
              const nextGateMoveEnergieState = isNaN(
                deviceMap[nextGateKey]?.gmoveenergie
              )
                ? 0
                : deviceMap[nextGateKey].gmoveenergie;

              return !isLastGate && gMove
                ? html`
                    <div class="inner-gates-container">
                      ${this.MovingDistanceNumber >= index + 2
                        ? html`




                    <h2 style="${
                      gMoveEnergieState >= GMoveState
                        ? "background-color: red; color: white;"
                        : ""
                    }">
                    ${GMoveState}
                    </h2>
                <div class="distance_sensor_value">
                    ${gMoveEnergieState}
                    <span style="font-size: smaller;">%</span>
                </div>
                
                <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="visible" x="0px" y="0px"
                    viewBox="0 0 48 310" style="enable-background:new 0 0 48 310;border: 1px solid var(--divider-color);" xml:space="preserve">
                <style type="text/css">
                    .st0red{fill:#E30613;}
                    .linea{fill:none;stroke:purple;stroke-width:3;stroke-miterlimit:10;}
                </style>
                <polygon class="st0red" points="0,${
                  310 - gMoveEnergieState * 3.1
                } 48,${310 - nextGateMoveEnergieState * 3.1} 48,310 0,310 "/>
                <line id="linea" class="linea" x1="0" y1="${
                  310 - GMoveState * 3.1
                }" x2="48" y2="${310 - nextGateMoveState * 3.1}"/>
                <foreignobject transform="matrix(1 0 0 1 -12 -2)"    width="20px" height="310""> 
                    <input 
                    type="range" 
                    orient="vertical"
                    min="0"
                    max="100"
                    .value="${GMoveState}"
                    @change=${(e) =>
                      this._setNumber(GMoveStates, e.target.value)}>
                </foreignobject>
                

                </svg>



                `
                        : html`
                            ${this.MovingDistanceNumber >= index + 1
                              ? html`
                            <div style="display:flex;flex-direction:row;">
                                <div style="display:flex;flex-direction:column;">
                                    <h2 style="${
                                      gMoveEnergieState >= GMoveState
                                        ? "background-color: red; color: white;"
                                        : ""
                                    }">
                                    ${GMoveState}
                                        </h2>
                                    <div class="distance_sensor_value">
                                        ${gMoveEnergieState}
                                        <span style="font-size: smaller;">%</span>
                                    </div>
                                </div>
                                <div style="display:flex;flex-direction:column;">
                                    <h2 style="${
                                      nextGateMoveEnergieState >=
                                      nextGateMoveState
                                        ? "background-color: red; color: white;"
                                        : ""
                                    };left:-11px;">
                                            ${nextGateMoveState}
                                        </h2>
                                    <div class="distance_sensor_value" style="left:-36px;">
                                        ${nextGateMoveEnergieState}
                                        <span style="font-size: smaller;">%</span>
                                    </div>
                                </div>
                            </div>
                            <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="visible" x="0px" y="0px"
                                viewBox="0 0 48 310" style="enable-background:new 0 0 48 310;border: 1px solid var(--divider-color);" xml:space="preserve">
                                <style type="text/css">
                                    .st0red{fill:#E30613;}
                                    .linea{fill:none;stroke:purple;stroke-width:3;stroke-miterlimit:10;}
                                </style>
                                <polygon class="st0red" points="0,${
                                  310 - gMoveEnergieState * 3.1
                                } 48,${
                                  310 - nextGateMoveEnergieState * 3.1
                                } 48,310 0,310 "/>
                                <line id="linea" class="linea" x1="0" y1="${
                                  310 - GMoveState * 3.1
                                }" x2="48" y2="${
                                  310 - nextGateMoveState * 3.1
                                }"/>
                            <foreignobject transform="matrix(1 0 0 1 -12 -2)"    width="20px" height="310""> 
                                <input 
                                type="range" 
                                orient="vertical"
                                min="0"
                                max="100"
                                .value="${GMoveState}"
                                @change=${(e) =>
                                  this._setNumber(GMoveStates, e.target.value)}>
                            </foreignobject>
                            <foreignobject transform="matrix(1 0 0 1 40 -2)"    width="20px" height="310""> 
                                <input 
                                type="range" 
                                orient="vertical"
                                min="0"
                                max="100"
                                .value="${nextGateMoveState}"
                                @change=${(e) =>
                                  this._setNumber(
                                    nextGateMoveStates,
                                    e.target.value
                                  )}>
                            </foreignobject>
                            

                            </svg>
                    `
                              : html` <div class="slider-off">off</div> `}
                          `}
                      <div
                        class="g-name ${this.MovingDistanceNumber >= index + 1
                          ? ""
                          : "g-name-off"}"
                        data-gfrom="${index}"
                        data-gto="${index + 1}"
                      >
                        zone ${index + 1}
                      </div>
                    </div>
                  `
                : html``;
            })}
            </foreignobject>
        </svg>
        
           
        <!-- ###########################################################    end move_gates_section    ########################################################### -->

            `
            : html``
        }

        <!-- ###########################################################    still_gates_section    ########################################################### -->
        ${
          this._show_gstill == true
            ? html`

        <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 400 360" style="enable-background:new 0 0 400 400;" xml:space="preserve">
            <foreignobject transform="matrix(1 0 0 1 0 0)"    width="400" height="400"">  
            <div class="gates-container">
            ${Object.keys(deviceMap).map((gateKey, index) => {
              const gate = deviceMap[gateKey];
              const gStill = gate.gstill;
              const GStillStates = this.hass.states[gate.gstill];
              const GStillState = parseInt(GStillStates?.state) || 0;
              const gStillEnergieState = isNaN(gate.gstillenergie)
                ? 0
                : gate.gstillenergie;
              const isLastGate = index === Object.keys(deviceMap).length - 1;

              const nextGateKey = Object.keys(deviceMap)[index + 1];
              const nextGateStillStates = nextGateKey
                ? this.hass.states[deviceMap[nextGateKey].gstill]
                : null;
              const nextGateStillState =
                parseInt(nextGateStillStates?.state) || 0;
              const nextGateStillEnergieStates = nextGateKey
                ? this.hass.states[deviceMap[nextGateKey].gstillenergie]
                : null;
              const nextGateStillEnergieState = isNaN(
                deviceMap[nextGateKey]?.gstillenergie
              )
                ? 0
                : deviceMap[nextGateKey].gstillenergie;

              return !isLastGate && gStill
                ? html`
                    <div class="inner-gates-container">
                      ${this.MovingDistanceNumber >= index + 2
                        ? html`




                    <h2 style="${
                      gStillEnergieState >= GStillState
                        ? "background-color: red; color: white;"
                        : ""
                    }">
                    ${GStillState}
                    </h2>
                <div class="distance_sensor_value">
                    ${gStillEnergieState}
                    <span style="font-size: smaller;">%</span>
                </div>
                
                <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="visible" x="0px" y="0px"
                    viewBox="0 0 48 310" style="enable-background:new 0 0 48 310;border: 1px solid var(--divider-color);" xml:space="preserve">
                <style type="text/css">
                    .st0red{fill:#E30613;}
                    .linea{fill:none;stroke:purple;stroke-width:3;stroke-miterlimit:10;}
                </style>
                <polygon class="st0red" points="0,${
                  310 - gStillEnergieState * 3.1
                } 48,${310 - nextGateStillEnergieState * 3.1} 48,310 0,310 "/>
                <line id="linea" class="linea" x1="0" y1="${
                  310 - GStillState * 3.1
                }" x2="48" y2="${310 - nextGateStillState * 3.1}"/>
                <foreignobject transform="matrix(1 0 0 1 -12 -2)"    width="20px" height="310""> 
                    <input 
                    type="range" 
                    orient="vertical"
                    min="0"
                    max="100"
                    .value="${GStillState}"
                    @change=${(e) =>
                      this._setNumber(GStillStates, e.target.value)}>
                </foreignobject>
                

                </svg>



                `
                        : html`
                            ${this.MovingDistanceNumber >= index + 1
                              ? html`
                            <div style="display:flex;flex-direction:row;">
                                <div style="display:flex;flex-direction:column;">
                                    <h2 style="${
                                      gStillEnergieState >= GStillState
                                        ? "background-color: red; color: white;"
                                        : ""
                                    }">
                                    ${GStillState}
                                        </h2>
                                    <div class="distance_sensor_value">
                                        ${gStillEnergieState}
                                        <span style="font-size: smaller;">%</span>
                                    </div>
                                </div>
                                <div style="display:flex;flex-direction:column;">
                                    <h2 style="${
                                      nextGateStillEnergieState >=
                                      nextGateStillState
                                        ? "background-color: red; color: white;"
                                        : ""
                                    };left:-11px;">
                                            ${nextGateStillState}
                                        </h2>
                                    <div class="distance_sensor_value" style="left:-36px;">
                                        ${nextGateStillEnergieState}
                                        <span style="font-size: smaller;">%</span>
                                    </div>
                                </div>
                            </div>
                            <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" overflow="visible" x="0px" y="0px"
                                viewBox="0 0 48 310" style="enable-background:new 0 0 48 310;border: 1px solid var(--divider-color);" xml:space="preserve">
                                <style type="text/css">
                                    .st0red{fill:#E30613;}
                                    .linea{fill:none;stroke:purple;stroke-width:3;stroke-miterlimit:10;}
                                </style>
                                <polygon class="st0red" points="0,${
                                  310 - gStillEnergieState * 3.1
                                } 48,${
                                  310 - nextGateStillEnergieState * 3.1
                                } 48,310 0,310 "/>
                                <line id="linea" class="linea" x1="0" y1="${
                                  310 - GStillState * 3.1
                                }" x2="48" y2="${
                                  310 - nextGateStillState * 3.1
                                }"/>
                            <foreignobject transform="matrix(1 0 0 1 -12 -2)"    width="20px" height="310""> 
                                <input 
                                type="range" 
                                orient="vertical"
                                min="0"
                                max="100"
                                .value="${GStillState}"
                                @change=${(e) =>
                                  this._setNumber(
                                    GStillStates,
                                    e.target.value
                                  )}>
                            </foreignobject>
                            <foreignobject transform="matrix(1 0 0 1 40 -2)"    width="20px" height="310""> 
                                <input 
                                type="range" 
                                orient="vertical"
                                min="0"
                                max="100"
                                .value="${nextGateStillState}"
                                @change=${(e) =>
                                  this._setNumber(
                                    nextGateStillStates,
                                    e.target.value
                                  )}>
                            </foreignobject>
                            

                            </svg>
                    `
                              : html` <div class="slider-off">off</div> `}
                          `}
                      <div
                        class="g-name ${this.MovingDistanceNumber >= index + 1
                          ? ""
                          : "g-name-off"}"
                        data-gfrom="${index}"
                        data-gto="${index + 1}"
                      >
                        zone ${index + 1}
                      </div>
                    </div>
                  `
                : html``;
            })}
            </foreignobject>
        </svg>




        <!-- ###########################################################    end still_gates_section    ########################################################### -->
        `
            : html``
        }

 





        </div>
        <input 
        type="range"
        style="margin-inline: 20px;"
        id="n_move" 
        min="0" 
        max="8" 
        .value="${this.MovingDistanceNumber}"  
        @input=${this.onRangeInputMove} 
        @change=${(e) =>
          this._setNumber_direct_move(
            ld24xx.move_distance_n_gates,
            ld24xx.still_distance_n_gates,
            ld24xx.engineering_mode,
            e.target.value,
            ld24xx.zone1End,
            ld24xx.zone2End,
            ld24xx.zone3End
          )}> 

        
        
        
        
        
        <svg version="1.1" id="Livello_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 400 32" style="enable-background:new 0 0 400 32;    margin-inline: 20px;" xml:space="preserve">
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
                <text id="gate-1-text" transform="matrix(1.0488 0 0 1 10.2171 26.6973)" class="st2 st3 st4">${
                  distanzaArray[0]
                }</text>
                <path class="st5" d="M41.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                <text id="gate-1-text_00000172403478865654996700000009434690586403883428_" transform="matrix(1.0488 0 0 1 60.2162 26.6973)" class="st2 st3 st4">${
                  distanzaArray[1]
                }</text>
                <path class="st5" d="M91.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                <text id="gate-1-text_00000174604340524944137280000015794942522531559070_" transform="matrix(1.0488 0 0 1 110.2152 26.6973)" class="st2 st3 st4">${
                  distanzaArray[2]
                }</text>
                <path class="st5" d="M141.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                <text id="gate-1-text_00000099625697548038854210000013000206721289728953_" transform="matrix(1.0488 0 0 1 160.2162 26.6973)" class="st2 st3 st4">${
                  distanzaArray[3]
                }</text>
                <path class="st5" d="M191.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                <text id="gate-1-text_00000070815017703564489300000010520145297064408724_" transform="matrix(1.0488 0 0 1 210.2162 26.6973)" class="st2 st3 st4">${
                  distanzaArray[4]
                }</text>
                <path class="st5" d="M241.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                <text id="gate-1-text_00000005964308175057680080000014454426573449790897_" transform="matrix(1.0488 0 0 1 260.2171 26.6973)" class="st2 st3 st4">${
                  distanzaArray[5]
                }</text>
                <path class="st5" d="M291.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                <text id="gate-1-text_00000085951868237978151280000003226438313236816520_" transform="matrix(1.0488 0 0 1 310.2152 26.6973)" class="st2 st3 st4">${
                  distanzaArray[6]
                }</text>
                <path class="st5" d="M341.56,23.73h1.78c3.68,0,6.65-2.98,6.65-6.65v-1.76"/>
                <text id="gate-1-text_00000053520815625960183270000016495147803014316929_" transform="matrix(1.0488 0 0 1 360.2142 27.2822)" class="st2 st3 st4">${
                  distanzaArray[7]
                }</text>
                <path class="st5" d="M391.56,24.31h1.78c3.68,0,6.65-2.98,6.65-6.65V15.9"/>
            </g>
        </g>
        <line class="st1" x1="1" y1="13.8" x2="399.49" y2="13.8"/>
        </svg>
        `
                : html``
            } 
        <!-- fine blocco engineering mode -->
        `
                    : html`
                        <div class="unavailable">
                          <ha-icon
                            class="ha-icon-alert"
                            icon="mdi:alert-outline"
                          ></ha-icon>
                          <div>this device is anavailable</div>
                          <ha-icon
                            class="ha-icon-alert"
                            icon="mdi:alert-outline"
                          ></ha-icon>
                        </div>
                      `
                } 
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
      } else if (
        userAgent.indexOf("Opera") !== -1 ||
        userAgent.indexOf("OPR") !== -1
      ) {
        browserName = "Opera";
      }
      // Aggiungi altri controlli per identificare altri browser se necessario
    }
    return browserName;
  }

  _callservice(entity_id, platform, command) {
    this.hass.callService(platform, command, {
      entity_id: entity_id,
    });
  }

  _callserviceSelect(entity_id, platform, command, value) {
    this.hass.callService(platform, command, {
      entity_id: entity_id,
      option: value,
    });
  }

  _callserviceSelectResolution(
    entity_id,
    platform,
    command,
    value,
    number1,
    number2,
    number3,
    numGates,
    distArray
  ) {
    // Mostro un messaggio di conferma all'utente
    const userConfirmation = confirm(
      "when changing resolution the three additional zones are set to default values: zone1 0-33% zone2 33-66% zone3 66-100%. Do you want to continue?"
    );
    let maxdistanza;
    // valore invertito 0.75m e 0.2m per ottenere stato corretto
    if (this.hass.states[entity_id]?.state === "0.2m") {
      distArray = [
        "0,75m",
        "1,50m",
        "2,25m",
        "3,00m",
        "3,75m",
        "4,50m",
        "5,25m",
        "6,00m",
      ];
      if (!isNaN(numGates) && numGates >= 1 && numGates <= distArray.length) {
        maxdistanza =
          parseFloat(
            distArray[numGates - 1].replace("m", "").replace(",", ".")
          ) * 100;
      }
    } else {
      distArray = [
        "0.20m",
        "0.40m",
        "0.60m",
        "0.80m",
        "1.00m",
        "1.20m",
        "1.40m",
        "1.60m",
      ];
      if (!isNaN(numGates) && numGates >= 1 && numGates <= distArray.length) {
        // Il valore è valido, imposta il massimo dell'input
        maxdistanza =
          parseFloat(
            distArray[numGates - 1].replace("m", "").replace(",", ".")
          ) * 100;
      }
    }

    // Se l'utente ha confermato, procedi con l'esecuzione
    if (userConfirmation) {
      this.hass.callService(platform, command, {
        entity_id: entity_id,
        option: value,
      });

      this._setNumber_zone(number1, Math.round((maxdistanza * 33) / 100));
      this._setNumber_zone(number2, Math.round((maxdistanza * 66) / 100));
      this._setNumber_zone(number3, maxdistanza);
    }
    if (this.hass.states[entity_id]?.state === "0.2m") {
    }
  }

  _setNumber(gate_obj, value) {
    this.hass.callService("number", "set_value", {
      entity_id: gate_obj.entity_id,
      value: value,
    });
  }

  _setNumber_zone(entity_id, value) {
    // Assicurati che il valore non sia inferiore a 2

    this.hass.callService("number", "set_value", {
      entity_id: entity_id,
      value: value,
    });
  }

  _setNumber_direct(entity_id, engineering_switch, value) {
    // Assicurati che il valore non sia inferiore a 2
    const newValue = Math.max(2, parseFloat(value));

    this.hass.callService("number", "set_value", {
      entity_id: entity_id,
      value: newValue,
    });

    // Inserimento di un ritardo di 2 secondi prima della successiva chiamata di servizio
    setTimeout(() => {
      this.hass.callService("switch", "turn_on", {
        entity_id: engineering_switch,
      });
    }, 2000); // 2000 millisecondi equivalgono a 2 secondi
  }

  _setNumber_direct_move(
    entity_id,
    entity_id_still,
    engineering_switch,
    value,
    number1,
    number2,
    number3
  ) {
    // Assicurati che il valore non sia inferiore a 2
    const newValue = Math.max(2, parseFloat(value));

    // Ottenere il riferimento all'elemento input range per il movimento
    const rangeInputMove = this.shadowRoot.getElementById(
      "n_move"
    ) as HTMLInputElement;

    // Se il valore è inferiore a 2, imposta il valore dello slider a 2
    if (parseFloat(value) < 2) {
      rangeInputMove.value = "2";
    }

    // Chiama il servizio per impostare il nuovo valore
    this.hass.callService("number", "set_value", {
      entity_id: entity_id,
      value: newValue,
    });
    this.hass.callService("number", "set_value", {
      entity_id: entity_id_still,
      value: newValue,
    });
    this.requestUpdate();
    this.updateComplete.then(() => {
      let maxdistanza;
      let distArray;
      // valore invertito 0.75m e 0.2m per ottenere stato corretto
      if (
        this.hass.states[`select.${this.ld24xxName}_distance_resolution`]
          ?.state === "0.75m"
      ) {
        distArray = [
          "0,75m",
          "1,50m",
          "2,25m",
          "3,00m",
          "3,75m",
          "4,50m",
          "5,25m",
          "6,00m",
        ];
        if (!isNaN(value) && value >= 1 && value <= distArray.length) {
          maxdistanza =
            parseFloat(
              distArray[value - 1].replace("m", "").replace(",", ".")
            ) * 100;
        }
      } else {
        distArray = [
          "0.20m",
          "0.40m",
          "0.60m",
          "0.80m",
          "1.00m",
          "1.20m",
          "1.40m",
          "1.60m",
        ];
        if (!isNaN(value) && value >= 1 && value <= distArray.length) {
          // Il valore è valido, imposta il massimo dell'input
          maxdistanza =
            parseFloat(
              distArray[value - 1].replace("m", "").replace(",", ".")
            ) * 100;
        }
      }
      this._setNumber_zone(number1, Math.round((maxdistanza * 33) / 100));
      this._setNumber_zone(number2, Math.round((maxdistanza * 66) / 100));
      this._setNumber_zone(number3, maxdistanza);
    });
    // Richiedi un aggiornamento del componente

    // Inserimento di un ritardo di 2 secondi prima della successiva chiamata di servizio
    setTimeout(() => {
      this.hass.callService("switch", "turn_on", {
        entity_id: engineering_switch,
      });
    }, 2000); // 2000 millisecondi equivalgono a 2 secondi
  }

  _setNumber_direct_still(entity_id, engineering_switch, value) {
    // Assicurati che il valore non sia inferiore a 2
    const newValue = Math.max(2, parseFloat(value));

    // Ottenere il riferimento all'elemento input range per la posizione ferma (still)
    const rangeInputStill = this.shadowRoot.getElementById(
      "n_still"
    ) as HTMLInputElement;

    // Se il valore è inferiore a 2, imposta il valore dello slider a 2
    if (parseFloat(value) < 2) {
      rangeInputStill.value = "2";
    }

    // Chiama il servizio per impostare il nuovo valore
    this.hass.callService("number", "set_value", {
      entity_id: entity_id,
      value: newValue,
    });

    // Richiedi un aggiornamento del componente
    this.requestUpdate();

    // Inserimento di un ritardo di 2 secondi prima della successiva chiamata di servizio
    setTimeout(() => {
      this.hass.callService("switch", "turn_on", {
        entity_id: engineering_switch,
      });
    }, 2000); // 2000 millisecondi equivalgono a 2 secondi
  }

  handleZone1Change(event: Event) {
    const zone1Input = event.target as HTMLInputElement;
    const zone2Input = this.shadowRoot.getElementById(
      "zone2"
    ) as HTMLInputElement;
    const zone1spanLeft = this.shadowRoot.getElementById("spanZone1");
    const thumb1 = this.shadowRoot.getElementById("thumb1");
    const occupancy1 = this.shadowRoot.getElementById("zona1occupancy");
    const occupancy2 = this.shadowRoot.getElementById("zona2occupancy");

    // Assicura che zone1 non sia più grande di zone2
    if (parseInt(zone1Input.value) > parseInt(zone2Input.value)) {
      zone1Input.value = (parseInt(zone2Input.value) - 1).toString();
    }

    const newvalue =
      (100 / (parseInt(zone1Input.max) - parseInt(zone1Input.min))) *
        parseInt(zone1Input.value) -
      (100 / (parseInt(zone1Input.max) - parseInt(zone1Input.min))) *
        parseInt(zone1Input.min);
    zone1spanLeft.style.left = newvalue + "%";
    thumb1.style.left = newvalue + "%";
    occupancy1.style.width = newvalue + "%";
    occupancy2.style.left = newvalue + "%";
    const valueZone1Element = this.shadowRoot.getElementById(
      "valueZone1"
    ) as HTMLElement;
    valueZone1Element.innerText = zone1Input.value;
  }

  handleZone2Change(event: Event) {
    const zone2Input = event.target as HTMLInputElement;
    const zone1Input = this.shadowRoot.getElementById(
      "zone1"
    ) as HTMLInputElement;
    const zone3Input = this.shadowRoot.getElementById(
      "zone3"
    ) as HTMLInputElement;
    const value2span = this.shadowRoot.getElementById("valueZone2");
    const zone2spanLeft = this.shadowRoot.getElementById("spanZone2");
    const thumb2 = this.shadowRoot.getElementById("thumb2");
    const occupancy2 = this.shadowRoot.getElementById("zona2occupancy");
    const occupancy3 = this.shadowRoot.getElementById("zona3occupancy");
    // Assicura che zone2 non sia più piccolo di zone1 e più grande di zone3
    if (parseInt(zone2Input.value) < parseInt(zone1Input.value)) {
      zone2Input.value = (parseInt(zone1Input.value) + 1).toString();
    } else if (parseInt(zone2Input.value) > parseInt(zone3Input.value)) {
      zone2Input.value = (parseInt(zone3Input.value) - 1).toString();
    }
    const newvalue =
      (100 / (parseInt(zone2Input.max) - parseInt(zone2Input.min))) *
        parseInt(zone2Input.value) -
      (100 / (parseInt(zone2Input.max) - parseInt(zone2Input.min))) *
        parseInt(zone2Input.min);
    zone2spanLeft.style.left = newvalue + "%";
    thumb2.style.left = newvalue + "%";
    occupancy2.style.right = 100 - newvalue + "%";
    occupancy3.style.left = newvalue + "%";
    value2span.textContent = zone2Input.value;
  }

  handleZone3Change(event: Event) {
    const zone3Input = event.target as HTMLInputElement;
    const zone2Input = this.shadowRoot.getElementById(
      "zone2"
    ) as HTMLInputElement;
    const value3span = this.shadowRoot.getElementById("valueZone3");
    const zone3spanLeft = this.shadowRoot.getElementById("spanZone3");
    const thumb3 = this.shadowRoot.getElementById("thumb3");
    const occupancy3 = this.shadowRoot.getElementById("zona3occupancy");
    const occupancy4 = this.shadowRoot.getElementById("zona4occupancy");
    // Assicura che zone3 non sia più piccola di zone2
    if (parseInt(zone3Input.value) < parseInt(zone2Input.value)) {
      zone3Input.value = (parseInt(zone2Input.value) + 1).toString();
    }
    const newvalue =
      (100 / (parseInt(zone3Input.max) - parseInt(zone3Input.min))) *
        parseInt(zone3Input.value) -
      (100 / (parseInt(zone3Input.max) - parseInt(zone3Input.min))) *
        parseInt(zone3Input.min);

    zone3Input.oninput = () => {
      zone3spanLeft.style.left = newvalue + "%";
      thumb3.style.left = newvalue + "%";
      occupancy3.style.right = 100 - newvalue + "%";
      occupancy4.style.width = (newvalue - 100) * -1 + "%";
      value3span.textContent = zone3Input.value;
    };
  }

  firstUpdated(changedProps) {
    this.pushValue();
  }

  onRangeInputMove(event: Event) {
    const target = event.target as HTMLInputElement;
    this.MovingDistanceNumber = parseInt(target.value);
  }

  onRangeInputStill(event: Event) {
    const target = event.target as HTMLInputElement;
    this.StillDistanceNumber = parseInt(target.value);
  }

  select_box(entity_id, selectOptions, range) {
    return html`
      <select
        class="options-select"
        name="entity"
        id="entity"
        .value="${range}"
        @focusout=${(e) =>
          this._callserviceSelect(
            entity_id,
            "select",
            "select_option",
            e.target.value
          )}
        @change=${(e) =>
          this._callserviceSelect(
            entity_id,
            "select",
            "select_option",
            e.target.value
          )}
      >
        ${selectOptions
          ? selectOptions.map(
              (attr) => html`
                <option value="${attr}" ?selected="${attr === range}">
                  ${attr}
                </option>
              `
            )
          : ""}
      </select>
    `;
  }

  _moreinfo(entityinfo) {
    const popupEvent = new Event("hass-more-info", {
      bubbles: true,
      cancelable: false,
      composed: true,
    });

    // Utilizza 'as any' per aggirare la verifica del tipo
    (popupEvent as any).detail = { entityId: entityinfo };

    this.ownerDocument
      .querySelector("home-assistant")
      .dispatchEvent(popupEvent);
  }

  getLD2410DeviceNameDropdown(optionValue) {
    return html`
      ${this.config.devices_name && this.config.devices_name.length > 1
        ? html`
            <select
              name="device_name"
              id="device_name"
              class="select-ld-device"
              @change=${this.handleSelectChange}
            >
              ${this.config.devices_name.map(
                (device) => html`
                  <option
                    style="background-color:var(--secondary-background-color);"
                    value="${device.device}"
                  >
                    ${device.name}
                  </option>
                `
              )}
            </select>
          `
        : html`
            <div style="margin-left:0.5ch;">
              ${this.config.devices_name[0].name}
            </div>
          `}
    `;
  }

  handleSelectChange(event) {
    // Ottieni il valore selezionato
    const selectedValue = event.target.value;

    // Imposta this.ld24xxName al valore selezionato
    this.ld24xxName = selectedValue;
    this.pushValue();
  }

  pushValue() {
    this.requestUpdate();

    // Aspetta il prossimo aggiornamento della view
    this.updateComplete.then(() => {
      if (
        this.hass.states[`number.${this.ld24xxName}_zone_1_end_distance`] &&
        this.hass.states[`number.${this.ld24xxName}_zone_2_end_distance`] &&
        this.hass.states[`number.${this.ld24xxName}_zone_3_end_distance`]
      ) {
        const zone1input = this.shadowRoot.getElementById(
          "zone1"
        ) as HTMLInputElement;
        const zone2input = this.shadowRoot.getElementById(
          "zone2"
        ) as HTMLInputElement;
        const zone3input = this.shadowRoot.getElementById(
          "zone3"
        ) as HTMLInputElement;
        const valueZone1Element = this.shadowRoot.getElementById(
          "valueZone1"
        ) as HTMLElement;
        const valueZone2Element = this.shadowRoot.getElementById(
          "valueZone2"
        ) as HTMLElement;
        const valueZone3Element = this.shadowRoot.getElementById(
          "valueZone3"
        ) as HTMLElement;
        valueZone1Element.innerText = zone1input.value;
        valueZone2Element.innerText = zone2input.value;
        valueZone3Element.innerText = zone3input.value;
      }
    });
  }

  static get styles(): CSSResultGroup {
    return styles;
  }
}
