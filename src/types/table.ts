export interface Table {
  content: string;
  code: string;
  name: string;
}

export interface TableDAO extends Table {
  id: number;
}

//Potential extension of the table. Export when applicable.

interface TableRatings {
  likes: number;
  submittedBy: string; //Actually this is a Username
}
