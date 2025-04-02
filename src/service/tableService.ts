import { getLikeCountOnTable } from "../repository/TableRepository.js";
interface Table {
  id: number;
  code: string;
  name: string;
  content: string;
}

export async function mergeTableData(table: Table) {
  if (table) {
    const likeCount = await getLikeCountOnTable(table.id);
    return {
      ...table,
      likeCount: likeCount.likeCount,
    };
  }
}
