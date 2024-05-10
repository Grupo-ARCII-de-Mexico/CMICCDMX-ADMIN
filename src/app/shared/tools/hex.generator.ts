export function HEXGenerator():string {
    const componenteHex = () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  
    const r = componenteHex();
    const g = componenteHex();
    const b = componenteHex();
  
    return `#${r}${g}${b}`;
  }