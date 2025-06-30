document.addEventListener('DOMContentLoaded', () => {
    const translateBtn = document.getElementById('translateBtn');
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const sourceLang = document.getElementById('sourceLang');
    const targetLang = document.getElementById('targetLang');
    const swapBtn = document.getElementById('swapBtn');

    
    swapBtn.addEventListener('click', () => {
        const temp = sourceLang.value;
        sourceLang.value = targetLang.value;
        targetLang.value = temp;

        const input = inputText.value;
        inputText.value = outputText.value;
        outputText.value = input;
    });

    
    translateBtn.addEventListener('click', () => {
        const text = inputText.value.trim();
        const from = sourceLang.value;
        const to = targetLang.value;

        if (!text) {
            alert('Please enter text to translate.');
            return;
        }

        translateBtn.disabled = true;
        translateBtn.innerText = 'Translating...';

        fetch('https://libretranslate.de/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                q: text,
                source: from,
                target: to,
                format: 'text'
            })
        })
        .then(res => res.json())
        .then(data => {
            outputText.value = data.translatedText;
        })
        .catch(err => {
            console.error(err);
            alert('Translation failed. Please try again later.');
        })
        .finally(() => {
            translateBtn.disabled = false;
            translateBtn.innerText = 'Translate';
        });
    });
});
