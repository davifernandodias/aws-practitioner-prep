

// Resposta tem uma estrutura de array, sendo nele a alterantiva (opção) que usuário vai escolher, because (motivo) de ser a resposta certa ou a errada e a rep que seria se está correta ou não
// true = resposta certa
// false = resposta incorreta
type ResponseItem = {
  because: string,
  alternative: string,
  rep: boolean
}

// Questão tem uma estrutura simples, formado pelo seu id, titulo, grupo (segurança, computação etc..) e se aceita duas alternativas e o array de objectos da resposta
type Question = {
  id: number;
  title: string;
  group_by_topic: string;
  accept_two_alternatives: boolean;
  level_of_complexity: number;
  response: Array<ResponseItem>;
};