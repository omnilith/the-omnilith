export interface ResolvedFormField {
  field: Entity;
  required: boolean;
  resolvedSubForm?: Entity;
}

export interface Entity {
  id: string;
  type: string;
  essence: Record<string, unknown>;
  createdAt: string;
  updatedAt?: string;

  _resolvedFields?: ResolvedFormField[];
}
