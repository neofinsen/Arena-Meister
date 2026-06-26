# Arena Master

Ein lokal startbarer One-Shot-Prototyp fuer ein mobiles Idle-Creature-Arena-Game. Du bist Arenaleiter, sammelst und trainierst Pets, stellst ein Team zusammen, verteidigst deine Arena gegen NPC-Herausforderer und baust die Arena schrittweise aus.

## Startanleitung

Oeffne `index.html` direkt im Browser.

Optional mit lokalem Server:

```powershell
cd "D:\Projekte\Arena Master"
python -m http.server 5173
```

Danach im Browser `http://localhost:5173` oeffnen.

## Enthaltene Funktionen

- Mobile-first UI mit Arena, Tabs, Spielerstatus und Ressourcen.
- 8 Beispiel-Pets mit Typ, Seltenheit, Level, XP und Kampfwerten.
- Team-System fuer bis zu 3 aktive Pets; ohne Auswahl werden automatisch die ersten 3 Pets genutzt.
- Training fuer Pets mit Trainingspunkt-Kosten, Werte-Steigerungen und Level-Ups.
- Idle-Belohnungen per `localStorage` mit maximal 120 Minuten Offline-Zeit.
- 6 NPC-Herausforderer plus besonderer Herausforderer nach 5 normalen Siegen.
- Automatisches Kampfsystem mit Teamstaerke, NPC-Staerke und Zufallsfaktor.
- Aktiver Eingriff beim besonderen Kampf mit einmaligem Staerkebonus.
- Arena-Ausbau mit steigenden Kosten, neuen Titeln und besseren Belohnungen.
- Spielstand speichern und zuruecksetzen.
- Ereignis- und Kampf-Log.

## Naechste sinnvolle Entwicklungsschritte

- Pet-Faehigkeiten, Typ-Vorteile und einfache Status-Effekte.
- Mehr Arena-Gebaeude wie Trainingsplatz, Shop oder Brutplatz.
- Quest-System mit Tageszielen und Meilensteinen.
- Balancing-Pass fuer Kampfwerte, Belohnungen und Ausbaukosten.
- Kleine Animationen fuer Training, Sieg, Niederlage und Arena-Ausbau.
- Export/Import von Spielstaenden.

## Hinweise

Der Prototyp nutzt keine externen Abhaengigkeiten und keine Bildquellen. Alle Platzhalter werden mit CSS und Emoji-Icons dargestellt.
