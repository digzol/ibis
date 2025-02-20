export class RemoteFEPEntry {
  constructor(data) {
    const arrCode = data['name'].split(' +');
    switch (arrCode[0]) {
      case 'Strength': this.type = 'STR'; break;
      case 'Agility': this.type = 'AGI'; break;
      case 'Intelligence': this.type = 'INT'; break;
      case 'Constitution': this.type = 'CON'; break;
      case 'Perception': this.type = 'PER'; break;
      case 'Charisma': this.type = 'CHA'; break;
      case 'Dexterity': this.type = 'DEX'; break;
      case 'Will': this.type = 'WIL'; break;
      case 'Psyche': this.type = 'PSY'; break;
      default: this.type = '???';
    }
    this.mult = arrCode[1];
    this.value = data['value'];
  }
}
