import { getConnection } from '../db/pg.js';

export type Link = {
  id: bigint;
  jobName: string;
  url: string;
  parentId: bigint | undefined;
  createdAt: bigint;
  retryCount: bigint;
  status: string;
};

export const createLink = async (link: Link) => {
  const db = getConnection();
  return db.none('INSERT INTO link (id, job_name, url, parent_id, created_at, retry_count, status) VALUES (${id}, ${jobName}, ${url}, ${parentId}, ${createdAt}, ${retryCount}, ${status})', link);
};

export const readLink = async (id: bigint) => {
  const db = getConnection();
  return db.oneOrNone('SELECT * FROM link WHERE id = ${id}', { id });
};

export const updateLink = async (id: bigint, link: Partial<Link>) => {
  const db = getConnection();
  const setClause = Object.keys(link).map(k => `${k} = \${${k}}`).join(', ');
  return db.none(`UPDATE link SET ${setClause} WHERE id = ${id}`, link);
};

export const deleteLink = async (id: bigint) => {
  const db = getConnection();
  return db.none('DELETE FROM link WHERE id = ${id}', { id });
};