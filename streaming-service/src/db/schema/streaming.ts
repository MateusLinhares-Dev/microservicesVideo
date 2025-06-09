import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const streaming = pgTable('streaming', {
  id: text().primaryKey(),
  userId: text().notNull(), // ID do utilizador (referência ao user-service)
  contentId: text().notNull(), // ID do conteúdo (filme, série, etc.)
  startedAt: timestamp().notNull(), // Início do streaming
  endedAt: timestamp(), // Fim do streaming (pode ser null se estiver em andamento)
  isLive: boolean().default(false).notNull(), // Indica se é um stream ao vivo
  device: text(), // Dispositivo usado (opcional)
  quality: text(), // Qualidade do stream (ex: '1080p', '4K')
  durationWatched: integer().default(0) // Duração assistida em segundos
});