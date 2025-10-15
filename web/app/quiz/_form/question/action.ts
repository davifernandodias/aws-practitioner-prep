"use server"

import { QUIZException } from "@/handlers/exceptions-service";
import { getQuestionRandomQuestion } from "@/service/random-question";

// Action que dispara a busca pro service que retorna a questão com base no id aleatório
export const SendQuestionsAndAnswers = async (currentState: unknown, formData: FormData) => {
    try {
        // Salva os ids recebidos (string)
        const stringIds = formData.get("id_array");

        // confere se stringIds existe e é string, se sim converte para numero e passa pra um array
        const arrayIds = typeof stringIds === "string" ? stringIds.split(",").map(Number) : [];

        // Consulta via service serve side (utilizado o primeiro id)
        const response = await getQuestionRandomQuestion(arrayIds[0])

        // Verifica se retornou algum tipo de erro
        if(response.code != 0 || response.erro || !response.sucess){
            throw new QUIZException( response.message, response.code);
        }

        // Caso passe por todas as validações, cai no caso de sucesso e retorna a msg e a questão
        return {
            success: true,
            message: response.message,
            question: response.question,
            error: false
        }
    } catch (error) {
        // Retorna um estado de erro para o useActionState
        return {
            success: false,
            message: (error instanceof QUIZException ? error.message : 'Ocorreu um erro inesperado na busca da questão.'),
            question: false,
            error: (error instanceof QUIZException ? error.code : 2),
        }
    }
}