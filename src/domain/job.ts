import { getConnection } from '../db/pg.js';

export type Job = {
  name: string;
  config: string;
  createdAt: bigint;
  tags: string;
};

export const createJob = async (job: Job) => {
  const db = getConnection();
  return db.none('INSERT INTO job (name, config, created_at, tags) VALUES (${name}, ${config}, ${createdAt}, ${tags})', job);
};

export const readJob = async (name: string) => {
  const db = getConnection();
  return db.oneOrNone('SELECT * FROM job WHERE name = ${name}', { name });
};

export const updateJob = async (name: string, job: Partial<Job>) => {
  const db = getConnection();
  const setClause = Object.keys(job).map(key => `${key} = \${${key}}`).join(', ');
  return db.none(`UPDATE job SET ${setClause} WHERE name = ${name}`, job);
};

export const deleteJob = async (name: string) => {
  const db = getConnection();
  return db.none('DELETE FROM job WHERE name = ${name}', { name });
};