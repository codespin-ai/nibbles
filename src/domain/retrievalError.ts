import { getConnection } from '../db/pg.js';

export type Error = {
  id: bigint;
  retrievalId: bigint;
  createdAt: bigint;
  errorCode: bigint;
  error: string;
  errorType: string;
};

export const createError = async (error: Error) => {
  const db = getConnection();
  return db.none('INSERT INTO error (id, retrieval_id, created_at, error_code, error, error_type) VALUES (${id}, ${retrievalId}, ${createdAt}, ${errorCode}, ${error}, ${errorType})', error);
};

export const readError = async (id: bigint) => {
  const db = getConnection();
  return db.oneOrNone('SELECT * FROM error WHERE id = ${id}', { id });
};

export const updateError = async (id: bigint, error: Partial<Error>) => {
  const db = getConnection();
  const setClause = Object.keys(error).map(k => `${k} = \${${k}}`).join(', ');
  return db.none(`UPDATE error SET ${setClause} WHERE id = ${id}`, error);
};

export const deleteError = async (id: bigint) => {
  const db = getConnection();
  return db.none('DELETE FROM error WHERE id = ${id}', { id });
};