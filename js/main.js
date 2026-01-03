// Studentkortsgenerator - DT084G Moment 4
// Namn: Sebastian Lindahl

// Väntar tills DOM är laddad innan skriptet körs
document.addEventListener('DOMContentLoaded', function() {
    
    // Hämta referenser till DOM-element
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const fontSelect = document.getElementById('font');
    const generateBtn = document.getElementById('generate');
    const clearBtn = document.getElementById('clear');
    const errorList = document.getElementById('errorlist');
    const previewCard = document.querySelector('#preview .card');
    const previewFullname = document.getElementById('previewfullname');
    const previewEmail = document.getElementById('previewemail');
    const previewPhone = document.getElementById('previewphone');
    const historySection = document.getElementById('history');

    // Ladda sparad data från localStorage vid sidladdning
    loadFromStorage();
    
    // Ladda och visa historik
    displayHistory();

    // Event listeners
    generateBtn.addEventListener('click', generateCard);
    clearBtn.addEventListener('click', clearForm);
    
    // Realtidsuppdatering av förhandsgranskning när användaren skriver
    fullnameInput.addEventListener('input', updatePreview);
    emailInput.addEventListener('input', updatePreview);
    phoneInput.addEventListener('input', updatePreview);
    fontSelect.addEventListener('change', updateFont);

    /**
     * Genererar ett studentkort baserat på formulärdata
     */
    function generateCard() {
        // Rensa tidigare felmeddelanden
        errorList.innerHTML = '';
        
        // Hämta värden från formuläret
        const fullname = fullnameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const font = fontSelect.value;
        
        // Validera inmatning
        const errors = validateInput(fullname, email, phone);
        
        // Om det finns fel, visa dem och avbryt
        if (errors.length > 0) {
            displayErrors(errors);
            return;
        }
        
        // Uppdatera förhandsvisningen
        previewFullname.textContent = fullname;
        previewEmail.textContent = email;
        previewPhone.textContent = phone;
        previewCard.style.fontFamily = font;
        
        // Spara i localStorage
        saveToStorage(fullname, email, phone, font);
        
        // Lägg till i historik
        addToHistory(fullname, email, phone, font);
        
        // Visa bekräftelsemeddelande
        console.log('Studentkort genererat!');
    }

    /**
     * Validerar användarens inmatning
     * {string} fullname - Fullständigt namn
     * {string} email - E-postadress
     * {string} phone - Telefonnummer
     * {Array} - Array med felmeddelanden
     */
    function validateInput(fullname, email, phone) {
        const errors = [];
        
        // Validera namn (får inte vara tomt)
        if (fullname === '') {
            errors.push('Namn får inte vara tomt');
        }
        
        // Validera e-post (enkel regex för e-postformat)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            errors.push('E-post får inte vara tom');
        } else if (!emailRegex.test(email)) {
            errors.push('E-postadressen har ett ogiltigt format');
        }
        
        // Validera telefonnummer (endast siffror, mellanslag och bindestreck tillåtna)
        const phoneRegex = /^[0-9\s\-]+$/;
        if (phone === '') {
            errors.push('Telefonnummer får inte vara tomt');
        } else if (!phoneRegex.test(phone)) {
            errors.push('Telefonnummer får endast innehålla siffror, mellanslag och bindestreck');
        } else if (phone.replace(/[\s\-]/g, '').length < 7) {
            errors.push('Telefonnummer måste innehålla minst 7 siffror');
        }
        
        return errors;
    }

    /**
     * Visar felmeddelanden i en lista
     * {Array} errors - Array med felmeddelanden
     */
    function displayErrors(errors) {
        errorList.innerHTML = ''; // Rensa tidigare fel
        
        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            li.className = 'error';
            errorList.appendChild(li);
        });
    }

    /**
     * Rensar formuläret och återställer förhandsvisningen
     */
    function clearForm() {
        // Rensa formulärfält
        fullnameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        fontSelect.value = 'Georgia';
        
        // Återställ förhandsvisning
        previewFullname.textContent = 'Namn';
        previewEmail.textContent = 'E-post';
        previewPhone.textContent = 'Telefon';
        previewCard.style.fontFamily = 'Georgia';
        
        // Rensa felmeddelanden
        errorList.innerHTML = '';
        
        // Rensa localStorage (valfri del)
        clearStorage();
    }

    /**
     * Uppdaterar förhandsvisningen i realtid medan användaren skriver
     */
    function updatePreview() {
        // Uppdatera endast om det finns text, annars visa placeholder
        previewFullname.textContent = fullnameInput.value.trim() || 'Namn';
        previewEmail.textContent = emailInput.value.trim() || 'E-post';
        previewPhone.textContent = phoneInput.value.trim() || 'Telefon';
    }

    /**
     * Uppdaterar typsnittet i förhandsvisningen
     */
    function updateFont() {
        previewCard.style.fontFamily = fontSelect.value;
    }

    /**
     * Sparar inmatade värden till localStorage (valfri del)
     * {string} fullname - Fullständigt namn
     * {string} email - E-postadress
     * {string} phone - Telefonnummer
     * {string} font - Valt typsnitt
     */
    function saveToStorage(fullname, email, phone, font) {
        const cardData = {
            fullname: fullname,
            email: email,
            phone: phone,
            font: font
        };
        
        // Spara som JSON-sträng i localStorage
        localStorage.setItem('studentCard', JSON.stringify(cardData));
    }

    /**
     * Laddar sparade värden från localStorage
     */
    function loadFromStorage() {
        const savedData = localStorage.getItem('studentCard');
        
        // Om det finns sparad data, ladda in den
        if (savedData) {
            try {
                const cardData = JSON.parse(savedData);
                
                fullnameInput.value = cardData.fullname || '';
                emailInput.value = cardData.email || '';
                phoneInput.value = cardData.phone || '';
                fontSelect.value = cardData.font || 'Georgia';
                
                // Uppdatera förhandsvisningen
                updatePreview();
                updateFont();
            } catch (e) {
                console.error('Fel vid inläsning av sparad data:', e);
            }
        }
    }

    /**
     * Rensar sparad data från localStorage
     */
    function clearStorage() {
        localStorage.removeItem('studentCard');
    }

    /**
     * Lägger till ett genererat kort i historiken
     * {string} fullname - Fullständigt namn
     * {string} email - E-postadress
     * {string} phone - Telefonnummer
     * {string} font - Valt typsnitt
     */
    function addToHistory(fullname, email, phone, font) {
        // Hämta befintlig historik från localStorage
        let history = JSON.parse(localStorage.getItem('cardHistory')) || [];
        
        // Skapa nytt historikobjekt med tidsstämpel
        const historyItem = {
            fullname: fullname,
            email: email,
            phone: phone,
            font: font,
            timestamp: new Date().toISOString()
        };
        
        // Lägg till i början av arrayen (nyast först)
        history.unshift(historyItem);
        
        // Begränsa historiken till de senaste 10 korten
        if (history.length > 10) {
            history = history.slice(0, 10);
        }
        
        // Spara uppdaterad historik
        localStorage.setItem('cardHistory', JSON.stringify(history));
        
        // Uppdatera visningen
        displayHistory();
    }

    /**
     * Visar historiken av genererade kort
     */
    function displayHistory() {
        // Hämta historik från localStorage
        const history = JSON.parse(localStorage.getItem('cardHistory')) || [];
        
        // Rensa befintlig historik (förutom rubriken)
        const existingList = historySection.querySelector('ul');
        if (existingList) {
            existingList.remove();
        }
        
        // Om historiken är tom, visa inget
        if (history.length === 0) {
            return;
        }
        
        // Skapa lista för historik
        const ul = document.createElement('ul');
        ul.style.listStyleType = 'none';
        ul.style.padding = '0';
        
        history.forEach((item, index) => {
            const li = document.createElement('li');
            li.style.marginBottom = '1em';
            li.style.padding = '0.5em';
            li.style.backgroundColor = '#f9f9f9';
            li.style.borderLeft = '3px solid #d04900';
            li.style.paddingLeft = '1em';
            
            // Formatera datum
            const date = new Date(item.timestamp);
            const formattedDate = date.toLocaleString('sv-SE');
            
            li.innerHTML = `
                <strong>${item.fullname}</strong><br>
                ${item.email}<br>
                ${item.phone}<br>
                <small style="color: #666;">Typsnitt: ${item.font} | ${formattedDate}</small>
            `;
            
            ul.appendChild(li);
        });
        
        historySection.appendChild(ul);
    }

    // Möjlighet att rensa historik
    const clearHistoryBtn = document.createElement('button');
    clearHistoryBtn.textContent = 'Rensa historik';
    clearHistoryBtn.className = 'btn';
    clearHistoryBtn.style.marginTop = '1em';
    clearHistoryBtn.addEventListener('click', function() {
        localStorage.removeItem('cardHistory');
        displayHistory();
    });
    historySection.appendChild(clearHistoryBtn);
});
