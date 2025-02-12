export interface Table {
  content: string;
  code: string;
  name: string;
}

export interface TableDAO extends Table {
  id: number;
}
