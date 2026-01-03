Studentkortsgenerator - Moment 4

Kursinformation
Kurs: DT084G - Introduktion till programmering i JavaScript
Student: Sebastian Lindahl
Termin: HT25
Inlämningsdatum: Januari 2026

GitHub Classroom
Detta projekt är en del av GitHub Classroom-uppgiften för Moment 4.
Repository: Webbutvecklings-programmet/moment4-ht25-sebastianLindahl

Om uppgiften
Detta projekt är en webbapplikation som genererar digitala studentkort baserat på användarens inmatning. 
Applikationen uppfyller kraven för Laboration 4 i kursen DT084G vid Mittuniversitetet.
Uppgiften går ut på att skapa en webbapplikation med DOM-manipulation, 
händelsehantering och formulärvalidering i JavaScript.

Funktionalitet
Obligatoriska krav (G-nivå)
DOM-manipulation - Kod för att modifiera Document Object Model
Händelsehantering - Event handlers för användargränssnitt
Formulärvalidering med följande kontroller:
Namn får inte vara tomt
E-post måste ha giltigt format (regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
Telefonnummer får endast innehålla siffror, mellanslag och bindestreck
Minst 7 siffror i telefonnummer
Felhantering - Felmeddelanden lagras i array och visas i lista
Generera visitkort - Visa information på digitalt studentkort
Rensa formulär - Återställ alla fält och felmeddelanden
Kommenterad kod - Välstrukturerad och förståelig JavaScript-kod

Valfria krav (VG-nivå)
Web Storage API (localStorage)
Sparar inmatade värden automatiskt
Laddar tillbaka data vid sidladdning
Möjlighet att rensa sparad data
Historikfunktion
Sparar de senaste 10 genererade studentkorten
Visar tidsstämpel för varje kort
Möjlighet att rensa hela historiken
Extra funktioner:
Realtidsuppdatering av förhandsvisning
Dynamisk ändring av typsnitt
Väldesignat användargränssnitt

Tekniker
HTML5 - Semantisk struktur
CSS3 - Responsiv design och styling
JavaScript - Moderna JavaScript-funktioner
Web Storage API - LocalStorage för persistent data
Regular Expressions - Validering av e-post och telefonnummer
DOM API - Dynamisk manipulation av webbsidan

Användning
Steg 1: Fyll i formuläret
Namn - Ange ditt fullständiga namn (Förnamn Efternamn)
E-post - Ange en giltig e-postadress (namn@domän.se)
Telefon - Ange telefonnummer (t.ex. 070-123 45 67)
Typsnitt - Välj önskat typsnitt från dropdown-menyn

Steg 2: Generera kort
Klicka på knappen "Generera visitkort"
Om all information är korrekt:
Studentkortet uppdateras med din information
Data sparas automatiskt i localStorage
Kortet läggs till i historiken
Om något är fel:
Felmeddelanden visas i en lista ovanför formuläret
Rätta till felen och försök igen

Steg 3: Hantera data
Rensa - Återställer formuläret och tar bort sparad data
Historik - Scrolla ner för att se tidigare genererade kort
Rensa historik - Ta bort alla sparade kort från historiken

Författare
Sebastian Lindahl
Mittuniversitetet
Kontakt: sebastian.lindahl96@hotmail.com
GitHub: sebastianLindahl
