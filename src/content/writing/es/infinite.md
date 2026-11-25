---
title: "Infinite y la ingeniería del trabajo autónomo"
description: "Cómo el backend de Infinite coordina agentes, recupera tareas bajo fallos y verifica resultados y decisiones."
slug: infinite
section: projects
author: Axel Rodriguez
publishedAt: "2026-11-25"
language: es
type: case-study
draft: false
translationId: infinite-case-study
---

<p class="page-lead">Desarrollo el backend de Infinite, un sistema agéntico para coordinar trabajo de marketing. El sistema conecta datos de campañas, análisis y propuestas con decisiones que una persona puede revisar. Está diseñado para recuperar el trabajo tras una interrupción y comprobar sus resultados antes de darlo por cerrado.</p>

En una prueba de Infinite cortamos el proceso justo después de que un servicio simulado ejecutara una acción. El efecto ya existía del otro lado. Infinite todavía carecía del comprobante. Cuando el trabajo se reanudó, el sistema recuperó la misma ejecución y reconcilió el resultado. En el registro del simulador seguía habiendo un solo efecto.

Ese corte resume el problema más difícil que encontré al desarrollar el backend. **Un sistema autónomo puede perder una respuesta en el preciso momento en que el mundo ya cambió.** Si se limita a repetir lo que hizo, puede ejecutar dos veces la misma acción. Si da el trabajo por terminado, puede afirmar algo que todavía ignora. Y mientras resuelve esa duda, el resto de los agentes y usuarios sigue trabajando.

Infinite es un producto de Octopus Labs que estoy desarrollando para transformar datos y contexto de una marca en análisis, propuestas y trabajo de marketing que se pueda revisar y llevar a la práctica. El reto de fondo era mantener una historia coherente del trabajo a pesar de que cada parte del sistema avanza a su ritmo. Los datos pueden llegar tarde, las propuestas cambian durante una revisión y el proveedor externo tiene su propio estado. Me interesaba diseñar un backend que pudiera conservar qué ocurrió, quién lo autorizó y qué evidencia permite continuar.

## Una tarea necesita un contrato con la siguiente

El trabajo tiene varias responsabilidades. Hay que observar la campaña, interpretar lo observado, preparar una propuesta, decidir qué se puede hacer con ella y, cuando corresponde, comprobar el efecto de la acción. La dificultad aparece en lo que una etapa entrega a la siguiente. Un análisis debe decir qué dato respalda su conclusión, de qué período proviene y qué preguntas quedaron abiertas. Una propuesta debe identificar el contenido que se presentó a revisión. Una decisión debe corresponder a la versión que la persona tuvo delante.

Elegí tratar esos puntos como contratos que se pueden comprobar. Una observación incompleta puede producir un análisis útil con una limitación explícita. Una propuesta puede estar bien formada y seguir esperando revisión. Un proceso puede cerrar su ejecución y dejar un efecto externo sin confirmar. Cada resultado habilita pasos distintos.

Con más de un usuario, esa precisión también protege el contexto del trabajo. Quiero poder responder a qué marca pertenece un resultado y comprobar quién puede consultarlo o actuar sobre él. En un ensayo de lectura se recuperó el mismo análisis desde la marca autorizada y se denegó la consulta desde otra marca. La prueba comparó el acceso al mismo resultado existente. Eso permite distinguir un control de acceso efectivo de un caso donde el documento simplemente nunca existió.

## Cómo compruebo que el trabajo terminó

La frase «el agente terminó» puede referirse a cuatro cosas. En Infinite me interesa poder examinar cada una.

| Pregunta | Evidencia que busco |
| --- | --- |
| ¿Terminó la ejecución? | Quedó registrado cómo cerró el proceso. |
| ¿Es válido el resultado? | La salida satisface las condiciones de la tarea y explicita los datos que faltan. |
| ¿Existe autorización para actuar? | La decisión corresponde a la acción y a la versión revisada. |
| ¿Ocurrió el efecto? | Cuando hay una acción externa, se obtuvo evidencia del estado observado en el destino. |

La diferencia entre la primera y la última pregunta aparece en el ensayo del comienzo. Había dos explicaciones compatibles con el silencio del proveedor. Quizá nunca ejecutó la acción. Quizá la ejecutó y perdimos la respuesta. La comprobación fue observar el estado del simulador y conservar la identidad del trabajo recuperado. En el caso complementario se canceló el trabajo antes del envío y el simulador conservó cero efectos.

<figure class="recovery-flow">
  <figcaption>Recuperación de una tarea tras perder la respuesta</figcaption>
  <div class="recovery-flow__lane">
    <p class="recovery-flow__label" id="flow-infinite">Infinite</p>
    <ol class="recovery-flow__steps" role="list" aria-labelledby="flow-infinite">
      <li>Inicia la tarea</li>
      <li>Pierde la respuesta</li>
      <li>Recupera el mismo trabajo</li>
      <li>Comprueba el efecto</li>
    </ol>
  </div>
  <div class="recovery-flow__lane">
    <p class="recovery-flow__label" id="flow-provider">Proveedor simulado</p>
    <ol class="recovery-flow__steps" role="list" aria-labelledby="flow-provider">
      <li>Recibe la acción</li>
      <li>Registra un solo efecto</li>
    </ol>
  </div>
</figure>

También hubo un caso con datos externos reales. Un primer intento de lectura acotada de rendimiento quedó en estado incierto. Un segundo ensayo, identificado como una operación nueva, produjo un análisis cuyos contadores y métricas derivadas coincidieron con una exportación para la campaña y el día examinados. La lectura quedó respaldada a la precisión de esa exportación. Quedaron abiertas la equivalencia de la atribución y las conclusiones sobre ventas.

Me importa que el historial pueda contener ambos resultados. Si alguien revisa el sistema meses después, debe poder distinguir una recuperación comprobada, una operación nueva que sí produjo un resultado y un intento que sigue sin confirmación.

## Pensar en sistemas cuando algo falla

Una idea que me llevé de *Pensar en sistemas*, de Donella H. Meadows, es que la resiliencia se revela cuando cambia el entorno. Al pensar en Infinite, eso me lleva a preguntar qué puede conservar el sistema durante un corte y qué tendría que comprobar para seguir. En el ensayo, el proceso se detuvo y el efecto persistió afuera. La recuperación pudo cotejarse con un registro independiente del proceso interrumpido. Esa era la observación que hacía falta para distinguir una tarea recuperada de una acción ejecutada por segunda vez. [Donella H. Meadows, *Pensar en sistemas*, capítulo 3](https://www.gc.soton.ac.uk/files/2015/01/Thinking-in-Systems-A-Primer-Donella-H.-Meadows-75-90.pdf)

Meadows también presta atención a los retrasos y a quién recibe la información que sirve para decidir. En un sistema agéntico, una respuesta tardía puede cambiar el estado de una tarea. Un dato contradictorio puede exigir otra comprobación. Una instrucción maliciosa dentro de un documento plantea un problema diferente: la información que un agente lee y la autoridad que tiene para actuar deben mantenerse separadas. Eso requiere sus propias pruebas. [Donella H. Meadows, *Leverage Points*](https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/)

Para los sistemas autónomos que quiero construir, ampliar la autonomía significa también diseñar qué pasa cuando se agota la evidencia disponible. A veces el siguiente paso correcto es comprobar el resultado. Otras veces es conservar el trabajo y dejar una decisión pendiente para que alguien pueda retomarla con contexto.

## Los datos pueden ser correctos y la conclusión equivocada

La evidencia también tiene que resistir preguntas de análisis. El módulo de rendimiento separa los datos observados de las métricas calculadas. Una tasa necesita su numerador y su denominador. Un dato ausente conserva su condición de ausente. El retorno sobre el gasto publicitario queda indeterminado cuando faltan ingresos verificados.

Este ejemplo sintético muestra una trampa que cambia la interpretación de una campaña.

| Segmento | Antes | Después |
| --- | --- | --- |
| A | 900 clics / 9 000 impresiones = 10 % | 110 / 1 000 = 11 % |
| B | 10 clics / 1 000 impresiones = 1 % | 180 / 9 000 = 2 % |
| Total | 910 / 10 000 = 9,10 % | 290 / 10 000 = 2,90 % |

El total cae más de seis puntos porcentuales aunque sube la tasa de ambos segmentos. Cambió el reparto de las impresiones. Si aplico a las tasas posteriores la mezcla inicial de 90 % A y 10 % B, obtengo 10,10 %. La comparación con pesos fijos permite ver cuánto cambia la lectura al mantener la composición inicial. La causa del cambio de composición requiere evidencia adicional.

Para estudiar la calidad de la explicación se compararon, a ciegas, notas de plantilla y notas generadas por un modelo. Las cuatro preferencias de la revisión delegada favorecieron al modelo, pero correspondían a dos escenarios sintéticos repetidos. La decisión para esos patrones fue conservar el cálculo y la plantilla como recorrido habitual e incorporar mejoras concretas a la explicación. Quedaron por medir la generalización a casos nuevos y el tiempo de revisión humana. Me interesaba poder defender tanto la interpretación de una métrica como la decisión de cómo explicarla.

## Una aprobación tiene que sobrevivir a una revisión

Probé desde el portal otro punto donde es fácil perder la historia del trabajo. Devolví la primera versión de una propuesta sintética y aprobé la segunda. Una vez terminado el recorrido, se recuperaron las dos versiones y las decisiones asociadas. La versión aprobada seguía disponible con acceso de lectura tras retirar el permiso de revisión.

La decisión de arquitectura fue hacer que la aprobación pertenezca al contenido exacto revisado. Una huella permite cotejar que dos copias representan el mismo contenido. El permiso y el alcance de la decisión se comprueban aparte. Esto importa cuando una devolución genera una versión nueva o cuando alguien vuelve a consultar una decisión anterior. El historial tiene que explicar qué revisó cada persona y qué decisión tomó en ese momento.

Así se consiguió un resultado que me interesa mostrar. Desde el portal se pudo devolver, revisar, aprobar y recuperar una propuesta, y el registro permitió comprobar a qué versión correspondía cada decisión. En un proceso autónomo, esa trazabilidad es lo que permite a una persona intervenir con conocimiento del estado real del trabajo.

## La concurrencia se mide en trabajo útil

Mi objetivo de diseño es que Infinite sostenga **más de 100 usuarios activos a la vez**, con varios trabajos en curso por persona. El número adquiere significado cuando defino la carga. Una persona puede estar consultando un informe. Otra puede iniciar un trabajo que genere varias tareas. Otra puede dejar una propuesta esperando revisión. Esas tres situaciones ejercen presiones distintas sobre el sistema.

La unidad que me interesa medir es el trabajo que llega a **un resultado verificable**. Si durante un intervalo entran 120 tareas por minuto y se completan 100 de la misma clase, quedan 20 por minuto acumulándose en la cola. Un panel puede mostrar mucha actividad mientras la espera empeora. También miraría la distribución de esa espera. Un promedio aceptable puede ocultar que un grupo de usuarios pasa mucho más tiempo esperando que los demás.

La evaluación de capacidad que propongo combina consultas, admisión de trabajos y decisiones de revisión. Mediría primero una carga estable y después repetiría la mezcla con un proveedor lento y con interrupciones controladas. Registraría la tasa de trabajos verificados, la espera habitual y la de los casos más lentos, el tiempo de recuperación y los efectos duplicados. También observaría cuánto tarda en vaciarse la cola tras un pico. Los ensayos descritos ya dan evidencia sobre recuperación, revisión y aislamiento en casos delimitados. La prueba de capacidad sostenida requiere su propio resultado.

## Lo que conseguimos construir

En los recorridos probados leímos datos externos y pudimos cotejar el análisis. Recuperamos la misma tarea después de un corte en un ensayo con efecto simulado. Revisamos dos versiones de una propuesta desde el portal y recuperamos la decisión sobre la versión exacta. Son resultados de capas distintas del backend, y juntos muestran la clase de sistema que me propuse construir.

Lo que más me interesó del desarrollo fue que cada fallo obligó a precisar el diseño. Perder una respuesta nos obligó a definir qué cuenta como efecto confirmado. Una tasa engañosa nos obligó a conservar el contexto de la medición. Devolver una propuesta nos obligó a precisar qué es exactamente lo que se aprueba. Así fue tomando forma Infinite.

Para mí, la prueba más exigente es esta. Cuando algo sale del camino previsto y una persona pregunta qué ocurrió, el sistema tiene que poder mostrarle la evidencia con la que llegó a su respuesta.
