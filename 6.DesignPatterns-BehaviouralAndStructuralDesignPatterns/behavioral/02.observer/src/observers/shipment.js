export class Shipment {
  update({id, username}) {
    console.log(`[${id}]: shipment will pack the user's order to ${username}`);
  }
}