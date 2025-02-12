export interface Table {
  content: string;
  code: string;
}

export interface TableDAO extends Table {
  id: number;
}
