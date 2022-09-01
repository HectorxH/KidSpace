export function checkAnswers(
  userAnswers: number[][][],
  userAnswersDropdown: number[][][],
  requirements: number[],
) {
  var respuestasCorrectas =
    requirements
      .map(n =>
        userAnswers[n]
          .map(b => b.reduce((x, y) => Number(x) + Number(y), 0))
          .reduce((x, y) => Number(x) + Number(y), 0),
      )
      .reduce((x, y) => Number(x) + Number(y), 0) +
    requirements
      .map(n =>
        userAnswersDropdown[n]
          .map(b => b.reduce((x, y) => Number(x) + Number(y), 0))
          .reduce((x, y) => Number(x) + Number(y), 0),
      )
      .reduce((x, y) => Number(x) + Number(y), 0);

  var cantidadRespuestas =
    requirements
      .map(n =>
        userAnswers[n]
          .map(b => b.length)
          .reduce((x, y) => Number(x) + Number(y), 0),
      )
      .reduce((x, y) => Number(x) + Number(y), 0) +
    requirements
      .map(n =>
        userAnswersDropdown[n]
          .map(b => b.length)
          .reduce((x, y) => Number(x) + Number(y), 0),
      )
      .reduce((x, y) => Number(x) + Number(y), 0);

  console.log(respuestasCorrectas, cantidadRespuestas);
  return respuestasCorrectas === cantidadRespuestas;
}
