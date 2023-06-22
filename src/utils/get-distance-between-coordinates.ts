export interface Coordinate {
  latitude: number
  longitude: number
}

export function getDistanceBetweenCoordinatesInKm(
  from: Coordinate,
  to: Coordinate,
) {
  // this method came from the tutorial the meters one was suggested in the comments of the tutorial

  // Primeiro, a função verifica se as duas coordenadas são iguais e retorna 0 se for o caso, indicando que a distância entre elas é zero.
  // Em seguida, a função converte as coordenadas de graus para radianos e calcula a diferença de longitude entre as duas coordenadas. A fórmula de Haversine é usada para calcular a distância entre os dois pontos. Essa fórmula usa a lei dos cossenos para calcular a distância entre dois pontos em uma esfera, como a Terra.
  // A distância é então convertida em milhas e depois em quilômetros, e o resultado é retornado como um número de ponto flutuante que representa a distância em quilômetros entre as duas coordenadas.
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  const fromRadian = (Math.PI * from.latitude) / 180
  const toRadian = (Math.PI * to.latitude) / 180

  const theta = from.longitude - to.longitude
  const radTheta = (Math.PI * theta) / 180

  let dist =
    Math.sin(fromRadian) * Math.sin(toRadian) +
    Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

  if (dist > 1) {
    dist = 1
  }

  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  dist = dist * 1.609344

  return dist
}

export function getDistanceBetweenCoordinatesInMeters(
  from: Coordinate,
  to: Coordinate,
): number {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0
  }

  // DISTANCE IN METERS
  const R = 6371e3 // metres
  const φ1 = (from.latitude * Math.PI) / 180 // φ, λ in radians
  const φ2 = (to.latitude * Math.PI) / 180
  const Δφ = ((to.latitude - from.latitude) * Math.PI) / 180
  const Δλ = ((to.longitude - from.longitude) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const dist = R * c // in metres

  return dist
}
