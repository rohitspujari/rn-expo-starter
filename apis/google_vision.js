import GCP from '../gcp_account.json';
import axios from 'axios';
const VISION_API = `https://vision.googleapis.com/v1/images:annotate?key=${GCP.key}`

export const analyzeImage = (image, callback) => {
  getBase64Image(image, async (base64Image) => {
    const request = {
      requests: [
        {
          image: {
            content: base64Image
          },
          features: [
            { type: "LABEL_DETECTION" },
            { type: "WEB_DETECTION" },
            { type: "DOCUMENT_TEXT_DETECTION" },
            { type: "LANDMARK_DETECTION" }
          ]
        }
      ]
    }
    let response = await axios.post(VISION_API, request)
    callback(response.data.responses);
  });
}

getBase64Image = (img, callback) => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', img , true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function(e) {
    if (this.status == 200) {
      var uInt8Array = new Uint8Array(this.response);
      var i = uInt8Array.length;
      var binaryString = new Array(i);
      while (i--) {
        binaryString[i] = String.fromCharCode(uInt8Array[i]);
      }
      var data = binaryString.join('');
      if (!global.btoa) {
        global.btoa = require('base-64').encode;
      }
      var base64 = window.btoa(data);
      callback(base64)
      //callback("data:image/png;base64,"+base64);
    }
  };
  xhr.send();
}
