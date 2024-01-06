-- Create job table if it does not exist
CREATE TABLE IF NOT EXISTS job (
    name TEXT NOT NULL,
    config TEXT NOT NULL,
    created_at BIGINT NOT NULL,
    tags TEXT NOT NULL,
    PRIMARY KEY (name)
);

-- Create job_tag table if it does not exist
-- job_name and key together will be the primary key
CREATE TABLE IF NOT EXISTS job_tag (
    job_name TEXT NOT NULL,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    created_at BIGINT NOT NULL,
    PRIMARY KEY (job_name, key),
    FOREIGN KEY (job_name) REFERENCES job (name)
);

-- Create link table if it does not exist
CREATE TABLE IF NOT EXISTS link (
    id BIGINT NOT NULL,
    job_name TEXT NOT NULL,
    url TEXT NOT NULL,
    parent_id BIGINT,
    created_at BIGINT NOT NULL,
    retry_count BIGINT NOT NULL,
    status TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (job_name) REFERENCES job (name),
    FOREIGN KEY (parent_id) REFERENCES link (id)
);

-- Create retrieval table if it does not exist
CREATE TABLE IF NOT EXISTS retrieval (
    id BIGINT NOT NULL,
    link_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    created_at BIGINT NOT NULL,
    fetched_at BIGINT,
    content_length BIGINT NOT NULL,
    download_time BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (link_id) REFERENCES link (id)
);

-- Create error table if it does not exist
CREATE TABLE IF NOT EXISTS error (
    id BIGINT NOT NULL,
    retrieval_id BIGINT NOT NULL,
    created_at BIGINT NOT NULL,
    error_code BIGINT NOT NULL,
    error TEXT NOT NULL,
    error_type TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (retrieval_id) REFERENCES retrieval (id)
);