class IDGenerator {
  constructor() {
    this.generatedIds = {};
  }

  getUniqueId() {
    let result;
    let str = '';
    let i;
    const dict = 'dFhSjfoLKMwXynNQYmtORgkVPCxecDBGzquWUpZvEJTHbaIsilAr';

    for (i = 0; i < 16; i += 1) {
      str += dict.charAt(Math.floor(Math.random() * dict.length));
    }

    if (!this.generatedIds[str]) {
      this.generatedIds[str] = true;

      result = str;
    } else {
      result = this.getUniqueId();
    }

    return result;
  }
}

export default IDGenerator;
