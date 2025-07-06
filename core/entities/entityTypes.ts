export interface Entity {
  id: string;
  type: string;
  essence: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;
}
