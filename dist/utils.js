"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = generateHash;
function generateHash(len) {
    let randomOptions = "awrjijtjrkjiqewrtyuioplkjhgfdsaxzcvbbnm454789632147789";
    let length = randomOptions.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += randomOptions[Math.floor(Math.random() * length)];
    }
    return ans;
}
