import { getConnection } from '../db/pg.js';

export type Retrieval = {
  id: bigint;
  linkId: bigint;
  content: string;
  createdAt: bigint;
  fetchedAt: bigint | undefined;
  contentLength: bigint;
  downloadTime: bigint;
};

export const createRetrieval = async (retrieval: Retrieval) => {
  const db = getConnection();
  return db.none('INSERT INTO retrieval (id, link_id, content, created_at, fetched_at, content_length, download_time) VALUES (${id}, ${linkId}, ${content}, ${createdAt}, ${fetchedAt}, ${contentLength}, ${downloadTime})', retrieval);
};

export const readRetrieval = async (id: bigint) => {
  const db = getConnection();
  return db.oneOrNone('SELECT * FROM retrieval WHERE id = ${id}', { id });
};

export const updateRetrieval = async (id: bigint, retrieval: Partial<Retrieval>) => {
  const db = getConnection();
  const setClause = Object.keys(retrieval).map(k => `${k} = \${${k}}`).join(', ');
  return db.none(`UPDATE retrieval SET ${setClause} WHERE id = ${id}`, retrieval);
};

export const deleteRetrieval = async (id: bigint) => {
  const db = getConnection();
  return db.none('DELETE FROM retrieval WHERE id = ${id}', { id });
};