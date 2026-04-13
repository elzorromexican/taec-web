const buffer = "data: {\"test\":1}\r\n\r\ndata: {\"test\":2}\r\n\r\n";
const parts = buffer.split(/\r?\n\r?\n/);
console.log("Parts len:", parts.length);
console.log("Parts:", parts);
