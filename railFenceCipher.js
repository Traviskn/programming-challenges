// Rail Fence Cipher (ZigZag Cipher)
// Author: Travis Nuttall

/*
 * Problem Description. source:
 * https://www.reddit.com/r/dailyprogrammer/comments/2rnwzf/20150107_challenge_196_intermediate_rail_fence/
 *
 * Before the days of computerised encryption, cryptography was done manually by
 * hand. This means the methods of encryption were usually much simpler as they
 * had to be done reliably by a person, possibly in wartime scenarios.
 * One such method was the rail-fence cipher. This involved choosing a number
 * (we'll choose 3) and writing our message as a zig-zag with that height (in
 * this case, 3 lines high.) Let's say our message is REDDITCOMRDAILYPROGRAMMER.
 * We would write our message like this:
 * R   I   M   I   R   A   R
 *  E D T O R A L P O R M E
 *   D   C   D   Y   G   M
 * See how it goes up and down? Now, to get the ciphertext, instead of reading
 * with the zigzag, just read along the lines instead. The top line has RIMIRAR,
 * the second line has EDTORALPORME and the last line has DCDYGM. Putting those
 * together gives you RIMIRAREDTORALPORMEDCDYGM, which is the ciphertext.
 * You can also decrypt (it would be pretty useless if you couldn't!). This
 * involves putting the zig-zag shape in beforehand and filling it in along the
 * lines. So, start with the zig-zag shape:
 * ?   ?   ?   ?   ?   ?   ?
 *  ? ? ? ? ? ? ? ? ? ? ? ?
 *   ?   ?   ?   ?   ?   ?
 * The first line has 7 spaces, so take the first 7 characters (RIMIRAR) and fill them in.
 * R   I   M   I   R   A   R
 *  ? ? ? ? ? ? ? ? ? ? ? ?
 *   ?   ?   ?   ?   ?   ?
 * The next line has 12 spaces, so take 12 more characters (EDTORALPORME) and fill them in.
 * R   I   M   I   R   A   R
 *  E D T O R A L P O R M E
 *   ?   ?   ?   ?   ?   ?
 * Lastly the final line has 6 spaces so take the remaining 6 characters (DCDYGM) and fill them in.
 * R   I   M   I   R   A   R
 *  E D T O R A L P O R M E
 *   D   C   D   Y   G   M
 * Then, read along the fence-line (zig-zag) and you're done!
 */

function encrypt(text, key) {
  let letters = text.split('')

  // rows represent rails along the fence
  let rows = []
  for (let i = 0; i < key; i++) {
    rows.push("")
  }

  // track which direction we are going along the zig zag
  let moveUp = true
  let currentRow = 0

  // place letters into the rows
  letters.forEach(function(letter) {
    rows[currentRow] += letter

    if (currentRow === 0) {
      moveUp = true
    }
    else if (currentRow === (key - 1)) {
      moveUp = false
    }

    moveUp ? currentRow += 1 : currentRow -= 1
  })

  // put the rows together into the cipher text
  cipherText = rows.join("")

  return cipherText
}

function decrypt(cipherText, key) {
  let length = cipherText.length
  let letters = cipherText.split("")

  // rows represent rails along the fence
  // at first we just store a count of how many letters go on each row
  let rows = []
  for (let i = 0; i < key; i++) {
    rows.push(0)
  }

  // track which direction we are going along the zig zag
  let moveUp = true
  let currentRow = 0

  // calculate how many letters go on each row
  for (let i = 0; i < length; i++) {
    rows[currentRow] += 1

    if (currentRow === 0) {
      moveUp = true
    }
    else if (currentRow === (key - 1)) {
      moveUp = false
    }

    moveUp ? currentRow += 1 : currentRow -= 1
  }

  // re-create the rows array with the correct number of letters on each row
  rows = rows.map(function(rowLength) {
    return letters.splice(0, rowLength)
  })

  // store the decrypted message in a string
  let text = ""

  // reset our zig zag tracking variables
  moveUp = true
  currentRow = 0

  // read the letters along the 'zig zag'
  for (let i = 0; i < length; i++) {
    text += rows[currentRow].shift()

    if (currentRow === 0) {
      moveUp = true
    }
    else if (currentRow === (key - 1)) {
      moveUp = false
    }

    moveUp ? currentRow += 1 : currentRow -= 1
  }

  return text
}

// Test Cases
let plainText = "REDDITCOMRDAILYPROGRAMMER"
let key = 3
let cipherText = "RIMIRAREDTORALPORMEDCDYGM"

if (encrypt(plainText, key) === cipherText) {
  console.log("ENCRYPTION CORRECT!")
}
else {
  console.log("ENCRYPTION INCORRECT!")
}

if (decrypt(cipherText, key) === plainText) {
  console.log("DECRYPTION CORRECT!")
}
else {
  console.log("DECRYPTION INCORRECT!")
}
