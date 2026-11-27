---
title: "Pawn’s Passage: de mi primer if al puesto 23"
description: "Así diseñé un bot que reconocía patrones de ataque y alcancé el puesto 23 en Pawn’s Passage, una arena de CodeCombat AI League de 2025."
slug: pawns-passage
section: projects
projectTitle: Pawn’s Passage
author: Axel Rodriguez
publishedAt: "2026-11-26"
language: es
type: case-study
draft: false
translationId: pawns-passage-case-study
tags: [CodeCombat, programación competitiva, máquinas de estados]
images:
  - src: /images/pawns-passage/clasificacion-codecombat.png
    alt: Tabla de Pawn’s Passage con Axel Rodriguez resaltado en el puesto 23 y 9,006 puntos.
    caption: Mi posición y puntuación en la clasificación de Pawn’s Passage.
    width: 651
    height: 732
  - src: /images/pawns-passage/distribucion-jugadores-codecombat.png
    alt: Gráfica de puntuaciones de Pawn’s Passage con un total de 29,486 jugadores.
    caption: Distribución de puntuaciones y total de jugadores que muestra la arena.
    width: 652
    height: 225
references:
  - label: Clasificación oficial de Pawn’s Passage
    url: https://codecombat.com/play/ladder/pawns-passage
  - label: "CodeCombat AI League · Temporada 13: Checkmate Challenge"
    url: https://codecombat.com/league/the-samuraisdd
---

**2025 · Temporada 13, Checkmate Challenge**

Me inscribí por accidente. Apenas había aprendido a usar `if` en el primer mundo de CodeCombat y estaba empezando el segundo. Vi que había torneos y entré a curiosear, pensando que competiría cuando supiera más. Ese día no había dormido. Confundí el formulario de registro con el de inicio de sesión y, cuando me di cuenta, ya estaba dentro. Lo primero que pensé fue «¿Y si alguien busca mi nombre y ve que quedé en último lugar?». Así que decidí intentarlo.

Había visto un tutorial de máquinas de estados en Godot y quise adaptar la idea a mi bot. A pura prueba y error conseguí que jugara, aunque seguía muy abajo en la tabla. Entonces me puse a ver los bots de los 100 primeros. Medí la velocidad, la vida, el daño y el alcance de las unidades. Conté las casillas del tablero y observé cuánto tardaban en aparecer las monedas. Quería entender qué hacía que una línea de ataque funcionara y en qué condiciones se podía romper.

Al ver las partidas juntas, empecé a reconocer patrones que se repetían entre rivales distintos. Lo que más me gustó vino cuando empecé a diseñar mis propios patrones para desarmar los suyos. Una fila llena de enemigos podía exigir respuestas muy distintas según cuántos venían, qué unidades eran y cuánto dinero tenía para responder. A veces convenía contener el ataque. Otras veces podía romper la formación o barrer la línea. Tenía que decidir qué observar en el tablero para distinguir esos casos y convertir esa distinción en una regla que el bot pudiera ejecutar solo.

Eso terminó siendo mi versión de una máquina de estados. El bot leía lo que estaba pasando en las líneas y cambiaba de estrategia a medida que cambiaba la partida. Cuando empezó a responder a los patrones que yo había visto en las repeticiones, subí rápido al top 100. De pronto estaba ganándole a algunos de los jugadores que había pasado horas estudiando.

La clasificación de Pawn’s Passage me muestra en el **puesto 23, con 9,006 puntos**, en una arena que registra **29,486 jugadores**. Todavía quería probar qué pasaría si incorporaba las habilidades especiales. Había entrado tarde, estaba trabajando y se me acabó el tiempo antes de aprender a usar los vectores que necesitaba para algunas de ellas.

Todavía me da risa pensar que entré por error. Abrí el torneo para ver cómo era y acabé cronometrando monedas, contando casillas y probando si una idea que había visto en un tutorial de Godot podía romper el ataque de uno de los mejores bots de la tabla.
