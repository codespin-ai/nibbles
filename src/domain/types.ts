export type Job = {
  name: bigint;
  config: string;
  createdAt: bigint;
  tags: string;
};

export type JobTag = {
  jobName: bigint;
  key: string;
  value: string;
  createdAt: bigint;
};

export type Link = {
  id: bigint;
  jobName: bigint;
  url: string;
  parentId: bigint | undefined;
  createdAt: bigint;
  retryCount: bigint;
  status: string;
};

export type Retrieval = {
  id: bigint;
  linkId: bigint;
  content: string;
  createdAt: bigint;
  fetchedAt: bigint | undefined;
  contentLength: bigint;
  downloadTime: bigint;
};

export type Error = {
  id: bigint;
  retrievalId: bigint;
  createdAt: bigint;
  errorCode: bigint;
  error: string;
  errorType: string;
};