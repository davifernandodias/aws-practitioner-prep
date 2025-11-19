import { QUIZException } from '@/handlers/exceptions-service';
import dataJson from '../data/data_question.json';
import { treatsGroup } from '@/utils/service-utils';

export async function getQuestionRandomQuestion(
  id: number,
  groupByTopic?: string | boolean,
  levelOfComplexity?: number
) {
  try {

    let filteredData: any = null;

    // Filtra pelo grupo se for informado como string
    let nameTreatedGroup: string | null | boolean = null;
    if (typeof groupByTopic === 'string') {
      nameTreatedGroup = treatsGroup(groupByTopic);


      console.log("dead")

      if (!nameTreatedGroup) {
        throw new QUIZException("Erro durante a criação das perguntas, não foi possível encontrar a área! Entre em contato com o desenvolvedor.",1);
      }

      // Filtra o array pelo id e pelo grupo tratado
      filteredData = dataJson.find(
        (q: any) => q.id === id && treatsGroup(q.group_by_topic) === nameTreatedGroup
      );
    } else {
      // Filtra apenas pelo id
      filteredData = dataJson.find((q: any) => q.id === id);
    }

    // Verifica se encontrou algum item
    if (!filteredData) {
      throw new QUIZException("Erro durante a criação das perguntas! Questão não encontrada ou grupo não corresponde.",1);
    }

    // Retorna sucesso
    return {
      sucess: true,
      message: "Questão criada com sucesso.",
      question: filteredData,
      erro: false,
      code: 0
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
