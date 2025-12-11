export function generateHash(len: number) {
    let randomOptions = "awrjijtjrkjiqewrtyuioplkjhgfdsaxzcvbbnm454789632147789"
    let length = randomOptions.length;

    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += randomOptions[Math.floor(Math.random() * length)];
    }
    return ans;
}         

