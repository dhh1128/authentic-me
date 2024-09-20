export function el(id) {
    return document.getElementById(id);
}

export function getTextValue(element) {
    if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
        return element.value;
    } else {
        return element.innerText;
    }
}

export function reset() {
    const caller = event.target;
    const resettableElements = document.querySelectorAll('.resettable');
    resettableElements.forEach(element => {
        if (element === caller) { } else {
            if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
                element.value = '';
            } else {
                element.innerText = '';
            }
        }
    });
}

// Add event listener for items that allow text input. 
// When the user types in one of these places, clear anything with class=resettable.
const input = document.querySelector('input[type="text"]');
if (input) {
    input.addEventListener('input', reset);
}
const textarea = document.querySelector('textarea');
if (textarea) {
    textarea.addEventListener('input', reset);
}

function copyValue() {
    // Copy the value of the element with the ID specified in the "for" attribute
    const forAttr = this.getAttribute('for');
    const target = el(forAttr);
    const value = getTextValue(target);
    navigator.clipboard.writeText(value).then(() => {
        // Add the animation class to the textarea
        target.classList.add('copied');
        // Remove the animation class after the animation ends (0.5s in this case)
        setTimeout(function() {
            target.classList.remove('copied');
        }, 500);
        })
    .catch((error) => {
       console.error('Failed to copy value to clipboard:', error);
    });
}

// Find each label in the DOM that has a "for" attribute.
const labels = document.querySelectorAll('label[for]');  
// Add event listener to each label, so that when the corresponding
// icon is clicked, the value of the input is copied to the clipboard.
labels.forEach(label => {
    label.addEventListener('click', copyValue);
});

  