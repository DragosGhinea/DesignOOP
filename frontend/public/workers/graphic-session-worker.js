import { convertStringToBase64 } from "@/utils/base64";
import JSONCrush from "jsoncrush";


// self.onmessage = function (event) {
//     console.log("Worker received message")
//     const crushed = JSONCrush.crush(JSON.stringify(event.data));
//     self.postMessage(convertStringToBase64(crushed));
// }

addEventListener('message', (e) => {
    const crushed = JSONCrush.crush(JSON.stringify(e.data));
    self.postMessage(convertStringToBase64(crushed));
  })