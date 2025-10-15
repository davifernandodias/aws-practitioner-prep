import { QUIZException } from '@/handlers/exceptions-service';
import dataJson from '../data/data_question.json';

export async function getQuestionRandomQuestion(
  id: number,
  group_by_topic?: string,
  level_of_complexity?: number
) {
  try {

    // Recupera o JSON e atribui a uma variavel
    let data = dataJson[id];

    // Verifica se conseguiu acessar o JSON mas não achou o JSON correto
    if(data === undefined){
      // Passa a exceção tratada
      throw new QUIZException("Erro durante a criação das perguntas! Entre em contato com o desenvolvedor.",  1);
    }

    // Se passou do if acima deu tudo certo e retorna a mensagem correta
    return {
      sucess: true,
      message: "Questão criada com sucesso.",
      question: data,
      erro: false,
      code: 0,
    };

  } catch (error : any) {

    // Retorna com erro tradado
    return {
      sucess: false,
      message: (error instanceof QUIZException ? error.message : 'Erro durante a criação das perguntas! Entre em contato com o desenvolvedor.'),
      question: false,
      erro: error,
      code: (error instanceof QUIZException ? error.code : 2)
    };
  }
}
