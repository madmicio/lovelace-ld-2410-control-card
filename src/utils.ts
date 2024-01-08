// export function getMediaPlayerEntitiesByPlatform(hass, platformName) {
//     let entities = Object.keys(hass.entities).filter(
//       (eid) => hass.entities[eid].platform === platformName
//     );
//     const re = /media_player/;
//     return entities.filter(a => re.exec(a));
//   }

//   export function getEntitiesByNameAndType(hass, namePart) {
//     // Ottieni le chiavi delle entità e filtra quelle il cui nome contiene la parte specificata
//     let entities = Object.keys(hass.entities).filter(
//         (eid) => eid.includes(namePart)
//     );

//     const re = /binary_sensor/;
//     return entities.filter(a => re.exec(a));
// }

// entity.attributes..includes(partOfName)

// export function getEntitiesByNameAndType(hass, platformName, partOfName) {
//     let entities = Object.keys(hass.entities).filter(
//         (eid) => {
//             const entity = hass.entities[eid];
//             return (
//                 entity.platform === platformName &&
//                 eid.includes(partOfName) &&
//                 eid.includes('binary_sensor')
//             );
//         }
//     );

//     return entities;
// }

export function getEntitiesByNameAndType(hass, platformName, partOfName, restOfNamea) {

    let entities = Object.keys(hass.entities).filter(
        (eid) => hass.entities[eid].platform === platformName
      );
    
    let filteredEntities = entities.filter(entityId =>
      entityId.includes(partOfName + restOfNamea)
    );
  
    const re = /binary_sensor/;
    return filteredEntities.filter(entityId => re.test(entityId));
  }

  // export function getdeviceName(hass, platformName, deviceName) {

  //   let entities = Object.keys(hass.entities).filter(
  //       (eid) => hass.entities[eid].platform === platformName
  //     );
    
  //     let filteredEntities = entities.filter(entityId =>
  //       entityId.includes(deviceName)
  //     );
  
  //   const re = /sensor/;
  //   return filteredEntities.filter(entityId => re.test(entityId));
  // }

  export function getdeviceNameb(hass, platformName, deviceName) {

    let entities = Object.keys(hass.entities).filter(
        (eid) => hass.entities[eid].platform === platformName
      );
    
      let filteredEntities = entities.filter(entityId =>
        entityId.includes(deviceName)
      );
  
      const re = /number/;
      let numberEntities = filteredEntities.filter(entityId => re.test(entityId));
    
      // Creare una lista di oggetti contenenti id entità e stato corrispondente
      let entityStates = numberEntities.map(entityId => hass.states[entityId]);

      return entityStates;
  }

//   export function getdeviceName(hass, platformName, deviceName, deviceNamePt2) {
//     let entities = Object.keys(hass.entities).filter(
//         (eid) => hass.entities[eid].platform === platformName
//     );

//     let filteredEntities = entities.filter(entityId =>
//         entityId.includes(deviceName) && entityId.includes(deviceNamePt2)
//     );

//     const re = /number/;
//     let numberEntities = filteredEntities.filter(entityId => re.test(entityId));

//     // Creare una lista di oggetti contenenti id entità e stato corrispondente
//     let entity_id_name = numberEntities.map(entityId => hass.states[entityId].entity_id);

//     let friendly_name = numberEntities.map(entityId => hass.states[entityId].attributes.friendly_name);
//     let cleanedfriendly_name = friendly_name.map(friendlyId => friendlyId.replace(/ Timeout$/, ''));

//     // Rimuovere "number." e "_timeout" da ciascun elemento di entity_id_name
//     let cleanedNames = entity_id_name.map(entityId => entityId.replace(/^number\./, '').replace(/_timeout$/, ''));

//     // Restituire un oggetto contenente cleanedNames e cleanedfriendly_name
//     return [cleanedNames, cleanedfriendly_name];
// }

export function getdeviceName(hass, platformName, deviceName, deviceNamePt2) {
  let entities = Object.keys(hass.entities).filter(
      (eid) => hass.entities[eid].platform === platformName
  );

  let filteredEntities = entities.filter(entityId =>
      entityId.includes(deviceName) && entityId.includes(deviceNamePt2)
  );

  const re = /number/;
  let numberEntities = filteredEntities.filter(entityId => re.test(entityId));

  // Creare un array di oggetti contenenti id entità, nome dell'entità e friendly_name corrispondente
  let deviceData = numberEntities.map(entityId => {
      const cleanedEntityId = entityId.replace(/^number\./, '').replace(/_timeout$/, '');
      const friendlyName = hass.states[entityId].attributes.friendly_name.replace(/ Timeout$/, '');

      return {
          device: cleanedEntityId,
          friendly_name: friendlyName
      };
  });

  return deviceData;
}

