Create the following tables if they don't exist.
All ids should be bigint. All fields are non-nullable unless otherwise mentioned.
created_at should be a bigint wherever mentioned.
all numbers are bigint

1. job

  Fields:
  - name, fkey 
  - config
  - created_at, bigint
  - tags

2. job_tag

job_name and key together will be the primary key

  Fields:
  - job_name, fkey to job.name
  - key, string
  - value, string
  - created_at, bigint
  
3. link

  Fields:
  - id
  - job_name, fkey to jobs.name
  - url, string
  - parent_id, fkey to link.id - ie, the same table, nullable
  - created_at, bigint
  - retry_count 
  - status, string

4. retrieval
  
  Fields:
  - id
  - link_id, fkey to link.id
  - content, string
  - created_at, bigint
  - fetched_at, bigint, nullable
  - content_length, bigint
  - download_time, bigint
  - 

5. error

  Fields:
    - id
    - retrieval_id, fkey to retrieval.id
    - created_at, bigint
    - error_code
    - error, string
    - error_type, string


codespin:include:/codespin/rules/sql-conventions.md