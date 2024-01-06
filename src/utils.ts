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

  export function getdeviceName(hass, platformName, deviceName) {

    let entities = Object.keys(hass.entities).filter(
        (eid) => hass.entities[eid].platform === platformName
      );
    
      let filteredEntities = entities.filter(entityId =>
        entityId.includes(deviceName)
      );
  
      const re = /sensor/;
      let sensorEntities = filteredEntities.filter(entityId => re.test(entityId));
    
      // Creare una lista di oggetti contenenti id entità e stato corrispondente
      let entityStates = sensorEntities.map(entityId => hass.states[entityId].state);

      return entityStates;
  }

