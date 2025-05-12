import { getLikeCountOnTable } from "../repository/TableRepository.js";
interface Table {
  id: number;
  code: string;
  name: string;
  content: string;
}

export async function mergeTableData(table: Table) {
  const likeCount = await getLikeCountOnTable(table.id);
  const likeCountAsNumber = parseInt(likeCount.likeCount.toString());
  return {
    ...table,
    likeCount: likeCountAsNumber,
  };
}
