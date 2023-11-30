// Create and register the card editor
import { customElement } from "lit/decorators";
import { html, css, LitElement } from "lit";

import { HomeAssistantFixed } from "./types";
import { EDITOR_CARD_TAG_NAME } from "./const";
import { getEntitiesByNameAndType, getdeviceName } from "./utils";


const avreceivers = {
  "anthemav": {
    "friendlyName": "Anthem A/V Receivers",
  },
  "arcam_fmj": {
    "friendlyName": "Arcam FMJ Receivers",
  },
  "denonavr": {
    "friendlyName": "Denon, Marantz A/V Receivers",
  },
  "heos": {
    "friendlyName": "Denon heos A/V Receivers",
  },
  "cast": {
    "friendlyName": "Google Cast ",
  },
  "harman_kardon_avr": {
    "friendlyName": "Harman Kardon AVR",
  },
  "monoprice": {
    "friendlyName": "Monoprice 6-Zone Amplifier",
  },
  "onkyo": {
    "friendlyName": "Onkyo A/V Receivers",
  },
  "sonos": {
    "friendlyName": "Sonos",
  },
  "pws66i": {
    "friendlyName": "Soundavo WS66i 6-Zone Amplifier",
  },
  "yamaha": {
    "friendlyName": "Yamaha Network Receivers",
  },
}

const AvReceiverdevicemap = new Map(Object.entries(avreceivers));


@customElement(EDITOR_CARD_TAG_NAME)
class LgD2410CardEditor extends LitElement {
  private _config: any;
  private hass: HomeAssistantFixed;

  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }

  // setConfig works the same way as for the card itself
  setConfig(config) {
    this._config = config;
  }

  // This function is called when the input element of the editor loses focus or is changed
  configChanged(ev) {

    const _config = Object.assign({}, this._config);
    _config[ev.target.name.toString()] = ev.target.value;
    this._config = _config;

    // A config-changed event will tell lovelace we have made changed to the configuration
    // this make sure the changes are saved correctly later and will update the preview
    const event = new CustomEvent("config-changed", {
      detail: { config: _config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  configChangedBool(ev) {
    const inputName = ev.target.name;
    const newValue = ev.target.value === 'true';

    const _config = Object.assign({}, this._config);
    _config[inputName] = newValue;
    this._config = _config;

    // Invia l'evento "config-changed"
    const event = new CustomEvent('config-changed', {
      detail: { config: _config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }





selectLDdevice(config) {
    let precenceDeviceSelector = getdeviceName(this.hass, 'esphome', 'ld2410_device_name');
    let heading = 'device name selector';
    let blankEntity = html``;
    
    // if (this._config.devices_name.ld_device == '') {
    //     blankEntity = html`<option value="" selected> - - - - </option>`;
    // }

    if (!config || !config.device_name) {
        config = { device_name: {} };
    }
    const pippo = this._config.device_name

    return html`
        <div class="heading">${heading}:</div>
        <select name="ld_device" id="ld_device" class="select-item" .value="${config}"
                @focusout=${this.deviceConfigChanged}
                @change=${this.deviceConfigChanged}>
            ${blankEntity}
            ${precenceDeviceSelector.map((eid) => {

                    return html`<option value="${eid}">${this.hass.states[eid].state || eid}</option> `;

            })}
        </select>
    </div>
    `;
}

  deviceConfigChanged(ev) {
      const _config = Object.assign({}, this._config);
      _config["device_name"] = { ...(_config["device_name"] ?? {}) };
      _config["device_name"][ev.target.name.toString()] = ev.target.value;
      this._config = _config;

      const event = new CustomEvent("config-changed", {
        detail: { config: _config },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }


  render() {


    return html`

            ${this.selectLDdevice(this._config.devices_name)}

prova
            Other functionalities must be configured manually in YAML editor
        `;
  }

  static get styles() {
    return css`
 
        .color-selector {
            display: grid;
            grid-template-columns: auto 8ch 3ch;
            width: 40ch;
        }
 
        .color-item {
            padding: .6em;
            font-size: 1em;
        }
 
        .heading {
            font-weight: bold;
        }
 
        .select-item {
            background-color: var(--label-badge-text-color);
            width: 40ch;
            padding: .6em; 
            font-size: 1em;
        }
 
        `;
  }

}