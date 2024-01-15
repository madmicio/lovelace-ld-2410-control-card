export function getEntitiesByNameAndType(
  hass,
  platformName,
  partOfName,
  restOfNamea
) {
  let entities = Object.keys(hass.entities).filter(
    (eid) => hass.entities[eid].platform === platformName
  );

  let filteredEntities = entities.filter((entityId) =>
    entityId.includes(partOfName + restOfNamea)
  );

  const re = /binary_sensor/;
  return filteredEntities.filter((entityId) => re.test(entityId));
}

export function getdeviceNameb(hass, platformName, deviceName) {
  let entities = Object.keys(hass.entities).filter(
    (eid) => hass.entities[eid].platform === platformName
  );

  let filteredEntities = entities.filter((entityId) =>
    entityId.includes(deviceName)
  );

  const re = /number/;
  let numberEntities = filteredEntities.filter((entityId) => re.test(entityId));

  // Creare una lista di oggetti contenenti id entità e stato corrispondente
  let entityStates = numberEntities.map((entityId) => hass.states[entityId]);

  return entityStates;
}

export function getdeviceName(hass, platformName, deviceName, deviceNamePt2) {
  let entities = Object.keys(hass.entities).filter(
    (eid) => hass.entities[eid].platform === platformName
  );

  let filteredEntities = entities.filter(
    (entityId) =>
      entityId.includes(deviceName) && entityId.includes(deviceNamePt2)
  );

  const re = /number/;
  let numberEntities = filteredEntities.filter((entityId) => re.test(entityId));

  // Creare un array di oggetti contenenti id entità, nome dell'entità e friendly_name corrispondente
  let deviceData = numberEntities.map((entityId) => {
    const cleanedEntityId = entityId
      .replace(/^number\./, "")
      .replace(/_timeout$/, "");
    const friendlyName = hass.states[entityId].attributes.friendly_name.replace(
      / Timeout$/,
      ""
    );

    return {
      device: cleanedEntityId,
      friendly_name: friendlyName,
    };
  });

  return deviceData;
}
