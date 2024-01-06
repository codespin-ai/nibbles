import { getConnection } from '../db/pg.js';

export type JobTag = {
  jobName: string;
  key: string;
  value: string;
  createdAt: bigint;
};

export const createJobTag = async (jobTag: JobTag) => {
  const db = getConnection();
  return db.none('INSERT INTO job_tag (job_name, key, value, created_at) VALUES (${jobName}, ${key}, ${value}, ${createdAt})', jobTag);
};

export const readJobTag = async (jobName: string, key: string) => {
  const db = getConnection();
  return db.oneOrNone('SELECT * FROM job_tag WHERE job_name = ${jobName} AND key = ${key}', { jobName, key });
};

export const updateJobTag = async (jobName: string, key: string, jobTag: Partial<JobTag>) => {
  const db = getConnection();
  const setClause = Object.keys(jobTag).map(k => `${k} = \${${k}}`).join(', ');
  return db.none(`UPDATE job_tag SET ${setClause} WHERE job_name = ${jobName} AND key = ${key}`, jobTag);
};

export const deleteJobTag = async (jobName: string, key: string) => {
  const db = getConnection();
  return db.none('DELETE FROM job_tag WHERE job_name = ${jobName} AND key = ${key}', { jobName, key });
};