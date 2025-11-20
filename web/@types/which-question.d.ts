type TopicKey =
  | "compute"
  | "storage"
  | "database"
  | "networking_and_content_delivery"
  | "security_identity_and_compliance";


// Type usado na implementação de geração de próximas questões
type ErrorStreak = Record<string, number>;