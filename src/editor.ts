// Create and register the card editor
import { customElement } from "lit/decorators";
import { html, css, LitElement } from "lit";

import { HomeAssistantFixed } from "./types";
import { EDITOR_CARD_TAG_NAME } from "./const";
import { getdeviceName } from "./utils";

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
    const newValue = ev.target.value === "true";

    const _config = Object.assign({}, this._config);
    _config[inputName] = newValue;
    this._config = _config;

    // Invia l'evento "config-changed"
    const event = new CustomEvent("config-changed", {
      detail: { config: _config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  selectLDdevice(config) {
    let precenceDeviceSelector = getdeviceName(
      this.hass,
      "esphome",
      "espresenceld_",
      "timeout"
    );
    let heading = "device name selector";

    if (!config || !config.devices_name) {
      config = { devices_name: [] };
    }

    // Filtra gli elementi che sono presenti in precenceDeviceSelector ma non in config.device_name
    const optionsToShow = precenceDeviceSelector.filter((device) => {
      return !this._config.devices_name.some(
        (configDevice) => configDevice.device === device.device
      );
    });
    return html`
      <br />
      <div style="width:40ch;">
        <div class="heading">${heading}:</div>
        <div class="add-device">
          <ha-icon
            style="cursor:pointer;margin-right:1ch;"
            data-input-name="buttons"
            icon="mdi:plus"
            @click=${() => {
              const ldDeviceSelect = this.shadowRoot.getElementById(
                "ld_device"
              ) as HTMLSelectElement;
              if (ldDeviceSelect) {
                const selectedOption =
                  ldDeviceSelect.options[ldDeviceSelect.selectedIndex];
                const friendlyName = selectedOption.textContent.trim();
                this.configAddname(ldDeviceSelect.value, friendlyName);
              }
            }}
          ></ha-icon>
          <select
            name="ld_device"
            id="ld_device"
            class="select-item"
            .value="- - - - -"
          >
            <option>- - - - - - - - - -</option>
            ${optionsToShow.map(
              (device) =>
                html`<option value="${device.device}">
                  ${device.friendly_name}
                </option>`
            )}
          </select>
        </div>
      </div>
    `;
  }

  builLIst(config) {
    if (!config || !config.devices_name) {
      config = { devices_name: {} };
    }

    return html`
      ${this._config.devices_name && this._config.devices_name.length !== 0
        ? html`
            <div style="width:40ch;padding-bottom: 0.8ch;">
              <p>LD24XX device list:</p>
              ${this._config.devices_name.map(
                (device) => html`
                  <div class="list">
                    <ha-icon
                      style="cursor:pointer;margin-right:1ch;"
                      data-input-name="buttons"
                      icon="mdi:trash-can-outline"
                      @click=${() => this.deleteelemnt(device)}
                    ></ha-icon>
                    <div>${device.device}</div>
                  </div>
                  <div style="margin-left: calc(24px + 1ch)">name to show</div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    class="device-name"
                    .value=${device.name}
                    @input=${(e) =>
                      this.updateName(device.device, e.target.value)}
                  />
                  <hr />
                `
              )}
            </div>
          `
        : html``}
    `;
  }

  deleteelemnt(elementToDelete) {
    const updatedDevices = this._config.devices_name.filter(
      (device) => device !== elementToDelete
    );

    // Creare una nuova configurazione senza modificare la configurazione esistente
    const newConfig = Object.assign({}, this._config, {
      devices_name: updatedDevices,
    });

    // Scatena l'evento "config-changed" con la nuova configurazione
    const event = new CustomEvent("config-changed", {
      detail: { config: newConfig },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  configAddname(ev, friendlyName) {
    // Verifica se ev è uguale a "- - - - - - - - - -" o "unavailable"
    if (ev === "- - - - - - - - - -" || ev === "unavailable") {
      return; // Non fare nulla se ev è uguale a "- - - - - - - - - -" o "unavailable"
    }

    // Assume che this._config sia un oggetto con una chiave "devices_name" che è un array
    const config = Object.assign({}, this._config);
    config["devices_name"] = [...(config["devices_name"] || [])]; // Copia l'array esistente o inizializza un array vuoto

    // Aggiungi un oggetto con le chiavi "device" e "name" al campo "devices_name"
    config["devices_name"].push({
      device: ev,
      name: friendlyName, // Sostituisci con il valore di input reale
    });

    // Aggiorna la configurazione
    this._config = config;

    // Scatena l'evento "config-changed"
    const event = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  updateName(device, newName) {
    // Assume che this._config sia un oggetto con una chiave "devices_name" che è un array
    const config = Object.assign({}, this._config);
    config["devices_name"] = config["devices_name"].map((dev) => {
      if (dev.device === device) {
        return { ...dev, name: newName };
      }
      return dev;
    });

    // Aggiorna la configurazione
    this._config = config;

    // Scatena l'evento "config-changed"
    const event = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  configChangedname(ev) {
    // Assume che this.config sia un oggetto con una chiave "devices_name" che è un array
    const config = Object.assign({}, this._config);
    config["devices_name"] = [...(config["devices_name"] || [])]; // Copia l'array esistente o inizializza un array vuoto

    // Aggiungi il valore dell'input all'array
    const inputValue = ev.target.value;
    config["devices_name"].push(inputValue);

    // Aggiorna la configurazione
    this._config = config;

    // Scatena l'evento "config-changed"
    const event = new CustomEvent("config-changed", {
      detail: { config: this._config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  deviceConfigChanged(ev) {
    const _config = Object.assign({}, this._config);
    _config["devices_name"] = { ...(_config["devices_name"] ?? {}) };
    _config["devices_name"] = ev;
    this._config = _config;

    const event = new CustomEvent("config-changed", {
      detail: { config: _config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
    console.log(ev);
  }

  render() {
    return html`
      ${this.builLIst(this._config.devices_name)}
      ${this.selectLDdevice(this._config.devices_name)}
    `;
  }

  static get styles() {
    return css`
      .list {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        margin-bottom: 1ch;
        width: -webkit-fill-available;
      }

      .add-device {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: -webkit-fill-available;
      }

      .heading {
        font-weight: bold;
        margin-bottom: 0.8ch;
      }

      .select-item {
        flex-grow: 1;
        padding: 0.6em;
        font-size: 1em;
      }
      .device-name {
        width: -webkit-fill-available;
        padding: 0.3em;
        font-size: 1em;
        margin-left: calc(24px + 1ch);
      }
    `;
  }
}
