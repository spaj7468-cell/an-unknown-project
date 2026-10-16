# SQL and relational data fundamentals

> SQL behavior and features vary by database engine. Examples here use broadly familiar SQL; confirm exact syntax, isolation behavior, and available functions in the documentation for your selected engine.

## 1. Model data before writing queries

A relational database organizes data into tables with rows and columns. A primary key identifies a row; a foreign key expresses a relationship and can enforce referential integrity. Choose data types that represent the domain accurately, and make required values `NOT NULL` rather than relying only on application validation.

Example schema:

```sql
CREATE TABLE customers (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE orders (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_id bigint NOT NULL REFERENCES customers(id),
  status text NOT NULL,
  total_cents integer NOT NULL CHECK (total_cents >= 0),
  created_at timestamptz NOT NULL DEFAULT now()
);
```

This is an illustrative PostgreSQL schema, not a universal cross-database migration. Production systems may require currency codes, stronger status constraints, decimal types, or larger numeric ranges depending on business requirements.

## 2. Read data with explicit intent

```sql
SELECT id, status, total_cents, created_at
FROM orders
WHERE customer_id = $1
ORDER BY created_at DESC
LIMIT 50;
```

The `$1` placeholder is used by PostgreSQL prepared statements and many client libraries; other engines use different placeholder syntax. Bind values through the database driver. Do not interpolate untrusted values into SQL text.

Use explicit columns rather than `SELECT *` in stable application queries so that result shape and data exposure remain deliberate.

## 3. Joins and aggregation

```sql
SELECT c.id, c.email, COUNT(o.id) AS order_count
FROM customers AS c
LEFT JOIN orders AS o ON o.customer_id = c.id
GROUP BY c.id, c.email
ORDER BY order_count DESC;
```

A `LEFT JOIN` keeps customers even if they have no matching order. Moving a condition on the right-side table from the `ON` clause to the `WHERE` clause can change the result by filtering out unmatched rows. Understand join cardinality before aggregating to avoid counting duplicated rows.

## 4. Transactions and constraints

A transaction groups operations into a unit with defined commit/rollback behavior. Use transactions when multiple writes must remain consistent together.

```sql
BEGIN;
UPDATE accounts SET balance_cents = balance_cents - 500
WHERE id = $1 AND balance_cents >= 500;
-- The application must verify that exactly the intended row was updated.
UPDATE accounts SET balance_cents = balance_cents + 500
WHERE id = $2;
COMMIT;
```

This is only a sketch: production transfer logic must validate identities, verify row counts, handle errors and rollback, prevent invalid same-account cases, and choose an isolation/locking strategy appropriate to concurrency. Database constraints should enforce invariants whenever possible.

Do not assume every database uses identical isolation semantics. Read the engine-specific transaction documentation and test concurrent operations.

## 5. Indexes and query plans

Indexes can speed up reads and joins but cost storage and add work to inserts, updates, and deletes. Indexes should follow measured query patterns, not be added to every column automatically.

- Use the engine's query-plan tools to inspect scans, joins, row estimates, and index use.
- Compare plans and timings with representative data.
- Consider column order for multi-column indexes based on filters and ordering.
- Keep statistics current using the database's normal maintenance process.
- Avoid optimizing based on tiny development datasets alone.

## 6. Migrations and recovery

- Store schema changes as reviewed, ordered migrations.
- Test migrations on a representative copy of data.
- Consider lock duration, table rewrites, backfills, and old application versions.
- Prefer expand-and-contract approaches for risky rolling changes: add compatible schema, deploy compatible code, migrate data, then remove obsolete schema in a later release.
- Backups are only useful if restore has been tested. Define recovery-point and recovery-time objectives appropriate to the service.

## 7. Checklist

- [ ] Primary and foreign keys express identity and relationships.
- [ ] Constraints protect core invariants.
- [ ] Queries use bound parameters.
- [ ] Queries select only required data.
- [ ] Transactions and concurrent updates have a defined strategy.
- [ ] Indexes are justified by observed queries.
- [ ] Migrations and rollback/recovery have been tested.
- [ ] Access permissions follow least privilege.

## References

- PostgreSQL tutorial: https://www.postgresql.org/docs/current/tutorial.html
- PostgreSQL SQL language: https://www.postgresql.org/docs/current/sql.html
- PostgreSQL indexes: https://www.postgresql.org/docs/current/indexes.html
- PostgreSQL transactions: https://www.postgresql.org/docs/current/tutorial-transactions.html

Last reviewed for this chapter: 2026-10-16. PostgreSQL's `current` documentation moves with supported releases; check the version deployed by your project.
