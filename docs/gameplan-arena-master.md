# Gameplan: Arena Master

## Vision

Arena Master ist ein cozy Fantasy Idle-Creature-Arena-Game. Der Spieler fuehrt eine kleine Arena, sammelt Pets, trainiert sie ueber Zeit und verteidigt die Arena gegen immer staerkere NPC-Trainer.

## Kernloop

1. Idle-Belohnungen einsammeln.
2. Pets trainieren und Level-Ups ausloesen.
3. Bis zu 3 Pets ins Arena-Team setzen.
4. NPC-Herausforderer automatisch bekaempfen.
5. Gold, Ruf und XP erhalten.
6. Arena ausbauen und bessere Belohnungen freischalten.
7. Nach 5 Siegen besonderen Herausforderer besiegen.

## Spielerwerte

- Name und Level fuer Fortschritt.
- Gold als Ausbau- und Belohnungswaehrung.
- Ruf als langfristiger Arena-Fortschritt.
- Trainingspunkte fuer Pet-Training.
- Arena-Level fuer Titel, Optik und Belohnungsmultiplikator.
- Siege und Niederlagen als Kampfhistorie.

## Pets

Pets besitzen Typ, Seltenheit, Level, XP, HP, Angriff, Verteidigung, Geschwindigkeit und Bindung. Bindung zaehlt nur fuer das Spielerteam und macht langfristig trainierte Pets wertvoller.

## Training

Training kostet 2 Trainingspunkte und gibt:

- +1 Angriff
- +1 Verteidigung
- +2 HP
- +1 Bindung
- +5 XP

Level-Ups passieren bei `level * 20` XP und verbessern alle Kernwerte.

## Kampf

Kaempfe sind fuer den MVP automatisch. Die Staerke des Spielerteams ist die Summe aus HP, Angriff, Verteidigung, Geschwindigkeit und Bindung. NPCs nutzen dieselben Kernwerte ohne Bindung plus einen kleinen Schwierigkeitsbonus. Beide Seiten erhalten einen Zufallsfaktor von plus/minus 15 Prozent.

## Besonderer Kampf

Nach 5 normalen Siegen erscheint ein besonderer Herausforderer. Der Spieler entscheidet zwischen Auto-Kampf und aktivem Eingriff. Der aktive Eingriff gibt im Prototyp einmalig +20 Prozent Teamstaerke und zeigt einen Motivationshinweis.

## Arena-Ausbau

Die Ausbaukosten betragen `arenaLevel * 150`. Jedes neue Arena-Level gibt einen neuen Titel, veraendert die Arena-Optik leicht und erhoeht Kampfbelohnungen.

## Speicherstand

Der Spielstand wird in `localStorage` gespeichert:

- Spielerwerte
- Pets und Werte
- Aktives Team
- NPC-Fortschritt
- Besonderer-Kampf-Status
- Letzter Spielzeitpunkt
- Offene Idle-Belohnung
- Ereignis-Log

## Erweiterungsideen

- Typ-Matchups fuer Feuer, Wasser, Natur, Erde, Luft, Schatten und Licht.
- Aktive Skills fuer besondere Kaempfe.
- Pet-Fusion oder Entwicklung.
- Arena-Dekorationen mit passiven Boni.
- NPC-Ligen, Ranglisten und Saisonziele.
- Sound, Animationen und kleine Kampfsequenzen.
