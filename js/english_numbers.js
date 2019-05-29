// Convert Numbers to English
//=============================================================================
function englishNumber(n) {
    const onesMap = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
        'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
    const tensMap = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']

    let english = ''

    n = parseInt(n)
    if (n < 0 || n > 1000000) return 'unknown number'
    if (n === 0) return 'zero'
    if (n === 1000000) return 'one million'

    if (n >= 1000) {
        let thousands = Math.floor(n / 1000)
        english += englishNumber(thousands) + " thousand"
        n = (n - (thousands * 1000))
        if (n > 0) {
            english += ' '
        }
    }

    if (n >= 100) {
        let hundreds = Math.floor(n / 100)
        english += englishNumber(hundreds) + " hundred"
        n = (n - (hundreds * 100))
        if (n > 0) {
            english += ' and '
        }
    }

    if (n >= 20) {
        let tens = Math.floor(n / 10)
        english += tensMap[tens]
        n = (n - (tens * 10))
        if (n > 0) {
            english += '-'
        }
    }

    if (n > 0) {
        english +=  onesMap[n]
    }

    return english
}

// Number Input with count buttons
// This fulfulls the "counting" requirement
//=============================================================================
let numberInput = document.getElementById('number-input')
let numberInputLabel = document.getElementById('number-input-label')

function updateInputDisplay() {
    numberInputLabel.innerHTML = englishNumber(numberInput.value)
}

function addToCount(amount) {
    let currentValue = parseInt(numberInput.value)
    let newValue = currentValue + amount

    const minimum = 0
    const maximum = 1000000
    newValue = Math.min(newValue, maximum)
    newValue = Math.max(newValue, minimum)

    numberInput.value = newValue
    updateInputDisplay()
}

numberInput.addEventListener('input', (e) => {
    updateInputDisplay()
})


// Slider Range Input
// This fulfulls the BONUS requirement, using de-bounce to prevent browser overload
//=============================================================================
let numberRange = document.getElementById('number-range')
let numberRangeLabel = document.getElementById('number-range-label')
let numberRangeValue = document.getElementById('number-range-value')

let debounceTimeout

function debounceUpdateRangeDisplay() {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
        numberRangeValue.innerHTML = numberRange.value
        numberRangeLabel.innerHTML = englishNumber(numberRange.value)
    }, 200)
}

numberRange.addEventListener('input', (e) => {
    debounceUpdateRangeDisplay()
})
