import { useMemo } from "react";
import { useMeasurementTopics } from "@/store/configuration-question";

export const useQuestionValidation = (
  question: Question | null,
  selectedAnswers: number[]
) => {
  const topics = useMeasurementTopics();

  const { isCorrect, weakestTopic } = useMemo(() => {
    if (!question) return { isCorrect: false, weakestTopic: null };

    // Determina quais índices são corretos
    const correctIndexes = question.response
      .map((item, index) => (item.rep ? index : -1))
      .filter((i) => i !== -1);

    const isCorrect =
      selectedAnswers.length === correctIndexes.length &&
      selectedAnswers.every((index) => correctIndexes.includes(index));

    // Mapear apenas os valores numéricos (ignorando os setters)
    const topicValues: Record<string, number> = {
      compute: topics.compute,
      storage: topics.storage,
      database: topics.database,
      networking_and_content_delivery: topics.networking_and_content_delivery,
      security_identity_and_compliance: topics.security_identity_and_compliance,
    };

    // Se estiver errado, desconta uma porcentagem
    if (!isCorrect && question.group_by_topic) {
      const key = question.group_by_topic as keyof typeof topicValues;
      const currentScore = topicValues[key];

      if (currentScore > 0) {
        // ajuste por tópico
        const deduction = key === "compute" ? 20 : 10;
        const newScore = Math.max(0, currentScore - deduction);

        // Chama o setter dinamicamente
        const setterMap: Record<string, (v: number) => void> = {
          compute: topics.setCompute,
          storage: topics.setStorage,
          database: topics.setDatabase,
          networking_and_content_delivery: topics.setNetworkingAndContentDelivery,
          security_identity_and_compliance: topics.setSecurityIdentityAndCompliance,
        };
        setterMap[key](newScore);
      }
    }

    // Determina o tópico com menor pontuação
    const weakestTopic = Object.entries(topicValues).sort(([, a], [, b]) => a - b)[0][0];

    return { isCorrect, weakestTopic };
  }, [question, selectedAnswers, topics]);

  return { isCorrect, weakestTopic };
};
