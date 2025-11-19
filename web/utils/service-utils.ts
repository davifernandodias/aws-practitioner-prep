export function treatsGroup(groupName: string): string | false {
    switch (groupName.toLowerCase()) {
        case 'compute':
            return 'Conceito da Nuvem';
        case 'storage':
            return 'seguranca';
        case 'database':
            return 'tecnologia';
        case 'networking_and_content_delivery':
            return 'faturamento';
        case 'security_identity_and_compliance':
            return 'faturamento';
        default:
            return false;
    }
}

export function generateRandomNumber(start: number = 0, end: number = 300): number {
  // Se "start" for maior que "end", inverte
  if (start > end) {
    [start, end] = [end, start];
  }

  // Retorna número inteiro aleatório entre "start" e "end"
  return Math.floor(Math.random() * (end - start + 1)) + start;
}
