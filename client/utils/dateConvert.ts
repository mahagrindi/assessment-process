
function dateConvert(date: string): string {
     const parts = date.split("T")[0].split("-");
     return `${parts[0]}/${parts[1]}/${parts[2]}`;
 }
 